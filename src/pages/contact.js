import { getPage } from "../lib/contentful";

export async function getStaticProps() {
  const page = await getPage("contact");

  return {
    props: { page },
    revalidate: 60,
  };
}

function makeLinks(text) {
  const safeText = text || "";
  const parts = safeText.split(/(\s+)/);

  return parts.map((part, i) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 text-white hover:opacity-80"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Contact({ page }) {
  if (!page) return <div>Contact not found in Contentful.</div>;

  const { title, body } = page.fields;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-bold">{title}</h1>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="whitespace-pre-line text-neutral-200 leading-relaxed">
            {makeLinks(body)}
          </p>
        </div>
      </div>
    </main>
  );
}
