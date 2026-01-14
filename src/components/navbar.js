import Link from "next/link";

export default function Navbar({ items }) {
  if (!items) return null;

  return (
    <header className="border-b border-white/10 bg-neutral-950">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4 text-sm text-white">
        {items
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-white/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </header>
  );
}
