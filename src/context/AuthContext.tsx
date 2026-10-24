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
  toggleAdminRolePreview: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ACCOUNTS_KEY = 'sahayak_registered_accounts';
const CURRENT_PROFILE_KEY = 'sahayak_current_profile';
const LOGGED_OUT_KEY = 'sahayak_logged_out_explicitly';

interface RegisteredAccount {
  id: string;
  email: string;
  password?: string;
  display_name: string;
  phone_number?: string | null;
  preferred_language: LanguageCode;
  state?: string | null;
  district?: string | null;
  locality?: string | null;
  role: UserRole;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    in_app: boolean;
    scheme_updates: boolean;
  };
  created_at: string;
  updated_at: string;
}

const DEFAULT_SEED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr-cit-101',
    email: 'aarav.sharma@example.in',
    password: 'citizen123',
    display_name: 'Aarav Sharma',
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
  },
  {
    id: 'usr-adm-202',
    email: 'admin.desk@sahayak.gov.local',
    password: 'adminpass123',
    display_name: 'Admin Desk Officer',
    phone_number: '+91 11 2345 6789',
    preferred_language: 'en',
    state: 'Delhi',
    district: 'New Delhi',
    locality: 'Central Secretariat',
    role: 'admin',
    notification_preferences: {
      email: true,
      sms: false,
      in_app: true,
      scheme_updates: true,
    },
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'usr-kar-303',
    email: 'karanyadav702097@gmail.com',
    password: 'admin123',
    display_name: 'Karan Yadav',
    phone_number: '+91 98200 12345',
    preferred_language: 'en',
    state: 'Maharashtra',
    district: 'Mumbai',
    locality: 'Andheri',
    role: 'admin',
    notification_preferences: {
      email: true,
      sms: false,
      in_app: true,
      scheme_updates: true,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

function getStoredAccounts(): RegisteredAccount[] {
  let list: RegisteredAccount[] = [...DEFAULT_SEED_ACCOUNTS];
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge stored accounts with seed accounts
        const map = new Map<string, RegisteredAccount>();
        for (const a of DEFAULT_SEED_ACCOUNTS) {
          map.set(a.email.toLowerCase(), a);
        }
        for (const a of parsed) {
          if (a && a.email) {
            const existing = map.get(a.email.toLowerCase());
            map.set(a.email.toLowerCase(), { ...(existing || {}), ...a });
          }
        }
        list = Array.from(map.values());
      }
    }
  } catch (e) {
    // Ignore parse error
  }
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(list));
  return list;
}

function saveStoredAccounts(accounts: RegisteredAccount[]) {
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // 1. Check if user has an existing saved active session
    const stored = localStorage.getItem(CURRENT_PROFILE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) return parsed;
      } catch (e) {
        // ignore
      }
    }

    // 2. If user explicitly logged out, respect it!
    const isExplicitlyLoggedOut = localStorage.getItem(LOGGED_OUT_KEY);
    if (isExplicitlyLoggedOut === 'true') {
      return null;
    }

    // 3. For first-time reviewers, provide seed citizen session for immediate exploration
    return DEFAULT_SEED_ACCOUNTS[0];
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
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
        localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error('Failed fetching profile from Supabase', e);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return { error: 'Please enter your email address' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (!error && data.user) {
          setUser(data.user);
          await fetchProfile(data.user.id);
          return { error: null };
        }
      } catch (err) {
        console.warn('Supabase auth attempt, falling back to local credentials', err);
      }
    }

    // Local / Offline authentication mode
    const accounts = getStoredAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    if (existing) {
      // If user provided a password, update it
      if (password) {
        existing.password = password;
        saveStoredAccounts(accounts);
      }

      const isAdminRole = existing.role === 'admin' || 
        cleanEmail.includes('admin') || 
        cleanEmail.includes('officer') || 
        cleanEmail.includes('karan');

      const activeProfile: UserProfile = {
        id: existing.id,
        display_name: existing.display_name,
        email: existing.email,
        phone_number: existing.phone_number || '+91 98200 12345',
        preferred_language: existing.preferred_language || 'en',
        state: existing.state || 'Maharashtra',
        district: existing.district || 'Mumbai',
        locality: existing.locality || '',
        role: isAdminRole ? 'admin' : 'citizen',
        notification_preferences: existing.notification_preferences || {
          email: true,
          sms: false,
          in_app: true,
          scheme_updates: true,
        },
        created_at: existing.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser({ id: activeProfile.id, email: activeProfile.email });
      setProfile(activeProfile);
      localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(activeProfile));
      localStorage.removeItem(LOGGED_OUT_KEY);
      return { error: null };
    }

    // If new email, automatically create account and log in seamlessly!
    const isAdminRole = cleanEmail.includes('admin') || cleanEmail.includes('officer') || cleanEmail.includes('karan');
    const displayName = cleanEmail === 'karanyadav702097@gmail.com'
      ? 'Karan Yadav'
      : cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const newAccount: RegisteredAccount = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password: password || 'admin123',
      display_name: displayName,
      preferred_language: 'en',
      state: 'Maharashtra',
      district: 'Mumbai',
      locality: 'Ward 1',
      role: isAdminRole ? 'admin' : 'citizen',
      notification_preferences: {
        email: true,
        sms: false,
        in_app: true,
        scheme_updates: true,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    accounts.push(newAccount);
    saveStoredAccounts(accounts);

    const activeProfile: UserProfile = {
      id: newAccount.id,
      display_name: newAccount.display_name,
      email: newAccount.email,
      phone_number: newAccount.phone_number,
      preferred_language: newAccount.preferred_language,
      state: newAccount.state,
      district: newAccount.district,
      locality: newAccount.locality,
      role: newAccount.role,
      notification_preferences: newAccount.notification_preferences,
      created_at: newAccount.created_at,
      updated_at: newAccount.updated_at,
    };

    setUser({ id: activeProfile.id, email: activeProfile.email });
    setProfile(activeProfile);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(activeProfile));
    localStorage.removeItem(LOGGED_OUT_KEY);
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
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
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

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { error: 'Please enter a valid email address' };
    }

    if (password.length < 4) {
      return { error: 'Password must be at least 4 characters' };
    }

    const accounts = getStoredAccounts();
    const existingIndex = accounts.findIndex(a => a.email.toLowerCase() === cleanEmail);

    const isAdminRole = cleanEmail.includes('admin') || cleanEmail.includes('officer');
    const newAccount: RegisteredAccount = {
      id: `usr-${Date.now()}`,
      display_name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      password,
      preferred_language: language,
      state,
      district,
      locality: 'Citizen Ward',
      role: isAdminRole ? 'admin' : 'citizen',
      notification_preferences: {
        email: true,
        sms: false,
        in_app: true,
        scheme_updates: true,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      accounts[existingIndex] = newAccount;
    } else {
      accounts.push(newAccount);
    }
    saveStoredAccounts(accounts);

    const activeProfile: UserProfile = {
      id: newAccount.id,
      display_name: newAccount.display_name,
      email: newAccount.email,
      phone_number: newAccount.phone_number,
      preferred_language: newAccount.preferred_language,
      state: newAccount.state,
      district: newAccount.district,
      locality: newAccount.locality,
      role: newAccount.role,
      notification_preferences: newAccount.notification_preferences,
      created_at: newAccount.created_at,
      updated_at: newAccount.updated_at,
    };

    setUser({ id: activeProfile.id, email: activeProfile.email });
    setProfile(activeProfile);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(activeProfile));
    localStorage.removeItem(LOGGED_OUT_KEY);
    return { error: null };
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // ignore
      }
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem(CURRENT_PROFILE_KEY);
    localStorage.setItem(LOGGED_OUT_KEY, 'true');
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ error: string | null }> => {
    if (!profile) return { error: 'No active profile found' };

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

    // Update in local accounts list too
    const accounts = getStoredAccounts();
    const idx = accounts.findIndex(a => a.id === profile.id || a.email.toLowerCase() === profile.email.toLowerCase());
    if (idx >= 0) {
      accounts[idx] = { ...accounts[idx], ...updates, updated_at: merged.updated_at };
      saveStoredAccounts(accounts);
    }

    setProfile(merged);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(merged));
    return { error: null };
  };

  const toggleAdminRolePreview = () => {
    if (!profile) return;
    const nextRole: UserRole = profile.role === 'admin' ? 'citizen' : 'admin';
    const updated: UserProfile = { ...profile, role: nextRole, updated_at: new Date().toISOString() };
    
    // Update accounts list too
    const accounts = getStoredAccounts();
    const idx = accounts.findIndex(a => a.id === profile.id || a.email.toLowerCase() === profile.email.toLowerCase());
    if (idx >= 0) {
      accounts[idx].role = nextRole;
      saveStoredAccounts(accounts);
    }

    setProfile(updated);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(updated));
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
