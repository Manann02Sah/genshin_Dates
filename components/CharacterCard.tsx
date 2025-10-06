"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Character } from "@/lib/data";

interface CharacterCardProps {
  character: Character;
}

const elementColors: Record<string, string> = {
  Pyro: "bg-red-500/20 text-red-600 border-red-500/50",
  Hydro: "bg-blue-500/20 text-blue-600 border-blue-500/50",
  Electro: "bg-purple-500/20 text-purple-600 border-purple-500/50",
  Cryo: "bg-cyan-500/20 text-cyan-600 border-cyan-500/50",
  Anemo: "bg-teal-500/20 text-teal-600 border-teal-500/50",
  Geo: "bg-amber-500/20 text-amber-600 border-amber-500/50",
  Dendro: "bg-green-500/20 text-green-600 border-green-500/50",
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/genshin/characters/${character.slug}`} className="w-full max-w-[220px]">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="group overflow-hidden cursor-pointer border-2 hover:border-violet-500/60 bg-gradient-to-br from-card to-muted/30 shadow-lg hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-300">
          {/* Character Image - Centered & Prominent */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-indigo-950/30">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.15, rotate: 2 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-contain object-center"
                sizes="220px"
              />
            </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-300" />

          {/* Brand Gradient Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rarity Stars */}
          <motion.div
            className="absolute top-3 right-3 flex gap-0.5"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {Array.from({ length: character.rarity }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-xl"
              />
            ))}
          </motion.div>

          {/* Element Badge */}
          <div className="absolute top-3 left-3 transform group-hover:scale-110 transition-transform">
            <Badge
              className={`${
                elementColors[character.element] || ""
              } backdrop-blur-md border-2 font-bold text-xs shadow-xl`}
            >
              {character.element}
            </Badge>
          </div>

          {/* Character Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-300 group-hover:pb-6">
            <h3 className="font-black text-xl mb-1.5 drop-shadow-2xl tracking-tight">
              {character.name}
            </h3>
            <p className="text-sm text-white/95 mb-3 line-clamp-1 drop-shadow-lg font-medium">
              {character.title}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs bg-white/25 backdrop-blur-md border-white/40 text-white hover:bg-white/35 font-semibold shadow-lg">
                {character.weaponType}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-white/25 backdrop-blur-md border-white/40 text-white hover:bg-white/35 font-semibold shadow-lg">
                {character.region}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
      </motion.div>
    </Link>
  );
}
