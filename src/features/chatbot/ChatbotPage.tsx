import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useI18n } from '../../locales/i18nContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from '../../types';
import { IndiaFlag } from '../../components/common/IndiaFlag';
import { 
  Bot, 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ExternalLink,
  Languages
} from 'lucide-react';

const SUGGESTIONS = [
  'How do I apply for PM Awas Yojana (PMAY-U)?',
  'Who is eligible for Ayushman Bharat ₹5 Lakh health cover?',
  'What are the subsidy slabs for PM Surya Ghar rooftop solar?',
  'How do I file a municipal complaint for chronic sewage overflow?',
  'What documents are needed for Atal Pension Yojana?',
];

export const ChatbotPage: React.FC = () => {
  const { t, language } = useI18n();
  const { profile } = useAuth();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [input, setInput] = useState(initialQuery || '');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sahayak_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        content: t.chat.welcomeMsg,
        citations: [
          { title: 'National Portal of India', url: 'https://india.gov.in' },
          { title: 'myScheme Portal', url: 'https://myscheme.gov.in' },
        ],
        created_at: new Date().toISOString(),
      }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('sahayak_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Handle immediate send if initial query present in URL
  useEffect(() => {
    if (initialQuery && messages.length <= 1) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await generateCivicGuidance(query.trim(), language);
      
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: reply.content,
        citations: reply.citations,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: 'I encountered an error connecting with the assistant. Please refer to verified guidelines on india.gov.in or myscheme.gov.in.',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    const reset: ChatMessage[] = [
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        content: t.chat.welcomeMsg,
        created_at: new Date().toISOString(),
      }
    ];
    setMessages(reset);
    localStorage.setItem('sahayak_chat_history', JSON.stringify(reset));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-6 sm:py-8 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col space-y-4">
        
        {/* Header */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl flex items-center justify-between gap-4 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-1.5">
                  <IndiaFlag width={16} height={11} className="rounded-2xs" />
                  <span>{t.chat.title}</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Languages className="w-3 h-3 text-emerald-400" />
                  <span>8 Indian Languages</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official scheme rules, departmental contacts & grievance drafting
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer flex items-center gap-1 text-xs border border-slate-800"
            title={t.chat.clear}
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline text-xs">Clear</span>
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Civic Notice:</strong> {t.chat.disclaimer}
          </span>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl overflow-y-auto max-h-[550px] space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-xs shadow-md'
                    : 'bg-slate-950/80 text-slate-200 border border-slate-800 rounded-bl-xs'
                }`}>
                  <div className="whitespace-pre-line">
                    {msg.content}
                  </div>

                  {/* Citations if available */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Official Verification Sources:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cite, i) => (
                          <a
                            key={i}
                            href={cite.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 transition-colors"
                          >
                            <span>{cite.title}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isUser && (
                    <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Sahayak Civic Intelligence</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    {profile?.display_name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-400">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-400 ml-1">Analyzing official procedures...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(s)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-white whitespace-nowrap text-xs font-medium transition cursor-pointer shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-xl flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.inputPlaceholder}
            className="flex-1 px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden bg-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-40 ring-1 ring-emerald-400/30"
          >
            <span className="hidden sm:inline">{t.chat.send}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

// Rich Civic Knowledge Assistant Engine
async function generateCivicGuidance(query: string, lang: string): Promise<{ content: string; citations: Array<{ title: string; url: string }> }> {
  const q = query.toLowerCase();

  if (q.includes('awas') || q.includes('pmay') || q.includes('house')) {
    return {
      content: `### Pradhan Mantri Awas Yojana (PMAY-U / PMAY-G)\n\nPMAY provides central assistance to ensure every eligible family possesses a pucca house with basic civic amenities.\n\n**1. Eligibility Criteria:**\n- Annual income up to ₹3 Lakh (Economically Weaker Section - EWS) or ₹3L - ₹6L (Low Income Group - LIG).\n- Applicant or family members must NOT own a pucca house anywhere in India.\n- Property must be registered in the name of the female head or in joint ownership.\n\n**2. Key Benefits:**\n- Interest subsidy of up to ₹2.5 Lakhs on home loan or direct financial grant for construction.\n\n**3. Required Documents:**\n- Aadhaar Card, Income Certificate, Bank Passbook, Land Title/Possession receipt (for BLC), and an affidavit confirming non-ownership of pucca house.\n\n**4. Where to Apply:**\n- Online at pmaymis.gov.in or through your nearest Municipal Ward Office / Common Service Centre (CSC).`,
      citations: [
        { title: 'Official PMAY-Urban Portal', url: 'https://pmaymis.gov.in' },
        { title: 'myScheme PMAY Guide', url: 'https://www.myscheme.gov.in/schemes/pmay-u' },
      ],
    };
  }

  if (q.includes('ayushman') || q.includes('pmjay') || q.includes('health') || q.includes('5 lakh')) {
    return {
      content: `### Ayushman Bharat PM-JAY Healthcare Scheme\n\nAyushman Bharat PM-JAY is the world's largest health assurance initiative offering ₹5,00,000 cashless cover per family per year for secondary and tertiary care hospitalisation.\n\n**1. Who is Eligible?**\n- Beneficiary families identified under Socio-Economic Caste Census (SECC 2011).\n- **Senior Citizens Expansion (2024):** All senior citizens aged 70 years and above are eligible for a separate ₹5 Lakh annual top-up cover irrespective of income.\n\n**2. Empaneled Network:**\n- Valid across over 29,000 public and private empaneled hospitals across India.\n\n**3. How to Obtain Ayushman Card:**\n- Verify eligibility on mera.pmjay.gov.in using Aadhaar number and mobile OTP.\n- Visit the nearest Ayushman Mitra kiosk at any empaneled hospital or CSC to collect your PVC card.`,
      citations: [
        { title: 'Official PM-JAY Portal', url: 'https://pmjay.gov.in' },
        { title: 'Mera PM-JAY Eligibility Check', url: 'https://mera.pmjay.gov.in' },
      ],
    };
  }

  if (q.includes('surya') || q.includes('solar') || q.includes('electricity') || q.includes('bijli')) {
    return {
      content: `### PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)\n\nPM Surya Ghar enables residential households to install rooftop solar panels with direct central capital subsidy.\n\n**1. Subsidy Slabs:**\n- **1 kW System:** ₹30,000 Central Financial Assistance.\n- **2 kW System:** ₹60,000 Central Financial Assistance.\n- **3 kW or Higher:** Maximum ₹78,000 Central Financial Assistance.\n\n**2. Key Prerequisites:**\n- Active residential electricity consumer connection number.\n- Shadow-free roof space adequate for solar modules.\n- Equipment procured through DISCOM empaneled vendors using domestically made solar cells.\n\n**3. Application Steps:**\n- Register on pmsuryaghar.gov.in with your State, DISCOM, and Consumer Account Number.\n- Submit technical feasibility request and sign agreement with vendor. Subsidy is disbursed via DBT directly into your bank account after net-meter commissioning.`,
      citations: [
        { title: 'National PM Surya Ghar Portal', url: 'https://pmsuryaghar.gov.in' },
        { title: 'Ministry of New & Renewable Energy', url: 'https://mnre.gov.in' },
      ],
    };
  }

  if (q.includes('complaint') || q.includes('pothole') || q.includes('sewage') || q.includes('garbage') || q.includes('water')) {
    return {
      content: `### How to File a Civic Grievance in India\n\nPublic infrastructure issues (potholes, garbage, sewage overflow, broken streetlights) are handled primarily by your local Urban Local Body (ULB) / Municipal Corporation or DISCOM.\n\n**1. Recommended Hierarchy for Resolution:**\n- **Step 1:** Lodge a complaint in **Sahayak AI** to generate an AI-formatted formal petition and obtain a Reference ID (SHK-2025-XXXXX).\n- **Step 2:** File the drafted representation on your City Municipal Portal (e.g., BMC, MCD, PMC, BBMP) or mobile helpline.\n- **Step 3 (Escalation):** If unaddressed after 14 days, escalate to **CPGRAMS (pgportal.gov.in)**, the central government's apex public grievance redressal portal.\n\n**2. Helpful Evidence to Attach:**\n- Exact road/ward landmark, geotagged photos, and duration of the hazard.`,
      citations: [
        { title: 'Central CPGRAMS Portal', url: 'https://pgportal.gov.in' },
        { title: 'National Municipal Directory', url: 'https://www.india.gov.in/topics/governance-administration/local-governance' },
      ],
    };
  }

  // Default civic guidance response
  return {
    content: `Namaste! Regarding your query: "${query}"\n\nAs your civic assistant, here are the essential procedures:\n\n1. **Verification of Criteria:** Confirm whether the service falls under Central or State administrative jurisdiction.\n2. **Documentation Checklist:** Most public benefits require Aadhaar verification, proof of local residence, bank account seeded with Aadhaar, and relevant income/category certificates.\n3. **Official Portals:** Always submit applications only on verified \`.gov.in\` or \`.nic.in\` websites to protect yourself from phishing and unauthorized agent fees.\n\nWould you like me to draft a formal grievance letter for a municipal issue or check details for a specific welfare scheme like PMAY, PM-JAY, PM-KISAN, or PM Surya Ghar?`,
    citations: [
      { title: 'National Portal of India', url: 'https://india.gov.in' },
      { title: 'myScheme Portal', url: 'https://myscheme.gov.in' },
      { title: 'CPGRAMS Grievance Cell', url: 'https://pgportal.gov.in' },
    ],
  };
}
