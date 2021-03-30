import classnames from "classnames";
import React from "react";

export default function Filterstatus({ products }) {
  let anzahl = 0;

  products.map((value, index) => (anzahl = index + 1));

  const cssClasses = classnames("filter-status", {
    "filter-status--no-results": anzahl === 0,
  });

  switch (anzahl) {
    case 0:
      anzahl = "Kein Produkt gefunden";
      break;
    case 1:
      anzahl = "Ein Produkt gefunden";
      break;
    default:
      anzahl = anzahl + " Produkte gefunden";
  }
  return (
    <div className={cssClasses}>
      <div>{anzahl}</div>
    </div>
  );
}
