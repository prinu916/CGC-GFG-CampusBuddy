import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

import EventCard from '@/components/EventCard';
import AddFormModal from '@/components/AddFormModal';
import { useData } from '@/context/DataContext';
import { Plus } from 'lucide-react';

export default function AdminEvents() {
  const { events, addEvent, deleteEvent } = useData();
  const [showForm, setShowForm] = useState(false);

  return (
      <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header text-foreground">Events</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage events</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary-gradient px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Event
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(e => (
            <EventCard key={e.id} event={e} canDelete onDelete={deleteEvent} />
          ))}
        </div>

        {showForm && (
          <AddFormModal
            title="Add Event"
            fields={[
              { name: 'title', label: 'Title', required: true, placeholder: 'Event title' },
              { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe the event' },
              { name: 'date', label: 'Date & Time', type: 'date', required: true },
{ name: 'location', label: 'Location', required: true, placeholder: 'Where is it?' },
{ name: 'image', label: 'Image URL/File', type: 'url', placeholder: 'Paste Drive link - auto converts!' },

            ]}
            onSubmit={data => addEvent(data as any)}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
