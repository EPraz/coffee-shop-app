import { useTranslation } from "react-i18next";
import { brewSources, type BrewMethod, type brewRecipe } from "./brewing-model";
import { languageLocales } from "../../i18n/i18n";

export function BrewSteps({
  method,
  recipe,
}: {
  method: BrewMethod;
  recipe: NonNullable<ReturnType<typeof brewRecipe>>;
}) {
  const { t, i18n } = useTranslation();
  const values = {
    ...recipe,
    coffee: new Intl.NumberFormat(languageLocales[i18n.language], {
      maximumFractionDigits: 1,
    }).format(recipe.coffee),
  };
  return (
    <section className="brew-recipe" aria-labelledby="brew-steps-title">
      <p className="eyebrow">{t("brew.stepsLabel")}</p>
      <h2 id="brew-steps-title">{t(`brew.method.${method}`)}</h2>
      <ol className="brew-steps" data-testid="brew-steps">
        {[0, 1, 2, 3].map((step) => (
          <li key={step}>
            <span aria-hidden="true">0{step + 1}</span>
            <div>
              <h3>{t(`brew.stepTitle.${step}`)}</h3>
              <p>{t(`brew.${method}Steps.${step}`, values)}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="brew-note">{t("brew.note")}</p>
      <a
        className="text-link"
        href={brewSources[method]}
        target="_blank"
        rel="noreferrer"
      >
        {t(`brew.source.${method}`)} <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
