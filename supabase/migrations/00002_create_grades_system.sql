-- Tabela de configuração de avaliação
create table if not exists grade_config (
  id uuid primary key default gen_random_uuid(),
  passing_grade decimal(3,2) not null default 0.60,
  assignments_weight decimal(4,3) not null default 0.250,
  exams_weight decimal(4,3) not null default 0.400,
  group_activities_weight decimal(4,3) not null default 0.150,
  quizzes_weight decimal(4,3) not null default 0.200,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint weights_sum_100 check (
    assignments_weight + exams_weight + group_activities_weight + quizzes_weight = 1.000
  )
);

-- Tabela de trabalhos/atividades
create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  title text not null,
  grade decimal(5,2) not null check (grade >= 0 and grade <= 10),
  weight decimal(4,3) not null default 1.000,
  delivered boolean default true,
  delivery_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela de provas
create table if not exists exams (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  title text not null,
  grade decimal(5,2) not null check (grade >= 0 and grade <= 10),
  weight decimal(4,3) not null default 1.000,
  exam_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela de atividades em grupo
create table if not exists group_activities (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  title text not null,
  grade decimal(5,2) not null check (grade >= 0 and grade <= 10),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabela de notas de questionários
create table if not exists quiz_grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  quiz_title text not null,
  correct_answers integer not null default 0,
  total_questions integer not null,
  grade decimal(5,2) generated always as (
    case 
      when total_questions > 0 then (correct_answers::decimal / total_questions::decimal) * 10
      else 0
    end
  ) stored,
  created_at timestamptz default now()
);

-- Tabela de média final do aluno
create table if not exists student_final_grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid unique not null references students(id) on delete cascade,
  assignments_avg decimal(5,2) default 0,
  exams_avg decimal(5,2) default 0,
  group_activities_avg decimal(5,2) default 0,
  quizzes_avg decimal(5,2) default 0,
  final_grade decimal(5,2) default 0,
  status text check (status in ('Aprovado', 'Reprovado', 'Pendente')) default 'Pendente',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Inserir configuração padrão
insert into grade_config (passing_grade, assignments_weight, exams_weight, group_activities_weight, quizzes_weight)
values (0.60, 0.250, 0.400, 0.150, 0.200)
on conflict do nothing;

-- Índices para performance
create index if not exists idx_assignments_student on assignments(student_id);
create index if not exists idx_exams_student on exams(student_id);
create index if not exists idx_group_activities_student on group_activities(student_id);
create index if not exists idx_quiz_grades_student on quiz_grades(student_id);
create index if not exists idx_final_grades_student on student_final_grades(student_id);

-- RLS Policies
alter table grade_config enable row level security;
alter table assignments enable row level security;
alter table exams enable row level security;
alter table group_activities enable row level security;
alter table quiz_grades enable row level security;
alter table student_final_grades enable row level security;

-- Políticas de leitura (todos podem ler)
create policy "Anyone can read grade config" on grade_config for select using (true);
create policy "Anyone can read assignments" on assignments for select using (true);
create policy "Anyone can read exams" on exams for select using (true);
create policy "Anyone can read group activities" on group_activities for select using (true);
create policy "Anyone can read quiz grades" on quiz_grades for select using (true);
create policy "Anyone can read final grades" on student_final_grades for select using (true);

-- Políticas de escrita (todos podem escrever)
create policy "Anyone can insert grade config" on grade_config for insert with check (true);
create policy "Anyone can update grade config" on grade_config for update using (true);
create policy "Anyone can insert assignments" on assignments for insert with check (true);
create policy "Anyone can update assignments" on assignments for update using (true);
create policy "Anyone can delete assignments" on assignments for delete using (true);
create policy "Anyone can insert exams" on exams for insert with check (true);
create policy "Anyone can update exams" on exams for update using (true);
create policy "Anyone can delete exams" on exams for delete using (true);
create policy "Anyone can insert group activities" on group_activities for insert with check (true);
create policy "Anyone can update group activities" on group_activities for update using (true);
create policy "Anyone can delete group activities" on group_activities for delete using (true);
create policy "Anyone can insert quiz grades" on quiz_grades for insert with check (true);
create policy "Anyone can update quiz grades" on quiz_grades for update using (true);
create policy "Anyone can delete quiz grades" on quiz_grades for delete using (true);
create policy "Anyone can insert final grades" on student_final_grades for insert with check (true);
create policy "Anyone can update final grades" on student_final_grades for update using (true);