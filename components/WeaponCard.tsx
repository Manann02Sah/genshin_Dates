import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Weapon } from "@/lib/data";

interface WeaponCardProps {
  weapon: Weapon;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <Link href={`/genshin/weapons/${weapon.slug}`}>
      <Card className="group overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
          <Image
            src={weapon.image}
            alt={weapon.name}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {Array.from({ length: weapon.rarity }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-base mb-1 truncate">{weapon.name}</h3>
          <div className="flex gap-2 flex-wrap mb-2">
            <Badge variant="outline" className="text-xs">
              {weapon.type}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {weapon.subStat}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            ATK: {weapon.baseAttack}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
