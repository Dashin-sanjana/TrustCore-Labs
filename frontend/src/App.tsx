import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Cpu,
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
import { ParticleBackground } from './ParticleBackground';

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

type RoutePath = '/' | '/about' | '/work' | '/services' | '/process' | '/faq' | '/contact';

const fallbackCompany: Company = {
  name: 'TrustCore Labs',
  tagline: 'Growth-focused software teams for ambitious businesses.',
  metrics: [
    { label: 'Core service lines', value: '04' },
    { label: 'Live project portfolio', value: '5+' },
    { label: 'Team extension mindset', value: '1' },
  ],
  services: [
    'Custom Software Development',
    'Web & Mobile Development',
    'ERP & Business Solutions',
    'Digital Marketing',
  ],
};

const navItems: { label: string; path: RoutePath }[] = [
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'Process', path: '/process' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

const pageCards = [
  {
    path: '/about' as RoutePath,
    eyebrow: 'Company',
    title: 'About TrustCore Labs',
    text: 'Meet the team model, standards, and delivery approach behind each build.',
    icon: ShieldCheck,
  },
  {
    path: '/work' as RoutePath,
    eyebrow: 'Portfolio',
    title: 'Recent Work',
    text: 'Browse public projects, outcomes, scopes, and business categories.',
    icon: Globe2,
  },
  {
    path: '/services' as RoutePath,
    eyebrow: 'Capabilities',
    title: 'Services',
    text: 'Explore software, web, mobile, ERP, business systems, and growth support.',
    icon: Cpu,
  },
  {
    path: '/process' as RoutePath,
    eyebrow: 'Delivery',
    title: 'Process',
    text: 'See how ideas move from business problem to working product release.',
    icon: Layers3,
  },
  {
    path: '/faq' as RoutePath,
    eyebrow: 'Answers',
    title: 'FAQ',
    text: 'Get quick answers about scope, marketing, systems, and project estimates.',
    icon: CircleHelp,
  },
  {
    path: '/contact' as RoutePath,
    eyebrow: 'Start',
    title: 'Contact',
    text: 'Send the project idea, timeline, business context, and reference direction.',
    icon: Mail,
  },
];

const serviceCards = [
  {
    icon: Braces,
    title: 'Product & Software Engineering',
    text: 'Custom platforms, workflow systems, SaaS products, portals, and enterprise applications shaped around your business operations.',
  },
  {
    icon: Globe2,
    title: 'Web & Mobile Solutions',
    text: 'Modern websites, web applications, booking flows, customer portals, and iOS or Android applications built for real users.',
  },
  {
    icon: Blocks,
    title: 'ERP & Business Systems',
    text: 'ERP, CRM, POS, HRM, inventory, finance, and customized management systems that make daily operations easier to run.',
  },
  {
    icon: ShieldCheck,
    title: 'Digital Growth & Support',
    text: 'Digital strategy, social media marketing, brand promotion, launch support, and maintenance that keep the business moving.',
  },
];

const portfolio = [
  'Dash Fashion',
  'New Zealankanz',
  'Fatbis',
  'Focus Fitness',
  'Togo and Friends',
  'Business portals',
  'ERP systems',
  'Mobile apps',
  'CRM platforms',
  'POS systems',
  'Brand campaigns',
];

const featuredProjects = [
  {
    name: 'Dash Fashion',
    type: 'Retail launch',
    text: 'A fashion storefront shaped around browsing, brand confidence, and easy customer engagement.',
    result: 'Commerce presence',
    scope: 'Frontend, product flow, visual system',
    href: 'https://dash-fashion-ruby.vercel.app',
  },
  {
    name: 'New Zealankanz',
    type: 'Service platform',
    text: 'A business web experience built for service discovery, structured listings, and stronger digital reach.',
    result: 'Public platform',
    scope: 'Web app, content flow, launch support',
    href: 'https://new-zealankanz-frontend.vercel.app',
  },
  {
    name: 'Fatbis',
    type: 'Food business website',
    text: 'A lively web presence shaped for product discovery, customer interest, and brand visibility.',
    result: 'Brand website',
    scope: 'Website experience, visual presentation, launch support',
    href: 'https://fatbis.net/',
  },
  {
    name: 'Focus Fitness',
    type: 'Fitness web experience',
    text: 'A sharp fitness-focused website built around motivation, service clarity, and conversion.',
    result: 'Fitness presence',
    scope: 'Frontend experience, responsive layout, content flow',
    href: 'https://focusfitness.waveloop.dev/',
  },
  {
    name: 'Togo and Friends',
    type: 'Community brand platform',
    text: 'A playful public website shaped for storytelling, browsing, and audience connection.',
    result: 'Public website',
    scope: 'Brand storytelling, web pages, user journey',
    href: 'https://togoandfriends.com/home',
  },
];

const projectTypes = [
  ['Business Platform', 'Custom dashboards, portals, workflows, and internal tools for daily operations.'],
  ['Retail & POS', 'Inventory, billing, customer records, and branch-friendly business management.'],
  ['Mobile Experience', 'iOS and Android apps shaped for booking, ordering, field teams, and customers.'],
  ['Growth Presence', 'Websites, social channels, campaigns, and digital brand launches.'],
];

const serviceDetails = [
  ['Discovery & Product Planning', 'Requirements, user journeys, launch priorities, data flow, and a practical delivery roadmap.'],
  ['Interface Design', 'Responsive web and mobile screens that make services, dashboards, and workflows easy to understand.'],
  ['Frontend Engineering', 'React experiences, portals, customer journeys, landing pages, dashboards, and admin surfaces.'],
  ['Backend & API Development', 'Nest APIs, authentication, business logic, integrations, and deployment-ready server architecture.'],
  ['Business System Modules', 'ERP, CRM, POS, HRM, inventory, finance, reporting, and role-based management tools.'],
  ['Launch & Growth Support', 'Content flow, campaign support, SEO foundations, maintenance, and practical post-launch iteration.'],
];

const industries = [
  ['Retail & ecommerce', 'Product discovery, catalog flows, storefronts, POS, stock, and customer management.'],
  ['Service companies', 'Booking, inquiry, listings, CRM, staff workflows, and public service pages.'],
  ['Fitness & wellness', 'Membership experiences, program discovery, lead capture, and operational dashboards.'],
  ['Food & local brands', 'Brand websites, menus, product launches, marketing pages, and customer engagement.'],
];

const engagementModels = [
  ['Project build', 'A focused website, system, portal, or mobile release with a clear scope and launch path.'],
  ['Dedicated product pod', 'A compact team covering design, frontend, backend, QA thinking, and delivery coordination.'],
  ['Ongoing improvement', 'Post-launch feature work, fixes, marketing updates, performance improvements, and support.'],
];

const standards = [
  ['Responsive first', 'Layouts are planned for mobile, tablet, and desktop from the beginning.'],
  ['Security-aware', 'Authentication, admin access, data handling, and deployment details are considered early.'],
  ['Business-readable', 'Owners and operators can understand the roadmap, scope, and outcome without technical fog.'],
  ['Growth ready', 'The first release leaves room for new modules, integrations, and campaigns.'],
];

const process = [
  ['01', 'Listen', 'Understand how the business actually works before drawing screens or writing code.'],
  ['02', 'Assemble', 'Match the right design, frontend, backend, systems, and marketing skills to the work ahead.'],
  ['03', 'Build', 'Develop the interface, API, business logic, integrations, content, and launch setup in one rhythm.'],
  ['04', 'Scale', 'Improve performance, support, growth content, and next-phase features after the first release.'],
];

const platformCards = [
  {
    icon: Braces,
    title: 'Software foundation',
    text: 'Custom platforms, workflow systems, and business tools designed around the way your company works.',
  },
  {
    icon: Globe2,
    title: 'Digital experience',
    text: 'Websites, portals, and mobile journeys that make services easier to understand, trust, and use.',
  },
  {
    icon: Blocks,
    title: 'Business operations',
    text: 'ERP, CRM, POS, HRM, inventory, and finance systems connected into one clearer operating rhythm.',
  },
  {
    icon: ShieldCheck,
    title: 'Growth presence',
    text: 'Campaigns, social content, and online brand systems that help the product reach the right audience.',
  },
];

const trustReasons = [
  {
    icon: Layers3,
    title: 'A wide range of delivery skills',
    text: 'From product engineering and business systems to mobile apps and launch marketing, the work can stay connected under one direction.',
  },
  {
    icon: Check,
    title: 'Talent matched to the business',
    text: 'Each project is shaped around the real roles needed, whether that is design, frontend, backend, ERP thinking, or growth support.',
  },
  {
    icon: LockKeyhole,
    title: 'Security-aware foundations',
    text: 'Authentication, data handling, admin flows, and deployment details are planned early so the product feels trustworthy at launch.',
  },
  {
    icon: Sparkles,
    title: 'Built to scale after launch',
    text: 'Start with a focused product, then extend into new modules, channels, integrations, and support as the business grows.',
  },
];

const homeProof = [
  ['5+', 'live company projects'],
  ['4', 'core service lines'],
  ['1', 'connected delivery partner'],
];

const faqs = [
  ['Can you build a full business system?', 'Yes. TrustCore Labs can shape custom software, ERP, CRM, POS, HRM, inventory, finance, and connected web or mobile portals around the business workflow.'],
  ['Do you handle both design and development?', 'Yes. The work can cover interface design, frontend, backend, deployment, and launch support so the product feels consistent end to end.'],
  ['Can marketing be included with software work?', 'Yes. Digital marketing, social media, brand promotion, and campaigns can be planned beside the product so launch and growth move together.'],
  ['Can we start small first?', 'Yes. A first release can focus on the highest-value workflow or public page, then grow into more modules after launch.'],
  ['Do you work with existing businesses?', 'Yes. We can improve an existing website, rebuild a workflow, or add a new business system beside current operations.'],
  ['What do you need to estimate a project?', 'A short description of the business, the users, the required features, current tools, deadline, and any examples you like is enough to begin the conversation.'],
];

const contactEmail = 'trustcorelabs@gmail.com';
const siteUrl = 'https://www.trustcorelabs.com';
const defaultSeoImage = `${siteUrl}/trustcore-logo.jpg`;

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

const revealSequence = {
  hidden: {},
  show: {},
};

const textWipeReveal = {
  hidden: {
    opacity: 0,
    x: -24,
    clipPath: 'inset(0 100% 0 0)',
  },
  show: (order = 0) => ({
    opacity: 1,
    x: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.78,
      delay: 0.06 + order * 0.16,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const cardLiftReveal = {
  hidden: {
    opacity: 0,
    y: 64,
    rotateX: -12,
    scale: 0.94,
    clipPath: 'inset(100% 0 0 0 round 1rem)',
  },
  show: (order = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    clipPath: 'inset(0% 0 0 0 round 1rem)',
    transition: {
      duration: 0.82,
      delay: 0.06 + order * 0.14,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const routes: RoutePath[] = ['/', '/about', '/work', '/services', '/process', '/faq', '/contact'];

const routeSeo: Record<RoutePath, { title: string; description: string }> = {
  '/': {
    title: 'TrustCore Labs | Custom Software, Web, Mobile, ERP, and Growth',
    description:
      'TrustCore Labs designs and builds secure custom software, web and mobile apps, ERP systems, business platforms, and digital growth experiences.',
  },
  '/about': {
    title: 'About TrustCore Labs | Software Partner for Growing Businesses',
    description:
      'Learn how TrustCore Labs connects strategy, design, software engineering, business systems, and launch support into one practical delivery path.',
  },
  '/work': {
    title: 'TrustCore Labs Work | Software, Web, Mobile, and Business Platforms',
    description:
      'Explore TrustCore Labs project work across retail, service, fitness, food, community, web apps, mobile experiences, and business systems.',
  },
  '/services': {
    title: 'TrustCore Labs Services | Software, ERP, Web, Mobile, and Growth',
    description:
      'Explore TrustCore Labs services for custom software, web and mobile development, ERP and business systems, launch support, and digital growth.',
  },
  '/process': {
    title: 'TrustCore Labs Process | From Business Problem to Product Launch',
    description:
      'See how TrustCore Labs moves from discovery and product planning to design, engineering, launch, support, and scalable improvement.',
  },
  '/faq': {
    title: 'TrustCore Labs FAQ | Software Project Questions and Answers',
    description:
      'Find answers about TrustCore Labs software builds, design and development, marketing support, business systems, timelines, and project estimates.',
  },
  '/contact': {
    title: 'Contact TrustCore Labs | Start a Software or Digital Product Build',
    description:
      'Contact TrustCore Labs to discuss a website, software platform, ERP system, CRM, POS, mobile app, or digital growth project.',
  },
};

function getCurrentRoute(): RoutePath {
  const path = window.location.pathname as RoutePath;
  return routes.includes(path) ? path : '/';
}

function setMetaTag(selector: string, attribute: 'content' | 'href', value: string) {
  const element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

function AnimatedMetricValue({ value, active, reduceMotion }: { value: string; active: boolean; reduceMotion: boolean }) {
  const numericText = value.match(/\d+/)?.[0] ?? '0';
  const target = Number(numericText);
  const suffix = value.slice(value.indexOf(numericText) + numericText.length);
  const currentValue = useRef(reduceMotion ? target : 0);
  const [displayValue, setDisplayValue] = useState(currentValue.current);

  useEffect(() => {
    const endValue = reduceMotion || active ? target : 0;
    const startValue = currentValue.current;

    if (startValue === endValue) {
      setDisplayValue(endValue);
      return undefined;
    }

    const duration = active ? 950 : 480;
    let frameId = 0;
    let startTime: number | null = null;

    const updateCount = (time: number) => {
      if (startTime === null) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = active
        ? 1 - Math.pow(1 - progress, 3)
        : progress * progress;
      const nextValue = Math.round(startValue + (endValue - startValue) * easedProgress);

      currentValue.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateCount);
      }
    };

    frameId = window.requestAnimationFrame(updateCount);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, reduceMotion, target]);

  return (
    <span>
      {String(displayValue).padStart(numericText.length, '0')}
      {suffix}
    </span>
  );
}

function InteractiveCursor() {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: -120, y: -120 });
  const follower = useRef({ x: -120, y: -120 });
  const frame = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseCustomCursor || prefersReducedMotion) {
      return undefined;
    }

    const moveCursor = () => {
      follower.current.x += (target.current.x - follower.current.x) * 0.18;
      follower.current.y += (target.current.y - follower.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0)`;
      }

      frame.current = window.requestAnimationFrame(moveCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      setVisible(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      setInteractive(Boolean(targetElement?.closest('a, button, input, textarea, select, [role="button"]')));
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setInteractive(false);
      setPressed(false);
    };
    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);

    frame.current = window.requestAnimationFrame(moveCursor);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      className={[
        'interactive-cursor',
        visible ? 'is-visible' : '',
        interactive ? 'is-interactive' : '',
        pressed ? 'is-pressed' : '',
      ].join(' ')}
      aria-hidden="true"
    >
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}

function App() {
  const [company, setCompany] = useState<Company>(fallbackCompany);
  const [menuOpen, setMenuOpen] = useState(false);
  const [metricsActive, setMetricsActive] = useState(false);
  const [route, setRoute] = useState<RoutePath>(() => getCurrentRoute());
  const agencyIntroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: sectionSwapProgress } = useScroll({
    target: agencyIntroRef,
    offset: ['start end', 'start 20%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -120]);
  const glowY = useTransform(scrollYProgress, [0, 0.45], [0, 90]);
  const heroSwapRotate = useTransform(sectionSwapProgress, [0, 0.5, 1], [0, -22, -90]);
  const heroSwapOpacity = useTransform(sectionSwapProgress, [0, 0.72, 1], [1, 0.92, 0]);
  const agencySwapRotate = useTransform(sectionSwapProgress, [0, 0.38, 1], [90, 72, 0]);
  const agencySwapOpacity = useTransform(sectionSwapProgress, [0, 0.28, 0.72, 1], [0, 0.08, 0.78, 1]);

  useEffect(() => {
    fetch('/api/company')
      .then((response) => (response.ok ? response.json() : fallbackCompany))
      .then(setCompany)
      .catch(() => setCompany(fallbackCompany));
  }, []);

  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute());
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  useEffect(() => {
    const metadata = routeSeo[route];
    const canonicalUrl = `${siteUrl}${route === '/' ? '/' : route}`;

    document.title = metadata.title;
    setMetaTag('meta[name="description"]', 'content', metadata.description);
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
    setMetaTag('meta[property="og:title"]', 'content', metadata.title);
    setMetaTag('meta[property="og:description"]', 'content', metadata.description);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'content', defaultSeoImage);
    setMetaTag('meta[name="twitter:title"]', 'content', metadata.title);
    setMetaTag('meta[name="twitter:description"]', 'content', metadata.description);
    setMetaTag('meta[name="twitter:image"]', 'content', defaultSeoImage);
  }, [route]);

  const navigateTo = (path: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setRoute(path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marqueeItems = useMemo(() => [...portfolio, ...portfolio], []);

  return (
    <div className="site-shell">
      <ParticleBackground />
      <InteractiveCursor />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="noise" />
      <div className="cyber-grid" />
      <motion.div className="ambient ambient-one" style={{ y: glowY }} />
      <motion.div className="ambient ambient-two" style={{ y: heroY }} />
      <motion.div className="ambient ambient-three" style={{ y: glowY }} />

      <header className="nav">
        <a className="brand" href="/" onClick={navigateTo('/')} aria-label="TrustCore Labs home">
          <span className="brand-mark">
            <img src="/faviconl.png" alt="" />
          </span>
          <span className="brand-wordmark" aria-hidden="true">
            <span className="brand-labs">Labs</span>
            <span className="brand-name">
              <span>Trust</span>
              <span>Core</span>
            </span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.path} href={item.path} onClick={navigateTo(item.path)} aria-current={route === item.path ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/contact" onClick={navigateTo('/contact')}>
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
            <a key={item.path} href={item.path} onClick={navigateTo(item.path)} aria-current={route === item.path ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </motion.div>
      )}

      <main className="page-main">
        {route === '/' && (
          <>
        <section className="hero section-grid">
          <motion.div
            className="hero-copy hero-swap-face"
            style={{
              y: heroY,
              rotateX: reduceMotion ? 0 : heroSwapRotate,
              opacity: reduceMotion ? 1 : heroSwapOpacity,
            }}
          >
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              Your growth, powered by practical tech teams.
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <span>Software that</span>
              <span>helps your</span>
              <span>business grow.</span>
            </motion.h1>
            <motion.p className="hero-text" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              {company.name} helps growing companies build custom software, websites, mobile apps, ERP workflows, and digital growth systems with one focused delivery partner.
            </motion.p>
            <motion.div className="hero-proof" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span>
                <ShieldCheck size={16} />
                Secure foundations
              </span>
              <span>
                <LockKeyhole size={16} />
                Matched delivery team
              </span>
              <span>
                <Layers3 size={16} />
                Scalable product flow
              </span>
            </motion.div>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
              <a className="primary-button" href="/services" onClick={navigateTo('/services')}>
                Build your team
                <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="/contact" onClick={navigateTo('/contact')}>
                Talk to us
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="story-window">
              <div className="window-bar">
                <span />
                <span />
                <span />
              </div>
              <img className="story-logo" src="/faviconl.png" alt="TrustCore Labs logo" />
              <div className="story-caption">
                <span>TrustCore Labs</span>
                <strong>Dedicated delivery shaped around your business.</strong>
              </div>
            </div>
            <div className="insight-card insight-main">
              <span>01</span>
              <strong>Team extension</strong>
              <p>We add the skills your in-house team needs to move faster.</p>
            </div>
            <div className="insight-card insight-side">
              <span>02</span>
              <strong>Full-stack build</strong>
              <p>Interfaces, APIs, systems, content, and launch work together.</p>
            </div>
            <div className="node node-a" />
            <div className="node node-b" />
            <div className="node node-c" />
            <div className="story-pill story-pill-a">Product teams</div>
            <div className="story-pill story-pill-b">ERP systems</div>
            <div className="story-pill story-pill-c">Growth support</div>
            <div className="story-thread">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        </section>

        <motion.section
          ref={agencyIntroRef}
          className="agency-intro agency-swap-face"
          style={{
            rotateX: reduceMotion ? 0 : agencySwapRotate,
            opacity: reduceMotion ? 1 : agencySwapOpacity,
          }}
        >
          <motion.div className="intro-copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <p className="eyebrow">Digital partner</p>
            <h2>Made like a studio. Delivered like an expert tech team.</h2>
            <p>
              TrustCore Labs helps businesses move from scattered tools to one polished digital presence. Strategy, product design, engineering, business systems, and launch support are shaped together so each release has a clear commercial purpose.
            </p>
          </motion.div>
          <motion.div className="studio-notes" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <div>
              <span>Delivery note</span>
              <p>Start with one specialist or a compact product pod, then scale when the work proves itself.</p>
            </div>
            <div>
              <span>Engineering note</span>
              <p>Clean interfaces, reliable APIs, business logic, and deployment are treated as one product.</p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="page-directory"
          aria-labelledby="page-directory-title"
          variants={revealSequence}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: false, amount: 0.12 }}
        >
          <motion.div className="section-heading story-heading" variants={revealSequence}>
            <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Explore</motion.p>
            <motion.h2 id="page-directory-title" custom={1} variants={textWipeReveal}>Explore TrustCore Labs by page.</motion.h2>
            <motion.p custom={2} variants={textWipeReveal}>Move through the company, work, services, process, answers, and contact details from one clean starting point.</motion.p>
          </motion.div>
          <motion.div className="page-card-grid" variants={revealSequence}>
            {pageCards.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.a
                  className="page-card"
                  key={page.path}
                  href={page.path}
                  onClick={navigateTo(page.path)}
                  custom={index + 3}
                  variants={cardLiftReveal}
                >
                  <span className="page-card-icon">
                    <Icon size={22} />
                  </span>
                  <span className="page-card-eyebrow">{page.eyebrow}</span>
                  <h3>{page.title}</h3>
                  <p>{page.text}</p>
                  <span className="page-card-link">
                    Open page
                    <ArrowUpRight size={17} />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          className="why-band"
          variants={revealSequence}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: false, amount: 0.16 }}
        >
          <motion.div className="section-heading story-heading" variants={revealSequence}>
            <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Why trust us</motion.p>
            <motion.h2 custom={1} variants={textWipeReveal}>Practical breadth with a team model that can grow.</motion.h2>
            <motion.p custom={2} variants={textWipeReveal}>Get the right delivery skills, a clearer build plan, and a software foundation that can keep improving after launch.</motion.p>
          </motion.div>
          <motion.div className="why-grid" variants={revealSequence}>
            {trustReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.article
                  className="why-card"
                  key={reason.title}
                  custom={index + 3}
                  variants={cardLiftReveal}
                >
                  <Icon size={28} />
                  <span>0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          className="metric-strip"
          aria-label="Company metrics"
          onViewportEnter={() => setMetricsActive(true)}
          onViewportLeave={() => setMetricsActive(false)}
          viewport={{ once: false, amount: 0.4 }}
        >
          {company.metrics.map((metric) => (
            <motion.div className="metric" key={metric.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <AnimatedMetricValue value={metric.value} active={metricsActive} reduceMotion={Boolean(reduceMotion)} />
              <p>{metric.label}</p>
            </motion.div>
          ))}
        </motion.section>

        <section className="platform-band">
          <motion.div className="platform-copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <p className="eyebrow">End-to-end expertise</p>
            <h2>Reliable digital foundations built around your needs.</h2>
            <p>
              We bring the public website, internal systems, mobile touchpoints, support flow, and growth channels into one planned product direction so the business can move with less friction.
            </p>
            <div className="proof-row" aria-label="TrustCore Labs proof points">
              {homeProof.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
          <div className="platform-grid">
            {platformCards.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.article
                  className="platform-card"
                  key={platform.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Icon size={28} />
                  <span>0{index + 1}</span>
                  <h3>{platform.title}</h3>
                  <p>{platform.text}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="marquee-section" aria-label="Portfolio categories">
          <div className="marquee-track">
            {marqueeItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>
          </>
        )}

        {route === '/about' && (
          <>
            <section className="page-hero about-hero page-section">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="eyebrow">About TrustCore Labs</p>
                <h1>Software partner for businesses that want to move cleaner.</h1>
                <p>
                  TrustCore Labs is built for companies that need practical technology without losing sight of the business. We connect strategy, design, software engineering, business systems, and launch support into one clear delivery path.
                </p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <ShieldCheck size={30} />
                <strong>{company.tagline}</strong>
                <span>Built around useful releases, clear communication, and systems that can grow after launch.</span>
              </motion.div>
            </section>

            <section className="content-band">
              <div className="section-heading story-heading">
                <p className="eyebrow">How we work</p>
                <h2>A compact team model for practical business outcomes.</h2>
                <p>We help owners and teams turn product ideas, manual workflows, and growth plans into software people can actually use.</p>
              </div>
              <div className="detail-grid three">
                {engagementModels.map(([title, text], index) => (
                  <motion.article className="detail-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.06 }}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band">
              <div className="section-heading">
                <p className="eyebrow">Standards</p>
                <h2>The parts we keep consistent across every build.</h2>
              </div>
              <div className="mini-grid">
                {standards.map(([title, text]) => (
                  <article className="mini-card" key={title}>
                    <Check size={18} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {route === '/work' && (
          <>
            <section className="page-hero work-hero page-section">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="eyebrow">Customer stories</p>
                <h1>Recent work with real business shape.</h1>
                <p>Each project is presented by context, role, and outcome so prospects can understand the work quickly.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <Globe2 size={30} />
                <strong>5+ live public projects</strong>
                <span>Retail, service, fitness, food, community, and business-platform work across web and operational systems.</span>
              </motion.div>
            </section>

            <section className="work-band" id="work">
              <div className="featured-projects">
                {featuredProjects.map((project, index) => (
                  <motion.a
                    className="featured-project"
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span className="project-number">0{index + 1}</span>
                    <div>
                      <p>{project.type}</p>
                      <h3>{project.name}</h3>
                      <small>{project.text}</small>
                    </div>
                    <dl>
                      <div>
                        <dt>Result</dt>
                        <dd>{project.result}</dd>
                      </div>
                      <div>
                        <dt>Scope</dt>
                        <dd>{project.scope}</dd>
                      </div>
                    </dl>
                    <ArrowUpRight size={24} />
                  </motion.a>
                ))}
              </div>
              <div className="section-heading project-directions-heading">
                <p className="eyebrow">What we build</p>
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
          </>
        )}

        {route === '/services' && (
          <>
            <section className="page-hero services-hero page-section">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="eyebrow">Services</p>
                <h1>Services that extend your team and accelerate delivery.</h1>
                <p>Choose a focused build or combine services into a full digital product team for your business.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <Cpu size={30} />
                <strong>Software, systems, mobile, and growth support.</strong>
                <span>One delivery flow from discovery to launch and post-release improvement.</span>
              </motion.div>
            </section>

            <section className="content-band" id="services">
              <motion.div className="lab-console" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
                <span className="console-dot" />
                <p>Software engineering, mobile, ERP, support, and digital growth work together as one practical delivery system.</p>
                <span className="console-status">Scale ready</span>
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

            <section className="content-band compact-band">
              <div className="section-heading story-heading">
                <p className="eyebrow">Capabilities</p>
                <h2>Everything needed to move from idea to operating product.</h2>
                <p>Use one capability for a focused need, or combine several into a complete product delivery path.</p>
              </div>
              <div className="detail-grid two">
                {serviceDetails.map(([title, text], index) => (
                  <motion.article className="detail-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.04 }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band">
              <div className="section-heading">
                <p className="eyebrow">Industries</p>
                <h2>Business categories we can support.</h2>
              </div>
              <div className="mini-grid">
                {industries.map(([title, text]) => (
                  <article className="mini-card" key={title}>
                    <Globe2 size={18} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {route === '/process' && (
          <>
        <section className="page-hero process-hero page-section">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="eyebrow">Process</p>
            <h1>Designed for momentum, engineered for scale.</h1>
            <p>Our process keeps the product vision, delivery team, business workflow, and launch plan connected from the first conversation.</p>
          </motion.div>
          <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
            <Layers3 size={30} />
            <strong>Clear scope. Focused build. Practical launch.</strong>
            <span>Each step is designed to reduce confusion and keep the work moving toward a usable release.</span>
          </motion.div>
        </section>

        <section className="split-band" id="process">
          <div className="sticky-copy">
            <p className="eyebrow">Delivery rhythm</p>
            <h2>From business problem to working product.</h2>
            <p>
              TrustCore Labs keeps strategy, interface, backend, deployment, and growth support in one build rhythm, so the product feels cohesive from first prototype to production.
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
              “Every project should feel clear for the business owner: what we are building, who is responsible, why it matters, and how it helps the company grow.”
            </p>
            <span>TrustCore Labs delivery approach</span>
          </motion.div>
          <motion.div className="trust-card accent" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.08 }}>
            <Sparkles size={30} />
            <p>Let’s map the team, technologies, and timeline your next release needs.</p>
            <a href="/contact" onClick={navigateTo('/contact')}>Discuss the project</a>
          </motion.div>
        </section>

        <section className="content-band compact-band">
          <div className="section-heading">
            <p className="eyebrow">What you get</p>
            <h2>A delivery path that keeps decisions visible.</h2>
          </div>
          <div className="detail-grid three">
            {[
              ['Product direction', 'A clear view of what should be built first, what can wait, and how each feature supports the business.'],
              ['Technical foundation', 'A practical architecture for frontend, backend, data, deployment, and future integrations.'],
              ['Launch support', 'Content, fixes, polish, and next-step improvements once real users begin using the product.'],
            ].map(([title, text], index) => (
              <motion.article className="detail-card" key={title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.06 }}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>
          </>
        )}

        {route === '/faq' && (
          <>
            <section className="page-hero faq-hero page-section">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="eyebrow">FAQ</p>
                <h1>Questions businesses usually ask first.</h1>
                <p>Clear answers before we talk scope, timeline, budget, or technology choices.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <CircleHelp size={30} />
                <strong>Start with the business problem.</strong>
                <span>The technical solution becomes easier once the workflow, users, and launch goal are clear.</span>
              </motion.div>
            </section>

            <section className="faq-band" id="faq">
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
          </>
        )}

        {route === '/contact' && (
          <>
            <section className="page-hero contact-hero page-section">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="eyebrow">Contact</p>
                <h1>Ready to map your team, technology, and timeline?</h1>
                <p>Tell us what you want to build, improve, or launch. We will help shape the right software, systems, and growth path for the business.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <Mail size={30} />
                <strong>Send the project idea.</strong>
                <span>Include your business type, the problem, preferred timeline, and any reference websites you like.</span>
              </motion.div>
            </section>

            <section className="contact-band" id="contact">
              <motion.div className="contact-panel" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }}>
                <div className="contact-copy">
                  <p className="eyebrow">Start a conversation</p>
                  <h2>Share the build you have in mind.</h2>
                  <p>We can begin with a website, business system, mobile app, ERP module, or a complete product delivery plan.</p>
                </div>
                <div className="contact-links" aria-label="TrustCore Labs contact links">
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

              <div className="mini-grid contact-prep">
                {[
                  ['Project type', 'Website, software platform, ERP, CRM, POS, mobile app, or digital growth support.'],
                  ['Business context', 'Who uses it, what currently feels slow, and what needs to improve first.'],
                  ['Timeline', 'Target launch date, urgent milestones, and whether the first release can be phased.'],
                  ['Reference style', 'Any websites, apps, or competitors that help explain the expected direction.'],
                ].map(([title, text]) => (
                  <article className="mini-card" key={title}>
                    <Check size={18} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-glow" />
        <div className="footer-shell">
          <div className="footer-brand">
            <a className="footer-logo" href="/" onClick={navigateTo('/')} aria-label="TrustCore Labs home">
              <img src="/faviconl.png" alt="" />
              <span>{company.name}</span>
            </a>
            <p>
              Software teams, business systems, mobile experiences, and growth campaigns built with clarity from idea to launch.
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
                <a key={item.path} href={item.path} onClick={navigateTo(item.path)}>
                  {item.label}
                </a>
              ))}
            </div>
            <div>
              <span>Services</span>
              {serviceCards.map((service) => (
                <a key={service.title} href="/services" onClick={navigateTo('/services')}>
                  {service.title}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-action">
            <p className="eyebrow">Built for growth. Secured by practice.</p>
            <h2>Let's build your next release.</h2>
            <a className="primary-button footer-cta" href="/contact" onClick={navigateTo('/contact')}>
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
          <span>Product engineering | Web & mobile | ERP | Digital growth</span>
        </div>
      </footer>
    </div>
  );
}

export { App };
