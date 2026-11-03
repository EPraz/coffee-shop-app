import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { coffees, type Roast } from "./coffee";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export function useCatalog() {
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const query = params.get("q") ?? "";
  const roast = params.get("roast") ?? "all";
  const sort = params.get("sort") ?? "featured";
  const update = (key: string, value: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "all" || value === "featured") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };
  const results = coffees
    .filter(
      (coffee) =>
        (roast === "all" || coffee.roast === roast) &&
        normalize(
          coffee.name +
            " " +
            coffee.country +
            " " +
            t("country." + coffee.country),
        ).includes(normalize(query)),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.prices[250] - b.prices[250]
        : sort === "high"
          ? b.prices[250] - a.prices[250]
          : 0,
    );
  return {
    query,
    roast,
    sort,
    results,
    update,
    clear: () => setParams({}),
    roasts: ["all", "light", "medium", "dark"] as ("all" | Roast)[],
  };
}
