import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUpRight, Leaf, Coffee, Sparkles } from "lucide-react";
import { coffees } from "../catalog/coffee";
import { CoffeeCard } from "../catalog/CoffeeCard";

export function HomeScreen() {
  const { t } = useTranslation();
  return (
    <>
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            {t("home.eyebrow")}
          </p>
          <h1>
            {t("home.title")}
            <em>{t("home.titleAccent")}</em>
          </h1>
          <p className="hero-intro">{t("home.intro")}</p>
          <Link to="/coffees" className="button button-primary">
            {t("home.cta")}
            <ArrowUpRight size={20} />
          </Link>
          <div className="hero-bottom">
            <span className="thin-line" />
            <span>{t("home.scroll")}</span>
            <ArrowDown size={17} />
          </div>
          <Link to="/find-your-coffee" className="text-link hero-finder">
            {t("finder.entry")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="hero-photo">
          <img
            src="/images/roasting-hero.webp"
            alt={t("home.imageAlt")}
            width="1100"
            height="1375"
            fetchPriority="high"
          />
          <div className="hero-photo-caption">
            <span>BRUMA JOURNAL / NO. 01</span>
            <span>{t("home.imageCaption")}</span>
          </div>
          <div className="origin-stamp" aria-hidden="true">
            <span>{t("home.stampTop")}</span>
            <Leaf size={34} strokeWidth={1} />
            <span>{t("home.stampBottom")}</span>
          </div>
        </div>
      </section>
      <div className="origin-ribbon section-shell">
        <span>{t("country.panama")}</span>
        <i>✳</i>
        <span>{t("country.brazil")}</span>
        <i>✳</i>
        <span>{t("country.colombia")}</span>
        <i>✳</i>
        <span>{t("country.ethiopia")}</span>
        <i>✳</i>
        <span>BRUMA CAFÉ</span>
      </div>
      <section className="home-selection section-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("home.selectionLabel")}</p>
            <h2>
              {t("home.selectionTitle")} <em>{t("home.selectionAccent")}</em>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>{t("home.selectionCopy")}</p>
            <Link to="/coffees" className="text-link">
              {t("home.allCoffees")}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="home-coffee-grid">
          {[coffees[0], coffees[2], coffees[4]].map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </section>
      <section className="philosophy section-shell" id="philosophy">
        <div className="philosophy-copy">
          <p className="eyebrow">{t("home.philosophyLabel")}</p>
          <h2>
            {t("home.philosophyTitle")}
            <em>{t("home.philosophyAccent")}</em>
          </h2>
          <p>{t("home.philosophyCopy")}</p>
        </div>
        <div className="principles">
          {[Leaf, Coffee, Sparkles].map((Icon, index) => (
            <div className="principle" key={index}>
              <Icon size={25} strokeWidth={1.2} aria-hidden="true" />
              <div>
                <h3>{t(`home.principle${index + 1}`)}</h3>
                <p>{t(`home.principle${index + 1}Copy`)}</p>
              </div>
              <span className="principle-number">0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
