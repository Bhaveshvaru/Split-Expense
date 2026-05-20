import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { blogPosts } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Expense Splitting Tips & Guides | SplitEase',
  description:
    'Practical guides on splitting expenses with friends, roommates, and family. Tips for group trips, UPI payments, wedding budgets, and fair bill splitting.',
  alternates: { canonical: 'https://split-expense.com/blog' },
  openGraph: {
    title: 'Blog — Expense Splitting Tips & Guides',
    description: 'Practical guides on splitting expenses with friends, roommates, and family.',
    url: 'https://split-expense.com/blog',
  },
};

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

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-14 pb-24">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 border border-brand-500/20 px-4 py-1.5 text-sm text-brand-400 mb-5">
            ✍️ SplitEase Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Guides & Tips for
            <br />
            <span className="text-brand-400">Splitting Expenses</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Practical advice on managing shared expenses — for trips, roommates, weddings, and everyday friend groups.
          </p>
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block card p-6 md:p-8 mb-8 hover:border-brand-500/30 hover:shadow-glow-sm transition-all group"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-brand-500/10 flex items-center justify-center text-5xl md:text-6xl shrink-0">
              {featured.coverEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`badge border text-xs px-2.5 py-1 ${categoryColors[featured.category] ?? 'bg-slate-700 text-slate-300'}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-slate-500">Featured</span>
                <span className="text-slate-700 text-xs">·</span>
                <span className="text-xs text-slate-500">{featured.readTime} min read</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{formatDate(featured.publishedAt)}</span>
                <span className="text-sm text-brand-400 group-hover:text-brand-300 transition-colors font-medium">
                  Read article →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rest of Posts */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block card p-5 hover:border-brand-500/30 hover:shadow-glow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-700 flex items-center justify-center text-2xl shrink-0">
                  {post.coverEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`badge border text-xs px-2 py-0.5 ${categoryColors[post.category] ?? 'bg-slate-700 text-slate-300'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-600">{post.readTime} min</span>
                  </div>
                  <h2 className="text-sm font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-slate-600">{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 text-center border-brand-500/10">
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-xl font-bold text-white mb-2">Ready to split smarter?</h2>
          <p className="text-slate-400 text-sm mb-6">
            Create a free group and start tracking expenses in under 2 minutes. No signup needed.
          </p>
          <Link href="/#start" className="btn-primary px-8 py-3">
            Create a Free Group →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
