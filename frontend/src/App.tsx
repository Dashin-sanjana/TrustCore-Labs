import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Facebook,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
  Youtube,
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
    'Custom Software Development',
    'Web & Mobile Development',
    'ERP & Business Solutions',
    'Digital Marketing',
  ],
};

const navItems = ['Work', 'Services', 'Process', 'FAQ', 'Contact'];

const serviceCards = [
  {
    icon: Braces,
    title: 'Custom Software Development',
    text: 'Business-specific software, enterprise applications, workflow systems, and custom platforms shaped around your operations.',
  },
  {
    icon: Globe2,
    title: 'Web & Mobile Development',
    text: 'Modern, secure websites, web applications, portals, and iOS or Android mobile applications built for real users.',
  },
  {
    icon: Blocks,
    title: 'ERP & Business Solutions',
    text: 'ERP, CRM, POS, HRM, inventory, finance, and other customized business management systems for growing teams.',
  },
  {
    icon: ShieldCheck,
    title: 'Digital Marketing',
    text: 'Digital strategy, social media marketing, online brand promotion, and campaigns that grow your online presence.',
  },
];

const portfolio = [
  'Business portals',
  'ERP systems',
  'Mobile apps',
  'CRM platforms',
  'POS systems',
  'Brand campaigns',
];

const projectTypes = [
  ['Business Platform', 'Custom dashboards, portals, workflows, and internal tools for daily operations.'],
  ['Retail & POS', 'Inventory, billing, customer records, and branch-friendly business management.'],
  ['Mobile Experience', 'iOS and Android apps shaped for booking, ordering, field teams, and customers.'],
  ['Growth Presence', 'Websites, social channels, campaigns, and digital brand launches.'],
];

const process = [
  ['01', 'Discovery', 'Map the product, users, constraints, risks, and launch shape.'],
  ['02', 'Prototype', 'Turn the core journey into a clickable, testable interface.'],
  ['03', 'Build', 'Ship React, Nest, data, integrations, and secure deployment paths.'],
  ['04', 'Scale', 'Measure, optimize, automate, and evolve the platform after launch.'],
];

const faqs = [
  ['Can you build a full business system?', 'Yes. TrustCore Labs can shape custom software, ERP, CRM, POS, HRM, inventory, finance, and connected web or mobile portals around the business workflow.'],
  ['Do you handle both design and development?', 'Yes. The work can cover interface design, frontend, backend, deployment, and launch support so the product feels consistent end to end.'],
  ['Can marketing be included with software work?', 'Yes. Digital marketing, social media, brand promotion, and campaigns can be planned beside the product so launch and growth move together.'],
];

const contactEmail = 'hello@trustcorelabs.com';

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/trustcorelabs', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com/trustcorelabs', icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/trustcorelabs', icon: Linkedin },
  { label: 'YouTube', href: 'https://youtube.com/@trustcorelabs', icon: Youtube },
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
      <div className="cyber-grid" />
      <motion.div className="ambient ambient-one" style={{ y: glowY }} />
      <motion.div className="ambient ambient-two" style={{ y: heroY }} />
      <motion.div className="ambient ambient-three" style={{ y: glowY }} />

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
              Built for you. Secured by us.
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {company.name}
            </motion.h1>
            <motion.p className="hero-text" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              {company.tagline} We create custom software, websites, mobile apps, ERP systems, and digital campaigns with sharp design and security-minded delivery.
            </motion.p>
            <motion.div className="hero-proof" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span>
                <ShieldCheck size={16} />
                Built for you
              </span>
              <span>
                <LockKeyhole size={16} />
                Secured by us
              </span>
              <span>
                <Layers3 size={16} />
                Shipped as one system
              </span>
            </motion.div>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <a className="primary-button" href="#services">
                Explore services
                <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="#contact">
                Talk to us
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img className="hero-logo" src="/trustcore-logo.jpg" alt="TrustCore Labs logo" />
            <div className="logo-halo" />
            <div className="scan-beam" />
            <div className="orbit orbit-large" />
            <div className="orbit orbit-small" />
            <div className="signal-card main-signal">
              <LockKeyhole size={36} />
              <span>Core secured</span>
            </div>
            <div className="node node-a" />
            <div className="node node-b" />
            <div className="node node-c" />
            <div className="signal-card signal-a">
              <Globe2 size={24} />
              <span>Web Apps</span>
            </div>
            <div className="signal-card signal-b">
              <Blocks size={24} />
              <span>ERP Systems</span>
            </div>
            <div className="signal-card signal-c">
              <Layers3 size={24} />
              <span>Growth Stack</span>
            </div>
          </motion.div>
        </section>

        <section className="agency-intro">
          <motion.div className="intro-copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <p className="eyebrow">Digital partner</p>
            <h2>Stylish design, useful systems, and marketing that moves together.</h2>
            <p>
              TrustCore Labs helps businesses move from scattered tools to one polished digital presence: the software that runs the work, the apps that serve customers, and the campaigns that bring attention.
            </p>
          </motion.div>
          <motion.div className="keyword-stack" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <span>SOFTWARE.</span>
            <span>ERP.</span>
            <span>MOBILE.</span>
            <span>MARKETING.</span>
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

        <section className="work-band" id="work">
          <div className="section-heading">
            <p className="eyebrow">Work</p>
            <h2>Project directions we can shape for your business.</h2>
          </div>
          <div className="project-grid">
            {projectTypes.map(([title, text], index) => (
              <motion.article
                className="project-card"
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06 }}
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-band" id="services">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Builds that move from idea to trusted product.</h2>
          </div>
          <motion.div className="lab-console" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <span className="console-dot" />
              <p>Software, mobile, ERP, and marketing work together as one practical growth system for your business.</p>
            <span className="console-status">Business ready</span>
          </motion.div>
          <div className="service-lanes">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  className="service-card service-lane"
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <span>0{index + 1}</span>
                  <div className="service-icon">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <ArrowUpRight size={24} />
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

        <section className="trust-band">
          <motion.div className="trust-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <MessageCircle size={30} />
            <p>
              “Every project should feel clear for the business owner: what we are building, why it matters, and how it helps the company grow.”
            </p>
            <span>TrustCore Labs delivery approach</span>
          </motion.div>
          <motion.div className="trust-card accent" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.08 }}>
            <Sparkles size={30} />
            <p>More solutions for the uniqueness of your business.</p>
            <a href="#contact">Discuss the project</a>
          </motion.div>
        </section>

        <section className="faq-band" id="faq">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Questions businesses usually ask first.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <motion.article className="faq-item" key={question} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.05 }}>
                <CircleHelp size={22} />
                <div>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact">
          <motion.div className="contact-panel" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }}>
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Ready to shape the next secure product?</h2>
              <p>Use these sample contact links for now. We can replace them with the real TrustCore Labs profiles anytime.</p>
            </div>
            <div className="contact-links" aria-label="Temporary contact links">
              <a className="primary-button light contact-email" href={`mailto:${contactEmail}`}>
                <Mail size={18} />
                {contactEmail}
                <Sparkles size={18} />
              </a>
              <div className="social-row">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`TrustCore Labs ${social.label}`}>
                      <Icon size={20} />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-glow" />
        <div className="footer-shell">
          <div className="footer-brand">
            <a className="footer-logo" href="#top" aria-label="TrustCore Labs home">
              <img src="/trustcore-logo.jpg" alt="" />
              <span>{company.name}</span>
            </a>
            <p>
              Secure digital products, business systems, mobile experiences, and growth campaigns built with clarity from idea to launch.
            </p>
            <a className="footer-mail" href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              {contactEmail}
            </a>
          </div>

          <div className="footer-links">
            <div>
              <span>Company</span>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>
            <div>
              <span>Services</span>
              {serviceCards.map((service) => (
                <a key={service.title} href="#services">
                  {service.title}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-action">
            <p className="eyebrow">Built for you. Secured by us.</p>
            <h2>Let's build something trusted.</h2>
            <a className="primary-button footer-cta" href="#contact">
              Start a project
              <ArrowUpRight size={18} />
            </a>
            <div className="footer-socials" aria-label="TrustCore Labs social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`TrustCore Labs ${social.label}`}>
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} TrustCore Labs. All rights reserved.</span>
          <span>Custom software | Web & mobile | ERP | Digital marketing</span>
        </div>
      </footer>
    </div>
  );
}

export { App };
