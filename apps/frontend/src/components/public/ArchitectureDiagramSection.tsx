import React, { useState } from 'react';
import { Folder, Workflow, Cpu, Target, Plus } from 'lucide-react';

export const ArchitectureDiagramSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const leftNodes = [
    { id: 1, label: 'Your Data', icon: Folder, color: '#3b82f6' },
    { id: 2, label: 'Your workflow', icon: Workflow, color: '#8b5cf6' },
    { id: 3, label: 'Your business processes', icon: Cpu, color: '#ec4899' },
    { id: 4, label: 'Your objectives', icon: Target, color: '#06b6d4' },
  ];

  return (
    <section style={{
      width: '100%',
      padding: '90px 24px',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Main Headline */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px' }}>
          <h2 style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.22,
            letterSpacing: '-0.03em'
          }}>
            Generic AI tools cause more headaches than they solve. We build AI agents specifically for your business processes, workflows, and objectives.
          </h2>
        </div>

        {/* Interactive Lightning Diagram Container */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '300px 1fr 340px',
          alignItems: 'center',
          gap: '20px',
          minHeight: '460px',
          padding: '20px 0'
        }}>
          
          {/* SVG Animated Lightning & Glowing Beam Paths Backdrop */}
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
              {/* Lightning Glow Filter */}
              <filter id="glow-light" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Gradient Beam for Left Inputs -> Center */}
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
              </linearGradient>

              {/* Gradient Beam for Center -> Right Agent */}
              <linearGradient id="outputBeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Static Background Circuit Lines */}
            <path d="M 280 65 L 420 65 Q 460 65 460 120 L 460 210 Q 460 230 500 230" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 280 175 L 440 175 Q 470 175 470 200 L 470 220 Q 470 230 500 230" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 280 285 L 440 285 Q 470 285 470 260 L 470 240 Q 470 230 500 230" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 280 395 L 420 395 Q 460 395 460 340 L 460 250 Q 460 230 500 230" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* Path from Center Core to Right Agent */}
            <path d="M 660 230 L 840 230" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            {/* WORKING ANIMATED LIGHTNING BEAMS (SVG Dash Animation) */}
            <path
              d="M 280 65 L 420 65 Q 460 65 460 120 L 460 210 Q 460 230 500 230"
              stroke="url(#beamGradient)"
              strokeWidth={activeNode === 1 ? "4" : "3"}
              fill="none"
              filter="url(#glow-light)"
              strokeDasharray="16 12"
              className="lightning-beam-fast"
            />
            <path
              d="M 280 175 L 440 175 Q 470 175 470 200 L 470 220 Q 470 230 500 230"
              stroke="url(#beamGradient)"
              strokeWidth={activeNode === 2 ? "4" : "3"}
              fill="none"
              filter="url(#glow-light)"
              strokeDasharray="16 12"
              className="lightning-beam-medium"
            />
            <path
              d="M 280 285 L 440 285 Q 470 285 470 260 L 470 240 Q 470 230 500 230"
              stroke="url(#beamGradient)"
              strokeWidth={activeNode === 3 ? "4" : "3"}
              fill="none"
              filter="url(#glow-light)"
              strokeDasharray="16 12"
              className="lightning-beam-slow"
            />
            <path
              d="M 280 395 L 420 395 Q 460 395 460 340 L 460 250 Q 460 230 500 230"
              stroke="url(#beamGradient)"
              strokeWidth={activeNode === 4 ? "4" : "3"}
              fill="none"
              filter="url(#glow-light)"
              strokeDasharray="16 12"
              className="lightning-beam-fast"
            />

            {/* Glowing Output Beam Center -> Right */}
            <path
              d="M 660 230 L 840 230"
              stroke="url(#outputBeamGradient)"
              strokeWidth="4"
              fill="none"
              filter="url(#glow-light)"
              strokeDasharray="20 15"
              className="lightning-beam-output"
            />
          </svg>

          {/* LEFT COLUMN: 4 Interactive Input Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', zIndex: 10 }}>
            {leftNodes.map((node) => {
              const Icon = node.icon;
              const isHovered = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 22px',
                    borderRadius: '40px',
                    background: '#ffffff',
                    boxShadow: isHovered ? '0 12px 30px rgba(139, 92, 246, 0.25)' : '0 4px 20px rgba(0,0,0,0.06)',
                    border: isHovered ? `2px solid ${node.color}` : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    transform: isHovered ? 'translateX(8px) scale(1.02)' : 'none'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${node.color}20 0%, ${node.color}40 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: node.color
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{node.label}</span>
                </div>
              );
            })}
          </div>

          {/* CENTER COLUMN: Glowing AI Core Node (YOUR TOOLS) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Outer Concentric Animated Pulse Rings */}
            <div style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Outer Pulse Ring 1 */}
              <div className="pulse-ring-outer" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
              }} />

              {/* Outer Pulse Ring 2 */}
              <div className="pulse-ring-inner" style={{
                position: 'absolute',
                width: '78%',
                height: '78%',
                borderRadius: '50%',
                border: '1px solid rgba(139, 92, 246, 0.4)'
              }} />

              {/* Main Glowing AI Core Orb */}
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #6366f1 100%)',
                boxShadow: '0 0 50px rgba(124, 58, 237, 0.6), inset 0 0 20px rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                <Cpu size={42} color="#ffffff" className="spin-slow" />
              </div>
            </div>

            <div style={{
              fontWeight: 900,
              fontSize: '1.25rem',
              color: '#0f172a',
              letterSpacing: '0.04em',
              marginTop: '16px',
              textTransform: 'uppercase'
            }}>
              YOUR TOOLS
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive AI Agent Card */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{
              padding: '2px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
              boxShadow: '0 20px 50px rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '22px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>Your AI agent</span>
                  <span style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  </span>
                </div>

                {/* Message Bubble */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '18px',
                  position: 'relative',
                  marginTop: '6px'
                }}>
                  <p style={{ margin: 0, fontSize: '0.925rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.45 }}>
                    Ask anything, get a response customized for your business
                  </p>

                  {/* Avatar Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    right: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#fef08a',
                    border: '2px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    🧑‍💼
                  </div>
                </div>

                {/* Command Bar Input Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  marginTop: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#64748b',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Plus size={14} />
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>Type '/' for commands</span>
                  </div>

                  {/* Audio Wave Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                    <span className="wave-bar" style={{ width: '3px', height: '12px', background: '#64748b', borderRadius: '2px' }} />
                    <span className="wave-bar-tall" style={{ width: '3px', height: '18px', background: '#64748b', borderRadius: '2px' }} />
                    <span className="wave-bar" style={{ width: '3px', height: '10px', background: '#64748b', borderRadius: '2px' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
