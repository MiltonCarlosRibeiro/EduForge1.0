-- Tabela de estudantes
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique,
  registration_number text unique,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices
create index if not exists idx_students_email on students(email);
create index if not exists idx_students_registration on students(registration_number);

-- RLS
alter table students enable row level security;

create policy "Anyone can read students" on students for select using (true);
create policy "Anyone can insert students" on students for insert with check (true);
create policy "Anyone can update students" on students for update using (true);
create policy "Anyone can delete students" on students for delete using (true);