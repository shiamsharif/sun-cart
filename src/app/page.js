import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Sprout, Waves } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { getPopularProducts } from "@/lib/products";

const careTips = [
  {
    title: "Reapply Often",
    text: "Refresh sunscreen every two hours, especially after swimming or heavy sweating.",
    icon: ShieldCheck,
  },
  {
    title: "Hydrate Early",
    text: "Start sipping before you feel thirsty and add electrolytes on extra hot days.",
    icon: Waves,
  },
  {
    title: "Pack Light Layers",
    text: "Breathable linen, hats, and shade breaks keep long outings comfortable.",
    icon: Sprout,
  },
];

const brands = ["SunBloom", "CoastKind", "Palm & Shore", "BreezeLab"];

export default function Home() {
  const products = getPopularProducts();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="summer-shell grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <div className="animate__animated animate__fadeInUp max-w-2xl">
            <div className="badge badge-secondary mb-5 rounded-md px-4 py-4 text-sm font-black">
              Summer Sale 50% OFF
            </div>
            <h1 className="text-5xl font-black leading-[0.96] text-neutral sm:text-6xl lg:text-7xl">
              SunCart
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral/70">
              A bright, modern shop for sunscreen, hydration, breezy accessories,
              and beach-day gear that makes summer feel easy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn btn-primary btn-lg">
                Shop Products
              </Link>
              <Link href="#popular" className="btn btn-outline btn-lg">
                Hot Deals
              </Link>
            </div>
            <div className="stats summer-card mt-8 w-full max-w-xl overflow-hidden">
              <div className="stat">
                <div className="stat-title">Curated Picks</div>
                <div className="stat-value text-primary">6</div>
              </div>
              <div className="stat">
                <div className="stat-title">Top Rating</div>
                <div className="stat-value text-accent">4.9</div>
              </div>
            </div>
          </div>

          <div className="relative animate__animated animate__fadeInRight">
            <div className="sunstripe absolute -inset-6 rotate-2 rounded-box opacity-80" />
            <div className="summer-card relative overflow-hidden rounded-box">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
                alt="Sunny beach with turquoise water"
                width={900}
                height={720}
                priority
                className="h-[420px] w-full object-cover sm:h-[560px]"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-box bg-white/86 p-5 shadow-xl backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-black uppercase text-primary">
                  <Sparkles size={17} />
                  Weekend Ready
                </p>
                <p className="mt-1 text-2xl font-black text-neutral">
                  Beach kits, cooling care, and sunny extras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="popular" className="summer-shell py-14">
        <SectionHeader eyebrow="Popular Products" title="Bright picks for hot days">
          Three customer favorites from the summer shelf, ready for beach bags,
          patios, hikes, and weekend trips.
        </SectionHeader>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-primary/8 py-14">
        <div className="summer-shell">
          <SectionHeader eyebrow="Summer Care Tips" title="Stay cool, covered, and comfortable" />
          <div className="grid gap-5 md:grid-cols-3">
            {careTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <article key={tip.title} className="summer-card rounded-box p-6">
                  <div className="mb-5 grid size-12 place-items-center rounded-full bg-secondary text-secondary-content">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black text-neutral">{tip.title}</h3>
                  <p className="mt-3 leading-7 text-neutral/65">{tip.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="summer-shell py-14">
        <SectionHeader eyebrow="Top Brands" title="Small labels with sunny standards" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <div
              key={brand}
              className="summer-card rounded-box p-6 text-center transition hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-primary/10 text-2xl font-black text-primary">
                {index + 1}
              </div>
              <h3 className="text-lg font-black text-neutral">{brand}</h3>
              <p className="mt-2 text-sm text-neutral/60">Verified summer essential brand</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
