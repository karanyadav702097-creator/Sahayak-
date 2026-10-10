// Supabase Edge Function: admin-actions
// Validates caller has 'admin' role in profiles table, performs state mutations
// with audit log entries and prevents unauthorized privilege escalation.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

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
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Supabase service credentials not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify token & caller
    const jwt = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid user session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check user profile role in DB
    const { data: profile, error: profError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profError || !profile || profile.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: Admin privileges required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, payload } = await req.json();

    if (action === "update_complaint_status") {
      const { complaintId, newStatus, changeNotes } = payload;
      
      // Fetch old status
      const { data: existingComplaint } = await supabase
        .from("complaints")
        .select("status, user_id")
        .eq("id", complaintId)
        .single();

      if (!existingComplaint) {
        return new Response(JSON.stringify({ error: "Complaint not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Update complaint
      await supabase
        .from("complaints")
        .update({ status: newStatus, admin_notes: changeNotes, updated_at: new Date().toISOString() })
        .eq("id", complaintId);

      // Insert audit history
      await supabase
        .from("complaint_status_history")
        .insert({
          complaint_id: complaintId,
          previous_status: existingComplaint.status,
          new_status: newStatus,
          change_notes: changeNotes,
          changed_by: user.id,
        });

      // Insert notification for the citizen
      await supabase
        .from("notifications")
        .insert({
          user_id: existingComplaint.user_id,
          title: `Complaint Status Updated: ${newStatus.toUpperCase()}`,
          message: `Your complaint status has changed to "${newStatus}". Officer remarks: ${changeNotes || "Under review by municipal desk."}`,
          type: "complaint_update",
          metadata: { complaintId, newStatus },
        });

      return new Response(JSON.stringify({ success: true, updatedStatus: newStatus }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unrecognized admin action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
