export function formatSalary(value) {
  const numericValue = Number(value || 0);

  if (!numericValue) {
    return "$ 0";
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  })
    .format(numericValue)
    .replace("ARS", "")
    .trim();
}

export function getSalaryDigits(value) {
  return String(value || "").replace(/\D/g, "");
}
