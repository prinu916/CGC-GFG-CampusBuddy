import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EventCard from '@/components/EventCard';
import AddFormModal from '@/components/AddFormModal';
import { useData } from '@/context/DataContext';
import { Plus, CalendarDays, BadgeCheck } from 'lucide-react';

export default function TeamEvents() {
  const { events, addEvent } = useData();
  const [showForm, setShowForm ] = useState(false);

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events.filter(e => new Date(e.date) <= now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <DashboardLayout allowedRoles={['team']}>
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

        {upcomingEvents.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-emerald-600" />
              Upcoming Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {upcomingEvents.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-destructive" />
              Past Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-16">
            <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first event to get started!</p>
          </div>
        )}

        {showForm && (
          <AddFormModal
            title="Add Event"
            fields={[
              { name: 'title', label: 'Title', required: true, placeholder: 'Event title' },
              { name: 'description', label: 'Description', type: 'textarea', required: true },
              { name: 'date', label: 'Date', type: 'date', required: true },
{ name: 'location', label: 'Location', required: true },
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
