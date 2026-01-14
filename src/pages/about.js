import { getPage } from "../lib/contentful";

export async function getStaticProps() {
  const page = await getPage("about");

  return {
    props: { page },
    revalidate: 60,
  };
}

export default function About({ page }) {
  if (!page) return <div>About not found in Contentful.</div>;

  const { title, description, image } = page.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-neutral-300 leading-relaxed">{description}</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="mt-10 w-full max-w-md rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
          />
        )}
      </div>
    </main>
  );
}
