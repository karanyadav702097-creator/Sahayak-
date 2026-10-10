-- SAHAYAK AI Migration: 001_initial_schema.sql
-- Production database schema with Row Level Security (RLS)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked with auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  email text not null,
  phone_number text,
  preferred_language text default 'en',
  state text,
  district text,
  locality text,
  role text default 'citizen' check (role in ('citizen', 'admin', 'supervisor')),
  notification_preferences jsonb default '{"email": true, "sms": false, "in_app": true, "scheme_updates": true}'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Profiles RLS
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    -- Prevent users from elevating themselves to admin
    and (role = (select role from public.profiles where id = auth.uid()) or (select role from public.profiles where id = auth.uid()) = 'admin')
  );

create policy "Admins can view all profiles"
  on public.profiles for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Automatic profile creation on auth.users insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, email, preferred_language, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'preferred_language', 'en'),
    'citizen'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. SCHEMES TABLE
create table if not exists public.schemes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  eligible_audience text not null,
  state_or_national text not null default 'National',
  eligibility_requirements jsonb not null default '[]'::jsonb,
  benefit_details text not null,
  required_documents text[] not null default '{}',
  application_procedure text not null,
  official_source_url text not null,
  last_verified_date date default current_date not null,
  publication_status text default 'published' check (publication_status in ('draft', 'published', 'archived')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.schemes enable row level security;

create policy "Anyone can read published schemes"
  on public.schemes for select
  using (publication_status = 'published');

create policy "Admins can manage all schemes"
  on public.schemes for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 3. SAVED SCHEMES (Bookmarks)
create table if not exists public.saved_schemes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  scheme_id uuid references public.schemes(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (user_id, scheme_id)
);

alter table public.saved_schemes enable row level security;

create policy "Users can view their own saved schemes"
  on public.saved_schemes for select
  using (auth.uid() = user_id);

create policy "Users can save schemes"
  on public.saved_schemes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their saved schemes"
  on public.saved_schemes for delete
  using (auth.uid() = user_id);


-- 4. COMPLAINTS (Citizen Grievance Management)
create table if not exists public.complaints (
  id uuid default uuid_generate_v4() primary key,
  reference_id text unique not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  category text not null,
  department text not null,
  description text not null,
  state text not null,
  district text not null,
  locality text,
  gps_latitude numeric(10, 7),
  gps_longitude numeric(10, 7),
  status text default 'submitted' check (status in ('draft', 'submitted', 'under_review', 'in_progress', 'resolved', 'rejected', 'closed')),
  submitted_to_gov_status boolean default false,
  official_portal_ref text,
  admin_notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.complaints enable row level security;

create policy "Users can view their own complaints"
  on public.complaints for select
  using (auth.uid() = user_id);

create policy "Users can submit complaints"
  on public.complaints for insert
  with check (auth.uid() = user_id);

create policy "Users can update their draft complaints"
  on public.complaints for update
  using (auth.uid() = user_id and status = 'draft')
  with check (auth.uid() = user_id);

create policy "Admins can view and manage all complaints"
  on public.complaints for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 5. COMPLAINT ATTACHMENTS
create table if not exists public.complaint_attachments (
  id uuid default uuid_generate_v4() primary key,
  complaint_id uuid references public.complaints(id) on delete cascade not null,
  file_name text not null,
  file_path text not null,
  file_size bigint not null,
  mime_type text not null,
  created_at timestamptz default now() not null
);

alter table public.complaint_attachments enable row level security;

create policy "Users can view attachments for their complaints"
  on public.complaint_attachments for select
  using (
    exists (
      select 1 from public.complaints c
      where c.id = complaint_id and c.user_id = auth.uid()
    )
  );

create policy "Users can insert attachments for their complaints"
  on public.complaint_attachments for insert
  with check (
    exists (
      select 1 from public.complaints c
      where c.id = complaint_id and c.user_id = auth.uid()
    )
  );

create policy "Admins can view all complaint attachments"
  on public.complaint_attachments for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 6. COMPLAINT STATUS HISTORY (Audit Trail)
create table if not exists public.complaint_status_history (
  id uuid default uuid_generate_v4() primary key,
  complaint_id uuid references public.complaints(id) on delete cascade not null,
  previous_status text,
  new_status text not null,
  change_notes text,
  changed_by uuid references public.profiles(id),
  created_at timestamptz default now() not null
);

alter table public.complaint_status_history enable row level security;

create policy "Users can view status history for their complaints"
  on public.complaint_status_history for select
  using (
    exists (
      select 1 from public.complaints c
      where c.id = complaint_id and c.user_id = auth.uid()
    )
  );

create policy "Admins can manage complaint status history"
  on public.complaint_status_history for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 7. CHAT CONVERSATIONS & MESSAGES (AI Civic Assistant)
create table if not exists public.chat_conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default 'Civic Assistance Inquiry',
  language text default 'en' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.chat_conversations enable row level security;

create policy "Users can manage their chat conversations"
  on public.chat_conversations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  sender text not null check (sender in ('user', 'assistant', 'system')),
  content text not null,
  citations jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

alter table public.chat_messages enable row level security;

create policy "Users can manage messages in their conversations"
  on public.chat_messages for all
  using (
    exists (
      select 1 from public.chat_conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.chat_conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );


-- 8. EMERGENCY CONTACTS (Citizen Personal Contacts for SOS)
create table if not exists public.emergency_contacts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  relationship text not null,
  phone_number text not null,
  is_primary boolean default false,
  created_at timestamptz default now() not null
);

alter table public.emergency_contacts enable row level security;

create policy "Users can manage their own emergency contacts"
  on public.emergency_contacts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- 9. VERIFIED HELPLINES (Public Civic Directory)
create table if not exists public.helplines (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  number text not null,
  category text not null,
  state_or_national text not null default 'National',
  official_source_url text,
  is_toll_free boolean default true,
  is_24x7 boolean default true,
  description text not null,
  verified_at date default current_date not null
);

alter table public.helplines enable row level security;

create policy "Anyone can read verified helplines"
  on public.helplines for select
  using (true);

create policy "Admins can manage helplines"
  on public.helplines for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 10. IN-APP NOTIFICATIONS
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text default 'info' check (type in ('info', 'complaint_update', 'scheme_alert', 'system')),
  read boolean default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now() not null
);

alter table public.notifications enable row level security;

create policy "Users can view and update their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can mark their notifications as read"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Admins can insert notifications"
  on public.notifications for insert
  with check ((select role from public.profiles where id = auth.uid()) = 'admin' or auth.uid() = user_id);


-- 11. ADMIN AUDIT LOGS
create table if not exists public.admin_audit_logs (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references public.profiles(id) not null,
  action text not null,
  target_type text not null,
  target_id text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz default now() not null
);

alter table public.admin_audit_logs enable row level security;

create policy "Admins can view and insert audit logs"
  on public.admin_audit_logs for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin');


-- 12. STORAGE BUCKET CONFIGURATION (for Supabase Storage)
insert into storage.buckets (id, name, public)
values ('complaint-evidence', 'complaint-evidence', false)
on conflict (id) do nothing;

create policy "Authenticated users can upload complaint evidence"
  on storage.objects for insert
  with check (
    bucket_id = 'complaint-evidence'
    and auth.role() = 'authenticated'
  );

create policy "Users can read own uploaded evidence and admins can read all"
  on storage.objects for select
  using (
    bucket_id = 'complaint-evidence'
    and (
      auth.uid()::text = (storage.foldername(name))[1]
      or (select role from public.profiles where id = auth.uid()) = 'admin'
    )
  );

-- Indexes for performance
create index if not exists idx_complaints_user_id on public.complaints(user_id);
create index if not exists idx_complaints_status on public.complaints(status);
create index if not exists idx_complaints_ref on public.complaints(reference_id);
create index if not exists idx_schemes_category on public.schemes(category);
create index if not exists idx_schemes_status on public.schemes(publication_status);
create index if not exists idx_saved_schemes_user on public.saved_schemes(user_id);
create index if not exists idx_chat_messages_conv on public.chat_messages(conversation_id);
create index if not exists idx_notifications_user on public.notifications(user_id);
