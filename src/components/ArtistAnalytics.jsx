import React, { useState } from 'react';
import { BarChart, MapPin, Users, Flame, Info } from 'lucide-react';

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

  // Find max listeners to scale the SVG chart bars
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800', color: '#fff' }}>Ініціалізувати новий тур</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              Введіть ім'я артиста, щоб активувати ШІ-агентів для аналізу стрімінгів та планування туру.
            </p>
          </div>
          
          <form onSubmit={handleInit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Ім'я артиста або назва гурту
              </label>
              <input 
                type="text" 
                className="input-glass" 
                placeholder="напр., KAZKA, The Hardkiss, Latexfauna"
                value={tempArtist}
                onChange={(e) => setTempArtist(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px' }}>
              Аналізувати дані аудиторії
            </button>
          </form>
        </div>
      ) : (
        /* Analytics View */
        <>
          <div className="glass-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart size={20} style={{ color: 'var(--accent)' }} />
              Аналітика слухачів за містами для: {artistName}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>
              Наш агент **Artist Profiler** підключився до Spotify API та Apple Music Stats, виявивши найбільші концентрації активної аудиторії.
            </p>

            {/* Custom SVG Chart */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
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
                <text x="15" y="45" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">{(maxListeners / 1000).toFixed(0)}k</text>
                <text x="15" y="95" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">{(maxListeners * 0.66 / 1000).toFixed(0)}k</text>
                <text x="15" y="145" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">{(maxListeners * 0.33 / 1000).toFixed(0)}k</text>
                <text x="15" y="195" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">0</text>

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
                      {/* Bar Gradient Shadow */}
                      <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={barHeight} 
                        fill="url(#barGradient)" 
                        rx="4" 
                        style={{ cursor: 'pointer' }}
                      />
                      {/* Top Glowing Dot */}
                      <circle 
                        cx={x + barWidth / 2} 
                        cy={y} 
                        r="3" 
                        fill="var(--accent)" 
                      />
                      {/* X-axis Label */}
                      <text 
                        x={x + barWidth / 2} 
                        y="215" 
                        fill="#fff" 
                        fontSize="11" 
                        textAnchor="middle" 
                        fontWeight="600"
                        fontFamily="var(--font-heading)"
                      >
                        {city.name}
                      </text>
                      {/* Value label */}
                      <text 
                        x={x + barWidth / 2} 
                        y={y - 8} 
                        fill="var(--cyan-glow)" 
                        fontSize="10" 
                        textAnchor="middle" 
                        fontFamily="var(--font-mono)"
                      >
                        {(city.monthlyListeners / 1000).toFixed(0)}k
                      </text>
                    </g>
                  );
                })}

                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--panel-bg)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Pricing Configurator Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {citiesData.map((city, idx) => (
              <div className="glass-card" key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} style={{ color: 'var(--accent)' }} />
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff' }}>
                      {city.name}, {city.country}
                    </h4>
                  </div>
                  <span className="status-pill status-scouted" style={{ fontSize: '10px' }}>
                    Збори: {city.estimatedDraw} чол.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Квитки (Звичайні)</span>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--cyan-glow)', marginTop: '4px' }}>
                      ${city.ticketPriceGA}
                    </p>
                  </div>
                  <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Квитки (VIP)</span>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--purple-glow)', marginTop: '4px' }}>
                      ${city.ticketPriceVIP}
                    </p>
                  </div>
                </div>

                {/* Range Sliders for dynamic price tests */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Ціна General Admission</span>
                      <span style={{ color: '#fff', fontWeight: '600' }}>${city.ticketPriceGA}</span>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Ціна VIP Квитка</span>
                      <span style={{ color: '#fff', fontWeight: '600' }}>${city.ticketPriceVIP}</span>
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
            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Info style={{ color: 'var(--amber-glow)' }} size={24} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Очікується підтвердження міст туру</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                    Затвердьте цінові діапазони та перелік міст, щоб агент **Venue Scout** зміг розпочати пошук та збір контактів клубів.
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
