import Link from "next/link";

export default function Custom404() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-widest text-white/60">
            404
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Sidan hittades inte
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/70">
            Länken kan vara fel eller sidan kan ha flyttats. Gå tillbaka till
            startsidan eller kolla dina projekt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
              style={{ borderRadius: "10px" }}
            >
              Till startsidan
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              style={{ borderRadius: "10px" }}
            >
              Se projekt
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
