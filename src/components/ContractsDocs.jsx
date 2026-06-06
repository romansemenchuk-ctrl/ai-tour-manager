import React, { useState } from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export default function ContractsDocs({ 
  currentStage, 
  artistName, 
  venues, 
  onApprove 
}) {
  const [activeTab, setActiveTab] = useState("contract");
  const [selectedVenue, setSelectedVenue] = useState(venues.filter(v => v.status === 'signed' || v.status === 'negotiating')[0] || venues[0] || null);
  const [isSigned, setIsSigned] = useState(false);

  const getContractText = () => {
    if (!selectedVenue) return "No venue selected.";
    return `PERFORMANCE AGREEMENT (DRAFT)
=============================
Date: June 6, 2026

BETWEEN:
Artist Representative: AI Tour Agency on behalf of ${artistName.toUpperCase()}
Venue Representative: ${selectedVenue.name.toUpperCase()} Booker (${selectedVenue.city}, ${selectedVenue.country})

1. ENGAGEMENT:
Artist agrees to perform a live music set at ${selectedVenue.name} in ${selectedVenue.city}.
- Date: October 15, 2026.
- Load-in: 16:00. Soundcheck: 17:30. Doors: 19:00. Show: 20:00.

2. FINANCIAL TERMS:
- Venue agrees to pay Artist a flat Guarantee Fee of $${selectedVenue.capacity > 1000 ? '2500' : '1500'} USD.
- Split Deal: Artist receives 70% of Net Ticket Sales after venue expense deduction ($500).
- Deposit: 50% paid upon signing. Remaining 50% paid on night of show.

3. UNDERTAKINGS:
- Venue provides full in-house PA and lighting systems as specified in the Technical Rider.
- Venue provides dressing room and catering as specified in the Hospitality Rider.

SIGNATURES:
Artist Manager: [ SIGNED ELECTRONICALLY ]
Venue Booker:   [ SIGNATURE CONFIRMED ]
`;
  };

  const getTechnicalRider = () => {
    return `TECHNICAL RIDER (AUDIO SPECIFICATIONS)
=====================================
Artist: ${artistName.toUpperCase()}

1. FOH PA SYSTEM:
- Multi-way professional sound reinforcement system (L-Acoustics, d&b audiotechnik).
- Must deliver minimum 110dB SPL clean undistorted sound at FOH position.

2. INPUT LIST (12 CHANNELS):
- CH 01: Kick Drum (Shure Beta 91A)
- CH 02: Snare (Shure SM57)
- CH 03: Hi-Hat (AKG C451)
- CH 04: Bass DI (Radial active DI)
- CH 05: Synth L (DI)
- CH 06: Synth R (DI)
- CH 07: Playback L (DI)
- CH 08: Playback R (DI)
- CH 09: Lead Vocal (Shure Beta 58 Wireless)
- CH 10: Backing Vocal (Shure SM58)
- CH 11: Spare Vocal (Shure SM58)
- CH 12: Talkback (Shure SM58)

3. MONITORING:
- 4 Stereo IEM Mixes (Sennheiser G4 transmitters).
- 2 wedge monitors on separate mixes on stage.
`;
  };

  const getHospitalityRider = () => {
    return `HOSPITALITY RIDER
==================
Artist: ${artistName.toUpperCase()}

1. DRESSING ROOM:
- One (1) private, lockable room with comfortable seating for 6 people.
- Mirror, clothing rack, and 6 clean towels.
- High-speed Wi-Fi access.

2. CATERING (To be ready in dressing room 2 hours before soundcheck):
- Fruit platter (bananas, grapes, berries).
- Sandwiches (including vegetarian options).
- 12 bottles of still mineral water (room temperature).
- Selection of hot teas, honey, and fresh lemons.
- 6 cans of energy drinks (sugar-free).

3. ACCOMMODATION:
- 3 double rooms (4-star minimum) with private parking for tour van.
`;
  };

  const handleSign = () => {
    setIsSigned(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {/* Document Selector Sidebar */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}>
            ДОКУМЕНТИ ТУРУ
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className={`btn ${activeTab === 'contract' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', width: '100%' }}
              onClick={() => setActiveTab('contract')}
            >
              Угода про виступ
            </button>
            <button 
              className={`btn ${activeTab === 'tech' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', width: '100%' }}
              onClick={() => setActiveTab('tech')}
            >
              Технічний райдер
            </button>
            <button 
              className={`btn ${activeTab === 'hospitality' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', width: '100%' }}
              onClick={() => setActiveTab('hospitality')}
            >
              Побутовий райдер
            </button>
          </div>

          <div style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '16px', marginTop: '12px', fontFamily: 'var(--font-mono)' }}>
            <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Концертний зал:
            </label>
            <select 
              className="input-glass" 
              style={{ padding: '8px 12px', fontSize: '11px' }}
              value={selectedVenue?.name}
              onChange={(e) => setSelectedVenue(venues.find(v => v.name === e.target.value))}
            >
              {venues.map((v, i) => (
                <option key={i} value={v.name}>{v.city.toUpperCase()} - {v.name.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Document Viewer */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '900', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
              <FileText size={16} />
              {activeTab === 'contract' ? 'Угода про виступ' : activeTab === 'tech' ? 'Технічний райдер' : 'Побутовий райдер'}
            </h4>
            <span className="status-pill status-scouted">
              ЗГЕНЕРОВАНО ШІ
            </span>
          </div>

          {/* Document Content */}
          <pre style={{ 
            background: 'var(--bg-main)', 
            padding: '20px', 
            border: 'var(--border-width) solid var(--border-color)', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            lineHeight: '1.6',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
            maxHeight: '400px'
          }}>
            {activeTab === 'contract' ? getContractText() : activeTab === 'tech' ? getTechnicalRider() : getHospitalityRider()}
          </pre>

          {/* Signature Panel */}
          {activeTab === 'contract' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '16px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Електронний підпис менеджера:</span>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: isSigned ? 'var(--text-primary)' : 'var(--text-muted)', marginTop: '4px' }}>
                  {isSigned ? '✓ ПІДПИСАНО ЦИФРОВИМ КЛЮЧЕМ' : 'ОЧІКУЄ ПІДПИСУ'}
                </p>
              </div>
              {!isSigned ? (
                <button className="btn btn-primary" onClick={handleSign}>
                  ПІДПИСАТИ УГОДУ
                </button>
              ) : (
                <div className="status-pill status-signed">Готово</div>
              )}
            </div>
          )}
        </div>
      </div>

      {currentStage === 5 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '2px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ShieldAlert size={24} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}>ОЧІКУЄТЬСЯ ПІДПИСАННЯ ДОГОВОРІВ</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Будь ласка, накладіть підпис на договори з усіма залами, перш ніж переходити до запуску промо-кампанії.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove} disabled={!isSigned}>
            Підтвердити підписання угоди
          </button>
        </div>
      )}
    </div>
  );
}
