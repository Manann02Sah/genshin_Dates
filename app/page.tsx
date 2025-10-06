import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CharacterCard } from "@/components/CharacterCard";
import { GuideCard } from "@/components/GuideCard";
import { getAllCharacters, getAllGuides } from "@/lib/data";
import { ArrowRight, BookOpen, Users, Sword, Shield } from "lucide-react";

export default function HomePage() {
  const featuredCharacters = getAllCharacters().slice(0, 6);
  const latestGuides = getAllGuides().slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-violet-950/20 dark:via-black dark:to-purple-950/20" />

        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-400/20 to-purple-600/20 dark:from-violet-600/10 dark:to-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/20 to-violet-600/20 dark:from-indigo-600/10 dark:to-violet-800/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="w-2 h-2 rounded-full gradient-brand animate-pulse" />
              <span className="text-sm font-medium">Production-Ready Genshin Guide</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="gradient-brand-text">
                Master Genshin
              </span>
              <br />
              <span className="text-foreground">Like a Pro</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Comprehensive guides, optimal builds, and winning strategies—all in one sleek platform
            </p>

            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Button asChild size="lg" className="btn-gradient rounded-full px-8 h-12 text-base font-semibold">
                <Link href="/genshin/characters">
                  Explore Characters <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                <Link href="/genshin/guides">
                  View Guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/genshin/characters" className="group">
              <Card className="card-premium h-full transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 border-2">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Characters</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Detailed builds and guides for all characters
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/genshin/weapons" className="group">
              <Card className="card-premium h-full transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 border-2">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sword className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Weapons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Find the best weapons for your characters
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/genshin/artifacts" className="group">
              <Card className="card-premium h-full transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 border-2">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Artifacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Optimize your builds with the right artifacts
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/genshin/guides" className="group">
              <Card className="card-premium h-full transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 border-2">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Learn strategies and tips from experts
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Characters</h2>
              <p className="text-muted-foreground">Discover the most popular builds</p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link href="/genshin/characters" className="flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredCharacters.map((character) => (
              <CharacterCard key={character.slug} character={character} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Latest Guides</h2>
              <p className="text-muted-foreground">Master the meta with expert strategies</p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link href="/genshin/guides" className="flex items-center gap-2">
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="gradient-brand border-0 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

            <CardContent className="relative p-16 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Ready to Dominate?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
                Explore meta team compositions with detailed rotations and win-condition analysis
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8 h-12 text-base font-semibold hover:scale-105 transition-transform">
                <Link href="/genshin/teams" className="flex items-center gap-2">
                  View Team Compositions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
