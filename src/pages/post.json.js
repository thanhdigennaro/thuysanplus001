import { WORDPRESS_URL } from "../config";

export async function get(slug) {
  const apiUrl = WORDPRESS_URL;
  const result = await fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query PostBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
            id
            categories {
              edges {
                node {
                  databaseId
                  id
                  name
                  slug
                }
              }
            }
            content
            databaseId
            date
            isSticky
            postId
            slug
            title
            link
            featuredImage {
              node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
              }
            }
          }
        }
      `,
      variables: {
        slug: slug,
      },  
    })
  });
  return {
    body: await result.json(),
  };
}
