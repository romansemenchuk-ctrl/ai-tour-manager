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
  const [theme, setTheme] = useState('dark');
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    { time: "05:13", agent: "system", text: "AI Tour Manager ініціалізовано. Очікування назви артиста." }
  ]);

  // Bind theme variable to HTML dataset
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addLog = (agent, text) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLogs(prev => [...prev, { time: timeStr, agent, text }]);
  };

  // Helper to run sequential steps to simulate realism
  const runSimulationSequence = (agentKey, stepsList, onCompleteCallback) => {
    setIsProcessing(true);
    setAgentStatus(prev => ({ ...prev, [agentKey]: 'thinking' }));
    
    let currentStep = 0;
    const runStep = () => {
      if (currentStep < stepsList.length) {
        addLog(agentKey, stepsList[currentStep]);
        currentStep++;
        setTimeout(runStep, 800); // 800ms delay per step
      } else {
        setAgentStatus(prev => ({ ...prev, [agentKey]: 'approval' }));
        setIsProcessing(false);
        if (onCompleteCallback) onCompleteCallback();
      }
    };
    runStep();
  };

  // Triggered when artist name is set (Stage 0 -> 1)
  useEffect(() => {
    if (artistName) {
      setCurrentStage(1);
      const initialSteps = [
        `Ініціювання аналізу стрімінгів для артиста: ${artistName}`,
        "Підключення до Spotify Web API... Успішно (200 OK)",
        "Отримання демографічних метаданих та щомісячних прослуховувань за містами...",
        "Виявлено 5 географічних центрів з високим потенціалом зборів.",
        "Artist Profiler розрахував орієнтовні ціни GA та VIP квитків на основі купівельної спроможності."
      ];
      runSimulationSequence('profiler', initialSteps);
    }
  }, [artistName]);

  // Handle human approvals
  const handleApprove = () => {
    if (isProcessing) return;

    if (currentStage === 1) {
      // Approve Cities -> Search venues (Stage 1 -> 2)
      setAgentStatus(prev => ({ ...prev, profiler: 'done' }));
      const steps = [
        "Міста затверджено користувачем. Запуск пошуку майданчиків.",
        "Scout Agent: Парсинг локальних афіш та довідників концертів...",
        "Знайдено 9 клубів з місткістю від 400 до 1800 осіб.",
        "Отримано актуальні email-адреси букерів.",
        "Згенеровано персоналізовані шаблони листів-запитів."
      ];
      runSimulationSequence('scout', steps, () => {
        setCurrentStage(2);
        setActiveTab('scout');
      });

    } else if (currentStage === 2) {
      // Approve Venues -> Start sending pitches (Stage 2 -> 3)
      setAgentStatus(prev => ({ ...prev, scout: 'done' }));
      const steps = [
        "Користувач надав дозвіл на розсилку. Відправка запитів...",
        "Надіслано 5 листів-пропозицій до клубів Atlas, Stodola, Malevich, Palladium, Rio.",
        "Отримано відповідь від Atlas: 'Узгоджуємо 12-15 жовтня. Умови підходять.'",
        "Отримано офер від Stodola (Варшава): '14 жовтня вільне. Надішліть контракт.'",
        "Logistics Planner: Розрахунок послідовності міст для уникнення зайвих переїздів..."
      ];
      runSimulationSequence('logistics', steps, () => {
        setVenues(prev => prev.map(v => 
          ["Atlas", "Stodola", "Malevich", "Palladium", "Rio"].includes(v.name)
            ? { ...v, status: 'negotiating' }
            : v
        ));
        setCurrentStage(3);
        setActiveTab('roadmap');
      });

    } else if (currentStage === 3) {
      // Approve Roadmap -> Build budget (Stage 3 -> 4)
      setAgentStatus(prev => ({ ...prev, logistics: 'done' }));
      const steps = [
        "Ітінерарій затверджено. Оцінка бюджету.",
        "Tour Accountant: Розрахунок дорожніх витрат та проживання на 6 осіб команди...",
        "Додано витрати на пальне ($1,900) та оренду беклайну ($3,500).",
        "Розраховано точку беззбитковості для кожної дати туру."
      ];
      runSimulationSequence('finance', steps, () => {
        setCurrentStage(4);
        setActiveTab('budget');
      });

    } else if (currentStage === 4) {
      // Approve Budget -> Generate documents (Stage 4 -> 5)
      setAgentStatus(prev => ({ ...prev, finance: 'done' }));
      const steps = [
        "Фінансовий кошторис погоджено. Підготовка документів.",
        "Legal Assistant: Формування Performance Agreements на базі погоджених умов...",
        "Згенеровано технічний райдер (12 каналів FOH) та побутовий райдер.",
        "Контракти завантажено. Очікується цифровий підпис."
      ];
      runSimulationSequence('legal', steps, () => {
        setCurrentStage(5);
        setActiveTab('contracts');
      });

    } else if (currentStage === 5) {
      // Sign Contracts -> Marketing setup (Stage 5 -> 6)
      setAgentStatus(prev => ({ ...prev, legal: 'done' }));
      const steps = [
        "Контракти підписано менеджером артиста.",
        "Синхронізація підписів з представниками залів... Успішно.",
        "Promo Manager: Підготовка рекламної кампанії...",
        "Налаштування кастомних аудиторій у Facebook Ads Manager.",
        "Створено посилання для покупки квитків через Concert.ua / Eventim."
      ];
      runSimulationSequence('promo', steps, () => {
        setCurrentStage(6);
        setActiveTab('promo');
      });

    } else if (currentStage === 6) {
      // Launch Promo (Stage 6 -> 7)
      setAgentStatus(prev => ({ ...prev, promo: 'done' }));
      const steps = [
        "Дозвіл отримано. Активація бюджету на таргетинг.",
        "Meta Ads кампанія: ЗАПУЩЕНО.",
        "Ticketing API підключено. Початок відслідковування зборів.",
        "Система AI Tour Manager переведена в режим активного моніторингу."
      ];
      runSimulationSequence('promo', steps, () => {
        setCurrentStage(7);
        setActiveTab('dashboard');
        setAgentStatus({
          profiler: 'done', scout: 'done', logistics: 'done', finance: 'done', legal: 'done', promo: 'done'
        });
        addLog("system", "ТУР УСПІШНО ЗАПУЩЕНО В РЕАЛЬНОМУ ЧАСІ!");
      });
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
    if (isProcessing) return;
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
      { time: "05:13", agent: "system", text: "Симуляцію скинуто. AI Tour Manager готовий до нового запуску." }
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
              totalDistance: roadmap.reduce((acc, r) => acc + (r.city === 'Kyiv' ? 0 : 450), 0)
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
          <Flame size={24} style={{ color: 'var(--border-color)' }} />
          <h2>AI Tour Manager</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span className="sidebar-label">Дашборд</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
            disabled={currentStage === 0}
          >
            <BarChart2 size={16} />
            <span className="sidebar-label">Аналітика</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'scout' ? 'active' : ''}`}
            onClick={() => setActiveTab('scout')}
            disabled={currentStage < 2}
          >
            <Search size={16} />
            <span className="sidebar-label">Пошук залів</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
            disabled={currentStage < 3}
          >
            <Map size={16} />
            <span className="sidebar-label">Логістика</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
            disabled={currentStage < 4}
          >
            <DollarSign size={16} />
            <span className="sidebar-label">Бюджет</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
            disabled={currentStage < 5}
          >
            <FileText size={16} />
            <span className="sidebar-label">Угоди & Райдери</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'promo' ? 'active' : ''}`}
            onClick={() => setActiveTab('promo')}
            disabled={currentStage < 6}
          >
            <Megaphone size={16} />
            <span className="sidebar-label">Маркетинг</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Workspace */}
      <main className="main-content">
        <div className="page-header">
          <div className="page-title">
            <h1>
              {activeTab === 'dashboard' ? 'Головний Дашборд' : 
               activeTab === 'analytics' ? 'Аналіз Аудиторії' : 
               activeTab === 'scout' ? 'Контактна База Клубів' : 
               activeTab === 'roadmap' ? 'Планування Маршруту' : 
               activeTab === 'budget' ? 'Бюджет Туру' : 
               activeTab === 'contracts' ? 'Юридичні Договори' : 'Маркетингові Метрики'}
            </h1>
            <p>
              {activeTab === 'dashboard' ? 'Огляд ключових показників туру' : 
               activeTab === 'analytics' ? 'Прогнозування цільових міст на основі стрімінгів' : 
               activeTab === 'scout' ? 'Контакти клубів та статус оферів' : 
               activeTab === 'roadmap' ? 'Графік переїздів, таймінг завантаження та готелі' : 
               activeTab === 'budget' ? 'Кошторис туру, витрати та чистий прибуток' : 
               activeTab === 'contracts' ? 'Договори про виступи та райдери' : 'Рекламні бюджети та динаміка збору квитків'}
            </p>
          </div>
          {artistName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'var(--border-width) solid var(--border-color)', padding: '8px 16px', fontWeight: 'bold' }}>
              <Flame size={16} />
              <span style={{ fontSize: '12px' }}>{artistName.toUpperCase()}</span>
            </div>
          )}
        </div>

        {/* Render selected screen */}
        {renderContent()}
      </main>

      {/* Right AI Status Bar */}
      <AgentDrawer 
        agentStatus={agentStatus}
        logs={logs}
        currentStage={currentStage}
        onApprove={handleApprove}
        onReset={handleReset}
        artistName={artistName}
        theme={theme}
        setTheme={setTheme}
        isProcessing={isProcessing}
      />
    </div>
  );
}
