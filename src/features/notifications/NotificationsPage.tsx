import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalNotifications } from '../../lib/supabase';
import { NotificationItem } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  Bell, 
  CheckCheck, 
  FileText, 
  Landmark, 
  Info, 
  ChevronRight, 
  Clock, 
  Inbox
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(getLocalNotifications());
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('sahayak_notifications', JSON.stringify(updated));
  };

  const handleToggleRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: !n.read } : n);
    setNotifications(updated);
    localStorage.setItem('sahayak_notifications', JSON.stringify(updated));
  };

  const filtered = notifications.filter(n => filter === 'all' || !n.read);

  const getIcon = (type: string) => {
    switch (type) {
      case 'complaint_update':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'scheme_alert':
        return <Landmark className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header with IndiaFlag */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl flex items-center justify-between gap-4 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">Notifications & Alerts</h1>
                <IndiaFlag width={15} height={10} className="rounded-2xs" />
              </div>
              <p className="text-xs text-slate-400">
                You have {unreadCount} unread civic alerts
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'all'
                ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>All Alerts ({notifications.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-emerald-950/80 text-emerald-300 shadow-xs border border-emerald-500/40'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Unread ({unreadCount})</span>
          </button>
        </div>

        {/* Notification items */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 text-center text-xs text-slate-400 space-y-2">
              <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
              <p>No notifications to display.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition flex items-start gap-3.5 backdrop-blur-xs ${
                  item.read
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/40 shadow-lg'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs ${item.read ? 'font-semibold text-slate-300' : 'font-extrabold text-white'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.message}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {item.metadata?.complaintId ? (
                      <Link
                        to={`/complaints/${item.metadata.complaintId}`}
                        className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>View Complaint</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : item.metadata?.schemeSlug ? (
                      <Link
                        to={`/schemes/${item.metadata.schemeSlug}`}
                        className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>View Scheme</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : <span></span>}

                    <button
                      type="button"
                      onClick={() => handleToggleRead(item.id)}
                      className="text-[11px] text-slate-500 hover:text-slate-300 underline cursor-pointer transition-colors"
                    >
                      {item.read ? 'Mark as unread' : 'Mark as read'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
