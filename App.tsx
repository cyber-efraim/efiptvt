
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  MessageSquare, 
  Settings, 
  Key, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  User,
  ShieldCheck,
  Bell,
  ExternalLink,
  Globe
} from 'lucide-react';
import { UserProfile } from './types';
import { SupabaseService } from './services/supabaseService';

// Views
import Dashboard from './views/Dashboard';
import CRM from './views/CRM';
import Finance from './views/Finance';
import Chat from './views/Chat';
import AdminKeys from './views/AdminKeys';
import AdminUsers from './views/AdminUsers';
import Profile from './views/Profile';
import Login from './views/Login';
import Register from './views/Register';

const Sidebar = ({ user, onClose }: { user: UserProfile; onClose?: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Clientes', path: '/clients', icon: Users },
    { label: 'Financeiro', path: '/finance', icon: Wallet },
    { label: 'Comunidade', path: '/chat', icon: MessageSquare },
  ];

  const adminItems = [
    { label: 'Chaves de Acesso', path: '/admin/keys', icon: Key },
    { label: 'Gerenciar Usuários', path: '/admin/users', icon: ShieldCheck },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 border-r border-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">EF <span className="text-indigo-500">IPTV</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 px-3">Principal</div>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
              isActive(item.path) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        {user.role === 'ADMIN' && (
          <>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 mt-8 px-3">Administração</div>
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  isActive(item.path) 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </>
        )}

        <div className="pt-8">
          <a 
            href="https://painel.cloudnation.top/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 text-emerald-400 hover:scale-[1.02] transition-all group shadow-lg shadow-emerald-500/5"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <span className="font-bold text-sm">Painel IPTV</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
          </a>
        </div>
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          to="/profile"
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
            isActive('/profile') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 text-zinc-500 group-hover:text-white" />
          <span className="font-medium text-sm">Meu Perfil</span>
        </Link>
        <button
          onClick={() => {
            SupabaseService.logout();
            window.location.reload();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
};

const Layout = ({ user }: { user: UserProfile }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-inter">
      <aside className="hidden lg:block w-72">
        <Sidebar user={user} />
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 animate-in slide-in-from-left duration-300">
            <Sidebar user={user} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
          <button 
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 lg:flex-none">
            <h2 className="text-sm font-medium text-zinc-400 hidden lg:block">Bem-vindo, {user.fullName}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-white relative bg-white/5 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-zinc-950"></span>
            </button>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">{user.fullName}</p>
                <p className="text-[10px] text-indigo-400 uppercase tracking-tighter">{user.role}</p>
              </div>
              <img 
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.fullName}&background=4f46e5&color=fff`} 
                className="w-10 h-10 rounded-2xl border-2 border-white/5 shadow-xl"
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SupabaseService.getSession().then(session => {
      setUser(session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-zinc-500 animate-pulse font-medium">Sincronizando com nuvem...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
            <Route path="/register" element={<Register onRegister={(u) => setUser(u)} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Dashboard user={user} />} />
            <Route path="clients" element={<CRM user={user} />} />
            <Route path="finance" element={<Finance user={user} />} />
            <Route path="chat" element={<Chat user={user} />} />
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
            {user.role === 'ADMIN' && (
              <>
                <Route path="admin/keys" element={<AdminKeys user={user} />} />
                <Route path="admin/users" element={<AdminUsers user={user} />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
