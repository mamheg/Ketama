import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Coffee, Gift, Wallet, ChevronRight, X, ScanLine, Moon, Sun
} from 'lucide-react';
import QRCode from 'react-qr-code';

// --- Type Definitions ---
type ActionType = 'about' | 'bonus' | 'usage' | null;

interface ActionItem {
  id: ActionType;
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  content: React.ReactNode;
}

// --- Data ---
const actionData: ActionItem[] = [
  {
    id: 'about',
    title: 'О заведении',
    subtitle: 'Ketama — это стильное пространство для отдыха, вкусной еды и заботы о вашем автомобиле.',
    icon: Coffee,
    content: (
      <div className="space-y-4">
        <p>
          Добро пожаловать в <strong>Ketama</strong>! Мы объединяем концепцию премиального лаунжа, уютного кафе и детейлинга. 
        </p>
        <p>
          Пока ваш автомобиль находится в заботливых руках наших мастеров-детейлеров или на комплексой мойке, 
          вы можете расслабиться в комфортной зоне ожидания, насладиться авторским кофе и вкусными блюдами.
        </p>
        <div className="bg-[#FCF8F2] dark:bg-[#25221F] p-4 rounded-xl text-[#A67853] font-medium border border-[#A67853]/10">
          📍 Адрес: ул. Примерная, д. 42
          <br/>
          🕒 Ежедневно с 10:00 до 23:00
        </div>
      </div>
    )
  },
  {
    id: 'bonus',
    title: 'Как получить бонусы',
    subtitle: 'Начисляем бонусы за каждый заказ и каждое посещение.',
    icon: Gift,
    content: (
      <div className="space-y-4">
        <p>Мы ценим каждого гостя и возвращаем часть потраченных средств в виде бонусных баллов.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>5% кэшбека</strong> при достижении статуса "Новичок".</li>
          <li><strong>7% кэшбека</strong> для постоянных гостей (от 50 000 ₽).</li>
          <li><strong>10% кэшбека</strong> на VIP-статусе.</li>
        </ul>
        <p className="text-sm text-gray-500 mt-4">Бонусы начисляются в течение 24 часов после оплаты чека.</p>
      </div>
    )
  },
  {
    id: 'usage',
    title: 'Как использовать',
    subtitle: 'Покажите QR-код при оплате, чтобы списать или накопить бонусы.',
    icon: Wallet,
    content: (
      <div className="space-y-4">
        <p>Накопленными бонусами можно оплачивать до <strong>50%</strong> стоимости любых услуг в Ketama.</p>
        <div className="flex items-center space-x-3 p-4 border border-brand/20 dark:border-brand/40 rounded-xl bg-[#FCF8F2] dark:bg-[#25221F]">
          <div className="w-10 h-10 bg-[#A67853] text-white flex items-center justify-center rounded-full font-bold">1</div>
          <div><span className="font-semibold text-[#A67853]">1 бонус</span> = <span className="font-semibold text-[#A67853]">1 рубль</span></div>
        </div>
        <p className="text-sm text-gray-500">
          Для списания просто покажите или продиктуйте код баристе или администратору во время оплаты. Бонусы не суммируются с другими акциями.
        </p>
      </div>
    )
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [isQrExpanded, setIsQrExpanded] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen font-sans flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] relative overflow-hidden shadow-2xl flex flex-col">
        
        {/* --- Main Content Area --- */}
        <main className="flex-1 px-4 pt-8 pb-4 overflow-y-auto space-y-6 relative z-10 w-full no-scrollbar">
          
          {/* Main Loyalty Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full relative"
          >
            <div className="relative overflow-hidden bg-[#FDFBF7] dark:bg-[#1C1A17] rounded-[2rem] shadow-xl border border-[#F2EBE1] dark:border-[#38332D] p-5 sm:p-6 flex justify-between h-[280px]">
              
              {/* Subtle background curved lines */}
              <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                 <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
                  <path d="M-50 250 Q 150 150 350 300 T 550 250" fill="none" stroke="#A67853" strokeWidth="0.5" />
                  <path d="M-50 270 Q 150 170 350 320 T 550 270" fill="none" stroke="#A67853" strokeWidth="0.5" />
                  <path d="M250 -50 Q 300 150 450 100 T 600 -50" fill="none" stroke="#A67853" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Left Column (Info) */}
              <div className="relative z-10 flex flex-col justify-between flex-1 pr-2 pb-1">
                <div className="w-max">
                  <h1 className="font-black text-[3.25rem] leading-none tracking-tight text-[#A67853]">Ketama</h1>
                  <div className="flex justify-between w-full text-[8.5px] font-bold text-[#A67853]/90 mt-1 uppercase tracking-widest pl-0.5 pr-0.5">
                    <span>К</span><span>А</span><span>Ф</span><span>Е</span><span className="opacity-50 mx-0.5">•</span><span>L</span><span>O</span><span>U</span><span>N</span><span>G</span><span>E</span><span className="opacity-50 mx-0.5">•</span><span>М</span><span>О</span><span>Й</span><span>К</span><span>А</span>
                  </div>
                </div>

                <div className="my-auto mt-5">
                  <p className="text-[#A67853] font-medium text-sm mb-1">Карта лояльности</p>
                  <div className="w-full h-px bg-[#A67853]/20 mb-3" />
                  <div className="flex items-baseline space-x-1">
                    <span className="text-[2.75rem] font-bold text-[#A67853] leading-none">1 250</span>
                  </div>
                  <p className="text-[#A67853] text-[1.1rem]">бонусов</p>
                  <div className="w-full h-px bg-[#A67853]/10 mt-3" />
                </div>

                <div className="flex items-center space-x-2 text-[#A67853] mt-2">
                  <div className="p-1 rounded-full border border-[#A67853]">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-[15px]">Brad Pitt</span>
                </div>
              </div>

              {/* Right Column (QR Code) */}
              <div className="relative z-10 flex flex-col justify-end w-[130px] sm:w-[140px] flex-shrink-0">
                <button 
                  onClick={() => setIsQrExpanded(true)}
                  className="bg-white dark:bg-[#25221F] rounded-2xl shadow-sm border border-[#A67853]/20 p-3 py-4 flex flex-col items-center justify-between h-[210px] sm:h-[220px] transition-transform active:scale-95 focus:outline-none"
                >
                  {/* Decorative top motif */}
                  <div className="text-[#A67853]/40 mb-1">
                     <svg width="24" height="10" viewBox="0 0 24 10" fill="currentColor">
                        <circle cx="12" cy="5" r="2.5" />
                        <path d="M8 5c0-1.5 2-3 4-3s4 1.5 4 3-2 3-4 3-4-1.5-4-3z" />
                     </svg>
                  </div>
                  
                  {/* Actual QR */}
                  <div className="w-full aspect-square relative my-auto p-1 bg-white rounded-xl">
                    <QRCode value="Ketama-Loyalty-BradPitt" size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} bgColor="transparent" fgColor="#8C6544" />
                    
                    {/* Center K Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-white p-0.5 rounded-full border border-gray-100">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#A67853] border-[1.5px] border-[#A67853]">
                            K
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Scan Line & Text below */}
                  <div className="flex flex-col items-center mt-2 group text-[#A67853]">
                    <div className="text-[#A67853]/40 mb-1">
                       <svg width="24" height="10" viewBox="0 0 24 10" fill="currentColor">
                          <circle cx="12" cy="5" r="2.5" />
                          <path d="M8 5c0-1.5 2-3 4-3s4 1.5 4 3-2 3-4 3-4-1.5-4-3z" />
                       </svg>
                    </div>
                    <div className="flex items-center space-x-1.5 font-medium text-sm">
                      <ScanLine className="w-4 h-4" />
                      <span>QR-код</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action List Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="w-full bg-white dark:bg-[#1C1A17] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            {actionData.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveAction(item.id)}
                  className="w-full text-left flex items-start space-x-4 p-5 sm:p-6 transition-colors hover:bg-gray-50 dark:hover:bg-[#25221F] focus:outline-none"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#FCF8F2] dark:bg-[#2A2621] flex items-center justify-center text-[#A67853]">
                    <item.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="font-bold text-lg text-[#A67853] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="flex-shrink-0 pt-3 text-[#A67853]/50">
                    <ChevronRight className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </button>
                {index < actionData.length - 1 && (
                  <div className="h-[1px] w-full bg-gray-50 dark:bg-gray-800/60" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </main>

        {/* --- Footer --- */}
        <footer className="w-full flex justify-center pb-6 pt-2 relative z-10 text-[#A67853]">
          <button 
            onClick={toggleTheme}
            className="hover:bg-[#A67853]/10 p-2 rounded-full transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </footer>

        {/* --- Modals / Overlays --- */}

        {/* QR Code Expanded Modal */}
        <AnimatePresence>
          {isQrExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
              onClick={() => setIsQrExpanded(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-[#FDFBF7] dark:bg-[#1C1C1C] p-8 rounded-[2rem] shadow-2xl flex flex-col items-center w-full max-w-sm relative"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setIsQrExpanded(false)}
                  className="absolute top-4 right-4 p-2 bg-black/5 dark:bg-white/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6 mt-4">
                  <h3 className="text-2xl font-black text-[#A67853] mb-1">Ketama</h3>
                  <p className="text-xs uppercase tracking-widest text-[#A67853]/80">Мобильная карта</p>
                </div>
                
                {/* Large QR container forcing high contrast for physical scanners */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full aspect-square flex items-center justify-center mb-6 relative">
                  <QRCode value="Ketama-Loyalty-BradPitt" size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} bgColor="#ffffff" fgColor="#111111" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-white p-1 rounded-full">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl text-[#111111] border-[2.5px] border-[#111111]">
                          K
                        </div>
                     </div>
                  </div>
                </div>

                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  Приложите этот экран к сканеру или покажите баристе для списания/начисления бонусов
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bottom Sheet Modal */}
        <AnimatePresence>
          {activeAction && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4"
              onClick={() => setActiveAction(null)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-[#1C1C1C] w-full max-w-md rounded-t-[2rem] sm:rounded-3xl p-6 pb-12 sm:pb-6 shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden" />
                
                <button 
                  onClick={() => setActiveAction(null)}
                  className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {(() => {
                  const item = actionData.find(d => d.id === activeAction);
                  if (!item) return null;
                  return (
                    <div>
                      <div className="flex items-center space-x-4 mb-6 pr-10">
                        <div className="w-12 h-12 rounded-full bg-[#FCF8F2] dark:bg-[#2A2621] text-[#A67853] flex items-center justify-center">
                          <item.icon className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#A67853] leading-tight">
                          {item.title}
                        </h2>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        {item.content}
                      </div>
                    </div>
                  );
                })()}

                <button 
                  onClick={() => setActiveAction(null)}
                  className="w-full mt-8 py-4 bg-[#A67853] hover:bg-[#8C6544] text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#A67853]/30"
                >
                  Понятно
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

