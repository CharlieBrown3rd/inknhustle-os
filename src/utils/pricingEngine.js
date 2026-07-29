import {
  garmentRates,
  printSizeRates,
  serviceRates,
} from "../data/pricingData";

export function calculateEstimate({
  service,
  quantity,
  garment,
  customerSupplied,
  printSize,
  selectedLocations,
  colors,
  rushOrder,
}) {
  const calculationQuantity = Math.max(
    Number(quantity) || 1,
    1
  );

  const selectedService = serviceRates[service];
  const selectedGarment = garmentRates[garment];
  const selectedPrintSize = printSizeRates[printSize];

  const garmentCost = customerSupplied
    ? 0
    : selectedGarment.price;

  let decorationCost =
    selectedService.decorationRate +
    selectedPrintSize.price;

  if (service === "screenPrint") {
    decorationCost += Math.max(colors - 1, 0) * 1.5;
  }

  const locationCount = Math.max(
    selectedLocations.length,
    1
  );

  decorationCost += Math.max(locationCount - 1, 0) * 4;

  let quantityDiscount = 1;

  if (calculationQuantity >= 100) {
    quantityDiscount = 0.85;
  } else if (calculationQuantity >= 48) {
    quantityDiscount = 0.90;
  } else if (calculationQuantity >= 24) {
    quantityDiscount = 0.95;
  }

  const discountedDecorationCost =
    decorationCost * quantityDiscount;

  const pricePerShirt =
    garmentCost + discountedDecorationCost;

  const setupFee =
    service === "screenPrint"
      ? selectedService.setupFee * colors
      : selectedService.setupFee;

  const subtotal =
    calculationQuantity * pricePerShirt +
    setupFee;

  const rushFee = rushOrder
    ? subtotal * 0.25
    : 0;

  const total = subtotal + rushFee;

  return {
    garmentCost,
    decorationCost: discountedDecorationCost,
    pricePerShirt,
    setupFee,
    rushFee,
    subtotal,
    total,
    calculationQuantity,
  };
}