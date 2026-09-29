import { caseStudies, caseStudyByPath, type CaseStudyPath } from './caseStudies';

export const siteUrl = 'https://www.trustcorelabs.com';
export const siteName = 'TrustCore Labs';
export const defaultSeoImage = `${siteUrl}/trustcore-logo-lockup.png`;

export const generalFaqs = [
  ['Can you build a full business system?', 'Yes. TrustCore Labs can shape custom software, ERP, CRM, POS, HRM, inventory, finance, and connected web or mobile portals around the business workflow.'],
  ['Do you handle both design and development?', 'Yes. The work can cover interface design, frontend, backend, deployment, and launch support so the product feels consistent end to end.'],
  ['Can marketing be included with software work?', 'Yes. Digital marketing, social media, brand promotion, and campaigns can be planned beside the product so launch and growth move together.'],
  ['Can we start small first?', 'Yes. A first release can focus on the highest-value workflow or public page, then grow into more modules after launch.'],
  ['Do you work with existing businesses?', 'Yes. We can improve an existing website, rebuild a workflow, or add a new business system beside current operations.'],
  ['What do you need to estimate a project?', 'A short description of the business, the users, the required features, current tools, deadline, and any examples you like is enough to begin the conversation.'],
] as const;

export const servicePages = [
  {
    path: '/web-development',
    shortTitle: 'Web Development',
    title: 'Web Development Services | TrustCore Labs',
    description: 'TrustCore Labs builds fast, accessible websites and web applications for businesses in Sri Lanka and international teams.',
    eyebrow: 'Web development',
    heading: 'Web development built around real business goals.',
    intro: 'We design and develop responsive websites and web applications that make services easier to understand, products easier to use, and business workflows easier to manage. Every build is planned for performance, accessibility, search visibility, and practical growth after launch.',
    problems: [
      'An outdated or slow website that weakens trust and loses enquiries.',
      'Manual customer journeys that should be handled through a secure web portal.',
      'A marketing site that is difficult for the internal team to update or expand.',
      'A web product that needs a clearer interface, stronger frontend, or dependable API integration.',
    ],
    capabilities: [
      'Corporate and service websites',
      'Responsive web applications',
      'Customer and partner portals',
      'Ecommerce and catalogue experiences',
      'API and third-party integrations',
      'Performance, accessibility, and technical SEO foundations',
    ],
    process: ['Discovery and content planning', 'Information architecture and UI design', 'Frontend and backend development', 'Quality assurance and responsive testing', 'Launch, measurement, and ongoing improvement'],
    technologies: 'Technology choices follow the product rather than a fixed template. Our work can include React and TypeScript interfaces, API-driven backends, secure authentication, databases, content management, analytics, and cloud deployment.',
    why: 'TrustCore Labs brings product thinking, interface design, engineering, and launch support into one delivery path. Based in Sri Lanka, we work with local businesses and international clients that value clear communication and maintainable software.',
    faqs: [
      ['Can you rebuild an existing website?', 'Yes. We can audit the current experience, preserve valuable content and search equity, then improve the structure, design, performance, and technology without disrupting the business unnecessarily.'],
      ['Will the website work well on mobile devices?', 'Yes. Responsive behavior is planned and tested across mobile, tablet, and desktop sizes as part of the build.'],
      ['Can you connect the website to our existing systems?', 'Yes. Where suitable APIs or integration options exist, we can connect forms, customer data, payments, inventory, CRM tools, and other business systems.'],
    ],
    relatedProjects: ['Dash Fashion', 'Focus Fitness', 'Fatbis'],
  },
  {
    path: '/mobile-app-development',
    shortTitle: 'Mobile App Development',
    title: 'Mobile App Development | TrustCore Labs',
    description: 'Plan, design, and build practical mobile apps with TrustCore Labs, serving Sri Lankan businesses and international product teams.',
    eyebrow: 'Mobile app development',
    heading: 'Mobile apps designed for useful, repeatable experiences.',
    intro: 'We help businesses turn a mobile product idea or operational need into a focused app with clear user journeys, reliable integrations, and a realistic release plan. The work can cover customer-facing apps, staff tools, booking flows, field operations, and mobile companions to larger business platforms.',
    problems: [
      'Customers need a faster way to book, order, track, or manage a service.',
      'Field or operations teams rely on fragmented messages and spreadsheets.',
      'A web platform needs a focused mobile experience for frequent tasks.',
      'An early app concept needs product definition before engineering begins.',
    ],
    capabilities: [
      'Product discovery and feature prioritization',
      'Mobile UI and interaction design',
      'Cross-platform application development',
      'Secure sign-in and role-based experiences',
      'Push notifications and device capabilities',
      'API integration, testing, and release support',
    ],
    process: ['Define users and the core job', 'Prototype the essential journeys', 'Build the app and connected services', 'Test devices, states, and edge cases', 'Prepare release and post-launch iterations'],
    technologies: 'We select a mobile approach based on the users, product scope, integrations, and maintenance needs. Delivery can include cross-platform interfaces, secure APIs, cloud data services, notifications, analytics, and deployment support.',
    why: 'Our team keeps the mobile interface, backend, and wider business workflow connected. That helps avoid an attractive app that fails when it meets real data, permissions, or day-to-day operations.',
    faqs: [
      ['Can you build for both iOS and Android?', 'Yes. We can plan a cross-platform product for both ecosystems when that is the right fit for the scope and audience.'],
      ['Do you help define the first version?', 'Yes. We can prioritize the smallest useful release, map dependencies, and separate launch essentials from later improvements.'],
      ['Can the app connect to an existing backend?', 'Yes. We first assess the available API, authentication, data quality, and security requirements before defining the integration work.'],
    ],
    relatedProjects: ['AI Hub', 'New Zealankanz'],
  },
  {
    path: '/custom-software-development',
    shortTitle: 'Custom Software',
    title: 'Custom Software Development | TrustCore Labs',
    description: 'TrustCore Labs creates secure custom software, portals, dashboards, and workflow systems for growing organizations.',
    eyebrow: 'Custom software development',
    heading: 'Custom software shaped around how your business actually works.',
    intro: 'Off-the-shelf tools often force teams into awkward processes. We design and build software around the users, rules, data, and decisions that make the business distinct, from focused internal tools to customer portals and full operational platforms.',
    problems: [
      'Critical work is spread across spreadsheets, messages, and disconnected tools.',
      'Existing software cannot support the roles, approvals, or reporting the team needs.',
      'Customers or partners need secure self-service access to information and actions.',
      'A product concept needs a scalable technical foundation and a clear first release.',
    ],
    capabilities: [
      'Workflow and requirements discovery',
      'SaaS products and business platforms',
      'Admin dashboards and reporting',
      'Customer, vendor, and staff portals',
      'Authentication, permissions, and audit-aware flows',
      'APIs, integrations, data migration, and cloud deployment',
    ],
    process: ['Map the workflow and decision rules', 'Define architecture and release scope', 'Design interfaces and data flows', 'Build and test in practical increments', 'Launch, support, and extend the platform'],
    technologies: 'A typical build may combine TypeScript, React, backend APIs, relational databases, secure identity, cloud hosting, and selected third-party services. Architecture is chosen for the product, expected usage, and the team that will maintain it.',
    why: 'TrustCore Labs connects business analysis with product design and engineering. Stakeholders can see how requirements become working software, while the technical foundation remains understandable and ready for future modules.',
    faqs: [
      ['How do you estimate custom software?', 'We begin with users, workflows, integrations, constraints, and the desired outcome. A discovery phase can turn an uncertain idea into an estimate and phased delivery plan.'],
      ['Can you improve an existing system?', 'Yes. We can assess the current codebase and workflow, then recommend targeted improvements, integration work, or a staged replacement.'],
      ['Who owns the software after launch?', 'Ownership and handover terms are agreed in the project scope so responsibilities, access, source code, and ongoing support are clear before work begins.'],
    ],
    relatedProjects: ['AI Hub', 'New Zealankanz'],
  },
  {
    path: '/business-systems',
    shortTitle: 'Business Systems & ERP',
    title: 'Business Systems & ERP Solutions | TrustCore Labs',
    description: 'Connect operations with custom ERP, CRM, POS, inventory, HR, finance, and reporting systems from TrustCore Labs.',
    eyebrow: 'Business systems and ERP',
    heading: 'Connected business systems for clearer daily operations.',
    intro: 'We help organizations replace fragmented operational work with connected systems for the teams, records, approvals, and reports they use every day. Solutions can focus on one high-value workflow or grow into a broader ERP-style platform over time.',
    problems: [
      'Teams re-enter the same data across multiple tools and spreadsheets.',
      'Managers cannot see reliable operational or financial information in time.',
      'Stock, sales, customers, staff, and approvals are managed in separate processes.',
      'A generic ERP is too rigid or complex for the organization’s actual workflow.',
    ],
    capabilities: [
      'ERP and modular operations platforms',
      'CRM and customer lifecycle workflows',
      'POS, sales, inventory, and purchasing',
      'HRM, attendance, and staff administration',
      'Finance workflows and management reporting',
      'Roles, approvals, dashboards, and system integrations',
    ],
    process: ['Observe the current operating workflow', 'Prioritize modules and shared data', 'Design roles, controls, and reporting', 'Deliver modules in testable phases', 'Train, launch, and improve with real usage'],
    technologies: 'Business systems commonly combine secure web interfaces, role-based access, APIs, relational data, audit-aware records, reporting, exports, and cloud deployment. Existing tools can be integrated where they remain useful.',
    why: 'We treat an ERP or business system as an operating change, not only a software build. The team maps how people work now, identifies the highest-value improvements, and keeps delivery understandable for business stakeholders.',
    faqs: [
      ['Do we need to replace every current tool?', 'No. A sensible plan can preserve useful tools, integrate them where practical, and replace only the workflows that create the most friction or risk.'],
      ['Can the system be delivered module by module?', 'Yes. Phased delivery is often the clearest way to reduce risk, learn from real use, and spread operational change over manageable releases.'],
      ['Can different staff roles have different access?', 'Yes. Role-based permissions, approvals, and appropriate data visibility are core parts of business-system planning.'],
    ],
    relatedProjects: ['New Zealankanz', 'Dash Fashion'],
  },
  {
    path: '/ui-ux-design',
    shortTitle: 'UI/UX Design',
    title: 'UI/UX Design Services | TrustCore Labs',
    description: 'TrustCore Labs designs clear, accessible interfaces and practical user journeys for websites, mobile apps, and business software.',
    eyebrow: 'UI/UX design',
    heading: 'Interface design that makes complex products feel clear.',
    intro: 'We design user journeys and interfaces for websites, mobile apps, dashboards, and operational software. The goal is not decoration alone: it is helping people understand what to do, complete tasks confidently, and move through the product with less friction.',
    problems: [
      'Users struggle to understand navigation, forms, or the next action.',
      'A product has grown without a consistent interface or component system.',
      'Complex workflows need to be made understandable for different user roles.',
      'A new concept needs validation before time is committed to development.',
    ],
    capabilities: [
      'User journeys and information architecture',
      'Wireframes and interactive prototypes',
      'Responsive website and app interfaces',
      'Dashboard and workflow design',
      'Design systems and reusable components',
      'Accessibility review and developer-ready specifications',
    ],
    process: ['Understand users, context, and constraints', 'Map content and essential journeys', 'Prototype structure and interactions', 'Refine visual design and reusable patterns', 'Support implementation and quality review'],
    technologies: 'Design work is prepared for responsive implementation and can include interaction prototypes, component specifications, content hierarchy, accessibility considerations, and close collaboration with frontend engineering.',
    why: 'Because design and engineering work together at TrustCore Labs, decisions are grounded in real implementation constraints. That keeps concepts ambitious while reducing ambiguity when the product moves into development.',
    faqs: [
      ['Can you design before we choose a development team?', 'Yes. We can create a clear product structure and prototype, with handoff material suitable for implementation planning.'],
      ['Do you work with an existing brand?', 'Yes. We can extend existing brand guidelines into a consistent digital interface while preserving the identity users already recognize.'],
      ['Does UI/UX work include mobile layouts?', 'Yes. Responsive and mobile behavior is considered from the beginning for websites and web applications, with device-specific thinking for mobile products.'],
    ],
    relatedProjects: ['Focus Fitness', 'Dash Fashion', 'Togo and Friends'],
  },
] as const;

export const coreRoutes = ['/', '/about', '/work', '/services', '/process', '/faq', '/contact'] as const;
export const serviceRoutes = servicePages.map((page) => page.path);
export const caseStudyRoutes = caseStudies.map((study) => study.path);
export type RoutePath = (typeof coreRoutes)[number] | (typeof servicePages)[number]['path'] | CaseStudyPath;
export const indexableRoutes: RoutePath[] = [...coreRoutes, ...serviceRoutes, ...caseStudyRoutes];

export type RouteMetadata = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const routeSeo: Record<RoutePath, RouteMetadata> = {
  '/': {
    title: 'TrustCore Labs | Web, Mobile & Software Development',
    description: 'TrustCore Labs builds websites, mobile apps, custom software, ERP solutions, and digital products for businesses in Sri Lanka and worldwide.',
  },
  '/about': {
    title: 'About TrustCore Labs | Software Development Team',
    description: 'Meet the Sri Lanka-based TrustCore Labs team connecting strategy, UI/UX, software engineering, business systems, and launch support.',
  },
  '/work': {
    title: 'Software Development Work & Case Studies | TrustCore Labs',
    description: 'Explore verified TrustCore Labs case studies and public project links across web development, UI/UX, software, and digital platforms.',
  },
  '/services': {
    title: 'Software, Web & Mobile Services | TrustCore Labs',
    description: 'Explore custom software, web and mobile development, ERP and business systems, UI/UX design, launch support, and digital growth services.',
  },
  '/process': {
    title: 'Our Software Development Process | TrustCore Labs',
    description: 'See how TrustCore Labs moves from discovery and UI/UX design through engineering, launch, support, and scalable product improvement.',
  },
  '/faq': {
    title: 'Software Project FAQ | TrustCore Labs',
    description: 'Answers about TrustCore Labs software builds, web and mobile development, business systems, project scope, estimates, and launch support.',
  },
  '/contact': {
    title: 'Contact TrustCore Labs | Start a Software Project',
    description: 'Contact TrustCore Labs in Sri Lanka to discuss a website, mobile app, custom software platform, ERP, CRM, POS, or UI/UX project.',
  },
  ...Object.fromEntries(servicePages.map((page) => [page.path, { title: page.title, description: page.description }])),
  ...Object.fromEntries(caseStudies.map((study) => [study.path, {
    title: study.seoTitle,
    description: study.metaDescription,
    image: `${siteUrl}${study.heroImage}`,
    imageAlt: study.heroAlt,
    imageWidth: study.heroImageWidth,
    imageHeight: study.heroImageHeight,
  }])),
} as Record<RoutePath, RouteMetadata>;

const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  alternateName: 'TrustCoreLabs',
  url: `${siteUrl}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/trustcore-logo-lockup.png`,
    width: 4200,
    height: 2000,
  },
  email: 'info@trustcorelabs.com',
  telephone: '+94112088358',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.257/3, Old Road, Moraketiya',
    addressLocality: 'Pannipitiya',
    postalCode: '10230',
    addressCountry: 'LK',
  },
  sameAs: [
    'https://instagram.com/trustcorelabs',
    'https://facebook.com/trustcorelabs',
    'https://linkedin.com/company/trustcorelabs',
    'https://x.com/TrustCoreLabs',
  ],
};

const breadcrumbName = (path: RoutePath) => {
  if (path === '/') return 'Home';
  const caseStudy = caseStudyByPath(path);
  if (caseStudy) return caseStudy.name;
  return servicePages.find((page) => page.path === path)?.shortTitle
    ?? ({ '/about': 'About', '/work': 'Projects', '/services': 'Services', '/process': 'Process', '/faq': 'FAQ', '/contact': 'Contact' } as Record<string, string>)[path];
};

export function getStructuredData(path: RoutePath) {
  const graph: Record<string, unknown>[] = [organization];

  if (path === '/') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    });
  }

  if (path !== '/') {
    const service = servicePages.find((page) => page.path === path);
    const caseStudy = caseStudyByPath(path);
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: caseStudy
        ? [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Work', item: `${siteUrl}/work` },
            { '@type': 'ListItem', position: 3, name: caseStudy.name, item: `${siteUrl}${caseStudy.path}` },
          ]
        : service
        ? [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
            { '@type': 'ListItem', position: 3, name: service.shortTitle, item: `${siteUrl}${path}` },
          ]
        : [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: breadcrumbName(path), item: `${siteUrl}${path}` },
          ],
    });
  }

  const service = servicePages.find((page) => page.path === path);
  if (service) {
    graph.push({
      '@type': 'Service',
      name: service.shortTitle,
      description: service.description,
      url: `${siteUrl}${service.path}`,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: [{ '@type': 'Country', name: 'Sri Lanka' }, 'Worldwide'],
      serviceType: service.shortTitle,
    });
    graph.push({
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  const caseStudy = caseStudyByPath(path);
  if (caseStudy) {
    graph.push({
      '@type': 'Article',
      '@id': `${siteUrl}${caseStudy.path}#case-study`,
      headline: caseStudy.name,
      description: caseStudy.metaDescription,
      url: `${siteUrl}${caseStudy.path}`,
      image: {
        '@type': 'ImageObject',
        url: `${siteUrl}${caseStudy.heroImage}`,
        width: caseStudy.heroImageWidth,
        height: caseStudy.heroImageHeight,
      },
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      about: caseStudy.services.map((item) => item.label),
      inLanguage: 'en',
    });
  }

  if (path === '/faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: generalFaqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
