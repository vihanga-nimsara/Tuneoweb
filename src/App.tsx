import {
  MousePointerClick,
  Pin,
  AudioWaveform,
  LayoutTemplate,
  Share2,
  History,
  Check,
} from "lucide-react";
import PopupDemo from "@/components/PopupDemo";
import { ChromeLogo, PlatformIcon, PLATFORMS } from "@/components/PlatformIcon";

const FEATURES = [
  {
    title: "One-tap popup",
    body: "A compact 360×420 popup with a listen button, live waveform animation, and your 10 most recent matches.",
    icon: MousePointerClick,
  },
  {
    title: "Pin it into a side panel",
    body: "Expand the popup into a full side panel showing your complete match history with search, copy, and CSV export.",
    icon: Pin,
  },
  {
    title: "Recognizes any tab",
    body: "Background recording captures 8 seconds of audio from the active tab using tabCapture, even when the popup is closed.",
    icon: AudioWaveform,
  },
  {
    title: "Rich result cards",
    body: "Album art, artist, album, release date, label, and a copy-able link — all in a card that slides into view.",
    icon: LayoutTemplate,
  },
  {
    title: "Open on every platform",
    body: "Jump straight to Spotify, Apple Music, Deezer, YouTube, YouTube Music, or SoundCloud with one click.",
    icon: Share2,
  },
  {
    title: "History that persists",
    body: "Up to 25 matches saved in chrome.storage — browse, search, copy as a list, or export everything to CSV.",
    icon: History,
  },
];

const STEPS = [
  {
    title: "Install Tuneo",
    body: "One click from the Chrome Web Store or Edge Add-ons — no accounts or setup required.",
  },
  {
    title: "Play any song",
    body: "Start audio in any browser tab — a video, a stream, or background music.",
  },
  {
    title: "Tap the listen button",
    body: "Tuneo records 8 seconds, identifies the song with AudD, and shows you every way to listen to it.",
  },
];

const STORE_URL = "https://chromewebstore.google.com/";

const FAQ = [
  {
    q: "Is Tuneo free?",
    a: "Yes — Tuneo is free to install and use. Recognition is powered by AudD.",
  },
  {
    q: "Which browsers are supported?",
    a: "Chrome and Microsoft Edge. Install it from the Chrome Web Store or Edge Add-ons.",
  },
  {
    q: "Does Tuneo upload my audio anywhere?",
    a: "Only the short 8-second clip needed for recognition is sent to the AudD API. Your match history stays on your device in your browser's local storage.",
  },
  {
    q: "Do I need to sign up or have an account?",
    a: "No accounts, no sign-ups. Just install the extension and start identifying songs.",
  },
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Install", href: "#install" },
  { label: "FAQ", href: "#faq" },
];

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">♪</span> Tuneo
          </a>
          <nav className="topnav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="btn" href={STORE_URL} target="_blank" rel="noreferrer">
            Get it free
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-badge">The Shazam extension replacement</p>
              <h1>
                Identify any song
                <br />
                <span className="grad">playing in your browser</span>
              </h1>
              <p className="hero-sub">
                Tuneo is a free Chrome &amp; Edge extension that listens to the audio in any tab and
                tells you exactly what's playing — then sends you to Spotify, Apple Music, and more.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href={STORE_URL} target="_blank" rel="noreferrer">
                  <ChromeLogo size={16} />
                  Add to Chrome
                </a>
                <a className="btn" href="#how">
                  See how it works
                </a>
              </div>
              <ul className="hero-meta">
                <li>
                  <Check size={12} aria-hidden /> Free to use
                </li>
                <li>
                  <Check size={12} aria-hidden /> No account needed
                </li>
                <li>
                  <Check size={12} aria-hidden /> Chrome &amp; Edge
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <PopupDemo />
            </div>
          </div>
        </section>

        <section className="logos" id="features">
          <p className="eyebrow">Open matches on your favorite platforms</p>
          <div className="logos-row">
            {PLATFORMS.map((p) => (
              <span key={p.name} className="logo-chip">
                <PlatformIcon name={p.name} size={14} />
                {p.name}
              </span>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <p className="eyebrow">Features</p>
            <h2 className="section-title">Everything you need to catch a song</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">
                  <f.icon size={16} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="how">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 className="section-title">Three taps to a full music card</h2>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <div className="step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section install" id="install">
          <div className="section-head">
            <p className="eyebrow">Install</p>
            <h2 className="section-title">Get Tuneo in your browser</h2>
          </div>
          <div className="install-card">
            <div className="install-content">
              <ol className="install-steps">
                <li>Open the Chrome Web Store (or Edge Add-ons).</li>
                <li>
                  Click <strong>Add to Chrome</strong> — it installs in seconds.
                </li>
                <li>Pin Tuneo to your toolbar.</li>
                <li>Play any song and tap the listen button.</li>
              </ol>
              <a className="btn btn-primary" href={STORE_URL} target="_blank" rel="noreferrer">
                <ChromeLogo size={16} />
                Add to Chrome
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div className="faq-list">
            {FAQ.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-name">Tuneo</span>
          </div>
          <p className="footer-note">
            Recognition powered by{" "}
            <a href="https://audd.io" target="_blank" rel="noreferrer">
              AudD
            </a>
            . Tuneo is not affiliated with Shazam or Apple.
          </p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#install">Install</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
