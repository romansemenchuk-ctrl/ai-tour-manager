import React, { useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, Check, ShieldCheck, RefreshCw, Moon, Sun } from 'lucide-react';

const AGENT_META = {
  profiler: { name: 'Profiler', color: 'var(--text-primary)' },
  scout: { name: 'Scout', color: 'var(--text-primary)' },
  logistics: { name: 'Logistics', color: 'var(--text-primary)' },
  finance: { name: 'Accountant', color: 'var(--text-primary)' },
  legal: { name: 'Legal', color: 'var(--text-primary)' },
  promo: { name: 'Promo', color: 'var(--text-primary)' }
};

export default function AgentDrawer({ 
  agentStatus, 
  logs, 
  currentStage, 
  onApprove, 
  onReset,
  artistName,
  theme,
  setTheme,
  isProcessing
}) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Toggle dark/light theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getApprovalAction = () => {
    switch (currentStage) {
      case 0:
        return {
          title: "Запуск ШІ-пошуку",
          description: `Ініціювати аналітику стрімінгів та пошук міст для: ${artistName || 'Введіть назву'}`,
          btnLabel: "Запустити аналіз",
          disabled: !artistName || isProcessing
        };
      case 1:
        return {
          title: "Затвердження міст туру",
          description: "Затвердити запропоновані міста на базі статистики слухачів та прогнозів зборів.",
          btnLabel: "Затвердити міста",
          disabled: isProcessing
        };
      case 2:
        return {
          title: "Затвердження шортлиста клубів",
          description: "Підтвердити обрані клуби для початку автоматичного розсилання запитів та узгодження дат.",
          btnLabel: "Розпочати розсилку",
          disabled: isProcessing
        };
      case 3:
        return {
          title: "Затвердження логістики & дати",
          description: "Затвердити фінальну чергу міст, розклад та вибір готелів / транспорту.",
          btnLabel: "Затвердити маршрут",
          disabled: isProcessing
        };
      case 4:
        return {
          title: "Узгодження бюджету",
          description: "Затвердити кошторис, планові витрати та очікуваний прибуток туру.",
          btnLabel: "Затвердити бюджет",
          disabled: isProcessing
        };
      case 5:
        return {
          title: "Підписання контрактів & райдерів",
          description: "Підписати сформовані угоди з клубами цифровим ключем (агенти вже перевірили умови).",
          btnLabel: "Підписати договори",
          disabled: isProcessing
        };
      case 6:
        return {
          title: "Запуск промо-кампанії",
          description: "Виділити рекламний бюджет та запустити автоматизований таргетинг для продажу квитків.",
          btnLabel: "Запустити промо & продажі",
          disabled: isProcessing
        };
      default:
        return null;
    }
  };

  const action = getApprovalAction();

  return (
    <aside className="agent-drawer">
      <div className="agent-drawer-header">
        <h3>ШІ-Оркестрація</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Light/Dark mode toggle button */}
          <button onClick={toggleTheme} className="theme-toggle" title="Змінити тему">
            {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          
          <button 
            onClick={onReset} 
            className="theme-toggle" 
            style={{ padding: '6px' }} 
            title="Скинути симуляцію"
            disabled={isProcessing}
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Agents Status Matrix */}
      <div className="agent-status-grid">
        {Object.entries(AGENT_META).map(([key, meta]) => {
          const status = agentStatus[key] || 'idle';
          return (
            <div key={key} className={`agent-status-card ${status !== 'idle' ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                <span className={`agent-avatar-dot ${status}`}></span>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '8px' }}>
                  {status.toUpperCase()}
                </span>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {meta.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Logging Terminal */}
      <div style={{ padding: '12px 16px 4px', borderBottom: 'var(--border-width) solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', background: 'var(--bg-main)' }}>
        <Terminal size={12} />
        <span style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>Живий Лог ШІ-Агентів</span>
      </div>
      
      <div className="terminal-container">
        {logs.map((log, index) => (
          <div key={index} className="terminal-line">
            <span className="timestamp">{log.time}</span>
            <span className="tag">
              [{AGENT_META[log.agent]?.name || 'System'}]:
            </span>
            <span>{log.text}</span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Human-in-the-Loop Actions Approval Pane */}
      {action && (
        <div className="approval-pane">
          <div className="approval-card">
            <h4>
              <ShieldAlert size={16} />
              {action.title}
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4', fontFamily: 'var(--font-mono)' }}>
              {action.description}
            </p>
            <button 
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}
              onClick={onApprove}
              disabled={action.disabled}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                  ШІ ПРАЦЮЄ...
                </>
              ) : (
                <>
                  <Check size={14} />
                  {action.btnLabel}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {currentStage > 6 && !isProcessing && (
        <div className="approval-pane" style={{ background: 'var(--card-bg)' }}>
          <div className="approval-card" style={{ textAlign: 'center', gap: '8px' }}>
            <h4 style={{ justifyContent: 'center' }}>
              <ShieldCheck size={20} />
              ТУР ЗАПУЩЕНО
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4', fontFamily: 'var(--font-mono)' }}>
              Агенти виконали всі підготовчі етапи туру. Реклама та моніторинг продажу активовані.
            </p>
            <button className="btn btn-secondary" onClick={onReset} style={{ width: '100%' }}>
              Новий концертний тур
            </button>
          </div>
        </div>
      )}

      {/* Spin animation injection */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </aside>
  );
}
