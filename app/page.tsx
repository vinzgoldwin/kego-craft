import MotionController from "./motion-controller";
import WorkSlider from "./work-slider";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

const projects = [
  {
    title: "Alkemy Chat",
    category: "AI product",
    description: "One quick place to talk to different models, search the web, and work with files.",
    href: "https://alkemychat.com/",
    linkLabel: "View product",
    className: "alkemy",
    video: "https://videos.kego.online/alkemy-chat/v2/demo.mp4",
    poster: "https://videos.kego.online/alkemy-chat/v2/poster.webp",
  },
  {
    title: "Biawak KOL",
    category: "Web app",
    description: "Scores, grudges, win rates, and one monthly MVP card for our game group.",
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
    description: "My answer to spending longer picking a film than watching one.",
    href: "https://github.com/vinzgoldwin/better-watch",
    linkLabel: "View source",
    className: "watch",
    video: "https://videos.kego.online/better-watch/v1/demo.mp4",
    poster: "https://videos.kego.online/better-watch/v1/poster.webp",
  },
  {
    title: "Asia Mega Pasifik",
    category: "Client website",
    description: "A straightforward company site for an industrial supplier in Indonesia.",
    href: "https://asiamegapasifik.com/",
    linkLabel: "Visit website",
    className: "amp",
    image: "https://asiamegapasifik.com/wp-content/uploads/2021/05/amp-2.png",
  },
];

const services = [
  {
    title: "Website",
    description: "A good website gets to the point. I design and build clear, fast sites that are easy for you to keep up to date.",
  },
  {
    title: "SaaS (Software as a Service)",
    description: "From the first useful version to the feature everyone keeps putting off. I handle the product and code, with AI where it earns its place.",
  },
  {
    title: "App (Android / iOS)",
    description: "One focused build for both platforms, with the navigation, touch, and small-screen details treated like they matter.",
  },
];

const processSteps = [
  {
    label: "Talk",
    title: "Show me what you’re trying to do.",
    description: "I ask questions, cut what does not matter, and write down the plan.",
  },
  {
    label: "Build",
    title: "See the work early.",
    description: "I share progress early, while changes are still easy.",
  },
  {
    label: "Launch",
    title: "Put it to work.",
    description: "We test the important paths, put it live, and ensure you can run it without me.",
  },
];

const pricingOptions = [
  {
    title: "Small site",
    description: "For a simple site that rarely changes. Hosting and uptime checks included.",
    price: "$5",
    suffix: "per month",
  },
  {
    title: "Business",
    description: "For a site or app that needs backups, monitoring, and quicker support.",
    price: "$25",
    suffix: "from, per month",
  },
  {
    title: "Own it",
    description: "You get the source code, accounts, and a clean handover.",
    price: "Quote",
    suffix: "one time",
  },
];

function Sidebar() {
  return (
    <aside className="site-sidebar">
      <a className="wordmark" href="#top" aria-label="Kego Works home">
        KEGO WORKS
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <a key={item.label} href={item.href}>
            <span>{item.label}</span>
            <small>{String(index + 1).padStart(2, "0")}</small>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a className="sidebar-cta" href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project">
          <span className="sidebar-cta-label">Start a project</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <a className="button button-primary" href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeader({ eyebrow, title, accent, intro }: { eyebrow: string; title: string; accent: string; intro?: string }) {
  return (
    <>
      <div className="section-topline" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="section-heading" data-reveal>
        {title}<br /><span>{accent}</span>
      </h2>
      {intro && <p className="section-intro" data-reveal>{intro}</p>}
    </>
  );
}

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <MotionController />
      <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
      <Sidebar />

      <section className="hero">
        <div className="hero-copy">
          <h1>What you need<br />I’ll build it</h1>
          <p className="hero-intro">
            I build websites and mobile apps for small teams. You work directly with me from the first conversation to launch.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Look around <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-secondary" href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project">Tell me about your project</a>
          </div>
        </div>

        <div className="studio-statement">
          <div>
            <h2>One person to design it,<br />build it, and get it live.</h2>
            <p className="studio-platforms">WEB <span>·</span> iOS <span>·</span> ANDROID</p>
          </div>
          <p>You talk to me, and I do the work. There are no layers in between.</p>
        </div>
      </section>

      <section className="section section-work" id="work">
        <SectionHeader
          eyebrow="Personal craft"
          title="A few things"
          accent="I’ve built."
        />

        <WorkSlider projects={projects} />
      </section>

      <section className="section" id="services">
        <SectionHeader
          eyebrow="Services"
          title="What you can"
          accent="hire me for."
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
      </section>

      <section className="section section-warm" id="process">
        <SectionHeader
          eyebrow="How I work"
          title="A short path to"
          accent="something real."
        />

        <div className="process-flow">
          {processSteps.map((step, index) => (
            <article className={`process-step stagger-${index}`} data-reveal key={step.label}>
              <div className="process-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft" id="pricing">
        <SectionHeader
          eyebrow="After launch"
          title="Keep it with me,"
          accent="or take it with you."
        />

        <div className="pricing-wrap">
          <div className="pricing-note" data-reveal>
            <p>Small sites can stay on my setup for a monthly fee. If you want the code and infrastructure, I’ll hand over the whole thing.</p>
            <PrimaryButton>Tell me about your project</PrimaryButton>
          </div>
          <div className="pricing-table">
            {pricingOptions.map((option) => (
              <article className="price-row" data-reveal key={option.title}>
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
        <h2 data-reveal>Have an idea worth making?</h2>
        <div data-reveal><PrimaryButton>Email me</PrimaryButton></div>
      </section>

    </main>
  );
}
