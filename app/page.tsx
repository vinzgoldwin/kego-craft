import {
  projects,
  services,
  pricingOptions,
} from "./portfolio-data";
import MotionController from "./motion-controller";
import WorkSlider from "./work-slider";
import BrandEntrance from "./brand-entrance";
import ProcessTimeline from "./process-timeline";

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      className="button button-primary"
      href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project"
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
}) {
  return (
    <>
      <div className="section-topline" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="section-heading" data-reveal>
        {title}
        <br />
        <span>{accent}</span>
      </h2>
      {intro && (
        <p className="section-intro" data-reveal>
          {intro}
        </p>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <BrandEntrance />
      <main className="site-shell" id="top">
        <MotionController />
        <noscript>
          <style>
            {"[data-reveal]{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>

        <section className="hero">
          <div className="hero-copy">
            <h1>
              What you need
              <br />
              <span>I’ll build it</span>
            </h1>
            <p className="hero-intro">
              I build websites and mobile apps for small teams. You work
              directly with me from the first conversation to launch.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Look around <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project"
              >
                Tell me about your project
              </a>
            </div>
          </div>

          <div className="studio-statement">
            <div>
              <h2>
                One person to design it,
                <br />
                build it, and get it live.
              </h2>
              <p className="studio-platforms">
                WEB <span>·</span> iOS <span>·</span> ANDROID
              </p>
            </div>
            <p>
              You talk to me, and I do the work. There are no layers in between.
            </p>
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
              <article
                className={`service stagger-${index}`}
                data-reveal
                key={service.title}
              >
                <img
                  className="service-icon"
                  src={service.icon}
                  alt=""
                  width={136}
                  height={120}
                />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-process" id="process">
          <div className="process-layout">
            <header className="process-heading">
              <p>How I work</p>
              <h2 className="section-heading">
                A short path to<br />
                <span>something real.</span>
              </h2>
            </header>
            <ProcessTimeline />
          </div>
        </section>

        <section className="section section-pricing" id="pricing">
          <h2 className="section-heading" data-reveal>
            Keep it with me,
            <br />
            <span>or take it</span>
          </h2>
          <p className="pricing-intro" data-reveal>
            I can host and look after your project, so you can get on with
            running your business. Prefer your own setup? I&apos;ll hand over the
            code and show you how it works.
          </p>

          <div className="pricing-plans">
              {pricingOptions.map((option) => (
                <article className="pricing-plan" data-reveal key={option.title}>
                  <h3>{option.title}</h3>
                  <p className="price">
                    {option.prefix && <span className="price-prefix">{option.prefix} </span>}
                    {option.price}
                    <small>{option.suffix}</small>
                  </p>
                  <p className="plan-description">{option.description}</p>
                  <ul className="plan-features">
                    {option.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>{feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
          <div className="pricing-action" data-reveal>
            <PrimaryButton>Tell me about your project</PrimaryButton>
          </div>
        </section>

      </main>
      <footer className="closing">
        <div className="closing-contact">
          <h2>
            Have something in mind?
            <br />
            <span>Let’s build it.</span>
          </h2>
          <a
            className="closing-email"
            href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project"
          >
            <span>kegoo.gg@gmail.com</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="closing-bottom">
          <img src="/brand/kego.svg" alt="KEGO" width={72} height={45} />
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
