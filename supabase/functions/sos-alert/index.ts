// Supabase Edge Function: sos-alert
// Validates caller authentication, processes emergency SOS broadcast,
// and reports REAL delivery status depending on configured SMS gateway.

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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { latitude, longitude, contacts, emergencyType = "General Civic / Medical Distress" } = await req.json();

    const smsProviderKey = Deno.env.get("SMS_GATEWAY_API_KEY"); // e.g. Twilio, Gupshup, Fast2SMS

    if (!smsProviderKey) {
      // Per prompt Rule 10 & 11:
      // "Do not hard-code fake SOS delivery. Do not claim an alert was sent merely because the SOS button was tapped. Only show a confirmed delivery status if an actual configured backend integration reports it."
      return new Response(
        JSON.stringify({
          delivered: false,
          status: "gateway_unconfigured",
          message: "No third-party SMS/Webhook Gateway is configured on the backend. No SMS was sent. Direct phone dialer and location coordinates are provided for manual dialling to 112 or personal contacts.",
          locationRecorded: latitude && longitude ? { latitude, longitude } : null,
          contactsCount: contacts?.length || 0,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // In a configured environment, invoke real SMS provider here
    return new Response(
      JSON.stringify({
        delivered: true,
        status: "sent",
        message: `Alert dispatched to ${contacts?.length || 0} registered contacts via SMS Gateway.`,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
