import { getAllTeams } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, TrendingUp, TrendingDown } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Team Compositions | Genshin Impact Guide",
  description: "Discover the best team compositions and synergies for Genshin Impact",
};

export default function TeamsPage() {
  const teams = getAllTeams();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/20 text-green-600 border-green-500/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/50";
      case "hard":
        return "bg-red-500/20 text-red-600 border-red-500/50";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Team Compositions
        </h1>
        <p className="text-muted-foreground">
          Popular team compositions with detailed rotations and strategies
        </p>
      </div>

      <div className="grid gap-6">
        {teams.map((team) => (
          <Card key={team.slug} id={team.slug} className="scroll-mt-20">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{team.name}</CardTitle>
                  <p className="text-muted-foreground">{team.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getDifficultyColor(team.difficulty)}>
                    {team.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{team.rating}/10</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Characters */}
              <div>
                <h3 className="font-semibold mb-3">Team Members</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {team.characters.map((char) => (
                    <div key={char.slug} className="p-3 rounded-lg border bg-muted/50">
                      <div className="font-medium capitalize">
                        {char.slug.replace(/-/g, " ")}
                      </div>
                      <div className="text-sm text-muted-foreground">{char.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Rotation */}
              <div>
                <h3 className="font-semibold mb-3">Rotation</h3>
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  {team.rotation}
                </div>
              </div>

              <Separator />

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {team.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                    <TrendingDown className="w-5 h-5" />
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {team.weaknesses.map((weakness, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
