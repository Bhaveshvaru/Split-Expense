import type { Metadata } from 'next';
import { Navbar } from '../../components/layout/Navbar';
import { MyGroupsView } from '../../components/features/MyGroupsView';

export const metadata: Metadata = {
  title: 'My Groups — SplitEase',
  description: 'Access all your created expense groups.',
  robots: { index: false },
};

export default function GroupsPage() {
  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pt-6 pb-24">
        <MyGroupsView />
      </main>
    </div>
  );
}
