import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/context/ThemeContext";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";

import NotFound from "@/pages/NotFound";

import Chatbot from "@/components/Chatbot";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminTeamPage from "@/pages/admin/AdminTeamPage";
import AdminWorkshops from "@/pages/admin/AdminWorkshops";
import AdminUsers from "@/pages/admin/AdminUsers";

import TeamDashboard from "@/pages/team/TeamDashboard";
import TeamAnnouncements from "@/pages/team/TeamAnnouncements";
import TeamEvents from "@/pages/team/TeamEvents";
import TeamMembers from "@/pages/team/TeamMembers";

import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentAnnouncements from "@/pages/student/StudentAnnouncements";
import StudentEvents from "@/pages/student/StudentEvents";
import StudentTeam from "@/pages/student/StudentTeam";
import StudentWorkshops from "@/pages/student/StudentWorkshops";
import AISolver from "@/pages/student/AISolver";

import CollegeConnect from "@/pages/student/CollegeConnect";
import StudentTeamMembers from "@/pages/student/StudentTeamMembers";
import PublicTeamMembers from "@/pages/PublicTeamMembers";


const queryClient = new QueryClient();

function RootLayout() {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },


        { path: "/admin", element: <AdminDashboard /> },
        { path: "/admin/announcements", element: <AdminAnnouncements /> },
        { path: "/admin/events", element: <AdminEvents /> },
        { path: "/admin/team", element: <AdminTeamPage /> },
        { path: "/admin/workshops", element: <AdminWorkshops /> },
        { path: "/admin/users", element: <AdminUsers /> },

        { path: "/team", element: <TeamDashboard /> },
        { path: "/team/announcements", element: <TeamAnnouncements /> },
        { path: "/team/events", element: <TeamEvents /> },
        { path: "/team/members", element: <TeamMembers /> },

        { path: "/student", element: <StudentDashboard /> },
        { path: "/student/announcements", element: <StudentAnnouncements /> },
        { path: "/student/events", element: <StudentEvents /> },
        { path: "/student/team", element: <StudentTeam /> },
        { path: "/student/workshops", element: <StudentWorkshops /> },
        { path: "/student/ai", element: <AISolver /> },

        { path: "/student/connect", element: <CollegeConnect /> },
        { path: "/team-members", element: <PublicTeamMembers /> },

        { path: "/student/team-members", element: <StudentTeamMembers /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    } as any,
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
<ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
