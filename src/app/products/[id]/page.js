import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { auth } from "@/lib/auth";
import { formatPrice, getProductById, getProducts } from "@/lib/products";

export const runtime = "nodejs";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  return {
    title: product ? `${product.name} | SunCart` : "Product | SunCart",
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/login?redirectTo=/products/${id}`);
  }

  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <section className="summer-shell py-10">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>{product.name}</li>
        </ul>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="summer-card overflow-hidden rounded-box">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={720}
            className="h-full min-h-[360px] w-full object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
            priority
          />
        </div>

        <article className="summer-card rounded-box p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-primary rounded-md p-4 font-bold">
              {product.category}
            </span>
            <span className="badge badge-secondary rounded-md p-4 font-bold">
              {product.brand}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black text-neutral md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-lg font-black text-accent">
              <Star size={20} fill="currentColor" />
              {product.rating} rating
            </span>
            <span className="text-lg font-bold text-success">
              {product.stock} in stock
            </span>
          </div>
          <p className="mt-6 text-4xl font-black text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 text-lg leading-8 text-neutral/70">
            {product.description}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Ships in 24h", "Summer tested", "Easy returns"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-box bg-primary/8 p-3 text-sm font-bold text-primary"
              >
                <CheckCircle2 size={18} />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary btn-lg flex-1">
              Add to Cart
            </button>
            <Link href="/products" className="btn btn-outline btn-lg flex-1">
              Continue Shopping
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-14">
        <h2 className="mb-6 text-3xl font-black text-neutral">
          More sunny picks
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
