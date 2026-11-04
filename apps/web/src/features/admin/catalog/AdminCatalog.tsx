import "./catalog.css";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";
import { coffees } from "../../catalog/coffee";
import { CoffeeEditor } from "./CoffeeEditor";
export function AdminCatalog() {
  const { t } = useTranslation();
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="eyebrow">{t("admin.sharedLabel")}</p>
          <h1>{t("admin.collection")}</h1>
          <p>{t("admin.collectionCopy")}</p>
        </div>
        <Package size={36} strokeWidth={1} />
      </div>
      <div className="admin-collection">
        {coffees.map((coffee) => (
          <CoffeeEditor key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </>
  );
}
