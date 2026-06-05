import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <span className="grid size-10 place-items-center rounded-full bg-secondary text-xl font-black text-secondary-content shadow-lg shadow-yellow-300/30">
        S
      </span>
      <span className="leading-none">
        <span className="block text-lg font-black tracking-normal text-primary">
          SunCart
        </span>
        <span className="block text-[0.68rem] font-semibold uppercase text-neutral/60">
          Summer Store
        </span>
      </span>
    </Link>
  );
}
