import SelectedWork from "./selected-work";

const navItems = [
  { label: "WORK", href: "#selected-work" },
  { label: "PRICING", href: "#pricing" },
  { label: "PROCESS", href: "#process" },
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
      <span className="globe" aria-hidden="true">◎</span>
    </header>
  );
}

function SectionRail({ active }: { active: string }) {
  return (
    <aside className="section-rail" aria-hidden="true">
      <div className="rail-cross" />
      <ol>
        {["01", "02", "03", "04"].map((number) => (
          <li className={number === active ? "active" : ""} key={number}>
            <span>{number}</span>
            {number === active && <i />}
          </li>
        ))}
      </ol>
      <div className="rail-target"><span /></div>
    </aside>
  );
}

function Phone({ variant = "ios" }: { variant?: "ios" | "android" }) {
  return (
    <div className={`phone phone-${variant}`} aria-hidden="true">
      <div className="phone-notch" />
      <div className="phone-top">
        <strong>KEGO<br />WORKS</strong>
        <span>≡</span>
      </div>
      <p className="screen-label">{variant === "ios" ? "MOBILE EXPERIENCE" : "ANDROID APPS"}</p>
      <p className="screen-title">
        {variant === "ios" ? <>Smooth<br />by design.<br /><em>Fast by<br />default.</em></> : <>Made for<br />people.<br /><em>Ready to<br />grow.</em></>}
      </p>
      <p className="screen-copy">Thoughtful products that feel fast and stay simple.</p>
    </div>
  );
}

function BrowserFrame() {
  return (
    <div className="browser-frame" aria-hidden="true">
      <div className="browser-bar">
        <span className="traffic-lights">● ● ●</span>
        <span className="address">kegoworks.studio</span>
      </div>
      <div className="browser-content">
        <div className="browser-nav"><strong>KEGO WORKS</strong><span>WORK&nbsp;&nbsp;&nbsp; PRICING&nbsp;&nbsp;&nbsp; PROCESS</span></div>
        <p className="screen-label">DIGITAL PRODUCTS</p>
        <p className="browser-title">Fast websites<br />and apps.<br /><em>Built to last.</em></p>
        <p className="browser-copy">Clean code. Thoughtful design.<br />Shipped fast.</p>
        <span className="mini-button">START A PROJECT</span>
      </div>
    </div>
  );
}

function DeviceStack({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`device-stack ${compact ? "compact" : ""}`} aria-label="Website, iOS and Android product previews">
      <BrowserFrame />
      <Phone variant="ios" />
      <Phone variant="android" />
    </div>
  );
}

function PrimaryButton({ children, href = "mailto:hello@kegoworks.studio?subject=Start%20a%20project" }: { children: React.ReactNode; href?: string }) {
  return <a className="button button-primary" href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  return (
    <main id="top">
      <Header />

      <section className="hero section-shell">
        <SectionRail active="01" />
        <div className="hero-copy reveal-one">
          <h1>A BETTER SITE,<br />WITHOUT THE<br />AGENCY BILL.</h1>
          <p>Launch from $5/month. Cancel anytime,<br />or buy the source code outright.</p>
          <div className="hero-actions">
            <PrimaryButton>START A PROJECT</PrimaryButton>
            <a className="button button-outline" href="#pricing">SEE PRICING</a>
          </div>
          <p className="platforms">WEB <i /> IOS <i /> ANDROID</p>
        </div>
        <div className="hero-media reveal-two">
          <span className="hero-number" aria-hidden="true">05</span>
          <DeviceStack />
        </div>
      </section>

      <section className="selected-work section-shell" id="selected-work">
        <SectionRail active="02" />
        <SelectedWork />
      </section>

      <section className="ways section-shell" id="process">
        <SectionRail active="03" />
        <div className="ways-title">
          <h2>TWO WAYS<br />TO WORK<span>.</span></h2>
        </div>
        <div className="ways-grid">
          <article>
            <p className="eyebrow">MONTHLY</p>
            <h3>Start small.<br />Stay flexible.</h3>
            <p className="accent-copy">From $5/month</p>
            <p>Hosting and basic care included.<br />Cancel anytime.</p>
            <PrimaryButton>GET STARTED</PrimaryButton>
          </article>
          <article>
            <p className="eyebrow">OWN IT</p>
            <h3>Buy once.<br />Keep everything.</h3>
            <p>Full source code.<br />Your infrastructure account.</p>
            <a className="text-link" href="#contact">ASK ABOUT BUYOUT</a>
          </article>
        </div>
        <div className="ways-media"><DeviceStack compact /></div>
      </section>

      <section className="pricing section-shell" id="pricing">
        <SectionRail active="04" />
        <div className="pricing-header">
          <span className="giant-number" aria-hidden="true">03</span>
          <h2>START SMALL.<br />SCALE WHEN YOU NEED IT.</h2>
        </div>
        <div className="pricing-grid">
          <article>
            <p className="eyebrow">SMALL SITE</p>
            <p className="price"><sup>$</sup>5 <small>/ MONTH</small></p>
            <ul>
              <li>Cloudflare free allowance</li>
              <li>Basic hosting and uptime</li>
              <li>Changes quoted separately</li>
            </ul>
          </article>
          <article>
            <p className="recommendation">RECOMMENDED STARTING TIER</p>
            <p className="eyebrow plain">BUSINESS</p>
            <p className="price"><small className="from">FROM</small><sup>$</sup>25 <small>/ MONTH</small></p>
            <ul>
              <li>Higher usage allowance</li>
              <li>Monitoring and backups</li>
              <li>Priority support</li>
            </ul>
          </article>
          <article>
            <p className="eyebrow plain">OWN IT</p>
            <p className="quote-price">ONE-TIME QUOTE</p>
            <ul>
              <li>Full source code</li>
              <li>Infrastructure handover</li>
              <li>Optional maintenance</li>
            </ul>
          </article>
        </div>
        <div className="pricing-footer">
          <PrimaryButton>START A PROJECT</PrimaryButton>
          <p>Infrastructure and third-party usage are billed separately after the included allowance.</p>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark" href="#top">KEGO WORKS</a>
        <nav aria-label="Footer navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a href="mailto:hello@kegoworks.studio">EMAIL</a>
        <span>© 2026 KEGO WORKS</span>
      </footer>
    </main>
  );
}
