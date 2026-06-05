import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  return (
    <article className="card summer-card overflow-hidden rounded-box transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={480}
          className="product-image w-full"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="badge badge-secondary absolute left-4 top-4 font-bold">
          {product.category}
        </span>
      </figure>
      <div className="card-body gap-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase text-primary/70">
            {product.brand}
          </p>
          <h3 className="card-title mt-1 text-xl text-neutral">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold text-accent">
            <Star size={17} fill="currentColor" />
            {product.rating}
          </span>
          <span className="text-xl font-black text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="card-actions">
          <Link
            href={`/products/${product.id}`}
            className="btn btn-primary btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
