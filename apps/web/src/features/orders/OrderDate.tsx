import { useTranslation } from "react-i18next";
import { languageLocales } from "../../i18n/i18n";

export function OrderDate({ date }: { date: string }) {
  const { i18n } = useTranslation();
  return (
    <time dateTime={date}>
      {new Intl.DateTimeFormat(languageLocales[i18n.language], {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date))}
    </time>
  );
}
