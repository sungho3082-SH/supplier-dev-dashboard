// 데이터는 js/loader.js 가 Supabase(또는 데모 데이터)에서 불러와 window.__DATA 에 넣어 둡니다.
const GEN_DATE=window.__DATA.genDate;
const PROJECTS=window.__DATA.projects;
const BOM=window.__DATA.bom;

const CAR_PAL=['#4f46e5','#0ea5e9','#0d9488','#f59e0b','#e11d48','#db2777','#7c3aed','#65a30d','#0891b2','#ca8a04'];
const carColor={}; let _ci=0;
PROJECTS.forEach(p=>{ if(!(p.carModel in carColor)){ carColor[p.carModel]=CAR_PAL[_ci%CAR_PAL.length]; _ci++; } });

const STAGE=[{k:'proto',n:'Proto',v:'var(--proto)'},{k:'p1',n:'P1',v:'var(--p1)'},{k:'p2',n:'P2',v:'var(--p2)'},{k:'m',n:'M',v:'var(--m)'},{k:'sop',n:'SOP',v:'var(--sop)'}];
const STAGE_STYLE={proto:['#dff6fb','#0e7490'],p1:['#d7f5ef','#0f766e'],p2:['#dcfce7','#15803d'],m:['#eef9d5','#4d7c0f'],sop:['#fbf1cf','#a16207'],none:['#f0f2f5','#6b7280']};
const today=new Date(GEN_DATE+"T00:00:00");
const GS=new Date("2024-07-01T00:00:00"), GE=new Date("2027-06-30T23:59:59"), GT=GE-GS;
function d(s){return s?new Date(s+"T00:00:00"):null;}
function addD(x,n){const y=new Date(x);y.setDate(y.getDate()+n);return y;}
function fmtD(dt){return dt?`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`:'';}
function pct(dt){return((dt-GS)/GT)*100;}
function daysUntil(dt){return Math.ceil((dt-today)/86400000);}
function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function stagesOf(p){
  const raw=STAGE.map(s=>({...s,start:p.schedule&&p.schedule[s.k+'Start']?d(p.schedule[s.k+'Start']):null}));
  const active=raw.filter(s=>s.start);
  for(let i=0;i<active.length;i++){
    active[i].end = active[i].n==='SOP'?addD(active[i].start,100) : i===active.length-1?addD(active[i].start,45) : addD(active[i+1].start,-1);
  }
  return {raw,active};
}
function currentStage(active){
  if(!active.length) return {key:null,label:'-'};
  const t=today.getTime();
  if(t<active[0].start.getTime()) return {key:null,label:'예정'};
  if(t>active[active.length-1].end.getTime()) return {key:null,label:'완료'};
  for(const s of active){ if(t>=s.start.getTime()&&t<=s.end.getTime()) return {key:s.k,label:s.n}; }
  return {key:null,label:'-'};
}
function stagePillHtml(cur){
  const [bg,fg]=STAGE_STYLE[cur.key||'none'];
  return `<span class="step-pill" style="background:${bg};color:${fg}">${cur.label}</span>`;
}

// ════ Timeline ════
let curSup="전체", curCar="전체", selId=null;
function suppliers(){const m={};PROJECTS.forEach(p=>m[p.supplier]=(m[p.supplier]||0)+1);return m;}
function carModels(){const src=curSup==="전체"?PROJECTS:PROJECTS.filter(p=>p.supplier===curSup);const m={};src.forEach(p=>m[p.carModel]=(m[p.carModel]||0)+1);return m;}

// ── 마일스톤 헬퍼 ──
const MS_STAGE=[['proto','Proto',0],['p1','P1',.25],['p2','P2',.5],['m','M',.75],['sop','SOP',1]];
const MS_STEPV={proto:'var(--proto)',p1:'var(--p1)',p2:'var(--p2)',m:'var(--m)',sop:'var(--sop)'};
const MS_STEPK={Proto:'proto',P1:'p1',P2:'p2',M:'m',SOP:'sop'};
const MS_CKD=[['allTool','All Tool'],['fullTool','Full Tool'],['audit','공정감사'],['fullCapa','Full CAPA']];
function msMD(x){return x?`${x.getMonth()+1}/${x.getDate()}`:'';}
function msL(pos){return `calc(26px + (100% - 42px) * ${pos})`;}
function msPos(dt,nodes){const a=nodes.filter(n=>n.start);if(!a.length)return 0;if(dt<=a[0].start)return a[0].pos;for(let i=0;i<a.length-1;i++){if(dt>=a[i].start&&dt<=a[i+1].start)return a[i].pos+(a[i+1].pos-a[i].pos)*((dt-a[i].start)/(a[i+1].start-a[i].start));}return a[a.length-1].pos;}
function chipRow(id,map,cur,cb){
  const box=document.getElementById(id);box.innerHTML='';
  Object.keys(map).forEach(k=>{const c=document.createElement('div');c.className='chip'+(k===cur?' on':'');c.innerHTML=`${k}<span class="c">${map[k]}</span>`;c.onclick=()=>cb(k);box.appendChild(c);});
}
let tlOpen={};
function renderTimeline(){
  chipRow('chips',Object.assign({"전체":PROJECTS.length},suppliers()),curSup,v=>{curSup=v;curCar="전체";renderTimeline();});
  const cars=carModels();const ct=Object.values(cars).reduce((a,b)=>a+b,0);
  chipRow('carChips',Object.assign({"전체":ct},cars),curCar,v=>{curCar=v;renderTimeline();});
  const list=PROJECTS.filter(p=>(curSup==="전체"||p.supplier===curSup)&&(curCar==="전체"||p.carModel===curCar));
  document.getElementById('stTotal').textContent=list.length;
  document.getElementById('stCar').textContent=new Set(list.map(p=>p.carModel)).size;
  let sop=0;list.forEach(p=>{const s=p.schedule&&p.schedule.sopStart?d(p.schedule.sopStart):null;if(s){const u=daysUntil(s);if(u>=0&&u<=90)sop++;}});
  document.getElementById('stSop').textContent=sop;

  const card=document.getElementById('tlCard');card.innerHTML='';
  if(!list.length){card.innerHTML='<div class="empty">해당 조건의 데이터가 없습니다.</div>';return;}
  const groups={};list.forEach(p=>{(groups[p.carModel]=groups[p.carModel]||[]).push(p);});
  Object.keys(groups).forEach(cm=>{
    const parts=groups[cm];const sc=parts[0].schedule;const col=carColor[cm];
    const nodes=MS_STAGE.map(s=>({k:s[0],n:s[1],pos:s[2],start:sc&&sc[s[0]+'Start']?d(sc[s[0]+'Start']):null}));
    const act=nodes.filter(n=>n.start);
    let curGI=-1;nodes.forEach((n,i)=>{if(n.start&&n.start<=today)curGI=i;});
    const tp=act.length?msPos(today,nodes):0;
    let flow='<div class="flow"><div class="rail"></div>';
    // flow 별표: 단계 시작 시 진하게 (보기용, 날짜 없음)
    const cks=ckDates(parts);
    const FLOWCHK=[['All Tool',.375,'p1','allTool'],['Full Tool',.625,'p2','fullTool'],['공정감사',.70,'p2','audit'],['Full CAPA',.84,'m','fullCapa']];
    FLOWCHK.forEach(([lb,pos,ph,ck])=>{const ps=sc&&sc[ph+'Start']?d(sc[ph+'Start']):null;const past=ps&&ps<=today;const cd=cks[ck];
      flow+=`<div class="fchk${past?'':' future'}" style="left:${msL(pos)}"><div class="flbl"><div class="fd">${cd?msMD(cd):''}</div><div class="fl">${lb}</div></div><div class="st">★</div></div>`;});
    // 단계 원
    nodes.forEach((nd,i)=>{const skip=!nd.start;let cls='circ';if(skip){cls+=' skip';}else{if(nd.start<=today)cls+=' done';if(i===curGI)cls+=' cur';}
      flow+=`<div class="${cls}" style="left:${msL(nd.pos)};--c:var(--nav)"></div>`;
      flow+=`<div class="stg${skip?' skip':''}" style="left:${msL(nd.pos)}"><div class="sd">${skip?'—':msMD(nd.start)}</div><div class="sl">${nd.n}</div></div>`;});
    // 오늘 마커 + 다음단계 D-day
    let nextTxt='';
    if(!act.length){nextTxt='일정 미정';}
    else{
      const nxt=nodes.find(n=>n.start&&n.start>today);
      if(today<act[0].start){nextTxt=`${act[0].n}까지 D-${daysUntil(act[0].start)}`;flow+=`<div class="tdmark" style="left:${msL(tp)}"><div class="dd">D-${daysUntil(act[0].start)}</div><div class="tri">▶</div></div>`;}
      else if(nxt){nextTxt=`${nxt.n}까지 D-${daysUntil(nxt.start)}`;flow+=`<div class="tdmark" style="left:${msL(tp)}"><div class="dd">D-${daysUntil(nxt.start)}</div><div class="tri">▶</div></div>`;}
      else{nextTxt='SOP 단계';flow+=`<div class="tdmark" style="left:${msL(1)}"><div class="tri">▶</div></div>`;}
    }
    flow+='</div>';
    const sups=[...new Set(parts.map(p=>p.supplier))].join('/');
    const volTxt=parts[0].volume?Number(parts[0].volume).toLocaleString()+'/년':'-';
    let det='<table class="ptable">';
    parts.forEach(p=>{const sk=MS_STEPK[p.step]||'p1';const ch=p.supplyChain||'';
      const ckHtml=MS_CKD.map(([k,lb])=>{const v=p.checkpoints?p.checkpoints[k]:null;const dt=v?d(v):null;const done=!!dt;return `<span class="ck ${done?'on':'off'}">${lb}${done?' '+msMD(dt):''}</span>`;}).join('');
      det+=`<tr><td class="pno">${p.partNo||'-'}</td><td class="pnm">${escapeHtml(p.partName||'-')}</td><td class="psup">${escapeHtml(p.supplier||'')}</td><td class="pvol">${volTxt}</td><td class="pchain">${ch?'🔗 '+escapeHtml(ch):''}</td><td><span class="tstep" style="background:${MS_STEPV[sk]}22;color:${MS_STEPV[sk]}">${p.step||'-'}</span></td><td class="pck">${ckHtml}</td><td class="prec">${p.openIssue?'<span class="iss">기록</span>':''}</td><td style="width:100%"></td></tr>`;});
    det+='</table>';
    const open=!!tlOpen[cm];
    const doneAll=curGI>=0&&!nodes.slice(curGI+1).find(n=>n.start);
    const row=document.createElement('div');row.className='crow'+(open?' open':'');
    row.innerHTML=`<div class="chead"><div class="cbar" style="background:${col}"></div><div class="cinfo"><div class="cm"><span class="tri">▶</span>${cm}</div><div class="meta">${parts.length}개 · ${sups}</div><div class="nx${doneAll?' done':''}">${nextTxt}</div></div><div class="cflow">${flow}</div></div><div class="cdetail">${det}</div>`;
    row.querySelector('.chead').onclick=()=>{tlOpen[cm]=!tlOpen[cm];renderTimeline();};
    card.appendChild(row);
  });
}

// ════ 홈 / 개요 ════
// 차종 대표 체크포인트 날짜 = 그 차종 부품들 중 가장 빠른 날짜
function ckDates(parts){
  const out={};
  ['allTool','fullTool','audit','fullCapa'].forEach(k=>{ let best=null;
    (parts||[]).forEach(p=>{const v=p.checkpoints?p.checkpoints[k]:null;if(v){const dt=d(v);if(!best||dt<best)best=dt;}});
    out[k]=best; });
  return out;
}
function homeL(p){return `calc(8px + (100% - 18px) * ${p})`;}
function homeFlowHtml(cm,sc,parts){
  const nodes=MS_STAGE.map(s=>({k:s[0],n:s[1],pos:s[2],start:sc&&sc[s[0]+'Start']?d(sc[s[0]+'Start']):null}));
  const act=nodes.filter(n=>n.start);let curGI=-1;nodes.forEach((n,i)=>{if(n.start&&n.start<=today)curGI=i;});
  const tp=act.length?msPos(today,nodes):0;
  let flow='<div class="h-flow"><div class="h-rail"></div>';
  const cks=ckDates(parts);
  const FC=[['AT',.375,'p1','allTool'],['FT',.625,'p2','fullTool'],['감사',.70,'p2','audit'],['CAPA',.84,'m','fullCapa']];
  FC.forEach(([lb,p,ph,ck])=>{const ps=sc&&sc[ph+'Start']?d(sc[ph+'Start']):null;const past=ps&&ps<=today;const cd=cks[ck];
    flow+=`<div class="h-fchk${past?'':' future'}" style="left:${homeL(p)}"><div class="h-flbl"><div class="h-fd">${cd?msMD(cd):''}</div><div class="h-fl">${lb}</div></div><div class="h-st">★</div></div>`;});
  nodes.forEach((nd,i)=>{const sk=!nd.start;let cls='h-circ';if(sk){cls+=' skip';}else{if(nd.start<=today)cls+=' done';if(i===curGI)cls+=' cur';}
    flow+=`<div class="${cls}" style="left:${homeL(nd.pos)};--c:var(--nav)"></div>`;
    flow+=`<div class="h-stg${sk?' skip':''}" style="left:${homeL(nd.pos)}"><div class="h-sd">${sk?'—':msMD(nd.start)}</div><div class="h-sl">${nd.n}</div></div>`;});
  const nxt=nodes.find(n=>n.start&&n.start>today);let nx='';
  if(!act.length)nx='미정';
  else if(today<act[0].start){nx=`${act[0].n} D-${daysUntil(act[0].start)}`;flow+=`<div class="h-tdmark" style="left:${homeL(tp)}"><div class="h-dd">D-${daysUntil(act[0].start)}</div><div class="h-tri">▶</div></div>`;}
  else if(nxt){nx=`${nxt.n} D-${daysUntil(nxt.start)}`;flow+=`<div class="h-tdmark" style="left:${homeL(tp)}"><div class="h-dd">D-${daysUntil(nxt.start)}</div><div class="h-tri">▶</div></div>`;}
  else{nx='SOP';flow+=`<div class="h-tdmark" style="left:${homeL(1)}"><div class="h-tri">▶</div></div>`;}
  flow+='</div>';
  const done=curGI>=0&&!nodes.slice(curGI+1).find(n=>n.start);
  return {flow,nx,done};
}
function photosOf(p){ return Array.isArray(p.photos)?p.photos:(p.photos?[p.photos]:[]); }
function lightbox(src){ const l=document.getElementById('lb'); l.querySelector('img').src=src; l.classList.add('on'); }
function thmore(el){ const box=el.parentNode; const clip=box.classList.toggle('clip'); el.textContent=clip?('+'+el.dataset.n):'접기'; }
function thumbsHtml(pics){
  if(!pics.length) return '';
  const more=pics.length>4;
  return `<div class="ithumbs${more?' clip':''}">${pics.map(u=>`<img class="ith" src="${u}" onclick="lightbox(this.src)">`).join('')}`
    +`${more?`<span class="ithmore" data-n="${pics.length-4}" onclick="thmore(this)">+${pics.length-4}</span>`:''}</div>`;
}
// 이슈 텍스트를 (MM/DD) 마커 기준으로 섹션 분할 + 항목별 날짜 필터 칩
function issueSections(txt){
  const s=String(txt);const re=/\((\d{1,2}\/\d{1,2})\)/g;const marks=[];let m;
  while((m=re.exec(s)))marks.push({date:m[1],start:m.index});
  const secs=[];
  if(!marks.length){ secs.push({date:'',text:s}); }
  else{
    if(marks[0].start>0){const pre=s.slice(0,marks[0].start).trim();if(pre)secs.push({date:'',text:pre});}
    for(let i=0;i<marks.length;i++){const end=i+1<marks.length?marks[i+1].start:s.length;secs.push({date:marks[i].date,text:s.slice(marks[i].start,end).trim()});}
  }
  const dates=[...new Set(marks.map(x=>x.date))];
  const bar = dates.length>1 ? `<div class="dfbar"><span class="dfchip on" data-d="" onclick="dfClick(this)">전체</span>${dates.map(dt=>`<span class="dfchip" data-d="${dt}" onclick="dfClick(this)">${dt}</span>`).join('')}</div>` : '';
  const body = `<div class="itx">${secs.map(sec=>`<div class="isec" data-date="${sec.date}">${issueHtml(sec.text)}</div>`).join('')}</div>`;
  return bar+body;
}
// 항목별 날짜 필터 (이 항목만 제어)
function dfClick(chip){
  const bar=chip.parentNode;const item=chip.closest('.iitem');
  const chips=[...bar.querySelectorAll('.dfchip')];const allChip=chips.find(c=>c.dataset.d==='');
  if(chip===allChip){ chips.forEach(c=>c.classList.toggle('on',c===allChip)); }
  else{ allChip.classList.remove('on'); chip.classList.toggle('on');
    if(!chips.some(c=>c.dataset.d!==''&&c.classList.contains('on'))) allChip.classList.add('on'); }
  const allOn=allChip.classList.contains('on');
  const active=new Set(chips.filter(c=>c.classList.contains('on')&&c.dataset.d!=='').map(c=>c.dataset.d));
  item.querySelectorAll('.isec').forEach(sec=>{ sec.style.display=(allOn||active.has(sec.dataset.date))?'':'none'; });
}
function homeIssCell(parts){
  const carIss=parts.filter(p=>p.openIssue&&p.openIssue!=='-');
  if(!carIss.length) return '<span class="noiss">— 이슈 없음</span>';
  return collapse(carIss).map(g=>{const rep=g.rep;const {active}=stagesOf(rep);const cur=currentStage(active);const [sbg,sfg]=STAGE_STYLE[cur.key||'none'];
    const nm=escapeHtml(rep.partName||'-');
    const names=g.members.length>1?`${nm} <span class="imore">외 ${g.members.length-1}개</span>`:nm;
    const pics=[].concat(...g.members.map(m=>photosOf(m)));
    return `<div class="iitem">${thumbsHtml(pics)}<div class="itop"><span class="ispill" style="background:${sbg};color:${sfg}">${cur.label}</span><span class="inm">${names}</span></div>${issueSections(rep.openIssue)}</div>`;
  }).join('');
}
function renderHome(){
  // 차종별로 묶되, 업체별로 행 분리 (왼쪽 타임라인은 rowspan으로 한 번만)
  const byCar={};const carOrder=[];
  PROJECTS.forEach(p=>{ if(!byCar[p.carModel]){byCar[p.carModel]={order:[],sup:{}};carOrder.push(p.carModel);}
    const c=byCar[p.carModel]; if(!c.sup[p.supplier]){c.sup[p.supplier]=[];c.order.push(p.supplier);} c.sup[p.supplier].push(p); });
  const box=document.getElementById('homeRows');box.innerHTML='';
  carOrder.forEach(cm=>{
    const c=byCar[cm];const col=carColor[cm];const sc=c.sup[c.order[0]][0].schedule;
    const allParts=c.order.reduce((a,s)=>a.concat(c.sup[s]),[]);
    const {flow,nx,done}=homeFlowHtml(cm,sc,allParts);
    const nSup=c.order.length;
    const totalParts=allParts.length;
    c.order.forEach((sup,si)=>{
      const parts=c.sup[sup];
      const row=document.createElement('tr');if(si===0)row.className='carstart';
      let cells='';
      if(si===0){
        cells+=`<td class="h-tinfo" style="--c:${col}" rowspan="${nSup}"><div class="h-cm">${cm}</div><div class="h-meta">${totalParts}개 · ${escapeHtml(c.order.join('/'))}</div><div class="h-nx${done?' done':''}">${nx}</div></td>`;
        cells+=`<td class="h-tflow" rowspan="${nSup}"><div class="h-flowwrap">${flow}</div></td>`;
      }
      cells+=`<td class="hiss"><div class="isuphdr">${escapeHtml(sup)} · ${parts.length}개</div>${homeIssCell(parts)}</td>`;
      row.innerHTML=cells;
      box.appendChild(row);
    });
  });
}

// ════ BOM 트리 ════
let bomCur=null, bomExp={};
function bomChips(){const box=document.getElementById('bomChips');box.innerHTML='';
  Object.keys(BOM).forEach(k=>{const c=document.createElement('div');c.className='chip'+(k===bomCur?' on':'');c.innerHTML=`${k}<span class="c">${BOM[k].length}</span>`;c.onclick=()=>{bomCur=k;bomExp={};document.getElementById('bomSearch').value='';renderBOM();};box.appendChild(c);});
}
function bomHasChild(rows,i){return i+1<rows.length && rows[i+1].level>rows[i].level;}
function bomExpandAll(v){const rows=BOM[bomCur]||[];bomExp={};if(v){rows.forEach((r,i)=>{if(bomHasChild(rows,i))bomExp[i]=true;});}renderBOM();}
function bomHL(s,q){s=escapeHtml(s||'');if(!q)return s;const i=s.toLowerCase().indexOf(q.toLowerCase());if(i<0)return s;return s.slice(0,i)+'<span class="hl">'+s.slice(i,i+q.length)+'</span>'+s.slice(i+q.length);}
function renderBOM(){
  bomChips();
  const tb=document.getElementById('bomBody');tb.innerHTML='';
  const empty=document.getElementById('bomEmpty');empty.innerHTML='';
  const rows=BOM[bomCur]||[];
  const q=(document.getElementById('bomSearch').value||'').trim();
  document.getElementById('bomCnt').innerHTML=`총 <b>${rows.length}</b>개`;
  if(!rows.length){empty.innerHTML='<div class="empty">BOM 데이터가 없습니다.</div>';return;}
  let visible;
  if(q){
    const ql=q.toLowerCase();const show=new Set();
    rows.forEach((r,i)=>{if((r.partNo&&r.partNo.toLowerCase().includes(ql))||(r.partName&&r.partName.toLowerCase().includes(ql))){
      show.add(i);let lvl=r.level;for(let j=i-1;j>=0&&lvl>1;j--){if(rows[j].level<lvl){show.add(j);lvl=rows[j].level;}}
    }});
    visible=[...show].sort((a,b)=>a-b);
    if(!visible.length){empty.innerHTML='<div class="empty">검색 결과가 없습니다.</div>';return;}
  } else {
    visible=[];let hideAbove=Infinity;
    rows.forEach((r,i)=>{if(r.level>hideAbove)return;hideAbove=Infinity;
      const kid=bomHasChild(rows,i);if(kid&&!bomExp[i])hideAbove=r.level;visible.push(i);});
  }
  visible.forEach(i=>{
    const r=rows[i];const kid=bomHasChild(rows,i);const open=!!bomExp[i];
    const indent=(r.level-1)*16;
    const tog=(!q&&kid)?`<span class="tog" onclick="bomExp[${i}]=!bomExp[${i}];renderBOM()">${open?'−':'+'}</span>`:'<span class="tog leaf"></span>';
    const nc=r.nc==='New'?'<span class="badge b-new">New</span>':(r.nc?'<span class="badge b-cov">C/over</span>':'');
    const mb=r.mb==='Make'?'<span class="badge b-make">Make</span>':(r.mb==='Buy'?'<span class="badge b-buy">Buy</span>':'');
    const tr=document.createElement('tr');if(r.level===1)tr.className='lv1';
    tr.innerHTML=`<td class="bpno">${bomHL(r.partNo,q)}</td>
      <td><div class="namecell" style="padding-left:${indent}px">${tog}<span class="bname">${bomHL(r.partName,q)}${r.variant&&r.level===1?` <span class="tw">· ${escapeHtml(r.variant)}</span>`:''}</span></div></td>
      <td>${nc}</td><td>${mb}</td><td class="dim">${escapeHtml(r.plant||'')}</td><td>${escapeHtml(r.supplier||'')}</td><td class="dim">${escapeHtml(r.remark||'')}</td>`;
    tb.appendChild(tr);
  });
}

// ════ Board ════
let bSup="전체", bCar="전체";
function issueHtml(txt){
  // (MM/DD) 형식의 날짜는 위치에 상관없이 모두 색 칩으로
  let t=escapeHtml(txt);
  t=t.replace(/\((\d{1,2}\/\d{1,2})\)/g,'<span class="date-tag">$1</span>');
  return t;
}
// 병합그룹(issueGroup)끼리 하나로 묶기
function collapse(list){
  const map={},out=[];
  list.forEach(x=>{ const g=x.issueGroup;
    if(g){ if(!map[g]){map[g]={rep:x,members:[]};out.push(map[g]);} map[g].members.push(x); }
    else out.push({rep:x,members:[x]});
  });
  return out;
}
function groupSize(gid){ return gid?PROJECTS.filter(p=>p.issueGroup===gid).length:1; }

// ════ Summary (표) ════
let sSup="전체", sCar="전체";
function renderSummary(){
  const wi=PROJECTS.filter(x=>x.openIssue&&x.openIssue!=='-');
  const nSup=new Set(wi.map(x=>x.supplier)).size;
  document.getElementById('sCount').innerHTML=`총 <b>${collapse(wi).length}</b>건 · ${nSup}개 협력사`;
  const sups={전체:wi.length};wi.forEach(x=>sups[x.supplier]=(sups[x.supplier]||0)+1);
  const carSrc=wi.filter(x=>sSup==="전체"||x.supplier===sSup);
  const cars={전체:carSrc.length};carSrc.forEach(x=>cars[x.carModel]=(cars[x.carModel]||0)+1);
  chipRow('sSupChips',sups,sSup,v=>{sSup=v;sCar="전체";renderSummary();});
  chipRow('sCarChips',cars,sCar,v=>{sCar=v;renderSummary();});
  const list=wi.filter(x=>(sSup==="전체"||x.supplier===sSup)&&(sCar==="전체"||x.carModel===sCar));
  const root=document.getElementById('summaryTable');
  if(!list.length){root.innerHTML='<div class="empty">해당 조건의 이슈가 없습니다.</div>';return;}
  let rows='';
  collapse(list).forEach(grp=>{const rep=grp.rep,members=grp.members;const col=carColor[rep.carModel];const {active}=stagesOf(rep);const cur=currentStage(active);
    const nos=members.map(m=>m.partNo||'-').join('<br>');
    const names=members.map(m=>m.partName||'-').join('<br>');
    rows+=`<tr>
      <td><span class="car-badge" style="background:${col}">${rep.carModel}</span></td>
      <td class="s-sup">${rep.supplier}</td>
      <td class="s-no">${nos}</td>
      <td class="s-name">${names}</td>
      <td>${stagePillHtml(cur)}</td>
      <td class="s-issue">${issueHtml(rep.openIssue)}</td>
    </tr>`;});
  root.innerHTML=`<div class="sum-wrap"><table class="sum">
    <colgroup><col style="width:96px"><col style="width:64px"><col style="width:104px"><col style="width:150px"><col style="width:48px"><col></colgroup>
    <thead><tr><th>차종</th><th>업체</th><th>품번</th><th>품명</th><th>단계</th><th>Open Issue</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}
function renderBoard(){
  const withIssue=PROJECTS.filter(x=>x.openIssue&&x.openIssue!=='-');
  const nSup=new Set(withIssue.map(x=>x.supplier)).size;
  document.getElementById('boardCount').innerHTML=`총 <b>${collapse(withIssue).length}</b>건 · ${nSup}개 협력사`;
  const sups={전체:withIssue.length};withIssue.forEach(x=>sups[x.supplier]=(sups[x.supplier]||0)+1);
  const carSrc=withIssue.filter(x=>bSup==="전체"||x.supplier===bSup);
  const cars={전체:carSrc.length};carSrc.forEach(x=>cars[x.carModel]=(cars[x.carModel]||0)+1);
  chipRow('bSupChips',sups,bSup,v=>{bSup=v;bCar="전체";renderBoard();});
  chipRow('bCarChips',cars,bCar,v=>{bCar=v;renderBoard();});
  const list=withIssue.filter(x=>(bSup==="전체"||x.supplier===bSup)&&(bCar==="전체"||x.carModel===bCar));
  const board=document.getElementById('board');board.innerHTML='';
  if(!list.length){board.innerHTML='<div class="empty">해당 조건의 이슈가 없습니다.</div>';return;}
  const groups={};list.forEach(x=>{(groups[x.supplier]=groups[x.supplier]||[]).push(x);});
  Object.keys(groups).forEach(sup=>{
    const cg=collapse(groups[sup]);const g=document.createElement('div');g.className='group';const gc=carColor[cg[0].rep.carModel];
    g.innerHTML=`<div class="group-head"><span class="group-dot" style="background:${gc}"></span><h3>${sup}</h3><span class="gcount">${cg.length}건</span><span class="group-line"></span></div><div class="cards"></div>`;
    const ce=g.querySelector('.cards');
    cg.forEach(grp=>{
      const rep=grp.rep,members=grp.members,multi=members.length>1;
      const col=carColor[rep.carModel];const {active}=stagesOf(rep);const cur=currentStage(active);const [sbg,sfg]=STAGE_STYLE[cur.key||'none'];
      const nameHtml=multi
        ? `<div class="grp-list">${members.map(m=>`<div class="grp-item"><span>${m.partName}</span><span class="grp-no">${m.partNo}</span></div>`).join('')}</div>`
        : `<div class="card-name">${rep.partName}</div><div class="card-no">${rep.partNo}</div>`;
      const card=document.createElement('div');card.className='card';
      card.innerHTML=`
        <div class="card-strip" style="background:${col}"></div>
        <div class="card-body">
          <div class="card-top"><span class="car-badge" style="background:${col}">${rep.carModel}</span><span class="card-stage" style="background:${sbg};color:${sfg}">${cur.label}</span>${multi?`<span class="supplier-tag">${members.length}개 품목</span>`:''}</div>
          ${nameHtml}
          <div class="card-issue">${issueHtml(rep.openIssue)}</div>
        </div>`;
      ce.appendChild(card);
    });
    board.appendChild(g);
  });
}

// ── 뷰 전환 ──
function showView(v){
  document.getElementById('view-home').style.display=v==='home'?'block':'none';
  document.getElementById('view-timeline').style.display=v==='timeline'?'block':'none';
  document.getElementById('view-bom').style.display=v==='bom'?'block':'none';
  document.getElementById('view-board').style.display=v==='board'?'block':'none';
  document.getElementById('view-summary').style.display=v==='summary'?'block':'none';
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));
  if(v==='home')renderHome();
  else if(v==='timeline')renderTimeline();
  else if(v==='bom')renderBOM();
  else if(v==='summary')renderSummary();
  else renderBoard();
}

// ── init ──
document.getElementById('dateChip').textContent=`${today.getFullYear()}. ${today.getMonth()+1}. ${today.getDate()} 기준`;
bomCur=Object.keys(BOM)[0]||null;
renderHome();
