// import DashboardLayout from '@/components/DashboardLayout';
import EventCard from '@/components/EventCard';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { CalendarDays, BadgeCheck } from 'lucide-react';

export default function StudentEvents() {
  // const { user } = useAuth(); // Removed for public
  const { events, registerForEvent } = useData();

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) > now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = events.filter(e => new Date(e.date) <= now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-4 lg:p-8 max-w-7xl mx-auto space-y-8">

      <div>
        <h1 className="page-header text-3xl font-display font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">Events 🎉</h1>
        <p className="text-muted-foreground text-lg mt-1">Browse campus events</p>
      </div>
      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            Upcoming Events
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {upcomingEvents.map(e => (
              <EventCard key={e.id} event={e} userId={undefined} canRegister={false} />
            ))}
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
            {pastEvents.map(e => (
              <EventCard key={e.id} event={e} userId={undefined} canRegister={false} />
            ))}
          </div>
        </div>
      )}

      {events.length === 0 && (
        <div className="text-center py-16">
          <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Events Yet</h3>
          <p className="text-muted-foreground mb-4">Check back soon for upcoming campus events!</p>
        </div>
      )}
    </div>
  );
}
