import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllWeapons, getWeaponBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const weapons = getAllWeapons();
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) return { title: "Weapon Not Found" };

  return {
    title: `${weapon.name} - ${weapon.type} | Genshin Impact Guide`,
    description: `${weapon.name}: ${weapon.rarity}★ ${weapon.type} with ${weapon.subStat}. ${weapon.passiveDescription}`,
  };
}

export default function WeaponDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const weapon = getWeaponBySlug(params.slug);
  if (!weapon) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/genshin/weapons">Weapons</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{weapon.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-background p-8">
          <Image src={weapon.image} alt={weapon.name} fill className="object-contain" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: weapon.rarity }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-2">{weapon.name}</h1>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline">{weapon.type}</Badge>
              <Badge>{weapon.obtainMethod}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base ATK</span>
                <span className="font-semibold">{weapon.baseAttack}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Secondary Stat</span>
                <span className="font-semibold">
                  {weapon.subStat} {weapon.subStatValue}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{weapon.passive}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {weapon.passiveDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {weapon.bestFor.map((charSlug) => (
                  <Link key={charSlug} href={`/genshin/characters/${charSlug}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {charSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
