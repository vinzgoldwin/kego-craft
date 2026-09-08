import {
  projects,
  services,
  processSteps,
  pricingOptions,
} from "./portfolio-data";
import MotionController from "./motion-controller";
import WorkSlider from "./work-slider";
import BrandEntrance from "./brand-entrance";

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
                <span className="service-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
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
              <article
                className={`process-step stagger-${index}`}
                data-reveal
                key={step.label}
              >
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
              <p>
                Small sites can stay on my setup for a monthly fee. If you want
                the code and infrastructure, I’ll hand over the whole thing.
              </p>
              <PrimaryButton>Tell me about your project</PrimaryButton>
            </div>
            <div className="pricing-table">
              {pricingOptions.map((option) => (
                <article className="price-row" data-reveal key={option.title}>
                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>
                  <div className="price">
                    {option.price}
                    <small>{option.suffix}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing">
          <h2 data-reveal>Have an idea worth making?</h2>
          <div data-reveal>
            <PrimaryButton>Email me</PrimaryButton>
          </div>
        </section>
      </main>
    </>
  );
}
