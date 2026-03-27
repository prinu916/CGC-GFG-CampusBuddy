import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    const path = user.role === 'admin' ? '/admin' : user.role === 'team' ? '/team' : '/student';
    navigate(path, { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="glass-card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-xl btn-primary-gradient flex items-center justify-center mx-auto mb-4 p-2">
            <img 
              src="/Logo of gfg & CGC.jpeg" 
              alt="GFG & CGC Logo"
              className="w-full h-full object-contain rounded-lg shadow-lg"
            />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your college community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="input-glass w-full rounded-lg pl-10 pr-3 py-2.5 text-sm"
                placeholder="You2026@gfg.cb" 
                required 
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="input-glass w-full rounded-lg pl-10 pr-3 py-2.5 text-sm"
                placeholder="University Roll no" 
                required 
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full btn-primary-gradient rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Connect to Admin's</Link>
        </p>
      </div>
    </div>
  );
}

