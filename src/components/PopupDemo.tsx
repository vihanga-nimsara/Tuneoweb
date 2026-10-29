import { useEffect, useRef, useState } from "react";
import { PlatformIcon, PLATFORMS } from "./PlatformIcon";

const PLATFORM_ORDER = PLATFORMS.map((p) => p.name);

interface DemoTrack {
  image: string;
  title: string;
  artist: string;
  album: string;
  release: string;
}

const TRACKS: DemoTrack[] = [
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/cb/7b/a9/cb7ba903-b5f1-cc21-90db-7a81b7aa0997/724596951057.jpg/600x600bb.jpg",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    release: "2011",
  },
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/43/5f/e8435ffa-b6b9-b171-40ab-4ff3959ab661/886443919266.jpg/600x600bb.jpg",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    release: "2013",
  },
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/6e/bf/a66ebf79-5008-8948-b352-a790fc87446b/19UM1IM04638.rgb.jpg/600x600bb.jpg",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    release: "2020",
  },
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/600x600bb.jpg",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    release: "2020",
  },
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/52/aa/85/52aa851f-15b7-6322-f91f-df84b15b7b19/190295978044.jpg/600x600bb.jpg",
    title: "Viva La Vida",
    artist: "Coldplay",
    album: "Viva la Vida or Death and All His Friends",
    release: "2008",
  },
  {
    image: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    release: "1982",
  },
];

interface MatchEntry {
  id: string;
  track: DemoTrack;
  matchedAt: number;
}

const SEED_HISTORY: MatchEntry[] = [
  { id: "seed-1", track: TRACKS[1], matchedAt: Date.now() - 1000 * 60 * 60 * 3 },
  { id: "seed-2", track: TRACKS[2], matchedAt: Date.now() - 1000 * 60 * 60 * 27 },
  { id: "seed-3", track: TRACKS[3], matchedAt: Date.now() - 1000 * 60 * 60 * 52 },
];

function relativeTime(matchedAt: number): string {
  const diff = Date.now() - matchedAt;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

function platformHref(platform: string, track: DemoTrack): string {
  const q = encodeURIComponent(`${track.title} ${track.artist}`);
  switch (platform) {
    case "Spotify":
      return `https://open.spotify.com/search/${q}`;
    case "Apple Music":
      return `https://music.apple.com/us/search?term=${q}`;
    case "Deezer":
      return `https://www.deezer.com/search/${q}`;
    case "YouTube":
      return `https://www.youtube.com/results?search_query=${q}`;
    case "YouTube Music":
      return `https://music.youtube.com/search?q=${q}`;
    case "SoundCloud":
      return `https://soundcloud.com/search?q=${q}`;
    default:
      return "#";
  }
}

export default function PopupDemo() {
  const [phase, setPhase] = useState<"listening" | "matched">("listening");
  const [history, setHistory] = useState<MatchEntry[]>(SEED_HISTORY);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const cycle = () => {
      setPhase("listening");
      timersRef.current.push(
        setTimeout(() => {
          if (cancelled) return;
          const track = TRACKS[indexRef.current % TRACKS.length];
          indexRef.current += 1;
          const id = `${Date.now()}-${indexRef.current}`;
          setPhase("matched");
          setHistory((prev) => [{ id, track, matchedAt: Date.now() }, ...prev].slice(0, 4));
          setExpandedId(id);
          timersRef.current.push(
            setTimeout(() => {
              if (cancelled) return;
              setExpandedId(null);
              timersRef.current.push(setTimeout(cycle, 1100));
            }, 3000)
          );
        }, 2200)
      );
    };
    cycle();
    return () => {
      cancelled = true;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [visible]);

  return (
    <div className="pd" ref={ref} aria-label="Tuneo popup demo">
      <div className="pd-bar">
        <span className="pd-logo">Tuneo</span>
        <div className="pd-actions">
          <span className="pd-greet">Hi, alex</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" className="pd-icon" aria-hidden>
            <path d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v6H4zM14 15h6v6h-6z" />
          </svg>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" className="pd-icon" aria-hidden>
            <path d="M12 17v5m-3-5 3 3 3-3M7 12h10M5 8h14M9 8V4h6v4" />
          </svg>
        </div>
      </div>

      <div className="pd-status">
        <div className={`pd-btn ${phase === "listening" ? "is-listening" : ""}`}>
          {phase === "listening" && (
            <>
              <span className="pd-ring" style={{ animationDelay: "0s" }} />
              <span className="pd-ring" style={{ animationDelay: "0.8s" }} />
              <span className="pd-ring" style={{ animationDelay: "1.6s" }} />
            </>
          )}
          <span className="pd-btn-icon">♪</span>
        </div>
        <p className={`pd-status-text ${phase === "matched" ? "is-matched" : ""}`}>
          {phase === "listening" ? "Listening…" : "Song identified!"}
        </p>
      </div>

      {history.length > 0 && <p className="pd-label">Recent matches</p>}
      <div className="pd-cards">
        {history.map((entry, i) => {
          const t = entry.track;
          const expanded = expandedId === entry.id;
          const isLatest = i === 0;
          return (
            <div
              key={entry.id}
              className={`pd-card ${isLatest ? "is-latest" : ""} ${expanded ? "is-expanded" : ""}`}
            >
              <div className="pd-card-row">
                <img className="pd-art" src={t.image} alt={t.title} loading="lazy" decoding="async" />
                <div className="pd-meta">
                  <div className="pd-title">{t.title}</div>
                  <div className="pd-artist">{t.artist}</div>
                </div>
                <span className="pd-time">{relativeTime(entry.matchedAt)}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`pd-chev ${expanded ? "rotated" : ""}`}
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              {expanded && (
                <div className="pd-detail">
                  <div className="pd-row">
                    <span className="pd-row-label">Album</span>
                    <span className="pd-row-val">{t.album}</span>
                  </div>
                  <div className="pd-row">
                    <span className="pd-row-label">Released</span>
                    <span className="pd-row-val">{t.release}</span>
                  </div>
                  <div className="pd-row">
                    <span className="pd-row-label">Listen</span>
                    <span className="pd-links">
                      {PLATFORM_ORDER.map((p) => (
                        <a
                          key={p}
                          className="pd-link"
                          href={platformHref(p, t)}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <PlatformIcon name={p} />
                          {p}
                        </a>
                      ))}
                    </span>
                  </div>
                  <span className="pd-matched">Matched {relativeTime(entry.matchedAt)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {history.length > 0 && (
        <div className="pd-more">
          <span>See all matches</span>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </div>
      )}
    </div>
  );
}