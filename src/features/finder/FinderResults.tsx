import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, RotateCcw, Check } from "lucide-react";
import { CoffeeCard } from "../catalog/CoffeeCard";
import { findMatches, type Preferences } from "./finder-model";

export function FinderResults({
  preferences,
  onRestart,
}: {
  preferences: Preferences;
  onRestart: () => void;
}) {
  const { t } = useTranslation();
  const heading = useRef<HTMLHeadingElement>(null);
  const matches = findMatches(preferences);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  return (
    <div className="finder-results">
      <div className="finder-result-intro">
        <h2 ref={heading} tabIndex={-1}>
          {t("finder.results")}
        </h2>
        <button className="text-link" onClick={onRestart}>
          <RotateCcw size={16} />
          {t("finder.restart")}
        </button>
      </div>
      {matches.length ? (
        <div className="finder-result-grid">
          {matches.map(({ coffee, reasons, exact }, index) => (
            <section
              key={coffee.id}
              aria-label={t(
                index === 0 ? "finder.match" : "finder.alternative",
              )}
            >
              <p className="eyebrow finder-result-label">
                {t(index === 0 ? "finder.match" : "finder.alternative")}
              </p>
              <CoffeeCard coffee={coffee} />
              <div className="finder-reasons">
                <p>{t(exact ? "finder.exact" : "finder.near")}</p>
                <ul>
                  {reasons.map((reason) => (
                    <li key={reason}>
                      <Check size={14} aria-hidden="true" />
                      {t(`finder.option.${preferences[reason]}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>{t("finder.empty")}</h3>
          <Link to="/coffees" className="text-link">
            {t("common.back")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
