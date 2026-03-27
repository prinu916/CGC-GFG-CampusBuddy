import TeamMemberCard from '@/components/TeamMemberCard';
import { useData } from '@/context/DataContext';

export default function PublicTeamMembers() {
  const { teamMembers } = useData();

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 page-header">GFG Team Members 👥</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">Meet the amazing people powering CGC-GFG Community</p>
      </div>
      <div className="space-y-12">
        {/* Leaders */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-3">👑 Leaders</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.filter(m => m.role === 'Leader').map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>

        {/* Teams */}
        {['Management', 'Technical', 'PR', 'Social Media', 'Designing'].map(team => {
          const teamMembersFilter = teamMembers.filter(m => m.team === team);
          if (teamMembersFilter.length === 0) return null;
          return (
            <section key={team}>
              <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-3 capitalize">{team}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teamMembersFilter.map((m) => (
                  <TeamMemberCard key={m.id} member={m} />
                ))}
              </div>
            </section>
          );
        })}

        {teamMembers.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            <p className="text-2xl font-semibold mb-4">Team coming soon!</p>
            <p>Stay tuned for our amazing team members</p>
          </div>
        )}
      </div>
    </div>
  );
}

