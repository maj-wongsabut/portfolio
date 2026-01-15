import Link from "next/link";
import { getNavigation, getProject, getProjects } from "../../lib/contentful";

export async function getStaticPaths() {
  const projects = await getProjects();

  return {
    paths: (projects || []).map((p) => ({
      params: { slug: p.fields.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = await getProject(params.slug);

  const nav = await getNavigation();
  const navigation = nav?.fields?.items ? JSON.parse(nav.fields.items) : [];

  return {
    props: { project: project || null, navigation },
    revalidate: 60,
  };
}

export default function ProjectDetailPage({ project }) {
  const title = project?.fields?.title || "Project";
  const description = project?.fields?.description || "";
  const image = project?.fields?.image;
  const imageUrl = image?.fields?.file?.url ? `https:${image.fields.file.url}` : null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition"
        >
          ← Back to projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold">{title}</h1>

        {description && (
          <p className="mt-4 text-base leading-relaxed text-white/75">
            {description}
          </p>
        )}

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-[360px] w-full object-cover sm:h-[480px]"
            />
          ) : (
            <div className="flex h-[360px] w-full items-center justify-center text-sm text-white/60 sm:h-[480px]">
              No image
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
