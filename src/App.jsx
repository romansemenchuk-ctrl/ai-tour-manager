import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BarChart2, Search, Map, DollarSign, FileText, Megaphone, Flame } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ArtistAnalytics from './components/ArtistAnalytics';
import VenueScout from './components/VenueScout';
import RoadmapLogistics from './components/RoadmapLogistics';
import BudgetFinance from './components/BudgetFinance';
import ContractsDocs from './components/ContractsDocs';
import PromoMarketing from './components/PromoMarketing';
import AgentDrawer from './components/AgentDrawer';

// Initial Mock Data
const INITIAL_CITIES = [
  { name: "Kyiv", country: "Ukraine", monthlyListeners: 180000, estimatedDraw: 1100, ticketPriceGA: 25, ticketPriceVIP: 60 },
  { name: "Warsaw", country: "Poland", monthlyListeners: 140000, estimatedDraw: 950, ticketPriceGA: 30, ticketPriceVIP: 75 },
  { name: "Lviv", country: "Ukraine", monthlyListeners: 90000, estimatedDraw: 800, ticketPriceGA: 20, ticketPriceVIP: 50 },
  { name: "Odesa", country: "Ukraine", monthlyListeners: 75000, estimatedDraw: 650, ticketPriceGA: 22, ticketPriceVIP: 55 },
  { name: "Dnipro", country: "Ukraine", monthlyListeners: 50000, estimatedDraw: 450, ticketPriceGA: 18, ticketPriceVIP: 45 }
];

const INITIAL_VENUES = [
  { city: "Kyiv", country: "Ukraine", name: "Atlas", capacity: 1200, email: "booking@atlas.ua", genres: "Indie, Rock, Pop", status: "scouted" },
  { city: "Kyiv", country: "Ukraine", name: "Sentrum", capacity: 600, email: "booking@sentrum.ua", genres: "Acoustic, Jazz, Rock", status: "scouted" },
  { city: "Warsaw", country: "Poland", name: "Stodola", capacity: 1200, email: "booking@stodola.pl", genres: "Pop, Rock, Alternative", status: "scouted" },
  { city: "Warsaw", country: "Poland", name: "Progresja", capacity: 1800, email: "booking@progresja.pl", genres: "Metal, Electronic, Rock", status: "scouted" },
  { city: "Lviv", country: "Ukraine", name: "Fest Republic", capacity: 1000, email: "booking@fest.lviv.ua", genres: "Indie, Techno, Pop", status: "scouted" },
  { city: "Lviv", country: "Ukraine", name: "Malevich", capacity: 1400, email: "booking@malevich.lviv.ua", genres: "Pop, Dance, Show", status: "scouted" },
  { city: "Odesa", country: "Ukraine", name: "Palladium", capacity: 900, email: "booking@palladium.od.ua", genres: "Electronic, Pop, Dance", status: "scouted" },
  { city: "Odesa", country: "Ukraine", name: "True Man", capacity: 400, email: "booking@trueman.od.ua", genres: "Rock, Jazz, Acoustic", status: "scouted" },
  { city: "Dnipro", country: "Ukraine", name: "Rio", capacity: 700, email: "booking@rio.dp.ua", genres: "Pop, Electronic", status: "scouted" }
];

const INITIAL_ROADMAP = [
  { date: "Oct 12, 2026", city: "Kyiv", venue: "Atlas", transit: "Виїзд з Києва (Власний мікроавтобус)", hotel: "ibis Kyiv Center", hotelCost: 200, soundcheck: "17:30", showtime: "20:00" },
  { date: "Oct 14, 2026", city: "Warsaw", venue: "Stodola", transit: "Авіапереліт Київ -> Варшава (600 км)", hotel: "Radisson Blu Warsaw", hotelCost: 400, soundcheck: "17:30", showtime: "20:00" },
  { date: "Oct 16, 2026", city: "Lviv", venue: "Malevich", transit: "Потяг Варшава -> Львів (400 км)", hotel: "Astoria Hotel Lviv", hotelCost: 250, soundcheck: "17:00", showtime: "20:00" },
  { date: "Oct 18, 2026", city: "Odesa", venue: "Palladium", transit: "Поїздка мікроавтобусом Львів -> Одеса (800 км)", hotel: "Bristol Hotel Odesa", hotelCost: 300, soundcheck: "17:30", showtime: "20:00" },
  { date: "Oct 20, 2026", city: "Dnipro", venue: "Rio", transit: "Поїздка мікроавтобусом Одеса -> Дніпро (450 км)", hotel: "Axelhof Hotel Dnipro", hotelCost: 250, soundcheck: "17:30", showtime: "20:00" }
];

const INITIAL_FINANCE = {
  ticketSalesMax: 105000,
  merchSalesMax: 18000,
  hotelCost: 2800,
  travelCost: 1900,
  productionCost: 3500,
  marketingCost: 2500,
  agencyFeeMax: 10500
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentStage, setCurrentStage] = useState(0);
  const [artistName, setArtistName] = useState("");
  
  // Core Data States
  const [citiesData, setCitiesData] = useState(INITIAL_CITIES);
  const [venues, setVenues] = useState(INITIAL_VENUES);
  const [roadmap, setRoadmap] = useState(INITIAL_ROADMAP);
  const [financeData, setFinanceData] = useState(INITIAL_FINANCE);
  
  // Agent Status & Log States
  const [agentStatus, setAgentStatus] = useState({
    profiler: 'idle', scout: 'idle', logistics: 'idle', finance: 'idle', legal: 'idle', promo: 'idle'
  });
  const [logs, setLogs] = useState([
    { time: "04:52", agent: "system", text: "AI Tour Manager ініціалізовано. Очікування вибору артиста." }
  ]);

  const addLog = (agent, text) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLogs(prev => [...prev, { time: timeStr, agent, text }]);
  };

  // Triggered when artist name is set
  useEffect(() => {
    if (artistName) {
      setCurrentStage(1);
      setAgentStatus(prev => ({ ...prev, profiler: 'thinking' }));
      addLog("profiler", `Запуск пошуку статистики для артиста: ${artistName}`);
      
      // Simulate profile agent thinking
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, profiler: 'approval' }));
        addLog("profiler", "Аналіз завершено. Spotify Monthly Listeners: 550,000. Виявлено 5 оптимальних локацій.");
        addLog("profiler", "Сформовано пропозицію цін квитків на основі PPP (купівельної спроможності) регіонів.");
      }, 1500);
    }
  }, [artistName]);

  // Handle human approvals
  const handleApprove = () => {
    if (currentStage === 1) {
      // Approve Cities
      setCurrentStage(2);
      setActiveTab('scout');
      setAgentStatus(prev => ({ ...prev, profiler: 'done', scout: 'thinking' }));
      addLog("scout", "Міста затверджено користувачем. Початок сканування відповідних концертних залів...");
      
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, scout: 'approval' }));
        addLog("scout", "Знайдено 9 відповідних майданчиків. Завантажено контакти та місткості.");
        addLog("scout", "Створено персоналізовані шаблони листів для букерів.");
      }, 1500);

    } else if (currentStage === 2) {
      // Approve Venues -> Start sending pitches & negotiate
      setCurrentStage(3);
      setActiveTab('roadmap');
      setAgentStatus(prev => ({ ...prev, scout: 'done', logistics: 'thinking' }));
      addLog("scout", "Масова розсилка активована. Відправлено 5 пропозицій...");
      
      // Simulate responses & logistics planner
      setTimeout(() => {
        addLog("scout", "Отримано відповідь від Atlas (Київ): Погоджено офер.");
        addLog("scout", "Отримано відповідь від Malevich (Львів): Погоджено офер.");
        addLog("scout", "Отримано відповідь від Stodola (Варшава): Переговори успішні.");
        
        // Update venue statuses
        setVenues(prev => prev.map(v => 
          ["Atlas", "Stodola", "Malevich", "Palladium", "Rio"].includes(v.name)
            ? { ...v, status: 'signed' }
            : { ...v, status: 'rejected' }
        ));

        addLog("logistics", "Розрахунок оптимальної черги міст (маршруту) для зниження дорожніх витрат...");
        setAgentStatus(prev => ({ ...prev, logistics: 'approval' }));
        addLog("logistics", "Складено оптимальний Roadmap: Kyiv -> Warsaw -> Lviv -> Odesa -> Dnipro.");
        addLog("logistics", "Заброньовано готелі з парковкою для тур-автобуса.");
      }, 2000);

    } else if (currentStage === 3) {
      // Approve Roadmap
      setCurrentStage(4);
      setActiveTab('budget');
      setAgentStatus(prev => ({ ...prev, logistics: 'done', finance: 'thinking' }));
      addLog("finance", "Розрахунок бюджету та точки беззбитковості (P&L)...");
      
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, finance: 'approval' }));
        addLog("finance", "Фінансову модель побудовано. Точка беззбитковості: 44.8% від повних зборів.");
        addLog("finance", "Прогнозований чистий прибуток при 75% заповненості: $43,750 USD.");
      }, 1500);

    } else if (currentStage === 4) {
      // Approve Budget
      setCurrentStage(5);
      setActiveTab('contracts');
      setAgentStatus(prev => ({ ...prev, finance: 'done', legal: 'thinking' }));
      addLog("legal", "Генерація контрактів, технічних та побутових райдерів...");
      
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, legal: 'approval' }));
        addLog("legal", "Договори згенерувано на базі умов гарантій та сплітів.");
        addLog("legal", "Райдери адаптовані під вимоги залів. Документи готові до підпису.");
      }, 1500);

    } else if (currentStage === 5) {
      // Sign Contracts
      setCurrentStage(6);
      setActiveTab('promo');
      setAgentStatus(prev => ({ ...prev, legal: 'done', promo: 'thinking' }));
      addLog("legal", "Всі договори підписано цифровим підписом. Копії збережено в PDF.");
      addLog("promo", "Формування маркетингової стратегії та рекламного бюджету...");
      
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, promo: 'approval' }));
        addLog("promo", "Підготовлено аудиторії ретаргетингу на базі Spotify Pixels.");
        addLog("promo", "Рекламні макети та рекламні посилання сформовані. Очікування старту.");
      }, 1500);

    } else if (currentStage === 6) {
      // Launch Promo
      setCurrentStage(7);
      setActiveTab('dashboard');
      setAgentStatus(prev => ({ 
        profiler: 'done', scout: 'done', logistics: 'done', finance: 'done', legal: 'done', promo: 'done' 
      }));
      addLog("promo", "Промо запущено! Продажі квитків активовані.");
      addLog("system", "ТУР ОФІЦІЙНО ЗАПУЩЕНО. Жива статистика зборів доступна на панелі.");
    }
  };

  // Helper to adjust ticket prices dynamically and recalculate max revenue
  const handleUpdateCityPrice = (idx, type, value) => {
    setCitiesData(prev => {
      const updated = [...prev];
      if (type === 'GA') {
        updated[idx].ticketPriceGA = value;
      } else {
        updated[idx].ticketPriceVIP = value;
      }
      
      // Update max ticket revenues
      let totalMaxTicket = 0;
      updated.forEach(c => {
        const gaCount = Math.floor(c.estimatedDraw * 0.85);
        const vipCount = Math.floor(c.estimatedDraw * 0.15);
        totalMaxTicket += (gaCount * c.ticketPriceGA) + (vipCount * c.ticketPriceVIP);
      });

      setFinanceData(prevFin => ({
        ...prevFin,
        ticketSalesMax: totalMaxTicket,
        agencyFeeMax: Math.floor(totalMaxTicket * 0.1)
      }));

      return updated;
    });
  };

  // Helper to handle manual status overrides in the table
  const handleUpdateVenueStatus = (name, newStatus) => {
    setVenues(prev => prev.map(v => v.name === name ? { ...v, status: newStatus } : v));
    addLog("scout", `Статус майданчика ${name} змінено вручну на: ${newStatus.toUpperCase()}`);
  };

  const handleReset = () => {
    setCurrentStage(0);
    setArtistName("");
    setActiveTab('analytics');
    setVenues(INITIAL_VENUES);
    setCitiesData(INITIAL_CITIES);
    setFinanceData(INITIAL_FINANCE);
    setAgentStatus({
      profiler: 'idle', scout: 'idle', logistics: 'idle', finance: 'idle', legal: 'idle', promo: 'idle'
    });
    setLogs([
      { time: "04:52", agent: "system", text: "Симуляцію скинуто. AI Tour Manager готовий до нового запуску." }
    ]);
  };

  // Render active component
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            currentStage={currentStage} 
            artistName={artistName} 
            stats={{
              monthlyListeners: citiesData.reduce((acc, c) => acc + c.monthlyListeners, 0),
              projectedRevenue: financeData.ticketSalesMax + financeData.merchSalesMax,
              totalCities: citiesData.length,
              totalDistance: roadmap.reduce((acc, r) => acc + (r.city === 'Kyiv' ? 0 : 450), 0) // rough mock
            }}
            setActiveTab={setActiveTab}
          />
        );
      case 'analytics':
        return (
          <ArtistAnalytics 
            currentStage={currentStage}
            artistName={artistName}
            setArtistName={setArtistName}
            citiesData={citiesData}
            onUpdateCityPrice={handleUpdateCityPrice}
            onApprove={handleApprove}
          />
        );
      case 'scout':
        return (
          <VenueScout 
            currentStage={currentStage}
            venues={venues}
            onUpdateVenueStatus={handleUpdateVenueStatus}
            onApprove={handleApprove}
            artistName={artistName}
          />
        );
      case 'roadmap':
        return (
          <RoadmapLogistics 
            currentStage={currentStage}
            roadmap={roadmap}
            onApprove={handleApprove}
          />
        );
      case 'budget':
        return (
          <BudgetFinance 
            currentStage={currentStage}
            financeData={financeData}
            onApprove={handleApprove}
          />
        );
      case 'contracts':
        return (
          <ContractsDocs 
            currentStage={currentStage}
            artistName={artistName}
            venues={venues}
            onApprove={handleApprove}
          />
        );
      case 'promo':
        return (
          <PromoMarketing 
            currentStage={currentStage}
            artistName={artistName}
            onApprove={handleApprove}
          />
        );
      default:
        return <div>Вкладку не знайдено</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Flame size={24} style={{ color: 'var(--accent)' }} />
          <h2>AI Tour Manager</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span className="sidebar-label">Дашборд</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
            disabled={currentStage === 0}
            style={{ opacity: currentStage === 0 ? 0.4 : 1, cursor: currentStage === 0 ? 'not-allowed' : 'pointer' }}
          >
            <BarChart2 size={18} />
            <span className="sidebar-label">Аналітика аудиторії</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'scout' ? 'active' : ''}`}
            onClick={() => setActiveTab('scout')}
            disabled={currentStage < 2}
            style={{ opacity: currentStage < 2 ? 0.4 : 1, cursor: currentStage < 2 ? 'not-allowed' : 'pointer' }}
          >
            <Search size={18} />
            <span className="sidebar-label">Пошук залів</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
            disabled={currentStage < 3}
            style={{ opacity: currentStage < 3 ? 0.4 : 1, cursor: currentStage < 3 ? 'not-allowed' : 'pointer' }}
          >
            <Map size={18} />
            <span className="sidebar-label">Маршрути & Логістика</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
            disabled={currentStage < 4}
            style={{ opacity: currentStage < 4 ? 0.4 : 1, cursor: currentStage < 4 ? 'not-allowed' : 'pointer' }}
          >
            <DollarSign size={18} />
            <span className="sidebar-label">Бюджет & Фінанси</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
            disabled={currentStage < 5}
            style={{ opacity: currentStage < 5 ? 0.4 : 1, cursor: currentStage < 5 ? 'not-allowed' : 'pointer' }}
          >
            <FileText size={18} />
            <span className="sidebar-label">Договори & Райдери</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'promo' ? 'active' : ''}`}
            onClick={() => setActiveTab('promo')}
            disabled={currentStage < 6}
            style={{ opacity: currentStage < 6 ? 0.4 : 1, cursor: currentStage < 6 ? 'not-allowed' : 'pointer' }}
          >
            <Megaphone size={18} />
            <span className="sidebar-label">Маркетинг & Промо</span>
          </button>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="main-content">
        <div className="page-header">
          <div className="page-title">
            <h1>
              {activeTab === 'dashboard' ? 'Головний Дашборд' : 
               activeTab === 'analytics' ? 'Аналіз Аудиторії' : 
               activeTab === 'scout' ? 'Контакти Концертних Залів' : 
               activeTab === 'roadmap' ? 'Планування Логістики' : 
               activeTab === 'budget' ? 'Фінансова Карта Туру' : 
               activeTab === 'contracts' ? 'Юридичні Документи' : 'Маркетинг & Просування'}
            </h1>
            <p>
              {activeTab === 'dashboard' ? 'Загальний огляд планування та реальних показників туру' : 
               activeTab === 'analytics' ? 'ШІ-прогнозування цільових міст на основі стрімінгів' : 
               activeTab === 'scout' ? 'Шортлист клубів та статус погодження оферів' : 
               activeTab === 'roadmap' ? 'Графік переїздів, таймінг завантаження та готелі' : 
               activeTab === 'budget' ? 'Бюджетування, витрати на логістику та прибутки' : 
               activeTab === 'contracts' ? 'Автоматично сформовані контракти та технічні райдери' : 'Налаштування таргетингу та моніторинг продажу квитків'}
            </p>
          </div>
          {artistName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <Flame size={16} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Артист: {artistName}</span>
            </div>
          )}
        </div>

        {/* Dynamic Inner View */}
        {renderContent()}
      </main>

      {/* Live Agent Console (Right Drawer) */}
      <AgentDrawer 
        agentStatus={agentStatus}
        logs={logs}
        currentStage={currentStage}
        onApprove={handleApprove}
        onReset={handleReset}
        artistName={artistName}
      />
    </div>
  );
}
