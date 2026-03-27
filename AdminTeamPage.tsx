import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardLayout from '@/components/DashboardLayout';
import TeamMemberCard from '@/components/TeamMemberCard';
import AddFormModal from '@/components/AddFormModal';
import { useData } from '@/context/DataContext';
import { Plus } from 'lucide-react';

export default function AdminTeam() {
  const { teamMembers, addTeamMember, deleteTeamMember } = useData();
  const [showForm, setShowForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const teamRoleOptions = {
    'Management': [
      { label: 'Leader', value: 'Leader' },
      { label: 'Team Member', value: 'Team Member' }
    ],
    'Technical': [
      { label: 'Leader', value: 'Leader' },
      { label: 'Team Member', value: 'Team Member' }
    ],
    'Social Media': [
      { label: 'Leader', value: 'Leader' },
      { label: 'Team Member', value: 'Team Member' }
    ],
    'PR': [
      { label: 'Leader', value: 'Leader' },
      { label: 'Team Member', value: 'Team Member' }
    ],
    'Designing': [
      { label: 'Leader', value: 'Leader' },
      { label: 'Team Member', value: 'Team Member' }
    ]
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  const handleSubmit = (data: any) => {
    const imageValue = data.imageFile && data.imageFile.trim() ? data.imageFile : data.image;
    const { imageFile, ...rest } = data;

    addTeamMember({
      ...rest,
      image: imageValue,
      skills: data.skills.split(',').map((s: string) => s.trim()),
    });

    setSelectedTeam('');
  };

  const getFormFields = () => {
    const baseFields = [
      { name: 'name', label: 'Name', required: true, placeholder: 'Full name' },
      { name: 'team', label: 'Team', type: 'select' as const, required: true, options: [
        { label: 'Management', value: 'Management' },
        { label: 'Technical', value: 'Technical' },
        { label: 'Social Media', value: 'Social Media' },
        { label: 'PR', value: 'PR' },
        { label: 'Designing', value: 'Designing' }
      ] },
      { name: 'skills', label: 'Skills (comma separated)', required: true, placeholder: 'React, Node.js, Python' },
      { name: 'role', label: 'Role', type: 'select' as const, required: true, options: [
        { label: 'Leader', value: 'Leader' },
        { label: 'Team Member', value: 'Team Member' }
      ] },
      { name: 'imageFile', label: 'Image Upload (works reliably)', type: 'file' as const, required: false },
      { name: 'linkedin', label: 'LinkedIn URL', type: 'url' as const, required: true, placeholder: 'https://linkedin.com/in/...' },
      { name: 'github', label: 'GitHub URL', type: 'url' as const, required: true, placeholder: 'https://github.com/...' },
    ];
    return baseFields;
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">Team Members</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your team</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary-gradient px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>

        <ScrollArea className="space-y-8 h-[70vh] overflow-y-auto">
          {/* Leaders */}
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary/30 pb-2">👑 Leaders</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {teamMembers.filter(m => m.role === 'Leader').map(m => (
                <TeamMemberCard key={m.id} member={m} canDelete onDelete={deleteTeamMember} />
              ))}
            </div>
          </section>

          {/* Teams */}
          {['Management', 'Technical', 'PR', 'Social Media', 'Designing'].map(team => {
            const teamFilter = teamMembers.filter(m => m.team === team);
            if (teamFilter.length === 0) return null;
            return (
              <section key={team}>
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary/30 pb-2 capitalize">{team}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {teamFilter.map(m => (
                    <TeamMemberCard key={m.id} member={m} canDelete onDelete={deleteTeamMember} />
                  ))}
                </div>
              </section>
            );
          })}
        </ScrollArea>

        {showForm && (
          <AddFormModal
            title="Add Team Member"
            fields={getFormFields()}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setSelectedTeam('');
            }}
            onFieldChange={(fieldName, value) => {
              if (fieldName === 'team') {
                handleTeamChange(value);
              }
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

