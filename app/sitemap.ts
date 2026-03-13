import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://speak-club.io";

  const routes = [
    "",
    "/technology",
    "/use-cases",
    "/developers",
    "/architecture",
    "/pricing",
    "/blog",
    "/contact",
    "/login",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
