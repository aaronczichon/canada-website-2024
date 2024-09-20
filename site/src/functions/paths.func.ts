import { getCollection } from "astro:content";

/**
 * Generates the static paths based on the given language and generates the paginated
 * pages based on size.
 * @param paginate object containing the pagination function of Astro
 * @param lang the language which should be filtered for the blog posts
 * @returns pagination object from Astro
 */
export const generateStaticPaths = async (paginate: any, lang: "de" | "en") => {
  let allPosts = await getCollection("blog");
  allPosts = allPosts.filter((entry) =>
    lang === "de"
      ? entry.slug.split("/")[0] !== "en"
      : entry.slug.split("/")[0] === "en",
  );
  allPosts = allPosts.sort((a, b) => {
    return a.data.pubDate > b.data.pubDate ? -1 : 1;
  });
  // Generate pages from our array of astronauts, with 2 to a page
  return paginate(allPosts, { pageSize: 6 });
};
