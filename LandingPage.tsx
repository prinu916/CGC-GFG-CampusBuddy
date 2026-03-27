import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Users, CalendarDays, Megaphone, Bot, ArrowRight, Sparkles } from 'lucide-react';

const heroImage = '/team-community.jpg';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goToDashboard = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : user.role === 'team' ? '/team' : '/student');
    } else {
      navigate('/login');
    }
  };

  const features = [
    { icon: Megaphone, title: 'Announcements', desc: 'Stay updated with campus news and important notices in real-time.' },
    { icon: CalendarDays, title: 'Events', desc: 'Discover, register, and never miss exciting campus events.' },
    { icon: Users, title: 'College Connect', desc: 'Find peers by skills and branches. Build your network.' },
    { icon: Bot, title: 'AI Doubt Solver', desc: 'Get instant answers to your academic doubts powered by AI.' },
  ];

  return (
    <div className="min-h-screen bg-background relative z-10">
      <div className="bg-3d-particles fixed inset-0 hidden md:block pointer-events-none z-0">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="bg-3d-particle"
            style={{
              left: `${i * 4}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${20 + i % 10}s`
            }}
          />
        ))}
      </div>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-border/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/Logo of gfg & CGC.jpeg" alt="CGC GFG Logo" className="w-8 h-8 rounded-lg object-contain tilt-3d" />
            <span className="font-display font-bold text-foreground">CGC-GFG COMMUNITY</span>
          </div>
         
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </button>
            <button onClick={() => navigate('/student')} className="btn-primary-gradient tilt-3d px-4 py-2 rounded-lg text-sm">
              Explore Student Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        </div>
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card tilt-3d px-4 py-2 mb-6 text-sm text-primary cube-float animate-float">
            <Sparkles className="w-4 h-4 animate-pulse-glow" />
            <span>Your Campus, Connected</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            <span className="text-foreground">Where CGC Innovators Connect</span>
            <br />
            <span className="gradient-text">Collaborate & Create</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Announcements, events, team collaboration, workshops, and AI-powered learning — 
            all in one beautiful, modern platform built for your college community.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={goToDashboard} className="btn-primary-gradient tilt-3d px-8 py-3.5 rounded-xl text-base font-semibold flex items-center gap-2 glow-primary animate-pulse-glow">
              Enter Platform <ArrowRight className="w-5 h-5" />
            </button>

            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="glass-card tilt-3d px-8 py-3.5 rounded-xl text-base font-semibold border hover:border-primary/50 transition-all bg-background/50">
              About
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-4 text-foreground gradient-text animate-float">Everything You Need</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Powerful features designed for modern campus life</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass-card-hover tilt-3d p-6 hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 cube-float animate-pulse-glow">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-background/50 to-background/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 gradient-text tilt-3d animate-float">About CGC-GFG Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A dynamic student-led initiative at Chandigarh Group of Colleges (CGC) in collaboration with GeeksforGeeks. 
              We bridge academia and industry through workshops, hackathons, tech talks, and peer learning. 
              Our platform connects 1000+ students across CSE, ECE, ME, and MBA with real-world projects, 
              internship opportunities, and a vibrant community of innovators.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Stats */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass-card p-8 text-center">
                  <div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">1000+</div>
                  <div className="text-muted-foreground font-semibold">Active Students</div>
                </div>
                <div className="glass-card p-8 text-center">
<div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">20+</div>
                  <div className="text-muted-foreground font-semibold">Events Hosted</div>
                </div>
                <div className="glass-card p-8 text-center">
<div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">7+</div>
                  <div className="text-muted-foreground font-semibold">Teams</div>
                </div>
                <div className="glass-card p-8 text-center">
                  <div className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-2">24/7</div>
                  <div className="text-muted-foreground font-semibold">AI Support</div>
                </div>
              </div>
            </div>
            
            {/* About Content */}
            <div className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empower CGC students with cutting-edge technical skills, foster innovation through 
                  collaborative projects, and prepare them for thriving tech careers.
                </p>
              </div>
              <div className="glass-card p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time campus announcements & event registration</li>
                  <li>• AI-powered doubt solving for academics</li>
                  <li>• Peer networking by skills & branches</li>
                  <li>• Workshop schedules & team collaborations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM - Single Community Picture */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 gradient-text tilt-3d animate-float">
              OUR TEAM
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CGC-GFG Community is a vibrant hub of passionate developers and innovators.
              We foster learning, collaboration, and real-world problem solving.
              From workshops to hackathons, we empower students to grow.
              Together, we build skills, confidence, and impactful projects.
              Shaping the future—one line of code at a time.
            </p>
          </div>
          <div className="glass-card-hover tilt-3d relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-700 max-w-4xl mx-auto mx-auto rounded-3xl">
            <img 
              src="/team-community.jpg" 
              alt="Our Campus Community" 
              className="w-full h-[500px] lg:h-[600px] object-cover rounded-3xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50/0.8 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-12">
              <div className="drop-shadow-2xl">
                <h3 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-primary-foreground drop-shadow-lg">Campus Connect Community</h3>
                <p className="text-lg lg:text-xl max-w-md leading-relaxed mb-8 text-primary-foreground/95 drop-shadow-md">
                  "A dynamic community of innovators, creators, and campus leaders united by one vision - transforming campus life through technology and collaboration. From announcements to events, AI solvers to networking, we're building the future together."
                </p>
                <div className="flex gap-4">
                  <button onClick={() => window.open('https://chat.whatsapp.com/Ksx1MEOtnpD4dCOYNfECnE', '_blank')} className="btn-primary-gradient px-8 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 glow-primary hover:scale-105">
                    Join Our Team!!<Users className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM LEADERS Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 gradient-text tilt-3d animate-float">
              TEAM LEADERS
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Visionary leaders driving the CGC-GFG Community forward. Passionate about technology,
              innovation, and student empowerment. Leading workshops, hackathons, and campus events.
            </p>
          </div>
          <div className="glass-card-hover tilt-3d relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-700 max-w-4xl mx-auto rounded-3xl">
            <img 
              src="/leaders.jpg" 
              alt="Team Leaders" 
              className="w-full h-[500px] lg:h-[600px] object-cover rounded-3xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/90 via-green-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-12">
              <div className="drop-shadow-2xl">
                <h3 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-white drop-shadow-lg">Leadership Excellence</h3>
                <p className="text-lg lg:text-xl max-w-md leading-relaxed mb-8 text-white/95 drop-shadow-md">
                  "Guiding CGC-GFG with vision and passion. Building tomorrow's tech leaders through hands-on projects, industry connections, and relentless innovation."
                </p>
                {/* No join button as requested */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary cube-float" />
            <span className="text-sm text-muted-foreground">CGC-GFG-CAMPUS-BODY Community</span>
          </div>
          <span className="text-xs text-muted-foreground">© 2026</span>
        </div>
      </footer>
    </div>
  );
}
