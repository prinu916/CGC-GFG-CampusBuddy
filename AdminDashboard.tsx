import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import AnnouncementCard from '@/components/AnnouncementCard';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Megaphone, CalendarDays, Users, Video } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { announcements, events, teamMembers, workshops } = useData();

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-8">
        <div>
          <h1 className="page-header text-foreground">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground text-sm mt-1">Admin Dashboard — Full control over the platform</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Announcements" value={announcements.length} icon={Megaphone} />
          <StatCard label="Active Events" value={events.length} icon={CalendarDays} />
          <StatCard label="Team Members" value={teamMembers.length} icon={Users} />
          <StatCard label="Workshops" value={workshops.length} icon={Video} />
        </div>

        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {announcements.slice(0, 3).map(a => (
              <AnnouncementCard key={a.id} announcement={a} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
