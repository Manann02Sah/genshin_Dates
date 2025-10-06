"use client";

import { useState, useMemo } from "react";
import { GuideCard } from "@/components/GuideCard";
import { getAllGuides } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GuidesPage() {
  const allGuides = getAllGuides();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [...new Set(allGuides.map((g) => g.category))];

  const filteredGuides = useMemo(() => {
    return allGuides.filter((guide) => {
      const matchesSearch =
        searchQuery === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allGuides, searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Guides & Strategies
        </h1>
        <p className="text-muted-foreground">
          Learn tips, tricks, and strategies to master Genshin Impact
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredGuides.length} of {allGuides.length} guides
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
