-- =============================================
-- Shopify e-learning DB スキーマ
-- Supabase SQL Editor に貼り付けて実行してください
-- =============================================

-- 1. profiles テーブル（ユーザープロフィール）
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  current_phase int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. user_progress テーブル（学習進捗）
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  unit_id text not null,                       -- "P0-01" など
  status text not null default 'in_progress',  -- 'in_progress' | 'completed'
  quiz_score int,                              -- 0〜100（クイズ正解率）
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique (user_id, unit_id)
);

-- 3. RLS（Row Level Security）有効化
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;

-- 4. profiles ポリシー
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_insert" on public.profiles;
drop policy if exists "profiles_update" on public.profiles;

create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id);

-- 5. user_progress ポリシー
drop policy if exists "progress_select" on public.user_progress;
drop policy if exists "progress_insert" on public.user_progress;
drop policy if exists "progress_update" on public.user_progress;

create policy "progress_select" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update" on public.user_progress
  for update using (auth.uid() = user_id);

-- 6. 新規ユーザー登録時に profiles を自動作成するトリガー
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      'ゲスト'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
