import React from 'react';
import { Calendar, Truck, Hotel, Clock, CheckCircle } from 'lucide-react';

export default function RoadmapLogistics({ 
  currentStage, 
  roadmap, 
  onApprove 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Оптимальний маршрут & Логістична карта
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
          Агент **Logistics Planner** проаналізував географію міст та розрахував оптимальну послідовність виступів для мінімізації пробігу транспорту та економії палива.
        </p>

        {/* Timeline Itinerary */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          {roadmap.map((item, idx) => (
            <div className={`timeline-item ${idx === 0 ? 'active' : ''}`} key={idx}>
              <div className="timeline-marker">
                <Calendar size={18} />
              </div>
              
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {item.date}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff', marginTop: '2px' }}>
                      {item.city} — {item.venue}
                    </h4>
                  </div>
                  <span className="status-pill status-signed" style={{ fontSize: '11px' }}>
                    Шоу заплановано
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {/* Transit detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--cyan-glow)', padding: '8px', borderRadius: '8px' }}>
                      <Truck size={16} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Транспорт та переїзд</span>
                      <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>
                        {item.transit}
                      </span>
                    </div>
                  </div>

                  {/* Accommodation detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(168,85,247,0.1)', color: 'var(--purple-glow)', padding: '8px', borderRadius: '8px' }}>
                      <Hotel size={16} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Проживання</span>
                      <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>
                        {item.hotel} (оцінка: ${item.hotelCost})
                      </span>
                    </div>
                  </div>

                  {/* Schedule detail */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(29,185,84,0.1)', color: 'var(--spotify-green)', padding: '8px', borderRadius: '8px' }}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Таймінг дня</span>
                      <span style={{ fontSize: '12px', color: '#fff', fontWeight: '500' }}>
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
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Truck style={{ color: 'var(--amber-glow)' }} size={24} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Очікується погодження логістичного плану</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                Підтвердіть маршрут туру та заброньовані готелі. Після затвердження агент **Tour Accountant** розрахує повний фінансовий звіт.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Затвердити логістичний план
          </button>
        </div>
      )}
    </div>
  );
}
