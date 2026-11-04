import { useTranslation } from "react-i18next";
import { Pencil, Check, ArrowUpRight } from "lucide-react";
import { Price } from "../../../shared/ui/Price";
import type { Coffee } from "../../catalog/coffee";
import { CoffeeVisual } from "../../catalog/CoffeeVisual";
import { useCoffeeEditor } from "./useCoffeeEditor";

export function CoffeeEditor({ coffee }: { coffee: Coffee }) {
  const { t } = useTranslation();
  const {
    editing,
    pending,
    conflict,
    values,
    setValues,
    editButton,
    open,
    close,
    save,
  } = useCoffeeEditor(coffee);
  return (
    <article className="admin-coffee-wrap" data-testid="admin-coffee">
      <div className="admin-coffee">
        <CoffeeVisual coffee={coffee} small />
        <div>
          <p className="eyebrow">
            {t("country." + coffee.country)} / {coffee.edition}
          </p>
          <h2>{coffee.name}</h2>
          <p>{t(coffee.available ? "admin.active" : "admin.inactive")}</p>
        </div>
        <p>
          <span>250 g</span>
          <Price cents={coffee.prices[250]} />
        </p>
        <p>
          <span>500 g</span>
          <Price cents={coffee.prices[500]} />
        </p>
        <button
          ref={editButton}
          className="admin-edit-button"
          onClick={open}
          aria-label={t("admin.edit", { name: coffee.name })}
        >
          <Pencil size={16} />
          <span>{t("admin.editShort")}</span>
        </button>
      </div>
      {editing && (
        <form
          className="admin-editor"
          onSubmit={(event) => void save(event)}
          aria-label={t("admin.edit", { name: coffee.name })}
          aria-busy={pending}
        >
          {conflict && (
            <p className="admin-conflict" role="alert">
              {t("admin.reviewDraft")}
            </p>
          )}
          <div className="admin-price-fields">
            {([250, 500] as const).map((weight) => (
              <label key={weight}>
                {t("admin.priceLabel", { weight })}
                <input
                  autoFocus={weight === 250}
                  aria-label={t("admin.priceLabel", { weight })}
                  aria-describedby={
                    conflict
                      ? `${coffee.id}-current-price-${weight}`
                      : undefined
                  }
                  type="number"
                  required
                  min="0.01"
                  max="1000"
                  step="0.01"
                  value={values.prices[weight]}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      prices: {
                        ...values.prices,
                        [weight]: event.target.value,
                      },
                    })
                  }
                />
                {conflict && (
                  <small id={`${coffee.id}-current-price-${weight}`}>
                    {t("admin.current")}:{" "}
                    <Price cents={coffee.prices[weight]} />
                  </small>
                )}
              </label>
            ))}
          </div>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={values.available}
              onChange={(event) =>
                setValues({ ...values, available: event.target.checked })
              }
            />
            {t("admin.availableLabel")}
          </label>
          <fieldset>
            <legend>{t("admin.stockHeading")}</legend>
            <div className="admin-stock-fields">
              {values.variants.map((variant, index) => (
                <label key={variant.weight + variant.preparation}>
                  {t("admin.stockLabel", {
                    weight: variant.weight,
                    preparation: t("product." + variant.preparation),
                  })}
                  <input
                    aria-label={t("admin.stockLabel", {
                      weight: variant.weight,
                      preparation: t("product." + variant.preparation),
                    })}
                    aria-describedby={
                      conflict
                        ? `${coffee.id}-current-stock-${index}`
                        : undefined
                    }
                    type="number"
                    min="0"
                    max="9999"
                    step="1"
                    required
                    value={variant.stock}
                    onChange={(event) =>
                      setValues({
                        ...values,
                        variants: values.variants.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, stock: event.target.value }
                            : item,
                        ),
                      })
                    }
                  />
                  {conflict && (
                    <small id={`${coffee.id}-current-stock-${index}`}>
                      {t("admin.current")}:{" "}
                      {
                        coffee.variants?.find(
                          (item) =>
                            item.weight === variant.weight &&
                            item.preparation === variant.preparation,
                        )?.stock
                      }
                    </small>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
          <p className="admin-editor-note">{t("admin.editCopy")}</p>
          <div className="admin-editor-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={close}
              disabled={pending}
            >
              {t("admin.cancel")}
            </button>
            <button className="button button-primary" disabled={pending}>
              {t(pending ? "admin.saving" : "admin.save")}
              {pending ? <ArrowUpRight size={16} /> : <Check size={16} />}
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
