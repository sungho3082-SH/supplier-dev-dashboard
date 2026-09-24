# 개발 현황 대시보드 (Supplier Development Dashboard)

협력사 부품 개발 일정(Proto → P1 → P2 → M → SOP)과 공정점검 이슈를 한 화면에서 관리하는 대시보드입니다.
자동차 열교환기 부품의 협력사 개발 업무를 하면서, 엑셀로 흩어져 있던 일정 · 이슈를 한눈에 보려고 직접 만들었습니다.

> 공개된 데이터는 데모용입니다. 차종(AA1~AA8) · 협력사(A~C) · 품번 · 공장명은 가명이고, 이슈 기록은 요약 · 일반화했습니다. 일정 날짜는 실제 흐름을 유지했습니다.

## 화면

| 탭 | 내용 |
| --- | --- |
| 홈 | 차종 · 업체별 일정 흐름과 최신 이슈 |
| 타임라인 | 차종별 Proto~SOP 마일스톤, All Tool · Full Tool · 공정감사 · Full CAPA 체크포인트, 다음 단계까지 D-day |
| BOM | 차종별 부품 구성 (레벨 트리, 검색) |
| 보드 | 협력사별 카드 · 날짜별 이슈 기록 |
| 요약 | 차종 · 업체 · 품번 · 단계 · 이슈 표 |

로그인하면 `편집` 버튼으로 단계, 일정, 체크포인트 날짜를 바꾸고 이슈를 추가할 수 있습니다.

## 어떻게 만들어 왔나

1. **HTML + Google Sheets (Apps Script)**: 화면은 HTML, 저장은 구글 시트. 여러 번 고쳐 가며 v10까지 사용
2. **Excel + PowerShell 생성기**: 회사망에서 구글이 막혀, 엑셀을 원본으로 두고 HTML을 생성하는 방식으로 전환 → [`legacy/`](legacy/)
3. **지금: 정적 웹 + Supabase + Vercel**: 어디서나 주소 하나로 열리고, 로그인한 사람만 수정

## 구조

```
index.html            화면 (HTML · CSS)
js/app.js             화면 그리기 (타임라인 · BOM · 보드 · 요약)
js/loader.js          데이터 불러오기, 로그인 · 편집
js/config.js          Supabase 주소 · 공개 키 (비우면 데모 데이터로 열림)
js/demo-data.js       가명 처리한 데모 데이터
supabase/schema.sql   테이블 · 권한(RLS)
supabase/seed.sql     데모 데이터 넣기
tools/excel_to_supabase.py   기존 엑셀 → Supabase용 SQL 변환
legacy/               이전 엑셀 방식
```

데이터 흐름: 브라우저 → Supabase(PostgreSQL)에서 읽기. 쓰기는 로그인한 사용자만 가능하도록 Row Level Security로 막았습니다.

---

## 직접 배포하기

### 1. GitHub에 올리기
1. github.com → New repository → 이름 예: `dev-status-dashboard` → Public → Create
2. `uploading an existing file` → 이 폴더의 파일 · 폴더 전부를 끌어다 놓기 → Commit changes

### 2. Supabase 만들기 (DB + 로그인)
1. supabase.com → Start your project → GitHub 계정으로 로그인
2. New project → 이름 입력, Database Password 설정(따로 보관), Region: **Northeast Asia (Seoul)** → Create
3. 왼쪽 **SQL Editor** → `supabase/schema.sql` 내용 붙여 넣고 **Run**
4. 다시 SQL Editor → `supabase/seed.sql` 붙여 넣고 **Run** (데모 데이터)
5. **Authentication → Users → Add user → Create new user**: 본인 이메일 · 비밀번호 (Auto Confirm 체크)
6. **Authentication → Sign In / Providers**: `Allow new users to sign up` 끄기 → 다른 사람은 가입 불가
7. **Project Settings → API Keys / Data API**: `Project URL`과 공개 키 복사
   (`anon public` 키, 또는 새 방식의 `Publishable key`(sb_publishable_…) 중 하나. 메뉴 이름은 Supabase 업데이트에 따라 조금 다를 수 있습니다)

### 3. 연결하기
`js/config.js`에 붙여 넣고 GitHub에서 저장(Commit):
```js
window.APP_CONFIG = {
  supabaseUrl: "https://xxxx.supabase.co",
  supabaseAnonKey: "eyJhbGciOi..."   // anon public 키
};
```
- anon 키는 공개돼도 되는 키입니다. 쓰기는 RLS 정책이 로그인 사용자로 제한합니다.
- `service_role` 키는 절대 넣지 마세요.

### 4. Vercel로 배포
1. vercel.com → GitHub 계정으로 로그인
2. **Add New → Project** → 방금 만든 저장소 **Import**
3. Framework Preset: **Other**, Build Command 비움, Output Directory 비움 → **Deploy**
4. 1분 뒤 `https://dev-status-dashboard.vercel.app` 같은 주소가 나옵니다
5. 이후 GitHub에 파일을 고쳐 Commit할 때마다 Vercel이 자동으로 다시 배포합니다

### 5. 확인
- 주소를 열면 상단 태그가 **LIVE**로 보이면 Supabase 연결 성공, **DEMO**면 config.js를 다시 확인
- `편집 로그인` → 5번에서 만든 계정으로 로그인 → `편집`으로 수정 → 저장 후 새로고침되면 반영

## 기존 엑셀 데이터를 옮기려면

```
pip install openpyxl
python tools/excel_to_supabase.py 개발현황.xlsx --map tools/anonymize.example.json
```
생성된 `projects.sql`을 SQL Editor에서 실행합니다. `--map`은 이름 바꾸기 표입니다(가명 처리용).
**회사 실제 데이터를 개인 클라우드에 올리는 것은 회사 보안 규정을 먼저 확인하세요.** 공개 저장소에는 가명 데이터만 두는 것을 권장합니다.
