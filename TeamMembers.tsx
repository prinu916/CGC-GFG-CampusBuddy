import DashboardLayout from '@/components/DashboardLayout';
import TeamMemberCard from '@/components/TeamMemberCard';
import { useData } from '@/context/DataContext';

export default function TeamMembers() {
  const { teamMembers } = useData();

  const teams = ['Management', 'Technical', 'Social Media', 'PR', 'Designing'];

  const groupedMembers = teams.reduce((acc, team) => {
    acc[team] = teamMembers.filter(m => m.team === team);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  return (
    <DashboardLayout allowedRoles={['team']}>
      <div className="space-y-8">
        <div>
          <h1 className="page-header text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-1">Our amazing team</p>
        </div>

        {teams.map(team => (
          <div key={team} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">{team} Team</h2>
            {groupedMembers[team].length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedMembers[team].map(m => <TeamMemberCard key={m.id} member={m} />)}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No members in this team yet.</p>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
