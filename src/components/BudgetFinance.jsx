import React, { useState } from 'react';
import { DollarSign, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';

export default function BudgetFinance({ 
  currentStage, 
  financeData, 
  onApprove 
}) {
  const [salesCapacity, setSalesCapacity] = useState(75); // simulated ticket sales percentage

  const { ticketSalesMax, merchSalesMax, hotelCost, travelCost, productionCost, marketingCost, agencyFeeMax } = financeData;

  // Recalculate based on simulated sales capacity
  const ratio = salesCapacity / 100;
  const ticketRevenue = ticketSalesMax * ratio;
  const merchRevenue = merchSalesMax * ratio;
  const totalRevenue = ticketRevenue + merchRevenue;

  const agencyFee = agencyFeeMax * ratio;
  const totalExpenses = hotelCost + travelCost + productionCost + marketingCost + agencyFee;
  const netProfit = totalRevenue - totalExpenses;
  const breakEvenCapacity = ((hotelCost + travelCost + productionCost + marketingCost) / (ticketSalesMax + merchSalesMax - agencyFeeMax)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Financial Overview Card */}
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarSign size={20} style={{ color: 'var(--spotify-green)' }} />
          Бюджет & Фінансова модель туру
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
          Агент **Tour Accountant** розрахував P&L (прибутки та збитки) туру на базі погоджених клубів, вартості переїздів, проживання команди та рекламного плану.
        </p>

        {/* Dynamic Profit Slider */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Симуляція продажу квитків:</span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--spotify-green)' }}>{salesCapacity}% заповненості залів</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="100" 
            className="range-slider"
            value={salesCapacity}
            onChange={(e) => setSalesCapacity(parseInt(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <span>Мінімум (30%)</span>
            <span>Точка беззбитковості: {breakEvenCapacity.toFixed(0)}%</span>
            <span>Солд-аут (100%)</span>
          </div>
        </div>

        {/* Financial P&L Statement Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Revenue */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--spotify-green)', fontWeight: '700', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} /> ДОХОДИ (Планові)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Продаж квитків:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>${ticketRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Продаж мерчендайзу:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>${merchRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '14px', paddingTop: '6px' }}>
                <span style={{ color: '#fff' }}>Загальний дохід:</span>
                <span style={{ color: 'var(--spotify-green)' }}>${totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--rose-glow)', fontWeight: '700', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} /> ВИТРАТИ (Планові)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Проживання (Готелі):</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>-${hotelCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Логістика (Бензин/Транспорт):</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>-${travelCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Локальний стаф / Оренда:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>-${productionCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Реклама та просування:</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>-${marketingCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Комісія букінгу (ШІ):</span>
                <span style={{ color: '#fff', fontWeight: '600' }}>-${agencyFee.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '14px', paddingTop: '4px' }}>
                <span style={{ color: '#fff' }}>Загальні витрати:</span>
                <span style={{ color: 'var(--rose-glow)' }}>-${totalExpenses.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Profit Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '20px' }}>
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Прогнозований Чистий Прибуток</span>
            <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-heading)', color: netProfit >= 0 ? 'var(--spotify-green)' : 'var(--rose-glow)', fontWeight: '800', marginTop: '4px' }}>
              ${netProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Рентабельність (Margin)</span>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginTop: '4px' }}>
              {totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>

      {currentStage === 4 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.03)', border: '1px solid var(--amber-glow)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <PieChart style={{ color: 'var(--amber-glow)' }} size={24} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>Очікується затвердження фінансового плану</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                Затвердьте кошторис туру, щоб запустити генерацію контрактів та юридичних документів.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Затвердити бюджет туру
          </button>
        </div>
      )}
    </div>
  );
}
