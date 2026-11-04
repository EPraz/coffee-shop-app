import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { preferenceOptions, type PreferenceKey } from "./finder-model";

export function FinderQuestion({
  step,
  question,
  value,
  onSelect,
  onBack,
  onNext,
}: {
  step: number;
  question: PreferenceKey;
  value?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const legend = useRef<HTMLLegendElement>(null);
  useEffect(() => {
    legend.current?.focus();
  }, []);
  return (
    <div className="finder-question">
      <p className="eyebrow">{t("finder.progress", { current: step + 1 })}</p>
      <fieldset>
        <legend ref={legend} tabIndex={-1}>
          {t(`finder.question.${question}`)}
        </legend>
        <p className="finder-hint" id="finder-hint">
          {t("finder.choose")}
        </p>
        <div className="finder-options">
          {preferenceOptions[question].map((option) => (
            <label className="finder-option" key={option}>
              <input
                type="radio"
                name={question}
                value={option}
                checked={value === option}
                onChange={() => onSelect(option)}
                aria-labelledby={`option-${option}`}
                aria-describedby={`copy-${option}`}
              />
              <span>
                <span id={`option-${option}`}>
                  {t(`finder.option.${option}`)}
                </span>
                <small id={`copy-${option}`}>
                  {t(`finder.copy.${option}`)}
                </small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>
      <div className="finder-actions">
        {step > 0 ? (
          <button className="text-link" onClick={onBack}>
            <ArrowLeft size={16} />
            {t("finder.back")}
          </button>
        ) : (
          <span />
        )}
        <button
          className="button button-primary"
          disabled={!value}
          onClick={onNext}
        >
          {t(step === 2 ? "finder.submit" : "finder.next")}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
