import React from 'react';
import { Calendar, Truck, Hotel, Clock } from 'lucide-react';

export default function RoadmapLogistics({ 
  currentStage, 
  roadmap, 
  onApprove 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
          ОПТИМІЗОВАНИЙ ІТІНЕРАРІЙ ТУРУ (ROADMAP)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          Агент **Logistics** розрахував оптимальний графік переїздів для уникнення холостого пробігу транспорту.
        </p>

        {/* Timeline Itinerary */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          {roadmap.map((item, idx) => (
            <div className={`timeline-item ${idx === 0 ? 'active' : ''}`} key={idx}>
              <div className="timeline-marker" style={{ borderRadius: '0px' }}>
                <Calendar size={16} />
              </div>
              
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                      {item.date.toUpperCase()}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '900', color: 'var(--text-primary)', marginTop: '2px', textTransform: 'uppercase' }}>
                      {item.city} — {item.venue}
                    </h4>
                  </div>
                  <span className="status-pill status-signed">
                    Шоу підтверджено
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  {/* Transit detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', padding: '6px' }}>
                      <Truck size={14} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block' }}>ПЕРЕЇЗД:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                        {item.transit}
                      </span>
                    </div>
                  </div>

                  {/* Accommodation detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', padding: '6px' }}>
                      <Hotel size={14} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block' }}>ГОТЕЛІ / ПРОЖИВАННЯ:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                        {item.hotel} (${item.hotelCost})
                      </span>
                    </div>
                  </div>

                  {/* Schedule detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', padding: '6px' }}>
                      <Clock size={14} />
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block' }}>ЧАС (SCHEDULE):</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                        Саундчек: {item.soundcheck} | Шоу: {item.showtime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentStage === 3 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '2px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Truck size={24} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}>ЗАТВЕРДЖЕННЯ ЛОГІСТИКИ</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Будь ласка, перевірте розклад та забронювання транспорту і готелів перед затвердженням бюджету.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Затвердити маршрут
          </button>
        </div>
      )}
    </div>
  );
}
