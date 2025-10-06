import characters from "@/data/characters.json";
import weapons from "@/data/weapons.json";
import artifacts from "@/data/artifacts.json";
import guides from "@/data/guides.json";
import teams from "@/data/teams.json";

// Type definitions
export interface Character {
  slug: string;
  name: string;
  title: string;
  rarity: number;
  element: string;
  weaponType: string;
  region: string;
  roleTags: string[];
  description: string;
  image: string;
  bestBuild: {
    weapons: string[];
    artifacts: string[];
    mainStats: {
      sands: string;
      goblet: string;
      circlet: string;
    };
    substatsPriority: string[];
  };
  teams: string[];
  updatedAt: string;
}

export interface Weapon {
  slug: string;
  name: string;
  type: string;
  rarity: number;
  baseAttack: number;
  subStat: string;
  subStatValue: string;
  passive: string;
  passiveDescription: string;
  obtainMethod: string;
  bestFor: string[];
  image: string;
  updatedAt: string;
}

export interface Artifact {
  slug: string;
  name: string;
  maxRarity: number;
  twoPieceBonus: string;
  fourPieceBonus: string;
  domain: string;
  location: string;
  bestFor: string[];
  image: string;
  updatedAt: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  thumbnail: string;
  summary: string;
  content: string;
}

export interface Team {
  slug: string;
  name: string;
  description: string;
  difficulty: string;
  rating: number;
  characters: {
    slug: string;
    role: string;
  }[];
  rotation: string;
  strengths: string[];
  weaknesses: string[];
  updatedAt: string;
}

// Character functions
export function getAllCharacters(): Character[] {
  return characters as Character[];
}

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug) as Character | undefined;
}

export function getCharactersByElement(element: string): Character[] {
  return characters.filter((c) => c.element === element) as Character[];
}

export function getCharactersByWeaponType(weaponType: string): Character[] {
  return characters.filter((c) => c.weaponType === weaponType) as Character[];
}

export function getCharactersByRarity(rarity: number): Character[] {
  return characters.filter((c) => c.rarity === rarity) as Character[];
}

// Weapon functions
export function getAllWeapons(): Weapon[] {
  return weapons as Weapon[];
}

export function getWeaponBySlug(slug: string): Weapon | undefined {
  return weapons.find((w) => w.slug === slug) as Weapon | undefined;
}

export function getWeaponsByType(type: string): Weapon[] {
  return weapons.filter((w) => w.type === type) as Weapon[];
}

export function getWeaponsByRarity(rarity: number): Weapon[] {
  return weapons.filter((w) => w.rarity === rarity) as Weapon[];
}

// Artifact functions
export function getAllArtifacts(): Artifact[] {
  return artifacts as Artifact[];
}

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return artifacts.find((a) => a.slug === slug) as Artifact | undefined;
}

// Guide functions
export function getAllGuides(): Guide[] {
  return guides as Guide[];
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug) as Guide | undefined;
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category) as Guide[];
}

// Team functions
export function getAllTeams(): Team[] {
  return teams as Team[];
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug) as Team | undefined;
}

// Search functionality
export function searchAll(query: string) {
  const lowercaseQuery = query.toLowerCase();

  const matchedCharacters = characters.filter(
    (c) =>
      c.name.toLowerCase().includes(lowercaseQuery) ||
      c.element.toLowerCase().includes(lowercaseQuery) ||
      c.region.toLowerCase().includes(lowercaseQuery)
  );

  const matchedWeapons = weapons.filter(
    (w) =>
      w.name.toLowerCase().includes(lowercaseQuery) ||
      w.type.toLowerCase().includes(lowercaseQuery)
  );

  const matchedArtifacts = artifacts.filter(
    (a) => a.name.toLowerCase().includes(lowercaseQuery)
  );

  const matchedGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(lowercaseQuery) ||
      g.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );

  return {
    characters: matchedCharacters,
    weapons: matchedWeapons,
    artifacts: matchedArtifacts,
    guides: matchedGuides,
  };
}

// Get unique values for filters
export function getUniqueElements(): string[] {
  return [...new Set(characters.map((c) => c.element))];
}

export function getUniqueWeaponTypes(): string[] {
  return [...new Set(characters.map((c) => c.weaponType))];
}

export function getUniqueRegions(): string[] {
  return [...new Set(characters.map((c) => c.region))];
}
