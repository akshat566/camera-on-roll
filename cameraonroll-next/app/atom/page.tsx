'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafeAuth } from '@/hooks/useSafeAuth';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

const E = [0.22, 0.58, 0.32, 1] as const;
const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const CAPABILITIES = [
  { n:'AI Film Generation',     d:'Full AI-generated cinematic brand films and campaigns built from prompts, scripts, and references — automated at scale.' },
  { n:'Digital Human Creation', d:'Photorealistic AI spokespeople and brand ambassadors indistinguishable from real talent.' },
  { n:'AI UGC Content',         d:'Hundreds of performance-driven ad variants generated automatically for every audience segment.' },
  { n:'AI Music Videos',        d:'Visual narratives for music powered by generative AI — cinematic, fast, scalable.' },
  { n:'AI Product Films',       d:'Studio-quality product photography and 3D renders generated without a physical shoot.' },
  { n:'AI Voice & Sound',       d:'Branded voice synthesis, music composition, and sound design driven by intelligence.' },
];

const PROCESS = [
  { n:'01 — Brief',     d:'We gather your creative brief, references, tone, and target audience.' },
  { n:'02 — Architect', d:'Our AI pipeline architects the visual world, storyboard, and production plan.' },
  { n:'03 — Generate',  d:'ATOM generates multiple creative directions simultaneously — video, image, sound.' },
  { n:'04 — Refine',    d:'Human creative directors select, refine, and elevate the AI output.' },
  { n:'05 — Deliver',   d:'Final production-ready assets delivered across all platforms and formats.' },
];

const TIERS = [
  {
    name: 'Basic', price: '$25', period: '/month', amount: 2500,
    desc: 'Entry-level AI access for creators and small brands.',
    features: ['50 generations/month', 'Text-to-image', 'Basic video clips', 'Email support', '720p exports'],
    cta: 'Start Basic', popular: false,
  },
  {
    name: 'Pro', price: '$50', period: '/month', amount: 5000,
    desc: 'Full creative suite for professional studios and agencies.',
    features: ['Unlimited generations', 'Text-to-video (up to 60s)', 'Digital humans', 'Priority queue', '1080p exports', 'API access'],
    cta: 'Go Pro', popular: true,
  },
  {
    name: 'Enterprise', price: '$200', period: '/month', amount: 20000,
    desc: 'Unlimited power for production houses and large-scale operations.',
    features: ['Everything in Pro', '4K exports', 'Custom AI training', 'Dedicated account manager', 'White-label rights', 'Real-time collaboration', 'SLA guarantee'],
    cta: 'Contact Sales', popular: false,
  },
];

const SUGGESTIONS = [
  'Generate a cinematic brand film for a luxury watch',
  'Create 5 UGC ad variants for a skincare brand',
  'Build a digital human spokesperson',
  'Write a trailer script for an action film',
];

type Msg = { role: 'user' | 'atom'; text: string; type?: 'pricing' };

export default function AtomPage() {
  const { isSignedIn, userId } = useSafeAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [needsPayment, setNeedsPayment] = useState(false);
  const [payLoading, setPayLoading] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  useEffect(() => {
    if (isSignedIn && messages.length === 0) {
      setMessages([
        { role: 'atom', text: 'Welcome back. I am ATOM — your virtual brain. What shall we build today?' },
      ]);
    }
  }, [isSignedIn]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(m => [...m, { role: 'user', text: userText }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      if (!needsPayment) {
        setNeedsPayment(true);
        setMessages(m => [
          ...m,
          { role: 'atom', text: `I've analyzed your request: "${userText}"\n\nTo generate this, you need an active Agent Plan. Choose a subscription below to unlock ATOM's full capabilities.`, type: 'pricing' },
        ]);
      } else {
        setMessages(m => [...m, { role: 'atom', text: `ATOM is processing: "${userText}" — I will generate a cinematic concept brief, storyboard frames, and production plan for this. [Demo: backend integration required for live generation.]` }]);
      }
    }, 1800);
  };

  const handleSubscribe = useCallback(async (plan: string) => {
    if (!userId) return;
    setPayLoading(plan);
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Camera On Roll — ATOM',
        description: `ATOM ${plan} Plan`,
        order_id: data.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan,
              userId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setNeedsPayment(false);
            setMessages(m => [...m, { role: 'atom', text: `Payment successful! Your ${plan} plan is now active. ATOM is ready to generate. What would you like to create next?` }]);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        theme: { color: '#e8176a' },
        modal: { ondismiss: () => setPayLoading(null) },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error('Subscribe error:', err);
      alert(err.message || 'Payment failed');
    } finally {
      setPayLoading(null);
    }
  }, [userId]);

  const chatWelcome = 'Welcome. I am ATOM — your virtual brain. I know everything about creative production and can do anything you imagine. Sign in to start building.';

  return (
    <>
      {/* ══ HERO ══════════════════════════════════ */}
      <section style={{ position:'relative', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'var(--black)' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px)', backgroundSize:'60px 60px' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,23,106,0.07) 0%, transparent 70%)' }} />

        <div className="cx" style={{ position:'relative', zIndex:10, textAlign:'center', paddingTop:'var(--nav-h)' }}>
          <motion.p initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>
            AI Division — Camera On Roll
          </motion.p>
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.05, delay:0.1, ease:E }}
            style={{ fontFamily:'var(--font-display)', fontSize:'clamp(88px,19vw,220px)', textTransform:'uppercase', lineHeight:0.85, letterSpacing:'-0.04em', color:'var(--white)' }}>
            ATOM
          </motion.div>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.28, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, letterSpacing:'0.36em', textTransform:'uppercase', color:'var(--white-40)', marginTop:'16px', marginBottom:'16px' }}>
            Powered by O.N.E — One Neural Entertainment
          </motion.p>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.85, delay:0.38, ease:E }}
            style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.88, color:'var(--white-70)', maxWidth:'520px', margin:'0 auto 40px' }}>
            Your virtual brain. ATOM knows everything about creative production and can do anything you imagine — from concept to final cut, at the speed of thought.
          </motion.p>
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.5, ease:E }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'14px', flexWrap:'wrap' }}>
            <a href="#chat" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Talk to ATOM</a>
            <a href="#pricing" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:500,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', border:'1px solid var(--white-20)', color:'var(--white-70)',
              display:'inline-flex', transition:'border-color var(--t-base), color var(--t-base)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
            >View Plans</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}
          style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:'var(--font-body)', fontSize:'8px', fontWeight:500, letterSpacing:'0.44em', textTransform:'uppercase', color:'var(--white-20)' }}>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ══ CHAT ════════════════════════════════════ */}
      <section id="chat" className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx">
          <div style={{ textAlign:'center', marginBottom:'clamp(40px,5vw,64px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Your Virtual Brain</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'12px' }}>
                Talk to ATOM
              </h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--white-40)', maxWidth:'480px', margin:'0 auto' }}>
                Describe what you want. ATOM will architect, generate, and deliver.
              </p>
            </Reveal>
          </div>

          {/* Chat box */}
          <Reveal>
            <div style={{ maxWidth:'800px', margin:'0 auto', border:'1px solid var(--white-08)', background:'var(--black)' }}>
              {/* Chat header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid var(--white-08)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--accent)', animation:'pulse 2s infinite' }} />
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--white)' }}>ATOM Active</span>
                </div>
                <span style={{ fontFamily:'var(--font-body)', fontSize:'9px', color:'var(--white-40)', letterSpacing:'0.1em' }}>O.N.E v2.1</span>
              </div>

              {/* Messages */}
              <div style={{ padding:'24px', minHeight:'320px', maxHeight:'480px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'16px' }}>
                {!isSignedIn ? (
                  <div style={{ textAlign:'center', padding:'clamp(32px,4vw,56px) 16px' }}>
                    <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.85, color:'var(--white-40)', maxWidth:'420px', margin:'0 auto 24px' }}>
                      {chatWelcome}
                    </p>
                    {CLERK_KEY ? (
                      <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                        <SignInButton mode="modal">
                          <button style={{
                            fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
                            letterSpacing:'0.18em', textTransform:'uppercase',
                            padding:'14px 28px', background:'var(--accent)', color:'#fff',
                            border:'none', cursor:'pointer', transition:'opacity var(--t-fast)',
                          }}
                          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
                          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                          >Sign In to ATOM</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <button style={{
                            fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600,
                            letterSpacing:'0.18em', textTransform:'uppercase',
                            padding:'14px 28px', background:'transparent', color:'var(--white-70)',
                            border:'1px solid var(--white-20)', cursor:'pointer',
                            transition:'border-color var(--t-fast), color var(--t-fast)',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-20)'; e.currentTarget.style.color='var(--white-70)'; }}
                          >Create Account</button>
                        </SignUpButton>
                      </div>
                    ) : (
                      <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'var(--white-20)', letterSpacing:'0.1em' }}>
                        [Auth system not configured — add Clerk keys to .env.local]
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {messages.map((m, i) => (
                      <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth:'75%' }}>
                        <div style={{
                          padding:'14px 18px',
                          background: m.role === 'user' ? 'var(--accent-soft)' : 'var(--surface-2)',
                          borderLeft: m.role === 'atom' ? '2px solid var(--accent)' : '2px solid transparent',
                        }}>
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'13.5px', lineHeight:1.75, color:'var(--white-70)' }}>{m.text}</p>
                        </div>
                        <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', color:'var(--white-20)', marginTop:'6px', letterSpacing:'0.08em', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                          {m.role === 'atom' ? 'ATOM' : 'You'}
                        </p>
                      </div>
                    ))}
                    {typing && (
                      <div style={{ alignSelf:'flex-start', display:'flex', alignItems:'center', gap:'6px', padding:'12px 16px', background:'var(--surface-2)' }}>
                        <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', animation:'bounce 1.4s infinite 0s' }} />
                        <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', animation:'bounce 1.4s infinite 0.2s' }} />
                        <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', animation:'bounce 1.4s infinite 0.4s' }} />
                      </div>
                    )}

                    {/* Inline Pricing Gate */}
                    <AnimatePresence>
                      {needsPayment && messages.length > 0 && messages[messages.length - 1].type === 'pricing' && (
                        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                          style={{ alignSelf:'stretch', border:'1px solid var(--accent-dim)', padding:'24px', background:'var(--accent-soft)' }}>
                          <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Subscribe to Generate</p>
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap:'12px' }}>
                            {TIERS.map(tier => (
                              <button key={tier.name} onClick={() => handleSubscribe(tier.name.toLowerCase())}
                                disabled={!!payLoading}
                                style={{
                                  padding:'16px',
                                  border: tier.popular ? '1px solid var(--accent)' : '1px solid var(--white-08)',
                                  background: tier.popular ? 'var(--accent)' : 'transparent',
                                  cursor:'pointer', textAlign:'left',
                                  opacity: payLoading && payLoading !== tier.name.toLowerCase() ? 0.4 : 1,
                                  transition:'opacity var(--t-fast)',
                                }}
                              >
                                <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color: tier.popular ? '#fff' : 'var(--accent)', marginBottom:'6px' }}>{tier.name}</p>
                                <p style={{ fontFamily:'var(--font-display)', fontSize:'20px', color: tier.popular ? '#fff' : 'var(--white)', marginBottom:'4px' }}>{tier.price}</p>
                                <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', color: tier.popular ? 'rgba(255,255,255,0.7)' : 'var(--white-40)' }}>{tier.desc}</p>
                                {payLoading === tier.name.toLowerCase() && (
                                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', color:'var(--accent)', marginTop:'8px' }}>Loading...</p>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>

              {/* Input */}
              {isSignedIn && (
                <>
                  <div style={{ padding:'0 24px 12px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
                    {SUGGESTIONS.map(s => (
                      <button key={s} onClick={() => setInput(s)}
                        style={{
                          fontFamily:'var(--font-body)', fontSize:'10px', color:'var(--white-40)',
                          padding:'8px 14px', border:'1px solid var(--white-08)', background:'transparent',
                          cursor:'pointer', transition:'border-color var(--t-fast), color var(--t-fast)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-dim)'; e.currentTarget.style.color='var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='var(--white-08)'; e.currentTarget.style.color='var(--white-40)'; }}
                      >{s}</button>
                    ))}
                  </div>
                  <div style={{ padding:'16px 24px', borderTop:'1px solid var(--white-08)', display:'flex', gap:'12px', alignItems:'center' }}>
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && send()}
                      placeholder="Ask ATOM anything..."
                      disabled={needsPayment}
                      style={{
                        flex:1, background:'transparent', border:'none',
                        fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--white)',
                        outline:'none', padding:'8px 0',
                        opacity: needsPayment ? 0.3 : 1,
                      }}
                    />
                    <button onClick={send} disabled={needsPayment}
                      style={{
                        padding:'10px 24px', background: needsPayment ? 'var(--white-20)' : 'var(--accent)', color:'#fff',
                        fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
                        letterSpacing:'0.16em', textTransform:'uppercase',
                        border:'none', cursor:'pointer', transition:'opacity var(--t-fast)',
                        opacity: needsPayment ? 0.4 : 1,
                      }}
                      onMouseEnter={e => { if (!needsPayment) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                      onMouseLeave={e => { if (!needsPayment) (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                    >Send</button>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PRICING ═════════════════════════════════ */}
      <section id="pricing" className="section-pad" style={{ borderTop:'1px solid var(--white-08)' }}>
        <div className="cx">
          <div style={{ textAlign:'center', marginBottom:'clamp(40px,5vw,64px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>Agent Plans</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'12px' }}>
                Choose Your Power
              </h2>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', color:'var(--white-40)', maxWidth:'480px', margin:'0 auto' }}>
                Subscribe to unlock ATOM. Every plan gives you full access to your virtual brain.
              </p>
            </Reveal>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:'16px', maxWidth:'960px', margin:'0 auto' }}>
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i*0.08}>
                <div style={{
                  padding:'clamp(28px,3vw,40px)',
                  border: tier.popular ? '1px solid var(--accent-dim)' : '1px solid var(--white-08)',
                  background: tier.popular ? 'var(--accent-soft)' : 'transparent',
                  position:'relative',
                }}>
                  {tier.popular && (
                    <div style={{
                      position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%)',
                      fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:700,
                      letterSpacing:'0.22em', textTransform:'uppercase',
                      padding:'6px 18px', background:'var(--accent)', color:'#fff',
                    }}>
                      Most Popular
                    </div>
                  )}
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>{tier.name}</p>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'8px' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,4vw,48px)', color:'var(--white)', lineHeight:1 }}>{tier.price}</span>
                    <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--white-40)' }}>{tier.period}</span>
                  </div>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.75, color:'var(--white-40)', marginBottom:'28px', minHeight:'46px' }}>{tier.desc}</p>
                  <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px', marginBottom:'32px' }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--white-70)', display:'flex', alignItems:'center', gap:'10px' }}>
                        <span style={{ color:'var(--accent)', fontSize:'10px' }}>◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => isSignedIn ? handleSubscribe(tier.name.toLowerCase()) : document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                    disabled={!!payLoading}
                    style={{
                      width:'100%', padding:'14px',
                      fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700,
                      letterSpacing:'0.18em', textTransform:'uppercase',
                      background: tier.popular ? 'var(--accent)' : 'transparent',
                      color: tier.popular ? '#fff' : 'var(--white)',
                      border: tier.popular ? '1px solid var(--accent)' : '1px solid var(--white-20)',
                      cursor:'pointer', transition:'all var(--t-base)',
                      opacity: payLoading ? 0.6 : 1,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      if (!payLoading) { el.style.background = 'var(--accent)'; el.style.color = '#fff'; el.style.borderColor = 'var(--accent)'; }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      if (!tier.popular && !payLoading) { el.style.background = 'transparent'; el.style.color = 'var(--white)'; el.style.borderColor = 'var(--white-20)'; }
                    }}
                  >{isSignedIn ? tier.cta : 'Sign In to Subscribe'}</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES ════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', background:'var(--surface)' }}>
        <div className="cx">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap:'clamp(32px,5vw,72px)', alignItems:'start', marginBottom:'clamp(48px,7vw,80px)' }}>
            <Reveal>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>What ATOM Does</p>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)' }}>AI Capabilities</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'15px', fontWeight:400, lineHeight:1.9, color:'var(--white-70)' }}>
                ATOM integrates cutting-edge generative AI into every phase of production — not as a gimmick, but as the core engine. We have engineered pipelines that merge AI generation with human creative direction to produce results that are both intelligent and emotionally powerful.
              </p>
            </Reveal>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'1px', background:'var(--white-08)' }}>
            {CAPABILITIES.map((s,i) => (
              <Reveal key={s.n} delay={i*0.06}>
                <div style={{ background:'var(--black)', padding:'clamp(24px,3vw,40px)', height:'100%', transition:'background var(--t-base)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background='var(--surface-2)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background='var(--black)')}
                >
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'9px', fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'18px' }}>0{i+1}</p>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(14px,1.5vw,19px)', textTransform:'uppercase', color:'var(--white)', marginBottom:'12px', lineHeight:1.1 }}>{s.n}</h3>
                  <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', lineHeight:1.85, color:'var(--white-40)' }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)' }}>
        <div className="cx">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'16px' }}>How It Works</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,52px)', textTransform:'uppercase', lineHeight:0.92, color:'var(--white)', marginBottom:'clamp(36px,5vw,64px)' }}>The ATOM Process</h2>
          </Reveal>
          {PROCESS.map((p,i) => (
            <Reveal key={p.n} delay={i*0.07}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap:'clamp(12px,3vw,48px)', padding:'clamp(20px,2.5vw,32px) 0', borderTop:'1px solid var(--white-08)', alignItems:'start' }}>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(13px,1.4vw,17px)', textTransform:'uppercase', color:'var(--white)' }}>{p.n}</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.9, color:'var(--white-70)' }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop:'1px solid var(--white-08)' }} />
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════ */}
      <section className="section-pad" style={{ borderTop:'1px solid var(--white-08)', textAlign:'center' }}>
        <div className="cx-narrow">
          <Reveal>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:600, letterSpacing:'0.38em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'20px' }}>Powered by O.N.E</p>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(34px,5.5vw,78px)', textTransform:'uppercase', lineHeight:0.88, letterSpacing:'-0.02em', color:'var(--white)', marginBottom:'40px' }}>
              The Future of Content<br />Is Already Here.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" style={{
              fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700,
              letterSpacing:'0.18em', textTransform:'uppercase',
              padding:'14px 32px', background:'var(--accent)', color:'#ffffff',
              display:'inline-flex', transition:'opacity var(--t-base)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >Work with ATOM</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
