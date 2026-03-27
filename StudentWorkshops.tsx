// import DashboardLayout from '@/components/DashboardLayout';
import { useData } from '@/context/DataContext';
import { Video } from 'lucide-react';

export default function StudentWorkshops() {
  const { workshops } = useData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-4 lg:p-8 max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="page-header text-3xl font-display font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">Workshops 🎥</h1>
        <p className="text-muted-foreground text-lg mt-1">Watch recorded workshops</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {workshops.map(w => (
          <div key={w.id} className="glass-card-hover overflow-hidden">
            <div className="aspect-video">
              <iframe src={w.youtubeLink} title={w.title} className="w-full h-full" allowFullScreen loading="lazy" />
            </div>
            <div className="p-4 flex items-center gap-3">
              <Video className="w-4 h-4 text-primary" />
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">{w.title}</h3>
                <p className="text-xs text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
