import React from "react";

export const useConvertValues = () => {
  const numberToCop = (number) =>
    Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

  return { numberToCop };
};
