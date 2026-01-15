import { getNavigation, getPage } from "../lib/contentful";

export async function getStaticProps() {
  const page = await getPage("home");

  const nav = await getNavigation();
  const navigation = nav?.fields?.items ? JSON.parse(nav.fields.items) : [];

  return {
    props: { page: page || null, navigation },
    revalidate: 60,
  };
}

export default function HomePage({ page }) {
  const title = page?.fields?.title || "Hello, I'm Maj Wongsabut";
  const body =
    page?.fields?.body ||
    "I study Frontend Development at IT-Högskolan. I enjoy working with design and code, and I like creating websites that are both functional and visually appealing.";

  const image = page?.fields?.image;
  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* TEXT */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/60">
              Frontend Developer Portfolio
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {title}
            </h1>

            <p className="mt-6 max-w-prose text-base leading-relaxed text-white/70">
              {body}
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="/projects"
                className="inline-flex items-center border border-white/50 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
                style={{ borderRadius: "6px" }}
              >
                View projects
              </a>

              <a
                href="/contact"
                className="inline-flex items-center bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
                style={{ borderRadius: "6px" }}
              >
                Contact me
              </a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            {/* subtle ambient shadow */}
            <div className="pointer-events-none absolute -inset-24 bg-black/40 blur-3xl" />

            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "8px" }} // ← spetsigare hörn
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt={title}
                    className="h-[480px] w-full object-cover"
                  />

                  {/* soft edge blending */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
                  </div>
                </>
              ) : (
                <div className="flex h-[480px] items-center justify-center text-white/60">
                  Add image in Contentful
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
