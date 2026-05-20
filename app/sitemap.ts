import { MetadataRoute } from 'next';
import { blogPosts } from '../lib/blog';

const BASE = 'https://split-expense.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const toolPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/split-expenses-online`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/expense-splitter`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/trip-expense-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/roommate-expense-splitter`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/wedding-expense-splitter`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...toolPages, ...blogIndex, ...blogPostPages];
}
