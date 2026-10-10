import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IndiaFlag } from './IndiaFlag';
import { Database, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export const SupabaseBanner: React.FC = () => {
  const { isConfigured, isAdmin, toggleAdminRolePreview, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const envSnippet = `# .env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="Supabase System Status" className={`border-b text-xs transition-colors ${
      isConfigured
        ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
        : 'bg-slate-900 text-slate-200 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IndiaFlag width={14} height={9} className="rounded-2xs shrink-0" />
            {isConfigured ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Supabase Connected (Live PostgreSQL + RLS + Auth)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Backend Mode: <strong>Local & Verified Preview</strong> (Supabase credentials not configured in .env)</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {profile && (
              <button
                type="button"
                onClick={toggleAdminRolePreview}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition cursor-pointer"
                title="Toggle between regular Citizen view and Administrative oversight console"
              >
                <span>Viewing as:</span>
                <span className={`px-1.5 py-0.2 rounded font-bold uppercase text-[10px] ${
                  isAdmin ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {profile.role}
                </span>
                <span className="text-[10px] text-slate-400 underline">(switch)</span>
              </button>
            )}

            {!isConfigured && (
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline cursor-pointer"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Setup Guide</span>
                {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {isOpen && !isConfigured && (
          <div className="mt-3 pt-3 border-t border-slate-800 text-slate-300 space-y-2">
            <p>
              To connect your real Supabase project:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline">supabase.com</a></li>
              <li>Execute the SQL migration files in the SQL Editor: <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">supabase/migrations/001_initial_schema.sql</code> and <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">002_seed_data.sql</code></li>
              <li>Configure your environment variables in <code className="bg-slate-800 px-1 py-0.5 rounded text-white">.env</code>:</li>
            </ol>
            <div className="relative mt-2 p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-400">
              <pre>{envSnippet}</pre>
              <button
                type="button"
                onClick={copyEnv}
                className="absolute top-2 right-2 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Copy snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
