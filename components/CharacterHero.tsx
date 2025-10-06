"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star } from "lucide-react";
import { Character } from "@/lib/data";

interface CharacterHeroProps {
  character: Character;
  elementColors: Record<string, string>;
}

export function CharacterHero({ character, elementColors }: CharacterHeroProps) {
  return (
    <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
      {/* Background Character Image - Centered */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Gradient Overlay - Transparent at top, black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* Element Color Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          elementColors[character.element]
        } opacity-20`}
      />

      {/* Brand Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-purple-900/20 to-black/60" />

      {/* Breadcrumb - Floating at top */}
      <motion.div
        className="absolute top-6 left-0 right-0 z-20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <Breadcrumb className="backdrop-blur-md bg-black/30 w-fit rounded-xl px-4 py-2 border border-white/20">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/80 hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/genshin/characters" className="text-white/80 hover:text-white">
                  Characters
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/60" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-semibold">{character.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </motion.div>

      {/* Character Info - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 z-10 max-w-4xl">
          {/* Rarity Stars */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            {Array.from({ length: character.rarity }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <Star className="w-8 h-8 fill-amber-400 text-amber-400 drop-shadow-2xl" />
              </motion.div>
            ))}
          </motion.div>

          {/* Character Name */}
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 text-white drop-shadow-2xl tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {character.name}
          </motion.h1>

          {/* Character Title */}
          <motion.p
            className="text-2xl md:text-3xl text-white/95 mb-8 font-light drop-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {character.title}
          </motion.p>

          {/* Badges */}
          <motion.div
            className="flex gap-3 justify-center flex-wrap mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Badge className={`bg-gradient-to-r ${elementColors[character.element]} text-white border-0 px-6 py-2 text-base font-bold shadow-2xl backdrop-blur-sm`}>
              {character.element}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-md border-white/40 text-white px-6 py-2 text-base font-semibold hover:bg-white/30 shadow-2xl">
              {character.weaponType}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-md border-white/40 text-white px-6 py-2 text-base font-semibold hover:bg-white/30 shadow-2xl">
              {character.region}
            </Badge>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            {character.description}
          </motion.p>

          {/* Role Tags */}
          <motion.div
            className="flex gap-2 justify-center flex-wrap mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {character.roleTags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.3 }}
              >
                <Badge className="bg-violet-600/30 backdrop-blur-md border-violet-400/50 text-white px-4 py-1.5 text-sm font-semibold shadow-lg">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
