import React, { useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, Check, ShieldCheck, RefreshCw } from 'lucide-react';

const AGENT_META = {
  profiler: { name: 'Artist Profiler', color: 'var(--accent)' },
  scout: { name: 'Venue Scout', color: 'var(--cyan-glow)' },
  logistics: { name: 'Logistics Planner', color: 'var(--purple-glow)' },
  finance: { name: 'Tour Accountant', color: 'var(--rose-glow)' },
  legal: { name: 'Legal Assistant', color: 'var(--spotify-green)' },
  promo: { name: 'Promo Manager', color: 'var(--amber-glow)' }
};

export default function AgentDrawer({ 
  agentStatus, 
  logs, 
  currentStage, 
  onApprove, 
  onReset,
  artistName 
}) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Determine current pending action based on stage
  const getApprovalAction = () => {
    switch (currentStage) {
      case 0:
        return {
          title: "Запуск ШІ-пошуку",
          description: `Ініціювати аналітику стрімінгів та пошук міст для артиста: ${artistName || 'Введіть назву'}`,
          btnLabel: "Запустити аналіз",
          disabled: !artistName
        };
      case 1:
        return {
          title: "Затвердження міст туру",
          description: "Затвердити запропоновані міста на базі статистики слухачів та прогнозів зборів.",
          btnLabel: "Затвердити міста",
          disabled: false
        };
      case 2:
        return {
          title: "Затвердження шортлиста клубів",
          description: "Підтвердити обрані клуби для початку автоматичного розсилання запитів та узгодження дат.",
          btnLabel: "Розпочати розсилку",
          disabled: false
        };
      case 3:
        return {
          title: "Затвердження логістики & дати",
          description: "Затвердити фінальну чергу міст, розклад та вибір готелів / транспорту.",
          btnLabel: "Затвердити маршрут",
          disabled: false
        };
      case 4:
        return {
          title: "Узгодження бюджету",
          description: "Затвердити кошторис, планові витрати та очікуваний прибуток туру.",
          btnLabel: "Затвердити бюджет",
          disabled: false
        };
      case 5:
        return {
          title: "Підписання контрактів & райдерів",
          description: "Підписати сформовані угоди з клубами цифровим ключем (агенти вже перевірили умови).",
          btnLabel: "Підписати та згенерувати PDF",
          disabled: false
        };
      case 6:
        return {
          title: "Запуск промо-кампанії",
          description: "Виділити рекламний бюджет та запустити автоматизований таргетинг для продажу квитків.",
          btnLabel: "Запустити промо & продажі",
          disabled: false
        };
      default:
        return null;
    }
  };

  const action = getApprovalAction();

  return (
    <aside className="agent-drawer">
      <div className="agent-drawer-header">
        <h3>ШІ-Панель Управління</h3>
        <button onClick={onReset} className="btn btn-secondary" style={{ padding: '6px', borderRadius: '6px' }} title="Скинути симуляцію">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Agents Status Status Grid */}
      <div className="agent-status-grid">
        {Object.entries(AGENT_META).map(([key, meta]) => {
          const status = agentStatus[key] || 'idle';
          return (
            <div key={key} className={`agent-status-card ${status !== 'idle' ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <span className={`agent-avatar-dot ${status}`}></span>
                <span style={{ fontWeight: '600', color: status !== 'idle' ? '#fff' : 'var(--text-secondary)' }}>
                  {status.toUpperCase()}
                </span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {meta.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Logging Terminal */}
      <div style={{ padding: '12px 16px 4px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
        <Terminal size={14} className="text-cyan-glow" />
        <span style={{ fontSize: '12px', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>Лог ШІ-Агентів (Живий Потік)</span>
      </div>
      <div className="terminal-container">
        {logs.map((log, index) => (
          <div key={index} className="terminal-line">
            <span className="timestamp">{log.time}</span>
            <span className="tag" style={{ color: AGENT_META[log.agent]?.color }}>
              [{AGENT_META[log.agent]?.name || 'System'}]:
            </span>
            <span style={{ color: '#e5e7eb' }}>{log.text}</span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Human-in-the-Loop Action Approvals */}
      {action && (
        <div className="approval-pane">
          <div className="approval-card">
            <h4>
              <ShieldAlert size={16} style={{ color: 'var(--amber-glow)' }} />
              {action.title}
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              {action.description}
            </p>
            <button 
              className={`btn ${currentStage === 5 ? 'btn-success' : 'btn-primary'}`}
              style={{ width: '100%', padding: '12px' }}
              onClick={onApprove}
              disabled={action.disabled}
            >
              <Check size={16} />
              {action.btnLabel}
            </button>
          </div>
        </div>
      )}

      {currentStage > 6 && (
        <div className="approval-pane" style={{ background: 'rgba(29,185,84,0.05)', borderTop: '2px solid var(--spotify-green)' }}>
          <div className="approval-card" style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'var(--spotify-green)', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
              Тур Запущено!
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Всі етапи автоматизації виконано. Агенти ведуть моніторинг продажів та реклами.
            </p>
            <button className="btn btn-secondary" onClick={onReset}>
              Створити Новий Тур
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
