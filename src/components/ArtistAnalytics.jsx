import React, { useState } from 'react';
import { BarChart, MapPin, Flame, Info } from 'lucide-react';

export default function ArtistAnalytics({ 
  currentStage, 
  artistName, 
  setArtistName, 
  citiesData, 
  onUpdateCityPrice, 
  onApprove 
}) {
  const [tempArtist, setTempArtist] = useState(artistName);

  const handleInit = (e) => {
    e.preventDefault();
    if (tempArtist.trim()) {
      setArtistName(tempArtist.trim());
    }
  };

  const maxListeners = citiesData.length > 0 
    ? Math.max(...citiesData.map(c => c.monthlyListeners)) 
    : 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {currentStage === 0 ? (
        /* Setup / Initialization Form */
        <div className="glass-card" style={{ maxWidth: '600px', margin: '40px auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Flame size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>Ініціалізувати новий тур</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px', lineHeight: '1.4' }}>
              Введіть ім'я артиста для початку аналізу стрімінгів та визначення цільових міст ШІ-агентами.
            </p>
          </div>
          
          <form onSubmit={handleInit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Ім'я артиста або гурту:
              </label>
              <input 
                type="text" 
                className="input-glass" 
                placeholder="напр., The Hardkiss, Latexfauna, KAZKA"
                value={tempArtist}
                onChange={(e) => setTempArtist(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
              Аналізувати стрімінги
            </button>
          </form>
        </div>
      ) : (
        /* Analytics View */
        <>
          <div className="glass-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart size={18} />
              Статистика прослуховувань за містами: {artistName}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '24px' }}>
              Profiler завантажив дані прослуховувань та розрахував оптимальні пороги цін квитків.
            </p>

            {/* Stark Monochrome SVG Chart */}
            <div style={{ background: 'var(--bg-main)', padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', marginBottom: '24px' }}>
              <svg viewBox="0 0 600 240" style={{ width: '100%', height: 'auto' }}>
                {/* Horizontal Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line 
                    key={i} 
                    x1="60" 
                    y1={40 + i * 50} 
                    x2="560" 
                    y2={40 + i * 50} 
                    className="chart-grid" 
                  />
                ))}

                {/* Y-axis Labels */}
                <text x="15" y="45" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">{(maxListeners / 1000).toFixed(0)}k</text>
                <text x="15" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">{(maxListeners * 0.66 / 1000).toFixed(0)}k</text>
                <text x="15" y="145" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">{(maxListeners * 0.33 / 1000).toFixed(0)}k</text>
                <text x="15" y="195" fill="var(--text-secondary)" fontSize="9" fontFamily="var(--font-mono)">0</text>

                {/* Bars & City names */}
                {citiesData.map((city, idx) => {
                  const barWidth = 40;
                  const spacing = 95;
                  const x = 80 + idx * spacing;
                  const maxBarHeight = 150;
                  const barHeight = (city.monthlyListeners / maxListeners) * maxBarHeight;
                  const y = 190 - barHeight;

                  return (
                    <g key={idx}>
                      {/* Premium Soft Filled Bar */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={barHeight} 
                        fill="var(--accent)"
                        fillOpacity="0.12"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        rx="4"
                        style={{ cursor: 'pointer' }}
                      />
                      {/* Value label */}
                      <text 
                        x={x + barWidth / 2} 
                        y={y - 8} 
                        fill="var(--text-primary)" 
                        fontSize="9" 
                        textAnchor="middle" 
                        fontWeight="bold"
                        fontFamily="var(--font-mono)"
                      >
                        {(city.monthlyListeners / 1000).toFixed(0)}k
                      </text>
                      {/* X-axis Label */}
                      <text 
                        x={x + barWidth / 2} 
                        y="215" 
                        fill="var(--text-primary)" 
                        fontSize="11" 
                        textAnchor="middle" 
                        fontWeight="700"
                        fontFamily="var(--font-heading)"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Pricing Configurator */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {citiesData.map((city, idx) => (
              <div className="glass-card" key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} style={{ color: 'var(--text-secondary)' }} />
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {city.name}, {city.country}
                    </h4>
                  </div>
                  <span className="status-pill status-scouted">
                    {city.estimatedDraw} чол.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '12px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Квиток (GA)</span>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                      ${city.ticketPriceGA}
                    </p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Квиток (VIP)</span>
                    <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
                      ${city.ticketPriceVIP}
                    </p>
                  </div>
                </div>

                {/* Range Sliders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                      <span>Ціна General Admission</span>
                      <span style={{ fontWeight: 'bold' }}>${city.ticketPriceGA}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      className="range-slider"
                      value={city.ticketPriceGA}
                      onChange={(e) => onUpdateCityPrice(idx, 'GA', parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                      <span>Ціна VIP квитка</span>
                      <span style={{ fontWeight: 'bold' }}>${city.ticketPriceVIP}</span>
                    </div>
                    <input 
                      type="range" 
                      min="30" 
                      max="250" 
                      className="range-slider"
                      value={city.ticketPriceVIP}
                      onChange={(e) => onUpdateCityPrice(idx, 'VIP', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentStage === 1 && (
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Info size={20} style={{ color: 'var(--text-secondary)' }} />
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '800' }}>ЗАТВЕРДЖЕННЯ МІСТ ТУРУ</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                    Будь ласка, перевірте ціни квитків та затвердіть шортлист міст для запуску пошуку майданчиків.
                  </p>
                </div>
              </div>
              <button className="btn btn-primary" onClick={onApprove}>
                Затвердити міста та ціни
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
