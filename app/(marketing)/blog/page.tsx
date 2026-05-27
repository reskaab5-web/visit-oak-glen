import type { Metadata }  from "next";
import Image              from "next/image";
import Link               from "next/link";
import { ChevronRight, Calendar, ArrowRight } from "lucide-react";

import {
  AnimatedHeroContent,
  AnimatedHeroItem,
  AnimatedSectionReveal,
} from "@/components/motion/AnimatedHeroContent";
import { siteConfig }             from "@/lib/config/site";
import { getSortedBlogPosts }     from "@/lib/data/blogData";
import {
  buildWebPageSchema,
  buildCollectionPageSchema,
} from "@/lib/schema/builders";
import { JsonLd }                 from "@/components/seo/JsonLd";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       `Blog — ${siteConfig.location.name}, ${siteConfig.location.state}`,
  description: `Guides, seasonal tips, and local stories about ${siteConfig.location.name}. Discover the best apple picking farms, year-round activities, dining, and weddings in the mountains.`,
  alternates:  { canonical: "/blog" },
  openGraph: {
    title:       `${siteConfig.location.name} Blog`,
    description: `Local guides and stories from ${siteConfig.location.name}.`,
    url:         `${siteConfig.url}/blog`,
    siteName:    siteConfig.name,
    type:        "website",
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const posts = getSortedBlogPosts();

  const [featured, ...rest] = posts;

  const schema = [
    buildWebPageSchema(
      siteConfig,
      "/blog",
      `${siteConfig.location.name} Blog`,
      `Local guides, seasonal tips, and stories from ${siteConfig.location.name}.`,
    ),
    buildCollectionPageSchema(
      siteConfig,
      "/blog",
      `${siteConfig.location.name} Blog`,
      `Guides and stories about visiting ${siteConfig.location.name}.`,
    ),
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-mid to-brand-primary opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <AnimatedHeroContent>
            {/* Breadcrumb */}
            <AnimatedHeroItem delay={0}>
              <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/90">Blog</span>
              </nav>
            </AnimatedHeroItem>

            <AnimatedHeroItem delay={0.1}>
              <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
                Local Guides & Stories
              </p>
            </AnimatedHeroItem>

            <AnimatedHeroItem delay={0.2}>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                The {siteConfig.location.name} Blog
              </h1>
            </AnimatedHeroItem>

            <AnimatedHeroItem delay={0.3}>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                Seasonal guides, farm-by-farm breakdowns, dining recommendations, and local
                stories — everything you need to make the most of your visit.
              </p>
            </AnimatedHeroItem>
          </AnimatedHeroContent>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────────────────────── */}
      {featured && (
        <section className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <AnimatedSectionReveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid sm:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-card border border-surface-muted hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[320px] overflow-hidden">
                <Image
                  src={featured.coverImageUrl}
                  alt={featured.coverImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 bg-surface-warm">
                <span className="inline-block text-xs font-semibold text-brand-accent uppercase tracking-wider mb-3">
                  {featured.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary leading-snug mb-3 group-hover:text-brand-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                      year:  "numeric",
                      month: "long",
                      day:   "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-primary group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </AnimatedSectionReveal>
        </section>
      )}

      {/* ── Post Grid ─────────────────────────────────────────────────────── */}
      {rest.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <AnimatedSectionReveal>
            <h2 className="font-serif text-xl font-bold text-text-primary mb-6">
              More Articles
            </h2>
          </AnimatedSectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <AnimatedSectionReveal key={post.slug} delay={i * 0.07}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden border border-surface-muted shadow-card hover:shadow-lg transition-shadow h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text-primary leading-snug mb-2 group-hover:text-brand-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="flex items-center gap-1.5 text-xs text-text-muted mt-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year:  "numeric",
                        month: "long",
                        day:   "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              </AnimatedSectionReveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
