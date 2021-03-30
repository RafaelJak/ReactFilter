/* eslint-disable jsx-a11y/no-onchange */
import { categories } from "../products";
import products from "../products";
import { getFormattedPrice } from "./Helpers";
import classNames from "classnames";

const maxPrice = Math.max.apply(
  Math,
  products.map(function (o) {
    return o.price;
  })
);

const minPrice = Math.min.apply(
  Math,
  products.map(function (o) {
    return o.price;
  })
);

console.log(maxPrice);

export default function FilterForm({
  saleOnly,
  setSaleOnly,
  keyword,
  setKeyword,
  price,
  setPrice,
  setCategory1,
  category1,
  setCategory2,
  category2,
  setCategory3,
  category3,
  min,
  setMin,
  max,
  setMax,
  filterHidden,
  setFilterHidden,
}) {
  const cssClasses = classNames("filter", {
    filter__hidden: filterHidden,
  });

  return (
    // das die Eingabetaste nicht das Event auslöst
    <div>
      <button onClick={() => setFilterHidden((currentMood) => !currentMood)}>
        {filterHidden ? "Filter verstecken" : "Filter anzeigen"}
      </button>

      <form className={cssClasses} onSubmit={(e) => e.preventDefault()}>
        <div className="filter_search">
          <label htmlFor="price">Preis</label>
          <input
            type="range"
            id="price"
            value={parseInt(price)}
            min={minPrice}
            max={maxPrice}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <div>{getFormattedPrice(price)}</div>
          <label htmlFor="price">Preis von bis: </label>
          <label htmlFor="keyword">min</label>
          <input
            id="keyword"
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
          <label htmlFor="keyword">max</label>
          <input
            id="keyword"
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
          <label htmlFor="keyword">Suchbegriff</label>
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            onClick={() => setKeyword("")}
            aria-label="Suchbegriff löschen"
            type="button"
            disabled={keyword === ""}
          >
            {" "}
            &times;
          </button>
          <label>
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(e) => {
                setSaleOnly(e.target.checked);
              }}
            />
            Sonderangebote
          </label>
          <div className="filter__category">
            <div className="filter__category">
              {/* 1. Verknüpft das select-Menü mit einem Label "Kategorie"
        2. Importiert die anderen Kategorien aus products.js
        3. Nutzt die Map-Methode, um nach der ersten option die
        weiteren option-Elemente zu erzeugen.
        4. Erstellt in Finder.js den state selectedCategory und
        gebt ihn samt set-Funktion in FilterForm.
        5. Verknüpft den state und die set-Funktion mit dem 
        select-Element, ähnlich wie bei dem text-Input.
        6. Ergänzt in Finder.js die getFilteredProducts-Funktion
        um den selectedCategory-Filter. Beachtet, dass der ausgelesene
        value des select-Elements immer ein String ist, und nutzt
        parseInt, um ihn in einen Integer umzuwandeln. */}
              {/* <label htmlFor="kategorie">Kategorie</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(parseInt(e.target.value))}
            >
              <option value="0">Alle Kategorien</option>
              {/* /(/ Optionen hinzufügen durch  option zum sie über select auswählen zu können) */}
              {/* {categories.map(({ categoryId, name }) => ( */}
              {/* //     <option key={categoryId} value={categoryId}>
            //       {name}
            //     </option>
            //   ))} 
            // </select>
            {/* <label htmlFor="kategorie">
              Kategorie */}
              {/* /(/ Optionen hinzufügen durch  option zum sie über select auswählen zu können) */}
              {/* {categories.map(({ categoryId, name }, index) => (
              <div key={categoryId}>
                <div>{name}</div>
                <input
                  styles="flexbox"
                  type="checkbox"
                  checked={category + categoryId}
                  onChange={(e) => {
                    setCategory1(e.target.checked);
                  }}
                />
                {/* <CheckBoxList category={category} setCategory={setCategory} /> */}
              {/* </div>
            ))}  */}

              <div>{categories[0].name}</div>
              <input
                styles="flexbox"
                type="checkbox"
                checked={category1}
                onChange={(e) => {
                  setCategory1(e.target.checked);
                }}
              />
              <div>{categories[1].name}</div>
              <input
                styles="flexbox"
                type="checkbox"
                checked={category2}
                onChange={(e) => {
                  setCategory2(e.target.checked);
                }}
              />
              <div>{categories[2].name}</div>
              <input
                styles="flexbox"
                type="checkbox"
                checked={category3}
                onChange={(e) => {
                  setCategory3(e.target.checked);
                }}
              />
              {/* </label> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
