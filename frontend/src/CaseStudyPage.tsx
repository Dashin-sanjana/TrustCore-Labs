import { ArrowUpRight, Check, ChevronRight, ExternalLink } from 'lucide-react';
import type { CaseStudy } from './caseStudies';

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="case-study">
      <header className="case-study-hero">
        <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><ChevronRight size={14} aria-hidden="true" />
          <a href="/work">Work</a><ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{study.name}</span>
        </nav>
        <div className="case-study-hero-grid">
          <div className="case-study-hero-copy">
            <p className="eyebrow">{study.eyebrow}</p>
            <h1>{study.name}</h1>
            <p className="case-study-summary">{study.summary}</p>
            <div className="case-study-hero-actions">
              <a className="primary-button" href="/contact">Start Your Project <ArrowUpRight size={18} /></a>
              <a className="secondary-button" href={study.liveUrl} target="_blank" rel="noreferrer">Visit Website <ExternalLink size={17} /></a>
            </div>
          </div>
          <dl className="case-study-facts">
            <div><dt>Project</dt><dd>{study.category}</dd></div>
            <div><dt>Services</dt><dd>{study.services.map((service) => service.label).join(', ')}</dd></div>
            <div><dt>Technology</dt><dd>{study.technologies.join(', ')}</dd></div>
          </dl>
        </div>
      </header>

      <figure className="case-study-media">
        <img
          src={study.heroImage}
          alt={study.heroAlt}
          width={study.heroImageWidth}
          height={study.heroImageHeight}
          decoding="async"
          fetchPriority="high"
        />
        <figcaption>Responsive TrustCore Labs homepage interface.</figcaption>
      </figure>

      <section className="case-study-section case-study-intro" aria-labelledby="case-overview-title">
        <div><p className="eyebrow">Project overview</p><h2 id="case-overview-title">A clearer digital home for a connected software offering.</h2></div>
        <p>{study.overview}</p>
      </section>

      <section className="case-study-section case-study-split" aria-label="Challenge and solution">
        <div><p className="eyebrow">The challenge</p><h2>Present breadth without losing clarity.</h2><p>{study.challenge}</p></div>
        <div><p className="eyebrow">Our solution</p><h2>One system for brand, content, and search.</h2><p>{study.solution}</p></div>
      </section>

      <section className="case-study-section" aria-labelledby="case-features-title">
        <div className="case-study-section-heading"><p className="eyebrow">Key features</p><h2 id="case-features-title">What the delivered website includes.</h2></div>
        <div className="case-study-feature-grid">
          {study.features.map((feature) => <div key={feature}><Check size={18} /><span>{feature}</span></div>)}
        </div>
      </section>

      <section className="case-study-section case-study-approach" aria-labelledby="case-approach-title">
        <div className="case-study-section-heading"><p className="eyebrow">Development approach</p><h2 id="case-approach-title">A practical path from audit to release.</h2></div>
        <ol>{study.approach.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="case-study-section case-study-split" aria-label="Architecture and outcome">
        <div><p className="eyebrow">Technical architecture</p><h2>Fast pages with centralized SEO controls.</h2><p>{study.architecture}</p></div>
        <div><p className="eyebrow">Outcome</p><h2>A maintainable platform ready for verified work.</h2><p>{study.outcome}</p></div>
      </section>

      <section className="case-study-section case-study-services" aria-labelledby="case-services-title">
        <div><p className="eyebrow">Services used</p><h2 id="case-services-title">Explore the capabilities behind this project.</h2></div>
        <div>{study.services.map((service) => <a href={service.href} key={service.href}>{service.label}<ArrowUpRight size={17} /></a>)}</div>
      </section>

      <section className="home-final-cta case-study-cta">
        <span>Planning a similar project?</span>
        <h2>Turn the idea into a practical digital product.</h2>
        <p>Tell us what you&apos;re building and we&apos;ll help shape a clear path from requirements to release.</p>
        <div className="case-study-hero-actions">
          <a className="primary-button" href="/contact">Start Your Project <ArrowUpRight size={18} /></a>
          <a className="secondary-button" href="mailto:info@trustcorelabs.com">Contact Us</a>
        </div>
      </section>
    </article>
  );
}
