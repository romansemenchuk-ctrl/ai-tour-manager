import React, { useState } from 'react';
import { DollarSign, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';

export default function BudgetFinance({ 
  currentStage, 
  financeData, 
  onApprove 
}) {
  const [salesCapacity, setSalesCapacity] = useState(75);

  const { ticketSalesMax, merchSalesMax, hotelCost, travelCost, productionCost, marketingCost, agencyFeeMax } = financeData;

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
      <div className="glass-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
          <DollarSign size={20} />
          КОШТОРИС ТУРУ (PROFIT & LOSS STATEMENT)
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
          Агент **Accountant** розрахував P&L баланс туру. Ви можете протестувати рентабельність за допомогою повзунка заповненості.
        </p>

        {/* Dynamic Capacity Range Slider */}
        <div style={{ background: 'var(--bg-main)', padding: '20px', border: 'var(--border-width) solid var(--border-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>СИМУЛЯЦІЯ ПРОДАЖІВ:</span>
            <span style={{ fontSize: '18px', fontWeight: '900' }}>{salesCapacity}% ЗАПОВНЕННОСТІ</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="100" 
            className="range-slider"
            value={salesCapacity}
            onChange={(e) => setSalesCapacity(parseInt(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
            <span>МІН (30%)</span>
            <span>ТОЧКА БЕЗЗБИТКОВОСТІ: {breakEvenCapacity.toFixed(0)}%</span>
            <span>СОЛД-АУТ (100%)</span>
          </div>
        </div>

        {/* P&L Statement Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Revenue */}
          <div style={{ border: 'var(--border-width) solid var(--border-color)', padding: '16px', background: 'var(--bg-main)' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900', fontSize: '13px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase' }}>
              <TrendingUp size={14} /> ДОХОДИ (REVENUE)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span>Продаж квитків:</span>
                <span style={{ fontWeight: 'bold' }}>+${ticketRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span>Продаж мерчу:</span>
                <span style={{ fontWeight: 'bold' }}>+${merchRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '13px', paddingTop: '6px' }}>
                <span>ЗАГАЛЬНИЙ ДОХІД:</span>
                <span>+${totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div style={{ border: 'var(--border-width) solid var(--border-color)', padding: '16px', background: 'var(--bg-main)' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900', fontSize: '13px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase' }}>
              <AlertTriangle size={14} /> ВИТРАТИ (EXPENSES)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Проживання (Готелі):</span>
                <span>-${hotelCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Транспорт / Бензин:</span>
                <span>-${travelCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Оренда залів / Стаф:</span>
                <span>-${productionCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Рекламні бюджети:</span>
                <span>-${marketingCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                <span>Букінг-комісія ШІ:</span>
                <span>-${agencyFee.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '13px', paddingTop: '4px' }}>
                <span>ЗАГАЛЬНІ ВИТРАТИ:</span>
                <span>-${totalExpenses.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Profit Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '16px', border: 'var(--border-width) solid var(--border-color)', marginTop: '20px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Прогнозований Чистий Прибуток</span>
            <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontWeight: '900', marginTop: '4px' }}>
              ${netProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </h3>
          </div>
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Рентабельність (Margin)</span>
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>
              {totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      </div>

      {currentStage === 4 && (
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '2px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <PieChart size={24} />
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase' }}>ЗАТВЕРДЖЕННЯ КОШТОРИСУ</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                Підтвердіть фінансову модель туру для переходу до генерації та підписання офіційних договорів.
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={onApprove}>
            Затвердити бюджет
          </button>
        </div>
      )}
    </div>
  );
}
