import { useTranslation } from "react-i18next";
import { languageLocales } from "../i18n/i18n";
export function formatPrice(cents: number, language: string) {
  return new Intl.NumberFormat(languageLocales[language] ?? "en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
  }).format(cents / 100);
}
export function Price({
  cents,
  className = "",
}: {
  cents: number;
  className?: string;
}) {
  const { i18n } = useTranslation();
  return (
    <span className={className}>
      {formatPrice(cents, i18n.resolvedLanguage ?? "en")}
    </span>
  );
}
