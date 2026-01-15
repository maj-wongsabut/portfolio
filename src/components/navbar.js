import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ items = [] }) {
  const router = useRouter();

  // Ta bort Projects från menyn
  const filtered = [...items]
    .filter(
      (item) =>
        item.path !== "/projects" &&
        (item.label || "").toLowerCase() !== "projects"
    )
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const isActive = (path) => {
    if (path === "/") return router.pathname === "/";
    return router.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Rund M */}
        <Link href="/" aria-label="Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10">
            M
          </div>
        </Link>

        {/* Navigation med pill-active */}
        <nav className="hidden items-center gap-2 sm:flex">
          {filtered.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={[
                  "rounded-2xl px-4 py-2 text-sm transition",
                  active
                    ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Projects = Resume-style rektangulär */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-white/60 bg-transparent px-5 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
          style={{ borderRadius: "6px" }}
        >
          Projects<span className="opacity-80"></span>
        </Link>
      </div>
    </header>
  );
}
