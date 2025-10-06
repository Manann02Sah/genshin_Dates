import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllGuides, getGuideBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} | Genshin Impact Guide`,
    description: guide.summary,
    authors: [{ name: guide.author }],
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/genshin/guides">Guides</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{guide.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="prose prose-slate dark:prose-invert max-w-none">
        <div className="not-prose mb-8">
          <Badge className="mb-4">{guide.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{guide.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{guide.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(guide.updatedAt)}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">{guide.summary}</p>

          <div className="flex gap-2 flex-wrap mb-8">
            {guide.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>

        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({ ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
            h3: ({ ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
            p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
            li: ({ ...props }) => <li className="ml-4" {...props} />,
            strong: ({ ...props }) => <strong className="font-semibold text-foreground" {...props} />,
            code: ({ ...props }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />,
          }}
        >
          {guide.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
