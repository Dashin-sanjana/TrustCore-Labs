import { type MouseEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
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
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { SignalField } from './SignalField';
import { BoonDotField } from './BoonDotField';
import { CaseStudyPage } from './CaseStudyPage';
import { caseStudies, caseStudyByPath } from './caseStudies';
import { defaultSeoImage, generalFaqs as faqs, getStructuredData, indexableRoutes, routeSeo, servicePages, siteUrl, type RoutePath } from './seo';

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

type AppRoute = RoutePath | '/404';

const fallbackCompany: Company = {
  name: 'TrustCoreLabs',
  tagline: 'Growth-focused software teams for ambitious businesses.',
  metrics: [
    { label: 'Core service lines', value: '04' },
    { label: 'Verified case studies', value: '01' },
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
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/process' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

const pageCards = [
  {
    path: '/about' as RoutePath,
    eyebrow: 'Company',
    title: 'About TrustCoreLabs',
    text: 'Meet the team model, standards, and delivery approach behind each build.',
    icon: ShieldCheck,
  },
  {
    path: '/work' as RoutePath,
    eyebrow: 'Portfolio',
    title: 'Recent Work',
    text: 'Browse verified case studies and supporting public project links.',
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

const serviceCardPaths: Record<string, RoutePath> = {
  'Product & Software Engineering': '/custom-software-development',
  'Web & Mobile Solutions': '/web-development',
  'ERP & Business Systems': '/business-systems',
  'Digital Growth & Support': '/services',
};

const portfolio = [
  'Dash Fashion',
  'New Zealankanz',
  'Fatbis',
  'Focus Fitness',
  'AI Hub',
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
    text: 'A public fashion storefront with catalogue browsing, responsive product presentation, and customer contact paths.',
    result: 'Commerce presence',
    scope: 'Frontend, product flow, visual system',
    href: 'https://dash-fashion-ruby.vercel.app',
  },
  {
    name: 'New Zealankanz',
    type: 'Service platform',
    text: 'A public service website with structured listings, service discovery, and responsive content pages.',
    result: 'Public platform',
    scope: 'Web app, content flow, launch support',
    href: 'https://new-zealankanz-frontend.vercel.app',
  },
  {
    name: 'Fatbis',
    type: 'Food business website',
    text: 'A public food brand website presenting products, brand content, and customer contact information.',
    result: 'Brand website',
    scope: 'Website experience, visual presentation, launch support',
    href: 'https://fatbis.net/',
  },
  {
    name: 'Focus Fitness',
    type: 'Fitness web experience',
    text: 'A public fitness website presenting services, programs, brand content, and clear contact paths.',
    result: 'Fitness presence',
    scope: 'Frontend experience, responsive layout, content flow',
    href: 'https://focusfitness.waveloop.dev/',
  },
  {
    name: 'AI Hub',
    type: 'AI tools & web platform',
    text: 'A public AI discovery platform with a tool directory, playground experiences, and creator utilities.',
    result: 'AI platform & directory',
    scope: 'Full-stack platform, tool directory, AI playground apps',
    href: 'https://ai-hub.live',
  },
  {
    name: 'Togo and Friends',
    type: 'Community brand platform',
    text: 'A public community brand website with story-led content, navigation, and responsive pages.',
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

const localServiceSummaries = [
  {
    title: 'Web Development',
    href: '/web-development' as RoutePath,
    text: 'Responsive business websites, service pages, web applications, portals, and content structures that are easy for customers to understand.',
  },
  {
    title: 'Mobile App Development',
    href: '/mobile-app-development' as RoutePath,
    text: 'Mobile app planning, UI, and connected app development for customer journeys, staff workflows, booking, ordering, and field operations.',
  },
  {
    title: 'Custom Software Development',
    href: '/custom-software-development' as RoutePath,
    text: 'Custom dashboards, SaaS products, internal tools, workflow systems, and secure portals shaped around the way the business works.',
  },
  {
    title: 'ERP & Business Systems',
    href: '/business-systems' as RoutePath,
    text: 'ERP-style systems for CRM, POS, inventory, HR, finance, approvals, reporting, and operational data that needs to stay connected.',
  },
  {
    title: 'UI/UX Design',
    href: '/ui-ux-design' as RoutePath,
    text: 'Interface design, user journeys, wireframes, prototypes, dashboards, and product screens prepared for responsive implementation.',
  },
];

const localFaqs = [
  ['What software development services do you provide?', 'TrustCore Labs provides web development, mobile app development, custom software, ERP and business systems, UI/UX design, and digital solution support.'],
  ['Do you work with businesses outside Pannipitiya?', 'Yes. TrustCore Labs is based in Pannipitiya and works with businesses across Sri Lanka and with international teams.'],
  ['Can you build custom ERP or business systems?', 'Yes. We can plan and build ERP-style modules, CRM, POS, inventory, HR, finance, reporting, and workflow systems around business operations.'],
  ['Do you provide mobile app development?', 'Yes. We can design and build mobile app experiences for customer journeys, staff workflows, booking, ordering, and connected business platforms.'],
  ['How can I request a quotation?', 'Send the business context, required features, timeline, and any reference examples through the contact page so we can shape the next steps.'],
] as const;

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

const deliveryCore = [
  {
    number: '01',
    title: 'Discover',
    label: 'Business signal',
    text: 'We map the real workflow, users, constraints, and commercial priority before defining the product.',
    output: 'Clear scope, user journeys, and delivery direction',
  },
  {
    number: '02',
    title: 'Design',
    label: 'System structure',
    text: 'Interfaces, data relationships, permissions, and service flows are shaped into one coherent system.',
    output: 'Product architecture and interaction blueprint',
  },
  {
    number: '03',
    title: 'Build',
    label: 'Connected execution',
    text: 'Frontend, APIs, business logic, integrations, and content move together through focused releases.',
    output: 'Testable software with visible progress',
  },
  {
    number: '04',
    title: 'Launch',
    label: 'Operational release',
    text: 'We prepare deployment, data, access, performance, analytics, and launch communication as one release.',
    output: 'Production-ready product and handover',
  },
  {
    number: '05',
    title: 'Grow',
    label: 'Continuous advantage',
    text: 'Real usage guides the next modules, integrations, campaigns, and operational improvements.',
    output: 'A roadmap grounded in business evidence',
  },
];

const manifesto = 'We turn business complexity into software that is clear, connected, secure, and ready to grow.';

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
  ['01', 'verified case study'],
  ['4', 'core service lines'],
  ['1', 'connected delivery partner'],
];

const contactEmail = 'info@trustcorelabs.com';
const contactEmails = [contactEmail, 'hashan@trustcorelabs.com'];
const contactAddress = 'No.257/3, Old Road, Moraketiya, Pannipitiya, Sri Lanka, 10230.';
const googleMapsUrl =
  'https://maps.google.com/?q=No.257/3,+Old+Road,+Moraketiya,+Pannipitiya,+Sri+Lanka,+10230';

const contactPhones = [
  { label: 'Office Number', number: '+94 11 208 8358', tel: '+94112088358' },
  { label: 'Hashan Amarasinghe', number: '+94 77 200 9665', tel: '+94772009665' },
];

function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.6 3c.24 2.07 1.4 3.3 3.4 3.43v3.1a7.7 7.7 0 0 1-3.36-.78v6.1a6.15 6.15 0 1 1-5.3-6.1c.4-.05.8-.06 1.2-.02v3.16a3.05 3.05 0 1 0 1.05 2.3V3h3.01Z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/trustcorelabs', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com/trustcorelabs', icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/trustcorelabs', icon: Linkedin },
  { label: 'X', href: 'https://x.com/TrustCoreLabs', icon: X },
  { label: 'TikTok', href: 'https://www.tiktok.com/@trustcorelabs', icon: TikTokIcon },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const homeSupportingReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    clipPath: 'inset(0 0 100% 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const homeSectionReveal = {
  hidden: {
    opacity: 0,
    y: 72,
    clipPath: 'inset(12% 0 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const homeListReveal = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
};

const homeRowReveal = {
  hidden: {
    opacity: 0,
    y: 52,
    clipPath: 'inset(0 0 100% 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
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

const workTextReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    skewY: 3,
    filter: 'blur(8px)',
    clipPath: 'inset(0 0 100% 0)',
  },
  show: (order = 0) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.72,
      delay: order * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const workPanelReveal = {
  hidden: {
    opacity: 0,
    x: 54,
    rotateY: -12,
    scale: 0.94,
    clipPath: 'inset(0 0 0 100% round 1rem)',
  },
  show: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    scale: 1,
    clipPath: 'inset(0 0 0 0% round 1rem)',
    transition: {
      duration: 0.9,
      delay: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const workProjectReveal = {
  hidden: (order = 0) => ({
    opacity: 0,
    x: order % 2 === 0 ? -64 : 64,
    y: 38,
    rotateZ: order % 2 === 0 ? -1.5 : 1.5,
    scale: 0.96,
  }),
  show: (order = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      duration: 0.88,
      delay: (order % 2) * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.075,
      delayChildren: 0.18,
    },
  }),
};

const workGridCardReveal = {
  hidden: {
    opacity: 0,
    y: 56,
    rotateX: -10,
    scale: 0.95,
  },
  show: (order = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.78,
      delay: order * 0.09,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const workDetailReveal = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function getCurrentRoute(): AppRoute {
  const pathWithoutExtension = window.location.pathname.replace(/\.html$/, '');
  const normalizedPath = pathWithoutExtension.length > 1
    ? pathWithoutExtension.replace(/\/$/, '')
    : pathWithoutExtension;
  return indexableRoutes.includes(normalizedPath as RoutePath) ? normalizedPath as RoutePath : '/404';
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
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseCustomCursor || prefersReducedMotion) {
      return undefined;
    }

    const syncInteractiveState = (element: EventTarget | null) => {
      const targetElement = element instanceof Element ? element : null;
      const nextInteractive = Boolean(targetElement?.closest('a, button, input, textarea, select, [role="button"], [role="tab"]'));

      if (nextInteractive !== interactiveRef.current) {
        interactiveRef.current = nextInteractive;
        setInteractive(nextInteractive);
      }
    };

    const moveCursor = () => {
      follower.current.x += (target.current.x - follower.current.x) * 0.42;
      follower.current.y += (target.current.y - follower.current.y) * 0.42;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0)`;
      }

      frame.current = window.requestAnimationFrame(moveCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };

      if (!visibleRef.current) {
        visibleRef.current = true;
        follower.current = target.current;
        setVisible(true);

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      syncInteractiveState(event.target);
    };

    const handlePointerOver = (event: PointerEvent) => {
      syncInteractiveState(event.target);
    };

    const handlePointerLeave = () => {
      visibleRef.current = false;
      interactiveRef.current = false;
      setVisible(false);
      setInteractive(false);
      setPressed(false);
    };
    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);

    frame.current = window.requestAnimationFrame(moveCursor);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
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

function App({ initialPath }: { initialPath?: AppRoute } = {}) {
  const [company, setCompany] = useState<Company>(fallbackCompany);
  const [menuOpen, setMenuOpen] = useState(false);
  const [metricsActive, setMetricsActive] = useState(false);
  const [activeCoreStage, setActiveCoreStage] = useState(0);
  const [route, setRoute] = useState<AppRoute>(() => initialPath ?? getCurrentRoute());
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
  const agencySwapRotate = useTransform(sectionSwapProgress, [0, 0.38, 1], [90, 72, 0]);
  const agencySwapOpacity = useTransform(sectionSwapProgress, [0, 0.28, 0.72, 1], [0, 0.08, 0.78, 1]);

  useEffect(() => {
    fetch('/api/company')
      .then((response) => (response.ok ? response.json() : fallbackCompany))
      .then(setCompany)
      .catch(() => setCompany(fallbackCompany));
  }, []);

  useEffect(() => {
    const syncRoute = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      setRoute(getCurrentRoute());
    };
    window.history.scrollRestoration = 'manual';
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const resetScroll = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);

    return () => window.clearTimeout(resetScroll);
  }, [route]);

  useEffect(() => {
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');

    if (route === '/404') {
      document.title = 'Page Not Found | TrustCore Labs';
      setMetaTag('meta[name="description"]', 'content', 'The page you requested could not be found. Explore TrustCore Labs services, projects, or contact information.');
      robots?.setAttribute('content', 'noindex, nofollow');
      document.head.querySelector('#structured-data')?.remove();
      return;
    }

    const metadata = routeSeo[route];
    const canonicalUrl = `${siteUrl}${route === '/' ? '/' : route}`;
    const socialImage = metadata.image ?? defaultSeoImage;

    document.title = metadata.title;
    setMetaTag('meta[name="description"]', 'content', metadata.description);
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
    setMetaTag('meta[property="og:title"]', 'content', metadata.title);
    setMetaTag('meta[property="og:description"]', 'content', metadata.description);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'content', socialImage);
    setMetaTag('meta[property="og:image:alt"]', 'content', metadata.imageAlt ?? 'TrustCore Labs logo');
    setMetaTag('meta[property="og:image:width"]', 'content', String(metadata.imageWidth ?? 4200));
    setMetaTag('meta[property="og:image:height"]', 'content', String(metadata.imageHeight ?? 2000));
    setMetaTag('meta[name="twitter:title"]', 'content', metadata.title);
    setMetaTag('meta[name="twitter:description"]', 'content', metadata.description);
    setMetaTag('meta[name="twitter:image"]', 'content', socialImage);
    robots?.setAttribute('content', 'index, follow, max-image-preview:large');

    let structuredData = document.head.querySelector<HTMLScriptElement>('#structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(getStructuredData(route));
  }, [route]);

  const navigateTo = (path: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    setMenuOpen(false);

    if (window.location.pathname === path) {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  const marqueeItems = useMemo(() => [...portfolio, ...portfolio], []);
  const activeService = route === '/404' ? undefined : servicePages.find((service) => service.path === route);
  const activeCaseStudy = route === '/404' ? undefined : caseStudyByPath(route);

  return (
    <div className="site-shell">
      {route !== '/' && <ParticleBackground />}
      <InteractiveCursor />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="noise" />
      <div className="cyber-grid" />
      <BoonDotField key={route} />
      <motion.div className="ambient ambient-one" style={{ y: glowY }} />
      <motion.div className="ambient ambient-two" style={{ y: heroY }} />
      <motion.div className="ambient ambient-three" style={{ y: glowY }} />

      <motion.header
        className="nav"
        initial={reduceMotion ? false : { y: '-110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <a className="brand" href="/" onClick={navigateTo('/')} aria-label="TrustCoreLabs home">
          <img className="brand-logo-full" src="/trustcore-logo-on-dark.png" alt="TrustCore Labs" width="1140" height="540" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.path} href={item.path} onClick={navigateTo(item.path)} aria-current={route === item.path ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/contact" onClick={navigateTo('/contact')}>
          Start a Project
          <ArrowUpRight size={17} />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.header>

      {menuOpen && (
        <motion.div className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {navItems.map((item) => (
            <a key={item.path} href={item.path} onClick={navigateTo(item.path)} aria-current={route === item.path ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </motion.div>
      )}

      <main className={`page-main${route === '/' ? ' home-v4' : ''}`}>
        {route === '/' && (
          <>
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              SOFTWARE • WEB • MOBILE • DIGITAL SOLUTIONS
            </p>
            <h1>
              <span className="hero-line-clip">
                <span className="hero-thin">Software Development Company</span>
              </span>
              <span className="hero-line-clip">
                <span className="hero-strong">in Sri Lanka.</span>
              </span>
            </h1>
            <p className="hero-text">
              Web, mobile app, ERP and custom software solutions from our team in Pannipitiya, Sri Lanka.
            </p>
            <p className="hero-trust-line">
              Built for startups, growing businesses & ambitious teams.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/contact" onClick={navigateTo('/contact')}>
                Start Your Project
                <ChevronRight size={18} />
              </a>
              <a className="secondary-button" href="/work" onClick={navigateTo('/work')}>
                Explore Our Work
              </a>
            </div>
            <a className="hero-scroll-cue" href="#home-story">
              Explore our approach
              <ArrowDown size={16} />
            </a>
          </div>

          <motion.div className="hero-visual" initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }} animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <ParticleBackground className="hero-particle-man" />
          </motion.div>
        </section>

        <motion.section
          ref={agencyIntroRef}
          id="home-story"
          className="home-manifesto agency-swap-face"
          style={{
            rotateX: reduceMotion ? 0 : agencySwapRotate,
            opacity: reduceMotion ? 1 : agencySwapOpacity,
          }}
        >
          <div className="home-section-index">Manifesto / 01</div>
          <motion.h2
            className="manifesto-copy"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            variants={{ show: { transition: { staggerChildren: 0.055 } } }}
          >
            {manifesto.split(' ').map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0.16, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p className="manifesto-note" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
            Strategy, product design, engineering, business operations, and launch support move as one connected discipline from Pannipitiya, Sri Lanka.
          </motion.p>
        </motion.section>

        <motion.section
          className="signal-field"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, clipPath: 'inset(0 0 16% 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SignalField />
          <ParticleBackground className="signal-man-background" />
          <div className="signal-field-shade" aria-hidden="true" />
          <motion.div
            className="signal-field-copy"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 48, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Connected intelligence / live systems</span>
            <h2>Turn operational complexity into clear, confident action.</h2>
          </motion.div>
          <div className="signal-field-meta">
            <span>Strategy</span>
            <span>Product</span>
            <span>Engineering</span>
            <span>Growth</span>
          </div>
        </motion.section>

        <div className="boon-zone">
        <motion.section
          className="delivery-core"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            className="delivery-core-heading"
            variants={homeSectionReveal}
            initial={reduceMotion ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="home-section-index">System architecture / 02</div>
            <h2>The delivery core.</h2>
            <p>A connected operating model that turns a business problem into a product people can trust and use.</p>
          </motion.div>
          <div className="delivery-core-layout">
            <div className="core-stage-list" role="tablist" aria-label="TrustCore delivery stages">
              {deliveryCore.map((stage, index) => (
                <button
                  className={index === activeCoreStage ? 'is-active' : ''}
                  key={stage.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeCoreStage}
                  onClick={() => setActiveCoreStage(index)}
                >
                  <span>{stage.number}</span>
                  <strong>{stage.title}</strong>
                  <small>{stage.label}</small>
                </button>
              ))}
            </div>
            <motion.div
              className="core-stage-detail"
              key={deliveryCore[activeCoreStage].title}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              role="tabpanel"
            >
              <div className="core-orbit" aria-hidden="true">
                <span className="core-orbit-ring" />
                <span className="core-orbit-node core-orbit-node-a" />
                <span className="core-orbit-node core-orbit-node-b" />
                <span className="core-orbit-node core-orbit-node-c" />
                <strong>{deliveryCore[activeCoreStage].number}</strong>
              </div>
              <div className="core-detail-copy">
                <span>{deliveryCore[activeCoreStage].label}</span>
                <h3>{deliveryCore[activeCoreStage].title}</h3>
                <p>{deliveryCore[activeCoreStage].text}</p>
                <small>Output</small>
                <strong>{deliveryCore[activeCoreStage].output}</strong>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="home-capabilities"
          variants={homeSectionReveal}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          <motion.div className="capabilities-heading" variants={homeSupportingReveal}>
            <div className="home-section-index">System capabilities / 03</div>
            <h2>Engineered for momentum.</h2>
          </motion.div>
          <motion.div
            className="capability-list"
            variants={homeListReveal}
            initial={reduceMotion ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a
                  className="capability-item"
                  href={serviceCardPaths[service.title]}
                  onClick={navigateTo(serviceCardPaths[service.title])}
                  key={service.title}
                  variants={homeRowReveal}
                >
                  <span className="capability-number">0{index + 1}</span>
                  <span className="capability-icon"><Icon size={24} /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <ArrowUpRight size={22} />
                </motion.a>
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
            <motion.div className="metric" key={metric.label} variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.25 }}>
              <AnimatedMetricValue value={metric.value} active={metricsActive} reduceMotion={Boolean(reduceMotion)} />
              <p>{metric.label}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          className="home-work"
          variants={homeSectionReveal}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.06 }}
        >
          <motion.div className="home-work-heading" variants={homeSupportingReveal}>
            <div className="home-section-index">Selected public work / 04</div>
            <h2>Built for the real world.</h2>
            <a href="/work" onClick={navigateTo('/work')}>View all work <ArrowUpRight size={17} /></a>
          </motion.div>
          <motion.div
            className="home-work-list"
            variants={homeListReveal}
            initial={reduceMotion ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.04 }}
          >
            {caseStudies.map((study, index) => (
              <motion.a
                className="home-work-item"
                href={study.path}
                key={study.path}
                variants={homeRowReveal}
              >
                <span>0{index + 1}</span>
                <div>
                  <small>Verified case study</small>
                  <h3>{study.name}</h3>
                </div>
                <p>{study.summary}</p>
                <ArrowUpRight size={24} />
              </motion.a>
            ))}
            {featuredProjects.map((project, index) => (
              <motion.a
                className="home-work-item"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
                variants={homeRowReveal}
              >
                <span>{String(index + caseStudies.length + 1).padStart(2, '0')}</span>
                <div>
                  <small>{project.type}</small>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.text}</p>
                <ArrowUpRight size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="home-difference"
          variants={homeSectionReveal}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="home-section-index">The TrustCore difference / 05</div>
          <motion.div
            className="difference-grid"
            variants={homeListReveal}
            initial={reduceMotion ? 'show' : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {trustReasons.slice(0, 3).map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.article
                  key={reason.title}
                  variants={homeRowReveal}
                >
                  <span>0{index + 1}</span>
                  <Icon size={26} />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section
          className="home-final-cta"
          initial={false}
        >
          <span>Start a project / 06</span>
          <h2>Bring the complexity.<br />Let&apos;s build what comes next.</h2>
          <p>Software platforms, business systems, digital experiences, and the support to keep them moving.</p>
          <a className="primary-button" href="/contact" onClick={navigateTo('/contact')}>
            Start a project
            <ArrowUpRight size={19} />
          </a>
        </motion.section>
        </div>

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
            <motion.section
              className="page-hero about-hero page-section particle-page-hero"
              variants={revealSequence}
              initial={reduceMotion ? 'show' : 'hidden'}
              animate={reduceMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
            >
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div variants={revealSequence}>
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>About TrustCoreLabs</motion.p>
                <motion.h1 custom={1} variants={textWipeReveal}>Software partner for businesses that want to move cleaner.</motion.h1>
                <motion.p custom={2} variants={textWipeReveal}>
                  TrustCoreLabs is built for companies that need practical technology without losing sight of the business. We connect strategy, design, software engineering, business systems, and launch support into one clear delivery path.
                </motion.p>
              </motion.div>
              <motion.div className="page-hero-panel" custom={3} variants={cardLiftReveal}>
                <motion.span className="about-panel-icon" custom={4} variants={textWipeReveal}>
                  <ShieldCheck size={30} />
                </motion.span>
                <motion.strong custom={5} variants={textWipeReveal}>{company.tagline}</motion.strong>
                <motion.span custom={6} variants={textWipeReveal}>Built around useful releases, clear communication, and systems that can grow after launch.</motion.span>
              </motion.div>
            </motion.section>

            <motion.section
              className="content-band about-reveal-section"
              variants={revealSequence}
              initial={reduceMotion ? 'show' : 'hidden'}
              animate={reduceMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: false, amount: 0.14 }}
            >
              <motion.div className="section-heading story-heading" variants={revealSequence}>
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>How we work</motion.p>
                <motion.h2 custom={1} variants={textWipeReveal}>A compact team model for practical business outcomes.</motion.h2>
                <motion.p custom={2} variants={textWipeReveal}>We help owners and teams turn product ideas, manual workflows, and growth plans into software people can actually use.</motion.p>
              </motion.div>
              <motion.div className="detail-grid three" variants={revealSequence}>
                {engagementModels.map(([title, text], index) => (
                  <motion.article className="detail-card" key={title} custom={index + 3} variants={cardLiftReveal}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.section>

            <motion.section
              className="content-band compact-band about-reveal-section"
              variants={revealSequence}
              initial={reduceMotion ? 'show' : 'hidden'}
              animate={reduceMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: false, amount: 0.14 }}
            >
              <motion.div className="section-heading" variants={revealSequence}>
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Standards</motion.p>
                <motion.h2 custom={1} variants={textWipeReveal}>The parts we keep consistent across every build.</motion.h2>
              </motion.div>
              <motion.div className="mini-grid" variants={revealSequence}>
                {standards.map(([title, text], index) => (
                  <motion.article className="mini-card" key={title} custom={index + 2} variants={cardLiftReveal}>
                    <Check size={18} />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.section>
          </>
        )}

        {route === '/work' && (
          <>
            <motion.section
              className="page-hero work-hero page-section work-reveal-stage particle-page-hero"
              variants={revealSequence}
              initial={reduceMotion ? 'show' : 'hidden'}
              animate={reduceMotion ? 'show' : 'hidden'}
              whileInView="show"
              viewport={{ once: false, amount: 0.08 }}
            >
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div variants={revealSequence}>
                <motion.p className="eyebrow" custom={0} variants={workTextReveal}>Portfolio and case studies</motion.p>
                <motion.h1 custom={1} variants={workTextReveal}>Digital work explained with useful context.</motion.h1>
                <motion.p custom={2} variants={workTextReveal}>Verified case studies document the challenge, delivery, technology, and outcome without unsupported performance claims.</motion.p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.08 }}>
                <Globe2 size={30} />
                <strong>Verified work, published carefully</strong>
                <span>Detailed case studies are added only when project scope, attribution, and visible evidence can be confirmed.</span>
              </motion.div>
            </motion.section>

            <section className="work-band work-reveal-stage" id="work">
              <div className="verified-work-heading">
                <p className="eyebrow">Verified case study</p>
                <h2>Repository-backed work with a transparent delivery record.</h2>
              </div>
              {caseStudies.map((study) => (
                <a className="verified-case-card" href={study.path} key={study.path}>
                  <div>
                    <span>{study.category}</span>
                    <h2>{study.name}</h2>
                    <p>{study.summary}</p>
                    <strong>View Case Study <ArrowUpRight size={17} /></strong>
                  </div>
                </a>
              ))}
              <div className="public-work-heading">
                <p className="eyebrow">Additional public links</p>
                <h2>Project links currently presented in the portfolio.</h2>
                <p>Detailed case studies will be added after project attribution, scope, and supporting assets are confirmed.</p>
              </div>
              <div className="featured-projects">
                {featuredProjects.map((project, index) => (
                  <motion.a
                    className="featured-project"
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    custom={index}
                    variants={workProjectReveal}
                    initial={reduceMotion ? 'show' : 'hidden'}
                    animate={reduceMotion ? 'show' : 'hidden'}
                    whileInView="show"
                    viewport={{ once: false, amount: 0.05 }}
                  >
                    <div className="featured-project-top">
                      <span className="project-number">0{index + 1}</span>
                      <span className="featured-project-arrow" aria-hidden="true">
                        <ArrowUpRight size={22} />
                      </span>
                    </div>
                    <div className="featured-project-body">
                      <p className="featured-project-type">{project.type}</p>
                      <h3>{project.name}</h3>
                      <p className="featured-project-desc">{project.text}</p>
                    </div>
                    <dl className="featured-project-meta">
                      <div>
                        <dt>Delivery</dt>
                        <dd>{project.result}</dd>
                      </div>
                      <motion.div variants={workDetailReveal}>
                        <dt>Scope</dt>
                        <dd>{project.scope}</dd>
                      </motion.div>
                    </dl>
                  </motion.a>
                ))}
              </div>
              <motion.div
                className="section-heading project-directions-heading"
                variants={revealSequence}
                initial={reduceMotion ? 'show' : 'hidden'}
                animate={reduceMotion ? 'show' : 'hidden'}
                whileInView="show"
                viewport={{ once: false, amount: 0.12 }}
              >
                <motion.p className="eyebrow" custom={0} variants={workTextReveal}>What we build</motion.p>
                <motion.h2 custom={1} variants={workTextReveal}>Project directions we can shape for your business.</motion.h2>
              </motion.div>
              <div className="project-grid">
                {projectTypes.map(([title, text], index) => (
                  <motion.article
                    className="project-card"
                    key={title}
                    custom={index}
                    variants={workGridCardReveal}
                    initial={reduceMotion ? 'show' : 'hidden'}
                    animate={reduceMotion ? 'show' : 'hidden'}
                    whileInView="show"
                    viewport={{ once: false, amount: 0.08 }}
                  >
                    <motion.span custom={index + 1} variants={workTextReveal}>0{index + 1}</motion.span>
                    <motion.h3 custom={index + 2} variants={workTextReveal}>{title}</motion.h3>
                    <motion.p custom={index + 3} variants={workTextReveal}>{text}</motion.p>
                    <motion.span className="work-card-corner" aria-hidden="true" custom={index + 4} variants={workTextReveal} />
                  </motion.article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeCaseStudy && <CaseStudyPage study={activeCaseStudy} />}

        {route === '/services' && (
          <>
            <section className="page-hero services-hero page-section particle-page-hero">
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div
                className="services-text-reveal"
                variants={revealSequence}
                initial={reduceMotion ? 'show' : 'hidden'}
                animate="show"
                whileInView="show"
                viewport={{ once: false, amount: 0.18 }}
              >
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Services</motion.p>
                <motion.h1 custom={1} variants={textWipeReveal}>Services that extend your team and accelerate delivery.</motion.h1>
                <motion.p custom={2} variants={textWipeReveal}>Choose a focused build or combine services into a full digital product team for your business.</motion.p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate="show" whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: 0.08 }}>
                <Cpu size={30} />
                <strong>Software, systems, mobile, and growth support.</strong>
                <span>One delivery flow from discovery to launch and post-release improvement.</span>
              </motion.div>
            </section>

            <section className="content-band" id="services">
              <motion.div className="lab-console" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.2 }}>
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
                      initial={reduceMotion ? 'show' : 'hidden'}
                      animate={reduceMotion ? 'show' : 'hidden'}
                      whileInView="show"
                      viewport={{ once: false, amount: 0.18 }}
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
              <motion.div
                className="section-heading story-heading services-text-reveal"
                variants={revealSequence}
                initial={reduceMotion ? 'show' : 'hidden'}
                animate={reduceMotion ? 'show' : 'hidden'}
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Capabilities</motion.p>
                <motion.h2 custom={1} variants={textWipeReveal}>Everything needed to move from idea to operating product.</motion.h2>
                <motion.p custom={2} variants={textWipeReveal}>Use one capability for a focused need, or combine several into a complete product delivery path.</motion.p>
              </motion.div>
              <div className="detail-grid two">
                {serviceDetails.map(([title, text], index) => (
                  <motion.article className="detail-card" key={title} variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: index * 0.04 }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band">
              <motion.div
                className="section-heading services-text-reveal"
                variants={revealSequence}
                initial={reduceMotion ? 'show' : 'hidden'}
                animate={reduceMotion ? 'show' : 'hidden'}
                whileInView="show"
                viewport={{ once: false, amount: 0.35 }}
              >
                <motion.p className="eyebrow" custom={0} variants={textWipeReveal}>Industries</motion.p>
                <motion.h2 custom={1} variants={textWipeReveal}>Business categories we can support.</motion.h2>
              </motion.div>
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

            <section className="content-band compact-band service-directory" aria-labelledby="service-directory-title">
              <div className="section-heading">
                <p className="eyebrow">Focused services</p>
                <h2 id="service-directory-title">Explore the right delivery path for your project.</h2>
                <p>Each service page explains the problems we solve, capabilities, delivery process, technology approach, and practical questions to consider.</p>
              </div>
              <div className="detail-grid two">
                {servicePages.map((service, index) => (
                  <a className="detail-card service-directory-link" key={service.path} href={service.path} onClick={navigateTo(service.path)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{service.shortTitle}</h3>
                    <p>{service.description}</p>
                    <span className="service-link-label">View service <ArrowUpRight size={17} /></span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {activeService && (
          <>
            <section className="page-hero services-hero page-section particle-page-hero service-detail-hero">
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate="show">
                <p className="eyebrow">{activeService.eyebrow}</p>
                <h1>{activeService.heading}</h1>
                <p>{activeService.intro}</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate="show" transition={{ delay: 0.08 }}>
                <Cpu size={30} />
                <strong>Sri Lanka-based. Ready for international delivery.</strong>
                <span>Clear discovery, thoughtful UI/UX, dependable engineering, and practical launch support.</span>
              </motion.div>
            </section>

            <nav className="content-band service-breadcrumbs" aria-label="Breadcrumb">
              <a href="/" onClick={navigateTo('/')}>Home</a>
              <ChevronRight size={14} aria-hidden="true" />
              <a href="/services" onClick={navigateTo('/services')}>Services</a>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{activeService.shortTitle}</span>
            </nav>

            <section className="content-band service-detail-section" aria-labelledby="problems-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Business problems</p>
                <h2 id="problems-title">Where this service creates useful change.</h2>
              </div>
              <div className="mini-grid">
                {activeService.problems.map((problem) => (
                  <article className="mini-card" key={problem}>
                    <Check size={18} />
                    <p>{problem}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band service-detail-section" aria-labelledby="capabilities-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Capabilities</p>
                <h2 id="capabilities-title">What the engagement can include.</h2>
              </div>
              <div className="detail-grid two">
                {activeService.capabilities.map((capability, index) => (
                  <article className="detail-card" key={capability}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{capability}</h3>
                  </article>
                ))}
              </div>
            </section>

            <section className="split-band service-process-section" aria-labelledby="service-process-title">
              <div className="sticky-copy">
                <p className="eyebrow">Development process</p>
                <h2 id="service-process-title">A visible path from context to release.</h2>
                <p>{activeService.technologies}</p>
              </div>
              <div className="process-list">
                {activeService.process.map((step, index) => (
                  <article className="process-card" key={step}>
                    <span>0{index + 1}</span>
                    <div><h3>{step}</h3></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band service-detail-section" aria-labelledby="why-trustcore-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Why TrustCore Labs</p>
                <h2 id="why-trustcore-title">Business context stays connected to delivery.</h2>
                <p>{activeService.why}</p>
              </div>
              <div className="service-related-links" aria-label="Related TrustCore Labs projects">
                <strong>Related work</strong>
                {caseStudies
                  .filter((study) => study.services.some((service) => service.href === activeService.path))
                  .map((study) => (
                    <a key={study.path} href={study.path}>
                      {study.name}<ChevronRight size={16} />
                    </a>
                  ))}
                <a href="/work" onClick={navigateTo('/work')}>View all work<ChevronRight size={16} /></a>
                {servicePages
                  .filter((service) => service.path !== activeService.path)
                  .slice(0, 3)
                  .map((service) => (
                    <a key={service.path} href={service.path} onClick={navigateTo(service.path)}>
                      {service.shortTitle}<ChevronRight size={16} />
                    </a>
                  ))}
                <a href="/contact" onClick={navigateTo('/contact')}>Discuss this service<ChevronRight size={16} /></a>
              </div>
            </section>

            <section className="faq-band service-faq" aria-labelledby="service-faq-title">
              <div className="section-heading">
                <p className="eyebrow">FAQ</p>
                <h2 id="service-faq-title">Questions about {activeService.shortTitle.toLowerCase()}.</h2>
              </div>
              <div className="faq-list">
                {activeService.faqs.map(([question, answer], index) => (
                  <article className="faq-item" key={question}>
                    <span>0{index + 1}</span>
                    <div><h3>{question}</h3><p>{answer}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-final-cta service-final-cta">
              <span>Start a project</span>
              <h2>Let&apos;s turn the requirement into a practical release.</h2>
              <p>Share the business context, users, timeline, and what needs to improve first.</p>
              <a className="primary-button" href="/contact" onClick={navigateTo('/contact')}>
                Discuss your project<ArrowUpRight size={18} />
              </a>
            </section>
          </>
        )}

        {route === '/software-company-pannipitiya' && (
          <>
            <section className="page-hero services-hero page-section particle-page-hero service-detail-hero">
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate="show">
                <p className="eyebrow">Software company in Pannipitiya</p>
                <h1>Software Company in Pannipitiya</h1>
                <p>
                  TrustCore Labs is based in Pannipitiya, Sri Lanka and helps businesses plan, design, build, and launch practical digital products, websites, mobile apps, ERP systems, and custom software.
                </p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate="show" transition={{ delay: 0.08 }}>
                <MapPin size={30} />
                <strong>Pannipitiya-based software team.</strong>
                <span>Serving businesses across Sri Lanka and international teams that need clear, maintainable digital solutions.</span>
              </motion.div>
            </section>

            <nav className="content-band service-breadcrumbs" aria-label="Breadcrumb">
              <a href="/" onClick={navigateTo('/')}>Home</a>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">Software Company in Pannipitiya</span>
            </nav>

            <section className="content-band service-detail-section" aria-labelledby="local-intro-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Introduction</p>
                <h2 id="local-intro-title">Digital solutions for local businesses and growing teams.</h2>
                <p>
                  We work with business owners, operators, and product teams that need useful software rather than disconnected tools. Projects can begin with a focused website or grow into a connected platform with customer portals, admin dashboards, mobile apps, and business-system modules.
                </p>
              </div>
              <div className="mini-grid">
                {[
                  ['Local context', 'A Pannipitiya office presence with services for businesses across Sri Lanka.'],
                  ['Practical delivery', 'Discovery, UI/UX, frontend, backend, deployment, and launch support can move together.'],
                  ['Connected systems', 'Websites, apps, ERP modules, CRM, POS, and dashboards can be planned around one workflow.'],
                  ['Clear next steps', 'Start with the highest-value release, then improve with real feedback and operational needs.'],
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

            <section className="content-band compact-band service-detail-section" aria-labelledby="local-services-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Services</p>
                <h2 id="local-services-title">Software services available from our Pannipitiya team.</h2>
              </div>
              <div className="detail-grid two">
                {localServiceSummaries.map((service, index) => (
                  <a className="detail-card service-directory-link" href={service.href} onClick={navigateTo(service.href)} key={service.href}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className="service-link-label">Explore {service.title}<ArrowUpRight size={17} /></span>
                  </a>
                ))}
              </div>
            </section>

            <section className="split-band service-process-section" aria-labelledby="local-why-title">
              <div className="sticky-copy">
                <p className="eyebrow">Why businesses choose TrustCore Labs</p>
                <h2 id="local-why-title">A practical software partner close to the business problem.</h2>
                <p>
                  We keep the conversation grounded in users, workflow, data, launch priorities, and maintainability, so each release has a clear business reason behind it.
                </p>
              </div>
              <div className="process-list">
                {trustReasons.map((reason, index) => (
                  <article className="process-card" key={reason.title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-band compact-band service-detail-section" aria-labelledby="areas-served-title">
              <div className="section-heading story-heading">
                <p className="eyebrow">Areas served</p>
                <h2 id="areas-served-title">Based in Pannipitiya, serving Sri Lanka and beyond.</h2>
                <p>
                  TrustCore Labs supports businesses in Pannipitiya, nearby Colombo-area locations, wider Sri Lanka, and international teams that need software delivery, UI/UX, web development, mobile app development, and business systems.
                </p>
              </div>
              <div className="service-related-links" aria-label="Related TrustCore Labs pages">
                <strong>Helpful links</strong>
                <a href="/work" onClick={navigateTo('/work')}>View work and case studies<ChevronRight size={16} /></a>
                <a href="/work/trustcore-labs-website">TrustCore Labs Website case study<ChevronRight size={16} /></a>
                <a href="/contact" onClick={navigateTo('/contact')}>Contact TrustCore Labs<ChevronRight size={16} /></a>
              </div>
            </section>

            <section className="faq-band service-faq" aria-labelledby="local-faq-title">
              <div className="section-heading">
                <p className="eyebrow">FAQ</p>
                <h2 id="local-faq-title">Questions about working with a software company in Pannipitiya.</h2>
              </div>
              <div className="faq-list">
                {localFaqs.map(([question, answer], index) => (
                  <article className="faq-item" key={question}>
                    <span>0{index + 1}</span>
                    <div><h3>{question}</h3><p>{answer}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-final-cta service-final-cta">
              <span>Start a project in Pannipitiya</span>
              <h2>Tell us what you need to build, improve, or launch.</h2>
              <p>Share the business context, required features, users, and timeline so we can help shape a practical next release.</p>
              <a className="primary-button" href="/contact" onClick={navigateTo('/contact')}>
                Request a quotation<ArrowUpRight size={18} />
              </a>
            </section>
          </>
        )}

        {route === '/process' && (
          <>
        <section className="page-hero process-hero page-section particle-page-hero">
          <SignalField />
          <div className="signal-field-shade" aria-hidden="true" />
          <motion.div variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }}>
            <p className="eyebrow">Process</p>
            <h1>Designed for momentum, engineered for scale.</h1>
            <p>Our process keeps the product vision, delivery team, business workflow, and launch plan connected from the first conversation.</p>
          </motion.div>
          <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: 0.08 }}>
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
              TrustCoreLabs keeps strategy, interface, backend, deployment, and growth support in one build rhythm, so the product feels cohesive from first prototype to production.
            </p>
          </div>
          <div className="process-list">
            {process.map(([number, title, text]) => (
              <motion.article className="process-card" key={title} variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.2 }}>
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
          <motion.div className="trust-card" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.2 }}>
            <MessageCircle size={30} />
            <p>
              “Every project should feel clear for the business owner: what we are building, who is responsible, why it matters, and how it helps the company grow.”
            </p>
            <span>TrustCoreLabs delivery approach</span>
          </motion.div>
          <motion.div className="trust-card accent" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.08 }}>
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
              <motion.article className="detail-card" key={title} variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: index * 0.06 }}>
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
            <section className="page-hero faq-hero page-section particle-page-hero">
              <SignalField />
              <div className="signal-field-shade" aria-hidden="true" />
              <motion.div variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }}>
                <p className="eyebrow">FAQ</p>
                <h1>Questions businesses usually ask first.</h1>
                <p>Clear answers before we talk scope, timeline, budget, or technology choices.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: 0.08 }}>
                <CircleHelp size={30} />
                <strong>Start with the business problem.</strong>
                <span>The technical solution becomes easier once the workflow, users, and launch goal are clear.</span>
              </motion.div>
            </section>

            <section className="faq-band" id="faq">
              <div className="faq-list">
                {faqs.map(([question, answer], index) => (
                  <motion.article className="faq-item" key={question} variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: index * 0.05 }}>
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
            <section className="page-hero contact-hero page-section particle-page-hero">
              <motion.div variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }}>
                <p className="eyebrow">Contact</p>
                <h1>Ready to map your team, technology, and timeline?</h1>
                <p>Tell us what you want to build, improve, or launch. We will help shape the right software, systems, and growth path for the business.</p>
              </motion.div>
              <motion.div className="page-hero-panel" variants={fadeUp} initial={reduceMotion ? 'show' : 'hidden'} animate={reduceMotion ? 'show' : 'hidden'} whileInView="show" viewport={{ once: false, amount: 0.18 }} transition={{ delay: 0.08 }}>
                <Mail size={30} />
                <strong>Send the project idea.</strong>
                <span>Include your business type, the problem, preferred timeline, and any reference websites you like.</span>
              </motion.div>
            </section>

            <section className="contact-band" id="contact">
              <div className="contact-channels-grid">
                <motion.article
                  className="contact-channel-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div>
                    <div className="contact-channel-badge">
                      <MapPin size={20} />
                      <span>Office Location</span>
                    </div>
                    <h3>Visit Our Office</h3>
                    <p className="contact-channel-address">{contactAddress}</p>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-action-link"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight size={15} />
                  </a>
                </motion.article>

                <motion.article
                  className="contact-channel-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.08 }}
                >
                  <div>
                    <div className="contact-channel-badge">
                      <Phone size={20} />
                      <span>Direct Lines</span>
                    </div>
                    <h3>Call Our Team</h3>
                    <div className="contact-phone-list">
                      {contactPhones.map((phone) => (
                        <a
                          key={phone.number}
                          href={`tel:${phone.tel}`}
                          className="contact-phone-row"
                        >
                          <div className="contact-phone-meta">
                            <span className="contact-phone-label">{phone.label}</span>
                            <strong className="contact-phone-num">{phone.number}</strong>
                          </div>
                          <ArrowUpRight size={15} className="contact-phone-arrow" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.article>

                <motion.article
                  className="contact-channel-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.16 }}
                >
                  <div>
                    <div className="contact-channel-badge">
                      <Mail size={20} />
                      <span>Electronic Mail</span>
                    </div>
                    <h3>Email Inquiries</h3>
                    <p className="contact-channel-desc">
                      Send project scopes, RFPs, or general questions anytime. We respond promptly.
                    </p>
                  </div>
                  <div className="contact-email-list">
                    {contactEmails.map((email) => (
                      <a key={email} href={`mailto:${email}`} className="contact-email-link">
                        <Mail size={16} />
                        <span>{email}</span>
                        <Sparkles size={16} />
                      </a>
                    ))}
                  </div>
                </motion.article>
              </div>

              <motion.div className="contact-panel" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }}>
                <div className="contact-copy">
                  <p className="eyebrow">Start a conversation</p>
                  <h2>Share the build you have in mind.</h2>
                  <p>We can begin with a website, business system, mobile app, ERP module, or a complete product delivery plan.</p>
                </div>
                <div className="contact-links" aria-label="TrustCoreLabs contact links">
                  <a className="primary-button light contact-email" href={`mailto:${contactEmail}`}>
                    <Mail size={18} />
                    {contactEmail}
                    <Sparkles size={18} />
                  </a>
                  <div className="social-row">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`TrustCoreLabs ${social.label}`}>
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

        {route === '/404' && (
          <section className="page-hero page-section not-found-page">
            <div>
              <p className="eyebrow">404 / Page not found</p>
              <h1>This page does not exist.</h1>
              <p>The address may have changed, or the link may be incomplete. Continue to our services, projects, or homepage.</p>
              <div className="hero-actions">
                <a className="primary-button" href="/" onClick={navigateTo('/')}>Return home<ChevronRight size={18} /></a>
                <a className="secondary-button" href="/services" onClick={navigateTo('/services')}>Explore services</a>
              </div>
            </div>
          </section>
        )}
      </main>

      <motion.footer
        className="site-footer"
        initial={reduceMotion ? false : { opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="footer-glow" />
        <div className="footer-shell">
          <motion.div
            className="footer-brand"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="footer-logo" href="/" onClick={navigateTo('/')} aria-label="TrustCoreLabs home">
              <img className="brand-logo-full" src="/trustcore-logo-on-dark.png" alt="TrustCore Labs" width="1140" height="540" loading="lazy" />
            </a>
            <p>
              Software teams, business systems, mobile experiences, and growth campaigns built with clarity from idea to launch.
            </p>
            <a
              className="footer-address-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              title="Open location in Google Maps"
            >
              <MapPin size={16} />
              <span>{contactAddress}</span>
            </a>
            <a className="footer-mail" href={`mailto:${contactEmail}`}>
              <Mail size={18} />
              {contactEmail}
            </a>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <span className="footer-col-title">Company</span>
              {navItems.map((item) => (
                <a key={item.path} href={item.path} onClick={navigateTo(item.path)}>
                  {item.label}
                </a>
              ))}
              <a href="/software-company-pannipitiya" onClick={navigateTo('/software-company-pannipitiya')}>
                Software Company in Pannipitiya
              </a>
            </div>
            <div>
              <span className="footer-col-title">Services</span>
              {servicePages.map((service) => (
                <a key={service.path} href={service.path} onClick={navigateTo(service.path)}>
                  {service.shortTitle}
                </a>
              ))}
            </div>
            <div className="footer-contact-col">
              <span className="footer-col-title">Contact</span>
              {contactEmails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="footer-sub-contact">
                  <Mail size={14} />
                  <span>{email}</span>
                </a>
              ))}
              {contactPhones.map((phone) => (
                <a key={phone.number} href={`tel:${phone.tel}`} className="footer-sub-contact" title={`Call ${phone.label}`}>
                  <Phone size={14} />
                  <span>
                    <strong>{phone.number}</strong>
                    <small> ({phone.label === 'Office Number' ? 'Office' : phone.label.split(' ')[0]})</small>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-action"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.72, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">Built for growth. Secured by practice.</p>
            <h2>Let's build your next release.</h2>
            <a className="primary-button footer-cta" href="/contact" onClick={navigateTo('/contact')}>
              Start a project
              <ArrowUpRight size={18} />
            </a>
            <div className="footer-socials" aria-label="TrustCoreLabs social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`TrustCoreLabs ${social.label}`}>
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>&copy; {new Date().getFullYear()} TrustCoreLabs. All rights reserved.</span>
          <span>Product engineering | Web & mobile | ERP | Digital growth</span>
        </motion.div>
      </motion.footer>
    </div>
  );
}

export { App };
