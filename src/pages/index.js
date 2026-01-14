import { getPage } from "../lib/contentful";

export async function getStaticProps() {
  const page = await getPage("home");

  return {
    props: { page },
    revalidate: 60,
  };
}

export default function Home({ page }) {
  if (!page) return <div>No sign of Home in Contentful.</div>;

  const { title, description } = page.fields;
  const image = page.fields.image;
  const imageUrl = image?.fields?.file?.url
  ? `https:${image.fields.file.url}`
  : null;


  return (
  <main className="min-h-screen bg-neutral-950 text-white">
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Text */}
        <div>
          <p className="text-sm text-neutral-400">Portfolio</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-prose text-neutral-300 leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/projects"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full max-w-md rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
            />
          )}
        </div>
      </div>
    </div>
  </main>
);

}
