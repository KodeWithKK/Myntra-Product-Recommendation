function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    price,
  );
}

export { formatPrice };
