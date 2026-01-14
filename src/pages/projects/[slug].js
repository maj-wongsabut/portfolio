import Link from "next/link";
import { getProjects, getProject } from "../../lib/contentful";

export async function getStaticPaths() {
  const projects = await getProjects();

  const paths = projects.map((p) => ({
    params: { slug: p.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = await getProject(params.slug);

  return {
    props: { project },
    revalidate: 60,
  };
}

export default function ProjectPage({ project }) {
  if (!project) return <div>Project not found</div>;

  const { title, description, image } = project.fields;

  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/projects" className="text-sm text-white/70 hover:text-white">
          ← Back to projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-neutral-300 leading-relaxed">{description}</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="mt-10 w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
          />
        )}
      </div>
    </main>
  );
}
