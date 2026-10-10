// Supabase Edge Function: draft-complaint
// Takes raw user grievance notes and produces a formal, structured civic complaint letter
// formatted for Indian Municipal / State grievance portals.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { title, rawDescription, category, department, locality, district, state } = await req.json();

    if (!rawDescription || rawDescription.trim().length < 5) {
      return new Response(JSON.stringify({ error: "Description must be at least 5 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const groqKey = Deno.env.get("GROQ_API_KEY");

    const prompt = `Draft a formal, respectful citizen grievance letter addressed to the competent authority based on the following details:
Category: ${category || 'Civic Infrastructure'}
Department: ${department || 'Municipal Corporation / Local Administration'}
Location: ${locality || 'Local Area'}, ${district || 'District'}, ${state || 'State'}
Subject / Issue: ${title || 'Citizen Grievance'}
Citizen's Raw Notes: "${rawDescription}"

Format the output clearly:
1. Formal Subject Line
2. Respected Authority address block
3. Clear chronological statement of facts and civic hazard/inconvenience
4. Specific relief requested (e.g. inspection, repair, garbage clearance, meter rectification)
5. Polite closing with contact commitment

Do not fabricate reference numbers or false claim dates.`;

    let draftedLetter = "";

    if (geminiKey) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
      const data = await res.json();
      draftedLetter = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } else if (groqKey) {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      draftedLetter = data.choices?.[0]?.message?.content || "";
    } else {
      // Return structured client fallback format with honest disclosure
      draftedLetter = `To,\nThe Executive Officer / Competent Authority,\n${department || 'Municipal Administration'},\n${district || 'Local District'}, ${state || 'State'}\n\nSubject: Formal grievance regarding ${title || 'Civic Issue in ' + (locality || 'Local Area')}\n\nRespected Sir/Madam,\n\nI am writing to draw your urgent attention to the persistent civic issue regarding ${category || 'civic services'} at ${locality || 'our area'}, ${district || ''}.\n\nDetails of the issue:\n${rawDescription}\n\nThis is causing significant daily inconvenience and public hazard to local residents and commuters. I request your esteemed office to inspect the site and initiate necessary remedial action at the earliest.\n\nThanking you,\nA Concerned Citizen`;
    }

    return new Response(JSON.stringify({ draftedLetter }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
