import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-primary/10 bg-neutral text-neutral-content">
      <div className="summer-shell footer gap-10 px-0 py-12">
        <aside className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-6 text-neutral-content/75">
            Summer care, beach gear, and sunny-day essentials curated for easy
            weekends, safer skin, and cooler afternoons.
          </p>
        </aside>
        <nav>
          <h2 className="footer-title text-neutral-content">Contact</h2>
          <a className="link-hover link">hello@suncart.store</a>
          <a className="link-hover link">+1 555 0198</a>
          <a className="link-hover link">Miami, FL</a>
        </nav>
        <nav>
          <h2 className="footer-title text-neutral-content">Social</h2>
          <a className="link-hover link">Instagram</a>
          <a className="link-hover link">Pinterest</a>
          <a className="link-hover link">Facebook</a>
        </nav>
        <nav>
          <h2 className="footer-title text-neutral-content">Store</h2>
          <Link className="link-hover link" href="/products">
            Products
          </Link>
          <Link className="link-hover link" href="/profile">
            My Profile
          </Link>
          <a className="link-hover link">Privacy Policy</a>
        </nav>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="summer-shell text-sm text-neutral-content/60">
          Copyright 2026 SunCart. Built for bright days and quick checkouts.
        </p>
      </div>
    </footer>
  );
}
