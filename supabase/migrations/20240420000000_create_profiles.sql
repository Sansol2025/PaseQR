create type public.user_role as enum ('user', 'organizer', 'scanner', 'pr');

create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  role public.user_role not null default 'user'::public.user_role,
  full_name text,
  email text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  
  constraint profiles_pkey primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Function to handle new user creation and profile syncing
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
