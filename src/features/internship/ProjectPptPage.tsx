import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer, 
  Download, 
  FileText, 
  Play, 
  Pause, 
  Layers, 
  Laptop, 
  ShieldAlert, 
  Landmark, 
  Database, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: 'intro' | 'project1' | 'project2' | 'project3' | 'architecture' | 'outcome';
  badge: string;
  content: React.ReactNode;
  speakerNotes: string;
}

export const ProjectPptPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<string>('');

  // Auto-play slideshow timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDirectPdfDownload = async () => {
    const element = document.getElementById('ppt-printable-slides');
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      setPdfStatus('Rendering 16 slides to PDF...');

      const opt = {
        margin: [5, 5, 5, 5],
        filename: 'Karan_Yadav_Project_Defense_Presentation_Elite_Forums.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 1.5, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['css', 'legacy'] }
      };

      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
      setPdfStatus('Downloaded!');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfStatus('');
      }, 2000);
    } catch (err) {
      console.error('PPT PDF export error:', err);
      window.print();
      setIsGeneratingPdf(false);
      setPdfStatus('');
    }
  };

  const handleDownloadDeck = () => {
    const element = document.getElementById('ppt-printable-slides');
    if (!element) return;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Project Presentation PPT - Karan Yadav - Elite Forums</title>
  <style>
    @page { size: A4 landscape; margin: 8mm; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0B1120; color: #f8fafc; margin: 0; padding: 0; }
    .slide-page { page-break-after: always; break-after: page; width: 100vw; height: 100vh; box-sizing: border-box; padding: 20mm; display: flex; flex-direction: column; justify-content: space-between; border-bottom: 2px solid #334155; }
    @media print { .slide-page { border-bottom: none; } }
    h1 { font-size: 28pt; margin: 0 0 10px 0; color: #38bdf8; }
    h2 { font-size: 18pt; margin: 0 0 8px 0; color: #34d399; }
    p, li { font-size: 14pt; line-height: 1.5; color: #cbd5e1; }
    .badge { display: inline-block; padding: 4px 12px; background: #0284c7; color: white; border-radius: 999px; font-size: 11pt; font-weight: bold; margin-bottom: 12px; }
  </style>
</head>
<body>
  ${element.innerHTML}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Project_Output_PPT_Karan_Yadav.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      title: "Full Stack Web & Civic AI Engineering",
      subtitle: "Internship Project Final Presentation & Technical Defense",
      category: "intro",
      badge: "ELITE FORUMS INTERNSHIP 2026",
      speakerNotes: "Welcome everyone. I am Karan Yadav, and today I will present my technical deliverables from the Elite Forums Summer Internship, encompassing three comprehensive web and AI projects.",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6 h-full space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Final Technical Project Defense</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            FULL STACK WEB DEVELOPMENT & CIVIC INTELLIGENCE PLATFORMS
          </h1>

          <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            A comprehensive showcase of 3 production-grade software applications: Personal Developer Portfolio, Shield AI Safety Engine, and Sahayak AI Citizen Portal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl text-left pt-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidate Details</p>
              <p className="text-base font-bold text-white mt-1">Karan Yadav</p>
              <p className="text-xs text-slate-400 font-mono">karanyadav702097@gmail.com</p>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">Full Stack & AI Development Intern</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Internship Organization</p>
              <p className="text-base font-bold text-emerald-400 mt-1">Elite Forums</p>
              <p className="text-xs text-slate-400">Career Foundation & EdTech</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Academic Session: 2026</p>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Internship Profile
    {
      id: 2,
      title: "Internship Profile & Training Objectives",
      subtitle: "Elite Forums Summer Training Program Curriculum & Sprints",
      category: "intro",
      badge: "TRAINING OVERVIEW",
      speakerNotes: "During this 1-month intensive internship at Elite Forums, we were assigned real-world project briefs following Agile development principles and weekly milestones.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full items-center">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-white text-base">Modern Frontend Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leveraged React 19, TypeScript, and Vite for lightning-fast compilation, state-driven UI modeling, and zero runtime errors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-white text-base">Civic & Safety Systems</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed reactive systems for critical civic needs: emergency SOS triggers, live GPS broadcasting, and grievance escalation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
            <h3 className="font-bold text-white text-base">Full-Stack Cloud Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrated Supabase PostgreSQL databases with Row-Level Security (RLS) policies to ensure strict citizen privacy and RBAC permissions.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: Executive Summary of 3 Projects
    {
      id: 3,
      title: "Executive Summary: 3 Core Project Deliverables",
      subtitle: "High-level overview of applications built and tested during the program",
      category: "intro",
      badge: "PROJECT PORTFOLIO",
      speakerNotes: "I developed three distinct projects across personal branding, public safety intelligence, and large-scale citizen welfare assistance.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full items-center">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/60 to-slate-900 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">PROJECT 1</span>
              <Laptop className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-white text-base">Personal Portfolio</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A responsive digital identity showcasing skills, projects, and contact avenues with custom animations.
            </p>
            <div className="text-[11px] font-mono text-blue-400 pt-2 border-t border-blue-500/20">
              React 19 • Vite • Tailwind • Vercel
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-rose-950/60 to-slate-900 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">PROJECT 2</span>
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="font-bold text-white text-base">Shield AI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Public safety intelligence platform with instant SOS broadcasting, trusted contacts notification, and verified helplines.
            </p>
            <div className="text-[11px] font-mono text-rose-400 pt-2 border-t border-rose-500/20">
              Emergency SOS • GPS • React • State
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">PROJECT 3</span>
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white text-base">Sahayak AI</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              National Citizen Super App for 10+ scheme categories, grievance redressal tracking, multilingual AI, and emergency network.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-emerald-500/20">
              Full Stack • Supabase • PostgreSQL • RLS
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Project 1 - Developer Portfolio
    {
      id: 4,
      title: "Project 1: Personal Developer Portfolio",
      subtitle: "Modern Responsive Brand Identity & Interactive Resume",
      category: "project1",
      badge: "PROJECT 1 • PORTFOLIO",
      speakerNotes: "The developer portfolio was engineered to establish a personal engineering presence with interactive project filters, skills radar, and 100% responsive styling.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 text-sm">Key Objectives</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Build a modern, accessible web profile for Karan Yadav highlighting technical capabilities, GitHub repositories, and direct recruitment communication channels.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 text-sm">Design & UX Highlights</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Dynamic hero banner with high-contrast typography and call-to-actions.</li>
                <li>Responsive project showcase cards with live preview badges and repository links.</li>
                <li>Interactive skill categorization across Frontend, Backend, and Databases.</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-3">
            <h4 className="font-bold text-white text-sm">Performance & Metrics</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-emerald-400">98/100</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Lighthouse Score</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-blue-400">&lt; 1.1s</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">First Contentful Paint</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-violet-400">100%</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Mobile Responsive</p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-amber-400">Vercel</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Automated CI/CD</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 5: Project 1 Showcase
    {
      id: 5,
      title: "Project 1: Technical Implementation Details",
      subtitle: "Component Architecture, Build Optimizations & State Management",
      category: "project1",
      badge: "PROJECT 1 • ARCHITECTURE",
      speakerNotes: "Here we examine the component hierarchy of the portfolio, demonstrating clean modular code and reusable UI elements.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-center">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="font-mono text-xs text-blue-400 font-bold">&lt;HeroSection /&gt;</div>
            <p className="text-xs text-slate-400">
              Clean introductory viewport with typing effect, social links (GitHub, LinkedIn), and direct resume download button.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="font-mono text-xs text-blue-400 font-bold">&lt;ProjectGrid /&gt;</div>
            <p className="text-xs text-slate-400">
              Filtered layout using React state tags to sort by Full Stack, Frontend, and AI integrations with smooth CSS transitions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="font-mono text-xs text-blue-400 font-bold">&lt;ContactForm /&gt;</div>
            <p className="text-xs text-slate-400">
              Input validation with feedback states preventing empty submissions and verifying email formatting.
            </p>
          </div>
        </div>
      )
    },

    // Slide 6: Project 2 - Shield AI
    {
      id: 6,
      title: "Project 2: Shield AI — Public Safety Platform",
      subtitle: "Emergency Response, Threat Detection & Live Coordinate Broadcast",
      category: "project2",
      badge: "PROJECT 2 • SHIELD AI",
      speakerNotes: "Shield AI addresses personal safety challenges by combining one-tap SOS alarms, GPS telemetry broadcast, and trusted emergency contacts.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 space-y-2">
              <h4 className="font-bold text-rose-300 text-sm">Civic Safety Problem</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                In critical emergencies, dialing multiple numbers or describing precise physical locations creates dangerous delays. Shield AI delivers instant single-touch alert dissemination.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Core System Capabilities</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Instant One-Tap SOS with audible alarm toggle.</li>
                <li>High-precision device geolocation capture.</li>
                <li>Pre-configured emergency contact broadcast payload.</li>
                <li>Direct links to Indian national emergency helplines.</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="font-bold text-rose-400 text-sm">Emergency Dispatch Workflow</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-center leading-6 shrink-0">1</span>
                <span className="text-slate-300">Citizen taps SOS button</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-center leading-6 shrink-0">2</span>
                <span className="text-slate-300">Device GPS coordinates captured & formatted</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-center leading-6 shrink-0">3</span>
                <span className="text-slate-300">Automated SMS/alert dispatch to trusted contacts</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-center leading-6 shrink-0">4</span>
                <span className="text-slate-300">Direct one-touch call connection to 112 / Police</span>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Shield AI Architecture
    {
      id: 7,
      title: "Project 2: Shield AI Technical Workflow",
      subtitle: "State Machine, Geolocation APIs & Safety Protocols",
      category: "project2",
      badge: "PROJECT 2 • IMPLEMENTATION",
      speakerNotes: "We utilized the HTML5 Geolocation API, reactive emergency state management, and fallback modes for offline or weak-signal situations.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full items-center">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-rose-400 text-sm">Geolocation Pipeline</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries latitude and longitude with high accuracy (`enableHighAccuracy: true`). Formats coordinates into Google Maps deep links for instant sharing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-rose-400 text-sm">Safety State Machine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintains strict states: `IDLE`, `CONFIRMING_SOS`, `DISPATCHING_ALERTS`, and `RESOLVED` with audio-visual alarms to prevent inadvertent panic triggers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-rose-400 text-sm">Incident Logging</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows citizens to record safety hazards (dark roads, harassment hotspots) with timestamps and severity categories for community awareness.
            </p>
          </div>
        </div>
      )
    },

    // Slide 8: Project 3 - Sahayak AI Concept
    {
      id: 8,
      title: "Project 3: Sahayak AI — National Citizen Super App",
      subtitle: "Unified Civic Empowerment Platform for 1.4 Billion Citizens",
      category: "project3",
      badge: "PROJECT 3 • SAHAYAK AI",
      speakerNotes: "Sahayak AI is the flagship project: an all-in-one citizen portal connecting Indians with government schemes, grievance redressal, emergency helplines, and civic AI.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <h4 className="font-bold text-emerald-300 text-sm">The National Problem Statement</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over 500+ welfare schemes exist across central and state ministries, yet eligible citizens remain unaware due to complex jargon, siloed websites, and language barriers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Our Solution: SAHAYAK AI</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A unified, dark-themed, high-contrast digital assistant providing verified welfare scheme discovery, instant eligibility calculation, grievance drafting, and emergency help.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
            <h4 className="font-bold text-emerald-400 text-sm">Key Architectural Pillars</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-white">1. Scheme Discovery Engine</span>
                <span className="text-[10px] text-emerald-400 font-mono">10 Categories</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-white">2. Public Grievance Portal</span>
                <span className="text-[10px] text-blue-400 font-mono">CPGRAMS Inspired</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-white">3. Multilingual Civic AI</span>
                <span className="text-[10px] text-violet-400 font-mono">10+ Indian Languages</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <span className="font-semibold text-white">4. Verified Emergency Hub</span>
                <span className="text-[10px] text-rose-400 font-mono">112, 108, 1091 Direct</span>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 9: Schemes Discovery
    {
      id: 9,
      title: "Project 3: Government Scheme Discovery & Eligibility",
      subtitle: "Category Color Differentiation, Sourced Details & 4-Tab Verification",
      category: "project3",
      badge: "PROJECT 3 • SCHEMES",
      speakerNotes: "We created a category-differentiated card design where each welfare domain has a unique accent color, along with an interactive 4-tab breakdown.",
      content: (
        <div className="space-y-5 h-full justify-center flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/40">
              <div className="w-3 h-3 rounded-full bg-blue-400 mx-auto mb-1"></div>
              <strong className="text-blue-300">Housing</strong>
              <p className="text-[10px] text-slate-400">PMAY Urban/Gramin</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto mb-1"></div>
              <strong className="text-emerald-300">Healthcare</strong>
              <p className="text-[10px] text-slate-400">Ayushman Bharat</p>
            </div>
            <div className="p-3 rounded-xl bg-green-950/60 border border-green-500/40">
              <div className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-1"></div>
              <strong className="text-green-300">Agriculture</strong>
              <p className="text-[10px] text-slate-400">PM-KISAN</p>
            </div>
            <div className="p-3 rounded-xl bg-violet-950/60 border border-violet-500/40">
              <div className="w-3 h-3 rounded-full bg-violet-400 mx-auto mb-1"></div>
              <strong className="text-violet-300">Education</strong>
              <p className="text-[10px] text-slate-400">NSP Scholarship</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40">
              <div className="w-3 h-3 rounded-full bg-amber-400 mx-auto mb-1"></div>
              <strong className="text-amber-300">Finance</strong>
              <p className="text-[10px] text-slate-400">PM Jan Dhan</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Expandable 4-Tab Verification System</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <strong className="text-emerald-400">1. Benefits:</strong>
                <p className="text-[11px] text-slate-300 mt-1">Exact financial grant amounts, insurance covers, and subsidies.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <strong className="text-blue-400">2. Eligibility:</strong>
                <p className="text-[11px] text-slate-300 mt-1">Annual income thresholds, age brackets, and demographic criteria.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <strong className="text-amber-400">3. Apply Steps:</strong>
                <p className="text-[11px] text-slate-300 mt-1">Numbered procedure leading to the official government portal.</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <strong className="text-rose-400">4. Documents:</strong>
                <p className="text-[11px] text-slate-300 mt-1">Interactive checklist (Aadhaar, Income Proof, Caste Certificate).</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Grievance System
    {
      id: 10,
      title: "Project 3: Civic Grievance Redressal System",
      subtitle: "Structured Public Complaint Drafting, Priority Escalation & Status Tracking",
      category: "project3",
      badge: "PROJECT 3 • GRIEVANCES",
      speakerNotes: "Citizens can register complaints across civic sectors like sanitation, water, roads, and electricity with tracking numbers and live status timelines.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-blue-400 text-sm">Grievance Registration Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enables citizens to file complaints with departmental tagging, location details, urgency levels (Urgent, High, Normal), and supporting document uploads.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Tracking & Accountability</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Automatic generation of unique tracking identifiers (e.g., GRV-2026-8812).</li>
                <li>Clear progress stages: Submitted &rarr; In Review &rarr; Action Taken &rarr; Resolved.</li>
                <li>Administrative oversight dashboard for resolving civic disputes.</li>
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="font-bold text-emerald-400 text-sm">Supported Civic Categories</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-800 border border-slate-700">💧 Water Supply Outage</div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700">⚡ Power Grid Breakdown</div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700">🛣️ Potholes & Road Damage</div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700">🗑️ Waste & Sanitation</div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700">🏥 Public Hospital Delays</div>
              <div className="p-2 rounded bg-slate-800 border border-slate-700">🚌 Public Transport Issues</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 11: Multilingual AI & Emergency
    {
      id: 11,
      title: "Project 3: Multilingual Civic AI & Emergency Network",
      subtitle: "Bilingual Context, Indian Languages Support & Verified Direct Helplines",
      category: "project3",
      badge: "PROJECT 3 • AI & EMERGENCY",
      speakerNotes: "To ensure inclusivity across India, we built multilingual localization support and integrated a verified 24/7 national helpline network.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Civic AI Conversational Assistant</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides citizens with plain-language explanations of complex bureaucratic rules. Can calculate whether a family qualifies for specific schemes based on self-reported income.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
              <strong>Supported Languages:</strong> English, Hindi (हिन्दी), Marathi (मराठी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ).
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>National Direct Emergency Network</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-rose-500/30 text-rose-300 font-bold">
                112 <span className="text-[10px] text-slate-400 font-normal block">ERSS All-India</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300 font-bold">
                108 <span className="text-[10px] text-slate-400 font-normal block">Ambulance</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-300 font-bold">
                100 <span className="text-[10px] text-slate-400 font-normal block">Police Control</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 font-bold">
                1930 <span className="text-[10px] text-slate-400 font-normal block">Cyber Crime</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              One-touch click-to-call integration with automatic device coordinates sharing for rapid emergency response.
            </p>
          </div>
        </div>
      )
    },

    // Slide 12: Technical Architecture
    {
      id: 12,
      title: "Technical Architecture & Cloud Infrastructure",
      subtitle: "End-to-End Stack: React 19, Vite, Supabase PostgreSQL & Vercel",
      category: "architecture",
      badge: "FULL STACK ARCHITECTURE",
      speakerNotes: "Our architecture follows a clean separation of concerns: React on the client, Supabase for authentication and database, and Vercel for continuous deployment.",
      content: (
        <div className="space-y-4 h-full justify-center flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30">
              <strong className="text-blue-400 block text-sm">Client Layer</strong>
              <p className="text-slate-300 mt-1">React 19 + TypeScript</p>
              <p className="text-[10px] text-slate-500">Vite Bundler & HMR</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30">
              <strong className="text-emerald-400 block text-sm">Styling & UI</strong>
              <p className="text-slate-300 mt-1">Tailwind CSS</p>
              <p className="text-[10px] text-slate-500">Lucide Icons + Motion</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30">
              <strong className="text-amber-400 block text-sm">Data & Auth</strong>
              <p className="text-slate-300 mt-1">Supabase Cloud</p>
              <p className="text-[10px] text-slate-500">PostgreSQL + RLS Rules</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-violet-500/30">
              <strong className="text-violet-400 block text-sm">Hosting & CI/CD</strong>
              <p className="text-slate-300 mt-1">Vercel Platform</p>
              <p className="text-[10px] text-slate-500">Git Automated Builds</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Key Architectural Strengths</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>• <strong>Type Safety:</strong> Strict TypeScript interfaces across all data models.</div>
              <div>• <strong>Offline Resilience:</strong> LocalStorage caching for emergency contacts & bookmarks.</div>
              <div>• <strong>Optimized Assets:</strong> Vector SVG icons, zero bloated raster images.</div>
              <div>• <strong>Auditable Security:</strong> Strict Row Level Security policies on Supabase.</div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 13: Comparative Output Matrix
    {
      id: 13,
      title: "Project Output & Metrics Matrix",
      subtitle: "Quantitative comparison across all 3 developed applications",
      category: "architecture",
      badge: "PROJECT METRICS",
      speakerNotes: "Here is a quantitative breakdown showing the scope, component count, database integration, and responsiveness of the 3 projects.",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900 text-slate-300">
                  <th className="p-3">Metrics / Attributes</th>
                  <th className="p-3 text-blue-400">1. Portfolio Website</th>
                  <th className="p-3 text-rose-400">2. Shield AI</th>
                  <th className="p-3 text-emerald-400">3. Sahayak AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-white">Target Domain</td>
                  <td className="p-3">Personal Branding</td>
                  <td className="p-3">Citizen Safety</td>
                  <td className="p-3">Civic Welfare & Grievance</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Frontend Framework</td>
                  <td className="p-3">React 19 + Vite</td>
                  <td className="p-3">React 19 + Vite</td>
                  <td className="p-3">React 19 + TypeScript + Vite</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Custom Components</td>
                  <td className="p-3">10+ Components</td>
                  <td className="p-3">15+ Components</td>
                  <td className="p-3">35+ Components</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Database / Persistence</td>
                  <td className="p-3">Static Data</td>
                  <td className="p-3">Local Storage State</td>
                  <td className="p-3">Supabase PostgreSQL + RLS</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Mobile Responsiveness</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Verified</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Verified</td>
                  <td className="p-3 text-emerald-400 font-bold">100% Verified</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Deployment Status</td>
                  <td className="p-3 text-emerald-400 font-bold">Live on Vercel</td>
                  <td className="p-3 text-emerald-400 font-bold">Completed & Tested</td>
                  <td className="p-3 text-emerald-400 font-bold">Production Ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    // Slide 14: Engineering Challenges
    {
      id: 14,
      title: "Key Engineering Challenges Solved",
      subtitle: "Troubleshooting Complex Front-End and Full-Stack Problems",
      category: "architecture",
      badge: "PROBLEM SOLVING",
      speakerNotes: "During development, I overcame several challenges including visual category differentiation, mobile viewport constraints, and strict data security.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full items-center">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">CHALLENGE 1</span>
            <h4 className="font-bold text-white text-sm">Category Visual Diversity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Problem:</strong> Plain white card layouts led to a boring, indistinguishable interface.
            </p>
            <p className="text-xs text-emerald-400 leading-relaxed">
              <strong>Solution:</strong> Implemented a dark navy canvas with 10 vibrant category color accents and Lucide icons.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">CHALLENGE 2</span>
            <h4 className="font-bold text-white text-sm">Emergency Latency & GPS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Problem:</strong> Slow geolocation acquisition during network drops caused unhandled errors.
            </p>
            <p className="text-xs text-emerald-400 leading-relaxed">
              <strong>Solution:</strong> Added fallback geolocation timeout with cached coordinates and direct manual override.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">CHALLENGE 3</span>
            <h4 className="font-bold text-white text-sm">Multi-Tenant Data Privacy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Problem:</strong> Ensuring citizens can never inspect or alter other citizens' grievances.
            </p>
            <p className="text-xs text-emerald-400 leading-relaxed">
              <strong>Solution:</strong> Written and deployed Row-Level Security (RLS) policies on Supabase validated via JWT tokens.
            </p>
          </div>
        </div>
      )
    },

    // Slide 15: Learning Outcomes
    {
      id: 15,
      title: "Learning Outcomes & Professional Growth",
      subtitle: "Core Skills Acquired During the Elite Forums Internship",
      category: "outcome",
      badge: "LEARNING OUTCOMES",
      speakerNotes: "This training enabled me to gain hands-on proficiency in modern frontend frameworks, cloud databases, accessibility standards, and production deployment.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills Mastered</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li>Advanced component modeling with React 19 functional hooks.</li>
              <li>Type-safe development using TypeScript interfaces and unions.</li>
              <li>Tailwind CSS utility architecture with custom dark-mode systems.</li>
              <li>Relational schema design, queries, and security rules in PostgreSQL.</li>
              <li>Performance optimization, bundle size reduction, and asset caching.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Engineering & Professional Growth</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li>Agile sprint execution with structured milestone deliverables.</li>
              <li>Git version control best practices and clean pull request workflows.</li>
              <li>Civic-centric UI/UX design thinking focused on accessibility and ease of use.</li>
              <li>Defending technical decisions and documenting academic reports.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 16: Conclusion & Thank You
    {
      id: 16,
      title: "Conclusion & Project Defense Q&A",
      subtitle: "Thank You — Open for Questions from Mentors and Evaluators",
      category: "outcome",
      badge: "CONCLUSION & DEFENSE",
      speakerNotes: "In conclusion, these projects demonstrate my ability to take a software requirement from concept to production. Thank you, and I am now ready for questions.",
      content: (
        <div className="flex flex-col items-center justify-center text-center py-6 h-full space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Thank You!
          </h2>

          <p className="text-slate-300 max-w-lg text-sm leading-relaxed">
            All three projects are fully developed, tested, and ready for live demonstration.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md w-full text-left space-y-2 text-xs">
            <p className="font-bold text-emerald-400 text-sm">Karan Yadav</p>
            <p className="text-slate-300">Full Stack & AI Development Intern</p>
            <p className="text-slate-400 font-mono">Email: karanyadav702097@gmail.com</p>
            <p className="text-slate-400">Internship Organization: <strong>Elite Forums</strong></p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/itr-report"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View 12-Page A4 ITR Report</span>
            </Link>

            <Link
              to="/schemes"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
            >
              <Landmark className="w-4 h-4" />
              <span>Open Sahayak AI Live</span>
            </Link>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between p-3 sm:p-6 select-none">
      {/* Top Slide Control Bar (Hidden on Print) */}
      <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl no-print mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">Project Output PPT</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                16 Presentation Slides
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Candidate: <strong className="text-slate-200">Karan Yadav</strong> • Elite Forums Internship
            </p>
          </div>
        </div>

        {/* Slide Counter & Jump Dropdown */}
        <div className="flex items-center gap-2">
          <select 
            value={currentSlide} 
            onChange={(e) => setCurrentSlide(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-violet-500 cursor-pointer"
          >
            {slides.map((s, idx) => (
              <option key={s.id} value={idx}>
                Slide {s.id}: {s.title.substring(0, 32)}...
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 font-mono px-1">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Auto-Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1 transition ${
              isPlaying 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isPlaying ? "Pause Slideshow" : "Auto-Play Slideshow"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Speaker Notes */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              showNotes 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Speaker Notes
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* DIRECT PDF DOWNLOAD */}
          <button
            onClick={handleDirectPdfDownload}
            disabled={isGeneratingPdf}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition disabled:opacity-50 cursor-pointer"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{pdfStatus || 'Generating...'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-white" />
                <span>Download PPT PDF</span>
              </>
            )}
          </button>

          {/* Print Slides to PDF */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
            title="Open browser print dialogue"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Dialog</span>
          </button>

          {/* Export HTML */}
          <button
            onClick={handleDownloadDeck}
            className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>HTML</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Viewport */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="bg-[#0B1120] border-2 border-slate-800 rounded-3xl shadow-2xl overflow-hidden aspect-[16/9] flex flex-col justify-between p-6 sm:p-10 relative">
          
          {/* Slide Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {current.badge}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Elite Forums Internship • Karan Yadav
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-violet-400">
                SLIDE {current.id.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Slide Main Content */}
          <div className="my-auto py-4 flex-1 flex flex-col justify-center">
            {current.id !== 1 && current.id !== 16 && (
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {current.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  {current.subtitle}
                </p>
              </div>
            )}
            
            {current.content}
          </div>

          {/* Slide Bottom Bar */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
            <span>Confidential Project Defense Presentation</span>
            <div className="flex items-center gap-2">
              <span>Candidate: Karan Yadav</span>
              <span>•</span>
              <span className="font-mono text-slate-400">Slide {current.id} of {slides.length}</span>
            </div>
          </div>
        </div>

        {/* Speaker Notes Drawer (Toggled by Button) */}
        {showNotes && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-300 shadow-xl no-print animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-1.5 text-emerald-400 font-bold">
              <span>🎤 Speaker Notes (Viva & Defense Talking Points):</span>
              <span className="text-[10px] font-mono text-slate-500">Tip: Press &rarr; / &larr; to navigate slides</span>
            </div>
            <p className="leading-relaxed text-slate-200">
              "{current.speakerNotes}"
            </p>
          </div>
        )}

        {/* Slide Navigation Buttons & Progress Dots */}
        <div className="flex items-center justify-between mt-4 px-2 no-print">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Interactive Progress Indicator Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide 
                    ? 'w-7 bg-violet-400 shadow-sm shadow-violet-400/50' 
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hidden Container for Complete 16-Slide Printable PDF Deck */}
      <div id="ppt-printable-slides" className="hidden print:block">
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="ppt-slide-sheet bg-[#0B1120] text-white p-12 flex flex-col justify-between h-screen"
          >
            <div className="border-b border-slate-700 pb-4 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-violet-400">{slide.badge}</span>
                <h2 className="text-xl font-bold mt-1 text-white">{slide.title}</h2>
                <p className="text-xs text-slate-400">{slide.subtitle}</p>
              </div>
              <span className="text-lg font-mono font-bold text-emerald-400">
                SLIDE {slide.id} / {slides.length}
              </span>
            </div>

            <div className="my-auto py-6">
              {slide.content}
            </div>

            <div className="border-t border-slate-700 pt-4 flex justify-between items-center text-xs text-slate-400">
              <span>Candidate: Karan Yadav (karanyadav702097@gmail.com)</span>
              <span>Internship: Elite Forums (Career Foundation)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
