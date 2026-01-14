import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getPage(slug) {
  const res = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] || null;
}

  export async function getProject(slug) {
  const res = await client.getEntries({
    content_type: "project",
    "fields.slug": slug,
    limit: 1,
  });

  return res.items[0] || null;
}

export async function getProjects() {
  const res = await client.getEntries({
    content_type: "project",
  });

  return res.items;
}

export async function getNavigation() {
  const res = await client.getEntries({
    content_type: "navigation",
    limit: 1,
  });

  return res.items[0] || null;
}
