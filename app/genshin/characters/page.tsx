"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CharacterCard } from "@/components/CharacterCard";
import { FilterBar, FilterState } from "@/components/FilterBar";
import {
  getAllCharacters,
  getUniqueElements,
  getUniqueWeaponTypes,
  getUniqueRegions,
} from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CharactersPage() {
  const allCharacters = getAllCharacters();
  const [filters, setFilters] = useState<FilterState>({
    element: "all",
    weaponType: "all",
    region: "all",
    rarity: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((character) => {
      const matchesElement =
        filters.element === "all" || character.element === filters.element;
      const matchesWeapon =
        filters.weaponType === "all" ||
        character.weaponType === filters.weaponType;
      const matchesRegion =
        filters.region === "all" || character.region === filters.region;
      const matchesRarity =
        filters.rarity === "all" ||
        character.rarity === parseInt(filters.rarity);
      const matchesSearch =
        searchQuery === "" ||
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.title.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesElement &&
        matchesWeapon &&
        matchesRegion &&
        matchesRarity &&
        matchesSearch
      );
    });
  }, [allCharacters, filters, searchQuery]);

  const elements = getUniqueElements();
  const weaponTypes = getUniqueWeaponTypes();
  const regions = getUniqueRegions();
  const rarities = [4, 5];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width Image with Gradient */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="https://upload-os-bbs.hoyolab.com/upload/2021/08/26/5481824/aa0b45e10b9965ec6b7a2c732af53024_8748354073441588777.png"
              alt="Genshin Impact Characters"
              fill
              className="object-contain object-center"
              priority
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* Gradient Overlay - Clear at top, black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />

        {/* Purple/Violet Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-purple-900/30 to-black/80" />

        {/* Content - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 z-10">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-violet-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                Characters
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light drop-shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Browse all Genshin Impact characters with detailed builds and guides
            </motion.p>
          </div>
        </div>

        {/* Bottom Fade Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search & Filters */}
        <div className="max-w-5xl mx-auto mb-16 space-y-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-16 text-lg rounded-3xl border-2 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-card/80 focus:border-violet-500"
            />
          </div>
          <FilterBar
            elements={elements}
            weaponTypes={weaponTypes}
            regions={regions}
            rarities={rarities}
            onFilterChange={setFilters}
          />
        </div>

        {/* Results Count */}
        <div className="text-center mb-10">
          <p className="text-base font-semibold gradient-brand-text">
            {filteredCharacters.length} Characters Available
          </p>
        </div>

        {/* Character Grid - Centered & Stunning */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
            {filteredCharacters.map((character, index) => (
              <motion.div
                key={character.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <CharacterCard character={character} />
              </motion.div>
            ))}
          </div>
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-block p-8 rounded-3xl bg-muted/50 backdrop-blur-sm">
              <p className="text-muted-foreground text-xl font-medium">
                No characters found matching your criteria
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
