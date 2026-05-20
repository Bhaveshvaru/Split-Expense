import type { Metadata } from 'next';
import { Hero } from '../components/layout/Hero';
import { HowItWorks } from '../components/layout/HowItWorks';
import { Features } from '../components/layout/Features';
import { FAQ } from '../components/layout/FAQ';
import { Footer } from '../components/layout/Footer';
import { QuickStart } from '../components/features/QuickStart';
import { Navbar } from '../components/layout/Navbar';

export const metadata: Metadata = {
  title: 'SplitEase — Split Expenses Instantly, No Signup Required',
  description: 'Free expense splitter for trips, roommates, and group outings. Split bills equally or by percentage. UPI payment links. No login required.',
  alternates: { canonical: 'https://split-expense.com' },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <main>
        <Hero />
        <QuickStart />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
