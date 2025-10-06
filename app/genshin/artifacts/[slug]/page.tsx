import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllArtifacts, getArtifactBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Star } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllArtifacts().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artifact = getArtifactBySlug(params.slug);
  if (!artifact) return { title: "Artifact Not Found" };
  return {
    title: `${artifact.name} - Artifact Set | Genshin Impact Guide`,
    description: `${artifact.name}: ${artifact.twoPieceBonus}. ${artifact.fourPieceBonus}`,
  };
}

export default function ArtifactDetailPage({ params }: { params: { slug: string } }) {
  const artifact = getArtifactBySlug(params.slug);
  if (!artifact) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/genshin/artifacts">Artifacts</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{artifact.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted to-background p-8">
          <Image src={artifact.image} alt={artifact.name} fill className="object-contain" />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: artifact.maxRarity }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-2">{artifact.name}</h1>
            <div className="flex gap-2 mb-4">
              <Badge>{artifact.location}</Badge>
              <Badge variant="outline">{artifact.domain}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader><CardTitle>2-Piece Bonus</CardTitle></CardHeader>
            <CardContent><p className="leading-relaxed">{artifact.twoPieceBonus}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>4-Piece Bonus</CardTitle></CardHeader>
            <CardContent><p className="leading-relaxed">{artifact.fourPieceBonus}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Best For</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {artifact.bestFor.map((charSlug) => (
                  <Link key={charSlug} href={`/genshin/characters/${charSlug}`}>
                    <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                      {charSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
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
