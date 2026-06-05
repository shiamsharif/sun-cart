import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Products | SunCart",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <section className="summer-shell py-12">
      <SectionHeader eyebrow="Products" title="Summer essentials in one sunny cart">
        Browse care, cooling, hydration, accessories, and beach gear for warm
        days that do not need extra friction.
      </SectionHeader>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
