"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBarProps {
  elements?: string[];
  weaponTypes?: string[];
  regions?: string[];
  rarities?: number[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  element: string;
  weaponType: string;
  region: string;
  rarity: string;
}

export function FilterBar({
  elements = [],
  weaponTypes = [],
  regions = [],
  rarities = [],
  onFilterChange,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    element: "all",
    weaponType: "all",
    region: "all",
    rarity: "all",
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      element: "all",
      weaponType: "all",
      region: "all",
      rarity: "all",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "all");

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {elements.length > 0 && (
        <Select value={filters.element} onValueChange={(v) => updateFilter("element", v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Element" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Elements</SelectItem>
            {elements.map((element) => (
              <SelectItem key={element} value={element}>
                {element}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {weaponTypes.length > 0 && (
        <Select value={filters.weaponType} onValueChange={(v) => updateFilter("weaponType", v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Weapon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Weapons</SelectItem>
            {weaponTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {regions.length > 0 && (
        <Select value={filters.region} onValueChange={(v) => updateFilter("region", v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {rarities.length > 0 && (
        <Select value={filters.rarity} onValueChange={(v) => updateFilter("rarity", v)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarity</SelectItem>
            {rarities.map((rarity) => (
              <SelectItem key={rarity} value={rarity.toString()}>
                {rarity}★
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
