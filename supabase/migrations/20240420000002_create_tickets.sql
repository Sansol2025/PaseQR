create type public.ticket_status as enum ('valid', 'scanned', 'transferred', 'cancelled');

create table public.tickets (
  id uuid not null default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  tier_id uuid not null references public.ticket_tiers(id) on delete cascade,
  pr_id uuid references public.profiles(id) on delete set null,
  status public.ticket_status not null default 'valid'::public.ticket_status,
  price_paid numeric(10, 2) not null default 0,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  
  constraint tickets_pkey primary key (id)
);

alter table public.tickets enable row level security;

-- Ticket Policies
create policy "Users can view their own tickets." on public.tickets
  for select using (
    auth.uid() = user_id
  );

create policy "Users can update their own ticket (for transfer)." on public.tickets
  for update using (
    auth.uid() = user_id
  );

create policy "Organizers can view all tickets for their events." on public.tickets
  for select using (
    exists (
      select 1 from public.events
      where id = tickets.event_id and organizer_id = auth.uid()
    )
  );

-- Function for scanner application:
-- Scanners need to update the ticket status if they are assigned (or organizers)
create policy "Scanners can update tickets (set to scanned)." on public.tickets
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('scanner', 'organizer')
    )
  );
