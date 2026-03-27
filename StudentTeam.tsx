// import DashboardLayout from '@/components/DashboardLayout'; // Removed for public access

import TeamMemberCard from '@/components/TeamMemberCard';
import { useData } from '@/context/DataContext';

export default function StudentTeam() {
  const { teamMembers } = useData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">

      <div>
        <h1 className="page-header text-3xl font-display font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">Our Team 👥</h1>
        <p className="text-muted-foreground text-lg mt-1">Meet the people behind the community</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teamMembers.map(m => <TeamMemberCard key={m.id} member={m} />)}
      </div>
    </div>
  );
}
