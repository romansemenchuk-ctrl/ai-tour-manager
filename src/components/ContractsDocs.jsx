import React, { useState } from 'react';
import { FileText, Award, ShieldAlert, Check, RefreshCw } from 'lucide-react';

export default function ContractsDocs({ 
  currentStage, 
  artistName, 
  venues, 
  onApprove 
}) {
  const [activeTab, setActiveTab] = useState("contract"); // contract | tech | hospitality
  const [selectedVenue, setSelectedVenue] = useState(venues.filter(v => v.status === 'signed')[0] || venues[0] || null);
  const [isSigned, setIsSigned] = useState(false);

  // Generate dynamic contract text
  const getContractText = () => {
    if (!selectedVenue) return "No venue selected.";
    return `PERFORMANCE AGREEMENT (DRAFT)

This agreement is entered into on June 6, 2026, by and between:
ARTIST REPRESENTATIVE: AI Tour Agency on behalf of ${artistName || '[Artist]'}
VENUE REPRESENTATIVE: ${selectedVenue.name} Booking Team, ${selectedVenue.city}, ${selectedVenue.country}

1. PERFORMANCE DETAILS:
- Artist will perform a live musical concert at ${selectedVenue.name} in ${selectedVenue.city}.
- Date: October 15, 2026.
- Soundcheck Time: 17:30. Doors: 19:00. Showtime: 20:00.

2. FINANCIAL Deal:
- Venue agrees to pay Artist a flat Guarantee Fee of $${selectedVenue.capacity > 1000 ? '2500' : '1500'} USD.
- In addition, Artist will receive 70% of Net Ticket Sales revenue after deduction of local tax and venue expenses ($500).
- Payment of 50% deposit ($${selectedVenue.capacity > 1000 ? '1250' : '750'}) due upon signing. Remaining 50% due on night of show.

3. FORCE MAJEURE:
Neither party shall be liable for cancellations due to Acts of God, war, government regulations, or other emergencies beyond control.

IN WITNESS WHEREOF, the parties hereto sign this document:

Signed by Artist Manager:  [ ELECTRONIC SIGNATURE CHECKED ]
Signed by Venue Booker:  [ PENDING SIGNATURE ]
`;
  };

  const getTechnicalRider = () => {
    return `TECHNICAL RIDER (STAGE PLOT & AUDIO SPECIFICATIONS)
Artist: ${artistName || '[Artist]'}

I. FRONT OF HOUSE (FOH) SYSTEM:
- PA System must be capable of delivering clean 110dB SPL at mixing desk. L-Acoustics, d&b audiotechnik, or Meyer Sound preferred.
- 32-channel digital console (Behringer X32 or Midas M32 minimum).

II. STAGE INPUT LIST (12 Channels):
1. Kick Drum - Shure Beta 91A
2. Snare Top - Shure SM57
3. Hi-Hat - AKG C451
4. Bass Guitar - DI Box (Radial)
5. Synthesizer L - DI Box
6. Synthesizer R - DI Box
7. Backing Track L - DI Box
8. Backing Track R - DI Box
9. Main Vocal - Shure Beta 58 (Wireless)
10. Backing Vocal - Shure SM58
11. Spare Vocal - Shure SM58
12. Talkback - Shure SM58

III. MONITORING:
- 4 Stereo In-Ear Monitor (IEM) Sennheiser G4 transmitters.
- 2 wedge monitors on separate mixes for backline.
`;
  };

  const getHospitalityRider = () => {
    return `HOSPITALITY & CATERING RIDER
Artist: ${artistName || '[Artist]'}

I. DRESSING ROOM REQUIREMENTS:
- One (1) clean, private, lockable dressing room with comfortable seating for 6 people.
- Mirror, clothing rack, and 6 clean towels.
- High-speed Wi-Fi access.

II. CATERING (To be ready in dressing room 2 hours before soundcheck):
- Fresh fruit platter (bananas, grapes, berries).
- Assorted sandwiches (including vegetarian options).
- 12 bottles of still mineral water (room temperature).
- Selection of hot teas, honey, and fresh lemons.
- 6 cans of energy drinks (sugar-free).

III. ACCOMMODATION:
- Venue/Promoter to cover 3 double hotel rooms (4-star minimum) near the venue with private parking.
`;
  };

  const handleSign = () => {
    setIsSigned(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Document Selector Sidebar */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: '700', color: '#fff' }}>
            Документи туру
          </h4>
          
          {/* Tabs */}
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

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '12px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Концертний зал для контракту:
            </label>
            <select 
              className="input-glass" 
              style={{ padding: '8px 12px', fontSize: '12px' }}
              value={selectedVenue?.name}
              onChange={(e) => setSelectedVenue(venues.find(v => v.name === e.target.value))}
            >
              {venues.map((v, i) => (
                <option key={i} value={v.name}>{v.city} - {v.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Document Viewer */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--accent)' }} />
              {activeTab === 'contract' ? 'Угода про виступ (Contract)' : activeTab === 'tech' ? 'Технічний райдер (Tech Rider)' : 'Побутовий райдер (Hospitality)'}
            </h4>
            <span className="status-pill status-scouted" style={{ fontSize: '10px' }}>
              Згенеровано ШІ
            </span>
          </div>

          {/* Document Content */}
          <pre style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            lineHeight: '1.5',
            color: '#d1d5db',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
            maxHeight: '400px'
          }}>
            {activeTab === 'contract' ? getContractText() : activeTab === 'tech' ? getTechnicalRider() : getHospitalityRider()}
          </pre>

          {/* Electronic Signature Panel */}
          {activeTab === 'contract' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Підпис артиста</span>
                <p style={{ fontSize: '14px', fontWeight: '600', color: isSigned ? 'var(--spotify-green)' : 'var(--text-muted)', marginTop: '4px' }}>
                  {isSigned ? '✓ ПІДПИСАНО ЕЛЕКТРОННО' : 'Очікує вашого підпису'}
                </p>
              </div>
              {!isSigned ? (
                <button className="btn btn-primary" onClick={handleSign}>
                  Накласти підпис
                </button>
              ) : (
                <div style={{ color: 'var(--spotify-green)', fontWeight: '700', fontSize: '12px' }}>
                  Готово до надсилання
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {currentStage === 5 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ShieldAlert style={{ color: 'var(--amber-glow)' }} size={24} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Контракти готові до підписання</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                Коли всі три райдери та контракт перевірені, накладіть підпис та натисніть "Підписати та згенерувати PDF" у правій панелі.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove} disabled={!isSigned}>
            Затвердити угоди з усіма клубами
          </button>
        </div>
      )}
    </div>
  );
}
