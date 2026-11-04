import "./catalog.css";
import "./filters.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { CoffeeCard } from "./CoffeeCard";
import { useCatalog } from "./useCatalog";
export function CatalogScreen() {
  const { t } = useTranslation();
  const { query, roast, sort, results, update, clear, roasts } = useCatalog();
  return (
    <div className="section-shell catalog-screen">
      <header className="page-heading">
        <p className="eyebrow">{t("catalog.eyebrow")}</p>
        <h1>{t("catalog.title")}</h1>
        <p>{t("catalog.intro")}</p>
        <Link to="/find-your-coffee" className="text-link discovery-link">
          {t("finder.entry")}
          <ArrowUpRight size={18} />
        </Link>
      </header>
      <div className="catalog-controls">
        <label className="catalog-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">{t("catalog.search")}</span>
          <input
            type="search"
            placeholder={t("catalog.search")}
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </label>
        <label className="sort-control">
          <span className="sr-only">{t("catalog.sort")}</span>
          <select
            value={sort}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="featured">{t("catalog.featured")}</option>
            <option value="low">{t("catalog.low")}</option>
            <option value="high">{t("catalog.high")}</option>
          </select>
        </label>
      </div>
      <div
        className="roast-filters"
        role="group"
        aria-label={t("catalog.filter")}
      >
        {roasts.map((option) => (
          <button
            key={option}
            aria-pressed={roast === option}
            onClick={() => update("roast", option)}
          >
            {t(option === "all" ? "common.all" : "roast." + option)}
          </button>
        ))}
      </div>
      <div className="catalog-meta">
        <span role="status">
          {t("catalog.count", { count: results.length })}
        </span>
        <span>{t("catalog.basePrice")} · USD</span>
      </div>
      {results.length ? (
        <div className="coffee-grid">
          {results.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={36} />
          <h2>{t("catalog.empty")}</h2>
          <p>{t("catalog.emptyCopy")}</p>
          <button className="button button-primary" onClick={clear}>
            {t("catalog.clear")}
            <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
