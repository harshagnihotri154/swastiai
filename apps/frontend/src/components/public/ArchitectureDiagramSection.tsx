import React, { useState, useEffect } from 'react';
import { Folder, Link2, Settings2, Sparkles, ArrowRight, Bot, Smartphone, CheckCheck, Send } from 'lucide-react';

interface ArchitectureDiagramSectionProps {
  onOpenAuth?: () => void;
  onGoToDashboard?: () => void;
  isLoggedIn?: boolean;
}

export const ArchitectureDiagramSection: React.FC<ArchitectureDiagramSectionProps> = ({
  onOpenAuth,
  onGoToDashboard,
  isLoggedIn
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [animStage, setAnimStage] = useState(0);

  // Auto-play intro sequence matching screen recording
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimStage(1), 400);
    const timer2 = setTimeout(() => setAnimStage(2), 900);
    const timer3 = setTimeout(() => setAnimStage(3), 1400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const leftNodes = [
    { id: 1, label: 'Your Data', icon: Folder, iconBg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', iconColor: '#0284c7', offsetLeft: '0px' },
    { id: 2, label: 'Your workflow', icon: Link2, iconBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', iconColor: '#2563eb', offsetLeft: '48px' },
    { id: 3, label: 'Your business processes', icon: Settings2, iconBg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', iconColor: '#0284c7', offsetLeft: '0px' },
    { id: 4, label: 'Your objectives', icon: Sparkles, iconBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', iconColor: '#2563eb', offsetLeft: '36px' },
  ];

  const handleButtonClick = () => {
    if (isLoggedIn && onGoToDashboard) {
      onGoToDashboard();
    } else if (onOpenAuth) {
      onOpenAuth();
    }
  };

  return (
    <section style={{
      width: '100%',
      padding: '90px 24px',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Soft Blue Glow Mesh */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '480px',
        background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.09) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 75%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Section Headline */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 56px' }}>
          <h2 style={{
            fontSize: 'clamp(1.65rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: '#000000',
            lineHeight: 1.3,
            letterSpacing: '-0.03em',
            margin: 0
          }}>
            Generic AI tools cause more headaches than they solve. We build AI agents specifically for your business processes, workflows, and objectives.
          </h2>
        </div>

        {/* Interactive Diagram Container */}
        <div className="arch-diagram-grid" style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '320px 1fr 340px',
          alignItems: 'center',
          gap: '20px',
          minHeight: '460px',
          background: 'transparent'
        }}>

          {/* SVG Connector Lines & Animated Glowing Royal Blue Beams */}
          <svg style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            <defs>
              {/* Electric Royal Blue Glow Gradient */}
              <linearGradient id="royalBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#2563eb" stopOpacity="1" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>

              <filter id="recGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static Guide Circuit Lines */}
            <path d="M 220 65 L 370 65 L 370 170 L 440 170" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
            <path d="M 265 165 L 440 165" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
            <path d="M 220 265 L 330 265 L 330 220 L 440 220" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />
            <path d="M 255 365 L 370 365 L 370 240 L 440 240" stroke="#e2e8f0" strokeWidth="1.5" fill="none" />

            {/* Main Center -> WhatsApp Agent Path */}
            <path d="M 580 215 L 750 215" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* ANIMATED GLOWING ROYAL BLUE BEAMS */}
            {animStage >= 1 && (
              <>
                <path
                  d="M 220 65 L 370 65 L 370 170 L 440 170"
                  stroke="url(#royalBlueGradient)"
                  strokeWidth="3.5"
                  fill="none"
                  filter="url(#recGlow)"
                  strokeDasharray="22 14"
                  className="lightning-beam-fast"
                />
                <path
                  d="M 265 165 L 440 165"
                  stroke="url(#royalBlueGradient)"
                  strokeWidth="3.5"
                  fill="none"
                  filter="url(#recGlow)"
                  strokeDasharray="22 14"
                  className="lightning-beam-medium"
                />
                <path
                  d="M 220 265 L 330 265 L 330 220 L 440 220"
                  stroke="url(#royalBlueGradient)"
                  strokeWidth="3.5"
                  fill="none"
                  filter="url(#recGlow)"
                  strokeDasharray="22 14"
                  className="lightning-beam-slow"
                />
                <path
                  d="M 255 365 L 370 365 L 370 240 L 440 240"
                  stroke="url(#royalBlueGradient)"
                  strokeWidth="3.5"
                  fill="none"
                  filter="url(#recGlow)"
                  strokeDasharray="22 14"
                  className="lightning-beam-fast"
                />

                {/* Core Output Beam -> Right */}
                <path
                  d="M 580 215 L 750 215"
                  stroke="url(#royalBlueGradient)"
                  strokeWidth="4"
                  fill="none"
                  filter="url(#recGlow)"
                  strokeDasharray="24 12"
                  className="lightning-beam-output"
                />
              </>
            )}
          </svg>

          {/* LEFT COLUMN: 4 Staggered Soft Pill Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 10 }}>
            {leftNodes.map((node, idx) => {
              const Icon = node.icon;
              const isHovered = hoveredNode === node.id;
              const isVisible = animStage >= 1 || idx === 0;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 20px 8px 10px',
                    borderRadius: '30px',
                    background: '#ffffff',
                    border: isHovered ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                    boxShadow: isHovered ? '0 8px 25px rgba(37, 99, 235, 0.18)' : '0 4px 16px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    opacity: isVisible ? 1 : 0.2,
                    transform: isVisible ? (isHovered ? 'translateX(6px)' : 'none') : 'translateY(10px)',
                    width: 'fit-content',
                    marginLeft: node.offsetLeft
                  }}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: node.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: node.iconColor
                  }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontWeight: 700, color: '#000000', fontSize: '0.95rem' }}>{node.label}</span>
                </div>
              );
            })}
          </div>

          {/* CENTER COLUMN: Concentric Orbit Rings & SWASTIAI Royal Blue Core Orb */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(226, 232, 240, 0.6)'
              }} />

              <div style={{
                position: 'absolute',
                width: '76%',
                height: '76%',
                borderRadius: '50%',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }} />

              <div style={{
                position: 'absolute',
                width: '54%',
                height: '54%',
                borderRadius: '50%',
                border: '1px solid #cbd5e1'
              }} />

              {/* Glowing Royal Blue SWASTIAI Core Orb */}
              <div style={{
                width: '92px',
                height: '92px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #60a5fa 0%, #2563eb 65%, #1d4ed8 100%)',
                boxShadow: '0 0 55px rgba(37, 99, 235, 0.65), 0 0 25px rgba(2, 132, 199, 0.45), inset 0 0 15px rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 5,
                transition: 'all 0.8s ease'
              }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M12 12 2.1 12" />
                  <path d="M12 12 12 21.9" />
                  <circle cx="12" cy="12" r="3" fill="#ffffff" />
                </svg>
              </div>
            </div>

            {/* Brand Title Under Circle */}
            <div style={{
              fontWeight: 900,
              fontSize: '1.25rem',
              color: '#0f172a',
              letterSpacing: '0.06em',
              marginTop: '10px',
              textTransform: 'uppercase'
            }}>
              SWASTIAI
            </div>
          </div>

          {/* RIGHT COLUMN: WhatsApp Business AI Agent Card */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{
              borderRadius: '22px',
              background: '#ffffff',
              boxShadow: '0 16px 45px rgba(37, 211, 102, 0.15)',
              border: '1.5px solid #25d366',
              overflow: 'hidden'
            }}>
              {/* WhatsApp Header */}
              <div style={{
                background: '#075e54',
                padding: '16px 20px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800 }}>
                    <Bot size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>WhatsApp AI Agent</div>
                    <div style={{ fontSize: '0.725rem', color: '#80e9a4', fontWeight: 600 }}>🟢 Online 24/7 • Groq AI</div>
                  </div>
                </div>

                <Smartphone size={20} color="#ffffff" />
              </div>

              {/* WhatsApp Chat Body */}
              <div style={{ background: '#efeae2', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '92%',
                  background: '#ffffff',
                  color: '#111b21',
                  padding: '14px 18px',
                  borderRadius: '0 16px 16px 16px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#075e54', marginBottom: '4px' }}>
                    🤖 Business AI Assistant
                  </div>
                  Ask anything! I answer your customers' WhatsApp inquiries instantly with custom rates, order status & clinic bookings.
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px', fontSize: '0.65rem', color: '#667781' }}>
                    Just now <CheckCheck size={14} color="#53bdeb" style={{ marginLeft: '4px' }} />
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '8px 12px 8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #cbd5e1',
                  marginTop: '8px'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Type a message...</span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#25d366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}>
                    <Send size={15} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Solid Royal Blue CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <button
            onClick={handleButtonClick}
            style={{
              padding: '16px 42px',
              borderRadius: '40px',
              border: 'none',
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Start Your Custom Implementation'} <ArrowRight size={20} color="#ffffff" />
          </button>
        </div>

      </div>
    </section>
  );
};
