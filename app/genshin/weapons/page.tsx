"use client";

import { useState, useMemo } from "react";
import { WeaponCard } from "@/components/WeaponCard";
import { getAllWeapons } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WeaponsPage() {
  const allWeapons = getAllWeapons();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");

  const weaponTypes = [...new Set(allWeapons.map((w) => w.type))];

  const filteredWeapons = useMemo(() => {
    return allWeapons.filter((weapon) => {
      const matchesSearch =
        searchQuery === "" ||
        weapon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || weapon.type === typeFilter;
      const matchesRarity =
        rarityFilter === "all" || weapon.rarity === parseInt(rarityFilter);

      return matchesSearch && matchesType && matchesRarity;
    });
  }, [allWeapons, searchQuery, typeFilter, rarityFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Weapons
        </h1>
        <p className="text-muted-foreground">
          Discover the best weapons for your characters
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search weapons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {weaponTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={rarityFilter} onValueChange={setRarityFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarity</SelectItem>
            <SelectItem value="5">5★</SelectItem>
            <SelectItem value="4">4★</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredWeapons.length} of {allWeapons.length} weapons
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredWeapons.map((weapon) => (
          <WeaponCard key={weapon.slug} weapon={weapon} />
        ))}
      </div>

      {filteredWeapons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No weapons found</p>
        </div>
      )}
    </div>
  );
}
