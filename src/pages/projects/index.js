import Navbar from "../../components/navbar";
import { getNavigation, getProjects } from "../../lib/contentful";
import Link from "next/link";

export async function getStaticProps() {
  const projects = await getProjects();
  const nav = await getNavigation();
  const navigation = nav?.fields?.items ? JSON.parse(nav.fields.items) : [];

  return {
    props: { projects, navigation },
    revalidate: 60,
  };
}

export default function ProjectsPage({ projects, navigation }) {
  return (
    <>
      <Navbar items={navigation} />

      <main className="min-h-screen bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold">Projects</h1>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const { title, description, slug, image } = p.fields;

              const imageUrl = image?.fields?.file?.url
                ? `https:${image.fields.file.url}`
                : null;

              return (
                <Link
                  key={p.sys.id}
                  href={`/projects/${slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="h-40 w-full rounded-xl object-cover"
                    />
                  )}

                  <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                  <p className="mt-2 text-sm text-neutral-300 line-clamp-3">
                    {description}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-white/80">
                    Read more →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

