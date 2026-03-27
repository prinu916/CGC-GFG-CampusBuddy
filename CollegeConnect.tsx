import { useState } from 'react';
// import DashboardLayout from '@/components/DashboardLayout'; // Removed for public access

import { Search, Globe, Linkedin, Github } from 'lucide-react';
import type { AppUser } from '@/types';

const MOCK_USERS: AppUser[] = [
  { id: '1', name: 'Arjun Sharma', email: 'arjun@college.edu', role: 'student', branch: 'CSE', skills: ['React', 'Node.js', 'Python'], createdAt: '' },
  { id: '2', name: 'Priya Patel', email: 'priya@college.edu', role: 'student', branch: 'ECE', skills: ['IoT', 'Embedded Systems', 'C++'], createdAt: '' },
  { id: '3', name: 'Rahul Verma', email: 'rahul@college.edu', role: 'student', branch: 'CSE', skills: ['ML', 'Python', 'TensorFlow'], createdAt: '' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@college.edu', role: 'student', branch: 'ME', skills: ['CAD', 'SolidWorks', '3D Printing'], createdAt: '' },
  { id: '5', name: 'Amit Kumar', email: 'amit@college.edu', role: 'student', branch: 'EEE', skills: ['Circuits', 'MATLAB', 'Power Systems'], createdAt: '' },
  { id: '6', name: 'Divya Nair', email: 'divya@college.edu', role: 'student', branch: 'CSE', skills: ['Java', 'Spring Boot', 'AWS'], createdAt: '' },
  { id: '7', name: 'Karthik Reddy', email: 'karthik@college.edu', role: 'student', branch: 'IT', skills: ['Cybersecurity', 'Linux', 'Networking'], createdAt: '' },
  { id: '8', name: 'Meera Joshi', email: 'meera@college.edu', role: 'student', branch: 'CSE', skills: ['UI/UX', 'Figma', 'React'], createdAt: '' },
];

const ALL_BRANCHES = ['All', ...new Set(MOCK_USERS.map(u => u.branch).filter(Boolean))];
const ALL_SKILLS = [...new Set(MOCK_USERS.flatMap(u => u.skills || []))];

export default function CollegeConnect() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('');

  const filtered = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || u.branch === selectedBranch;
    const matchesSkill = !selectedSkill || u.skills?.includes(selectedSkill);
    return matchesSearch && matchesBranch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-4 lg:p-8 space-y-8 max-w-7xl mx-auto">

      <div>
        <h1 className="page-header text-3xl font-display font-bold flex items-center gap-2 bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">
          <Globe className="w-8 h-8" /> College Connect
        </h1>
        <p className="text-muted-foreground text-lg mt-1">Find peers by skills and branch</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="input-glass w-full rounded-lg pl-10 pr-3 py-2.5 text-sm" placeholder="Search by name or email..." />
        </div>
        <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)}
          className="input-glass rounded-lg px-3 py-2.5 text-sm">
          {ALL_BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}
          className="input-glass rounded-lg px-3 py-2.5 text-sm">
          <option value="">All Skills</option>
          {ALL_SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* User Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(u => (
          <div key={u.id} className="glass-card-hover p-5 text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-bold"
              style={{ background: 'var(--gradient-primary)', color: 'hsl(var(--primary-foreground))' }}>
              {u.name.charAt(0)}
            </div>
            <h3 className="font-display font-semibold text-foreground">{u.name}</h3>
            <p className="text-xs text-primary font-medium mt-0.5">{u.branch}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{u.email}</p>
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {u.skills?.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found matching your filters</p>
        </div>
      )}
    </div>
  );
}
