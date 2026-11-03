import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Droplets, ArrowLeft } from "lucide-react";
import { findCoffee } from "../catalog/coffee";
import { languageLocales } from "../../i18n/i18n";
import { brewMethods, brewRecipe, type BrewMethod } from "./brewing-model";
import { BrewSteps } from "./BrewSteps";
import "./brewing.css";

export function BrewingScreen() {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const coffee = findCoffee(params.get("coffee") ?? "");
  const [method, setMethod] = useState<BrewMethod>("v60");
  const [water, setWater] = useState("500");
  const recipe = brewRecipe(method, water);
  const dose = recipe
    ? new Intl.NumberFormat(languageLocales[i18n.language], {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(recipe.coffee)
    : "—";
  return (
    <section className="section-shell brewing-screen">
      <header className="functional-heading">
        <p className="eyebrow">{t("brew.eyebrow")}</p>
        <h1>{t("brew.title")}</h1>
        <p>
          {coffee
            ? t("brew.forCoffee", { name: coffee.name })
            : t("brew.intro")}
        </p>
      </header>
      <div className="brewing-layout">
        <div className="brew-controls">
          <fieldset className="brew-methods">
            <legend>{t("brew.chooseMethod")}</legend>
            <div>
              {brewMethods.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="brew-method"
                    value={option}
                    checked={method === option}
                    onChange={() => setMethod(option)}
                  />
                  <span>{t(`brew.method.${option}`)}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="form-field">
            <label htmlFor="brew-water">{t("brew.water")}</label>
            <input
              id="brew-water"
              type="number"
              inputMode="numeric"
              min={250}
              max={500}
              step={50}
              required
              value={water}
              onChange={(event) => setWater(event.target.value)}
              aria-invalid={!recipe}
              aria-describedby={
                !recipe ? "brew-water-error" : "brew-water-hint"
              }
            />
            <p className="brew-note" id="brew-water-hint">
              {t("brew.range")}
            </p>
            {!recipe && (
              <p id="brew-water-error" className="error-message" role="status">
                {t("brew.invalid")}
              </p>
            )}
          </div>
          <div className="brew-dose">
            <Droplets size={26} strokeWidth={1.2} aria-hidden="true" />
            <span id="brew-dose-label">{t("brew.coffee")}</span>
            <output
              data-testid="coffee-dose"
              aria-labelledby="brew-dose-label"
              aria-live="polite"
            >
              {dose} g
            </output>
            <p>{t(`brew.grind.${method}`)}</p>
          </div>
          <Link
            className="text-link"
            to={coffee ? `/coffees/${coffee.id}` : "/coffees"}
          >
            <ArrowLeft size={16} />
            {t(coffee ? "brew.backCoffee" : "common.back")}
          </Link>
        </div>
        {recipe ? (
          <BrewSteps method={method} recipe={recipe} />
        ) : (
          <div className="brew-recipe brew-invalid">
            <Droplets size={32} strokeWidth={1} aria-hidden="true" />
            <h2>{t("brew.adjust")}</h2>
            <p>{t("brew.invalid")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
