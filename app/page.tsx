import MotionController from "./motion-controller";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
];

const projects = [
  {
    title: "Alkemy Chat",
    category: "AI product",
    status: "Live",
    description: "Multi-model chat with search, files, images, and fast streaming responses.",
    href: "https://alkemychat.com/",
    linkLabel: "View product",
    className: "alkemy",
    video: "https://videos.kego.online/alkemy-chat/v2/demo.mp4",
    poster: "https://videos.kego.online/alkemy-chat/v2/poster.webp",
  },
  {
    title: "Biawak KOL",
    category: "Web app",
    status: "Live",
    description: "Game tracking, player rankings, win rates, history, and monthly MVP cards.",
    href: "https://biawakkol.pages.dev/",
    linkLabel: "Open app",
    className: "biawak",
    video: "https://videos.kego.online/biawak-kol/v2/demo.mp4",
    poster: "https://videos.kego.online/biawak-kol/v2/poster.webp",
  },
  {
    title: "Better Watch",
    category: "Small tool",
    status: "Open source",
    description: "A cheerful watchlist that keeps films and shows out of the endless scroll.",
    href: "https://github.com/vinzgoldwin/better-watch",
    linkLabel: "View source",
    className: "watch",
    video: "https://videos.kego.online/better-watch/v1/demo.mp4",
    poster: "https://videos.kego.online/better-watch/v1/poster.webp",
  },
  {
    title: "Asia Mega Pasifik",
    category: "Client website",
    status: "Live",
    description: "Corporate website for an industrial procurement and services company.",
    href: "https://asiamegapasifik.com/",
    linkLabel: "Visit website",
    className: "amp",
    image: "https://asiamegapasifik.com/wp-content/uploads/2021/05/amp-2.png",
  },
];

const services = [
  {
    title: "Websites",
    description: "Fast marketing sites, company sites, and focused landing pages that are simple to maintain.",
  },
  {
    title: "Product apps",
    description: "Useful web and mobile applications with clear flows, thoughtful states, and solid performance.",
  },
  {
    title: "Product improvements",
    description: "Focused redesigns and engineering work for products that need to feel clearer, faster, or more complete.",
  },
];

const processSteps = [
  {
    label: "Shape",
    title: "Find the useful core.",
    description: "Clarify the audience, constraint, and smallest version worth shipping.",
  },
  {
    label: "Build",
    title: "Make it feel obvious.",
    description: "Design and engineering move together through short, visible iterations.",
  },
  {
    label: "Ship",
    title: "Launch it cleanly.",
    description: "Deploy, document, and hand over a product that is ready for real use.",
  },
];

const pricingOptions = [
  {
    title: "Small site",
    description: "Basic hosting and uptime included. Changes quoted separately.",
    price: "$5",
    suffix: "per month",
  },
  {
    title: "Business",
    description: "Higher usage allowance, monitoring, backups, and priority support.",
    price: "$25",
    suffix: "from, per month",
    recommended: true,
  },
  {
    title: "Own it",
    description: "Full source code, infrastructure handover, and optional maintenance.",
    price: "Quote",
    suffix: "one time",
  },
];

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Kego Works home">
        KEGO WORKS
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="mailto:hello@kegoworks.studio?subject=Start%20a%20project">
        Start a project <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <a className="button button-primary" href="mailto:hello@kegoworks.studio?subject=Start%20a%20project">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeader({ eyebrow, number, title, accent, intro }: { eyebrow: string; number: string; title: string; accent: string; intro?: string }) {
  return (
    <>
      <div className="section-topline" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <span className="section-number">{number}</span>
      </div>
      <h2 className="section-heading" data-reveal>
        {title}<br /><span>{accent}</span>
      </h2>
      {intro && <p className="section-intro" data-reveal>{intro}</p>}
    </>
  );
}

function ProjectMedia({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`work-media ${project.className}`} data-reveal="media">
      {project.video ? (
        <video controls muted playsInline preload="none" poster={project.poster} aria-label={`${project.title} product demo`}>
          <source src={project.video} type="video/mp4" />
        </video>
      ) : (
        <a
          className="work-image-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title}`}
        >
          <span className="work-image" style={{ backgroundImage: `url(${project.image})` }} />
        </a>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <MotionController />
      <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
      <Header />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Websites and apps, built simply</p>
          <h1>Products people enjoy using.</h1>
          <p className="hero-intro">
            I design and build fast websites and apps, from a useful first release to a product ready to grow.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-secondary" href="#pricing">See pricing</a>
          </div>
        </div>

        <div className="product-window hero-window">
          <div className="window-bar" aria-hidden="true">
            <span className="traffic-lights">● ● ●</span>
            <span>alkemychat.com</span>
            <span />
          </div>
          <video muted playsInline preload="none" poster="https://videos.kego.online/alkemy-chat/v2/poster.webp" aria-label="Alkemy Chat product interface">
            <source src="https://videos.kego.online/alkemy-chat/v2/demo.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="hero-proof">
          Good products do not need an agency-sized process. <strong>They need clear decisions, focused building, and careful details.</strong>
        </p>
      </section>

      <section className="section section-soft" id="work">
        <SectionHeader
          eyebrow="Selected work"
          number="01 / 04"
          title="Shipped work."
          accent="Real products."
          intro="A mix of independent products, focused tools, and client work across web and mobile."
        />

        <div className="work-list">
          {projects.map((project, index) => (
            <article className="work-item" key={project.title}>
              <ProjectMedia project={project} />
              <div className="work-copy" data-reveal>
                <div className="work-index">
                  <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                  <span>{project.linkLabel}</span><span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="services">
        <SectionHeader
          eyebrow="What I provide"
          number="02"
          title="From useful idea"
          accent="to working product."
          intro="Design and engineering stay together, which keeps decisions quick and the finished product coherent."
        />

        <div className="services-grid">
          {services.map((service, index) => (
            <article className={`service stagger-${index}`} data-reveal key={service.title}>
              <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <p className="platform-line" data-reveal>
          <span>WEB</span><i /><span>IOS</span><i /><span>ANDROID</span>
        </p>
      </section>

      <section className="section section-warm" id="process">
        <SectionHeader
          eyebrow="Simple process"
          number="03"
          title="Clear steps."
          accent="No theatre."
          intro="The work stays visible and decisions stay close to the product."
        />

        <div className="process-flow">
          {processSteps.map((step, index) => (
            <article className={`process-step stagger-${index}`} data-reveal key={step.label}>
              <strong>{String(index + 1).padStart(2, "0")} / {step.label}</strong>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft" id="pricing">
        <SectionHeader
          eyebrow="Ways to work"
          number="04"
          title="Start small."
          accent="Keep control."
        />

        <div className="pricing-wrap">
          <div className="pricing-note" data-reveal>
            <p>Start with a small monthly setup or own the source outright. The right option depends on how much control and ongoing support you need.</p>
            <PrimaryButton>Ask about your project</PrimaryButton>
          </div>
          <div className="pricing-table">
            {pricingOptions.map((option) => (
              <article className={`price-row${option.recommended ? " recommended" : ""}`} data-reveal key={option.title}>
                <div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </div>
                <div className="price">{option.price}<small>{option.suffix}</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <p className="closing-eyebrow" data-reveal>Have something useful in mind?</p>
        <h2 data-reveal>Let&apos;s make it simple and ship it.</h2>
        <div data-reveal><PrimaryButton>Start a project</PrimaryButton></div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#top">KEGO WORKS</a>
        <nav aria-label="Footer navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a href="mailto:hello@kegoworks.studio">Email</a>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
