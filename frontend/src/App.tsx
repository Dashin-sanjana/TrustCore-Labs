import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Blocks,
  Bot,
  Braces,
  Check,
  ChevronRight,
  Cpu,
  DatabaseZap,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

type Metric = {
  label: string;
  value: string;
};

type Company = {
  name: string;
  tagline: string;
  metrics: Metric[];
  services: string[];
};

const fallbackCompany: Company = {
  name: 'TrustCore Labs',
  tagline: 'Secure digital products for ambitious teams.',
  metrics: [
    { label: 'Delivery Pods', value: '04' },
    { label: 'Security Layers', value: '9+' },
    { label: 'Launch Rhythm', value: '30d' },
  ],
  services: [
    'React product interfaces',
    'Nest API platforms',
    'AI workflow automation',
    'Blockchain integrations',
    'CRM and SaaS systems',
    'Security-first cloud builds',
  ],
};

const navItems = ['Services', 'Process', 'Technologies', 'Contact'];

const serviceCards = [
  {
    icon: Braces,
    title: 'Product Engineering',
    text: 'React frontends, Nest APIs, admin portals, dashboards, and SaaS surfaces built for launch velocity.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Architecture',
    text: 'Threat-aware platform design, identity flows, API hardening, audit trails, and cloud deployment reviews.',
  },
  {
    icon: Bot,
    title: 'AI Automation',
    text: 'Workflow copilots, document intelligence, lead routing, content operations, and internal AI tools.',
  },
  {
    icon: Blocks,
    title: 'Blockchain Systems',
    text: 'Wallet flows, token-aware product layers, smart-contract integrations, and trusted transaction UX.',
  },
];

const portfolio = [
  'AI SaaS Console',
  'Fintech Risk Hub',
  'Secure CRM',
  'Web3 Launchpad',
  'Ops Automation',
  'Cloud Portal',
];

const technologies = [
  ['React', 'Next.js', 'Framer Motion', 'TypeScript'],
  ['NestJS', 'Node.js', 'PostgreSQL', 'Redis'],
  ['OpenAI', 'Vector Search', 'Workers', 'AWS'],
  ['Blockchain', 'Wallets', 'Smart Contracts', 'Audits'],
];

const process = [
  ['01', 'Discovery', 'Map the product, users, constraints, risks, and launch shape.'],
  ['02', 'Prototype', 'Turn the core journey into a clickable, testable interface.'],
  ['03', 'Build', 'Ship React, Nest, data, integrations, and secure deployment paths.'],
  ['04', 'Scale', 'Measure, optimize, automate, and evolve the platform after launch.'],
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

function App() {
  const [company, setCompany] = useState<Company>(fallbackCompany);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -120]);
  const glowY = useTransform(scrollYProgress, [0, 0.45], [0, 90]);

  useEffect(() => {
    fetch('/api/company')
      .then((response) => (response.ok ? response.json() : fallbackCompany))
      .then(setCompany)
      .catch(() => setCompany(fallbackCompany));
  }, []);

  const marqueeItems = useMemo(() => [...portfolio, ...portfolio], []);

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="noise" />
      <motion.div className="ambient ambient-one" style={{ y: glowY }} />
      <motion.div className="ambient ambient-two" style={{ y: heroY }} />

      <header className="nav">
        <a className="brand" href="#top" aria-label="TrustCore Labs home">
          <span className="brand-mark">
            <img src="/trustcore-logo.jpg" alt="" />
          </span>
          <span>{company.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Start a build
          <ArrowUpRight size={17} />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <motion.div className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </motion.div>
      )}

      <main id="top">
        <section className="hero section-grid">
          <motion.div className="hero-copy" style={{ y: heroY }}>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              React frontend. Nest backend. Security at the core.
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {company.name}
            </motion.h1>
            <motion.p className="hero-text" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              {company.tagline} We design and engineer AI, SaaS, CRM, blockchain, and cloud products with the polish of a studio and the discipline of a security team.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <a className="primary-button" href="#services">
                Explore services
                <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="#technologies">
                View stack
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img className="hero-logo" src="/trustcore-logo.jpg" alt="TrustCore Labs logo" />
            <div className="orbit orbit-large" />
            <div className="orbit orbit-small" />
            <div className="signal-card main-signal">
              <LockKeyhole size={36} />
              <span>Core secured</span>
            </div>
            <div className="signal-card signal-a">
              <Cpu size={24} />
              <span>AI Ops</span>
            </div>
            <div className="signal-card signal-b">
              <DatabaseZap size={24} />
              <span>API Mesh</span>
            </div>
            <div className="signal-card signal-c">
              <Globe2 size={24} />
              <span>Cloud Edge</span>
            </div>
          </motion.div>
        </section>

        <section className="metric-strip" aria-label="Company metrics">
          {company.metrics.map((metric) => (
            <motion.div className="metric" key={metric.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </motion.div>
          ))}
        </section>

        <section className="marquee-section" aria-label="Portfolio categories">
          <div className="marquee-track">
            {marqueeItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="content-band" id="services">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Builds that move from idea to trusted product.</h2>
          </div>
          <div className="services-grid">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  className="service-card"
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Icon size={28} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span>0{index + 1}</span>
                </motion.article>
              );
            })}
          </div>
          <div className="capability-row">
            {company.services.map((service) => (
              <span key={service}>
                <Check size={15} />
                {service}
              </span>
            ))}
          </div>
        </section>

        <section className="split-band" id="process">
          <div className="sticky-copy">
            <p className="eyebrow">Process</p>
            <h2>Designed for momentum, engineered for confidence.</h2>
            <p>
              TrustCore Labs keeps strategy, interface, backend, and deployment in one build rhythm, so the product feels cohesive from first prototype to production.
            </p>
          </div>
          <div className="process-list">
            {process.map(([number, title, text]) => (
              <motion.article className="process-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="tech-band" id="technologies">
          <div className="section-heading wide">
            <p className="eyebrow">Technologies</p>
            <h2>React on the surface, Nest at the core, automation across the system.</h2>
          </div>
          <div className="tech-grid">
            {technologies.map((group, index) => (
              <motion.div className="tech-column" key={group[0]} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.07 }}>
                <span>{['Frontend', 'Backend', 'AI + Cloud', 'Web3'][index]}</span>
                {group.map((tech) => (
                  <p key={tech}>{tech}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact">
          <motion.div className="contact-panel" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }}>
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Ready to shape the next secure product?</h2>
            </div>
            <a className="primary-button light" href="mailto:hello@trustcorelabs.com">
              hello@trustcorelabs.com
              <Sparkles size={18} />
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export { App };
