import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Price } from "../../shared/Price";
import { CoffeeVisual } from "./CoffeeVisual";
import type { Coffee } from "./coffee";
export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  const { t } = useTranslation();
  return (
    <article className="coffee-card" data-testid="coffee-card">
      <Link
        to={`/coffees/${coffee.id}`}
        aria-label={t("common.discover") + ": " + coffee.name}
      >
        <div className="coffee-image-wrap">
          <CoffeeVisual coffee={coffee} />
          <span className="coffee-origin">
            {t("country." + coffee.country)} / {coffee.region}
          </span>
          {!coffee.available && (
            <span className="stock-badge">
              {t(
                coffee.enabled === false
                  ? "admin.disabledBadge"
                  : "common.soldOut",
              )}
            </span>
          )}
        </div>
        <div className="coffee-card-heading">
          <h2>{coffee.name}</h2>
          <ArrowUpRight aria-hidden="true" size={22} />
        </div>
        <p className="coffee-notes">{t(`coffee.${coffee.id}.notes`)}</p>
        <div className="coffee-card-foot">
          <span className="roast-tag">
            <span className={`roast-dot ${coffee.roast}`} />
            {t("roast." + coffee.roast)}
          </span>
          <Price cents={coffee.prices[250]} />
        </div>
      </Link>
    </article>
  );
}
