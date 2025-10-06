import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Artifact } from "@/lib/data";

interface ArtifactCardProps {
  artifact: Artifact;
}

export function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <Link href={`/genshin/artifacts/${artifact.slug}`}>
      <Card className="group overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
          <Image
            src={artifact.image}
            alt={artifact.name}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {Array.from({ length: artifact.maxRarity }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-base mb-2 line-clamp-2 leading-tight">
            {artifact.name}
          </h3>
          <Badge variant="outline" className="text-xs mb-2">
            {artifact.location}
          </Badge>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {artifact.twoPieceBonus}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
