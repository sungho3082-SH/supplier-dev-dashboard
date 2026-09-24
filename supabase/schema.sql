-- 개발 현황 대시보드: Supabase 테이블 + 권한(RLS)
-- Supabase 대시보드 > SQL Editor 에 붙여 넣고 Run 하세요.

-- 1) 부품별 개발 일정 · 이슈
create table if not exists projects (
  id            bigint generated always as identity primary key,
  car_model     text not null,            -- 차종
  supplier      text not null,            -- 협력사
  part_no       text,                     -- 품번
  part_name     text,                     -- 품명
  step          text,                     -- 현재 단계 (Proto / P1 / P2 / M / SOP)
  open_issue    text,                     -- 이슈 기록 (날짜별 누적)
  supply_chain  text,                     -- 공급 경로
  issue_group   text,                     -- 같은 이슈를 공유하는 부품 묶음 (엑셀 병합 셀)
  proto_start   date,
  p1_start      date,
  p2_start      date,
  m_start       date,
  sop_start     date,
  all_tool      date,                     -- 체크포인트
  full_tool     date,
  audit         date,
  full_capa     date,
  volume        integer,                  -- 연간 물량
  sort_order    integer default 0,
  updated_at    timestamptz default now()
);

-- 2) 차종별 BOM
create table if not exists bom_items (
  id          bigint generated always as identity primary key,
  car_model   text not null,
  level       integer not null default 1,
  variant     text,
  part_no     text,
  part_name   text,
  nc          text,      -- New / C/over
  plant       text,
  mb          text,      -- Make / Buy
  supplier    text,
  remark      text,
  sort_order  integer default 0
);

-- 3) 수정 시각 자동 기록
create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists trg_projects_touch on projects;
create trigger trg_projects_touch before update on projects
for each row execute function touch_updated_at();

-- 4) 권한: 누구나 읽기 가능, 쓰기는 로그인한 사용자만
alter table projects  enable row level security;
alter table bom_items enable row level security;

drop policy if exists "read all projects" on projects;
create policy "read all projects" on projects for select using (true);
drop policy if exists "write projects when signed in" on projects;
create policy "write projects when signed in" on projects for all
  to authenticated using (true) with check (true);

drop policy if exists "read all bom" on bom_items;
create policy "read all bom" on bom_items for select using (true);
drop policy if exists "write bom when signed in" on bom_items;
create policy "write bom when signed in" on bom_items for all
  to authenticated using (true) with check (true);

-- ※ Authentication > Sign In / Providers 에서 "Allow new users to sign up" 을 끄고,
--   Users 메뉴에서 본인 계정만 직접 만들면 편집 권한은 본인에게만 있습니다.
