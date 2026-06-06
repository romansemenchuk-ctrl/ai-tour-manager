import React, { useState } from 'react';
import { Megaphone, Users, Award, TrendingUp, Info } from 'lucide-react';

export default function PromoMarketing({ 
  currentStage, 
  artistName, 
  onApprove 
}) {
  const [adBudget, setAdBudget] = useState(2500); // Meta Ads budget

  // Target audience selection
  const audiences = [
    { name: `Слухачі ${artistName} в Spotify (Lookalike)`, size: "240k - 380k", costPerClick: "$0.12" },
    { name: "Любителі поп/інді-музики (18-35 років)", size: "450k - 600k", costPerClick: "$0.15" },
    { name: "Постійні відвідувачі концертів у клубах", size: "120k - 180k", costPerClick: "$0.22" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Marketing Configurator */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Megaphone size={20} style={{ color: 'var(--amber-glow)' }} />
          Автоматизована промо-кампанія туру
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
          Агент **Promo Manager** сформував цільові аудиторії та підготував рекламні креативи для запуску у Facebook, Instagram та TikTok.
        </p>

        {/* Budget Allocation Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Загальний бюджет на таргетинг:</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--amber-glow)' }}>${adBudget}</span>
              <span style={{ fontSize: '12px', color: 'var(--spotify-green)', fontWeight: '600' }}>Очікуване охоплення: ~{(adBudget * 80).toLocaleString()}</span>
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
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Рекомендований бюджет: $2,000 - $3,500</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600' }}>Аудиторії ретаргетингу:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {audiences.map((aud, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', background: 'rgba(0,0,0,0.15)', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ color: '#fff', fontWeight: '500' }}>{aud.name}</span>
                  <span style={{ color: 'var(--cyan-glow)' }}>{aud.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Trajectory Graph (Visible once Promo is Live) */}
        {currentStage >= 6 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} style={{ color: 'var(--spotify-green)' }} />
              Траєкторія продажу квитків (План vs. Факт)
            </h4>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
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
                <text x="15" y="35" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">100%</text>
                <text x="15" y="85" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">75%</text>
                <text x="15" y="135" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">50%</text>
                <text x="15" y="185" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">0%</text>

                {/* X-axis (Weeks) */}
                <text x="60" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 1</text>
                <text x="160" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 3</text>
                <text x="260" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 5</text>
                <text x="360" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 7</text>
                <text x="460" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 9</text>
                <text x="560" y="210" fill="var(--text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--font-heading)">Тиж. 10</text>

                {/* Benchmark target line (dashed cyan) */}
                <path 
                  d="M 60 180 Q 200 150, 360 80 T 560 30" 
                  className="chart-path-benchmark" 
                />

                {/* Actual Sales line (solid indigo with glow) */}
                {currentStage > 6 && (
                  <path 
                    d="M 60 180 C 120 178, 200 130, 300 110 S 420 50, 560 25" 
                    className="chart-path-main" 
                  />
                )}

                {/* Legend */}
                <g transform="translate(420, 160)">
                  <line x1="0" y1="10" x2="30" y2="10" className="chart-path-benchmark" />
                  <text x="35" y="13" fill="var(--text-secondary)" fontSize="9">Плановий темп</text>
                  
                  {currentStage > 6 && (
                    <>
                      <line x1="0" y1="25" x2="30" y2="25" className="chart-path-main" />
                      <text x="35" y="28" fill="var(--text-secondary)" fontSize="9">Фактичні продажі</text>
                    </>
                  )}
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>

      {currentStage === 6 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Info style={{ color: 'var(--amber-glow)' }} size={24} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Все готово до анонсу та старту</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                Підтвердіть запуск маркетингового плану на суму ${adBudget} для початку активної фази продажів та відслідковування траєкторії.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Запустити тур
          </button>
        </div>
      )}
    </div>
  );
}
