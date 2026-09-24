// 데이터 불러오기 → app.js 실행, 그리고 로그인 · 편집 기능
(function () {
  var cfg = window.APP_CONFIG || {};
  var hasSupabase = !!(cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase);
  var db = hasSupabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey) : null;
  var rowsById = {};

  function localToday() {
    var t = new Date();
    return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  }

  // Supabase 행 → 화면에서 쓰는 형태
  function toProject(r) {
    return {
      id: r.id, carModel: r.car_model, supplier: r.supplier, partNo: r.part_no, partName: r.part_name,
      step: r.step, openIssue: r.open_issue, supplyChain: r.supply_chain, issueGroup: r.issue_group,
      schedule: { protoStart: r.proto_start, p1Start: r.p1_start, p2Start: r.p2_start, mStart: r.m_start, sopStart: r.sop_start },
      checkpoints: { allTool: r.all_tool, fullTool: r.full_tool, audit: r.audit, fullCapa: r.full_capa },
      photos: [], volume: r.volume
    };
  }
  function toBom(rows) {
    var m = {};
    rows.forEach(function (r) {
      (m[r.car_model] = m[r.car_model] || []).push({
        level: r.level, variant: r.variant || '', partNo: r.part_no || '', partName: r.part_name || '',
        nc: r.nc || '', plant: r.plant || '', mb: r.mb || '', supplier: r.supplier || '', remark: r.remark || ''
      });
    });
    return m;
  }

  async function loadFromSupabase() {
    var a = await db.from('projects').select('*').order('sort_order').order('id');
    if (a.error) throw a.error;
    var b = await db.from('bom_items').select('*').order('car_model').order('sort_order');
    if (b.error) throw b.error;
    a.data.forEach(function (r) { rowsById[r.id] = r; });
    return { genDate: localToday(), projects: a.data.map(toProject), bom: toBom(b.data) };
  }

  function startApp(data, source) {
    window.__DATA = data;
    var tag = document.getElementById('srcTag');
    tag.textContent = source === 'live' ? 'LIVE' : 'DEMO';
    tag.title = source === 'live' ? 'Supabase에서 불러온 데이터' : '데모 데이터 (가명 처리)';
    var s = document.createElement('script');
    s.src = 'js/app.js';
    document.body.appendChild(s);
  }

  async function boot() {
    if (hasSupabase) {
      try { startApp(await loadFromSupabase(), 'live'); setupAuth(); return; }
      catch (e) { console.warn('Supabase 연결 실패, 데모 데이터로 표시합니다.', e); }
    }
    var demo = window.DEMO_DATA;
    startApp({ genDate: localToday(), projects: demo.projects, bom: demo.bom }, 'demo');
  }

  // ── 로그인 · 편집 ──
  function $(id) { return document.getElementById(id); }
  function show(id, on) { $(id).hidden = !on; }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]'); if (c) show(c.dataset.close, false);
    if (e.target.classList && e.target.classList.contains('modal-bg')) e.target.hidden = true;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { show('loginModal', false); show('editModal', false); }
  });

  async function refreshAuthButtons() {
    var s = await db.auth.getSession();
    var signed = !!(s.data && s.data.session);
    show('loginBtn', !signed); show('editBtn', signed); show('logoutBtn', signed);
  }

  function setupAuth() {
    refreshAuthButtons();
    $('loginBtn').onclick = function () { $('lgMsg').textContent = ''; show('loginModal', true); $('lgEmail').focus(); };
    $('logoutBtn').onclick = async function () { await db.auth.signOut(); refreshAuthButtons(); };
    $('loginForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      var r = await db.auth.signInWithPassword({ email: $('lgEmail').value.trim(), password: $('lgPw').value });
      if (r.error) { $('lgMsg').className = 'm-msg err'; $('lgMsg').textContent = '로그인하지 못했습니다. 이메일과 비밀번호를 확인해 주세요.'; return; }
      show('loginModal', false); refreshAuthButtons();
    });
    $('editBtn').onclick = openEditor;
    $('edPart').addEventListener('change', fillEditor);
    $('editForm').addEventListener('submit', saveEditor);
  }

  var F = [['edProto', 'proto_start'], ['edP1', 'p1_start'], ['edP2', 'p2_start'], ['edM', 'm_start'], ['edSop', 'sop_start'],
           ['edAll', 'all_tool'], ['edFull', 'full_tool'], ['edAudit', 'audit'], ['edCapa', 'full_capa']];
  var SCHEDULE_COLS = ['proto_start', 'p1_start', 'p2_start', 'm_start', 'sop_start'];

  function openEditor() {
    var sel = $('edPart'); sel.innerHTML = '';
    Object.values(rowsById).sort(function (a, b) { return (a.car_model + a.part_name).localeCompare(b.car_model + b.part_name); })
      .forEach(function (r) {
        var o = document.createElement('option'); o.value = r.id;
        o.textContent = r.car_model + ' · ' + (r.part_name || '') + ' · ' + r.supplier; sel.appendChild(o);
      });
    $('edMsg').textContent = ''; fillEditor(); show('editModal', true);
  }
  function fillEditor() {
    var r = rowsById[$('edPart').value]; if (!r) return;
    $('edStep').value = r.step || 'Proto';
    F.forEach(function (f) { $(f[0]).value = r[f[1]] || ''; });
    $('edHist').textContent = r.open_issue || '기록된 이슈가 없습니다.';
    $('edIssue').value = ''; $('edSame').checked = false;
  }
  async function saveEditor(e) {
    e.preventDefault();
    var msg = $('edMsg'); msg.className = 'm-msg'; msg.textContent = '저장 중…';
    var r = rowsById[$('edPart').value];
    var patch = { step: $('edStep').value };
    F.forEach(function (f) { patch[f[1]] = $(f[0]).value || null; });
    var add = $('edIssue').value.trim();
    if (add) {
      var t = new Date(); var stamp = '(' + String(t.getMonth() + 1).padStart(2, '0') + '/' + String(t.getDate()).padStart(2, '0') + ')';
      patch.open_issue = (r.open_issue ? r.open_issue + '\n\n' : '') + stamp + '\n' + add;
    }
    // 같은 이슈 묶음(issue_group)은 이슈를 함께 갱신
    var q1 = r.issue_group && patch.open_issue
      ? db.from('projects').update({ open_issue: patch.open_issue }).eq('issue_group', r.issue_group)
      : null;
    var own = await db.from('projects').update(patch).eq('id', r.id);
    if (own.error) { msg.className = 'm-msg err'; msg.textContent = '저장하지 못했습니다: ' + own.error.message; return; }
    if (q1) { var g = await q1; if (g.error) { msg.className = 'm-msg err'; msg.textContent = '같은 묶음 이슈 저장 실패: ' + g.error.message; return; } }
    if ($('edSame').checked) {
      var sched = {}; SCHEDULE_COLS.forEach(function (c) { sched[c] = patch[c]; });
      var s2 = await db.from('projects').update(sched).eq('car_model', r.car_model);
      if (s2.error) { msg.className = 'm-msg err'; msg.textContent = '같은 차종 일정 적용 실패: ' + s2.error.message; return; }
    }
    msg.className = 'm-msg ok'; msg.textContent = '저장했습니다. 화면을 새로 불러옵니다.';
    setTimeout(function () { location.reload(); }, 700);
  }

  boot();
})();
