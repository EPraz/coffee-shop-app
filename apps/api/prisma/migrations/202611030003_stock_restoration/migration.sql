-- Form edits are bounded separately; cancellation must always restore sold bags.
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_stock_check";
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_stock_check" CHECK ("stock" >= 0);
