import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Guide } from "@/lib/data";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/genshin/guides/${guide.slug}`}>
      <Card className="group overflow-hidden transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-background">
          <Image
            src={guide.thumbnail}
            alt={guide.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="backdrop-blur-sm">
              {guide.category}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-3">
          <h3 className="font-bold text-lg line-clamp-2 leading-tight">
            {guide.title}
          </h3>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
            {guide.summary}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{guide.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(guide.updatedAt)}</span>
            </div>
          </div>
          {guide.tags && guide.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-3">
              {guide.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
