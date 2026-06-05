import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-primary/10 bg-neutral text-neutral-content">
      <div className="summer-shell grid gap-9 px-0 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <aside className="max-w-sm lg:max-w-none">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-neutral-content/75">
            Summer care, beach gear, and sunny-day essentials curated for easy
            weekends, safer skin, and cooler afternoons.
          </p>
          <p className="mt-5 inline-flex rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-normal text-secondary">
            Bright days, easy carts
          </p>
        </aside>

        <nav className="flex flex-col gap-3 text-sm text-neutral-content/75">
          <h2 className="footer-title mb-1 text-neutral-content">Store</h2>
          <Link className="link-hover link" href="/products">
            Products
          </Link>
          <Link className="link-hover link" href="/profile">
            My Profile
          </Link>
          <a className="link-hover link">
            Privacy Policy
          </a>
        </nav>

        <nav className="flex flex-col gap-3 text-sm text-neutral-content/75">
          <h2 className="footer-title mb-1 text-neutral-content">Contact</h2>
          <a className="link-hover link" href="mailto:hello@suncart.store">
            hello@suncart.store
          </a>
          <a className="link-hover link" href="tel:+15550198">
            +1 555 0198
          </a>
          <span>Miami, FL</span>
        </nav>

        <nav className="flex flex-col gap-3 text-sm text-neutral-content/75">
          <h2 className="footer-title mb-1 text-neutral-content">Social</h2>
          <a className="link-hover link">
            Instagram
          </a>
          <a className="link-hover link">
            Pinterest
          </a>
          <a className="link-hover link">
            Facebook
          </a>
        </nav>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="summer-shell text-sm leading-6 text-neutral-content/60">
          Copyright 2026 SunCart. Built for bright days and quick checkouts.
        </p>
      </div>
    </footer>
  );
}
