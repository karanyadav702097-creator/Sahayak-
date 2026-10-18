import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../locales/i18nContext';
import { BrandLogo } from './BrandLogo';
import { 
  Landmark, 
  FileText, 
  Siren, 
  Bot, 
  LayoutDashboard, 
  ShieldCheck, 
  Bell, 
  Languages, 
  Menu, 
  X, 
  UserRound, 
  LogOut,
  ChevronDown,
  FileCheck,
  Presentation
} from 'lucide-react';
import { getLocalNotifications } from '../../lib/supabase';

export const Header: React.FC = () => {
  const { profile, isAdmin, signOut } = useAuth();
  const { language, setLanguage, t, languages } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = getLocalNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: t.nav.schemes, path: '/schemes', icon: Landmark },
    { name: t.nav.complaints, path: '/complaints', icon: FileText },
    { name: t.nav.emergency, path: '/emergency', icon: Siren, urgent: true },
    { name: t.nav.assistant, path: '/assistant', icon: Bot },
    { name: 'ITR Report', path: '/itr-report', icon: FileCheck },
    { name: 'Project PPT', path: '/project-ppt', icon: Presentation },
    ...(profile ? [{ name: t.nav.dashboard, path: '/dashboard', icon: LayoutDashboard }] : []),
    ...(isAdmin ? [{ name: t.nav.admin, path: '/admin', icon: ShieldCheck, admin: true }] : []),
  ];

  const handleLogout = async () => {
    await signOut();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo with Integrated Indian National Flag Emblem */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="SAHAYAK AI Home">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="md" />
              
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                  SAHAYAK<span className="text-emerald-400 ml-0.5">AI</span>
                </span>
                
                <span className="text-[10px] text-slate-400 font-medium tracking-tight mt-1 hidden sm:flex items-center gap-1">
                  <span>National Citizen Super App</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">Bharat</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links with Lucide Icons */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    link.urgent
                      ? active 
                        ? 'bg-rose-950/70 text-rose-300 font-bold ring-1 ring-rose-500/50 shadow-sm'
                        : 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
                      : link.admin
                      ? active
                        ? 'bg-amber-950/70 text-amber-300 font-bold ring-1 ring-amber-500/50 shadow-sm'
                        : 'text-amber-400 hover:bg-amber-950/40'
                      : active
                      ? 'bg-slate-800 text-white font-bold shadow-xs border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${link.urgent ? 'text-rose-400' : link.admin ? 'text-amber-400' : active ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector Dropdown with 'Languages' Lucide icon */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition cursor-pointer"
                aria-label="Select Regional Language"
                title="Select Regional Language"
              >
                <Languages className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">{languages.find(l => l.code === language)?.nativeName || 'Language'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-slate-900 rounded-xl shadow-2xl border border-slate-750 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Indian Languages</span>
                    </span>
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                        language === l.code
                          ? 'bg-emerald-950/60 text-emerald-300 font-bold border-l-2 border-emerald-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="font-medium">{l.nativeName}</span>
                      <span className="text-[11px] text-slate-400">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800/80 transition"
              aria-label="View notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
              )}
            </Link>

            {/* User Profile with UserRound icon */}
            {profile ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition text-left cursor-pointer border border-slate-800/80"
                  aria-label="User Account Menu"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <UserRound className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold text-slate-200 leading-tight">
                      {profile.display_name}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {profile.district || profile.state || 'Citizen'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-slate-900 rounded-xl shadow-2xl border border-slate-750 py-1.5 z-50"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{profile.display_name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-emerald-400 border border-slate-700">
                        Role: {profile.role}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>{t.nav.dashboard}</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white font-medium"
                    >
                      <UserRound className="w-4 h-4 text-slate-400" />
                      <span>{t.nav.profile}</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-amber-300 bg-amber-950/30 hover:bg-amber-950/50 font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>{t.nav.admin}</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition"
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
                >
                  {t.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  link.urgent
                    ? active ? 'bg-rose-950/70 text-rose-300' : 'bg-rose-950/30 text-rose-400'
                    : link.admin
                    ? active ? 'bg-amber-950/70 text-amber-300' : 'bg-amber-950/30 text-amber-400'
                    : active
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${link.urgent ? 'text-rose-400' : link.admin ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {profile ? (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-800 font-medium"
              >
                <UserRound className="w-5 h-5 text-slate-400" />
                <span>{t.nav.profile}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-950/40 font-semibold cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-rose-400" />
                <span>{t.nav.logout}</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:text-white"
              >
                {t.nav.login}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold"
              >
                {t.nav.signup}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
