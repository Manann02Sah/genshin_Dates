import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Genshin Guide
            </h3>
            <p className="text-sm text-muted-foreground">
              Your comprehensive guide to Genshin Impact characters, weapons,
              artifacts, and strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/genshin/characters"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Characters
                </Link>
              </li>
              <li>
                <Link
                  href="/genshin/weapons"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Weapons
                </Link>
              </li>
              <li>
                <Link
                  href="/genshin/artifacts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Artifacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/genshin/guides"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/genshin/teams"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Team Compositions
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="font-semibold">Community</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Genshin Guide. Built with Next.js 14 &
            TypeScript.
          </p>
          <p className="mt-2">
            Genshin Impact is a trademark of miHoYo/HoYoverse. This is an
            unofficial fan-made guide.
          </p>
        </div>
      </div>
    </footer>
  );
}
