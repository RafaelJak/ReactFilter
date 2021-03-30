import React from "react";
import { getFormattedPrice } from "./Helpers";

export default function Product({ title, image, price, sale }) {
  const cssClasses = `product ${sale ? "product__sale" : ""}`;

  return (
    <div>
      <article className={cssClasses}>
        <div className="product__image">{image}</div>
        <h3 className="product__heading">{title}</h3>
        <p className="product__price">{getFormattedPrice(price)}</p>
      </article>
    </div>
  );
}

/*

<article class="product">
<div class="product__image"></div>
<h3 class="product__heading"></h3>
<p class="product__price"></p>
</article>
*/
