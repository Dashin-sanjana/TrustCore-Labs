export type CaseStudy = {
  slug: string;
  path: `/work/${string}`;
  name: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  category: string;
  summary: string;
  heroImage: string;
  heroImageWidth: number;
  heroImageHeight: number;
  heroAlt: string;
  overview: string;
  challenge: string;
  solution: string;
  features: readonly string[];
  technologies: readonly string[];
  approach: readonly string[];
  architecture: string;
  outcome: string;
  services: readonly { label: string; href: string }[];
  liveUrl: string;
};

export const caseStudies = [
  {
    slug: 'trustcore-labs-website',
    path: '/work/trustcore-labs-website',
    name: 'TrustCore Labs Website',
    seoTitle: 'TrustCore Labs Website | Web Development Case Study',
    metaDescription: 'See how TrustCore Labs built its responsive company website with React, TypeScript, technical SEO, service pages, and a distinctive animated interface.',
    eyebrow: 'Verified internal project',
    category: 'Company website and digital platform',
    summary: 'A responsive, search-ready company website that presents TrustCore Labs services, process, public work, and contact paths in one consistent black-and-gold experience.',
    heroImage: '/work/trustcore-labs-home.webp',
    heroImageWidth: 1600,
    heroImageHeight: 1024,
    heroAlt: 'TrustCore Labs website homepage with black and gold interface and animated human figure',
    overview: 'TrustCore Labs needed a company website that could explain a broad software offering without losing the visual identity of the brand. The delivered site brings service information, process content, portfolio navigation, frequently asked questions, and contact details into a responsive multi-page experience.',
    challenge: 'The website had to support several commercial service intents, preserve a distinctive animated character, and remain usable across desktop, tablet, and mobile layouts. It also needed crawlable routes and complete page metadata without adding a heavy content platform or unnecessary runtime dependencies.',
    solution: 'We built a route-aware React interface with reusable content patterns, focused service pages, responsive navigation, and a restrained motion system. A prerender step creates indexable HTML for every public route while shared SEO utilities keep titles, descriptions, canonicals, Open Graph data, and structured data consistent.',
    features: [
      'Responsive homepage and service navigation',
      'Dedicated web, mobile, software, business-system, and UI/UX service pages',
      'Animated particle character retained as a core brand element',
      'Prerendered public routes with page-specific metadata',
      'Organization, website, service, breadcrumb, and FAQ structured data',
      'Sitemap, robots directives, social metadata, and branded contact paths',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'WebGL', 'CSS', 'JSON-LD'],
    approach: [
      'Audit the existing content, visual system, routes, and SEO foundation',
      'Unify the interface around the approved black-and-gold brand palette',
      'Create reusable service and page patterns instead of isolated layouts',
      'Tune responsive behavior and animation across desktop, tablet, and mobile',
      'Prerender indexable routes and verify production output',
    ],
    architecture: 'The frontend uses a shared React application for page rendering and a small server-rendering entry for static prerendering. Route metadata and structured data are defined centrally, while the production build emits standalone HTML documents for crawlable public URLs.',
    outcome: 'The project delivered a responsive company website with focused service pages, consistent brand presentation, crawlable internal links, technical SEO controls, and a reusable foundation for publishing verified case studies. No unverified performance or commercial outcome is claimed.',
    services: [
      { label: 'Web Development', href: '/web-development' },
      { label: 'UI/UX Design', href: '/ui-ux-design' },
      { label: 'Custom Software Development', href: '/custom-software-development' },
    ],
    liveUrl: 'https://www.trustcorelabs.com/',
  },
] as const satisfies readonly CaseStudy[];

export type CaseStudyPath = (typeof caseStudies)[number]['path'];

export const caseStudyByPath = (path: string) => caseStudies.find((study) => study.path === path);
