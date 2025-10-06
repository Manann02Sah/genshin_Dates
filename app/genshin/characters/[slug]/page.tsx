import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllCharacters,
  getCharacterBySlug,
  getWeaponBySlug,
  getArtifactBySlug,
  Character,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CharacterHero } from "@/components/CharacterHero";
import { Star, Sword, Shield, Zap } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const characters = getAllCharacters();
  return characters.map((character) => ({
    slug: character.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    return {
      title: "Character Not Found",
    };
  }

  return {
    title: `${character.name} - ${character.title} | Genshin Impact Guide`,
    description: `Complete guide for ${character.name}: best weapons, artifacts, teams, and build recommendations for this ${character.rarity}★ ${character.element} ${character.weaponType} character from ${character.region}.`,
    openGraph: {
      title: `${character.name} - ${character.title}`,
      description: character.description,
      images: [character.image],
    },
  };
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const elementColors: Record<string, string> = {
    Pyro: "from-red-500 to-orange-500",
    Hydro: "from-blue-500 to-cyan-500",
    Electro: "from-purple-500 to-pink-500",
    Cryo: "from-cyan-400 to-blue-400",
    Anemo: "from-teal-400 to-green-400",
    Geo: "from-amber-500 to-yellow-600",
    Dendro: "from-green-500 to-lime-500",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animations */}
      <CharacterHero character={character} elementColors={elementColors} />

      <div className="container mx-auto px-4 py-16">

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="builds" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px] h-12 mx-auto">
            <TabsTrigger value="builds" className="text-base font-semibold">Best Builds</TabsTrigger>
            <TabsTrigger value="teams" className="text-base font-semibold">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="builds" className="space-y-6">
            {/* Weapons */}
            <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="w-5 h-5" />
                Recommended Weapons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {character.bestBuild.weapons.map((weaponSlug) => {
                  const weapon = getWeaponBySlug(weaponSlug);
                  if (!weapon) return null;
                  return (
                    <Link
                      key={weaponSlug}
                      href={`/genshin/weapons/${weaponSlug}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={weapon.image}
                          alt={weapon.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{weapon.name}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: weapon.rarity }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {weapon.subStat}: {weapon.subStatValue}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

            {/* Artifacts */}
            <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Artifact Sets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {character.bestBuild.artifacts.map((artifactSlug) => {
                  const artifact = getArtifactBySlug(artifactSlug);
                  if (!artifact) return null;
                  return (
                    <Link
                      key={artifactSlug}
                      href={`/genshin/artifacts/${artifactSlug}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={artifact.image}
                          alt={artifact.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{artifact.name}</div>
                        <p className="text-sm text-muted-foreground">
                          {artifact.twoPieceBonus}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

            {/* Main Stats */}
            <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Artifact Main Stats Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-semibold mb-2 text-muted-foreground">
                    Sands
                  </div>
                  <div className="font-medium">
                    {character.bestBuild.mainStats.sands}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2 text-muted-foreground">
                    Goblet
                  </div>
                  <div className="font-medium">
                    {character.bestBuild.mainStats.goblet}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2 text-muted-foreground">
                    Circlet
                  </div>
                  <div className="font-medium">
                    {character.bestBuild.mainStats.circlet}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* Substats */}
            <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Substat Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {character.bestBuild.substatsPriority.map((stat, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span>{stat}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="teams">
            <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Recommended Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {character.teams.map((teamSlug) => (
                  <Link
                    key={teamSlug}
                    href={`/genshin/teams#${teamSlug}`}
                    className="block p-4 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <div className="font-semibold capitalize">
                      {teamSlug.replace(/-/g, " ")}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      View full team composition and rotation →
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>

        {/* Last Updated */}
        <div className="mt-12 text-sm text-muted-foreground text-center">
          Last updated: {new Date(character.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
