import { MetadataRoute } from "next";
import {
  getAllCharacters,
  getAllWeapons,
  getAllArtifacts,
  getAllGuides,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://genshin-guide.vercel.app"; // Update with your domain

  const characters = getAllCharacters().map((c) => ({
    url: `${baseUrl}/genshin/characters/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const weapons = getAllWeapons().map((w) => ({
    url: `${baseUrl}/genshin/weapons/${w.slug}`,
    lastModified: new Date(w.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const artifacts = getAllArtifacts().map((a) => ({
    url: `${baseUrl}/genshin/artifacts/${a.slug}`,
    lastModified: new Date(a.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guides = getAllGuides().map((g) => ({
    url: `${baseUrl}/genshin/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/genshin/characters`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/genshin/weapons`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/genshin/artifacts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/genshin/guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/genshin/teams`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...characters,
    ...weapons,
    ...artifacts,
    ...guides,
  ];
}
