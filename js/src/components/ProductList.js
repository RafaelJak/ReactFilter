import Product from "./Product";

export default function ProduktList({ products }) {
  return (
    <section className="products">
      {products.map(({ // pioneer
        title, image, price }) => (
        <div key={title}>
          <Product title={title} image={image} price={price} />
        </div>
      ))}
    </section>
  );
}
