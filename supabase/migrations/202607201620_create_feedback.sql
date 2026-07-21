create extension if not exists pgcrypto;

create table if not exists public.recommendation_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  helpful boolean not null,
  reasons text[] not null default '{}'::text[],
  comment text null,
  session_id text null,
  recipient text null,
  relationship text null,
  occasion text null,
  age_group text null,
  budget text null,
  interests text[] not null default '{}'::text[],
  personality text[] not null default '{}'::text[],
  recommendations jsonb not null default '[]'::jsonb,
  page_path text null,
  constraint recommendation_feedback_comment_length_check
    check (char_length(coalesce(comment, '')) <= 1000),
  constraint recommendation_feedback_helpful_reason_check
    check (
      (helpful = true and coalesce(array_length(reasons, 1), 0) = 0)
      or
      (helpful = false and coalesce(array_length(reasons, 1), 0) > 0)
    ),
  constraint recommendation_feedback_reason_values_check
    check (
      reasons <@ array[
        'too_generic',
        'too_expensive',
        'too_cheap',
        'wrong_interests',
        'wrong_age_group',
        'already_owns_it',
        'not_relevant',
        'other'
      ]::text[]
    ),
  constraint recommendation_feedback_recommendations_json_check
    check (jsonb_typeof(recommendations) = 'array')
);

comment on table public.recommendation_feedback is
  'Stores anonymous Ask2Gift recommendation feedback, limited quiz context, and non-sensitive recommendation summaries for quality improvement.';

comment on column public.recommendation_feedback.comment is
  'Optional anonymous comment. Users should not submit names, email addresses, addresses, or other sensitive information.';

alter table public.recommendation_feedback enable row level security;

revoke all on table public.recommendation_feedback from anon;
revoke all on table public.recommendation_feedback from authenticated;
revoke all on table public.recommendation_feedback from public;

grant usage on schema public to anon, authenticated;
grant insert on table public.recommendation_feedback to anon, authenticated;

drop policy if exists "allow anonymous recommendation feedback inserts" on public.recommendation_feedback;

create policy "allow anonymous recommendation feedback inserts"
on public.recommendation_feedback
for insert
to anon, authenticated
with check (
  char_length(coalesce(comment, '')) <= 1000
  and (
    (helpful = true and coalesce(array_length(reasons, 1), 0) = 0)
    or
    (helpful = false and coalesce(array_length(reasons, 1), 0) > 0)
  )
);
