import "./catalog.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Brand } from "../../shared/ui/Brand";
import type { Coffee } from "./coffee";
export function CoffeeVisual({
  coffee,
  small = false,
}: {
  coffee: Pick<Coffee, "name" | "country" | "tone" | "edition">;
  small?: boolean;
}) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`coffee-visual tone-${coffee.tone}${small ? " coffee-visual-small" : ""}${failed ? " image-fallback" : ""}`}
    >
      {!failed && (
        <img
          src="/images/coffee-bag.webp"
          alt=""
          loading="lazy"
          width="800"
          height="1000"
          onError={() => setFailed(true)}
        />
      )}
      <div className="bag-label" aria-hidden="true">
        <Brand compact />
        <span className="bag-wordmark">bruma</span>
        <span className="bag-rule" />
        <span className="bag-name">{coffee.name}</span>
        <span className="bag-country">{t("country." + coffee.country)}</span>
        <span className="bag-weight">250 g · 500 g</span>
      </div>
      <span className="visual-edition" aria-hidden="true">
        {coffee.edition} / BRUMA
      </span>
    </div>
  );
}
