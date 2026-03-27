import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

import AddFormModal from '@/components/AddFormModal';
import { useData } from '@/context/DataContext';
import { Plus, Trash2, Video } from 'lucide-react';

export default function AdminWorkshops() {
  const { workshops, addWorkshop, deleteWorkshop } = useData();
  const [showForm, setShowForm] = useState(false);

  return (
      <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">Workshops</h1>
            <p className="text-sm text-muted-foreground mt-1">Upload workshop recordings</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary-gradient px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Workshop
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {workshops.map(w => (
            <div key={w.id} className="glass-card-hover overflow-hidden">
              <div className="aspect-video bg-secondary relative">
                <iframe src={w.youtubeLink} title={w.title} className="w-full h-full" allowFullScreen loading="lazy" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-foreground">{w.title}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={() => deleteWorkshop(w.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <AddFormModal
            title="Add Workshop"
            fields={[
              { name: 'title', label: 'Title', required: true, placeholder: 'Workshop title' },
              { name: 'youtubeLink', label: 'YouTube Embed URL', type: 'url', required: true, placeholder: 'https://www.youtube.com/embed/...' },
            ]}
            onSubmit={data => addWorkshop(data as any)}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
