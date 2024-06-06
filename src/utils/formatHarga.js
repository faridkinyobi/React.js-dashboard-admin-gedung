export function formatHarga(value) {
    const formattedValue = value?.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  
    return formattedValue;
  }