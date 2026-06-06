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
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(13,17,33,0.45) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent)' }}>Платформа Автоматизації</span>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', fontWeight: '800', marginTop: '4px', color: '#fff' }}>
            {artistName ? `Тур артиста: ${artistName}` : 'Новий концертний тур'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '600px' }}>
            Автономні ШІ-агенти опрацьовують контакти, логістику та промо. Ваша участь необхідна лише для фінальних затверджень.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="status-pill status-signed" style={{ padding: '8px 16px', fontSize: '12px' }}>
            <Shield size={14} style={{ marginRight: '6px' }} /> Human-in-the-Loop Active
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', marginBottom: '16px', fontWeight: '600', color: '#fff' }}>Етапи автоматизації туру</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', overflowX: 'auto', padding: '10px 0' }}>
          <div style={{ position: 'absolute', top: '29px', left: '0', right: '0', height: '2px', background: 'var(--border-color)', zIndex: '1' }}></div>
          <div style={{ position: 'absolute', top: '29px', left: '0', width: `${((Math.min(currentStage, 6)) / 6) * 100}%`, height: '2px', background: 'var(--accent)', zIndex: '1', transition: 'width 0.4s ease' }}></div>
          
          {steps.map((step, index) => {
            const isCompleted = currentStage > step.stage;
            const isActive = currentStage === step.stage;
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: '2', position: 'relative', minWidth: '70px', cursor: 'pointer' }} onClick={() => currentStage >= step.stage && setActiveTab(step.stage === 1 ? 'analytics' : step.stage === 2 ? 'scout' : step.stage === 3 ? 'roadmap' : step.stage === 4 ? 'budget' : step.stage === 5 ? 'contracts' : 'promo')}>
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: isCompleted ? 'var(--accent)' : isActive ? 'rgba(99,102,241,0.2)' : 'var(--bg-main)',
                  border: `2px solid ${isCompleted || isActive ? 'var(--accent)' : 'var(--border-color)'}`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: isCompleted || isActive ? '#fff' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 15px rgba(99,102,241,0.4)' : 'none',
                  fontSize: '13px'
                }}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span style={{ 
                  fontSize: '11px', 
                  marginTop: '8px', 
                  fontWeight: isActive ? '700' : '500', 
                  color: isActive ? 'var(--text-primary)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-muted)' 
                }} className="sidebar-label">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600' }}>Аудиторія в турі</span>
            <div style={{ p: '8px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', padding: '6px' }}>
              <Users size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: '700' }}>
            {stats.monthlyListeners.toLocaleString()}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Слухачів у цільових містах</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600' }}>Загальний бюджет</span>
            <div style={{ p: '8px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: 'var(--spotify-green)', padding: '6px' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: '700' }}>
            ${stats.projectedRevenue.toLocaleString()}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Прогнозована виручка (100% збори)</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600' }}>Кількість міст</span>
            <div style={{ p: '8px', borderRadius: '8px', background: 'rgba(168,85,247,0.1)', color: 'var(--purple-glow)', padding: '6px' }}>
              <Compass size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: '700' }}>
            {stats.totalCities}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Сплановано міст та клубів</p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600' }}>Транспорт та логістика</span>
            <div style={{ p: '8px', borderRadius: '8px', background: 'rgba(6,182,212,0.1)', color: 'var(--cyan-glow)', padding: '6px' }}>
              <Calendar size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', color: '#fff', fontWeight: '700' }}>
            {stats.totalDistance} км
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Довжина маршруту (мінімізована)</p>
        </div>
      </div>

      {/* Main Info Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Dynamic Status / Actions */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff' }}>Поточний стан туру</h3>
          
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            {currentStage === 0 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 1: Ініціалізація аналітики</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Агенти очікують імені артиста для парсингу стрімінгів. Будь ласка, введіть ім'я артиста у полі введення та запустіть первинний аналіз аудиторії.
                </p>
              </div>
            )}
            {currentStage === 1 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 2: Затвердження міст</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Агент **Artist Profiler** проаналізував стрімінгову та соціальну активність артиста. Перейдіть до вкладки **Аналітика**, щоб налаштувати ціни квитків та затвердити список міст для туру.
                </p>
              </div>
            )}
            {currentStage === 2 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 3: Пошук майданчиків</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Агент **Venue Scout** знайшов клуби у кожному місті з відповідною місткістю. Перейдіть у вкладку **Клуби**, щоб переглянути контакти та надіслати тестові ШІ-листи з пропозиціями дат.
                </p>
              </div>
            )}
            {currentStage === 3 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 4: Маршрут та логістика</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Агенти узгодили дати та сформували послідовність поїздки для уникнення зайвих витрат. Перевірте хронологію виступів та готелі у вкладці **Логістика**.
                </p>
              </div>
            )}
            {currentStage === 4 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 5: Узгодження фінансів</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Агент **Tour Accountant** розрахував P&L туру з урахуванням витрат на логістику та оренду. Перегляньте точку беззбитковості та фінансові ризики у вкладці **Бюджет**.
                </p>
              </div>
            )}
            {currentStage === 5 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 6: Контракти та Райдери</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Усі умови погоджено. Агент **Legal Assistant** згенерував договори виступів та технічні специфікації. Ознайомтесь та підпишіть документи у вкладці **Угоди**.
                </p>
              </div>
            )}
            {currentStage === 6 && (
              <div>
                <h4 style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Крок 7: Маркетинг & Запуск</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Договори підписано, дати анонсовано! Агент **Promo Manager** сформував план просування. Натисніть "Запустити промо" у правій панелі, щоб активувати таргет та почати збір аналітики продажів.
                </p>
              </div>
            )}
            {currentStage > 6 && (
              <div>
                <h4 style={{ color: 'var(--spotify-green)', fontWeight: '600', marginBottom: '8px' }}>Вітаємо! Тур активний</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Всі підготовчі процеси завершено. Ви можете відслідковувати динаміку продажу квитків та рекламні бюджети у реальному часі у вкладці **Промо**.
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

        {/* System Overview info */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff' }}>ШІ-Команда</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--spotify-green)' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>Агенти активні</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber-glow)', animation: 'blink 1s infinite alternate' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>Очікування дій людини</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
              <Award size={16} />
              <span>Версія системи: v1.0.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
