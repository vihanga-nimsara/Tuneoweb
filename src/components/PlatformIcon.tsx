import type { IconType } from "react-icons";
import {
  SiSpotify,
  SiApplemusic,
  SiDeezer,
  SiYoutube,
  SiYoutubemusic,
  SiSoundcloud,
} from "react-icons/si";

const ICONS: Record<string, { Icon: IconType; color: string }> = {
  Spotify: { Icon: SiSpotify, color: "#1DB954" },
  "Apple Music": { Icon: SiApplemusic, color: "#FA243C" },
  Deezer: { Icon: SiDeezer, color: "#A238FF" },
  YouTube: { Icon: SiYoutube, color: "#FF0000" },
  "YouTube Music": { Icon: SiYoutubemusic, color: "#FF0000" },
  SoundCloud: { Icon: SiSoundcloud, color: "#FF5500" },
};

export function PlatformIcon({ name, size = 13 }: { name: string; size?: number }) {
  const entry = ICONS[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return <Icon size={size} color={color} aria-hidden />;
}

export function ChromeLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
    >
      <circle cx="24" cy="24" r="20" fill="#ffffff" />
      <path
        fill="#EA4335"
        d="M24 4a20 20 0 0 1 17.32 10H24a10 10 0 0 0-8.66 5L8.68 8.68A19.94 19.94 0 0 1 24 4z"
      />
      <path
        fill="#FBBC05"
        d="M8.68 8.68 15.34 20.1A10 10 0 0 0 24 34c.35 0 .7-.02 1.04-.05l-6.7 11.6A20 20 0 0 1 8.68 8.68z"
      />
      <path
        fill="#34A853"
        d="M41.32 14A20 20 0 0 1 24 44l8.66-15a10 10 0 0 0 0-10h8.66z"
      />
      <circle cx="24" cy="24" r="8" fill="#ffffff" />
      <circle cx="24" cy="24" r="6" fill="#4285F4" />
    </svg>
  );
}

export const PLATFORMS = [
  { name: "Spotify", color: "#1DB954" },
  { name: "Apple Music", color: "#FA243C" },
  { name: "Deezer", color: "#A238FF" },
  { name: "YouTube", color: "#FF0000" },
  { name: "YouTube Music", color: "#FF0000" },
  { name: "SoundCloud", color: "#FF5500" },
];
