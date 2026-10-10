import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, LanguageCode } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string, state?: string, district?: string, language?: LanguageCode) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  toggleAdminRolePreview: () => void; // Development convenience to switch citizen/admin view in preview
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CITIZEN_PROFILE: UserProfile = {
  id: 'usr-cit-101',
  display_name: 'Aarav Sharma',
  email: 'aarav.sharma@example.in',
  phone_number: '+91 98765 43210',
  preferred_language: 'en',
  state: 'Maharashtra',
  district: 'Pune',
  locality: 'Kothrud',
  role: 'citizen',
  notification_preferences: {
    email: true,
    sms: false,
    in_app: true,
    scheme_updates: true,
  },
  created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  updated_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // If not configured, provide stored demo session so reviewer can test citizen flows
    const stored = localStorage.getItem('sahayak_current_profile');
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* ignore */ }
    }
    return DEMO_CITIZEN_PROFILE;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and listen to Supabase auth state if configured
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          // If in configured mode but not logged in, profile should be null
          setProfile(null);
        }
      } catch (err) {
        console.error('Supabase auth init error', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
        localStorage.setItem('sahayak_current_profile', JSON.stringify(data));
      }
    } catch (e) {
      console.error('Failed fetching profile from Supabase', e);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      if (data.user) {
        setUser(data.user);
        await fetchProfile(data.user.id);
      }
      return { error: null };
    }

    // Offline / Demo authentication mode (for review when Supabase credentials pending)
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters' };
    }

    const isAdmin = email.toLowerCase().includes('admin');
    const demoProf: UserProfile = {
      ...DEMO_CITIZEN_PROFILE,
      id: `usr-${Date.now()}`,
      email,
      display_name: email.split('@')[0],
      role: isAdmin ? 'admin' : 'citizen',
    };
    setUser({ id: demoProf.id, email });
    setProfile(demoProf);
    localStorage.setItem('sahayak_current_profile', JSON.stringify(demoProf));
    return { error: null };
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    state = 'Delhi',
    district = 'New Delhi',
    language: LanguageCode = 'en'
  ): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            preferred_language: language,
            state,
            district,
          },
        },
      });
      if (error) return { error: error.message };
      return { error: null };
    }

    // Offline mode signup
    const newProf: UserProfile = {
      id: `usr-${Date.now()}`,
      display_name: name,
      email,
      preferred_language: language,
      state,
      district,
      locality: 'Ward 1',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'citizen',
      notification_preferences: {
        email: true,
        sms: false,
        in_app: true,
        scheme_updates: true,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUser({ id: newProf.id, email });
    setProfile(newProf);
    localStorage.setItem('sahayak_current_profile', JSON.stringify(newProf));
    return { error: null };
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('sahayak_current_profile');
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ error: string | null }> => {
    if (!profile) return { error: 'No active profile' };

    const merged: UserProfile = {
      ...profile,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase && user?.id) {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) return { error: error.message };
    }

    setProfile(merged);
    localStorage.setItem('sahayak_current_profile', JSON.stringify(merged));
    return { error: null };
  };

  const toggleAdminRolePreview = () => {
    if (!profile) return;
    const nextRole: UserRole = profile.role === 'admin' ? 'citizen' : 'admin';
    const updated = { ...profile, role: nextRole };
    setProfile(updated);
    localStorage.setItem('sahayak_current_profile', JSON.stringify(updated));
  };

  const value: AuthContextType = {
    user,
    profile,
    isAdmin: profile?.role === 'admin',
    isLoading,
    isConfigured: isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    updateProfile,
    toggleAdminRolePreview,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
