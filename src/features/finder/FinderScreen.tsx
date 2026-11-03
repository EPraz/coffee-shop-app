import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Leaf } from "lucide-react";
import { FinderQuestion } from "./FinderQuestion";
import { FinderResults } from "./FinderResults";
import { preferenceSteps, type Preferences } from "./finder-model";
import "./finder.css";

export function FinderScreen() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Preferences>>({});
  const question = preferenceSteps[step];
  const complete =
    step === 3 && answers.flavour && answers.intensity && answers.serving;
  return (
    <section className="section-shell finder-screen">
      <header className="functional-heading">
        <p className="eyebrow">{t("finder.eyebrow")}</p>
        <h1>{t("finder.title")}</h1>
        <p>{t("finder.intro")}</p>
      </header>
      {complete ? (
        <FinderResults
          preferences={answers as Preferences}
          onRestart={() => {
            setAnswers({});
            setStep(0);
          }}
        />
      ) : (
        <div className="finder-layout">
          <FinderQuestion
            key={step}
            step={step}
            question={question}
            value={answers[question]}
            onSelect={(value) =>
              setAnswers((current) => ({ ...current, [question]: value }))
            }
            onBack={() => setStep(step - 1)}
            onNext={() => setStep(step + 1)}
          />
          <aside className="finder-journal">
            <Leaf size={34} strokeWidth={1} aria-hidden="true" />
            <p>{t("finder.journal")}</p>
            <span>{t("finder.journalCopy")}</span>
            <div>BRUMA / {String(step + 1).padStart(2, "0")}</div>
          </aside>
        </div>
      )}
    </section>
  );
}
