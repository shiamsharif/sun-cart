"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import Logo from "@/components/Logo";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/profile", label: "My Profile" },
];

function NavLink({ href, label, onClick }) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-bold transition ${
        active
          ? "bg-primary text-primary-content shadow-sm"
          : "text-neutral/75 hover:bg-primary/10 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-base-100/82 backdrop-blur-xl">
      <div className="summer-shell navbar min-h-20 px-0">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square mr-2"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <div
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 gap-1 rounded-box border border-primary/10 bg-base-100 p-3 shadow-xl"
            >
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </div>
          </div>
          <Logo />
        </div>

        <nav className="navbar-center hidden gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="navbar-end gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="tooltip tooltip-bottom hidden items-center gap-2 rounded-full bg-primary/10 p-1 pr-3 text-sm font-bold text-primary sm:flex"
                data-tip={user.email}
              >
                <UserAvatar image={user.image} name={user.name} />
                <span className="max-w-28 truncate">{user.name || "Profile"}</span>
              </Link>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
