import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './locales/i18nContext';
import { AuthProvider } from './context/AuthContext';

// Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SupabaseBanner } from './components/common/SupabaseBanner';

// Feature Pages
import { LandingPage } from './features/landing/LandingPage';
import { LoginPage } from './features/auth/LoginPage';
import { SignupPage } from './features/auth/SignupPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { SchemesPage } from './features/schemes/SchemesPage';
import { SchemeDetailPage } from './features/schemes/SchemeDetailPage';
import { ComplaintsPage } from './features/complaints/ComplaintsPage';
import { NewComplaintPage } from './features/complaints/NewComplaintPage';
import { ComplaintDetailPage } from './features/complaints/ComplaintDetailPage';
import { ChatbotPage } from './features/chatbot/ChatbotPage';
import { EmergencyPage } from './features/emergency/EmergencyPage';
import { NotificationsPage } from './features/notifications/NotificationsPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { AdminPage } from './features/admin/AdminPage';
import { ItrReportPage } from './features/internship/ItrReportPage';
import { ProjectPptPage } from './features/internship/ProjectPptPage';

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col font-sans bg-[#0B1120] text-slate-100 selection:bg-emerald-500 selection:text-white">
            <SupabaseBanner />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/schemes" element={<SchemesPage />} />
                <Route path="/schemes/:slug" element={<SchemeDetailPage />} />
                <Route path="/complaints" element={<ComplaintsPage />} />
                <Route path="/complaints/new" element={<NewComplaintPage />} />
                <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
                <Route path="/assistant" element={<ChatbotPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/itr-report" element={<ItrReportPage />} />
                <Route path="/project-ppt" element={<ProjectPptPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}
