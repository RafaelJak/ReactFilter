import { useState, useEffect } from "react";
import FilterForm from "./FilterForm";
import ProduktList from "./ProductList";

import Filterstatus from "./Filterstatus";

import { getFormattedMinMax } from "./Helpers";

export default function Finder() {
  const [saleOnly, setSaleOnly] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const [filterHidden, setFilterHidden] = useState(true);

  console.log(category1 + "Hallo1!");
  console.log(category2 + "Hallo2!");
  console.log(category3 + "Hallo3!");

  useEffect(
    () =>
      (document.title = `Suche: ${keyword} ${
        saleOnly ? "im Sonderangebot" : ""
      }`),
    [keyword, saleOnly]
  );
  // müssen in einer bestimmten reihenfolge aufgerufen werden, nach deren Reihenfolge

  useEffect(() => {
    const url = new URL(window.location.href);

    const oldKeyword = url.searchParams.get("keyword");
    if (url.searchParams.get("keyword")) {
      setKeyword(oldKeyword);
    }

    const oldCategory = url.searchParams.get("category");
    if (url.searchParams.get("category")) {
      setCategory(parseInt(oldCategory));
    }

    const oldSale = url.searchParams.get("sale");
    if (oldSale === "true") {
      setSaleOnly(true);
    }
    // ("ladevorgang beendet");
    setLoading(false);
  }, []);

  useEffect(() => {
    /* lese Daten aus der am Anfang geladenen URL aus und stelle den vorhergehenden State wieder her */
    // Konstruiere ein neues URL- Objekt auf Grundlage der aktuellen Url

    const url = new URL(window.location.href);

    // Entferne eventuelle keyword-Parameter
    url.searchParams.delete("keyword");
    url.searchParams.delete("category");
    url.searchParams.delete("sale");
    // falls keyword nicht leer ist, füge den Keyword-parameter hinzu

    if (category) {
      url.searchParams.set("category", category);
    }

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    }

    //ersetze den aktuellen Eintrag im Browser-Verlauf mit der neu erzeugten URL
    if (saleOnly) {
      url.searchParams.set("sale", saleOnly);
    }
    window.history.replaceState({}, "", url);
  }, [keyword, category, saleOnly]);

  if (loading) {
    return null;
  }

  const filteredProducts = getFilteredProducts(
    saleOnly,
    keyword,
    category,
    price,
    category1,
    category2,
    category3,
    min,
    max
  );

  /* 
    1. Erstellt eine Komponente FilterStatus, die die Anzahl der gefilterten
    Produkte darstellt. Also "x Produkte gefunden". Die Komponente soll zwischen
    Filter und Produktliste dargestellt werden.
    Die Anzeige soll in einem div mit der Klasse "filterstatus" erscheinen
    2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...
    ausgeben.
    3. Bonus: Wenn KEIN Produkt gefunden wurde, soll der Text z.B. in rot
    erscheinen. Das div soll zusätzlich die Klasse "filter-status--no-results" haben.
    */

  return (
    <div className="shop">
      <FilterForm
        price={price}
        setPrice={setPrice}
        category={category}
        setCategory={setCategory}
        saleOnly={saleOnly}
        setSaleOnly={setSaleOnly}
        keyword={keyword}
        setKeyword={setKeyword}
        setCategory1={setCategory1}
        category1={category1}
        setCategory2={setCategory2}
        category2={category2}
        setCategory3={setCategory3}
        category3={category3}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
        filterHidden={filterHidden}
        setFilterHidden={setFilterHidden}
      />
      <Filterstatus products={filteredProducts} />
      {/* // Anzahl anzeigen */}
      <ProduktList products={filteredProducts} />
    </div>
  );
}

function getFilteredProducts(
  products,
  saleOnly,
  keyword,
  category,
  price,
  category1,
  category2,
  category3,
  min,
  max
) {
  /* Speichere die Information, ob der Filter NICHT aktiv ist */

  const minPrice = Math.min.apply(
    Math,
    products.map(function (o) {
      return o.price;
    })
  );

  const maxPrice = Math.max.apply(
    Math,
    products.map(function (o) {
      return o.price;
    })
  );
  const minNew = min === isNaN ? 0 : min;
  const maxNew = max === 0 ? maxPrice : max;
  const minPriceNew = getFormattedMinMax(minNew);
  const maxPriceNew = getFormattedMinMax(maxNew);
  console.log("A" + minPriceNew);
  console.log("B" + maxPriceNew);

  let categoryNr1 = 0;
  category1 === true ? (categoryNr1 = 1) : 0;
  let categoryNr2 = 0;
  category2 === true ? (categoryNr2 = 2) : 0;
  let categoryNr3 = 0;
  category3 ? (categoryNr3 = 3) : 0;

  // console.log("CategoryNr3: " + categoryNr3);
  // console.log("Preis: " + price);
  const noSaleFilter = !saleOnly;

  // Prüfe, ob mindestens zwei Zeichen eingegeben wurden
  const noKeywordFilter = keyword.length < 2;
  const noPriceFilter = price === minPrice;
  /*   Regulärer Ausdruck, um zu testen, ob ein Muster in einem
    anderen String vorkommt. "i" bedeutet "case insensitive",
    also Großschreibung ignorieren.
    Das RegExp-Objekt hat u.a. die Methode test(), um zu prüfen, ob ein String
    die Bedingungen des regulären Ausdrucks erfüllt.
    https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp */
  const keywordRegExp = new RegExp(keyword, "i");

  const filteredProducts = products
    .filter(
      /* Entweder der Filter ist nicht aktiv, dann wird für alle
      Produkte true zurückgegeben, und es kommen entspechend
      alle durch den Filter. Andernfalls nur die, bei denen
      product.sale true ist */
      (product) => noSaleFilter || product.sale
    )
    .filter((product) => noKeywordFilter || keywordRegExp.test(product.title))
    .filter(
      (product) =>
        // (1 && 2 && 3) ||
        //
        categoryNr1 === product.category ||
        categoryNr2 === product.category ||
        categoryNr3 === product.category
    )
    .filter((product) => price <= product.price)
    .filter(
      (product) =>
        noPriceFilter ||
        (product.price >= minPriceNew && product.price <= maxPriceNew)
    );

  return filteredProducts;
}
