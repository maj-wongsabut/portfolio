import Link from "next/link";
import { getProjects } from "../../lib/contentful";

export async function getStaticProps() {
  const projects = await getProjects();

  return {
    props: { projects },
    revalidate: 60,
  };
}

export default function ProjectsPage({ projects }) {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold sm:text-5xl">Projects</h1>
          <p className="mt-4 max-w-prose text-white/70">
            A selection of projects I’ve worked on, focusing on frontend
            development, UI design, and usability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const { title, description, slug, image } = project.fields;

            const imageUrl = image?.fields?.file?.url
              ? `https:${image.fields.file.url}`
              : null;

            return (
              <Link
                key={project.sys.id}
                href={`/projects/${slug}`}
                className="group block border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/[0.06]"
                style={{ borderRadius: "8px" }}
              >
                {imageUrl && (
                  <div
                    className="mb-5 overflow-hidden"
                    style={{ borderRadius: "6px" }}
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <h2 className="text-lg font-semibold">{title}</h2>

                <p className="mt-2 text-sm text-white/60 line-clamp-3">
                  {description}
                </p>

                <div className="mt-6 text-sm font-medium text-white/80 transition group-hover:text-white">
                  View project →
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
