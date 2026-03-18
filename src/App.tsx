import React, { useState, useEffect } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Landmark, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  CreditCard,
  Bell,
  Settings,
  TrendingUp,
  AlertCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
import { LoanApplication, UserProfile, LoanStatus } from './types';

// --- Components ---

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex justify-around items-center h-24 z-50 px-8 pb-6">
    <button 
      onClick={() => setActiveTab('home')} 
      className={cn("bottom-nav-item flex-1", activeTab === 'home' && "active")}
    >
      <div className={cn("p-2 rounded-2xl transition-all duration-500", activeTab === 'home' ? "bg-emerald-50 text-emerald-600 scale-110" : "text-slate-400")}>
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
      </div>
      <span className={cn("text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500", activeTab === 'home' ? "opacity-100" : "opacity-40")}>Home</span>
    </button>
    <button 
      onClick={() => setActiveTab('dashboard')} 
      className={cn("bottom-nav-item flex-1", activeTab === 'dashboard' && "active")}
    >
      <div className={cn("p-2 rounded-2xl transition-all duration-500", activeTab === 'dashboard' ? "bg-emerald-50 text-emerald-600 scale-110" : "text-slate-400")}>
        <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
      </div>
      <span className={cn("text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500", activeTab === 'dashboard' ? "opacity-100" : "opacity-40")}>Bills</span>
    </button>
    <button 
      onClick={() => setActiveTab('profile')} 
      className={cn("bottom-nav-item flex-1", activeTab === 'profile' && "active")}
    >
      <div className={cn("p-2 rounded-2xl transition-all duration-500", activeTab === 'profile' ? "bg-emerald-50 text-emerald-600 scale-110" : "text-slate-400")}>
        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
      </div>
      <span className={cn("text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500", activeTab === 'profile' ? "opacity-100" : "opacity-40")}>Profile</span>
    </button>
  </div>
);

const Header = ({ title, showBack, onBack, onLogoClick }: { title: string, showBack?: boolean, onBack?: () => void, onLogoClick?: () => void }) => (
  <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 px-6 h-20 flex items-center justify-between border-b border-slate-50/50">
    <div className="flex items-center gap-4">
      {showBack && (
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-600 active:scale-90 transition-all hover:bg-slate-100">
          <ChevronRight className="rotate-180" size={22} />
        </button>
      )}
      <button 
        onClick={onLogoClick} 
        className="flex items-center gap-2.5 active:scale-95 transition-all group"
        title="Back to Home"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white font-black text-lg italic shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-transform">S</div>
        {!showBack && (
          <div className="flex flex-col -gap-1">
            <span className="text-2xl font-black tracking-tighter text-slate-900 font-display leading-none">SkyLink</span>
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.3em] leading-none">Instant Loans</span>
          </div>
        )}
      </button>
    </div>
    <h1 className="text-[11px] font-black text-slate-900 absolute left-1/2 -translate-x-1/2 pointer-events-none uppercase tracking-[0.25em] whitespace-nowrap">{title}</h1>
    <div className="flex gap-3">
      <button className="w-11 h-11 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-400 relative active:scale-90 transition-all hover:bg-slate-100">
        <Bell size={22} />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
      </button>
    </div>
  </div>
);

const HomeView = ({ onApply, onIncreaseLimit, applications, onRepay }: { 
  onApply: () => void, 
  onIncreaseLimit: () => void,
  applications: LoanApplication[],
  onRepay: () => void
}) => {
  const maxLimit = 250000;
  const activeLoans = applications.filter(app => app.status !== 'paid');
  const totalDebt = activeLoans.reduce((sum, app) => sum + (app.totalRepayment || app.amount), 0);
  const availableLimit = Math.max(0, maxLimit - totalDebt);
  const nextRepayment = activeLoans.length > 0 ? activeLoans[0].monthlyRepayment : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-10 pb-32"
    >
      {/* Hero Card */}
      <div className="px-6 pt-8">
        <div className="relative bg-slate-900 rounded-[40px] p-10 text-white overflow-hidden shadow-2xl shadow-slate-200 group">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-[60px] group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.25em]">Available Credit (K)</span>
                </div>
                <div className="text-6xl font-black tracking-tighter font-display leading-none">
                  {availableLimit.toLocaleString()}
                </div>
              </div>
              <button 
                onClick={onIncreaseLimit}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white text-[10px] font-black px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2 transition-all active:scale-90 uppercase tracking-widest"
              >
                <TrendingUp size={14} strokeWidth={3} />
                Boost
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5">
              <div className="space-y-1">
                <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Daily Rate</div>
                <div className="text-xl font-black font-display tracking-tight text-emerald-400">0.02%</div>
              </div>
              <div className="space-y-1 border-x border-white/5 px-4">
                <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Speed</div>
                <div className="text-xl font-black font-display tracking-tight">10s</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] text-white/40 font-black uppercase tracking-widest">Terms</div>
                <div className="text-xl font-black font-display tracking-tight">12m</div>
              </div>
            </div>

            <button 
              onClick={onApply}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-6 rounded-[28px] shadow-2xl shadow-emerald-500/20 active:scale-[0.97] transition-all text-xl tracking-tight flex items-center justify-center gap-3 group/btn"
            >
              Get Cash Now
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Debt & Repayment Section */}
      {totalDebt > 0 && (
        <div className="px-6">
          <div className="bg-white rounded-[40px] p-8 border border-slate-50 shadow-soft flex items-center justify-between group">
            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Outstanding</div>
              <div className="text-3xl font-black text-slate-900 font-display tracking-tight">K {totalDebt.toLocaleString()}</div>
              <div className="flex items-center gap-2 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-[9px] text-emerald-700 font-black uppercase tracking-widest">Next: K {nextRepayment.toLocaleString()}</div>
              </div>
            </div>
            <button 
              onClick={onRepay}
              className="bg-slate-900 hover:bg-slate-800 text-white w-16 h-16 rounded-[24px] flex items-center justify-center shadow-xl shadow-slate-200 active:scale-90 transition-all group-hover:rotate-6"
            >
              <CreditCard size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

    {/* Advantage Section */}
    <div className="px-6 space-y-6">
      <div className="flex items-center gap-3 px-2">
        <div className="h-px flex-grow bg-slate-100" />
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">Why SkyLink</h2>
        <div className="h-px flex-grow bg-slate-100" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {[
          { icon: Zap, title: 'Instant', desc: 'AI Approval', color: 'bg-blue-500' },
          { icon: ShieldCheck, title: 'Secure', desc: 'Encrypted', color: 'bg-emerald-500' },
          { icon: Clock, title: 'Flexible', desc: 'Easy Terms', color: 'bg-amber-500' },
          { icon: CreditCard, title: 'Clear', desc: 'No Hidden', color: 'bg-rose-500' }
        ].map((adv, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-soft flex flex-col gap-4 group hover:border-emerald-100 transition-colors">
            <div className={cn(
              "w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500",
              adv.color
            )}>
              <adv.icon size={26} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
              <div className="text-base font-black text-slate-900 tracking-tight font-display">{adv.title}</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{adv.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Borrowing Steps */}
    <div className="px-6 space-y-6">
      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Simple Process</h2>
      <div className="bg-slate-50 rounded-[40px] p-10 flex justify-between items-center relative overflow-hidden border border-slate-100">
        {[
          { id: 1, label: 'Info', icon: User },
          { id: 2, label: 'ID', icon: Landmark },
          { id: 3, label: 'Sign', icon: FileText },
          { id: 4, label: 'Pay', icon: Zap }
        ].map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white rounded-[20px] flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100 group">
                <step.icon size={24} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{step.label}</span>
            </div>
            {i < 3 && (
              <div className="flex-grow h-0.5 bg-slate-200 mx-2 rounded-full relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Community Section */}
    <div className="px-6 space-y-6">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Success Stories</h2>
        <button className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl uppercase tracking-widest hover:bg-emerald-100 transition-colors">View All</button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
        {[
          { name: 'Kofi', amount: 'K 12,000', time: '2m ago', msg: 'SkyLink is amazing! Payout in 10s, saved my day! 🚀', color: 'bg-amber-100', img: 'https://picsum.photos/seed/kofi/200/200' },
          { name: 'Amara', amount: 'K 50,000', time: '15m ago', msg: '12-month installments make it so easy. Highly recommend! ✨', color: 'bg-blue-100', img: 'https://picsum.photos/seed/amara/200/200' },
          { name: 'Zaid', amount: 'K 5,000', time: '1h ago', msg: 'My first loan, the process was so smooth. Great! 🔥', color: 'bg-rose-100', img: 'https://picsum.photos/seed/zaid/200/200' },
        ].map((post, i) => (
          <div key={i} className="flex-shrink-0 w-80 bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-soft group">
            <div className="p-6 flex items-center gap-4">
              <div className="relative">
                <img src={post.img} alt={post.name} className="w-12 h-12 rounded-[20px] border-2 border-emerald-500 p-0.5 object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-lg border-2 border-white flex items-center justify-center shadow-sm">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
              </div>
              <div>
                <div className="text-base font-black text-slate-900 tracking-tight font-display">{post.name}</div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{post.time}</div>
              </div>
              <div className="ml-auto bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">
                {post.amount}
              </div>
            </div>
            <div className={cn("h-56 relative overflow-hidden", post.color)}>
              <img 
                src={`https://picsum.photos/seed/loan${i}/400/300`} 
                alt="Success" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-bold leading-relaxed drop-shadow-md italic">
                  "{post.msg}"
                </p>
              </div>
            </div>
            <div className="p-6 flex items-center gap-6 text-slate-400 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">1.2k Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
                <span className="text-[10px] font-black uppercase tracking-widest">48 Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
  );
};

const ApplicationWizard = ({ onComplete, onCancel, onLogoClick }: { onComplete: (app: LoanApplication, profile: UserProfile) => void, onCancel: () => void, onLogoClick: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '50000',
    term: '12',
    purpose: 'Personal Expense',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    occupation: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    idNumber: '',
    income: '',
    bankCard: '',
    idFront: null as File | null,
    idBack: null as File | null,
    signed: false
  });

  const steps = [
    { id: 1, title: 'Loan Info', icon: CreditCard },
    { id: 2, title: 'Identity', icon: User },
    { id: 3, title: 'Contract', icon: FileText },
    { id: 4, title: 'Payout', icon: Zap },
  ];

  // Calculations
  const amountNum = Number(formData.amount) || 0;
  const termNum = Number(formData.term) || 1;
  const serviceFee = Math.round(amountNum * 0.02); // 2% service fee
  const arrivalAmount = amountNum - serviceFee;
  const monthlyRepayment = Math.round((amountNum * 1.05) / termNum); // 5% total interest for simplicity
  
  const getNextRepaymentDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleFinish = () => {
    const profile: UserProfile = {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.lastName}${formData.firstName}`,
      email: formData.email,
      phone: formData.phone,
      idNumber: formData.idNumber,
      occupation: formData.occupation,
      dob: formData.dob,
      address: formData.address,
      employmentStatus: 'Employed',
      monthlyIncome: Number(formData.income) || 5000,
      bankAccount: formData.bankCard
    };

    const app: LoanApplication = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      amount: amountNum,
      term: termNum,
      purpose: formData.purpose,
      status: 'approved',
      createdAt: new Date().toISOString(),
      monthlyRepayment: monthlyRepayment,
      totalRepayment: amountNum + (monthlyRepayment * termNum - amountNum)
    };

    onComplete(app, profile);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header title="Apply for Loan" showBack onBack={onCancel} onLogoClick={onLogoClick} />
      
      <div className="px-6 py-10 space-y-10 flex-grow overflow-y-auto no-scrollbar">
        {/* Stepper */}
        <div className="flex justify-between relative px-4">
          <div className="absolute top-7 left-0 w-full h-1.5 bg-slate-200/50 -z-0 rounded-full" />
          <div 
            className="absolute top-7 left-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 -z-0 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map(s => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                step >= s.id ? "bg-emerald-600 text-white scale-110 shadow-emerald-200" : "bg-white text-slate-300 border border-slate-100"
              )}>
                <s.icon size={24} strokeWidth={step >= s.id ? 2.5 : 2} />
              </div>
              <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500", step >= s.id ? "text-emerald-600" : "text-slate-400")}>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[48px] p-10 shadow-premium border border-slate-50/50 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-8 flex-grow">
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">Loan Details</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">Customize your loan amount and repayment period to fit your needs.</p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] ml-2">Loan Amount (K)</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">K</div>
                      <input type="number" placeholder="Enter amount" className="input-field pl-12" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] ml-2">Installment Period</label>
                    <div className="relative">
                      <select className="input-field appearance-none cursor-pointer" value={formData.term} onChange={e => setFormData({...formData, term: e.target.value})}>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={20} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] ml-2">Purpose</label>
                    <div className="relative">
                      <select className="input-field appearance-none cursor-pointer" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
                        <option value="Personal Expense">Personal Expense</option>
                        <option value="Business Turnover">Business Turnover</option>
                        <option value="Home Renovation">Home Renovation</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                      </select>
                      <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={20} />
                    </div>
                  </div>

                  {/* Fee Summary */}
                  <div className="mt-10 p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Service Fee</span>
                      <span className="text-base font-black text-slate-900 font-display tracking-tight">K {serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Payout Amount</span>
                      <span className="text-base font-black text-emerald-600 font-display tracking-tight">K {arrivalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Monthly Repayment</span>
                      <span className="text-base font-black text-slate-900 font-display tracking-tight">K {monthlyRepayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-5 border-t border-slate-200">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">First Payment</span>
                      <span className="text-base font-black text-slate-900 font-display tracking-tight">{getNextRepaymentDate()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-10 flex-grow">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">Basic Info</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Please provide your accurate personal details for verification.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1 space-y-2">
                      <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Title</label>
                      <select className="input-field py-4 text-sm appearance-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Full Name</label>
                      <input type="text" placeholder="Last Name & First Name" className="input-field py-4 text-sm" value={`${formData.lastName} ${formData.firstName}`} onChange={e => {
                        const parts = e.target.value.split(' ');
                        setFormData({...formData, lastName: parts[0] || '', firstName: parts.slice(1).join(' ') || ''});
                      }} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Occupation</label>
                      <input type="text" placeholder="e.g. Engineer" className="input-field py-4 text-sm" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Birth Date</label>
                      <input type="date" className="input-field py-4 text-sm" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Email Address</label>
                    <input type="email" placeholder="example@mail.com" className="input-field py-4 text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Phone Number</label>
                    <input type="tel" placeholder="Mobile Number" className="input-field py-4 text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-8 pt-6 border-t border-slate-100">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">ID Verification</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Upload clear photos of your official ID card (Front & Back).</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => setFormData({...formData, idFront: e.target.files?.[0] || null})}
                      />
                      <div className={cn(
                        "aspect-[1.6/1] bg-slate-50 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all duration-500",
                        formData.idFront ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 group-hover:border-emerald-400 group-hover:bg-emerald-50/20"
                      )}>
                        {formData.idFront ? (
                          <div className="text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <CheckCircle2 size={32} />
                            </div>
                            <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Front Ready</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-sm text-slate-300 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-500">
                              <User size={32} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ID Front</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => setFormData({...formData, idBack: e.target.files?.[0] || null})}
                      />
                      <div className={cn(
                        "aspect-[1.6/1] bg-slate-50 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-4 transition-all duration-500",
                        formData.idBack ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 group-hover:border-emerald-400 group-hover:bg-emerald-50/20"
                      )}>
                        {formData.idBack ? (
                          <div className="text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <CheckCircle2 size={32} />
                            </div>
                            <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Back Ready</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center shadow-sm text-slate-300 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-500">
                              <Landmark size={32} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ID Back</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">ID Number</label>
                    <input type="text" placeholder="Enter ID Number" className="input-field py-4 text-sm" value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Payout Wallet/Bank Account</label>
                    <input type="text" placeholder="Enter wallet address or bank card" className="input-field py-4 text-sm" value={formData.bankCard} onChange={e => setFormData({...formData, bankCard: e.target.value})} />
                  </div>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="space-y-8 flex-grow">
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">Sign Contract</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">Please review the terms carefully and sign electronically.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 text-[12px] text-slate-500 leading-relaxed max-h-[400px] overflow-y-auto no-scrollbar relative">
                  <div className="sticky top-0 bg-slate-50 pb-4 mb-4 border-b border-slate-200">
                    <p className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">Loan Agreement Summary</p>
                  </div>
                  <div className="space-y-6">
                    <p>1. The borrower confirms that all personal information provided is true, accurate, and valid.</p>
                    <p>2. Approved Loan Amount: <span className="font-black text-slate-900">K {formData.amount}</span></p>
                    <p>3. Repayment Period: <span className="font-black text-slate-900">{formData.term} Months</span></p>
                    <p>4. Monthly Repayment: <span className="font-black text-slate-900">K {monthlyRepayment}</span></p>
                    <p>5. The borrower agrees to repay on time. Overdue payments will incur penalties as per the detailed terms of service.</p>
                    <p>6. This agreement takes effect immediately upon electronic signature.</p>
                    <p className="pt-4 text-[10px] opacity-60 italic">By checking the box below, you are providing a legal electronic signature and agreeing to be bound by the terms of this SkyLink Loan Agreement.</p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-dashed border-slate-300">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative mt-1">
                        <input 
                          type="checkbox" 
                          className="peer sr-only" 
                          checked={formData.signed} 
                          onChange={e => setFormData({...formData, signed: e.target.checked})} 
                        />
                        <div className="w-6 h-6 border-2 border-slate-200 rounded-xl bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-all duration-300 flex items-center justify-center shadow-sm">
                          <CheckCircle2 size={16} className="text-white scale-0 peer-checked:scale-100 transition-transform duration-300" />
                        </div>
                      </div>
                      <span className="text-slate-900 font-extrabold text-sm leading-snug group-hover:text-emerald-600 transition-colors">I have read and agree to the SkyLink Loan Agreement and Terms of Service.</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-10 text-center py-12 flex-grow flex flex-col justify-center">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-emerald-100/50 rounded-[40px] animate-ping opacity-20" />
                  <div className="absolute inset-0 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100/50">
                    <Zap size={64} strokeWidth={2.5} className="animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter font-display">Disbursing Funds</h3>
                  <p className="text-base text-slate-400 font-medium px-6 leading-relaxed">Congratulations! Your application is approved. Funds are being transferred to your account.</p>
                </div>
                <div className="p-8 bg-emerald-50/30 rounded-[40px] border border-emerald-100/50 text-left space-y-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Destination</span>
                    <span className="text-base font-black text-slate-900 font-display tracking-tight">{formData.bankCard || '**** **** **** 8888'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Est. Arrival</span>
                    <span className="text-base font-black text-emerald-600 font-display tracking-tight">Within 10 Seconds</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-10 bg-white border-t border-slate-50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        {step < 4 ? (
          <button 
            onClick={() => setStep(s => s + 1)} 
            disabled={step === 3 && !formData.signed}
            className={cn("w-full btn-primary py-6 text-xl", step === 3 && !formData.signed && "opacity-50 cursor-not-allowed")}
          >
            {step === 3 ? 'Sign & Payout' : 'Continue'}
            <ArrowRight size={24} strokeWidth={3} />
          </button>
        ) : (
          <button onClick={handleFinish} className="w-full btn-primary py-6 text-xl group">
            Go to Dashboard
            <LayoutDashboard size={24} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

const DashboardView = ({ applications, onRepay }: { applications: LoanApplication[], onRepay?: () => void }) => {
  const activeLoans = applications.filter(app => app.status !== 'paid');
  const totalDue = activeLoans.reduce((sum, app) => sum + (app.totalRepayment || app.amount), 0);
  const nextPayment = activeLoans.length > 0 ? activeLoans[0].monthlyRepayment : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-10 pb-24"
    >
      <div className="px-6 space-y-10">
        {/* Top Record Icons */}
        <div className="grid grid-cols-2 gap-6 pt-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[48px] border border-white/50 shadow-premium flex flex-col items-center gap-4 group hover:bg-white transition-all duration-500">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[24px] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
              <History size={32} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 font-display tracking-tight">{applications.length}</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Loans</div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[48px] border border-white/50 shadow-premium flex flex-col items-center gap-4 group hover:bg-white transition-all duration-500">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 font-display tracking-tight">720</div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Credit Score</div>
            </div>
          </div>
        </div>

        {/* Repayment Plan Section */}
        <div className="bg-slate-900 rounded-[56px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-24 -mb-24 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-black font-display tracking-tight">Repayment Plan</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage your active loans</p>
              </div>
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
                <Calendar size={28} className="text-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 py-4">
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Total Due</div>
                <div className="text-3xl font-black font-display tracking-tight">K {totalDue.toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Next Payment</div>
                <div className="text-3xl font-black font-display tracking-tight text-emerald-400">K {nextPayment.toLocaleString()}</div>
              </div>
            </div>

            <button 
              onClick={onRepay}
              disabled={activeLoans.length === 0}
              className={cn(
                "w-full py-6 rounded-[28px] font-black text-lg flex items-center justify-center gap-3 transition-all duration-500 shadow-xl",
                activeLoans.length > 0 
                  ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20 active:scale-[0.98]" 
                  : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
              )}
            >
              {activeLoans.length > 0 ? (
                <>
                  Repay Now
                  <ArrowRight size={24} strokeWidth={3} />
                </>
              ) : 'No Active Loans'}
            </button>
          </div>
        </div>

        {/* My Bills Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="font-black text-slate-900 uppercase tracking-[0.2em] text-xs">Loan History</h2>
            <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity">View All</span>
          </div>
          
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app, idx) => (
                <motion.div 
                  key={app.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex justify-between items-center p-6 bg-white rounded-[32px] border border-slate-50 shadow-premium group hover:border-emerald-100 transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all duration-500 shadow-sm">
                      <CreditCard size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-lg font-black text-slate-900 font-display tracking-tight">K {app.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm",
                    app.status === 'pending' ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                    app.status === 'paid' ? "bg-slate-50 text-slate-400 border border-slate-100" :
                    "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  )}>
                    {app.status === 'pending' ? 'Reviewing' : 
                     app.status === 'paid' ? 'Settled' : 'Active'}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6 bg-white rounded-[48px] border border-slate-50 shadow-premium">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200">
                <FileText size={48} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">No loan records found</p>
                <p className="text-[10px] text-slate-300 font-medium">Your loan history will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProfileView = ({ user }: { user: UserProfile | null }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="space-y-10 pb-24"
  >
    <div className="bg-slate-900 pt-20 pb-28 px-8 rounded-b-[64px] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-40 -mt-40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
      
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[36px] flex items-center justify-center border border-white/20 shadow-2xl group hover:scale-105 transition-transform duration-500">
          <User size={48} strokeWidth={2.5} className="text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black font-display tracking-tight">{user?.fullName || 'Guest User'}</h2>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">{user?.phone || 'Verify Profile'}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>

    <div className="px-6 -mt-16 relative z-20">
      <div className="bg-white/90 backdrop-blur-2xl rounded-[48px] p-2 shadow-premium border border-white/50">
        <div className="grid grid-cols-4 py-8">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-black font-display text-slate-900 tracking-tight group-hover:scale-110 transition-transform">0</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Coupons</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-x border-slate-50 group cursor-pointer">
            <span className="text-2xl font-black font-display text-slate-900 tracking-tight group-hover:scale-110 transition-transform">0</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Points</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-r border-slate-50 group cursor-pointer">
            <span className="text-2xl font-black font-display text-emerald-600 tracking-tight group-hover:scale-110 transition-transform">720</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Score</span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-black font-display text-slate-900 tracking-tight group-hover:scale-110 transition-transform">0</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Inbox</span>
          </div>
        </div>
      </div>
    </div>

    <div className="px-6 space-y-5">
      {[
        { icon: ShieldCheck, title: 'Security Center', extra: 'Protected', color: 'bg-blue-50 text-blue-600' },
        { icon: Landmark, title: 'Payment Account', extra: user?.bankAccount ? `${user.bankAccount.slice(0, 4)}...${user.bankAccount.slice(-4)}` : 'Link Card', color: 'bg-emerald-50 text-emerald-600' },
        { icon: Settings, title: 'Settings', extra: 'V2.4.0', color: 'bg-slate-50 text-slate-600' },
      ].map((item, i) => (
        <button key={i} className="w-full bg-white p-6 rounded-[40px] flex justify-between items-center border border-slate-50 shadow-premium active:scale-[0.98] transition-all group hover:border-emerald-100">
          <div className="flex items-center gap-5">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm", item.color)}>
              <item.icon size={24} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-black text-slate-800 font-display tracking-tight">{item.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.extra}</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <ChevronRight size={18} strokeWidth={3} />
            </div>
          </div>
        </button>
      ))}
    </div>
  </motion.div>
);

const LimitIncreaseView = ({ onBack, onLogoClick }: { onBack: () => void, onLogoClick: () => void }) => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    tax: null,
    work: null,
    loan: null,
    other: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = (key: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col h-full bg-white">
        <Header title="Increase Limit" showBack onBack={onBack} onLogoClick={onLogoClick} />
        <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-6 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900">Submission Successful</h3>
            <p className="text-sm text-slate-400">We will complete the review within 1-3 working days. Please wait for notification.</p>
          </div>
          <button onClick={onBack} className="w-full btn-primary py-4 mt-8">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header title="Increase Limit" showBack onBack={onBack} onLogoClick={onLogoClick} />
      
      <div className="px-6 py-8 space-y-6 flex-grow overflow-y-auto">
        <div className="bg-emerald-600 rounded-3xl p-6 text-white space-y-2">
          <div className="text-xs text-emerald-100 font-bold uppercase">Current Max Limit</div>
          <div className="text-3xl font-black">K 250,000</div>
          <p className="text-[10px] text-emerald-100 opacity-80">Provide more info to increase up to K 500,000</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Supporting Documents</h3>
          
          {[
            { key: 'tax', title: 'Tax Records', desc: 'Proof of income tax payment for the last 6 months', icon: FileText },
            { key: 'work', title: 'Employment Proof', desc: 'ID card, business card or employment certificate', icon: Briefcase },
            { key: 'loan', title: 'Loan History', desc: 'Screenshots of good repayment records from other platforms', icon: CreditCard },
            { key: 'other', title: 'Financial Proof', desc: 'Property, car or large certificate of deposit', icon: Landmark },
          ].map((item) => (
            <div key={item.key} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  onChange={(e) => handleUpload(item.key, e.target.files?.[0] || null)}
                />
                <button className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors",
                  files[item.key] ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                )}>
                  {files[item.key] ? 'Selected' : 'Upload'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
          <AlertCircle className="text-amber-500 flex-shrink-0" size={18} />
          <p className="text-[10px] text-amber-700 leading-relaxed">
            Tip: Please ensure the uploaded documents are clear and valid. False information will lead to failure and affect your credit score.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-50">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || !Object.values(files).some(f => f !== null)}
          className={cn(
            "w-full btn-primary py-4 flex items-center justify-center gap-2",
            (isSubmitting || !Object.values(files).some(f => f !== null)) && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
};

const RepaymentView = ({ applications, onBack, onComplete, onLogoClick }: { 
  applications: LoanApplication[], 
  onBack: () => void,
  onComplete: () => void,
  onLogoClick: () => void
}) => {
  const activeLoans = applications.filter(app => app.status !== 'paid');
  const totalAmount = activeLoans.reduce((sum, app) => sum + (app.totalRepayment || app.amount), 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRepay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header title="Repay Now" showBack onBack={onBack} onLogoClick={onLogoClick} />
      
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {success ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 text-center space-y-4 shadow-sm"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Repayment Successful</h3>
            <p className="text-sm text-slate-400">Your loan has been successfully settled, and your credit limit has been restored.</p>
          </motion.div>
        ) : (
          <>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="text-center space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Due (K)</div>
                <div className="text-4xl font-black text-slate-900">K {totalAmount.toLocaleString()}</div>
              </div>
              
              <div className="pt-4 border-t border-slate-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Items</span>
                  <span className="font-bold text-slate-700">{applications.length} Loans</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Method</span>
                  <span className="font-bold text-slate-700">Bank Card (Ending 8888)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bill Details</h4>
              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-slate-700">Loan K {app.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm font-black text-slate-900">K {(app.totalRepayment || app.amount).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {!success && (
        <div className="p-6 bg-white border-t border-slate-50">
          <button 
            onClick={handleRepay}
            disabled={isProcessing}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : 'Confirm Repayment'}
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isApplying, setIsApplying] = useState(false);
  const [isIncreasingLimit, setIsIncreasingLimit] = useState(false);
  const [isRepaying, setIsRepaying] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('skylink_user');
    const savedApps = localStorage.getItem('skylink_apps');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedApps) setApplications(JSON.parse(savedApps));
  }, []);

  const handleCompleteApplication = (app: LoanApplication, profile: UserProfile) => {
    const newApps = [app, ...applications];
    setApplications(newApps);
    setUser(profile);
    localStorage.setItem('skylink_user', JSON.stringify(profile));
    localStorage.setItem('skylink_apps', JSON.stringify(newApps));
    setIsApplying(false);
    setActiveTab('dashboard');
  };

  const handleRepayComplete = () => {
    const newApps = applications.map(app => ({
      ...app,
      status: app.status === 'approved' || app.status === 'disbursed' ? 'paid' as LoanStatus : app.status
    }));
    setApplications(newApps);
    localStorage.setItem('skylink_apps', JSON.stringify(newApps));
    setIsRepaying(false);
    setActiveTab('home');
  };

  const goToHome = () => {
    setIsApplying(false);
    setIsIncreasingLimit(false);
    setIsRepaying(false);
    setActiveTab('home');
  };

  return (
    <div className="flex-grow flex flex-col relative">
      <AnimatePresence mode="wait">
        {isApplying ? (
          <motion.div 
            key="wizard" 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-white max-w-md mx-auto"
          >
            <ApplicationWizard 
              onComplete={handleCompleteApplication} 
              onCancel={() => setIsApplying(false)} 
              onLogoClick={goToHome}
            />
          </motion.div>
        ) : isIncreasingLimit ? (
          <motion.div 
            key="limit-increase" 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[60] bg-white max-w-md mx-auto"
          >
            <LimitIncreaseView 
              onBack={() => setIsIncreasingLimit(false)} 
              onLogoClick={goToHome}
            />
          </motion.div>
        ) : isRepaying ? (
          <motion.div 
            key="repayment" 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-white max-w-md mx-auto"
          >
            <RepaymentView 
              applications={applications} 
              onBack={() => setIsRepaying(false)} 
              onComplete={handleRepayComplete}
              onLogoClick={goToHome}
            />
          </motion.div>
        ) : (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
            <Header 
              title={activeTab === 'home' ? '' : activeTab === 'dashboard' ? 'My Bills' : 'Profile Center'} 
              showBack={activeTab !== 'home'}
              onBack={() => setActiveTab('home')}
              onLogoClick={goToHome}
            />
            
            <div className="flex-grow overflow-y-auto">
              {activeTab === 'home' && (
                <HomeView 
                  onApply={() => setIsApplying(true)} 
                  onIncreaseLimit={() => setIsIncreasingLimit(true)}
                  applications={applications}
                  onRepay={() => setIsRepaying(true)}
                />
              )}
              {activeTab === 'dashboard' && <DashboardView applications={applications} />}
              {activeTab === 'profile' && <ProfileView user={user} />}
            </div>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
