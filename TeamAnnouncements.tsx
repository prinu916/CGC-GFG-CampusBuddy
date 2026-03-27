import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AnnouncementCard from '@/components/AnnouncementCard';
import AddFormModal from '@/components/AddFormModal';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Plus } from 'lucide-react';

export default function TeamAnnouncements() {
  const { user } = useAuth();
  const { announcements, addAnnouncement } = useData();
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout allowedRoles={['team']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground mt-1">Post announcements for the community</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary-gradient px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {announcements.map(a => <AnnouncementCard key={a.id} announcement={a} />)}
        </div>
        {showForm && (
          <AddFormModal
            title="Add Announcement"
            fields={[
              { name: 'title', label: 'Title', required: true, placeholder: 'Announcement title' },
              { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Write...' },
            ]}
            onSubmit={data => addAnnouncement({ ...data, authorId: user!.id, authorName: user!.name } as any)}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
