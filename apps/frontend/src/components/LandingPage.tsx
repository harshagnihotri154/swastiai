import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, ChevronDown, ChevronUp, Star, MessageSquare, Sparkles, DollarSign, Clock, Play, CheckCircle2, Gift, XCircle, Zap, BookOpen, Database, Code, Cloud, Globe, Users, Bot } from 'lucide-react';
import { PublicHeader } from './public/PublicHeader';
import { PublicFooter } from './public/PublicFooter';
import { ServicesPage } from './public/ServicesPage';
import { AboutPage } from './public/AboutPage';
import { PricingPage } from './public/PricingPage';
import { ContactPage } from './public/ContactPage';
import { HowToUseView } from './HowToUseView';
import { ArchitectureDiagramSection } from './public/ArchitectureDiagramSection';

interface LandingPageProps {
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
  isLoggedIn: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onGoToDashboard, isLoggedIn }) => {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact'>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Calculator State
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(5000);

  const faqs = [
    {
      q: "How does Swastiai connect with WhatsApp?",
      a: "Swastiai supports 1-click dual provider switching between Meta WhatsApp Cloud API (Graph API) and Interakt WhatsApp API. Simply paste your token or API key in the dashboard to go live!"
    },
    {
      q: "Can I upload my own business PDFs, rate cards, and FAQs?",
      a: "Yes! In the Knowledge Base studio, drag and drop any PDF, text, CSV, or markdown file. Swastiai automatically indexes your document text so the AI answers customer questions with 100% verified facts."
    },
    {
      q: "What is the response speed of the AI Agent?",
      a: "Powered by Groq Llama 3.3 70B hardware LPU acceleration, Swastiai processes incoming customer inquiries and generates answers in under 120 milliseconds (0.12s)."
    },
    {
      q: "Can I connect custom business APIs (Order tracking, booking)?",
      a: "Absolutely. Swastiai includes a custom Model Context Protocol (MCP) Tool Builder. You can paste your business API URL (e.g. order tracking or booking API) and the AI will call it live during WhatsApp chats."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Founder, Apex Logistics",
      content: "Swastiai cut our customer support response time from 3 hours to 0.12 seconds. Our clients get instant tracking updates on WhatsApp 24/7!",
      rating: 5
    },
    {
      name: "Dr. Ananya Verma",
      role: "Chief Dentist, DentalCare Clinic",
      content: "Patient appointment bookings doubled within our first week. Patients love checking doctor availability on WhatsApp at night without waiting for morning calls.",
      rating: 5
    },
    {
      name: "Vikram Mehta",
      role: "E-Commerce Director, UrbanStyle",
      content: "Uploading our product PDF catalog took 10 seconds. The AI answers buyer questions about sizes and prices perfectly. 10x ROI for our store!",
      rating: 5
    }
  ];

  // ROI Math
  const estimatedSavings = Math.round((monthlyInquiries / 1000) * 450);
  const hoursSaved = Math.round((monthlyInquiries / 1000) * 40);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      {/* Top Header Navigation */}
      <PublicHeader
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAuth={onOpenAuth}
        onGoToDashboard={onGoToDashboard}
        isLoggedIn={isLoggedIn}
      />

      {/* Dynamic Page Views */}
      <main style={{ minHeight: 'calc(100vh - 76px - 200px)' }}>
        {activePage === 'home' && (
          <>
            {/* World-Class Stunning Hero Section matching exact screenshot */}
            <section style={{
              padding: '70px 48px 60px',
              maxWidth: '1280px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Background Ambient Soft Light Mesh */}
              <div style={{ position: 'absolute', top: '0%', left: '30%', width: '600px', height: '500px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.04) 50%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

              <div className="hero-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1.05fr 1fr',
                alignItems: 'center',
                gap: '40px',
                minHeight: '520px'
              }}>

                {/* LEFT COLUMN: Headline & Action Controls */}
                <div className="hero-left" style={{ textAlign: 'left', zIndex: 10 }}>
                  {/* Top Pill Badge matching SS */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    borderRadius: '30px',
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: '#6366f1',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    marginBottom: '28px'
                  }}>
                    <span>★</span> AI that works. Intelligence that delivers.
                  </div>

                  {/* Massive Hero Headline matching SS typography */}
                  <h1 style={{
                    fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    letterSpacing: '-0.035em',
                    color: '#000000',
                    marginBottom: '24px'
                  }}>
                    Build smarter.<br />
                    Automate <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>everything.</span><br />
                    Scale <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>limitlessly.</span>
                  </h1>

                  <p style={{
                    fontSize: '1.15rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    maxWidth: '520px',
                    marginBottom: '36px',
                    fontWeight: 500
                  }}>
                    SWASTIAI is your all-in-one AI workspace to build, deploy and scale intelligent agents that work 24/7 to grow your business.
                  </p>

                  {/* CTA Action Buttons matching SS */}
                  <div className="hero-cta-buttons" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <button
                      onClick={isLoggedIn ? onGoToDashboard : onOpenAuth}
                      style={{
                        padding: '16px 36px',
                        borderRadius: '30px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'} <ArrowRight size={18} />
                    </button>

                    <button
                      onClick={() => setActivePage('contact')}
                      style={{
                        padding: '15px 30px',
                        borderRadius: '30px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      Book a Demo <Play size={16} fill="#0f172a" color="#0f172a" />
                    </button>
                  </div>

                  {/* Trust Checkmarks matching SS */}
                  <div className="hero-trust-checks" style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} color="#6366f1" /> No Credit Card
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Gift size={16} color="#6366f1" /> Free Forever Plan
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <XCircle size={16} color="#6366f1" /> Cancel Anytime
                    </span>
                  </div>
                </div>

                {/* RIGHT COLUMN: Floating Interactive Canvas matching SS */}
                <div className="hero-canvas" style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Concentric Background Orbits */}
                  <div style={{
                    position: 'absolute',
                    width: '360px',
                    height: '360px',
                    borderRadius: '50%',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    border: '1px solid rgba(99, 102, 241, 0.25)'
                  }} />

                  {/* Center Floating Giant 3D 'S' Brand Mark */}
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '40px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%)',
                    boxShadow: '0 20px 50px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '5rem',
                    position: 'relative',
                    zIndex: 5
                  }}>
                    S
                  </div>

                  {/* Floating Card 1 (Top Left: AI Agent) */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '10px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '14px 20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 10
                  }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>AI Agent</div>
                      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>🟢 Online</div>
                    </div>
                  </div>

                  {/* Floating Card 2 (Top Right: Automation) */}
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '18px 22px',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.07)',
                    border: '1px solid #f1f5f9',
                    zIndex: 10,
                    minWidth: '200px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={14} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>Automation</span>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>2,340</div>
                    <div style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Workflows Executed</div>
                    {/* Live Sparkline Graph SVG */}
                    <svg width="100%" height="24" viewBox="0 0 100 24" fill="none">
                      <path d="M 0 18 Q 20 5 40 16 T 80 8 L 100 4" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>

                  {/* Floating Card 3 (Bottom Left: Knowledge Base) */}
                  <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '0px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '18px 22px',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.07)',
                    border: '1px solid #f1f5f9',
                    zIndex: 10,
                    minWidth: '210px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BookOpen size={14} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>Knowledge Base</span>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>12,548</div>
                    <div style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Documents Indexed</div>
                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', borderRadius: '4px', background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ width: '75%', height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg, #a855f7 0%, #6366f1 100%)' }} />
                    </div>
                  </div>

                  {/* Floating Micro-Badges (Bottom Right) */}
                  <div style={{ position: 'absolute', bottom: '80px', right: '40px', display: 'flex', gap: '10px', zIndex: 10 }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                      <MessageSquare size={18} />
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                      <Database size={18} />
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                      <Code size={18} />
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Social Proof Header */}
              <div style={{ marginTop: '80px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#64748b', marginBottom: '24px' }}>
                  Trusted by innovators and teams worldwide
                </div>

                {/* Company Logos Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '44px',
                  flexWrap: 'wrap',
                  opacity: 0.7,
                  marginBottom: '60px'
                }}>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={18} /> TechNova</span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Cloud size={18} /> CloudSync</span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Database size={18} /> DataFlux</span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={18} /> InnovaHub</span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Code size={18} /> CodeCraft</span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={18} /> DigitalEdge</span>
                </div>

                {/* 4 Metric Cards Grid matching SS */}
                <div className="social-metrics-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '28px 32px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 35px rgba(0,0,0,0.03)'
                }}>
                  {/* Metric 1 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>10K+</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Active Users</div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Growing community of builders</div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '1px solid #f1f5f9', paddingLeft: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>50K+</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>AI Workflows</div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Automated and running 24/7</div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '1px solid #f1f5f9', paddingLeft: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e7ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>99.9%</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Uptime</div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Reliable. Secure. Always on.</div>
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', borderLeft: '1px solid #f1f5f9', paddingLeft: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef3c7', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>4.9/5</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>User Rating</div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b' }}>Loved by creators & businesses</div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Interactive Working Architecture Diagram Section */}
            <ArchitectureDiagramSection
              onOpenAuth={onOpenAuth}
              onGoToDashboard={onGoToDashboard}
              isLoggedIn={isLoggedIn}
            />

            {/* Interactive ROI Calculator Section */}
            <section style={{ padding: '80px 48px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interactive Business ROI Calculator</span>
                  <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.03em' }}>
                    Calculate Your Business Cost & Time Savings
                  </h2>
                </div>

                <div className="glass-panel" style={{ padding: '48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '12px' }}>
                      Monthly WhatsApp Inquiries: <span style={{ color: '#2563eb', fontSize: '1.3rem' }}>{monthlyInquiries.toLocaleString()} chats</span>
                    </label>

                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={monthlyInquiries}
                      onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                      style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#cbd5e1', outline: 'none', cursor: 'pointer', marginBottom: '24px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', fontWeight: 700 }}>
                      <span>1,000 chats</span>
                      <span>25,000 chats</span>
                      <span>50,000 chats</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)' }}>
                        <DollarSign size={26} color="#059669" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>ESTIMATED COST SAVINGS</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669' }}>₹{estimatedSavings.toLocaleString()} / month</div>
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.1)' }}>
                        <Clock size={26} color="#2563eb" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>SUPPORT TIME SAVED</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>{hoursSaved} Hours / month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Grid */}
            <section style={{ padding: '90px 48px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <span style={{ fontSize: '0.85rem', color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verified Reviews</span>
                <h2 style={{ fontSize: '2.6rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', letterSpacing: '-0.03em' }}>
                  Loved by 1,200+ AI Businesses
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
                {testimonials.map((t, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={18} color="#d97706" fill="#d97706" />
                        ))}
                      </div>
                      <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '24px' }}>
                        "{t.content}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{t.name}</div>
                        <div style={{ fontSize: '0.775rem', color: '#64748b' }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive FAQ Section */}
            <section style={{ padding: '80px 48px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Got Questions?</span>
                  <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>Frequently Asked Questions</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="glass-panel"
                      style={{ padding: '24px', cursor: 'pointer', transition: '0.2s' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{faq.q}</h4>
                        {openFaq === idx ? <ChevronUp size={20} color="#2563eb" /> : <ChevronDown size={20} color="#64748b" />}
                      </div>

                      {openFaq === idx && (
                        <p style={{ color: '#475569', fontSize: '0.925rem', lineHeight: 1.65, marginTop: '14px', margin: '14px 0 0' }}>
                          {faq.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Full-Width Edge-To-Edge World-Class Bottom Banner */}
            <section style={{
              width: '100%',
              padding: '110px 48px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #2563eb 70%, #0284c7 100%)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '40px'
            }}>
              {/* Internal Ambient Light Glow Spheres */}
              <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

              <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 22px', borderRadius: '30px', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#ffffff', fontSize: '0.875rem', fontWeight: 800, marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <Sparkles size={16} /> Deploy in 60 Seconds • Zero Coding Required
                </div>

                <h2 style={{ fontSize: '3.8rem', fontWeight: 900, color: '#ffffff', marginBottom: '22px', letterSpacing: '-0.04em', lineHeight: 1.12 }}>
                  Ready to Turn Your WhatsApp <br /> Into a 24/7 Sales & Revenue Engine?
                </h2>

                <p style={{ color: '#e0f2fe', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 46px', lineHeight: 1.6, fontWeight: 500 }}>
                  Join 1,200+ growing companies automating customer support, appointment booking, and order tracking with sub-second AI.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <button onClick={isLoggedIn ? onGoToDashboard : onOpenAuth} style={{
                    padding: '22px 54px',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    borderRadius: '16px',
                    border: 'none',
                    background: '#ffffff',
                    color: '#1e3a8a',
                    cursor: 'pointer',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease'
                  }}>
                    {isLoggedIn ? 'Go to Dashboard' : 'Deploy Your AI Agent Now'} <ArrowRight size={26} color="#1e3a8a" />
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', marginTop: '40px', fontSize: '0.9rem', color: '#bfdbfe', fontWeight: 800, flexWrap: 'wrap' }}>
                  <span>✓ 1-Click Meta & Interakt Setup</span>
                  <span>✓ PDF Document Indexing</span>
                  <span>✓ 0.12s Groq Llama 3.3 Latency</span>
                  <span>✓ 100% BYOK Model</span>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'services' && <ServicesPage onOpenAuth={onOpenAuth} />}

        {activePage === 'guide' && (
          <div style={{ padding: '60px 48px' }}>
            <HowToUseView />
          </div>
        )}

        {activePage === 'about' && <AboutPage />}

        {activePage === 'pricing' && <PricingPage onOpenAuth={onOpenAuth} />}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <PublicFooter setActivePage={setActivePage} />
    </div>
  );
};
