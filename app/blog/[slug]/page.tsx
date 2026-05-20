import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getBlogPost, getAllSlugs, blogPosts } from '../../../lib/blog';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  const url = `https://split-expense.com/blog/${post.slug}`;

  return {
    title: `${post.title} | SplitEase Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

const categoryColors: Record<string, string> = {
  Travel: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  Roommates: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Payments: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Wedding: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Tips: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'SplitEase', url: 'https://split-expense.com' },
    publisher: {
      '@type': 'Organization',
      name: 'SplitEase',
      url: 'https://split-expense.com',
      logo: { '@type': 'ImageObject', url: 'https://split-expense.com/icon-192.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://split-expense.com/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-mesh">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 pt-10 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
          <span aria-hidden>›</span>
          <span className="text-slate-400 truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className={`badge border text-xs px-2.5 py-1 ${categoryColors[post.category] ?? 'bg-slate-700 text-slate-300'}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-500">{post.readTime} min read</span>
            <span className="text-slate-700 text-xs">·</span>
            <time dateTime={post.publishedAt} className="text-xs text-slate-500">
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-surface-800 border border-slate-700 flex items-center justify-center text-4xl shrink-0">
              {post.coverEmoji}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
              {post.title}
            </h1>
          </div>

          <p className="text-slate-400 text-base leading-relaxed border-l-2 border-brand-500/40 pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Article body */}
        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-800">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-surface-800 border border-slate-700 text-slate-400">
              #{tag.replace(/\s+/g, '-')}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 card p-6 text-center border-brand-500/10 bg-brand-500/5">
          <p className="text-white font-semibold mb-1">Ready to split smarter?</p>
          <p className="text-sm text-slate-400 mb-4">Free, instant, no signup required.</p>
          <Link href="/#start" className="btn-primary px-6 py-2.5 text-sm">
            Create a Free Group →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">More articles</h2>
            <div className="space-y-3">
              {related.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="flex items-center gap-4 card p-4 hover:border-brand-500/30 transition-all group"
                >
                  <span className="text-2xl shrink-0">{rp.coverEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                      {rp.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{rp.readTime} min read · {rp.category}</p>
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
