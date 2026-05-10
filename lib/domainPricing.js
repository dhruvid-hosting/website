// Re-exports from the central pricing config.
// Edit src/lib/pricing.js to change domain prices.
export {
  DOMAIN_PRICES as RETAIL_PRICES,
  DEFAULT_DOMAIN_MARKUP as DEFAULT_MARKUP_PERCENT,
  DEFAULT_TLDS,
  getRetailPrice,
} from "./pricing.js";
