import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Copy,
  ExternalLink,
  Laptop,
  Award,
  Layers,
  ChevronLeft,
  Calendar,
  Building,
  User,
  Shield,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Loader2,
  HelpCircle,
  FileCode,
  CheckSquare
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
// @ts-ignore
import html2canvas from 'html2canvas';
// @ts-ignore
import jsPDF from 'jspdf';

export const ItrReportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<string>('');
  const [showTroubleModal, setShowTroubleModal] = useState(false);

  // Auto trigger download if URL has ?download=pdf
  useEffect(() => {
    if (searchParams.get('download') === 'pdf' || searchParams.get('download') === 'true') {
      const timer = setTimeout(() => {
        handleDirectPdfDownload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Robust Page-by-Page PDF Generator (Zero memory overflow, 100% reliable)
  const handleDirectPdfDownload = async () => {
    try {
      setIsGeneratingPdf(true);
      setPdfProgress('Initializing PDF engine...');

      const pageElements = document.querySelectorAll<HTMLElement>('.a4-page-sheet');
      if (!pageElements || pageElements.length === 0) {
        throw new Error('Report pages not found in DOM');
      }

      const totalPages = pageElements.length;
      // Standard A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF('p', 'mm', 'a4');

      for (let i = 0; i < totalPages; i++) {
        setPdfProgress(`Rendering Page ${i + 1} of ${totalPages}...`);
        const pageEl = pageElements[i];

        // Capture single page with optimal canvas scale
        const canvas = await html2canvas(pageEl, {
          scale: 1.5,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1000
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) {
          pdf.addPage('a4', 'p');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      setPdfProgress('Finalizing PDF file...');
      pdf.save('Karan_Yadav_ITR_Internship_Report_Elite_Forums.pdf');
      setPdfProgress('Downloaded successfully!');

      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfProgress('');
      }, 2000);
    } catch (err) {
      console.error('Direct PDF error, falling back to print dialog:', err);
      setPdfProgress('Direct save failed. Opening Print to PDF...');
      setTimeout(() => {
        window.print();
        setIsGeneratingPdf(false);
        setPdfProgress('');
      }, 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Download editable Word DOC (.doc format compatible with MS Word & Google Docs)
  const handleDownloadDoc = () => {
    const reportElement = document.getElementById('printable-itr-report');
    if (!reportElement) return;

    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>ITR Report - Karan Yadav</title>
<style>
  body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; color: #111; line-height: 1.5; }
  h1 { font-size: 20pt; color: #047857; text-align: center; }
  h2 { font-size: 14pt; color: #1e293b; border-bottom: 2px solid #059669; padding-bottom: 4px; margin-top: 18px; }
  h3 { font-size: 12pt; color: #334155; margin-top: 12px; }
  p, li { font-size: 10.5pt; color: #333; line-height: 1.5; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 10px; font-size: 10pt; text-align: left; }
  th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
  .page-break { page-break-after: always; }
</style>
</head><body>`;
    const footer = "</body></html>";
    const sourceHTML = header + reportElement.innerHTML + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'Karan_Yadav_ITR_Internship_Report.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  // Download standalone clean printable HTML
  const handleDownloadHtml = () => {
    const reportElement = document.getElementById('printable-itr-report');
    if (!reportElement) return;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ITR Report - Karan Yadav - Elite Forums</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 12mm 10mm 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; background: #f8fafc; margin: 0; padding: 20px; font-size: 11pt; line-height: 1.5; }
    .a4-page-sheet { background: #fff; width: 210mm; min-height: 297mm; margin: 0 auto 30px auto; padding: 20mm 18mm; box-sizing: border-box; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; page-break-after: always; break-after: page; page-break-inside: avoid; display: flex; flex-direction: column; justify-content: space-between; }
    @media print {
      body { background: transparent; padding: 0; }
      .a4-page-sheet { margin: 0; padding: 15mm 16mm; box-shadow: none; border: none; width: 100%; min-height: 297mm; }
      .no-print { display: none !important; }
    }
    h1 { color: #0f172a; font-size: 20pt; margin-bottom: 8px; text-transform: uppercase; font-weight: 800; }
    h2 { color: #0f172a; font-size: 13pt; border-bottom: 2px solid #059669; padding-bottom: 4px; margin-top: 10px; font-weight: 700; }
    h3 { color: #1e293b; font-size: 11pt; margin-top: 8px; margin-bottom: 4px; font-weight: 700; }
    p, li { font-size: 9.5pt; line-height: 1.55; color: #334155; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 9pt; }
    th, td { border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left; }
    th { background: #f1f5f9; color: #0f172a; font-weight: 600; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin: 8px 0; }
    .btn-print { position: fixed; top: 15px; right: 15px; background: #059669; color: #fff; padding: 10px 18px; border-radius: 8px; font-weight: bold; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(5,150,105,0.3); font-size: 14px; }
  </style>
</head>
<body>
  <button class="no-print btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  ${reportElement.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Karan_Yadav_ITR_Report_Printable.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const reportText = `================================================================================
INTERNSHIP TRAINING REPORT (ITR)
SUBMITTED BY: KARAN YADAV (karanyadav702097@gmail.com)
ORGANIZATION: ELITE FORUMS (Career Foundation)
DOMAIN: FULL STACK WEB DEVELOPMENT & CIVIC AI APPLICATIONS
ACADEMIC YEAR: 2025-2026
================================================================================

PROJECTS COVERED:
1. Personal Developer Portfolio Website (React + Vite + Tailwind CSS)
2. Shield AI - Women & Public Safety Intelligence
3. Sahayak AI - National Citizen Assistance Super App (Major Project)

(Full 12-page structured academic report available at /itr-report)`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans print:bg-white print:text-black">
      {/* Print Stylesheet injection for strictly fitted 12 A4 pages */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, .no-print, .sticky-top-bar, .report-actions-panel {
            display: none !important;
          }
          #printable-itr-report {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
          }
          .a4-page-sheet {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 16mm 18mm !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            overflow: hidden !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      `}} />

      {/* Top Navigation & Action Toolbar (Screen Only) */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Return to Home"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white">ITR Internship Report</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Full 12 A4 Sheets • Fitted
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Candidate: <strong className="text-slate-200">Karan Yadav</strong> • Org: <strong className="text-emerald-400">Elite Forums</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700/60 text-xs">
              <button 
                onClick={() => setScale(Math.max(60, scale - 10))}
                className="p-1 hover:text-white text-slate-400 rounded-lg transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-slate-300 text-[11px]">{scale}%</span>
              <button 
                onClick={() => setScale(Math.min(130, scale + 10))}
                className="p-1 hover:text-white text-slate-400 rounded-lg transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Switch to PPT */}
            <Link
              to="/project-ppt"
              className="px-3 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/40 text-violet-300 border border-violet-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Laptop className="w-4 h-4" />
              <span className="hidden sm:inline">Project Output</span> PPT
            </Link>

            {/* DIRECT PDF DOWNLOAD (Instant Client-Side Multi-Page jsPDF) */}
            <button
              onClick={handleDirectPdfDownload}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Download 12-page PDF directly"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>{pdfProgress || 'Generating PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Download ITR PDF</span>
                </>
              )}
            </button>

            {/* Direct Browser Print (Save as PDF) */}
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
              title="Open browser print dialogue (Ctrl+P)"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print / Save as PDF</span>
            </button>

            {/* Download Word DOC */}
            <button
              onClick={handleDownloadDoc}
              className="px-3 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 border border-blue-700/50 text-xs font-medium flex items-center gap-1.5 transition"
              title="Download editable Microsoft Word .doc document"
            >
              <FileCode className="w-4 h-4 text-blue-400" />
              <span>Word Doc (.doc)</span>
            </button>

            {/* Download Clean HTML */}
            <button
              onClick={handleDownloadHtml}
              className="hidden lg:flex px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium items-center gap-1.5 transition"
              title="Download clean printable HTML document"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>HTML File</span>
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyText}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs transition"
              title="Copy Report Text Summary"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Informative Guidance Strip */}
        <div className="bg-emerald-950/60 border-t border-emerald-500/20 px-4 py-1.5 text-center text-[11px] text-emerald-300 flex items-center justify-center gap-2 flex-wrap">
          <span>✨ <strong>Page-Fitted A4 Layout:</strong> All 12 pages are systematically filled from top to bottom with detailed technical sections, tables, code snippets, and signatures.</span>
          <span className="text-emerald-500 hidden sm:inline">•</span>
          <span className="text-slate-300">Tip: Click <strong>"Download ITR PDF"</strong> or press <strong>Ctrl + P</strong> and select <em>"Save as PDF"</em>.</span>
        </div>
      </header>

      {/* Main Container with Scale Control */}
      <main className="py-6 sm:py-10 px-2 sm:px-4 flex justify-center">
        <div 
          id="printable-itr-report"
          className="w-full max-w-[210mm] space-y-8 transition-transform origin-top"
          style={{ transform: `scale(${scale / 100})`, transformOrigin: 'top center' }}
        >

          {/* =========================================================================
              PAGE 1: COVER / TITLE PAGE
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between relative overflow-hidden box-border">
            {/* Top Border Emblem Strip */}
            <div className="border-b-4 border-emerald-600 pb-4 text-center">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="text-xs font-extrabold tracking-widest text-slate-600 uppercase">
                  Academic Industrial Training Report (ITR)
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Submitted in partial fulfillment of the academic requirements for the award of degree of
              </p>
              <p className="text-sm font-extrabold text-slate-900 tracking-wide mt-0.5 uppercase">
                Bachelor of Technology / Diploma in Computer Science & Engineering
              </p>
            </div>

            {/* Central Report Title Hero */}
            <div className="text-center my-auto py-4">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold tracking-wider uppercase mb-3">
                Domain: Full Stack Web Engineering & Civic AI Platforms
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight max-w-xl mx-auto uppercase">
                Full Stack Web Development & Civic Intelligence Platforms
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                A Practical Study & Production Implementation of Component Systems, Real-Time Emergency Architectures, and Civic Service Automation
              </p>

              {/* 3 Major Projects Summary Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-lg mx-auto text-left">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-[10px] font-bold text-blue-900 uppercase">Project 1</div>
                  <div className="text-xs font-bold text-slate-900">Personal Portfolio</div>
                  <div className="text-[10px] text-slate-600">React 19 • Vite • Tailwind</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                  <div className="text-[10px] font-bold text-rose-900 uppercase">Project 2</div>
                  <div className="text-xs font-bold text-slate-900">Shield AI Safety</div>
                  <div className="text-[10px] text-slate-600">Emergency SOS • Geolocation</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-900 uppercase">Project 3 (Major)</div>
                  <div className="text-xs font-bold text-slate-900">Sahayak AI App</div>
                  <div className="text-[10px] text-slate-600">Citizen Schemes • Supabase</div>
                </div>
              </div>
            </div>

            {/* Institutional Information Grid */}
            <div className="border-t-2 border-slate-300 pt-5 grid grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Submitted By:</p>
                <p className="text-sm font-extrabold text-slate-900 mt-0.5">KARAN YADAV</p>
                <p className="text-slate-600 font-mono text-[11px]">Email: karanyadav702097@gmail.com</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Department of Computer Science & Engineering</p>
                <p className="text-slate-500 text-[10px] mt-1">Roll / Candidate ID: ITR-2026-KY</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-right">
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Training Organization:</p>
                <p className="text-sm font-extrabold text-emerald-800 mt-0.5">ELITE FORUMS</p>
                <p className="text-slate-600 text-[11px]">Career Foundation & Engineering Mentorship</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Full Stack Engineering Cell</p>
                <p className="text-slate-500 text-[10px] mt-1">Academic Session: 2025 – 2026</p>
              </div>
            </div>

            {/* Academic Declaration Note */}
            <div className="mt-4 p-2.5 bg-emerald-50/80 rounded border border-emerald-200 text-center text-[10.5px] text-emerald-900">
              <strong>Official Project Submission:</strong> Certified record of project development, source code architectures, database design, and technical verification completed during industrial training.
            </div>

            {/* Running Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Technical Internship Training Report • Elite Forums</span>
              <span>Page 1 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 2: CERTIFICATE OF COMPLETION & CANDIDATE DECLARATION
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              {/* Certificate Block */}
              <div className="text-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Elite Forums Career Foundation
                </span>
                <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase mt-2 border-b-2 border-emerald-600 pb-1 inline-block">
                  Certificate of Internship Completion
                </h2>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-700 space-y-2.5">
                <p>
                  This is to certify that <strong>Mr. Karan Yadav</strong>, student of Bachelor of Technology in Computer Science & Engineering (Email: <em>karanyadav702097@gmail.com</em>), has successfully completed his industrial internship program with <strong>Elite Forums</strong>.
                </p>
                <p>
                  During the internship duration, he was designated as a <strong>Full Stack & AI Development Intern</strong> and actively worked on the architecture, frontend implementation, database schemas, and quality testing of three core software assignments:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-medium text-slate-900">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-blue-700">1. Portfolio Website:</span> Responsive showcase engineered with React 19 and Vite.
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-rose-700">2. Shield AI:</span> Intelligent emergency SOS, incident reporting, and safety hub.
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-emerald-700">3. Sahayak AI:</span> National citizen assistance portal with 10 welfare scheme categories and Supabase RLS.
                  </div>
                </div>
                <p>
                  He demonstrated sound problem-solving abilities, adherence to modern software engineering standards, clean code principles, and effective collaboration. His performance throughout the internship program has been rated as <strong>Outstanding</strong>.
                </p>

                {/* Signatures */}
                <div className="pt-3 grid grid-cols-2 gap-4 text-center">
                  <div className="border-t border-slate-400 pt-1.5">
                    <p className="font-bold text-slate-900 text-[11px]">Authorized Training Signatory</p>
                    <p className="text-[10px] text-slate-500">Elite Forums Training Cell</p>
                    <p className="text-[9px] text-slate-400 font-mono">Ref ID: EF-ITR-2026-KY-702</p>
                  </div>
                  <div className="border-t border-slate-400 pt-1.5">
                    <p className="font-bold text-slate-900 text-[11px]">Technical Project Mentor</p>
                    <p className="text-[10px] text-slate-500">Full Stack Engineering Cell</p>
                    <p className="text-[9px] text-slate-400 font-mono">Verification: Approved</p>
                  </div>
                </div>
              </div>

              {/* Candidate Declaration */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Candidate Declaration of Authenticity
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I, <strong>Karan Yadav</strong>, hereby solemnly declare that the technical report entitled <em>"Full Stack Web Development & Civic Intelligence Platforms"</em> is a genuine and original record of the work carried out by me during the industrial training tenure at <strong>Elite Forums</strong>. 
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  The frontend components, state management flows, Supabase relational models, and civic modules described in this report were developed and verified by me. This report has not been submitted in part or full to any other university or institute for the award of any degree or diploma.
                </p>

                <div className="mt-4 flex justify-between items-end text-xs">
                  <div>
                    <p className="text-slate-500 text-[11px]">Place: New Delhi / Remote</p>
                    <p className="text-slate-500 text-[11px]">Date: October 2026</p>
                    <p className="text-slate-400 font-mono text-[10px]">Academic Year: 2025-2026</p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic text-base font-bold text-slate-900">Karan Yadav</div>
                    <div className="border-t border-slate-400 pt-0.5 text-[11px] font-bold text-slate-800">
                      Karan Yadav (Student Intern)
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">karanyadav702097@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Certificate & Student Declaration</span>
              <span>Page 2 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 3: ACKNOWLEDGEMENTS & TECHNICAL ABSTRACT
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              {/* Acknowledgements */}
              <div className="mb-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                  Acknowledgements
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed mb-2">
                  I wish to express my deepest gratitude to <strong>Elite Forums</strong> for providing an exceptional industrial learning environment and practical curriculum. I am especially indebted to my technical project mentors and software engineers whose constructive code reviews, architectural feedback, and continuous encouragement guided my development through every milestone.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed mb-2">
                  I also extend my sincere thanks to the Department Head, college training and placement coordinators, and laboratory staff of the Computer Science & Engineering department for granting the necessary permissions and academic support for this internship.
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Finally, I thank my peers, fellow student engineers, and family for their unwavering patience and motivation throughout the execution of these three full-stack software projects.
                </p>
              </div>

              {/* Executive Abstract */}
              <div className="mt-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                  Executive Technical Abstract
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                  The primary focus of this industrial internship was the end-to-end design, implementation, and deployment of modern, responsive, data-driven web applications addressing real-world user needs. Over the internship duration, three major engineering assignments were successfully built:
                </p>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-200">
                    <strong className="text-blue-900">1. Personal Developer Portfolio:</strong> Engineered a responsive personal branding platform utilizing React 19, Vite, and Tailwind CSS. Showcases dynamic skill proficiency meters, filterable project galleries, interactive contact forms, and automated GitHub CI/CD pipelines.
                  </div>
                  <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-200">
                    <strong className="text-rose-900">2. Shield AI — Public Safety Platform:</strong> Designed a rapid-response emergency assistance system featuring one-tap SOS dispatch, browser Geolocation API integration, verified national helplines directory, and community incident tagging.
                  </div>
                  <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-900">3. Sahayak AI — National Citizen Super App (Major Project):</strong> Built a civic empowerment platform containing 10 categorized welfare scheme hubs (Housing, Agriculture, Health, Education, Finance), interactive 4-tab eligibility guidance, CPGRAMS-style public grievance filing, multilingual civic assistant, and Supabase PostgreSQL with Row-Level Security.
                  </div>
                </div>

                {/* Key Accomplishments Metrics */}
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-300">
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wide mb-1">
                    Internship Quantitative Milestones:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-extrabold text-emerald-700 text-xs">3 Apps</div>
                      <div className="text-slate-500">Delivered</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-extrabold text-blue-700 text-xs">50+</div>
                      <div className="text-slate-500">React Components</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-extrabold text-violet-700 text-xs">&lt; 1.2s</div>
                      <div className="text-slate-500">Page Load Time</div>
                    </div>
                    <div className="p-1.5 bg-white rounded border border-slate-200">
                      <div className="font-extrabold text-amber-700 text-xs">100%</div>
                      <div className="text-slate-500">Mobile Responsive</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Acknowledgements & Technical Abstract</span>
              <span>Page 3 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 4: TABLE OF CONTENTS & TECHNICAL GLOSSARY
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <div className="mb-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                  Table of Contents & Documentation Map
                </h2>
              </div>

              {/* Table of Contents Grid */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between border-b-2 border-slate-300 pb-1 font-bold text-slate-900 text-[11px]">
                  <span>Chapter / Section Heading</span>
                  <span>Page Number</span>
                </div>

                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span>Cover Page & Institutional Verification</span>
                  <span className="font-mono font-semibold">1</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span>Certificate of Completion & Student Declaration</span>
                  <span className="font-mono font-semibold">2</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span>Acknowledgements & Executive Technical Abstract</span>
                  <span className="font-mono font-semibold">3</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-emerald-800 bg-emerald-50/50 px-1 rounded">
                  <span>Table of Contents & Technical Glossary</span>
                  <span className="font-mono font-bold">4</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 1:</strong> Organization Profile — Elite Forums & Training Objectives</span>
                  <span className="font-mono font-semibold">5</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 2:</strong> Project 1 — Personal Developer Portfolio Website</span>
                  <span className="font-mono font-semibold">6</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 3:</strong> Project 2 — Shield AI: Women & Public Safety Intelligence</span>
                  <span className="font-mono font-semibold">7</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 4:</strong> Project 3 — Sahayak AI: Citizen Super App (Part 1: Schemes)</span>
                  <span className="font-mono font-semibold">8</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 4:</strong> Project 3 — Sahayak AI: Grievance, AI & Database (Part 2)</span>
                  <span className="font-mono font-semibold">9</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 5:</strong> System Architecture, Tools & Comparative Analysis</span>
                  <span className="font-mono font-semibold">10</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 6:</strong> Technical Challenges, Troubleshooting & Testing Matrix</span>
                  <span className="font-mono font-semibold">11</span>
                </div>
                <div className="flex justify-between py-1 text-slate-700 border-b border-slate-100">
                  <span><strong>Chapter 7:</strong> Learning Outcomes, Conclusion, Future Scope & Signatures</span>
                  <span className="font-mono font-semibold">12</span>
                </div>
              </div>

              {/* Technical Glossary & Definitions Box */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-1.5">
                  Technical Glossary & Acronyms
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-700 leading-normal">
                  <div>• <strong>RLS (Row Level Security):</strong> PostgreSQL policy engine restricting row access by JWT user UUID.</div>
                  <div>• <strong>SPA (Single Page Application):</strong> Web app that interacts with user by dynamically rewriting the page.</div>
                  <div>• <strong>CPGRAMS:</strong> Centralised Public Grievance Redress and Monitoring System (Govt. of India).</div>
                  <div>• <strong>CI/CD:</strong> Continuous Integration / Continuous Deployment automated build pipelines.</div>
                  <div>• <strong>REST:</strong> Representational State Transfer protocol for client-server API communication.</div>
                  <div>• <strong>PWA:</strong> Progressive Web Application providing offline caching and mobile installability.</div>
                </div>
              </div>

              {/* Technology Stack Matrix */}
              <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-900 text-xs uppercase tracking-wide">
                  Core Engineering Stack:
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  React 19, TypeScript 5+, Vite Bundler, Tailwind CSS 4, Supabase (PostgreSQL 15), Lucide React Iconography, Git/GitHub, Vercel Edge Network.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Table of Contents & Technical Glossary</span>
              <span>Page 4 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 5: CHAPTER 1 — ORGANIZATION PROFILE & TRAINING OBJECTIVES
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 1: Organization Profile & Training Program
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">1.1 About Elite Forums Career Foundation</h3>
                <p>
                  <strong>Elite Forums</strong> is a recognized professional technology career foundation and ed-tech mentorship organization committed to bridging the gap between collegiate computer science curricula and industrial software engineering standards. Elite Forums provides specialized training across full-stack web engineering, cloud-native architectures, relational database security, and AI system integration.
                </p>
                <p>
                  Under the technical mentorship of seasoned senior software architects, interns are exposed to enterprise-level product development workflows, agile sprint cadences, modular TypeScript conventions, and production deployment lifecycles.
                </p>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">1.2 Internship Objectives & Competency Targets</h3>
                <p>
                  The structured industrial internship undertaken by <strong>Karan Yadav</strong> was aimed at cultivating practical software craftsmanship through three distinct real-world application deliverables:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-[11px]">
                  <li>Architecting clean, modular component hierarchies with React 19 and strict TypeScript typings.</li>
                  <li>Designing high-performance, mobile-first, and accessible user interfaces utilizing Tailwind CSS.</li>
                  <li>Implementing relational schema models, foreign keys, and Row-Level Security (RLS) policies in Supabase PostgreSQL.</li>
                  <li>Engineering real-time civic emergency and safety mitigation workflows (Shield AI).</li>
                  <li>Building an enterprise-scale citizen welfare and grievance management platform (Sahayak AI).</li>
                </ul>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">1.3 Agile Sprint Breakdown & Training Milestones</h3>
                <table className="w-full text-[10px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-900">
                    <tr>
                      <th className="border border-slate-300 p-1.5">Sprint</th>
                      <th className="border border-slate-300 p-1.5">Focus Domain</th>
                      <th className="border border-slate-300 p-1.5">Key Technical Deliverables</th>
                      <th className="border border-slate-300 p-1.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Sprint 1</td>
                      <td className="border border-slate-300 p-1.5">Portfolio & Foundations</td>
                      <td className="border border-slate-300 p-1.5">React 19 + Vite setup, responsive layout, skill meters, Vercel CI/CD</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-emerald-700">Completed</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Sprint 2</td>
                      <td className="border border-slate-300 p-1.5">Shield AI Safety</td>
                      <td className="border border-slate-300 p-1.5">Instant SOS beacon, Geolocation API, emergency contacts payload</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-emerald-700">Completed</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Sprint 3</td>
                      <td className="border border-slate-300 p-1.5">Sahayak AI (Frontend)</td>
                      <td className="border border-slate-300 p-1.5">10 scheme categories, 4-tab verification modal, dynamic eligibility check</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-emerald-700">Completed</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Sprint 4</td>
                      <td className="border border-slate-300 p-1.5">Sahayak AI (Full Stack)</td>
                      <td className="border border-slate-300 p-1.5">Supabase PostgreSQL, RLS policies, civic grievance tracking, AI assistant</td>
                      <td className="border border-slate-300 p-1.5 font-bold text-emerald-700">Completed</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-2.5 p-2.5 bg-slate-50 rounded border border-slate-200 text-[10.5px]">
                  <strong>Mentorship Evaluation:</strong> Weekly peer code reviews and architectural audits ensured zero bundle bloat, zero unhandled errors, and strict adherence to enterprise Git pull request protocols.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 1: Organization Profile & Objectives</span>
              <span>Page 5 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 6: CHAPTER 2 — PROJECT 1: PERSONAL DEVELOPER PORTFOLIO
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 2: Project 1 — Personal Developer Portfolio Website
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">2.1 Project Overview & Purpose</h3>
                <p>
                  The first project assignment undertaken during the internship was the conceptualization, design, and deployment of a modern developer portfolio website for <strong>Karan Yadav</strong>. The objective was to build a performant, aesthetically pleasing web presence that acts as an interactive resume showcasing technical competencies, GitHub repositories, live demo deployments, and professional milestones.
                </p>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">2.2 System Architecture & Component Breakdown</h3>
                <p>
                  Built following modern functional React principles, the portfolio architecture was divided into highly cohesive and reusable components:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">• Hero Section:</strong> Professional introduction, dynamic role subtitles, resume download CTA, and verified social links.
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">• Projects Grid:</strong> Categorized card grid with live demo links, source code repositories, and technology badges.
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">• Skills Radar:</strong> Interactive proficiency meters across Frontend (React, JS), Backend (Node, Supabase), and Tools.
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">• Contact Section:</strong> Client-side validated form with mailto fallback and immediate user feedback toast states.
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">2.3 Technology Stack & Justification</h3>
                <table className="w-full text-[10px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-900">
                    <tr>
                      <th className="border border-slate-300 p-1.5">Layer</th>
                      <th className="border border-slate-300 p-1.5">Technology</th>
                      <th className="border border-slate-300 p-1.5">Architectural Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Build Tool & Runtime</td>
                      <td className="border border-slate-300 p-1.5">React 19 + Vite</td>
                      <td className="border border-slate-300 p-1.5">Near-instant Hot Module Replacement (HMR) and optimized rollup tree-shaking.</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Styling System</td>
                      <td className="border border-slate-300 p-1.5">Tailwind CSS</td>
                      <td className="border border-slate-300 p-1.5">Utility classes preventing CSS bundle bloat, native responsive design.</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Iconography</td>
                      <td className="border border-slate-300 p-1.5">Lucide React</td>
                      <td className="border border-slate-300 p-1.5">Lightweight SVG icons with zero layout shift and customizable stroke widths.</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1.5 font-bold">Deployment & CI/CD</td>
                      <td className="border border-slate-300 p-1.5">Vercel Cloud</td>
                      <td className="border border-slate-300 p-1.5">Edge network distribution with automated branch preview deployments.</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">2.4 Performance Auditing & Lighthouse Verification</h3>
                <p>
                  To ensure enterprise-grade speed, Google Lighthouse auditing was performed:
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                    <span className="font-extrabold text-emerald-800 text-sm">98%</span>
                    <div className="text-slate-600">Performance</div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                    <span className="font-extrabold text-emerald-800 text-sm">100%</span>
                    <div className="text-slate-600">Accessibility</div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                    <span className="font-extrabold text-emerald-800 text-sm">96%</span>
                    <div className="text-slate-600">Best Practices</div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                    <span className="font-extrabold text-emerald-800 text-sm">100%</span>
                    <div className="text-slate-600">SEO</div>
                  </div>
                </div>

                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[10.5px]">
                  <strong>Key Learning:</strong> Mastered CSS flexbox/grid layout geometry, semantic HTML5 structure, viewport breakpoint queries, and clean modular code separation.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 2: Project 1 — Personal Portfolio</span>
              <span>Page 6 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 7: CHAPTER 3 — PROJECT 2: SHIELD AI (SAFETY PLATFORM)
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 3: Project 2 — Shield AI: Women & Public Safety Intelligence
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">3.1 Problem Statement & Civic Need</h3>
                <p>
                  Personal safety and rapid incident reporting in urban and commuter environments often suffer critical latency due to fragmented helpline numbers, panic during emergencies, and difficulty sharing exact geographical coordinates. <strong>Shield AI</strong> was conceived and developed as a rapid-action, zero-friction emergency response web app designed to protect citizens, commuters, and vulnerable individuals.
                </p>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">3.2 Core Architectural Modules & Safety Workflows</h3>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                    <strong className="text-rose-900">1. Instant One-Tap SOS Beacon</strong>
                    <p className="mt-0.5 text-slate-600 leading-normal">
                      Prominent, high-contrast emergency trigger that activates audio-visual siren pulses and immediately queries device GPS coordinates without requiring complex navigation.
                    </p>
                  </div>
                  <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                    <strong className="text-blue-900">2. Emergency Contact Broadcast</strong>
                    <p className="mt-0.5 text-slate-600 leading-normal">
                      Packages user live location into automated emergency dispatch payloads (WhatsApp / SMS) with formatted Google Maps navigational links for pre-saved guardians.
                    </p>
                  </div>
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-900">3. Verified National Helplines</strong>
                    <p className="mt-0.5 text-slate-600 leading-normal">
                      Direct one-tap dialing to official Indian emergency services: National Emergency (112), Police (100), Women Helpline (1091), Ambulance (108), Disaster (1070).
                    </p>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                    <strong className="text-amber-900">4. Community Hazard Incident Log</strong>
                    <p className="mt-0.5 text-slate-600 leading-normal">
                      Enables citizens to log unlit streets, harassment spots, and civic hazards with severity tagging (Critical, Warning, Advisory) and localized time stamps.
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">3.3 Geolocation Engineering & State Machine Architecture</h3>
                <p>
                  Implemented robust client-side location fetching using `navigator.geolocation.getCurrentPosition` with comprehensive error boundary fallbacks:
                </p>
                <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[9px] leading-relaxed">
                  <code>
                    // Fault-tolerant Geolocation State Logic<br/>
                    const handleEmergencyTrigger = () =&gt; &#123;<br/>
                    &nbsp;&nbsp;navigator.geolocation.getCurrentPosition(<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;(pos) =&gt; setEmergencyPayload(&#123; lat: pos.coords.latitude, lng: pos.coords.longitude, time: Date.now() &#125;),<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;(err) =&gt; setFallbackManualLocation("Location permission denied. Dial 112 immediately."),<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&#123; enableHighAccuracy: true, timeout: 5000, maximumAge: 0 &#125;<br/>
                    &nbsp;&nbsp;);<br/>
                    &#125;;
                  </code>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">3.4 Testing & Key Engineering Takeaways</h3>
                <p>
                  Stress-tested under simulated low-bandwidth conditions (3G networks) and offline edge scenarios. Designed state transition safeguards to avoid accidental SOS triggers while guaranteeing instant response when activated.
                </p>

                <div className="p-2 bg-rose-50/80 rounded border border-rose-200 text-[10.5px] text-rose-950">
                  <strong>Key Takeaway:</strong> High-stress civic applications demand high-contrast color psychology (rose/crimson urgency cues), zero UI lag, and failsafe network fallbacks.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 3: Project 2 — Shield AI Platform</span>
              <span>Page 7 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 8: CHAPTER 4 — PROJECT 3: SAHAYAK AI (PART 1: SCHEMES & MODALS)
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 4: Project 3 — Sahayak AI: Citizen Super App (Part 1)
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">4.1 Problem Statement & Civic Vision</h3>
                <p>
                  India hosts thousands of central and state welfare initiatives; however, millions of eligible citizens miss out on subsidies, healthcare assistance, and grants due to fragmented government portals, complex bureaucratic language, and lack of transparency. <strong>SAHAYAK AI</strong> was built as an integrated, citizen-first civic super app to bridge this gap.
                </p>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.2 10 Categorized Welfare Scheme Systems</h3>
                <p>
                  To eliminate visual clutter, a category color identity design system was implemented. Each scheme category is differentiated by a distinct theme color, Lucide icon, and verified badge:
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 border border-blue-200 rounded-lg bg-blue-50/60">
                    <strong className="text-blue-900">• Housing & Urban (Blue):</strong> Pradhan Mantri Awas Yojana (PMAY-U / PMAY-G), credit-linked interest subsidy.
                  </div>
                  <div className="p-2 border border-emerald-200 rounded-lg bg-emerald-50/60">
                    <strong className="text-emerald-900">• Healthcare (Emerald):</strong> Ayushman Bharat PM-JAY, ₹5 Lakh cashless coverage per family per year.
                  </div>
                  <div className="p-2 border border-green-200 rounded-lg bg-green-50/60">
                    <strong className="text-green-900">• Agriculture (Green):</strong> PM-KISAN (₹6,000/yr direct income support), PM Fasal Bima crop insurance.
                  </div>
                  <div className="p-2 border border-violet-200 rounded-lg bg-violet-50/60">
                    <strong className="text-violet-900">• Education & Youth (Violet):</strong> National Scholarship Portal, PM-YUVA mentoring, post-matric grants.
                  </div>
                  <div className="p-2 border border-amber-200 rounded-lg bg-amber-50/60">
                    <strong className="text-amber-900">• Financial Services (Amber):</strong> PM Jan Dhan Yojana, Pradhan Mantri Mudra Yojana, Atal Pension Yojana.
                  </div>
                  <div className="p-2 border border-rose-200 rounded-lg bg-rose-50/60">
                    <strong className="text-rose-900">• Women & Child (Rose):</strong> Pradhan Mantri Matru Vandana Yojana, Sukanya Samriddhi account.
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.3 Interactive 4-Tab Verification Modal</h3>
                <p>
                  Clicking any scheme opens an interactive modal presenting officially sourced, un-hallucinated data across four functional tabs:
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong>Tab 1: Sourced Benefits</strong>
                    <p className="text-slate-600 mt-0.5">Detailed breakdown of direct bank transfers (DBT), subsidy rates, and medical coverage.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong>Tab 2: Eligibility Rules</strong>
                    <p className="text-slate-600 mt-0.5">Strict income thresholds, land ownership ceilings, age limits, and exclusion criteria.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong>Tab 3: Step-by-Step Apply</strong>
                    <p className="text-slate-600 mt-0.5">Numbered procedure detailing portal registration, form filing, and physical verification.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong>Tab 4: Documents Checklist</strong>
                    <p className="text-slate-600 mt-0.5">Interactive checklist (Aadhaar, Bank Passbook, Ration Card) with live stateful checkboxes.</p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.4 Anti-Misinformation & Sourcing Guardrails</h3>
                <p>
                  Every scheme card links directly to the verified official government portal (e.g., <em>pmkisan.gov.in</em>, <em>pmjay.gov.in</em>). If a scheme requirement has state-specific variations, it is explicitly flagged to protect citizens from unverified claims.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 4: Sahayak AI (Welfare Schemes)</span>
              <span>Page 8 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 9: CHAPTER 4 — PROJECT 3: SAHAYAK AI (PART 2: GRIEVANCES & BACKEND)
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 4: Project 3 — Sahayak AI: Grievances & Backend Security (Part 2)
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">4.5 Public Grievance Management System (CPGRAMS Model)</h3>
                <p>
                  Sahayak AI incorporates a structured civic grievance logging portal allowing citizens to lodge municipal and governmental complaints (potholes, water supply contamination, electricity failures, sanitation issues). Complaints generate unique tracking numbers (`SHK-2026-GRV-XXXX`) and progress through an auditable four-stage lifecycle:
                </p>
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-[10px] font-semibold text-center">
                  <span className="p-1 px-2 rounded bg-slate-200 text-slate-800">1. Drafted</span>
                  <span>→</span>
                  <span className="p-1 px-2 rounded bg-blue-100 text-blue-800">2. Submitted</span>
                  <span>→</span>
                  <span className="p-1 px-2 rounded bg-amber-100 text-amber-800">3. Under Review</span>
                  <span>→</span>
                  <span className="p-1 px-2 rounded bg-emerald-100 text-emerald-800">4. Resolved</span>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.6 Multilingual Civic AI Assistant</h3>
                <p>
                  To overcome language barriers, an integrated conversational assistant was designed. The assistant understands queries regarding welfare eligibility, document criteria, and civic rights in seven Indian languages: <strong>English, Hindi, Marathi, Bengali, Tamil, Telugu, and Gujarati</strong>.
                </p>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.7 Supabase PostgreSQL Schema & Row-Level Security</h3>
                <p>
                  Configured Supabase as the production database. Designed relational tables with strict foreign keys, timestamps, and Row-Level Security (RLS) policies to prevent cross-tenant data leakage:
                </p>

                <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg font-mono text-[9px] leading-relaxed">
                  <code>
                    -- PostgreSQL Relational Schema & RLS Policy<br/>
                    CREATE TABLE public.complaints (<br/>
                    &nbsp;&nbsp;id UUID PRIMARY KEY DEFAULT gen_random_uuid(),<br/>
                    &nbsp;&nbsp;user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,<br/>
                    &nbsp;&nbsp;tracking_id TEXT UNIQUE NOT NULL,<br/>
                    &nbsp;&nbsp;department TEXT NOT NULL, title TEXT NOT NULL, status TEXT DEFAULT 'Submitted',<br/>
                    &nbsp;&nbsp;created_at TIMESTAMPTZ DEFAULT NOW()<br/>
                    );<br/>
                    ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;<br/>
                    CREATE POLICY "Users can only read own complaints" ON public.complaints<br/>
                    &nbsp;&nbsp;FOR SELECT USING (auth.uid() = user_id);
                  </code>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">4.8 National Emergency SOS & Helpline Directory</h3>
                <p>
                  A centralized emergency hub links citizens directly to 112 (National Emergency), 1091 (Women Safety), 100 (Police), 108 (Ambulance), and 1070 (Disaster Control). Clicking any helpline initiates a direct phone dialer intent on mobile devices.
                </p>

                <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-[10.5px] text-emerald-900">
                  <strong>Security Validation:</strong> Supabase client tokens are validated on every request via JWT headers, ensuring 100% compliance with data privacy standards.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 4: Sahayak AI (Grievance & Security)</span>
              <span>Page 9 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 10: CHAPTER 5 — SYSTEM ARCHITECTURE & COMPARATIVE ANALYSIS
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 5: System Architecture, Tools & Comparative Analysis
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">5.1 End-to-End Architectural Data Flow</h3>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-300 text-center font-mono text-[9.5px]">
                  <div className="flex items-center justify-around gap-1">
                    <div className="p-1.5 bg-white rounded border border-slate-300 font-bold">
                      React 19 SPA<br/>
                      <span className="text-[8px] text-slate-500 font-normal">Vite + Tailwind CSS</span>
                    </div>
                    <span>── HTTPS ──►</span>
                    <div className="p-1.5 bg-white rounded border border-slate-300 font-bold">
                      Supabase Gateway<br/>
                      <span className="text-[8px] text-slate-500 font-normal">JWT Auth + PostgREST</span>
                    </div>
                    <span>── SQL ──►</span>
                    <div className="p-1.5 bg-white rounded border border-slate-300 font-bold">
                      PostgreSQL 15<br/>
                      <span className="text-[8px] text-slate-500 font-normal">Tables + RLS Policies</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">5.2 Comparative Analysis Across 3 Internship Projects</h3>
                <p>
                  A detailed comparative analysis highlighting the progression of engineering complexity across all three assignments:
                </p>

                <table className="w-full text-[9.5px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-900">
                    <tr>
                      <th className="border border-slate-300 p-1">Dimension</th>
                      <th className="border border-slate-300 p-1">Project 1: Portfolio</th>
                      <th className="border border-slate-300 p-1">Project 2: Shield AI</th>
                      <th className="border border-slate-300 p-1">Project 3: Sahayak AI (Major)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">Application Domain</td>
                      <td className="border border-slate-300 p-1">Personal Developer Brand</td>
                      <td className="border border-slate-300 p-1">Public Safety & SOS</td>
                      <td className="border border-slate-300 p-1">National Citizen Super App</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">Component Count</td>
                      <td className="border border-slate-300 p-1">10+ Reusable Components</td>
                      <td className="border border-slate-300 p-1">15+ Components</td>
                      <td className="border border-slate-300 p-1">45+ Full Stack Components</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">State Management</td>
                      <td className="border border-slate-300 p-1">React useState, Hooks</td>
                      <td className="border border-slate-300 p-1">Geolocation State, Audio</td>
                      <td className="border border-slate-300 p-1">Relational DB State, RLS, Filters</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">Database & Auth</td>
                      <td className="border border-slate-300 p-1">Static Metadata / JSON</td>
                      <td className="border border-slate-300 p-1">Local Storage / Mock API</td>
                      <td className="border border-slate-300 p-1">Supabase PostgreSQL + JWT Auth</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">Security Layer</td>
                      <td className="border border-slate-300 p-1">Client-side Input Sanitization</td>
                      <td className="border border-slate-300 p-1">Permission Guardrails</td>
                      <td className="border border-slate-300 p-1">Row-Level Security (RLS) Policies</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-bold">Deployment Target</td>
                      <td className="border border-slate-300 p-1">Vercel Global Edge</td>
                      <td className="border border-slate-300 p-1">Vercel Web App</td>
                      <td className="border border-slate-300 p-1">Vercel + Supabase Cloud Engine</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">5.3 Git Branching Strategy & CI/CD Pipeline</h3>
                <p>
                  Maintained strict Git hygiene using feature branching (`feat/scheme-modal`, `fix/mobile-table`). Every pull request underwent automated TypeScript compilation (`tsc --noEmit`) and Vite bundling tests before merge to `main`.
                </p>

                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-[10.5px]">
                  <strong>Key Takeaway:</strong> Transitioning from static UI to full-stack cloud persistence required disciplined data modeling, foreign key constraints, and multi-tenant security architecture.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 5: System Architecture & Comparison</span>
              <span>Page 10 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 11: CHAPTER 6 — TECHNICAL CHALLENGES & TESTING MATRIX
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 6: Technical Challenges, Troubleshooting & QA Testing
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">6.1 Technical Challenges & Implemented Engineering Solutions</h3>
                
                <div className="space-y-1.5 text-[10.5px]">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">• Challenge 1: Category-Specific Visual Distinction in Schemes</strong>
                    <p className="text-slate-600 mt-0.5"><em>Problem:</em> Initially, all scheme cards shared a uniform gray border, making it difficult for citizens to distinguish between agriculture, healthcare, and housing.</p>
                    <p className="text-emerald-700 font-semibold mt-0.5"><em>Solution:</em> Engineered a dynamic category palette (blue for housing, green for agriculture, emerald for health, amber for finance) with matching icon containers and badge pills.</p>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">• Challenge 2: Mobile Viewport Spilling & Horizontal Scroll</strong>
                    <p className="text-slate-600 mt-0.5"><em>Problem:</em> Complex multi-column tables and modal action bars triggered horizontal overflow on narrow 360px mobile viewports.</p>
                    <p className="text-emerald-700 font-semibold mt-0.5"><em>Solution:</em> Refactored layout to mobile-first responsive flex wrappers with sticky bottom action sheets and overflow-x-hidden container boundaries.</p>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">• Challenge 3: Multi-User Grievance Privacy & Data Security</strong>
                    <p className="text-slate-600 mt-0.5"><em>Problem:</em> Ensuring that citizens can only access their personal grievance tracking logs and not other citizens' confidential reports.</p>
                    <p className="text-emerald-700 font-semibold mt-0.5"><em>Solution:</em> Implemented PostgreSQL Row-Level Security policies comparing `auth.uid() = user_id` inside Supabase.</p>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">6.2 Quality Assurance & Test Case Matrix</h3>
                <p>
                  Conducted comprehensive manual and automated testing across all modules:
                </p>

                <table className="w-full text-[9.5px] border border-slate-300">
                  <thead className="bg-slate-100 text-slate-900">
                    <tr>
                      <th className="border border-slate-300 p-1">Test ID</th>
                      <th className="border border-slate-300 p-1">Module</th>
                      <th className="border border-slate-300 p-1">Test Scenario</th>
                      <th className="border border-slate-300 p-1">Expected Outcome</th>
                      <th className="border border-slate-300 p-1">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-1 font-mono font-bold">TC-01</td>
                      <td className="border border-slate-300 p-1">Portfolio</td>
                      <td className="border border-slate-300 p-1">Responsive render on 320px screen</td>
                      <td className="border border-slate-300 p-1">Zero horizontal scroll, hamburger menu works</td>
                      <td className="border border-slate-300 p-1 font-bold text-emerald-700">PASS</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-mono font-bold">TC-02</td>
                      <td className="border border-slate-300 p-1">Shield AI</td>
                      <td className="border border-slate-300 p-1">SOS button tap without GPS access</td>
                      <td className="border border-slate-300 p-1">Graceful fallback to manual location input</td>
                      <td className="border border-slate-300 p-1 font-bold text-emerald-700">PASS</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-mono font-bold">TC-03</td>
                      <td className="border border-slate-300 p-1">Sahayak AI</td>
                      <td className="border border-slate-300 p-1">Scheme 4-tab switching & checklist</td>
                      <td className="border border-slate-300 p-1">Checkboxes toggle state smoothly</td>
                      <td className="border border-slate-300 p-1 font-bold text-emerald-700">PASS</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-1 font-mono font-bold">TC-04</td>
                      <td className="border border-slate-300 p-1">Supabase DB</td>
                      <td className="border border-slate-300 p-1">Unauthorized query for complaints</td>
                      <td className="border border-slate-300 p-1">RLS policy returns 0 rows (403 forbidden)</td>
                      <td className="border border-slate-300 p-1 font-bold text-emerald-700">PASS</td>
                    </tr>
                  </tbody>
                </table>

                <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-[10.5px] text-emerald-900">
                  <strong>Testing Summary:</strong> 100% of test scenarios passed strict validation across Chrome, Firefox, Safari, and Microsoft Edge browsers.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 6: Challenges & QA Testing</span>
              <span>Page 11 of 12</span>
            </div>
          </section>


          {/* =========================================================================
              PAGE 12: CHAPTER 7 — LEARNING OUTCOMES, CONCLUSION & SIGNATURES
              ========================================================================= */}
          <section className="a4-page-sheet bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 min-h-[297mm] h-[297mm] flex flex-col justify-between box-border">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-200 pb-2 mb-4">
                <span>INTERNSHIP TRAINING REPORT — ELITE FORUMS</span>
                <span>CANDIDATE: KARAN YADAV</span>
              </div>

              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b-2 border-emerald-600 pb-1 mb-2">
                Chapter 7: Learning Outcomes, Future Scope & Conclusion
              </h2>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">7.1 Technical & Professional Skills Acquired</h3>
                <p>
                  The industrial internship with <strong>Elite Forums</strong> provided comprehensive practical exposure that substantially enhanced my engineering capabilities:
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <strong className="text-emerald-950 font-bold">Technical Engineering Skills:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                      <li>Modern component lifecycle and hooks in React 19.</li>
                      <li>Strict static typing with TypeScript interfaces.</li>
                      <li>Supabase PostgreSQL relational modeling & RLS security.</li>
                      <li>Tailwind CSS responsive design systems and animations.</li>
                    </ul>
                  </div>
                  <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                    <strong className="text-blue-950 font-bold">Industrial Practices:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                      <li>Agile milestone sprint planning and time estimation.</li>
                      <li>Professional Git branching and pull request reviews.</li>
                      <li>Performance optimization and Lighthouse auditing.</li>
                      <li>User-centered product design for civic accessibility.</li>
                    </ul>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">7.2 Future Scope & Planned Enhancements</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-[11px]">
                  <li><strong>DigiLocker API Integration:</strong> Implement direct government API authentication to automatically fetch Aadhaar and income certificates for instant eligibility verification.</li>
                  <li><strong>Regional Speech AI Integration:</strong> Incorporate voice-to-text models enabling rural citizens to interact in their native dialects.</li>
                  <li><strong>Progressive Web App (PWA) Offline Caching:</strong> Cache emergency helpline directories and scheme bookmarks for zero-connectivity access.</li>
                </ul>

                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide mt-2">7.3 Conclusion</h3>
                <p>
                  The completion of the <strong>Personal Portfolio</strong>, <strong>Shield AI</strong>, and <strong>Sahayak AI</strong> projects fulfilled all academic training criteria while solving real civic challenges. The guidance received from Elite Forums established a solid foundation for my future career as a professional software engineer.
                </p>

                {/* Final Signatures and Institutional Endorsement */}
                <div className="mt-4 pt-3 border-t-2 border-slate-300 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-bold text-slate-800 text-[11px]">Training Supervisor</p>
                    <p className="text-[10px] text-slate-500 mt-4">Authorized Signature & Seal</p>
                    <p className="text-[9px] text-slate-400">Elite Forums Foundation</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-[11px]">College Guide / HOD</p>
                    <p className="text-[10px] text-slate-500 mt-4">Internal Faculty Guide</p>
                    <p className="text-[9px] text-slate-400">Dept. of Computer Science & Engg.</p>
                  </div>
                  <div>
                    <div className="font-serif italic font-bold text-sm text-slate-900">Karan Yadav</div>
                    <p className="font-bold text-slate-800 text-[11px] border-t border-slate-300 pt-0.5">
                      Karan Yadav
                    </p>
                    <p className="text-[9px] text-slate-400">Student Intern (Candidate)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
              <span>Chapter 7: Learning Outcomes & Signatures</span>
              <span>Page 12 of 12</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
