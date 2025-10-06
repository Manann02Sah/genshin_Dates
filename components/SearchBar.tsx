"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Fuse from "fuse.js";
import { getAllCharacters, getAllGuides, getAllWeapons } from "@/lib/data";

interface SearchResult {
  type: "character" | "guide" | "weapon";
  slug: string;
  name: string;
  description?: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse.js with all searchable data
  const fuse = useRef<Fuse<SearchResult> | null>(null);

  useEffect(() => {
    const characters = getAllCharacters().map((c) => ({
      type: "character" as const,
      slug: c.slug,
      name: c.name,
      description: c.title,
    }));

    const guides = getAllGuides().map((g) => ({
      type: "guide" as const,
      slug: g.slug,
      name: g.title,
      description: g.summary,
    }));

    const weapons = getAllWeapons().map((w) => ({
      type: "weapon" as const,
      slug: w.slug,
      name: w.name,
      description: w.type,
    }));

    const searchData = [...characters, ...guides, ...weapons];

    fuse.current = new Fuse(searchData, {
      keys: ["name", "description"],
      threshold: 0.3,
      includeScore: true,
    });
  }, []);

  useEffect(() => {
    if (query.length > 1 && fuse.current) {
      const searchResults = fuse.current.search(query, { limit: 8 });
      setResults(searchResults.map((r) => r.item));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    const routes = {
      character: `/genshin/characters/${result.slug}`,
      guide: `/genshin/guides/${result.slug}`,
      weapon: `/genshin/weapons/${result.slug}`,
    };

    router.push(routes[result.type]);
    setQuery("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search characters, guides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full z-50">
          <Command className="rounded-lg border shadow-md">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Results">
                {results.map((result, index) => (
                  <CommandItem
                    key={`${result.type}-${result.slug}-${index}`}
                    onSelect={() => handleSelect(result)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          ({result.type})
                        </span>
                      </div>
                      {result.description && (
                        <span className="text-sm text-muted-foreground truncate">
                          {result.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
