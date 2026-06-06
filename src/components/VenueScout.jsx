import React, { useState } from 'react';
import { Mail, Send, CheckCircle, HelpCircle, XCircle } from 'lucide-react';

export default function VenueScout({ 
  currentStage, 
  venues, 
  onUpdateVenueStatus, 
  onApprove,
  artistName 
}) {
  const [selectedVenue, setSelectedVenue] = useState(venues[0] || null);
  const [pitchText, setPitchText] = useState("");

  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    setPitchText(
      `Subject: Booking Request: ${artistName.toUpperCase()} - Autumn Tour 2026\n\n` +
      `Hello Booking Team at ${venue.name},\n\n` +
      `I'm writing to you on behalf of ${artistName}. We are planning an autumn tour and would love to lock down a date at your venue. \n` +
      `Based on our streaming statistics, we have a target draw of around ${venue.capacity * 0.8} fans in ${venue.city}.\n\n` +
      `Proposed parameters:\n` +
      `- Date: Mid October 2026\n` +
      `- Deal: Door split 70/30 or Guarantee fee\n` +
      `- Capacity: Fits perfectly for our ${venue.capacity} cap requirements.\n\n` +
      `Please let us know your availability for October. We look forward to hearing from you!\n\n` +
      `Best regards,\n` +
      `AI Tour Manager (Outreach Agent)`
    );
  };

  React.useEffect(() => {
    if (venues.length > 0 && !selectedVenue) {
      handleSelectVenue(venues[0]);
    }
  }, [venues]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scouted':
        return <span className="status-pill status-scouted">Знайдено</span>;
      case 'contacted':
        return <span className="status-pill status-contacted">Надіслано запит</span>;
      case 'negotiating':
        return <span className="status-pill status-negotiating">Переговори</span>;
      case 'signed':
        return <span className="status-pill status-signed">Затверджено</span>;
      case 'rejected':
        return <span className="status-pill status-rejected">Відхилено</span>;
      default:
        return <span className="status-pill">{status.toUpperCase()}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '6px', textTransform: 'uppercase' }}>
          КОНЦЕРТНІ МАЙДАНЧИКИ (SHORTLIST)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          Агент **Scout** зібрав контакти клубів та технічні відомості. Оберіть майданчик для детального перегляду.
        </p>

        {/* Venues Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Місто</th>
                <th>Клуб</th>
                <th>Місткість</th>
                <th>Booking Контакт</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue, idx) => (
                <tr 
                  key={idx} 
                  style={{ 
                    cursor: 'pointer',
                    background: selectedVenue?.name === venue.name ? 'var(--pill-bg)' : 'transparent' 
                  }}
                  onClick={() => handleSelectVenue(venue)}
                >
                  <td style={{ fontWeight: '800', textTransform: 'uppercase' }}>{venue.city}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{venue.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{venue.capacity}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{venue.email}</td>
                  <td>{getStatusBadge(venue.status)}</td>
                  <td>
                    <button 
                      className="btn" 
                      style={{ padding: '6px 12px', fontSize: '10px', boxShadow: 'none' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectVenue(venue);
                      }}
                    >
                      ПЕРЕГЛЯД
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Live Pitch Editor */}
      {selectedVenue && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Selected Club Details */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '900', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              МАЙДАНЧИК: {selectedVenue.name.toUpperCase()}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>ЛОКАЦІЯ:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedVenue.city.toUpperCase()}, {selectedVenue.country.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>МІСТКІСТЬ:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedVenue.capacity} осіб</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>ЖАНРИ:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedVenue.genres}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>EMAIL:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedVenue.email}</span>
              </div>
            </div>

            {/* Simulated Offer reply if in negotiating stage */}
            {selectedVenue.status === 'negotiating' && (
              <div style={{ background: 'var(--bg-main)', border: 'var(--border-width) solid var(--border-color)', padding: '16px', marginTop: '10px' }}>
                <h5 style={{ fontWeight: '800', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={14} /> ВІДПОВІДЬ ВІД БУКЕРА (ОФЕР)
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--text-primary)', fontStyle: 'italic', fontFamily: 'var(--font-mono)', lineHeight: '1.4' }}>
                  "Вітаємо! Ми погоджуємося провести концерт ${artistName} 15 жовтня. Умови: фікс. гарантія $${selectedVenue.capacity > 1000 ? '2500' : '1500'} або спліт 70% після вирахування витрат залу ($500). Надішліть контракт."
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '10px' }} onClick={() => onUpdateVenueStatus(selectedVenue.name, 'signed')}>
                    <CheckCircle size={12} /> ПРИЙНЯТИ
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '10px', borderColor: '#ff0000', color: '#ff0000' }} onClick={() => onUpdateVenueStatus(selectedVenue.name, 'rejected')}>
                    <XCircle size={12} /> ВІДХИЛИТИ
                  </button>
                </div>
              </div>
            )}

            {selectedVenue.status === 'signed' && (
              <div style={{ background: 'var(--pill-bg)', border: '1px solid var(--border-color)', padding: '16px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} />
                <div>
                  <h5 style={{ fontWeight: '800', fontSize: '11px', textTransform: 'uppercase' }}>УГОДУ ПОГОДЖЕНО</h5>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                    Майданчик заблокував дату під ваш концерт.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Email Preview & Editor */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '900', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
              <Mail size={16} />
              ПІТЧ-ЛИСТ (PITCH EMAIL)
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              ШІ-запит на букінг. Ви можете відредагувати текст перед надсиланням.
            </p>
            <textarea
              className="input-glass"
              style={{ flexGrow: 1, fontFamily: 'var(--font-mono)', fontSize: '11px', resize: 'none', minHeight: '180px', lineHeight: '1.4' }}
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              disabled={selectedVenue.status !== 'scouted'}
            />
            {selectedVenue.status === 'scouted' ? (
              <button 
                className="btn btn-primary" 
                onClick={() => onUpdateVenueStatus(selectedVenue.name, 'contacted')}
              >
                <Send size={12} /> НАДІСЛАТИ ЛИСТ
              </button>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', padding: '10px', fontFamily: 'var(--font-mono)', border: '1px dashed var(--border-color)' }}>
                ЛИСТ НАДІСЛАНО. СТАТУС: {selectedVenue.status.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}

      {currentStage === 2 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '2px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <HelpCircle size={24} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}>РОЗСИЛКА ЗАПИТІВ</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Коли ви готові розпочати переговори з обраними клубами, натисніть "Розпочати розсилку" на панелі справа.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Розпочати розсилку
          </button>
        </div>
      )}
    </div>
  );
}
