import React, { useState } from 'react';
import { Search, Mail, Send, CheckCircle, HelpCircle, XCircle } from 'lucide-react';

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
    // Generate draft pitch email text
    setPitchText(
      `Subject: Booking Request: ${artistName} - Autumn Tour 2026\n\n` +
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
        return <span className="status-pill">{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Шортлист концертних майданчиків
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
          Агент **Venue Scout** знайшов та структурував контакти клубів у кожному цільовому місті. Перевірте їх параметри перед початком контактів.
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
                <th>Вибір</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue, idx) => (
                <tr 
                  key={idx} 
                  style={{ 
                    cursor: 'pointer',
                    background: selectedVenue?.name === venue.name ? 'rgba(255,255,255,0.03)' : 'transparent' 
                  }}
                  onClick={() => handleSelectVenue(venue)}
                >
                  <td style={{ fontWeight: '600' }}>{venue.city}</td>
                  <td style={{ color: '#fff' }}>{venue.name}</td>
                  <td>{venue.capacity} чол.</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{venue.email}</td>
                  <td>{getStatusBadge(venue.status)}</td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '6px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectVenue(venue);
                      }}
                    >
                      Деталі
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Selected Club Details */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff' }}>
              Концертний майданчик: {selectedVenue.name}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Розташування:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{selectedVenue.city}, {selectedVenue.country}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Максимальна місткість:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{selectedVenue.capacity} осіб</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Жанрова орієнтація:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>{selectedVenue.genres}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Booking Email:</span>
                <span style={{ color: 'var(--cyan-glow)', fontFamily: 'var(--font-mono)' }}>{selectedVenue.email}</span>
              </div>
            </div>

            {/* Simulated Offer reply if in negotiating stage */}
            {selectedVenue.status === 'negotiating' && (
              <div style={{ background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168,85,247,0.3)', padding: '16px', borderRadius: '12px', marginTop: '10px' }}>
                <h5 style={{ color: 'var(--purple-glow)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={14} /> Отримано відповідь (Пропозиція клубу)
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: '1.4' }}>
                  "Ми раді прийняти {artistName} 15-20 жовтня. Наші умови: фіксована оренда ${selectedVenue.capacity > 1000 ? '1200' : '700'} або спліт 70% на 30% на користь артиста після покриття витрат на локальний стаф ($500). Звук та світло включені."
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button className="btn btn-success" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => onUpdateVenueStatus(selectedVenue.name, 'signed')}>
                    <CheckCircle size={12} /> Прийняти пропозицію
                  </button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '11px', borderColor: 'var(--rose-glow)', color: 'var(--rose-glow)' }} onClick={() => onUpdateVenueStatus(selectedVenue.name, 'rejected')}>
                    <XCircle size={12} /> Відхилити
                  </button>
                </div>
              </div>
            )}

            {selectedVenue.status === 'signed' && (
              <div style={{ background: 'rgba(29, 185, 84, 0.06)', border: '1px solid rgba(29,185,84,0.3)', padding: '16px', borderRadius: '12px', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} style={{ color: 'var(--spotify-green)' }} />
                <div>
                  <h5 style={{ color: 'var(--spotify-green)', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase' }}>Угоду Затверджено</h5>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Цей клуб успішно зарезервував дату для проведення концерту.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Email Preview & Editor */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} style={{ color: 'var(--accent)' }} />
              ШІ-Шаблон листа-запиту
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
              Цей лист сформований автоматично на основі аналітики стрімінгів артиста та місткості залу.
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
                <Send size={14} /> Надіслати запит (Симуляція)
              </button>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', padding: '10px' }}>
                Запит надіслано. Статус клубу: **{selectedVenue.status.toUpperCase()}**
              </div>
            )}
          </div>
        </div>
      )}

      {currentStage === 2 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <HelpCircle style={{ color: 'var(--amber-glow)' }} size={24} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Очікується погодження шортлиста майданчиків</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                Коли ви задоволені контактами та надіслали перші запити, натисніть "Розпочати розсилку" на правій панелі для початку масової роботи агентів.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Затвердити та перейти до Логістики
          </button>
        </div>
      )}
    </div>
  );
}
