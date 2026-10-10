// Supabase Edge Function: ai-assistant
// Handles civic queries, scheme questions, and multilingual citizen assistance.
// Supports server-side AI providers (Gemini, Groq) via server-side secrets.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_INSTRUCTION = `You are SAHAYAK AI (सहायक एआई), an official-standard digital civic assistant for Indian citizens.
Your mission is to provide accurate, respectful, and actionable guidance regarding:
1. Indian Government Schemes (Central and State).
2. Public service procedures (ration cards, voter IDs, electricity/water meters, birth/caste certificates, pensions).
3. Citizen grievance redressal mechanisms (CPGRAMS, Municipal Corporations, DISCOMs, Jal Boards).
4. Official helplines and verified government portals (ending in .gov.in or .nic.in).

CRITICAL DIRECTIVES:
- Language: Respond in the user's requested Indian language or matching their input language (supports English, Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Punjabi).
- Honesty & Transparency: You provide informational guidance only. You do NOT have the authority to grant benefits or officially submit government petitions.
- Official Sources: Whenever citing a scheme, recommend checking the official .gov.in portal.
- Tone: Empathetic, respectful, clear, and structured (use bullet points and bold headers).
- Safety & Exclusions: Never fabricate eligibility, never solicit Aadhaar OTP or bank PINs, and do not process specialized women-safety silent tracking or DigiLocker accounts.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { prompt, language = "en", conversationHistory = [] } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response(JSON.stringify({ error: "A valid prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (prompt.length > 2000) {
      return new Response(JSON.stringify({ error: "Prompt exceeds maximum length of 2000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine configured AI provider
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const groqKey = Deno.env.get("GROQ_API_KEY");

    let responseText = "";
    let providerUsed = "none";

    if (geminiKey) {
      providerUsed = "gemini";
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [
            ...conversationHistory.map((m: { sender: string; content: string }) => ({
              role: m.sender === "user" ? "user" : "model",
              parts: [{ text: m.content }],
            })),
            { role: "user", parts: [{ text: `[Language requested: ${language}] User query: ${prompt}` }] },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Gemini API error: ${res.statusText}`);
      }
      const data = await res.json();
      responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } else if (groqKey) {
      providerUsed = "groq";
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...conversationHistory.map((m: { sender: string; content: string }) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.content,
            })),
            { role: "user", content: `[Language: ${language}] ${prompt}` },
          ],
        }),
      });
      const data = await res.json();
      responseText = data.choices?.[0]?.message?.content || "No response generated.";
    } else {
      // Honest state fallback when no AI provider secret is configured yet
      return new Response(
        JSON.stringify({
          status: "unconfigured",
          provider: "none",
          message: "No AI Provider API key is configured in Supabase Edge Secrets. Please configure GEMINI_API_KEY or GROQ_API_KEY in Supabase project secrets to activate live AI civic assistant capabilities.",
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        response: responseText,
        provider: providerUsed,
        disclaimer: "AI-generated civic advice is for guidance only. Please verify scheme guidelines and application procedures on official government portals (.gov.in).",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
