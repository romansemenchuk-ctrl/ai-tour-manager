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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{ background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ШІ АВТОМАТИЗАЦІЯ // ТУРИ ТА КОНЦЕРТИ</span>
          <h2 style={{ fontSize: '30px', fontFamily: 'var(--font-heading)', fontWeight: '900', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            {artistName ? `АРТИСТ: ${artistName}` : 'НОВИЙ КОНЦЕРТНИЙ ТУР'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '8px', maxWidth: '600px', lineHeight: '1.4' }}>
            Мультиагентна система ШІ веде пошук залів, розрахунок логістики та маркетингові таски. Затверджуйте кроки на панелі справа.
          </p>
        </div>
        <div>
          <div className="status-pill status-signed" style={{ fontSize: '11px', padding: '6px 12px', border: '2px solid var(--border-color)', boxShadow: '2px 2px 0px var(--shadow-color)' }}>
            <Shield size={12} style={{ marginRight: '6px' }} /> HUMAN-IN-THE-LOOP ACTIVE
          </div>
        </div>
      </div>

      {/* Progress Itinerary Timeline */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', marginBottom: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ЕТАПИ АКТИВАЦІЇ ТУРУ</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', overflowX: 'auto', padding: '10px 0' }}>
          {/* Flat black line across timeline */}
          <div style={{ position: 'absolute', top: '30px', left: '0', right: '0', height: '3px', background: 'var(--border-color)', zIndex: '1' }}></div>
          
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
                  width: '40px', 
                  height: '40px', 
                  background: isCompleted ? 'var(--accent)' : isActive ? 'var(--card-bg)' : 'var(--bg-main)',
                  border: `2px solid var(--border-color)`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '900',
                  color: isCompleted ? 'var(--accent-text)' : isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: isActive ? '3px 3px 0px var(--shadow-color)' : 'none',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span style={{ 
                  fontSize: '11px', 
                  marginTop: '10px', 
                  fontWeight: '800', 
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
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Аудиторія (Reach)</span>
            <Users size={16} />
          </div>
          <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900' }}>
            {stats.monthlyListeners.toLocaleString()}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Слухачів у містах</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Прогнозована виручка</span>
            <DollarSign size={16} />
          </div>
          <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900' }}>
            ${stats.projectedRevenue.toLocaleString()}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>При 100% зборах</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Кількість залів</span>
            <Compass size={16} />
          </div>
          <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900' }}>
            {stats.totalCities}
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Затверджені майданчики</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Загальна відстань</span>
            <Calendar size={16} />
          </div>
          <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900' }}>
            {stats.totalDistance} км
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>Маршрут туру</p>
        </div>
      </div>

      {/* Main Info Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
        {/* Step-by-Step Status Description */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ПОТОЧНИЙ СТАН ТУРУ</h3>
          
          <div style={{ border: 'var(--border-width) solid var(--border-color)', padding: '16px', background: 'var(--bg-main)' }}>
            {currentStage === 0 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 1 ]: ІНІЦІАЛІЗАЦІЯ АНАЛІТИКИ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Система очікує назву артиста для початку аналізу стрімінгів. Будь ласка, введіть назву гурту або артиста в меню "Аналітика".
                </p>
              </div>
            )}
            {currentStage === 1 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 2 ]: ЗАТВЕРДЖЕННЯ МІСТ ТУРУ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Агент **Profiler** обробив поточну статистику. Перейдіть до вкладки **Аналітика**, щоб налаштувати вартість квитків та затвердити список міст.
                </p>
              </div>
            )}
            {currentStage === 2 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 3 ]: ПОШУК І ВИБІР ЗАЛІВ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Агент **Scout** підготував шортлист майданчиків. Відкрийте розділ **Пошук залів** для перегляду контактів та відправки пітч-імейлів.
                </p>
              </div>
            )}
            {currentStage === 3 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 4 ]: ОПТИМІЗАЦІЯ МАРШРУТУ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Агент **Logistics** розрахував оптимальний ітінерарій, проживання команди та графік виступів. Перевірте деталі у вкладці **Логістика**.
                </p>
              </div>
            )}
            {currentStage === 4 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 5 ]: УЗГОДЖЕННЯ БЮДЖЕТУ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Агент **Accountant** підготував фінансову P&L модель. Перевірте витрати та прогнозований чистий дохід у вкладці **Бюджет**.
                </p>
              </div>
            )}
            {currentStage === 5 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 6 ]: ЮРИДИЧНЕ ОФОРМЛЕННЯ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Агент **Legal** сформував договори виступів та райдери. Перегляньте та підпишіть документи у вкладці **Угоди**.
                </p>
              </div>
            )}
            {currentStage === 6 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>[ КРОК 7 ]: ЗАПУСК РЕКЛАМНИХ КАМПАНІЙ</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Договори підписано. Агент **Promo** підготував рекламні аудиторії ретаргету. Активуйте промо на ШІ-панелі справа.
                </p>
              </div>
            )}
            {currentStage > 6 && (
              <div>
                <h4 style={{ fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px', fontSize: '13px' }}>ТУР ОФІЦІЙНО ЗАПУЩЕНО</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-mono)' }}>
                  Всі підготовчі процеси завершено. Ведеться моніторинг продажу квитків та бюджетів таргетингу в реальному часі.
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
                ПЕРЕЙТИ ДО КРОКУ {currentStage} <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* AI team state info */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ШІ АГЕНТИ</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', border: '1px solid var(--border-color)', background: 'var(--border-color)' }}></div>
              <span>Всі системи активні</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', border: '1px solid var(--border-color)', background: 'transparent' }}></div>
              <span>Очікування затверджень</span>
            </div>
          </div>

          <div style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '16px', marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={14} />
              <span>BUILD: MONOCHROME v2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
