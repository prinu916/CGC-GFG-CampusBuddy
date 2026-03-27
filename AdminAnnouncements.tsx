import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AnnouncementCard from '@/components/AnnouncementCard';
import AddFormModal from '@/components/AddFormModal';
import { useData } from '@/context/DataContext';
import { Plus } from 'lucide-react';

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useData();
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage campus announcements</p>
          </div>
          <button 
            onClick={() => setShowForm(true)} 
            className="btn-primary-gradient px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> 
            Add Announcement
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map(a => (
            <AnnouncementCard 
              key={a.id} 
              announcement={a} 
              canDelete 
              onDelete={deleteAnnouncement}
            />
          ))}
        </div>

        {showForm && (
          <AddFormModal
            title="Add Announcement"
            fields={[
              { name: 'title', label: 'Title', required: true, placeholder: 'Announcement title' },
              { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Announcement details...' },
              { name: 'branch', label: 'Branch Visibility', placeholder: 'all / Management / Technical (exact match)', type: 'text' }
            ]}
            onSubmit={data => addAnnouncement(data as any)}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

