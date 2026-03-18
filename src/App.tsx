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
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 flex justify-around items-center h-16 z-50 px-4">
    <button 
      onClick={() => setActiveTab('home')} 
      className={cn("bottom-nav-item", activeTab === 'home' && "active")}
    >
      <Home size={20} />
      <span className="text-[10px] font-bold">Home</span>
    </button>
    <button 
      onClick={() => setActiveTab('dashboard')} 
      className={cn("bottom-nav-item", activeTab === 'dashboard' && "active")}
    >
      <LayoutDashboard size={20} />
      <span className="text-[10px] font-bold">Bills</span>
    </button>
    <button 
      onClick={() => setActiveTab('profile')} 
      className={cn("bottom-nav-item", activeTab === 'profile' && "active")}
    >
      <User size={20} />
      <span className="text-[10px] font-bold">Profile</span>
    </button>
  </div>
);

const Header = ({ title, showBack, onBack, onLogoClick }: { title: string, showBack?: boolean, onBack?: () => void, onLogoClick?: () => void }) => (
  <div className="sticky top-0 bg-white z-40 px-4 h-14 flex items-center justify-between border-b border-slate-50">
    <div className="flex items-center gap-2">
      {showBack && (
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600 active:scale-90 transition-transform">
          <ChevronRight className="rotate-180" size={24} />
        </button>
      )}
      <button 
        onClick={onLogoClick} 
        className="flex items-center gap-1.5 active:scale-95 transition-transform"
        title="Back to Home"
      >
        <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm italic shadow-sm">S</div>
        {!showBack && <span className="text-lg font-black tracking-tighter text-slate-900">SkyLink</span>}
      </button>
    </div>
    <h1 className="text-base font-bold text-slate-900 absolute left-1/2 -translate-x-1/2 pointer-events-none">{title}</h1>
    <div className="flex gap-3">
      <Bell size={20} className="text-slate-400" />
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
    <div className="space-y-6 pb-20">
      {/* Hero Card */}
      <div className="px-4 pt-4">
        <div className="relative bg-emerald-600 rounded-3xl p-8 text-white overflow-hidden shadow-xl shadow-emerald-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full -ml-12 -mb-12 blur-xl" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Max Credit Limit (K)</span>
                <div className="text-5xl font-black tracking-tighter">{availableLimit.toLocaleString()}</div>
              </div>
              <button 
                onClick={onIncreaseLimit}
                className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1 transition-colors active:scale-95"
              >
                <TrendingUp size={12} />
                Increase
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10">
              <div className="text-center">
                <div className="text-xs text-emerald-100 mb-1">Rates from</div>
                <div className="font-bold">0.02%</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-xs text-emerald-100 mb-1">Fast Payout</div>
                <div className="font-bold">10s</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-emerald-100 mb-1">Max Terms</div>
                <div className="font-bold">12m</div>
              </div>
            </div>

            <button 
              onClick={onApply}
              className="w-full bg-white text-emerald-600 font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              Withdraw Now
            </button>
          </div>
        </div>
      </div>

      {/* Debt & Repayment Section */}
      {totalDebt > 0 && (
        <div className="px-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Balance (K)</div>
              <div className="text-2xl font-black text-slate-900">K {totalDebt.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-600 font-medium">Due this month: K {nextRepayment.toLocaleString()}</div>
            </div>
            <button 
              onClick={onRepay}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 active:scale-95 transition-transform flex items-center gap-2"
            >
              <CreditCard size={16} />
              Repay Now
            </button>
          </div>
        </div>
      )}

    {/* Advantage Section */}
    <div className="px-4 space-y-4">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-1">Our Advantages</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <div className="text-sm font-bold">Fast Approval</div>
            <div className="text-[10px] text-slate-400">AI-powered</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-bold">Secure & Safe</div>
            <div className="text-[10px] text-slate-400">Bank-level encryption</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-sm font-bold">Flexible Terms</div>
            <div className="text-[10px] text-slate-400">Up to 12 months</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <CreditCard size={20} />
          </div>
          <div>
            <div className="text-sm font-bold">Transparent</div>
            <div className="text-[10px] text-slate-400">No hidden fees</div>
          </div>
        </div>
      </div>
    </div>

    {/* Borrowing Steps */}
    <div className="px-4 space-y-4">
      <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-1">How it Works</h2>
      <div className="bg-slate-50 rounded-3xl p-6 flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 font-bold text-xs">1</div>
          <span className="text-[9px] font-bold text-slate-600">Loan Info</span>
        </div>
        <ChevronRight size={12} className="text-slate-200" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 font-bold text-xs">2</div>
          <span className="text-[9px] font-bold text-slate-600">Identity</span>
        </div>
        <ChevronRight size={12} className="text-slate-200" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 font-bold text-xs">3</div>
          <span className="text-[9px] font-bold text-slate-600">Contract</span>
        </div>
        <ChevronRight size={12} className="text-slate-200" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-emerald-600 font-bold text-xs">4</div>
          <span className="text-[9px] font-bold text-slate-600">Payout</span>
        </div>
      </div>
    </div>

    {/* Community Section - African Instagram Style */}
    <div className="px-4 space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Community Stories</h2>
        <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Share Mine</button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
        {[
          { name: 'Kofi', amount: 'K 12,000', time: '2m ago', msg: 'SkyLink is amazing! Payout in 10s, saved my day! 🚀', color: 'bg-amber-100', img: 'https://picsum.photos/seed/kofi/200/200' },
          { name: 'Amara', amount: 'K 50,000', time: '15m ago', msg: '12-month installments make it so easy. Highly recommend! ✨', color: 'bg-blue-100', img: 'https://picsum.photos/seed/amara/200/200' },
          { name: 'Zaid', amount: 'K 5,000', time: '1h ago', msg: 'My first loan, the process was so smooth. Great! 🔥', color: 'bg-rose-100', img: 'https://picsum.photos/seed/zaid/200/200' },
        ].map((post, i) => (
          <div key={i} className="flex-shrink-0 w-64 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="p-3 flex items-center gap-2">
              <img src={post.img} alt={post.name} className="w-8 h-8 rounded-full border-2 border-emerald-500 p-0.5" referrerPolicy="no-referrer" />
              <div>
                <div className="text-xs font-bold text-slate-900">{post.name}</div>
                <div className="text-[8px] text-slate-400">{post.time}</div>
              </div>
              <div className="ml-auto bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                Borrowed {post.amount}
              </div>
            </div>
            <div className={cn("h-40 relative", post.color)}>
              <img 
                src={`https://picsum.photos/seed/loan${i}/400/300`} 
                alt="Success" 
                className="w-full h-full object-cover opacity-80" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-[10px] font-medium leading-tight">
                  {post.msg}
                </p>
              </div>
            </div>
            <div className="p-3 flex items-center gap-3 text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[8px] font-bold">99+ Likes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[8px] font-bold">12 Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
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
      
      <div className="px-6 py-8 space-y-8 flex-grow overflow-y-auto">
        <div className="flex justify-between relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-0" />
          {steps.map(s => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                step >= s.id ? "bg-emerald-600 text-white" : "bg-white text-slate-300 border border-slate-200"
              )}>
                <s.icon size={18} />
              </div>
              <span className={cn("text-[9px] font-bold", step >= s.id ? "text-emerald-600" : "text-slate-400")}>{s.title}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <h3 className="text-lg font-bold">Loan Intent</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold mb-1 block">Loan Amount (K)</label>
                    <input type="number" placeholder="Enter amount" className="input-field" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold mb-1 block">Installment Period</label>
                    <select className="input-field" value={formData.term} onChange={e => setFormData({...formData, term: e.target.value})}>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="9">9 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold mb-1 block">Purpose</label>
                    <select className="input-field" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})}>
                      <option value="Personal Expense">Personal Expense</option>
                      <option value="Business Turnover">Business Turnover</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Education">Education</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>

                  {/* Fee Summary */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Service Fee</span>
                      <span className="text-xs font-bold text-slate-900">K {serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Payout Amount</span>
                      <span className="text-xs font-bold text-emerald-600">K {arrivalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Monthly Repayment</span>
                      <span className="text-xs font-bold text-slate-900">K {monthlyRepayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-xs text-slate-500">First Payment Date</span>
                      <span className="text-xs font-bold text-slate-900">{getNextRepaymentDate()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Basic Info</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="text-[10px] text-slate-400 font-bold mb-1 block">Title</label>
                      <select className="input-field py-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] text-slate-400 font-bold mb-1 block">Last Name</label>
                      <input type="text" placeholder="Last Name" className="input-field py-2 text-sm" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <div className="col-span-1">
                      <label className="text-[10px] text-slate-400 font-bold mb-1 block">First Name</label>
                      <input type="text" placeholder="First Name" className="input-field py-2 text-sm" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold mb-1 block">Occupation</label>
                      <input type="text" placeholder="e.g. Engineer" className="input-field py-2 text-sm" value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold mb-1 block">Date of Birth</label>
                      <input type="date" className="input-field py-2 text-sm" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">Email</label>
                    <input type="email" placeholder="example@mail.com" className="input-field py-2 text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">Phone Number</label>
                    <input type="tel" placeholder="Mobile Number" className="input-field py-2 text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">Home Address</label>
                    <textarea placeholder="Full Address" className="input-field py-2 text-sm h-20 resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold">ID Upload</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => setFormData({...formData, idFront: e.target.files?.[0] || null})}
                      />
                      <div className="aspect-[1.6/1] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-emerald-500 transition-colors">
                        {formData.idFront ? (
                          <div className="text-center">
                            <CheckCircle2 className="text-emerald-500 mx-auto" size={24} />
                            <span className="text-[10px] text-slate-500 font-bold mt-1 block">Front Selected</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
                              <User size={20} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">ID Front</span>
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
                      <div className="aspect-[1.6/1] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-emerald-500 transition-colors">
                        {formData.idBack ? (
                          <div className="text-center">
                            <CheckCircle2 className="text-emerald-500 mx-auto" size={24} />
                            <span className="text-[10px] text-slate-500 font-bold mt-1 block">Back Selected</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
                              <Landmark size={20} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">ID Back</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">ID Number</label>
                    <input type="text" placeholder="Enter ID Number" className="input-field py-2 text-sm" value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">Wallet/Bank Account</label>
                    <input type="text" placeholder="Enter wallet address or bank card" className="input-field py-2 text-sm" value={formData.bankCard} onChange={e => setFormData({...formData, bankCard: e.target.value})} />
                  </div>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                <h3 className="text-lg font-bold">Sign Contract</h3>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed max-h-60 overflow-y-auto">
                  <p className="font-bold text-slate-900 mb-2">Loan Agreement Summary:</p>
                  <p>1. The borrower confirms that the personal information filled in above is true and valid.</p>
                  <p>2. Loan amount: K {formData.amount}, Installments: {formData.term} months.</p>
                  <p>3. The borrower agrees to repay on time, and overdue will incur corresponding penalties.</p>
                  <p>4. This agreement takes effect from the date of electronic signature.</p>
                  <div className="mt-8 border-t border-dashed border-slate-300 pt-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="sign" checked={formData.signed} onChange={e => setFormData({...formData, signed: e.target.checked})} />
                      <label htmlFor="sign" className="text-slate-900 font-bold">I have read and agree to the above agreement</label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6 text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Zap size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">Payout in Progress</h3>
                  <p className="text-sm text-slate-400">Your application has passed the preliminary review, and funds are being disbursed rapidly. Please check your bank notifications.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Receiving Account</span>
                    <span className="font-bold text-slate-900">{formData.bankCard || '**** **** **** 8888'}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Est. Arrival</span>
                    <span className="font-bold text-emerald-600">Within 10s</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-50">
        {step < 4 ? (
          <button 
            onClick={() => setStep(s => s + 1)} 
            disabled={step === 3 && !formData.signed}
            className={cn("w-full btn-primary py-4", step === 3 && !formData.signed && "opacity-50 cursor-not-allowed")}
          >
            Next Step
          </button>
        ) : (
          <button onClick={handleFinish} className="w-full btn-primary py-4">Finish & Return</button>
        )}
      </div>
    </div>
  );
};

const DashboardView = ({ applications }: { applications: LoanApplication[] }) => {
  // Generate a mock repayment plan based on approved applications
  const activeLoans = applications.filter(app => app.status === 'approved' || app.status === 'disbursed');
  const repaymentPlan = activeLoans
    .flatMap(app => {
      const plan = [];
      const monthlyAmount = app.monthlyRepayment || (app.totalRepayment / app.term);
      const startDate = new Date(app.createdAt);
      
      for (let i = 1; i <= app.term; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(startDate.getMonth() + i);
        plan.push({
          id: `${app.id}-${i}`,
          amount: monthlyAmount,
          date: dueDate,
          installment: i,
          totalInstallments: app.term
        });
      }
      return plan;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-6 pb-20">
      {/* Top Record Icons */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 transition-active">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <ArrowDownCircle size={24} />
          </div>
          <span className="text-xs font-bold text-slate-700">Loan Records</span>
        </button>
        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 transition-active">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <ArrowUpCircle size={24} />
          </div>
          <span className="text-xs font-bold text-slate-700">Repayment Records</span>
        </button>
      </div>

      {/* Repayment Plan Section */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Calendar size={18} className="text-emerald-600" />
              Repayment Plan
            </h2>
            <span className="text-[10px] text-slate-400 font-medium">Future Due</span>
          </div>
          
          {repaymentPlan.length > 0 ? (
            <div className="space-y-4">
              {repaymentPlan.slice(0, 5).map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700">K {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      <div className="text-[10px] text-slate-400">
                        Installment {item.installment}/{item.totalInstallments} · {item.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    Pending
                  </div>
                </div>
              ))}
              {repaymentPlan.length > 5 && (
                <button className="w-full py-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  View More
                </button>
              )}
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <Calendar size={32} />
              </div>
              <p className="text-sm text-slate-400">No repayment plan</p>
            </div>
          )}
        </div>
      </div>

      {/* Original Bill List */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-slate-900">My Bills</h2>
            <span className="text-xs text-emerald-600 font-bold">All Bills</span>
          </div>
          
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">K {app.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-lg",
                    app.status === 'pending' ? "bg-amber-100 text-amber-600" : 
                    app.status === 'paid' ? "bg-slate-100 text-slate-400" :
                    "bg-emerald-100 text-emerald-600"
                  )}>
                    {app.status === 'pending' ? 'Reviewing' : 
                     app.status === 'paid' ? 'Paid' : 'Disbursed'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                <FileText size={32} />
              </div>
              <p className="text-sm text-slate-400">No loan records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileView = ({ user }: { user: UserProfile | null }) => (
  <div className="space-y-6 pb-20">
    <div className="bg-emerald-600 pt-12 pb-20 px-6 rounded-b-[40px] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.fullName || 'Not Logged In'}</h2>
          <p className="text-emerald-100 text-xs">{user?.phone || 'Complete profile'}</p>
        </div>
      </div>
    </div>

    <div className="px-4 -mt-10 relative z-20">
      <div className="bg-white rounded-3xl p-2 shadow-xl shadow-slate-200/50 border border-slate-50">
        <div className="grid grid-cols-4 py-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold">0</span>
            <span className="text-[10px] text-slate-400">Coupons</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-50">
            <span className="text-lg font-bold">0</span>
            <span className="text-[10px] text-slate-400">Points</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-slate-50">
            <span className="text-lg font-bold">720</span>
            <span className="text-[10px] text-slate-400">Credit Score</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold">0</span>
            <span className="text-[10px] text-slate-400">Messages</span>
          </div>
        </div>
      </div>
    </div>

    <div className="px-4 space-y-3">
      {[
        { icon: ShieldCheck, title: 'Security Center', extra: 'Protected' },
        { icon: Landmark, title: 'Payment Account', extra: user?.bankAccount ? `${user.bankAccount.slice(0, 4)}...${user.bankAccount.slice(-4)}` : 'Not Linked' },
        { icon: Settings, title: 'Settings', extra: '' },
      ].map((item, i) => (
        <button key={i} className="w-full bg-white p-4 rounded-2xl flex justify-between items-center border border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
              <item.icon size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">{item.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">{item.extra}</span>
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </button>
      ))}
    </div>
  </div>
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
