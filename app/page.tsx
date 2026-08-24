'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlarmClock,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  Download,
  History,
  LockKeyhole,
  Minus,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Star,
} from 'lucide-react';

const downloadPath = 'https://github.com/ThiagoVenturaV/HoraCerta-Android/releases/latest/download/HoraCerta-v0.1.1.apk';

const benefits = [
  {
    icon: AlarmClock,
    title: 'Alarme na hora certa',
    copy: 'Receba alertas na hora certa e confirme com um toque.',
  },
  {
    icon: RotateCcw,
    title: 'Soneca de 15 minutos',
    copy: 'Adie o lembrete e mantenha o controle sem perder o ritmo.',
    accent: 'orange',
  },
  {
    icon: CalendarDays,
    title: 'Histórico completo',
    copy: 'Veja seu calendário e acompanhe cada dose.',
  },
  {
    icon: BarChart3,
    title: 'Progresso que motiva',
    copy: 'Acompanhe sua adesão e mantenha a consistência.',
    accent: 'coral',
  },
];

const steps = [
  {
    number: '01',
    icon: CapsuleMark,
    title: 'Cadastre seu medicamento',
    copy: 'Informe o nome, a dose e a frequência.',
    image: '/images/step-register.png',
    alt: 'Cadastro de um novo medicamento',
  },
  {
    number: '02',
    icon: AlarmClock,
    title: 'Receba o alarme exato',
    copy: 'O Hora Certa avisa mesmo com o aplicativo fechado.',
    image: '/images/step-alarm.png',
    alt: 'Alarme do Hora Certa tocando',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Confirme ou adie',
    copy: 'Marque como tomado ou escolha adiar por 15 minutos.',
    image: '/images/step-confirm.png',
    alt: 'Confirmação de dose do Hora Certa',
  },
];

const faqItems = [
  {
    question: 'É seguro instalar o APK?',
    answer: 'Sim. O APK é disponibilizado pelo repositório oficial do Hora Certa no GitHub.',
  },
  {
    question: 'Funciona com o aplicativo fechado?',
    answer: 'Sim. Os alarmes exatos são agendados pelo Android e continuam ativos com o app fechado.',
  },
  {
    question: 'Os alarmes voltam após reiniciar o celular?',
    answer: 'Sim. O Hora Certa restaura automaticamente os próximos alarmes após a reinicialização.',
  },
  {
    question: 'Posso corrigir uma dose marcada por engano?',
    answer: 'Sim. Uma confirmação pode ser desfeita no histórico sem apagar o medicamento cadastrado.',
  },
];

function CapsuleMark({ className = '' }: { className?: string }) {
  return (
    <span className={`capsule-mark ${className}`} aria-hidden="true">
      <span />
    </span>
  );
}

function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <Image src={src} alt={alt} width={490} height={1080} sizes="(max-width: 720px) 270px, 340px" unoptimized />
    </div>
  );
}

function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span><Check aria-hidden="true" /></span>
      {children}
    </li>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const progressRingRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      if (progressNumberRef.current) progressNumberRef.current.textContent = '100%';
      progressRingRef.current?.style.setProperty('--progress', '100');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTimeline
        .from('.site-header', { y: -36, opacity: 0, duration: 0.75 })
        .from('.hero-copy > *', { x: -52, opacity: 0, duration: 0.75, stagger: 0.09 }, '-=0.35')
        .from('.hero-visual .phone', { y: 90, opacity: 0, duration: 0.9, stagger: 0.13 }, '-=0.7')
        .from('.benefit', { y: 30, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.4');

      gsap.to('.orbit-one', { rotate: '+=360', duration: 85, repeat: -1, ease: 'none' });
      gsap.to('.orbit-two', { rotate: '-=360', duration: 65, repeat: -1, ease: 'none' });
      gsap.to('.floating-capsule', { y: -14, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.clock-icon', { y: 12, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 65,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 82%', once: true },
        });
      });

      gsap.from('.step-card', {
        y: 80,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 76%', once: true },
      });

      gsap.to('.alarm-rings', { rotate: 360, duration: 20, repeat: -1, ease: 'none' });
      gsap.to('.alarm-phone', { y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      gsap.to('.routine-phone-calendar', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.routine-visual', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      });
      gsap.to('.routine-phone-history', {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: '.routine-visual', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      });

      const progress = { value: 0 };
      gsap.to(progress, {
        value: 100,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.progress-stage', start: 'top 72%', once: true },
        onUpdate: () => {
          const rounded = Math.round(progress.value);
          if (progressNumberRef.current) progressNumberRef.current.textContent = `${rounded}%`;
          progressRingRef.current?.style.setProperty('--progress', String(rounded));
        },
      });

      gsap.from('.permission-card', {
        y: 70,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.permissions-grid', start: 'top 78%', once: true },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef}>
      <section className="hero" id="inicio">
        <header className="site-header shell">
          <a className="brand" href="#inicio" aria-label="Hora Certa — início">
            <CapsuleMark />
            <span>Hora Certa</span>
          </a>

          <nav aria-label="Navegação principal">
            <a href="#recursos">Recursos</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="button button-small" href={downloadPath} download>
            <Download size={19} aria-hidden="true" />
            Baixar APK para Android
          </a>
        </header>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <h1>
              Seu remédio,
              <br />
              sempre na
              <br />
              hora certa<span>.</span>
            </h1>
            <p>Alarmes exatos, lembretes inteligentes e o controle da sua rotina em um só lugar.</p>

            <div className="hero-actions">
              <a className="button" href={downloadPath} download>
                <Download size={21} aria-hidden="true" />
                Baixar APK para Android
              </a>
              <a className="button button-secondary" href="#como-funciona">
                <Play size={20} fill="currentColor" aria-hidden="true" />
                Ver como funciona
              </a>
            </div>

            <span className="compatibility"><span aria-hidden="true">●</span> Android 8.0 ou superior</span>
          </div>

          <div className="hero-visual" aria-label="Telas do aplicativo Hora Certa">
            <span className="hero-blob blob-one" aria-hidden="true" />
            <span className="hero-blob blob-two" aria-hidden="true" />
            <span className="orbit orbit-one" aria-hidden="true" />
            <span className="orbit orbit-two" aria-hidden="true" />
            <span className="floating-icon clock-icon" aria-hidden="true"><AlarmClock /></span>
            <CapsuleMark className="floating-capsule" />
            <Phone src="/images/hero-confirm.png" alt="Tela de confirmação de dose" className="phone-left" />
            <Phone src="/images/hero-calendar.png" alt="Calendário de medicamentos" className="phone-center" />
            <Phone src="/images/hero-progress.png" alt="Tela de progresso" className="phone-right" />
          </div>
        </div>

        <div className="benefit-strip shell" id="recursos">
          {benefits.map(({ icon: Icon, title, copy, accent }) => (
            <article className="benefit" key={title}>
              <span className={`benefit-icon ${accent ?? ''}`}><Icon aria-hidden="true" /></span>
              <div><h2>{title}</h2><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section section" id="como-funciona">
        <div className="shell">
          <div className="section-heading heading-left" data-reveal>
            <span className="eyebrow">COMO FUNCIONA</span>
            <h2>Simples de configurar.<br />Difícil de esquecer<span>.</span></h2>
          </div>

          <div className="steps-grid">
            {steps.map(({ number, icon: StepIcon, title, copy, image, alt }) => (
              <article className="step-card" key={number}>
                <div className="step-meta">
                  <strong>{number}</strong>
                  <span className="step-icon">
                    {number === '01' ? <CapsuleMark /> : <StepIcon aria-hidden="true" />}
                  </span>
                </div>
                <div className="step-device">
                  <Phone src={image} alt={alt} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="alarm-feature shell" data-reveal>
          <div className="alarm-copy">
            <span className="eyebrow eyebrow-light">LEMBRETES INTELIGENTES</span>
            <h2>O alarme continua com você até a dose ser confirmada<span>.</span></h2>
            <p>Se você não confirmar, o lembrete volta automaticamente em <strong>15 minutos.</strong></p>
            <ul className="feature-pills">
              <li><Smartphone aria-hidden="true" /> Alarme em tela cheia</li>
              <li><RotateCcw aria-hidden="true" /> Soneca automática</li>
              <li><History aria-hidden="true" /> Confirmação reversível</li>
            </ul>
          </div>
          <div className="alarm-visual">
            <span className="alarm-rings" aria-hidden="true" />
            <Phone src="/images/step-alarm.png" alt="Alarme em tela cheia" className="alarm-phone" />
            <span className="snooze-badge"><strong>15</strong><small>min</small></span>
          </div>
        </div>
      </section>

      <section className="routine-section section">
        <div className="routine-grid shell">
          <div className="routine-copy" data-reveal>
            <span className="eyebrow">CONTROLE DA ROTINA</span>
            <h2>Sua rotina em um só lugar<span>.</span></h2>
            <p>Visualize cada dose por dia, consulte o histórico e corrija confirmações acidentais.</p>
            <ul className="checklist">
              <ChecklistItem>Calendário diário</ChecklistItem>
              <ChecklistItem>Histórico completo</ChecklistItem>
              <ChecklistItem>Confirmação que pode ser desfeita</ChecklistItem>
            </ul>
          </div>

          <div className="routine-visual" data-reveal>
            <span className="routine-blob" aria-hidden="true" />
            <Phone src="/images/hero-calendar.png" alt="Calendário diário" className="routine-phone-calendar" />
            <Phone src="/images/feature-history.png" alt="Histórico completo" className="routine-phone-history" />
            <span className="status-chip taken"><Check aria-hidden="true" /> Tomado</span>
            <span className="status-chip pending">Pendente</span>
            <span className="status-chip lost"><Minus aria-hidden="true" /> Perdido</span>
          </div>
        </div>

        <div className="progress-stage" id="progresso">
          <div className="progress-grid shell">
            <div className="progress-hero-number" aria-label="Progresso de zero a cem por cento">
              <span ref={progressNumberRef}>0%</span>
              <Phone src="/images/hero-progress.png" alt="Tela de progresso do aplicativo" className="progress-phone" />
            </div>

            <div className="progress-content" data-reveal>
              <h2>Progresso que você consegue ver<span>.</span></h2>
              <p>Acompanhe sua adesão, mantenha sua sequência e entenda sua rotina ao longo dos dias.</p>

              <div className="progress-dashboard">
                <article className="streak-card">
                  <span><Star fill="currentColor" aria-hidden="true" /> Dias seguidos</span>
                  <strong>0 dias</strong>
                  <small>Sem perder nenhuma dose</small>
                </article>
                <article className="adherence-card">
                  <div>
                    <span>Adesão no período</span>
                    <strong>100%</strong>
                  </div>
                  <div className="progress-ring" ref={progressRingRef} aria-hidden="true"><span /></div>
                </article>
                <article className="week-card">
                  <strong>Últimos 7 dias</strong>
                  <div className="week-days" aria-label="Sete dias concluídos">
                    {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
                      <span key={`${day}-${index}`}><b>{day}</b><i /></span>
                    ))}
                  </div>
                </article>
                <div className="dose-stats">
                  <article><strong>7</strong><span>confirmadas</span></article>
                  <article><strong>0</strong><span>pendentes</span></article>
                  <article><strong>0</strong><span>perdidas</span></article>
                </div>
              </div>
              <p className="progress-caption"><AlarmClock aria-hidden="true" /> Cada dose confirmada <strong>conta.</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section section">
        <div className="shell">
          <div className="section-heading heading-center" data-reveal>
            <span className="eyebrow">TRANSPARÊNCIA</span>
            <h2>Feito para funcionar<br />quando importa<span>.</span></h2>
            <p>O Hora Certa explica cada permissão antes de pedir acesso.</p>
          </div>

          <div className="permissions-grid">
            <article className="permission-card permission-blue">
              <div className="permission-media"><Image src="/images/permission-exact.png" alt="Explicação da permissão de alarmes exatos" width={490} height={1080} sizes="(max-width: 720px) 90vw, 31vw" unoptimized /></div>
              <span className="permission-icon"><AlarmClock aria-hidden="true" /></span>
              <h3>Alarmes exatos</h3>
              <p>Disparam no horário programado.</p>
            </article>
            <article className="permission-card permission-orange">
              <div className="permission-media"><Image src="/images/permission-notifications.png" alt="Explicação da permissão de notificações" width={490} height={1080} sizes="(max-width: 720px) 90vw, 31vw" unoptimized /></div>
              <span className="permission-icon"><Bell aria-hidden="true" /></span>
              <h3>Notificações</h3>
              <p>Mantêm você informado sobre cada dose.</p>
            </article>
            <article className="permission-card permission-coral">
              <div className="permission-media"><Image src="/images/permission-lock.png" alt="Alarme visível na tela bloqueada" width={490} height={1080} sizes="(max-width: 720px) 90vw, 31vw" unoptimized /></div>
              <span className="permission-icon"><LockKeyhole aria-hidden="true" /></span>
              <h3>Tela bloqueada</h3>
              <p>Mostra o alarme mesmo com o celular bloqueado.</p>
            </article>
          </div>

          <div className="install-band" data-reveal>
            <h2>Baixe e instale em poucos passos.</h2>
            <div className="install-steps">
              <article><span className="install-number">1</span><span className="install-icon"><Download /></span><h3>Baixe o APK</h3><p>Toque no botão de download para salvar o arquivo.</p></article>
              <article><span className="install-number">2</span><span className="install-icon"><ShieldCheck /></span><h3>Autorize a instalação</h3><p>Permita a instalação de aplicativos desta fonte.</p></article>
              <article><span className="install-number">3</span><span className="install-icon"><CapsuleMark /></span><h3>Abra o Hora Certa</h3><p>Encontre o aplicativo e comece sua rotina.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section" id="duvidas">
        <div className="faq-grid shell">
          <div className="faq-heading" data-reveal>
            <span className="eyebrow">PERGUNTAS FREQUENTES</span>
            <h2>Dúvidas antes de instalar<span>?</span></h2>
            <p>Respostas rápidas para você instalar com confiança e segurança.</p>
            <div className="faq-art" aria-hidden="true"><AlarmClock /><CapsuleMark /></div>
          </div>

          <div className="faq-list" data-reveal>
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span>{item.question}</span>
                    {isOpen ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
                  </button>
                  <div className="faq-answer"><p>{item.answer}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="download-section shell" data-reveal>
        <div className="download-copy">
          <h2>Comece hoje a cuidar<br />melhor da sua rotina.</h2>
          <p>Baixe o Hora Certa e mantenha seus medicamentos sempre à vista.</p>
          <a className="button button-light" href={downloadPath} download><Download aria-hidden="true" /> Baixar APK para Android</a>
          <small>Android 8.0 ou superior</small>
        </div>
        <div className="download-art" aria-hidden="true"><span className="cta-orbit" /><CapsuleMark /><AlarmClock /><Bell /><LockKeyhole /></div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div><a className="brand brand-light" href="#inicio"><CapsuleMark /><span>Hora Certa</span></a><p>Hora Certa — lembretes de medicamentos para Android.</p></div>
          <nav aria-label="Links do rodapé"><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a><a href="https://github.com/ThiagoVenturaV/HoraCerta-Android" rel="noreferrer">Código-fonte</a></nav>
        </div>
      </footer>
    </main>
  );
}
