import React, { useState } from 'react';
import { Megaphone, TrendingUp, Info } from 'lucide-react';

export default function PromoMarketing({ 
  currentStage, 
  artistName, 
  onApprove 
}) {
  const [adBudget, setAdBudget] = useState(2500);

  const audiences = [
    { name: `Слухачі ${artistName} в Spotify (Lookalike)`, size: "240k - 380k", costPerClick: "$0.12" },
    { name: "Любителі поп/інді-музики (18-35 років)", size: "450k - 600k", costPerClick: "$0.15" },
    { name: "Постійні відвідувачі концертів у містах", size: "120k - 180k", costPerClick: "$0.22" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Marketing Configurator */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Megaphone size={18} />
          Промо-кампанія туру та бюджетування
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '20px' }}>
          Агент **Promo** підготував цільові аудиторії для таргету та підключив квиткові API.
        </p>

        {/* Budget Allocation Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '16px', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Бюджет на рекламу (Meta Ads):</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
              <span style={{ fontSize: '24px', fontWeight: '800' }}>${adBudget}</span>
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Охоплення: ~{(adBudget * 80).toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500"
              className="range-slider"
              value={adBudget}
              onChange={(e) => setAdBudget(parseInt(e.target.value))}
            />
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Рекомендовано: $2,000 - $3,500</span>
          </div>

          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '16px', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '800', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Аудиторії таргетингу:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              {audiences.map((aud, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--pill-bg)', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <span style={{ fontWeight: 'bold' }}>{aud.name}</span>
                  <span>{aud.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Trajectory Graph (Visible once Promo is Live) */}
        {currentStage >= 6 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} />
              Динаміка продажу квитків (План vs Факт)
            </h4>
            
            <div style={{ background: 'var(--bg-main)', padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
              <svg viewBox="0 0 600 220" style={{ width: '100%', height: 'auto' }}>
                {/* Horizontal Grid */}
                {[0, 1, 2, 3].map((i) => (
                  <line 
                    key={i} 
                    x1="60" 
                    y1={30 + i * 50} 
                    x2="560" 
                    y2={30 + i * 50} 
                    className="chart-grid" 
                  />
                ))}

                {/* Y-axis (Sales in %) */}
                <text x="15" y="35" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">100%</text>
                <text x="15" y="85" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">75%</text>
                <text x="15" y="135" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">50%</text>
                <text x="15" y="185" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">0%</text>

                {/* X-axis (Weeks) */}
                <text x="60" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 1</text>
                <text x="160" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 3</text>
                <text x="260" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 5</text>
                <text x="360" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 7</text>
                <text x="460" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 9</text>
                <text x="560" y="210" fill="var(--text-secondary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">ТИЖ. 10</text>

                {/* Benchmark target line (dashed gray) */}
                <path 
                  d="M 60 180 Q 200 150, 360 80 T 560 30" 
                  className="chart-path-benchmark" 
                />

                {/* Area under actual sales */}
                {currentStage > 6 && (
                  <path 
                    d="M 60 180 C 120 178, 200 130, 300 110 S 420 50, 560 25 L 560 180 L 60 180 Z" 
                    fill="var(--accent)"
                    fillOpacity="0.06"
                  />
                )}

                {/* Actual Sales line */}
                {currentStage > 6 && (
                  <path 
                    d="M 60 180 C 120 178, 200 130, 300 110 S 420 50, 560 25" 
                    className="chart-path-main" 
                    stroke="var(--accent)"
                  />
                )}

                {/* Legend */}
                <g transform="translate(400, 150)" fontFamily="var(--font-mono)" fontSize="9">
                  <line x1="0" y1="10" x2="30" y2="10" className="chart-path-benchmark" />
                  <text x="35" y="13" fill="var(--text-secondary)">Планова крива</text>
                  
                  {currentStage > 6 && (
                    <>
                      <line x1="0" y1="25" x2="30" y2="25" className="chart-path-main" stroke="var(--accent)" />
                      <text x="35" y="28" fill="var(--text-secondary)">Реальні продажі</text>
                    </>
                  )}
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>

      {currentStage === 6 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Info size={20} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '800' }}>СТАРТ ПРОМО-КАМПАНІЇ</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Підтвердіть активацію рекламних бюджетів на суму ${adBudget} для офіційного анонсу туру та відкриття кас.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Запустити промо & продажі
          </button>
        </div>
      )}
    </div>
  );
}
