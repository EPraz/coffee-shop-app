import { useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../shared/api";
import { findCoffee, type Coffee } from "../catalog/coffee";
import { currentGeneration, refreshCatalog } from "../catalog/catalog-store";
import { useToast, actionError } from "./Toast";

function initialValues(coffee: Coffee) {
  return {
    generation: currentGeneration(),
    version: coffee.version,
    available: coffee.enabled ?? coffee.available,
    prices: {
      250: (coffee.prices[250] / 100).toFixed(2),
      500: (coffee.prices[500] / 100).toFixed(2),
    },
    variants: (coffee.variants ?? []).map((variant) => ({
      ...variant,
      stock: String(variant.stock),
    })),
  };
}

export function useCoffeeEditor(coffee: Coffee) {
  const { t } = useTranslation();
  const notify = useToast();
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [values, setValues] = useState(() => initialValues(coffee));
  const editButton = useRef<HTMLButtonElement>(null);
  const open = () => {
    setConflict(false);
    setValues(initialValues(coffee));
    setEditing(true);
  };
  const close = () => {
    setEditing(false);
    requestAnimationFrame(() => editButton.current?.focus());
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      await api(`/admin/catalog/${coffee.id}`, {
        method: "PATCH",
        body: {
          ...values,
          prices: {
            250: Math.round(Number(values.prices[250]) * 100),
            500: Math.round(Number(values.prices[500]) * 100),
          },
          variants: values.variants.map((variant) => ({
            ...variant,
            stock: Number(variant.stock),
          })),
        },
      });
      await refreshCatalog();
      notify({ message: t("admin.saved") });
      close();
    } catch (error) {
      const code = actionError(error);
      notify({
        message: t(`admin.errors.${code}`, {
          defaultValue: t("admin.connectionError"),
        }),
        error: true,
        expired: code === "session_expired",
      });
      if (code === "edit_conflict" || code === "store_reset") {
        if (await refreshCatalog()) {
          const latest = findCoffee(coffee.id)!;
          setValues((draft) => ({
            ...draft,
            version: latest.version,
            generation: currentGeneration(),
          }));
          setConflict(true);
        }
      }
    } finally {
      setPending(false);
    }
  };
  return {
    editing,
    pending,
    conflict,
    values,
    setValues,
    editButton,
    open,
    close,
    save,
  };
}
