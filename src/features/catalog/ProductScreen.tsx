import { AddToBag } from "./AddToBag";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowUpRight, Package, Leaf } from "lucide-react";
import { CoffeeVisual } from "./CoffeeVisual";
import {
  findCoffee,
  variantStock,
  type Coffee,
  type Weight,
  type Preparation,
} from "./coffee";
import { Price } from "../../shared/Price";

export function ProductRoute() {
  const { coffeeId = "" } = useParams();
  const coffee = findCoffee(coffeeId);
  return coffee ? (
    <ProductScreen key={coffee.id} coffee={coffee} />
  ) : (
    <ProductMissing />
  );
}
function ProductMissing() {
  const { t } = useTranslation();
  return (
    <div className="section-shell empty-state">
      <Leaf size={42} />
      <h1>{t("product.missing")}</h1>
      <p>{t("product.missingCopy")}</p>
      <Link className="button button-primary" to="/coffees">
        {t("common.back")}
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
function ProductScreen({ coffee }: { coffee: Coffee }) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState<Weight>(250);
  const [preparation, setPreparation] = useState<Preparation>("beans");
  return (
    <section className="section-shell product-screen">
      <Link className="back-link" to="/coffees">
        <ArrowLeft size={16} />
        {t("product.back")}
      </Link>
      <div className="product-layout">
        <div className="product-photograph">
          <CoffeeVisual coffee={coffee} />
          <span className="product-edition">{coffee.edition} / 05</span>
        </div>
        <div className="product-info">
          <p className="eyebrow">
            {t("country." + coffee.country)} / {coffee.region}
          </p>
          <h1>{coffee.name}</h1>
          <div className="product-roast">
            <span>
              {t("common.roast")} · {t("roast." + coffee.roast)}
            </span>
            <div
              className={`roast-meter level-${coffee.roast}`}
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} />
              ))}
            </div>
          </div>
          <p className="product-description">
            {t(`coffee.${coffee.id}.description`)}
          </p>
          <p className="product-tasting">{t(`coffee.${coffee.id}.notes`)}</p>
          <div className="variant-options">
            <fieldset>
              <legend>{t("product.weight")}</legend>
              <div className="option-row">
                {([250, 500] as const).map((size) => (
                  <button
                    type="button"
                    key={size}
                    aria-pressed={weight === size}
                    onClick={() => setWeight(size)}
                  >
                    {size} g
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>{t("product.preparation")}</legend>
              <div className="option-row">
                {(["beans", "ground"] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    aria-pressed={preparation === option}
                    onClick={() => setPreparation(option)}
                  >
                    {t("product." + option)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="product-price-row">
            <p className="product-price" data-testid="variant-price">
              <Price cents={coffee.prices[weight]} />
            </p>
            <span>{t("product.priceNote")}</span>
          </div>
          {variantStock(coffee, weight, preparation) > 0 && (
            <AddToBag
              key={coffee.id + ":" + weight + ":" + preparation}
              coffee={coffee}
              weight={weight}
              preparation={preparation}
            />
          )}
          {variantStock(coffee, weight, preparation) === 0 && (
            <div className="sold-out-note">
              <p>{t("product.unavailable")}</p>
              <p>{t("product.unavailableCopy")}</p>
              <button className="button button-secondary button-full" disabled>
                {t("common.soldOut")}
              </button>
            </div>
          )}
          <p className="product-shipping">
            <Package size={16} aria-hidden="true" />
            {t("product.shipping")}
          </p>
          <Link
            to={`/brew?coffee=${coffee.id}`}
            className="text-link brew-entry"
          >
            {t("brew.entry")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
