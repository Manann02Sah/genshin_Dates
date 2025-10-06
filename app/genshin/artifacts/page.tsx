"use client";

import { useState, useMemo } from "react";
import { ArtifactCard } from "@/components/ArtifactCard";
import { getAllArtifacts } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ArtifactsPage() {
  const allArtifacts = getAllArtifacts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtifacts = useMemo(() => {
    return allArtifacts.filter((artifact) =>
      artifact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allArtifacts, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Artifact Sets
        </h1>
        <p className="text-muted-foreground">
          Find the perfect artifact sets for your builds
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredArtifacts.map((artifact) => (
          <ArtifactCard key={artifact.slug} artifact={artifact} />
        ))}
      </div>
    </div>
  );
}
