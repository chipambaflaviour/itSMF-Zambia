import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, Menu, X, Users, BookOpen, ArrowRight, Award, CalendarCheck, CheckCircle2, 
  Globe, Share2, Briefcase, GraduationCap, 
  UserCircle, Mail, BarChart3, Building, MapPin, 
  Calendar, Mic, PlayCircle, MessageSquare, ChevronDown
} from 'lucide-react';

// --- Types ---
type SectionId = 'home' | 'about' | 'membership' | 'events' | 'services' | 'resources' | 'partners' | 'portal' | 'benchmarking' | 'dashboard';

// --- Global Styles ---
const navItemClass = "text-slate-600 font-medium hover:text-secondary-teal transition-all duration-200 cursor-pointer text-sm whitespace-nowrap";
const activeNavItemClass = "text-primary-navy border-b-2 border-secondary-teal pb-1 font-bold text-sm whitespace-nowrap";

const submitForm = async (endpoint: string, data: any, successMessage: string, onSuccess: () => void) => {
  try {
    const res = await fetch(`http://localhost:5145/api/forms/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert(successMessage);
      onSuccess();
    } else {
      const err = await res.json();
      alert(`Error: ${err?.message || 'Something went wrong. Please try again.'}`);
    }
  } catch (error) {
    console.warn('Backend not reachable, simulating success for demonstration.');
    alert(`[Simulation] ${successMessage}`);
    onSuccess();
  }
};

// --- Components ---

const Navbar = ({ current, setPage }: { current: SectionId, setPage: (s: SectionId) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'membership', label: 'Membership' },
    { id: 'events', label: 'Events' },
    { id: 'services', label: 'Services' },
    { id: 'resources', label: 'Resources' },
    { id: 'partners', label: 'Partners' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
          <Landmark className="text-primary-navy w-7 h-7" />
          <span className="text-lg font-black text-primary-navy tracking-tighter uppercase whitespace-nowrap">itSMF Zambia</span>
        </div>
        
        <nav className="hidden xl:flex items-center gap-6">
          {menuItems.map((item) => (
            <span 
              key={item.id}
              onClick={() => setPage(item.id)}
              className={current === item.id || (item.id === 'services' && current === 'benchmarking') ? activeNavItemClass : navItemClass}
            >
              {item.label}
            </span>
          ))}
          <button 
            onClick={() => setPage('portal')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-navy text-white text-sm font-bold rounded-full hover:bg-primary-navy-dark active:scale-95 transition-all shadow-sm"
          >
            <UserCircle className="w-4 h-4" />
            Portal
          </button>
        </nav>

        <button 
          className="xl:hidden text-primary-navy p-2 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden bg-white border-t border-slate-100 shadow-2xl absolute w-full top-full left-0 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {menuItems.map((item) => (
                <span 
                  key={item.id}
                  onClick={() => { setPage(item.id); setIsOpen(false); }}
                  className={`text-lg font-bold ${current === item.id ? 'text-secondary-teal' : 'text-slate-600'}`}
                >
                  {item.label}
                </span>
              ))}
              <hr className="border-slate-100" />
              <button 
                onClick={() => { setPage('portal'); setIsOpen(false); }}
                className="w-full flex justify-center items-center gap-2 px-6 py-3.5 bg-primary-navy text-white font-bold rounded-xl"
              >
                <UserCircle className="w-5 h-5" />
                Member Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Page Utilities ---
const SectionHeader = ({ title, subtitle, badge }: { title: string, subtitle?: string, badge?: string }) => (
  <div className="mb-12">
    {badge && <span className="text-secondary-teal font-bold tracking-widest uppercase mb-4 block text-xs">{badge}</span>}
    <h2 className="text-3xl md:text-5xl font-bold text-primary-navy mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Home = ({ setPage }: { setPage: (s: SectionId) => void }) => (
  <>
    <section className="relative overflow-hidden bg-primary-navy py-20 lg:py-40 px-6 md:px-12">
      <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            Zambia's Premier ITSM Authority
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
            Elevate Your <span className="text-teal-400">IT Service</span> Management
          </h1>
          <p className="text-xl text-slate-300 md:text-2xl mb-10 max-w-xl leading-relaxed font-medium">
            Join a community of 500+ leaders shaping the future of IT infrastructure and governance in Zambia.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => setPage('membership')}
              className="bg-secondary-teal px-10 py-5 text-white font-black rounded-2xl hover:brightness-110 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg"
            >
              Start Your Journey
            </button>
            <button 
              onClick={() => setPage('about')}
              className="px-10 py-5 text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/20 text-lg"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="hidden lg:block relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10">
            <img className="rounded-2xl shadow-xl aspect-square object-cover" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team meeting" />
            <img className="rounded-2xl shadow-xl aspect-square object-cover mt-8" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" alt="Professionals" />
            <img className="rounded-2xl shadow-xl aspect-square object-cover -mt-8" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" alt="Office discussion" />
            <img className="rounded-2xl shadow-xl aspect-square object-cover" src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Corporate" />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-secondary-teal p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,106,106,0.3)] max-w-[240px]">
            <p className="text-white font-black text-5xl mb-1 tracking-tighter">500+</p>
            <p className="text-white/90 text-sm font-bold uppercase tracking-widest">Industry Leaders</p>
          </div>
        </motion.div>
      </div>
    </section>

    <FeatureSection setPage={setPage} />
    
    {/* Featured Services (Added for Complete Structure) */}
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-100">
      <SectionHeader 
        badge="What We Do"
        title="Featured Services"
        subtitle="Elevate your organization's IT capabilities with our specialized service offerings."
      />
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <GraduationCap className="text-primary-navy w-10 h-10 mb-6" />
          <h3 className="text-xl font-bold text-primary-navy mb-3">Certification Pathways</h3>
          <p className="text-slate-500 font-medium mb-6">Achieve global recognition with ITIL4 and COBIT certification training.</p>
          <button onClick={() => setPage('services')} className="text-secondary-teal font-bold flex items-center gap-2">Learn More <ArrowRight size={16} /></button>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} className="bg-primary-navy p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <BarChart3 className="w-40 h-40" />
          </div>
          <BarChart3 className="text-teal-400 w-10 h-10 mb-6 relative z-10" />
          <h3 className="text-xl font-bold mb-3 relative z-10">ITIL Benchmarking</h3>
          <p className="text-slate-300 font-medium mb-6 relative z-10">Evaluate your ITSM maturity against international standards and identify critical growth areas.</p>
          <button onClick={() => setPage('benchmarking')} className="bg-secondary-teal px-6 py-2 rounded-xl text-white font-bold flex items-center gap-2 relative z-10 hover:brightness-110 transition-all">Start Benchmarking</button>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <Users className="text-primary-navy w-10 h-10 mb-6" />
          <h3 className="text-xl font-bold text-primary-navy mb-3">Mentorship Programme</h3>
          <p className="text-slate-500 font-medium mb-6">Connect with industry veterans to accelerate your career growth.</p>
          <button onClick={() => setPage('services')} className="text-secondary-teal font-bold flex items-center gap-2">Learn More <ArrowRight size={16} /></button>
        </motion.div>
      </div>
    </section>

    {/* Latest News (Added for Complete Structure) */}
    <section className="py-24 px-6 md:px-12 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <SectionHeader 
            badge="Stay Updated"
            title="Latest News & Insights"
          />
          <button onClick={() => setPage('resources')} className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-primary-navy text-primary-navy rounded-full font-bold hover:bg-primary-navy hover:text-white transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm group cursor-pointer" onClick={() => setPage('resources')}>
            <span className="px-3 py-1 bg-teal-50 text-secondary-teal rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Press Release</span>
            <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-secondary-teal transition-colors">itSMF Zambia Announces New Board of Directors</h3>
            <p className="text-slate-500 font-medium mb-6">Read about the newly elected leadership team steering the future of ITSM in the region.</p>
            <span className="text-primary-navy font-bold flex items-center gap-2">Read Full Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></span>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm group cursor-pointer" onClick={() => setPage('resources')}>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Article</span>
            <h3 className="text-2xl font-bold text-primary-navy mb-4 group-hover:text-secondary-teal transition-colors">5 Trends Shaping African ITSM in 2026</h3>
            <p className="text-slate-500 font-medium mb-6">Discover the technologies and methodologies driving digital transformation across the continent.</p>
            <span className="text-primary-navy font-bold flex items-center gap-2">Read Article <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></span>
          </div>
        </div>
      </div>
    </section>
  </>
);

const FeatureSection = ({ setPage }: { setPage: (s: SectionId) => void }) => {
  const highlights = [
    { title: "Monthly Webinars", icon: <CalendarCheck />, path: 'events' },
    { title: "Whitepapers", icon: <BookOpen />, path: 'resources' },
    { title: "Consultancy", icon: <Briefcase />, path: 'services' },
    { title: "ITIL Training", icon: <GraduationCap />, path: 'services' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader 
        title="Why itSMF Zambia matters?" 
        subtitle="We provide the bridge between global service management standards and the unique challenges of the Zambian IT landscape."
        badge="Excellence in Action"
      />
      <div className="grid md:grid-cols-4 gap-6">
        {highlights.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            onClick={() => setPage(item.path as SectionId)}
            className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-secondary-teal transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-secondary-teal mb-6 group-hover:bg-secondary-teal group-hover:text-white transition-colors">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
            </div>
            <h4 className="text-xl font-bold text-primary-navy mb-2">{item.title}</h4>
            <p className="text-slate-500 text-sm font-medium mb-4">Driving innovation through structured methodologies.</p>
            <div className="flex items-center gap-2 text-secondary-teal font-bold text-sm">
              Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => (
  <>
    <section className="bg-primary-navy py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="mb-12">
            <span className="text-teal-400 font-bold tracking-widest uppercase mb-4 block text-xs">Our Identity</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Fostering IT Maturity Across Zambia</h2>
            <p className="text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">Founded by passionate ITSM practitioners, itSMF Zambia emerged from the need to localize global standards. We are dedicated to advancing service management practices across Zambia.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-4xl font-black text-teal-400 mb-2 tracking-tighter">Vision</h4>
              <p className="text-slate-300 font-medium leading-relaxed">To be the catalyst for digital transformation and service excellence in Zambia.</p>
            </div>
            <div>
              <h4 className="text-4xl font-black text-teal-400 mb-2 tracking-tighter">Mission</h4>
              <p className="text-slate-300 font-medium leading-relaxed">Providing world-class ITSM resources and a professional network for growth.</p>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <img className="rounded-[3rem] shadow-2xl object-cover w-full h-[600px] border border-white/10" src="/about_team.png" alt="itSMF Zambia Team" />
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </section>

    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="bg-slate-50 rounded-[4rem] p-16 border border-slate-100">
      <h3 className="text-3xl font-bold text-primary-navy mb-12 text-center">Our Governance & Leadership</h3>
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { name: "Executive Board", desc: "Strategic planning and policy making.", icon: <Users /> },
          { name: "Advisory Committee", desc: "Expert guidance on industry trends.", icon: <Globe /> },
          { name: "itSMF International", desc: "Global alignment with standards.", icon: <Landmark /> },
          { name: "Secretariat", desc: "Operational and member support.", icon: <Mail /> },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm text-center">
            <div className="w-12 h-12 bg-primary-navy text-white rounded-xl flex items-center justify-center mx-auto mb-6">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <h5 className="font-bold text-primary-navy mb-2">{item.name}</h5>
            <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-slate-500 font-medium mb-6">itSMF Zambia is governed by an elected board. Elections are held every two years during our Annual General Meeting (AGM).</p>
        <a 
          href="/docs/itSMF_Zambia_Constitution_Draft.pdf" 
          download 
          onClick={(e) => { e.preventDefault(); alert('The Constitution PDF file will download here when the final document is uploaded to the server.'); }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 text-primary-navy font-bold rounded-full hover:shadow-md hover:border-secondary-teal hover:text-secondary-teal transition-all"
        >
          <BookOpen size={18} /> Download Constitution
        </a>
      </div>
    </div>
  </section>
  </>
);

const MembershipSection = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>('individual');
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleApply = (plan: string) => {
    setSelectedPlan(plan);
    setShowForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };
  
  return (
    <>
      <section className="bg-primary-navy py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div>
            <span className="text-teal-400 font-bold tracking-widest uppercase mb-4 block text-xs">Join the Network</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Invest in Your Professional Future</h2>
            <p className="text-lg text-slate-300 max-w-2xl font-medium leading-relaxed mx-auto">Joining our community connects you with top-tier ITSM professionals, grants access to global standard resources, and provides exclusive opportunities for career advancement.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        {!showForm ? (
          <>
            <div className="text-center mb-16">
              <div className="inline-flex flex-col sm:flex-row p-1.5 bg-slate-100 rounded-2xl w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('individual')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'individual' ? 'bg-white shadow-md text-primary-navy' : 'text-slate-500 hover:text-primary-navy'}`}
                >
                  Individual Plans
                </button>
                <button 
                  onClick={() => setActiveTab('corporate')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'corporate' ? 'bg-white shadow-md text-primary-navy' : 'text-slate-500 hover:text-primary-navy'}`}
                >
                  Corporate Solutions
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-24">
            {activeTab === 'individual' ? (
              <>
                <PricingCard title="Student" price="500" features={["Access to digital library", "Webinar Archive", "Mentorship"]} onApply={() => handleApply('Student Plan')} />
                <PricingCard title="Individual" price="1,850" features={["Full Voting Rights", "Certification Discounts", "Whitepapers", "Professional Post-nominals"]} highlight onApply={() => handleApply('Individual Plan')} />
                <PricingCard title="Associate" price="1,200" features={["Networking Events", "Newsletter", "Limited Resources"]} onApply={() => handleApply('Associate Plan')} />
              </>
            ) : (
              <>
                <PricingCard title="Standard Corporate" price="8,500" features={["5 Memberships", "Website Logo", "Dedicated Manager"]} onApply={() => handleApply('Standard Corporate Plan')} />
                <PricingCard title="Gold Corporate" price="15,000" features={["15 Memberships", "Event Sponsorship", "Annual Conference Tickets"]} highlight onApply={() => handleApply('Gold Corporate Plan')} />
                <PricingCard title="NGO/Gov" price="6,000" features={["Partnership Program", "Custom Workshops"]} onApply={() => handleApply('NGO/Gov Corporate Plan')} />
              </>
            )}
            </div>

            <div className="bg-primary-navy text-white rounded-[4rem] p-16">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Frequently Asked Questions</h3>
                  <p className="text-slate-300 font-medium mb-8">Got questions about joining? We've got answers.</p>
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                      <h4 className="font-bold text-teal-400 mb-2">How long is the membership valid?</h4>
                      <p className="text-slate-300 text-sm">All memberships are valid for one calendar year from the date of registration.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                      <h4 className="font-bold text-teal-400 mb-2">Can I upgrade my student membership later?</h4>
                      <p className="text-slate-300 text-sm">Yes, once you graduate and enter the workforce, you can seamlessly upgrade to an Individual Membership.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center flex flex-col justify-center">
                  <Briefcase className="w-12 h-12 text-teal-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Corporate Enquiry</h3>
                  <p className="text-slate-300 font-medium mb-8">Looking to enroll your entire IT team? Contact us for specialized corporate packages and benefits.</p>
                  <button onClick={() => handleApply('Corporate Custom Package')} className="bg-secondary-teal text-white px-8 py-4 rounded-2xl font-bold hover:brightness-110 transition-all">Contact Corporate Team</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,14,36,0.1)] max-w-3xl mx-auto">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-black text-primary-navy mb-2">Membership Application</h3>
                <p className="text-slate-500 font-medium">Applying for: <span className="text-secondary-teal font-bold">{selectedPlan}</span></p>
              </div>
              <button onClick={() => setShowForm(false)} className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              submitForm('membership', { ...Object.fromEntries(formData), selectedPlan }, 'Application submitted successfully! Our team will contact you shortly to complete the onboarding process.', () => setShowForm(false));
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input name="firstName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input name="lastName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input name="email" required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Organization / University</label>
                <input name="organization" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Where do you work/study?" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Additional Information</label>
                <textarea name="additionalInfo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all min-h-[120px] resize-none" placeholder="Any specific questions or details?"></textarea>
              </div>
              <button type="submit" className="w-full bg-secondary-teal py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm hover:brightness-110 shadow-xl active:scale-95 transition-all mt-4">
                Submit Application
              </button>
            </form>
          </motion.div>
        )}
      </section>
    </>
  );
};

const PricingCard = ({ title, price, features, highlight = false, onApply }: { title: string, price: string, features: string[], highlight?: boolean, onApply?: () => void }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-10 rounded-[3rem] border transition-all ${highlight ? 'bg-primary-navy text-white shadow-2xl scale-105 border-transparent z-10 relative' : 'bg-white border-slate-100 shadow-sm text-primary-navy'}`}
  >
    <h3 className="text-2xl font-black mb-1 tracking-tight">{title}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black">ZMK {price}</span>
      <span className={`text-sm font-bold ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>/ year</span>
    </div>
    <ul className="space-y-4 mb-12">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-semibold">
          <CheckCircle2 className={`w-5 h-5 ${highlight ? 'text-teal-400' : 'text-secondary-teal'}`} />
          {f}
        </li>
      ))}
    </ul>
    <button onClick={onApply} className={`w-full py-5 rounded-2xl font-black transition-all shadow-lg active:scale-95 ${highlight ? 'bg-secondary-teal text-white hover:brightness-110' : 'bg-slate-50 text-primary-navy hover:bg-slate-200'}`}>
      Join / Apply Online
    </button>
  </motion.div>
);

const BenchmarkingLanding = () => (
  <section className="min-h-screen">
    {/* Hero */}
    <div className="bg-primary-navy py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary-teal/5 skew-x-[-20deg] origin-top translate-x-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-400/20 text-teal-300 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <BarChart3 size={14} /> Specialize & Measure
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 max-w-4xl tracking-tighter leading-none">
          ITIL Performance <span className="text-teal-400">Benchmarking</span> Model
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl font-medium mb-12 leading-relaxed">
          The first data-driven standard for measuring IT service maturity in Zambia. Move from guesswork to empirical governance.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => document.getElementById('register-org')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-primary-navy px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all active:scale-95">
            Register Your Org
          </button>
          <a href="/docs/itSMF_Benchmarking_Guide.pdf" download onClick={(e) => { e.preventDefault(); alert('The Benchmarking Guide PDF will download here once the final document is published.'); }} className="inline-flex items-center gap-2 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
            <BookOpen size={20} /> Download Guide
          </a>
        </div>
      </div>
    </div>

    {/* Content Grid */}
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-20">
          <div id="what-it-is">
            <h3 className="text-3xl font-black text-primary-navy mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-teal-100 text-secondary-teal rounded-xl flex items-center justify-center">1</span>
              What It Is?
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
              Our model provides a structured framework to evaluate your IT processes against localized and global benchmarks. We cover five key dimensions: Service Delivery, Infrastructure Readiness, Security Maturity, Governance, and Human Capital.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {['Service Excellence', 'Operational Stability', 'Risk Management', 'Financial Transparency'].map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-primary-navy">
                  <CheckCircle2 className="text-secondary-teal" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div id="how-it-works">
            <h3 className="text-3xl font-black text-primary-navy mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-teal-100 text-secondary-teal rounded-xl flex items-center justify-center">2</span>
              Implementation Phases
            </h3>
            <div className="space-y-6">
              {[
                { t: "Discovery & Baseline", d: "Initial audit of current processes and toolsets." },
                { t: "Peer Comparison", d: "Anonymized comparison against industry competitors in Zambia." },
                { t: "Gap Analysis", d: "Identification of high-impact improvement areas." },
                { t: "Continuous Tracking", d: "Quarterly re-evaluation to track maturity growth." },
              ].map((s, i) => (
                <div key={i} className="flex gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center font-black text-primary-navy">
                    0{i+1}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">{s.t}</h5>
                    <p className="text-slate-500 font-medium">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div id="benefits">
            <h3 className="text-3xl font-black text-primary-navy mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-teal-100 text-secondary-teal rounded-xl flex items-center justify-center">3</span>
              Who Should Participate?
            </h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
              The ITIL Performance Benchmarking Model is ideal for CIOs and IT Directors seeking to validate their IT strategy, IT Service Managers looking for actionable insights, and Quality Assurance Leads ensuring compliance. Zambian Enterprises across banking, telecom, and government sectors benefit significantly.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div id="register-org" className="bg-primary-navy text-white p-10 rounded-[3rem] sticky top-32 scroll-mt-32">
            <h4 className="text-2xl font-black mb-4">Sign Up / Register</h4>
            <p className="text-slate-400 mb-8 font-medium">Ready to evaluate your IT Service Management maturity? Fill out the form below to initiate the process.</p>
            <form className="space-y-4" onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              submitForm('benchmarking', Object.fromEntries(formData), 'Your organization has been successfully registered for the Benchmarking program! Our team will reach out to you with the initial assessment tools.', () => e.currentTarget.reset());
            }}>
              <input name="organizationName" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400 transition-colors" placeholder="Organization Name" />
              <input name="contactPerson" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400 transition-colors" placeholder="Contact Person" />
              <input name="workEmail" required type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400 transition-colors" placeholder="Work Email" />
              <button type="submit" className="w-full bg-secondary-teal py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 shadow-2xl active:scale-95 transition-all">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ResourcesSection = () => {
  const [filter, setFilter] = useState('All');
  
  const allResources = [
    { t: 'Digital Resilience in Zambia 2024', type: 'Whitepaper', img: 101 },
    { t: 'Modernizing ZRA Service Delivery', type: 'Case Study', img: 102 },
    { t: '5 Reasons to get ITIL Certified', type: 'Article', img: 103 },
    { t: 'Mastering COBIT 2019', type: 'Guide', img: 104 },
    { t: 'Agile vs ITIL: Blending Frameworks', type: 'Thought Leadership', img: 105 },
    { t: 'Annual Conference 2023 Keynote', type: 'Video', img: 106 },
    { t: 'ITSM Glossary for Beginners', type: 'Reference', img: 107 },
    { t: 'Cloud Security Governance', type: 'Whitepaper', img: 108 },
  ];

  const filtered = filter === 'All' ? allResources : allResources.filter(r => r.type === filter);

  return (
    <>
      <section className="bg-primary-navy py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div>
            <span className="text-teal-400 font-bold tracking-widest uppercase mb-4 block text-xs">Knowledge Hub</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The Library of IT Excellence</h2>
            <p className="text-lg text-slate-300 max-w-2xl font-medium leading-relaxed mx-auto">From technical whitepapers to strategic leadership case studies, access the full repository of itSMF global knowledge.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', 'Whitepaper', 'Case Study', 'Video', 'Guide'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-bold rounded-full text-sm transition-colors ${filter === cat ? 'bg-primary-navy text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat === 'All' ? 'All Resources' : cat === 'Whitepaper' ? 'Whitepapers' : cat === 'Case Study' ? 'Case Studies' : cat === 'Video' ? 'Video Library' : 'Certification Guides'}
            </button>
          ))}
        </div>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.a 
                href="https://www.itsmf.org/knowledge-hub/"
                target="_blank"
                rel="noreferrer"
                key={item.t} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }} 
                className="group cursor-pointer block"
              >
                <div className="aspect-[4/3] bg-slate-100 rounded-3xl mb-6 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={`https://picsum.photos/seed/${item.img}/800/600`} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{item.type}</div>
                  {item.type === 'Video' && <div className="absolute inset-0 flex items-center justify-center text-white/80"><PlayCircle size={48} /></div>}
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-secondary-teal transition-colors">{item.t}</h4>
                <p className="text-slate-500 text-sm font-medium mb-4 line-clamp-2">A deep dive into infrastructure stability and IT practices across major sectors.</p>
                <div className="flex items-center gap-2 text-primary-navy font-bold text-xs uppercase tracking-widest group-hover:text-secondary-teal transition-colors">
                  {item.type === 'Video' ? 'Watch Video' : 'Read Now'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
};

const EventsSection = () => {
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [activeForm, setActiveForm] = useState<{ type: string; title: string } | null>(null);

  const upcomingEvents = [
    { t: "ITIL Framework Masterclass", d: "May 20, 2026", l: "Online / Virtual", ty: "Masterclass" },
    { t: "Cybersecurity & ITSM", d: "July 10, 2026", l: "Radisson Blu, Lusaka", ty: "Workshop" },
    { t: "Cloud Native Service Delivery", d: "August 15, 2026", l: "Taj Pamodzi, Lusaka", ty: "Seminar" },
    { t: "Agile Service Management", d: "September 05, 2026", l: "Online / Virtual", ty: "Webinar" },
    { t: "AI in ITSM Leadership", d: "November 12, 2026", l: "Ciela Resort, Lusaka", ty: "Executive Briefing" }
  ];

  const pastEvents = [
    { t: "2025 AGM & Symposium", d: "Dec 2025" },
    { t: "ITIL Foundation Bootcamp", d: "Sep 2025" },
    { t: "Women in IT Leadership", d: "Jul 2025" },
    { t: "Digital Transformation Summit", d: "Apr 2025" },
    { t: "Service Desk Masterclass", d: "Jan 2025" }
  ];

  const displayedUpcoming = showAllUpcoming ? upcomingEvents : upcomingEvents.slice(0, 2);

  if (activeForm) {
    return (
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,14,36,0.1)]">
          <div className="flex justify-between items-start mb-10">
            <div>
              <span className="px-3 py-1 bg-teal-50 text-secondary-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">{activeForm.type}</span>
              <h3 className="text-3xl font-black text-primary-navy mb-2">{activeForm.title}</h3>
              <p className="text-slate-500 font-medium">Please provide your details below to proceed.</p>
            </div>
            <button onClick={() => setActiveForm(null)} className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0">
              <X size={24} />
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { 
            e.preventDefault(); 
            const formData = new FormData(e.currentTarget);
            const endpoint = activeForm.type === 'Speaker Proposal' ? 'speaker-proposal' : 'event-registration';
            submitForm(endpoint, { ...Object.fromEntries(formData), eventTitle: activeForm.title }, 'Success! You will receive an email confirmation shortly.', () => setActiveForm(null));
          }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input name="firstName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input name="lastName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input name="email" required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
            </div>
            {activeForm.type === 'Speaker Proposal' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Presentation Topic</label>
                <input name="presentationTopic" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{activeForm.type === 'Speaker Proposal' ? 'Abstract / Details' : 'Additional Requirements (Dietary, Accessibility, etc)'}</label>
              <textarea name={activeForm.type === 'Speaker Proposal' ? 'abstract' : 'additionalRequirements'} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all min-h-[120px] resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-secondary-teal py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm hover:brightness-110 shadow-xl active:scale-95 transition-all mt-4">
              Submit
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <SectionHeader 
        badge="Gather & Grow"
        title="Events & Conferences"
        subtitle="Join our interactive sessions, masterclasses, and the grand annual conference."
      />
      
      {/* Annual Conference Spotlight */}
      <div className="bg-primary-navy rounded-[4rem] p-12 md:p-16 mb-24 relative overflow-hidden text-white flex flex-col md:flex-row gap-12 items-center">
        <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
        <div className="relative z-10 flex-1">
          <span className="px-4 py-1.5 bg-teal-400/20 text-teal-400 font-bold text-sm uppercase tracking-widest rounded-full inline-block mb-6">Flagship Event</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Annual Zambia ITSM Conference 2026</h2>
          <p className="text-slate-300 font-medium text-lg mb-8 max-w-xl">The premier gathering of ITSM professionals across the region. Network with 500+ leaders and learn from global experts.</p>
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center gap-3"><Calendar className="text-teal-400 w-6 h-6" /> <span className="font-bold">October 15, 2026</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-teal-400 w-6 h-6" /> <span className="font-bold">Lusaka ICC</span></div>
          </div>
          <button onClick={() => { setActiveForm({ type: 'Ticket Purchase', title: 'Annual Zambia ITSM Conference 2026' }); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="bg-secondary-teal px-8 py-4 rounded-2xl font-black text-white hover:brightness-110 shadow-xl transition-all">Secure Your Ticket</button>
        </div>
        <div className="relative z-10 w-full md:w-1/3">
          <div className="aspect-[4/5] bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 p-6 flex flex-col justify-end">
             <Mic className="w-16 h-16 text-white/50 mb-auto mx-auto" />
             <div className="bg-white/10 p-4 rounded-xl">
               <h4 className="font-bold text-lg mb-1">Call for Speakers</h4>
               <p className="text-sm text-slate-300 mb-4">Have an insight to share? Submit your abstract.</p>
               <button onClick={() => { setActiveForm({ type: 'Speaker Proposal', title: 'Annual Zambia ITSM Conference 2026' }); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="w-full bg-white text-primary-navy font-bold py-2 rounded-lg text-sm hover:bg-slate-100 transition-colors">Submit Proposal</button>
             </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-24">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-3xl font-bold text-primary-navy">Upcoming Events</h3>
          {!showAllUpcoming && upcomingEvents.length > 2 && (
            <button onClick={() => setShowAllUpcoming(true)} className="hidden md:flex items-center gap-2 px-6 py-2 border-2 border-primary-navy text-primary-navy rounded-full font-bold hover:bg-primary-navy hover:text-white transition-all text-sm">
              View All {upcomingEvents.length} Events <ArrowRight size={14} />
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {displayedUpcoming.map((ev, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
              <div className="bg-slate-50 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-primary-navy border border-slate-100 flex-shrink-0">
                <span className="text-sm font-bold text-secondary-teal uppercase">{ev.d.split(' ')[0]}</span>
                <span className="text-3xl font-black">{ev.d.split(' ')[1].replace(',', '')}</span>
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ev.ty}</span>
                <h4 className="text-xl font-bold text-primary-navy mt-1 mb-2">{ev.t}</h4>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-2 mb-4"><MapPin size={14} /> {ev.l}</p>
                <button onClick={() => { setActiveForm({ type: 'Event Registration', title: ev.t }); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="text-secondary-teal font-bold text-sm hover:underline">Register Now</button>
              </div>
            </div>
          ))}
        </div>
        
        {!showAllUpcoming && upcomingEvents.length > 2 && (
          <div className="mt-8 text-center md:hidden">
            <button onClick={() => setShowAllUpcoming(true)} className="px-6 py-3 border-2 border-primary-navy text-primary-navy rounded-full font-bold hover:bg-primary-navy hover:text-white transition-all text-sm w-full">
              View All {upcomingEvents.length} Events
            </button>
          </div>
        )}
      </div>

      {/* Past Events & Sponsorship Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-50 p-10 rounded-[3rem]">
          <h3 className="text-2xl font-bold text-primary-navy mb-6">Past Events Archive</h3>
          <p className="text-slate-500 font-medium mb-8">Catch up on our previous workshops and webinars.</p>
          <div className="space-y-4">
            {pastEvents.map((ev, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-2xl shadow-sm gap-4">
                <div>
                  <h5 className="font-bold text-primary-navy">{ev.t}</h5>
                  <p className="text-xs text-slate-400 font-medium mt-1">{ev.d}</p>
                </div>
                <button onClick={() => alert(`Loading archive information and recordings for ${ev.t}...`)} className="text-secondary-teal font-bold text-sm bg-teal-50 px-5 py-2.5 rounded-xl hover:bg-teal-100 transition-colors shrink-0">View Info</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-primary-navy text-white p-10 rounded-[3rem]">
          <Award className="w-12 h-12 text-teal-400 mb-6" />
          <h3 className="text-2xl font-bold mb-4">Sponsor an Event</h3>
          <p className="text-slate-300 font-medium mb-8">Partner with us for the Annual Conference and maximize your brand exposure across Zambia's IT sector.</p>
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm"><CheckCircle2 className="text-teal-400 w-5 h-5"/> Gold & Silver Packages</div>
            <div className="flex items-center gap-3 text-sm"><CheckCircle2 className="text-teal-400 w-5 h-5"/> Premium Booth Locations</div>
            <div className="flex items-center gap-3 text-sm"><CheckCircle2 className="text-teal-400 w-5 h-5"/> Keynote Presentation Slots</div>
          </div>
          <a 
            href="/docs/itSMF_Sponsorship_Deck.pdf" 
            download
            onClick={(e) => { e.preventDefault(); alert('The Sponsorship Deck PDF will download here once available.'); }}
            className="block text-center bg-secondary-teal text-white w-full py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg"
          >
            Download Sponsorship Deck
          </a>
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => {
  const atos = [
    { name: 'TechLearn Solutions', domain: 'techlearn.com' },
    { name: 'AfriTech Institute', domain: 'afritech.edu' },
    { name: 'Global Knowledge ZM', domain: 'globalknowledge.com' },
    { name: 'ITSM Academy Lusaka', domain: 'itsmacademy.com' }
  ];
  const corporates = [
    { name: 'Zanaco', domain: 'zanaco.co.zm' },
    { name: 'Liquid Intelligent', domain: 'liquid.tech' },
    { name: 'MTN Zambia', domain: 'mtn.zm' },
    { name: 'Copperbelt Energy', domain: 'cecinvestor.com' }
  ];
  const ngos = [
    { name: 'Ministry of Technology', domain: 'mots.gov.zm' },
    { name: 'ZICTA', domain: 'zicta.zm' },
    { name: 'Smart Zambia Institute', domain: 'szi.gov.zm' },
    { name: 'UNZA ICT', domain: 'unza.zm' }
  ];

  return (
    <>
      <section className="bg-primary-navy py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div>
            <span className="text-teal-400 font-bold tracking-widest uppercase mb-4 block text-xs">Our Network</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Partner Ecosystem</h2>
            <p className="text-lg text-slate-300 max-w-2xl font-medium leading-relaxed mx-auto">Collaborating with leading organizations, training providers, and government agencies to advance ITSM in Zambia.</p>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-primary-navy mb-8 border-b border-slate-100 pb-4">Accredited Training Organizations (ATOs)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {atos.map((p, i) => (
              <div key={i} className="aspect-video bg-white border border-slate-100 rounded-3xl flex items-center justify-center p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer grayscale hover:grayscale-0">
                <img src={`https://placehold.co/400x200/ffffff/001b3d?text=${encodeURIComponent(p.name)}&font=Montserrat`} alt={p.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-2xl font-bold text-primary-navy mb-8 border-b border-slate-100 pb-4">Corporate Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {corporates.map((p, i) => (
              <div key={i} className="aspect-video bg-white border border-slate-100 rounded-3xl flex items-center justify-center p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer grayscale hover:grayscale-0">
                <img src={`https://placehold.co/400x200/ffffff/006a6a?text=${encodeURIComponent(p.name)}&font=Montserrat`} alt={p.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-2xl font-bold text-primary-navy mb-8 border-b border-slate-100 pb-4">Government & NGOs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ngos.map((p, i) => (
              <div key={i} className="aspect-video bg-white border border-slate-100 rounded-3xl flex items-center justify-center p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer grayscale hover:grayscale-0">
                <img src={`https://placehold.co/400x200/ffffff/001b3d?text=${encodeURIComponent(p.name)}&font=Montserrat`} alt={p.name} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

    <div className="bg-primary-navy rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-zambia-pattern opacity-10"></div>
      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Building className="w-16 h-16 text-teal-400 mb-6" />
          <h2 className="text-4xl font-black mb-6">Become a Partner</h2>
          <p className="text-slate-300 font-medium text-lg mb-8">Expand your brand's reach within the local IT community. We offer various partnership tiers tailored to your strategic goals.</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-teal-400 w-6 h-6"/> Access to 500+ IT Professionals</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-teal-400 w-6 h-6"/> Co-branding Opportunities</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-teal-400 w-6 h-6"/> Speaking Slots at Annual Events</li>
          </ul>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem]">
          <h3 className="text-2xl font-bold mb-6">Partnership Application</h3>
          <form className="space-y-4" onSubmit={(e) => { 
            e.preventDefault(); 
            const formData = new FormData(e.currentTarget);
            submitForm('partnership', Object.fromEntries(formData), 'Partnership Application submitted successfully! Our partner relations team will be in touch with you shortly.', () => e.currentTarget.reset());
          }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="firstName" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400" placeholder="First Name" />
              <input name="lastName" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400" placeholder="Last Name" />
            </div>
            <input name="organizationName" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400" placeholder="Organization Name" />
            <input name="workEmail" required type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400" placeholder="Work Email" />
            <div className="relative">
              <select name="partnershipTier" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-teal-400 appearance-none cursor-pointer">
                <option value="" className="text-slate-800">Select Partnership Tier...</option>
                <option value="ato" className="text-slate-800">Accredited Training Organization (ATO)</option>
                <option value="corporate" className="text-slate-800">Corporate Sponsor</option>
                <option value="ngo" className="text-slate-800">Government / NGO Partner</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
            <textarea name="strategicGoals" required className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-slate-400 font-bold focus:outline-none focus:border-teal-400 min-h-[120px] resize-none" placeholder="Tell us about your strategic goals..."></textarea>
            <button type="submit" className="w-full bg-secondary-teal py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:brightness-110 shadow-2xl active:scale-95 transition-all mt-4">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  </>
  );
};

const PortalSection = ({ setPage }: { setPage: (s: SectionId) => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover" src="/portal_login_bg.png" alt="Tech Abstract Background" />
        <div className="absolute inset-0 bg-primary-navy/70 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-zambia-pattern opacity-20 mix-blend-overlay"></div>
      </div>
      
      <motion.div 
        key={isLogin ? 'login' : 'register'}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-md w-full bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 text-center"
      >
        <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-secondary-teal mx-auto mb-10">
          <UserCircle size={48} />
        </div>
        
        {isLogin ? (
          <>
            <h2 className="text-3xl font-black text-primary-navy mb-4">Member Access</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">Securely access exclusive resources, professional discussion boards, and your certification history.</p>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              submitForm('login', Object.fromEntries(formData), 'Login successful! Redirecting to your dashboard...', () => setPage('dashboard')); 
            }} className="space-y-4 mb-8">
              <input name="email" required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Email Address" />
              <input name="password" required type="password" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Password" />
              <button type="submit" className="w-full bg-primary-navy py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm hover:shadow-2xl transition-all mt-2">
                Sign In
              </button>
            </form>

            <div className="flex flex-col gap-3">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }} className="text-sm font-bold text-secondary-teal">Forgot Password?</a>
              <p className="text-sm font-medium text-slate-400">Not a member? <button onClick={() => setIsLogin(false)} className="text-primary-navy font-black hover:underline">Register Now</button></p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-black text-primary-navy mb-4">Create Account</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">Join the network to access premium ITSM resources and member benefits.</p>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              submitForm('register', Object.fromEntries(formData), 'Registration successful! Please check your email to verify your account.', () => setIsLogin(true)); 
            }} className="space-y-4 mb-8">
              <input name="fullName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Full Name" />
              <input name="email" required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Email Address" />
              <input name="password" required type="password" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-primary-navy focus:outline-none focus:border-secondary-teal focus:bg-white transition-all" placeholder="Create Password" />
              <button type="submit" className="w-full bg-secondary-teal py-5 rounded-2xl text-white font-black uppercase tracking-widest text-sm hover:shadow-2xl active:scale-95 transition-all mt-2">
                Register
              </button>
            </form>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-slate-400">Already have an account? <button onClick={() => setIsLogin(true)} className="text-primary-navy font-black hover:underline">Sign In</button></p>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

const Footer = ({ setPage }: { setPage: (s: SectionId) => void }) => (
  <footer className="bg-primary-navy text-white pt-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-4 gap-16 pb-20">
      <div className="lg:col-span-1">
        <div className="flex items-center gap-3 mb-8">
          <Landmark className="text-teal-400 w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">itSMF Zambia</span>
        </div>
        <p className="text-slate-400 font-medium leading-relaxed mb-8">
          Fostering professional excellence and driving IT maturity through structured service management.
        </p>
        <div className="flex gap-4">
          {[Globe, MessageSquare, Mail, Share2].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-secondary-teal hover:text-white transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-teal-400 font-black uppercase tracking-widest text-xs mb-8">Explore</h4>
        <nav className="flex flex-col gap-4">
          {['Home', 'About', 'Membership', 'Events', 'Resources', 'Partners'].map((item) => (
            <span 
              key={item} 
              onClick={() => setPage(item.toLowerCase() as SectionId)}
              className="text-slate-300 font-bold hover:text-teal-400 transition-colors cursor-pointer w-fit"
            >
              {item}
            </span>
          ))}
        </nav>
      </div>

      <div>
        <h4 className="text-teal-400 font-black uppercase tracking-widest text-xs mb-8">Special Programs</h4>
        <nav className="flex flex-col gap-4">
          <span onClick={() => setPage('benchmarking')} className="text-slate-300 font-bold hover:text-teal-400 transition-colors cursor-pointer w-fit">Benchmarking Model</span>
          <span onClick={() => setPage('services')} className="text-slate-300 font-bold hover:text-teal-400 transition-colors cursor-pointer w-fit">Mentorship Program</span>
          <span onClick={() => setPage('services')} className="text-slate-300 font-bold hover:text-teal-400 transition-colors cursor-pointer w-fit">Annual Awards</span>
          <span onClick={() => setPage('services')} className="text-slate-300 font-bold hover:text-teal-400 transition-colors cursor-pointer w-fit">Certification Prep</span>
        </nav>
      </div>

      <div>
        <h4 className="text-teal-400 font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
        <p className="text-slate-400 text-sm font-medium mb-6">Stay informed about upcoming events and ITSM news.</p>
        <div className="flex flex-col gap-3">
          <input className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-teal-400 text-white" placeholder="Email Address" />
          <button className="bg-secondary-teal py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all">Subscribe</button>
        </div>
      </div>
    </div>
    
    <div className="border-t border-white/5 py-8 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
      © {new Date().getFullYear()} itSMF Zambia • The IT Authority
    </div>
  </footer>
);

const PortalDashboard = ({ setPage }: { setPage: (s: SectionId) => void }) => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh]">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-3xl font-black text-primary-navy mb-2">Member Dashboard</h2>
        <p className="text-slate-500 font-medium">Welcome back! Here's your overview.</p>
      </div>
      <button onClick={() => setPage('portal')} className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
        Log Out
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Profile Summary */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-teal-50 text-secondary-teal rounded-full flex items-center justify-center mb-6">
          <UserCircle size={64} />
        </div>
        <h3 className="text-xl font-bold text-primary-navy mb-1">Jane Doe</h3>
        <p className="text-slate-500 text-sm font-medium mb-4">Individual Member</p>
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">Active Status</span>
      </div>

      {/* Quick Actions */}
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        <div className="bg-primary-navy text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <Award className="w-10 h-10 text-teal-400 mb-6" />
          <div>
            <h4 className="text-lg font-bold mb-2">My Certifications</h4>
            <p className="text-slate-300 text-sm mb-4">Manage and view your ITIL and COBIT certificates.</p>
            <button className="text-teal-400 font-bold text-sm flex items-center gap-2 hover:underline">View History <ArrowRight size={14}/></button>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <BookOpen className="w-10 h-10 text-primary-navy mb-6" />
          <div>
            <h4 className="text-lg font-bold text-primary-navy mb-2">Premium Resources</h4>
            <p className="text-slate-500 text-sm mb-4">Access member-only whitepapers and benchmarking tools.</p>
            <button onClick={() => setPage('resources')} className="text-secondary-teal font-bold text-sm flex items-center gap-2 hover:underline">Browse Library <ArrowRight size={14}/></button>
          </div>
        </div>
      </div>
    </div>

    {/* Recent Discussions */}
    <div className="mt-12">
      <h3 className="text-xl font-bold text-primary-navy mb-6">Recent Community Discussions</h3>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-4">
          <MessageSquare className="text-slate-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary-navy">Implementing ITIL4 in Zambian Government Sectors</h4>
            <p className="text-sm text-slate-500 mt-1">Started by Michael K. • 12 replies</p>
          </div>
        </div>
        <div className="p-6 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-4">
          <MessageSquare className="text-slate-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary-navy">Best practices for Service Desk automation?</h4>
            <p className="text-sm text-slate-500 mt-1">Started by Sarah M. • 5 replies</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<SectionId>('home');

  // Handle smooth scroll to top on nav
  const handlePageChange = (p: SectionId) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-surface-soft font-sans text-primary-navy selection:bg-teal-100 selection:text-secondary-teal">
      <Navbar current={currentPage} setPage={handlePageChange} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <Home setPage={handlePageChange} />}
            {currentPage === 'about' && <AboutSection />}
            {currentPage === 'membership' && <MembershipSection />}
            {currentPage === 'services' && <BenchmarkingLanding />}
            {currentPage === 'benchmarking' && <BenchmarkingLanding />}
            {currentPage === 'resources' && <ResourcesSection />}
            {currentPage === 'events' && <EventsSection />}
            {currentPage === 'partners' && <PartnersSection />}
            {currentPage === 'portal' && <PortalSection setPage={handlePageChange} />}
            {currentPage === 'dashboard' && <PortalDashboard setPage={handlePageChange} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={handlePageChange} />
    </div>
  );
}
