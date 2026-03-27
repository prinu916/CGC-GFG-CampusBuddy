import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Link } from 'react-router-dom';
import { Megaphone, CalendarDays, Video, Bot, GraduationCap, Users, Users2 } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { announcements, events, workshops } = useData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:bg-gradient-to-br p-6 lg:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-500 bg-clip-text text-transparent mb-3">
              Student Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-400 max-w-md">
              {user ? `Welcome back, ${user.name}!` : 'Welcome to CGC-GFG Community'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">{announcements.length}</h3>
            <p className="text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Announcements
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">{events.length}</h3>
            <p className="text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Events
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">{workshops.length}</h3>
            <p className="text-gray-600 dark:text-slate-400 flex items-center gap-2">
              <Video className="w-5 h-5" />
              Workshops
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Announcements */}
          <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-3">
              <Megaphone className="w-7 h-7 bg-blue-100 dark:bg-blue-900/50 p-2 rounded-2xl" />
              Latest Announcements
            </h2>
            <div className="space-y-4">
              {announcements.slice(0, 4).map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-slate-100">{announcement.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">{announcement.description}</p>
                  <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">
                    {announcement.authorName} • {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-slate-500">
                  <Megaphone className="mx-auto w-16 h-16 text-gray-300 dark:text-slate-600 mb-4" />
                  <p>No announcements yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <CalendarDays className="w-7 h-7 bg-green-100 dark:bg-green-900/50 p-2 rounded-2xl" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="group hover:bg-gray-50 dark:hover:bg-slate-700/50 p-4 rounded-2xl transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{event.date}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                <Video className="w-7 h-7 bg-purple-100 dark:bg-purple-900/50 p-2 rounded-2xl" />
                Workshops
              </h2>
              <div className="space-y-4">
                {workshops.slice(0, 3).map((workshop) => (
                  <div key={workshop.id} className="flex gap-3">
                    <div className="w-16 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-slate-100 text-sm">{workshop.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-slate-400">{new Date(workshop.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl border border-white/50 dark:shadow-2xl dark:shadow-black/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-8">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/student/ai" className="group p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-all text-center">
                <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">AI Solver</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Ask doubts</p>
              </Link>

<Link to="/team-members" className="group p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-all text-center">
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">GFG Team Members</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Meet our team</p>
              </Link>
              <Link to="/student/connect" className="group p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800/50 transition-all text-center">
                <Users2 className="w-12 h-12 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">Connect</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Find peers</p>
              </Link>
              <Link to="/student/announcements" className="group p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-slate-800/50 transition-all text-center">
                <Megaphone className="w-12 h-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">News</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">All updates</p>
              </Link>
              <Link to="/student/events" className="group p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-slate-800/50 transition-all text-center">
                <CalendarDays className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">Events</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">Register now</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

