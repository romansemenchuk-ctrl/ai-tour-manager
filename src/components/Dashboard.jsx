import React from 'react';
import { Compass, Users, DollarSign, Calendar, ArrowRight, Shield, Award } from 'lucide-react';

export default function Dashboard({ 
  currentStage, 
  artistName, 
  stats, 
  setActiveTab 
}) {
  const steps = [
    { label: "Аналітика", stage: 1 },
    { label: "Клуби", stage: 2 },
    { label: "Логістика", stage: 3 },
    { label: "Бюджет", stage: 4 },
    { label: "Угоди", stage: 5 },
    { label: "Промо", stage: 6 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{ background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ШІ Автоматизація // AI Tour Manager</span>
          <h2 style={{ fontSize: '28px', fontFamily: 'var(--font-heading)', fontWeight: '800', marginTop: '6px', letterSpacing: '-0.5px' }}>
            {artistName ? `Артист: ${artistName}` : 'Новий концертний тур'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '8px', maxWidth: '600px', lineHeight: '1.5' }}>
            Мультиагентна система ШІ координує пошук залів, логістику та промо-кампанії. Затверджуйте кроки на ШІ-панелі справа.
          </p>
        </div>
        <div>
          <div className="status-pill status-signed" style={{ fontSize: '11px', padding: '6px 12px' }}>
            <Shield size={12} style={{ marginRight: '6px' }} /> Human-in-the-Loop Active
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', marginBottom: '20px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Етапи активації туру</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', overflowX: 'auto', padding: '10px 0' }}>
          {/* Soft connection line */}
          <div style={{ position: 'absolute', top: '29px', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: '1' }}></div>
          <div style={{ position: 'absolute', top: '29px', left: '0', width: `${((Math.min(currentStage, 6)) / 6) * 100}%`, height: '2px', background: 'var(--accent)', zIndex: '1', transition: 'width 0.4s ease' }}></div>
          
          {steps.map((step, index) => {
            const isCompleted = currentStage > step.stage;
            const isActive = currentStage === step.stage;
            return (
              <div 
                key={index} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: '2', position: 'relative', minWidth: '70px', cursor: 'pointer' }}
                onClick={() => currentStage >= step.stage && setActiveTab(step.stage === 1 ? 'analytics' : step.stage === 2 ? 'scout' : step.stage === 3 ? 'roadmap' : step.stage === 4 ? 'budget' : step.stage === 5 ? 'contracts' : 'promo')}
              >
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%',
                  background: isCompleted ? 'var(--accent)' : 'var(--card-bg)',
                  border: `2px solid ${isCompleted || isActive ? 'var(--accent)' : 'var(--border-color)'}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: isCompleted ? 'var(--accent-text)' : isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span style={{ 
                  fontSize: '11px', 
                  marginTop: '10px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--text-primary)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-heading)'
                }} className="sidebar-label">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Аудиторія (Reach)</span>
            <Users size={16} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '800' }}>
            {stats.monthlyListeners.toLocaleString()}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Слухачів у містах</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Виручка (100% збори)</span>
            <DollarSign size={16} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '800' }}>
            ${stats.projectedRevenue.toLocaleString()}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Планові збори</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Кількість залів</span>
            <Compass size={16} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '800' }}>
            {stats.totalCities}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Погоджені міста</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Дистанція маршруту</span>
            <Calendar size={16} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '800' }}>
            {stats.totalDistance} км
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Пробіг транспорту</p>
        </div>
      </div>

      {/* Main Info Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
        {/* Step Status description */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ПОТОЧНИЙ СТАН ТУРУ</h3>
          
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '16px', background: 'var(--bg-main)' }}>
            {currentStage === 0 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 1: Ініціалізація аналітики</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Очікується ім'я артиста для початку аналізу. Будь ласка, перейдіть до меню "Аналітика" та введіть ім'я артиста.
                </p>
              </div>
            )}
            {currentStage === 1 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 2: Затвердження міст туру</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  ШІ-агент **Profiler** обробив поточну статистику. Перейдіть до вкладки **Аналітика**, щоб затвердити перелік міст та ціни квитків.
                </p>
              </div>
            )}
            {currentStage === 2 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 3: Вибір залів</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  ШІ-агент **Scout** зібрав контакти клубів. Перейдіть у розділ **Пошук залів** для детального аналізу та відправки пропозицій.
                </p>
              </div>
            )}
            {currentStage === 3 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 4: Оптимізація логістики</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  ШІ-агент **Logistics** розрахував оптимальний ітінерарій та проживання команди. Перевірте деталі у вкладці **Логістика**.
                </p>
              </div>
            )}
            {currentStage === 4 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 5: Узгодження фінансів</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  ШІ-агент **Accountant** розробив модель прибутків та збитків. Перегляньте точку беззбитковості у вкладці **Бюджет**.
                </p>
              </div>
            )}
            {currentStage === 5 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 6: Підписання документів</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  ШІ-агент **Legal** сформував договори виступів та технічні специфікації. Підпишіть документи у вкладці **Угоди**.
                </p>
              </div>
            )}
            {currentStage === 6 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>КРОК 7: Маркетингова кампанія</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Договори підписано. ШІ-агент **Promo** підготував таргет. Активуйте промо на ШІ-панелі справа.
                </p>
              </div>
            )}
            {currentStage > 6 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>ТУР ОФІЦІЙНО ЗАПУЩЕНО</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Всі підготовчі процеси завершено. Ведеться моніторинг продажу квитків та рекламних кампаній у реальному часі.
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
            {currentStage > 0 && currentStage <= 6 && (
              <button className="btn btn-primary" onClick={() => {
                const tabs = ["", "analytics", "scout", "roadmap", "budget", "contracts", "promo"];
                setActiveTab(tabs[currentStage]);
              }}>
                Перейти до кроку {currentStage} <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* AI team state info */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Команда ШІ</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
              <span>Всі системи активні</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'transparent', border: '1px solid var(--border-color)' }}></div>
              <span>Очікування затверджень</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={14} />
              <span>BUILD: SLATE & SAND v2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
