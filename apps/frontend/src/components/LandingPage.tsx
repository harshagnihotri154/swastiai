import React, { useState } from 'react';
import { ArrowRight, Send, CheckCheck, RefreshCw, ShieldCheck, ChevronDown, ChevronUp, Star, Upload, MessageSquare, Sparkles, DollarSign, Clock } from 'lucide-react';
import { PublicHeader } from './public/PublicHeader';
import { PublicFooter } from './public/PublicFooter';
import { ServicesPage } from './public/ServicesPage';
import { AboutPage } from './public/AboutPage';
import { PricingPage } from './public/PricingPage';
import { ContactPage } from './public/ContactPage';
import { HowToUseView } from './HowToUseView';

interface LandingPageProps {
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
  isLoggedIn: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onGoToDashboard, isLoggedIn }) => {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact'>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [demoTab, setDemoTab] = useState<'chat' | 'knowledge' | 'provider'>('chat');

  // ROI Calculator State
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(5000);

  // Live Web Chat Simulator State (Max 2 Demo Messages per Visitor)
  const [demoCount, setDemoCount] = useState(0);
  const [heroPrompt, setHeroPrompt] = useState('');
  const [heroLoading, setHeroLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'user', content: 'Hi Swastiai! How can you help my business grow?' },
    { role: 'ai', content: 'Hello! 👋 I am your 24/7 AI Business Assistant. I answer customer questions in 0.12 seconds, qualify leads, recommend products, and book appointments automatically on WhatsApp!' }
  ]);

  const handleSendHeroChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim() || heroLoading) return;

    if (demoCount >= 2) {
      alert("🎉 You've used your 2 free demo questions! Sign up to deploy your custom business AI Agent.");
      onOpenAuth();
      return;
    }

    const userText = heroPrompt.trim();
    setHeroPrompt('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setHeroLoading(true);
    setDemoCount((prev) => prev + 1);

    try {
      const res = await fetch('http://localhost:5001/api/v1/whatsapp/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, { role: 'ai', content: data.aiReply || 'Hello! Thank you for contacting Swastiai.' }]);
    } catch (err: any) {
      setChatMessages((prev) => [...prev, { role: 'ai', content: 'Hello! I am Swastiai AI Assistant powered by Groq Llama 3.3. How can I help your business today?' }]);
    } finally {
      setHeroLoading(false);
    }
  };

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
            {/* World-Class Stunning Hero Section */}
            <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
              {/* Soft Multi-Tone Animated Ambient Light Mesh */}
              <div style={{ position: 'absolute', top: '5%', left: '20%', width: '550px', height: '450px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '15%', right: '20%', width: '500px', height: '400px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(219, 39, 119, 0.06) 50%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

              {/* Floating Pill Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 22px', borderRadius: '30px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#2563eb', fontSize: '0.875rem', fontWeight: 800, marginBottom: '32px', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)' }}>
                <div className="pulse-dot" /> 🟢 Live Meta & Interakt Gateway • ⚡ 0.12s Ultra-Fast Groq AI
              </div>

              {/* Giant Impact Headline */}
              <h1 style={{ fontSize: '4.8rem', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.04em', color: '#0f172a', marginBottom: '28px', maxWidth: '1120px', margin: '0 auto 28px' }}>
                Automate WhatsApp Sales & Support <br />
                With <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 40%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>24/7 Intelligent AI Agents</span>
              </h1>

              <p style={{ fontSize: '1.3rem', color: '#475569', lineHeight: 1.65, maxWidth: '880px', margin: '0 auto 48px', fontWeight: 500 }}>
                Turn every WhatsApp conversation into revenue. Swastiai trains custom AI Assistants on your business PDFs & APIs to handle support, book appointments, and close sales automatically.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '80px' }}>
                <button onClick={isLoggedIn ? onGoToDashboard : onOpenAuth} className="btn-primary" style={{ padding: '20px 48px', fontSize: '1.2rem', borderRadius: '14px' }}>
                  {isLoggedIn ? 'Go to Dashboard' : 'Deploy Your AI Agent Now'} <ArrowRight size={22} />
                </button>
                <button onClick={() => setActivePage('services')} className="btn-secondary" style={{ padding: '20px 36px', fontSize: '1.2rem', borderRadius: '14px' }}>
                  Explore Industry Demos
                </button>
              </div>

              {/* Sleek Smartphone Mockup Hub */}
              <div style={{
                background: '#ffffff',
                borderRadius: '36px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 30px 90px rgba(0,0,0,0.1), 0 0 50px rgba(37, 99, 235, 0.12)',
                maxWidth: '840px',
                margin: '0 auto',
                overflow: 'hidden',
                textAlign: 'left',
                position: 'relative',
                zIndex: 10
              }}>
                {/* Smartphone Device Notch Header */}
                <div style={{ background: '#f1f5f9', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setDemoTab('chat')}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '12px',
                        border: demoTab === 'chat' ? '1px solid #2563eb' : '1px solid transparent',
                        background: demoTab === 'chat' ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                        color: demoTab === 'chat' ? '#2563eb' : '#64748b',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <MessageSquare size={16} /> 💬 Live Chat Simulator
                    </button>

                    <button
                      onClick={() => setDemoTab('knowledge')}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '12px',
                        border: demoTab === 'knowledge' ? '1px solid #7c3aed' : '1px solid transparent',
                        background: demoTab === 'knowledge' ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                        color: demoTab === 'knowledge' ? '#7c3aed' : '#64748b',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Upload size={16} /> 📄 PDF Knowledge RAG
                    </button>

                    <button
                      onClick={() => setDemoTab('provider')}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '12px',
                        border: demoTab === 'provider' ? '1px solid #059669' : '1px solid transparent',
                        background: demoTab === 'provider' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                        color: demoTab === 'provider' ? '#059669' : '#64748b',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShieldCheck size={16} /> 🔌 Meta & Interakt Gateway
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: demoCount >= 2 ? '#dc2626' : '#2563eb', padding: '6px 14px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)' }}>
                    {demoCount >= 2 ? 'Demo Limit Reached' : `Demo Questions: ${demoCount}/2`}
                  </div>
                </div>

                {/* Tab 1: Live Chat Simulator */}
                {demoTab === 'chat' && (
                  <div>
                    <div style={{ padding: '24px', height: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: '#efeae2' }}>
                      {chatMessages.map((msg, index) => {
                        const isUser = msg.role === 'user';
                        return (
                          <div
                            key={index}
                            style={{
                              alignSelf: isUser ? 'flex-end' : 'flex-start',
                              maxWidth: '82%',
                              background: isUser ? '#d9fdd3' : '#ffffff',
                              color: '#111b21',
                              padding: '12px 16px',
                              borderRadius: isUser ? '14px 0 14px 14px' : '0 14px 14px 14px',
                              fontSize: '0.925rem',
                              lineHeight: 1.55,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                            }}
                          >
                            {msg.content}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px', fontSize: '0.65rem', color: '#667781' }}>
                              {isUser ? <CheckCheck size={14} color="#53bdeb" /> : '⚡ Groq Llama 3.3'}
                            </div>
                          </div>
                        );
                      })}

                      {heroLoading && (
                        <div style={{ alignSelf: 'flex-start', background: '#ffffff', color: '#667781', padding: '10px 16px', borderRadius: '0 14px 14px 14px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                          <RefreshCw size={14} className="spin" /> Swastiai AI is generating answer...
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendHeroChat} style={{ background: '#f0f2f5', padding: '14px', display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        value={heroPrompt}
                        onChange={(e) => setHeroPrompt(e.target.value)}
                        placeholder="Type any test question (e.g. What can you do for my business?)..."
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
                      />
                      <button type="submit" disabled={heroLoading || !heroPrompt.trim()} style={{ width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: '#00a884', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                )}

                {/* Tab 2: Knowledge Base Document Indexer */}
                {demoTab === 'knowledge' && (
                  <div style={{ padding: '36px', background: '#ffffff', minHeight: '330px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ border: '2px dashed #7c3aed', padding: '28px', borderRadius: '16px', textAlign: 'center', background: 'rgba(124, 58, 237, 0.05)' }}>
                      <Upload size={36} color="#7c3aed" style={{ margin: '0 auto 12px', display: 'block' }} />
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Drag & Drop Business PDF, Rates or FAQ Documents</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>Extracted text is automatically indexed into MongoDB for instant AI retrieval.</div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.875rem', color: '#1e293b', fontFamily: 'monospace' }}>
                      Indexed Entry: <span style={{ color: '#2563eb', fontWeight: 800 }}>"Business_Rates_2026.pdf"</span><br />
                      Status: <span style={{ color: '#059669', fontWeight: 800 }}>Indexed & Active for WhatsApp RAG Search</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Gateway Switcher */}
                {demoTab === 'provider' && (
                  <div style={{ padding: '36px', background: '#ffffff', minHeight: '330px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
                    <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.08)', border: '2px solid #2563eb' }}>
                      <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '1.1rem', marginBottom: '8px' }}>Meta WhatsApp Cloud API</div>
                      <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>Official Meta Graph API direct webhook connection.</p>
                    </div>

                    <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.08)', border: '2px solid #7c3aed' }}>
                      <div style={{ fontWeight: 800, color: '#7c3aed', fontSize: '1.1rem', marginBottom: '8px' }}>Interakt WhatsApp API</div>
                      <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>Indian WhatsApp Business API. 1-Click Secret API Key integration.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

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
