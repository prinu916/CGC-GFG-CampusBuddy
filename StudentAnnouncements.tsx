// Student Announcements - Public view with branch filtering

import AnnouncementCard from '@/components/AnnouncementCard';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Calendar, Filter } from 'lucide-react';

export default function StudentAnnouncements() {
  const { user } = useAuth();
  const { announcements } = useData();

  const filteredAnnouncements = announcements.filter((a) => {
    if (!a.branch || a.branch === 'all') return true;
    return a.branch === user?.branch;
  });

  const currentBranch = user?.branch || 'Public';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header text-3xl font-display font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">
            Announcements 📢
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Latest campus updates for {currentBranch} students
          </p>
        </div>
        {user && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            <Filter className="w-4 h-4" />
            Filtered for: <span className="font-medium text-foreground">{currentBranch}</span>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Announcements</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Stay tuned for campus updates. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

