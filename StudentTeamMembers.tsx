import DashboardLayout from '@/components/DashboardLayout';
import TeamMemberCard from '@/components/TeamMemberCard';
import { useData } from '@/context/DataContext';
import { Users2 } from 'lucide-react';

export default function StudentTeamMembers() {
  const { teamMembers } = useData();

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-6 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">GFG Team Members</h1>
            <p className="text-sm text-muted-foreground mt-1">Meet our amazing team</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
          {teamMembers.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Users2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No team members yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

