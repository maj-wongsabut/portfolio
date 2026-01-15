import { getPage } from "../lib/contentful";

export async function getStaticProps() {
  const page = await getPage("about");

  return {
    props: { page: page || null },
    revalidate: 60,
  };
}

export default function AboutPage({ page }) {
  const title = page?.fields?.title || "About me";

  const rawBody = page?.fields?.body || "";
  // Gör om radbrytningar till ett stycke:
  const body = rawBody.replace(/\s*\n+\s*/g, " ").trim();

  // Lägg din PDF i /public
  const cvUrl = "/Maj-Wongsabut-CV.pdf";

  const cardClass =
    "border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition";
  const cardRadius = { borderRadius: "10px" };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>

          <p className="mt-6 text-base leading-relaxed text-white/70">
            {body}
          </p>

          {/* Cards: Focus / Tech / CV */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Focus */}
            <div className={cardClass} style={cardRadius}>
              <p className="text-sm font-semibold text-white">Focus</p>
              <p className="mt-2 text-sm text-white/60">
                UI/UX, frontend, responsiv design och små detaljer som gör sidan
                clean.
              </p>
            </div>

            {/* Tech */}
            <div className={cardClass} style={cardRadius}>
              <p className="text-sm font-semibold text-white">Tech</p>
              <p className="mt-2 text-sm text-white/60">
                Next.js, React, Tailwind CSS, Contentful.
              </p>
            </div>

            {/* CV */}
            <div className={cardClass} style={cardRadius}>
              <p className="text-sm font-semibold text-white">CV</p>
              <p className="mt-2 text-sm text-white/60">
                Ladda ner mitt CV som PDF.
              </p>

              <a
              href="/Maj-Wongsabut-CV.pdf"
              download
              className="mt-4 inline-flex items-center justify-center border border-white/40 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
              style={{ borderRadius: "8px" }}
              >
              Resume ↓
              </a>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
