create table public.events (
  id uuid not null default gen_random_uuid(),
  title text not null,
  description text,
  date timestamp with time zone not null,
  location text not null,
  cover_image_url text,
  organizer_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  
  constraint events_pkey primary key (id)
);

create table public.ticket_tiers (
  id uuid not null default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  price numeric(10, 2) not null default 0,
  capacity integer not null,
  current_sold integer not null default 0,
  status text not null default 'active' check (status in ('active', 'paused', 'sold_out')),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  
  constraint ticket_tiers_pkey primary key (id)
);

alter table public.events enable row level security;
alter table public.ticket_tiers enable row level security;

-- Events Policies
create policy "Events are viewable by everyone." on public.events
  for select using (true);

create policy "Organizers can insert events." on public.events
  for insert with check (
    auth.uid() = organizer_id 
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'organizer')
  );

create policy "Organizers can update own events." on public.events
  for update using (
    auth.uid() = organizer_id
  );

create policy "Organizers can delete own events." on public.events
  for delete using (
    auth.uid() = organizer_id
  );

-- Ticket Tiers Policies
create policy "Ticket tiers are viewable by everyone." on public.ticket_tiers
  for select using (true);

create policy "Organizers can manage tiers of their own events." on public.ticket_tiers
  for all using (
    exists (
      select 1 from public.events
      where id = ticket_tiers.event_id and organizer_id = auth.uid()
    )
  );
