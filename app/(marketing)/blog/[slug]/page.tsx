import type { Metadata }  from "next";
import Image              from "next/image";
import Link               from "next/link";
import { notFound }       from "next/navigation";
import { ChevronRight, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

import { siteConfig }              from "@/lib/config/site";
import {
  blogPosts,
  getBlogPostBySlug,
  getSortedBlogPosts,
}                                  from "@/lib/data/blogData";
import { businesses, getBusinessBySlug } from "@/lib/data/mockData";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildWebPageSchema,
} from "@/lib/schema/builders";
import { JsonLd }                  from "@/components/seo/JsonLd";

// ─── Params type ──────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: `Post Not Found — ${siteConfig.name}` };

  return {
    title:       `${post.title} — ${siteConfig.name}`,
    description: post.metaDescription,
    alternates:  { canonical: `/blog/${slug}` },
    openGraph: {
      title:       post.title,
      description: post.metaDescription,
      images:      [{ url: post.coverImageUrl, alt: post.coverImageAlt }],
      type:        "article",
      publishedTime: post.publishedAt,
      ...(post.updatedAt && { modifiedTime: post.updatedAt }),
    },
  };
}

// ─── Related post helper ──────────────────────────────────────────────────────

function RelatedPost({ slug }: { slug: string }) {
  const sorted = getSortedBlogPosts();
  const idx    = sorted.findIndex((p) => p.slug === slug);
  const prev   = sorted[idx + 1]; // older
  const next   = sorted[idx - 1]; // newer

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-10 pt-8 border-t border-surface-muted grid sm:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 p-4 rounded-lg border border-surface-muted hover:border-brand-primary-light hover:bg-surface-warm transition-colors"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </span>
          <span className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 p-4 rounded-lg border border-surface-muted hover:border-brand-primary-light hover:bg-surface-warm transition-colors text-right sm:items-end"
        >
          <span className="flex items-center gap-1 text-xs text-text-muted mb-1">
            Next <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </nav>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  // Featured business cards
  const featuredBusinesses = (post.featuredBusinessSlugs ?? [])
    .map((s) => getBusinessBySlug(s))
    .filter(Boolean) as (typeof businesses)[number][];

  const schema = [
    buildArticleSchema(
      {
        slug:          post.slug,
        title:         post.title,
        description:   post.metaDescription,
        publishedAt:   post.publishedAt,
        updatedAt:     post.updatedAt,
        imageUrl:      post.coverImageUrl,
        imageAlt:      post.coverImageAlt,
        authorName:    post.author.name,
        focusKeyphrase: post.focusKeyphrase,
      },
      siteConfig,
    ),
    buildBreadcrumbSchema([
      { name: "Home",  item: siteConfig.url },
      { name: "Blog",  item: `${siteConfig.url}/blog` },
      { name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ]),
    buildWebPageSchema(
      siteConfig,
      `/blog/${post.slug}`,
      post.title,
      post.metaDescription,
    ),
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* ── Hero / Cover ──────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[21/9] max-h-[480px] overflow-hidden bg-surface-muted">
        <Image
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-secondary line-clamp-1">{post.title}</span>
        </nav>

        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-text-muted text-xs">·</span>
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year:  "numeric",
              month: "long",
              day:   "numeric",
            })}
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span className="ml-1 text-text-muted/70">
                (Updated{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
                )
              </span>
            )}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 pb-6 border-b border-surface-muted mb-8">
          <div className="w-8 h-8 rounded-full bg-brand-primary-pale flex items-center justify-center">
            <span className="text-brand-primary text-xs font-bold">
              {post.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{post.author.name}</p>
            {post.author.title && (
              <p className="text-xs text-text-muted">{post.author.title}</p>
            )}
          </div>
        </div>

        {/* Body */}
        <article
          className="prose prose-lg prose-headings:font-serif prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-li:text-text-secondary prose-ul:my-4 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Featured Businesses ─────────────────────────────────────────── */}
        {featuredBusinesses.length > 0 && (
          <section className="mt-12 pt-8 border-t border-surface-muted">
            <h2 className="font-serif text-xl font-bold text-text-primary mb-5">
              Featured in This Article
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {featuredBusinesses.map((biz) => (
                <Link
                  key={biz.slug}
                  href={`/directory/${biz.slug}`}
                  className="group flex gap-4 p-4 rounded-lg border border-surface-muted hover:border-brand-primary-light hover:bg-surface-warm transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-surface-muted">
                    <Image
                      src={biz.imageUrl}
                      alt={biz.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors truncate">
                      {biz.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{biz.category}</p>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                      {biz.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Post navigation ─────────────────────────────────────────────── */}
        <RelatedPost slug={post.slug} />

        {/* ── Back to blog ────────────────────────────────────────────────── */}
        <div className="mt-8 pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
