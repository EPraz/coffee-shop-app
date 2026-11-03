import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download } from "lucide-react";
import content from "./content.json";
import "./walkthrough.css";

function time(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function WalkthroughScreen() {
  const { t } = useTranslation();
  const video = useRef<HTMLVideoElement>(null);
  const seek = (seconds: number) => {
    if (!video.current) return;
    video.current.currentTime = seconds;
    video.current.focus();
  };
  return (
    <section className="section-shell walkthrough-screen">
      <header className="walkthrough-heading">
        <div>
          <p className="eyebrow">BRUMA / {content.durationLabel}</p>
          <h1>{t("walkthrough.title")}</h1>
          <p>{t("walkthrough.intro")}</p>
        </div>
        <Link to="/" className="text-link">
          {t("walkthrough.explore")} <ArrowUpRight size={18} />
        </Link>
      </header>
      <video
        ref={video}
        className="walkthrough-video"
        controls
        playsInline
        preload="metadata"
        poster="/walkthrough/poster.jpg"
        aria-label={t("walkthrough.title")}
      >
        <source src="/walkthrough/bruma-walkthrough.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="/walkthrough/bruma-walkthrough.vtt"
          srcLang="en"
          label="English"
        />
        <a href="/walkthrough/bruma-walkthrough.mp4">
          {t("walkthrough.download")}
        </a>
      </video>
      <div className="walkthrough-meta">
        <p>{t("walkthrough.format")}</p>
        <a href="/walkthrough/bruma-walkthrough.mp4" download>
          <Download size={16} /> {t("walkthrough.download")}
        </a>
      </div>
      <div className="walkthrough-details">
        <section aria-labelledby="walkthrough-chapters">
          <h2 id="walkthrough-chapters">{t("walkthrough.chapters")}</h2>
          <ol className="walkthrough-chapters" lang="en">
            {content.chapters.map((chapter) => (
              <li key={chapter.id}>
                <button type="button" onClick={() => seek(chapter.start)}>
                  <span>{time(chapter.start)}</span> {chapter.title}
                </button>
              </li>
            ))}
          </ol>
        </section>
        <details className="walkthrough-transcript">
          <summary>{t("walkthrough.transcript")}</summary>
          <ol lang="en">
            {content.chapters.map((chapter) => (
              <li key={chapter.id}>
                <h3>
                  <span>{time(chapter.start)}</span> {chapter.title}
                </h3>
                <p>{chapter.caption}</p>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
