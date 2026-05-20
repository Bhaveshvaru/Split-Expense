import type { Metadata } from 'next';
import { GroupView } from '../../../components/features/GroupView';
import { Navbar } from '../../../components/layout/Navbar';

interface Props {
  params: { groupId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Group — SplitEase`,
    description: 'View and manage group expenses. See who owes whom and settle up with UPI.',
    robots: { index: false },
  };
}

export default function GroupPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-24">
        <GroupView groupId={params.groupId} />
      </main>
    </div>
  );
}
