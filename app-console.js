/* ============================================================
   STAFF CONSOLE
============================================================ */
/* ============================================================
   ROLES
   Two people who both need the console do not need the same console. The
   counter needs to move machines and jobs; the owner needs what they cost.
   `can()` is the single gate — tabs, columns and buttons all ask it.
============================================================ */
const ROLES = {
  owner:   {label:'Owner',        can:['inventory','edit','import','schedule','dispatch','wants','pricing','payments','money','staff','activity']},
  manager: {label:'Manager',      can:['inventory','edit','import','schedule','dispatch','wants','pricing','money','activity']},
  counter: {label:'Counter Staff',can:['inventory','edit','schedule','dispatch','wants']},
};
function can(perm){
  const r = state.me && ROLES[state.me.role];
  return !!(r && r.can.includes(perm));
}
const CTABS_ALL=[
  ['intake','Add A Unit','inventory'],
  ['inventory','All Inventory','inventory'],
  ['wants','Want List','wants'],
  ['pricing','Pricing Engine','pricing'],
  ['schedule','Schedule Board','schedule'],
  ['payments','Payments','payments'],
  ['profile','Profile & Settings',null],
];
function ctabs(){ return CTABS_ALL.filter(([,,perm])=>!perm||can(perm)).map(([k,l])=>[k,l]); }
const CTABS = CTABS_ALL.map(([k,l])=>[k,l]);   // mobile drawer builds from the full list, then filters
function seedStaff(){
  state.staff = [
    {id:1, name:'Michael Cruz', user:'mcruz', pin:'1506', role:'owner',   phone:'817-374-9412'},
    {id:2, name:'Nino Cruz',    user:'ncruz', pin:'2053', role:'manager', phone:'817-629-8047'},
    {id:3, name:'Front Counter',user:'staff', pin:'1111', role:'counter', phone:'817-374-9412'},
  ];
}
function logAct(what){
  state.activity.unshift({who: state.me?state.me.name:'System', role: state.me?ROLES[state.me.role].label:'', what, when:new Date()});
  if(state.activity.length>60) state.activity.length=60;
}

/* ---------- PROFILE & SETTINGS ---------- */
function cProfile(){
  const me = state.me; if(!me) return '';
  return `<div class="cpanel">
    <h3>Your profile</h3>
    <p class="sub">Everyone who signs in can change their own PIN, name and mobile number here. What you can see and do in the rest of the console comes from your role, and only an owner can change that.</p>
    <div class="profgrid">
      <div class="profcard">
        <div class="avatar">${esc(me.name.split(' ').map(w=>w[0]).join('').slice(0,2))}</div>
        <div>
          <b>${esc(me.name)}</b>
          <span>${esc(me.user)} · ${ROLES[me.role].label}</span>
        </div>
      </div>
      <div>
        <div class="frow">
          <div class="f"><label>Display name</label><input type="text" id="pfName" value="${esc(me.name)}"></div>
          <div class="f"><label>Mobile</label><input type="tel" id="pfPhone" value="${esc(me.phone||'')}"></div>
          <div class="f"><label>New PIN</label><input type="password" id="pfPin" maxlength="4" placeholder="4 digits"></div>
          <div class="f"><label>Confirm new PIN</label><input type="password" id="pfPin2" maxlength="4" placeholder="Repeat it"></div>
        </div>
        <button class="btn b-rust" onclick="saveProfile()">Save My Profile</button>
        <p class="hint" style="margin-top:9px">Leave the PIN fields blank to keep your current one. PINs are per-person — never share one, or the activity log stops meaning anything.</p>
      </div>
    </div>

    <div class="permbox">
      <b>What your role can do</b>
      <div class="permlist">
        ${[['inventory','Add and view inventory'],['edit','Edit and delete units'],['import','Bulk import from a file'],
           ['schedule','See the schedule board'],['dispatch','Move jobs and text customers'],['wants','See the want list'],
           ['pricing','Change the pricing rules'],['money','See cost and margin'],['payments','See the payments ledger'],
           ['staff','Manage staff accounts'],['activity','See the activity log']]
          .map(([k,l])=>`<div class="perm ${can(k)?'yes':'no'}">${can(k)?ICON.check:'&times;'}<span>${l}</span></div>`).join('')}
      </div>
    </div>

    ${can('staff')?staffPanel():''}
    ${can('activity')?activityPanel():''}
  </div>`;
}
function saveProfile(){
  const me = state.me; if(!me) return;
  const name=($('pfName').value||'').trim();
  const pin=($('pfPin').value||'').trim(), pin2=($('pfPin2').value||'').trim();
  if(!name){ toast('Name cannot be blank'); return; }
  if(pin || pin2){
    if(pin.length!==4 || !/^\d{4}$/.test(pin)){ toast('PIN must be 4 digits'); return; }
    if(pin!==pin2){ toast('The two PINs do not match'); return; }
    me.pin = pin;
  }
  me.name = name;
  me.phone = ($('pfPhone').value||'').trim();
  clearForm(['pfPin','pfPin2']);
  logAct(pin?'Updated their profile and changed their PIN':'Updated their profile');
  toast('Profile saved');
  render();
}
function staffPanel(){
  return `<div class="staffbox">
    <b>Staff accounts</b>
    <p class="hint" style="margin:0 0 12px">Owners only. Changing someone's role changes what they see the next time they sign in.</p>
    <div style="overflow-x:auto"><table class="dt">
      <tr><th>Person</th><th>Staff ID</th><th>Mobile</th><th>Role</th><th></th></tr>
      ${state.staff.map(u=>`<tr>
        <td><b>${esc(u.name)}</b>${u.id===state.me.id?'<span style="display:block;font-size:11px;color:var(--brushed)">that\'s you</span>':''}</td>
        <td style="font-family:ui-monospace,monospace;font-size:12px">${esc(u.user)}</td>
        <td style="font-size:12px;color:var(--brushed)">${esc(u.phone||'—')}</td>
        <td><select class="rolesel" onchange="setRole(${u.id},this.value)" ${u.id===state.me.id?'disabled':''}>
          ${Object.entries(ROLES).map(([k,r])=>`<option value="${k}"${u.role===k?' selected':''}>${r.label}</option>`).join('')}
        </select></td>
        <td>${u.id===state.me.id?'':`<button class="btn b-ghost b-sm cbtn" onclick="resetPin(${u.id})">Reset PIN</button>`}</td>
      </tr>`).join('')}
    </table></div>
    <div class="frow" style="margin-top:14px">
      <div class="f"><label>Add someone — name</label><input type="text" id="nsName" placeholder="Krystal Ferrer"></div>
      <div class="f"><label>Staff ID</label><input type="text" id="nsUser" placeholder="kferrer"></div>
      <div class="f"><label>Role</label><select id="nsRole">${Object.entries(ROLES).map(([k,r])=>`<option value="${k}"${k==='counter'?' selected':''}>${r.label}</option>`).join('')}</select></div>
      <div class="f"><label>Starting PIN</label><input type="text" id="nsPin" maxlength="4" placeholder="4 digits"></div>
    </div>
    <button class="btn b-rust" onclick="addStaff()">Add Staff Member</button>
  </div>`;
}
function setRole(id, role){
  const u=state.staff.find(x=>x.id===id); if(!u) return;
  u.role=role; logAct(`Changed ${u.name}'s role to ${ROLES[role].label}`);
  toast(`${u.name} is now ${ROLES[role].label}`); render();
}
function resetPin(id){
  const u=state.staff.find(x=>x.id===id); if(!u) return;
  const pin=String(Math.floor(1000+Math.random()*9000));
  u.pin=pin; logAct(`Reset ${u.name}'s PIN`);
  modal('PIN Reset', `<div class="ok"><div class="tick">✓</div>
    <h2>${esc(u.name)}'s new PIN</h2>
    <div class="conf">${pin}</div>
    <p>Give it to them in person. They can change it themselves under Profile &amp; Settings.</p></div>`,'sm');
  render();
}
function addStaff(){
  const name=($('nsName').value||'').trim(), user=($('nsUser').value||'').trim().toLowerCase();
  const pin=($('nsPin').value||'').trim(), role=$('nsRole').value;
  if(!name||!user){ toast('Name and staff ID are required'); return; }
  if(!/^\d{4}$/.test(pin)){ toast('PIN must be 4 digits'); return; }
  if(state.staff.some(x=>x.user===user)){ toast('That staff ID is already taken'); return; }
  state.staff.push({id:Math.max(0,...state.staff.map(x=>x.id))+1, name, user, pin, role, phone:''});
  logAct(`Added ${name} as ${ROLES[role].label}`);
  clearForm(['nsName','nsUser','nsPin']);
  toast(`${name} can sign in now`); render();
}
function activityPanel(){
  const A = state.activity.slice(0,14);
  return `<div class="actbox">
    <b>Activity log</b>
    <p class="hint" style="margin:0 0 10px">Who changed what, in order. This is the reason PINs are per-person.</p>
    ${A.length?A.map(a=>`<div class="actrow">
      <div class="acttime">${a.when.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</div>
      <div><b>${esc(a.who)}</b> <span class="actrole">${a.role}</span><div class="actwhat">${esc(a.what)}</div></div>
    </div>`).join(''):`<p class="hint" style="margin:0">Nothing yet this session.</p>`}
  </div>`;
}

function renderConsole(){
  if(!ctabs().some(([k])=>k===state.ctab)) state.ctab = ctabs()[0][0];
  let inner='';
  if(state.ctab==='intake') inner=cIntake();
  else if(state.ctab==='inventory') inner=cInventory();
  else if(state.ctab==='wants') inner=cWants();
  else if(state.ctab==='pricing') inner=cPricing();
  else if(state.ctab==='schedule') inner=cSchedule();
  else if(state.ctab==='profile') inner=cProfile();
  else inner=cPayments();

  const avail=availableUnits();
  const priced=avail.map(u=>({u,p:priceOf(u)}));
  const dead=priced.filter(x=>daysOnFloor(x.u)>=60).length;
  const retail=priced.reduce((s,x)=>s+x.p.price,0);
  const cost=avail.reduce((s,u)=>s+u.cost,0);
  const week=Date.now()-7*86400000;
  const volume=state.payments.filter(p=>p.when.getTime()>=week).reduce((s,p)=>s+p.amount,0);

  return `<div class="console"><div class="wrap">
    <div class="kpis">
      <div class="kpi"><b>${avail.length}</b><span>Units On Floor</span></div>
      <div class="kpi ${dead?'warn':''}"><b>${dead}</b><span>Aged 60+ Days</span></div>
      <div class="kpi"><b>${money(retail)}</b><span>Retail Value</span></div>
      ${can('money')?`<div class="kpi good"><b>${money(retail-cost)}</b><span>Gross Margin At Current Price</span></div>`:''}
      ${can('payments')?`<div class="kpi hot"><b>${money(volume)}</b><span>Card Volume · 7 Days</span></div>`:''}
      <div class="kpi warn"><b>${state.wants.filter(w=>w.status==='Waiting').length}</b><span>Customers Waiting</span></div>
    </div>
    <div class="ctabs">${ctabs().map(([k,l])=>`<button class="${state.ctab===k?'on':''}" onclick="ctab('${k}')">${l}</button>`).join('')}</div>
    ${inner}
  </div></div>`;
}

/* ---------- INTAKE ---------- */
let pendingPhoto=null;
function cIntake(){
  return `<div class="cpanel">
    <h3>Add a unit to the floor</h3>
    <p class="sub">This is the whole system. Floor staff photographs a machine, fills six fields, hits publish — it is live on the website in under a minute, priced by the engine, counted in the hero unit count. No web developer involved, ever.</p>
    <div class="intakegrid">
      <div>
        <label class="uploadzone ${pendingPhoto?'has':''}" id="uz">
          ${pendingPhoto?`<img src="${pendingPhoto}" alt="">`:''}
          <span class="lbl">${pendingPhoto?'Photo attached — tap to replace':'Tap to add photo'}</span>
          <span class="sm">${pendingPhoto?'':'Camera or file · shot on the tape mark'}</span>
          <input type="file" accept="image/*" style="display:none" onchange="takePhoto(this)">
        </label>
        ${pendingPhoto?`<button class="btn b-ghost b-sm cbtn" style="margin-top:9px;width:100%" onclick="dropPhoto()">Remove Photo</button>`:''}
        <p class="hint" style="margin-top:9px">Auto-cropped square for the grid. If no photo is attached the site shows a category placeholder until one is added.</p>
      </div>
      <div>
        <div class="frow">
          <div class="f"><label>Brand</label><input type="text" id="inBrand" placeholder="Whirlpool"></div>
          <div class="f"><label>Category</label><select id="inCat" onchange="suggestPrice()">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></div>
          <div class="f full"><label>Model description — this becomes the product name</label><input type="text" id="inModel" placeholder="4.5 cu. ft. Top-Load Washer"></div>
          <div class="f"><label>Serial number</label><input type="text" id="inSerial" placeholder="CX4821-WA"></div>
          <div class="f"><label>Store</label><select id="inLoc">${LOCATIONS.map(l=>`<option>${l}</option>`).join('')}</select></div>
          <div class="f"><label>Condition grade</label>
            <select id="inGrade" onchange="suggestPrice()">
              <option value="A">A — Like new</option><option value="B" selected>B — Light wear</option><option value="C">C — Cosmetic damage</option>
            </select></div>
          <div class="f"><label>Warranty offered</label>
            <select id="inWar"><option>90-day parts &amp; labor</option><option>60-day parts</option><option>30-day parts</option><option>As-is, no warranty</option></select></div>
          <div class="f"><label>What we paid (cost)</label><input type="number" id="inCost" placeholder="260" oninput="suggestPrice()"></div>
          <div class="f"><label>Ask price (list)</label><input type="number" id="inList" placeholder="449"></div>
          <div class="f full"><label>Flaws — say it plainly, it sells the unit</label><input type="text" id="inFlaw" placeholder="Small dent, right door. Does not affect operation."></div>
        </div>
        <div id="suggestBox"></div>
        <button class="btn b-rust" onclick="publishUnit()" style="margin-top:6px">Publish To Website</button>
        <button class="btn b-ghost" style="border-color:rgba(255,255,255,.3);color:var(--paper);margin-left:8px" onclick="fillSample()">Fill Sample Data</button>
      </div>
    </div>
    <div class="callout"><b>Why this matters for Cross:</b> the reason used-appliance dealers have stale websites is that updating one means emailing a web guy. Here, inventory is entered once by the person who already touches the machine, and the site, the price, the store count and the search filters all follow automatically.</div>
  </div>` + (can('import')?cImport():'');
}
/* ============================================================
   BULK IMPORT
   Typing 40 units one at a time is not a system. CSV is parsed natively;
   Excel and Google Sheets are covered by pasting cells straight from the
   spreadsheet (the clipboard is tab-separated), which skips file conversion
   entirely. Nothing is written until the rows have been validated on screen.
============================================================ */
const IMPORT_COLS = [
  ['brand',        1, 'Whirlpool',                    'Manufacturer.'],
  ['model',        1, '4.5 cu. ft. Top-Load Washer',  'Becomes the product name on the site.'],
  ['category',     1, 'Washer',                       'One of: ' + CATS.join(', ') + '.'],
  ['grade',        1, 'B',                            'A, B or C. A = like new, C = cosmetic damage.'],
  ['cost',         1, '260',                          'What you paid. Drives the margin floor. Never shown publicly.'],
  ['list',         1, '449',                          'Your ask price. The engine marks down from here.'],
  ['store',        0, 'Mineral Wells Hwy',            'Mineral Wells Hwy or FM 920. Defaults to Mineral Wells Hwy.'],
  ['serial',       0, 'CX4821-WA',                    'Your tag number. Auto-generated if blank.'],
  ['warranty',     0, '90-day parts & labor',         '90-day parts & labor, 60-day parts, 30-day parts, or As-is, no warranty.'],
  ['flaw',         0, 'Small dent, right door.',      'Say it plainly. Blank means no known flaws.'],
  ['days_on_floor',0, '0',                            'How long you have had it. 0 = arrived today. Drives the age markdown.'],
  ['status',       0, 'live',                         'live, reserved or sold. Defaults to live.'],
  ['photo_url',    0, 'https://…/washer.jpg',         'Direct link to a photo. Blank shows a category placeholder.'],
];
const WARRANTIES = ['90-day parts & labor','60-day parts','30-day parts','As-is, no warranty'];
let importRows = null;

function splitRow(line, d){
  const out=[]; let cur='', q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(q){
      if(c==='"' && line[i+1]==='"'){ cur+='"'; i++; }
      else if(c==='"'){ q=false; }
      else cur+=c;
    } else if(c==='"' && cur===''){ q=true; }   // only opens a quoted field, never mid-value
    else if(c===d){ out.push(cur); cur=''; }
    else cur+=c;
  }
  out.push(cur);
  return out.map(v=>v.trim());
}
function parseDelimited(text){
  const lines = text.replace(/\r\n?/g,'\n').split('\n').filter(l=>l.trim());
  if(!lines.length) return null;
  // clipboard from Excel/Sheets is tab-separated; a saved file is comma-separated
  const d = (lines[0].match(/\t/g)||[]).length > (lines[0].match(/,/g)||[]).length ? '\t' : ',';
  const head = splitRow(lines[0], d).map(h=>h.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z_]/g,''));
  return lines.slice(1).map(l=>{
    const cells = splitRow(l, d), row = {};
    head.forEach((h,i)=> row[h] = (cells[i]||'').trim());
    return row;
  });
}
function validateRow(r, i){
  const errs = [];
  const brand=r.brand||'', model=r.model||'';
  if(!brand) errs.push('brand is blank');
  if(!model) errs.push('model is blank');
  const cat = CATS.find(c=>c.toLowerCase()===(r.category||'').toLowerCase().replace(/s$/,''))
           || CATS.find(c=>c.toLowerCase()===(r.category||'').toLowerCase());
  if(!cat) errs.push(`category "${r.category||''}" is not one of ${CATS.join(', ')}`);
  const grade=(r.grade||'').toUpperCase().charAt(0);
  if(!'ABC'.includes(grade)) errs.push(`grade "${r.grade||''}" must be A, B or C`);
  const cost=Number(String(r.cost||'').replace(/[$,]/g,''));
  const list=Number(String(r.list||'').replace(/[$,]/g,''));
  if(!isFinite(cost)||cost<0) errs.push('cost is not a number');
  if(!isFinite(list)||list<=0) errs.push('list must be a number above zero');
  const loc = LOCATIONS.find(l=>l.toLowerCase()===(r.store||'').toLowerCase()) || LOCATIONS[0];
  const war = WARRANTIES.find(w=>w.toLowerCase()===(r.warranty||'').toLowerCase()) || WARRANTIES[0];
  const days = Math.max(0, Math.round(Number(r.days_on_floor||0)) || 0);
  const st = {live:'available',available:'available',reserved:'reserved',sold:'sold'}[(r.status||'live').toLowerCase()] || 'available';
  return {line:i+2, errs, ok:!errs.length,
    draft: errs.length ? null : {brand, model, cat, grade, cost, list, loc, war, days, st,
      serial:(r.serial||'').trim(), flaw:(r.flaw||'').trim(), photo:(r.photo_url||'').trim()||null}};
}
function readImport(){
  const text = ($('impText')||{}).value || '';
  if(!text.trim()){ toast('Paste your rows or choose a file first'); return; }
  const rows = parseDelimited(text);
  if(!rows || !rows.length){ toast('No data rows found under the header'); return; }
  importRows = rows.map(validateRow);
  render();
}
function importFile(input){
  const f = input.files && input.files[0]; if(!f) return;
  if(/\.(xlsx|xls|numbers)$/i.test(f.name)){
    toast('Export that sheet as CSV first, or just copy the cells and paste them');
    input.value=''; return;
  }
  const r = new FileReader();
  r.onload = e => { const t=$('impText'); if(t){ t.value=e.target.result; formCache['impText']=e.target.result; } readImport(); };
  r.readAsText(f);
}
function clearImport(){ importRows=null; clearForm(['impText']); render(); }
function commitImport(){
  if(!importRows) return;
  const good = importRows.filter(r=>r.ok);
  if(!good.length){ toast('Nothing valid to import'); return; }
  good.forEach(({draft:d})=>{
    const u = mk(d.brand,d.model,d.cat,d.grade,d.cost,d.list,catBaseline(d.cat,d.grade),d.days,d.loc,d.flaw,d.war);
    if(d.serial) u.serial = d.serial;
    if(d.photo) u.photo = d.photo;
    u.status = d.st;
    state.units.unshift(u);
  });
  const n = good.length, bad = importRows.length - n;
  importRows = null; clearForm(['impText']);
  logAct(`Imported ${n} unit${n===1?'':'s'} from a file`);
  toast(`Imported ${n} unit${n===1?'':'s'}${bad?` · ${bad} row${bad===1?'':'s'} skipped`:''}`);
  render();
}
function templateCsv(){
  const head = IMPORT_COLS.map(c=>c[0]).join(',');
  const ex1 = ['Whirlpool','4.5 cu. ft. Top-Load Washer','Washer','B','260','449','Mineral Wells Hwy','CX4821-WA','90-day parts & labor','Small dent, right door. Does not affect operation.','0','live',''];
  const ex2 = ['Frigidaire','25 cu. ft. Side-by-Side Refrigerator','Refrigerator','A','430','799','FM 920','','90-day parts & labor','','12','live',''];
  const q = v => /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v;
  return head + '\n' + [ex1,ex2].map(r=>r.map(q).join(',')).join('\n') + '\n';
}
function downloadTemplate(){
  const blob = new Blob([templateCsv()], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cross-appliances-inventory-template.csv';
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast('Template downloaded — opens in Excel, Numbers or Google Sheets');
}
function cImport(){
  const res = importRows;
  const okCount = res ? res.filter(r=>r.ok).length : 0;
  const badCount = res ? res.length - okCount : 0;
  return `<div class="cpanel">
    <h3>Or bring in a whole list at once</h3>
    <p class="sub">Auction haul, a spreadsheet you already keep, a list from another store — load it in one pass instead of typing forty units. Every row is checked and shown to you before anything reaches the website.</p>

    <div class="improw">
      <button class="btn b-rust b-sm" onclick="downloadTemplate()">Download The Template</button>
      <label class="btn b-ghost b-sm cbtn" style="cursor:pointer">Choose A File
        <input type="file" accept=".csv,.tsv,.txt,text/csv" style="display:none" onchange="importFile(this)"></label>
      <span class="hint">CSV or tab-separated. In Excel or Google Sheets: <b>File → Download → CSV</b>. Or just select your cells, copy, and paste below.</span>
    </div>

    <div class="f full" style="margin-top:14px">
      <label>Paste your rows — header line first</label>
      <textarea id="impText" rows="6" placeholder="brand,model,category,grade,cost,list&#10;Whirlpool,4.5 cu. ft. Top-Load Washer,Washer,B,260,449"></textarea>
    </div>
    <button class="btn b-rust" onclick="readImport()">Check The Rows</button>
    ${res?`<button class="btn b-ghost cbtn" style="margin-left:8px" onclick="clearImport()">Start Over</button>`:''}

    ${res?`<div class="impres">
      <div class="impsum ${badCount?'warn':'good'}">
        <b>${okCount} row${okCount===1?'':'s'} ready to import</b>${badCount?` · <span>${badCount} need${badCount===1?'s':''} fixing and will be skipped</span>`:' · everything checks out'}
      </div>
      <div style="overflow-x:auto"><table class="dt">
        <tr><th>Line</th><th>Unit</th><th>Store</th><th>Grade</th><th class="num">Cost</th><th class="num">List</th><th class="num">Days</th><th>Status</th><th>Check</th></tr>
        ${res.map(r=>r.ok?`<tr>
          <td style="color:var(--brushed)">${r.line}</td>
          <td><b>${esc(r.draft.brand)} ${esc(r.draft.model)}</b>${r.draft.flaw?`<span style="display:block;font-size:11.5px;color:var(--brushed)">${esc(r.draft.flaw)}</span>`:''}</td>
          <td style="font-size:12px">${r.draft.loc}</td>
          <td><span class="chip ${GRADE_CLASS[r.draft.grade]}">${r.draft.grade}</span></td>
          <td class="num" style="color:var(--brushed)">${money(r.draft.cost)}</td>
          <td class="num">${money(r.draft.list)}</td>
          <td class="num">${r.draft.days}</td>
          <td style="font-size:12px">${r.draft.st==='available'?'Live':r.draft.st==='reserved'?'Reserved':'Sold'}</td>
          <td><span class="chip c-a">OK</span></td>
        </tr>`:`<tr class="badrow">
          <td style="color:var(--brushed)">${r.line}</td>
          <td colspan="7" style="color:#E5713F;font-size:12.5px">${r.errs.map(esc).join(' · ')}</td>
          <td><span class="chip c-c">Fix</span></td>
        </tr>`).join('')}
      </table></div>
      ${okCount?`<button class="btn b-rust" style="margin-top:14px" onclick="commitImport()">Import ${okCount} Unit${okCount===1?'':'s'} To The Website</button>`:''}
    </div>`:''}

    <div class="impcols">
      <b>What each column means</b>
      <div style="overflow-x:auto"><table class="dt">
        <tr><th>Column</th><th>Required</th><th>Example</th><th>Notes</th></tr>
        ${IMPORT_COLS.map(([n,req,ex,note])=>`<tr>
          <td><code>${n}</code></td>
          <td style="font-size:12px;color:${req?'var(--paper)':'var(--brushed)'}">${req?'Required':'Optional'}</td>
          <td style="font-size:12px;color:var(--brushed)">${esc(ex)}</td>
          <td style="font-size:12px">${esc(note)}</td>
        </tr>`).join('')}
      </table></div>
      <p class="hint" style="margin-top:10px">Column order does not matter — the header row is what we read. Extra columns are ignored. Prices may include $ and commas.</p>
    </div>

    <div class="callout"><b>On PDFs and photos:</b> a PDF packing list has no reliable structure, so this prototype does not pretend to read one. In production that is an extraction step — the PDF goes through OCR, gets mapped to these same columns, and lands in this exact review screen before anything publishes. Same for a folder of photos matched to serial numbers. Both are real builds, neither is a checkbox.</div>
  </div>`;
}
function takePhoto(input){
  const f=input.files && input.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{ pendingPhoto=e.target.result; render(); };
  r.readAsDataURL(f);
}
function dropPhoto(){ pendingPhoto=null; toast('Photo removed'); render(); }
function catBaseline(cat,grade){
  const base={'Washer':520,'Dryer':430,'Refrigerator':780,'Range':420,'Dishwasher':300,'Freezer':360,'Microwave':160}[cat]||400;
  const g={A:1.0,B:0.82,C:0.62}[grade]||0.82;
  return Math.round(base*g);
}
function suggestPrice(){
  const catEl=$('inCat'); if(!catEl) return;
  const cat=catEl.value, grade=$('inGrade').value;
  const comp=catBaseline(cat,grade);
  const cost=+($('inCost')?$('inCost').value:0)||0;
  const suggested=roundRetail(Math.max(comp*(state.pricing.compTarget/100), cost*(1+state.pricing.minMargin/100)));
  const box=$('suggestBox'); if(!box) return;
  box.innerHTML=`<div class="drop">
    <div><b style="font-family:var(--fh)">Suggested list: ${money(suggested)}</b>
    <div style="font-size:11.5px;color:var(--brushed)">Local market average for a Grade ${grade} ${cat.toLowerCase()} is about ${money(comp)}.${cost?` Your margin floor at ${state.pricing.minMargin}% is ${money(cost*(1+state.pricing.minMargin/100))}.`:''}</div></div>
    <button class="btn b-rust b-sm" onclick="document.getElementById('inList').value=${suggested}">Use It</button></div>`;
}
function fillSample(){
  $('inBrand').value='Kenmore'; $('inModel').value='Elite 5.2 cu. ft. Front-Load Washer';
  $('inSerial').value='CX'+(Math.floor(Math.random()*9000)+1000)+'-WA';
  $('inCost').value=310; $('inFlaw').value='Light scuff on the lid. Runs clean.';
  suggestPrice(); toast('Sample data filled');
}
function publishUnit(){
  const brand=($('inBrand').value||'').trim(), model=($('inModel').value||'').trim();
  const cost=+$('inCost').value||0, list=+$('inList').value||0;
  if(!brand||!model){ toast('Brand and model are required'); return; }
  if(!list){ toast('Enter an ask price'); return; }
  const cat=$('inCat').value, grade=$('inGrade').value;
  const u=mk(brand,model,cat,grade,cost,list,catBaseline(cat,grade),0,$('inLoc').value,($('inFlaw').value||'').trim(),$('inWar').value);
  if(($('inSerial').value||'').trim()) u.serial=$('inSerial').value.trim();
  u.photo=pendingPhoto;
  state.units.unshift(u);
  pendingPhoto=null;
  clearForm(['inBrand','inModel','inSerial','inCost','inList','inFlaw']);
  logAct(`Published ${u.brand} ${u.model}`);
  toast('Published — live on the website now');
  state.mode='customer'; state.view='shop';
  state.filters={cat:'all',loc:'all',grade:'all',max:2000,sort:'new'};
  window.scrollTo(0,0); render();
}

/* ---------- INVENTORY ---------- */
function cInventory(){
  const rows=state.units.map(u=>({u,p:priceOf(u)})).sort((a,b)=>daysOnFloor(b.u)-daysOnFloor(a.u));
  return `<div class="cpanel">
    <h3>Every unit, every store</h3>
    <p class="sub">Sorted by days on the floor — the oldest money first. Prices below are what the website is showing right now, recalculated by the pricing engine on every page load.</p>
    <div style="overflow-x:auto"><table class="dt">
      <tr><th>Unit</th><th>Store</th><th>Grade</th><th>Days</th>${can('money')?'<th class="num">Cost</th>':''}<th class="num">List</th><th class="num">Live Price</th>${can('money')?'<th class="num">Margin</th>':''}<th>Status</th><th></th></tr>
      ${rows.map(({u,p})=>`<tr>
        <td><div class="tdname"><div class="thumb">${unitImage(u)}</div>
          <div><b>${u.brand} ${u.model}</b><span>${u.serial}${u.flaw?' · '+u.flaw:''}</span></div></div></td>
        <td style="font-size:12px">${u.loc}</td>
        <td><span class="chip ${GRADE_CLASS[u.grade]}">${u.grade}</span></td>
        <td class="num" style="${daysOnFloor(u)>=60?'color:#C88A14':''}">${daysOnFloor(u)}</td>
        ${can('money')?`<td class="num" style="color:var(--brushed)">${money(u.cost)}</td>`:''}
        <td class="num" style="color:var(--brushed)">${money(u.list)}</td>
        <td class="num">${money(p.price)} ${p.discounted?`<span class="dropcell">−${p.pctOff}%</span>`:''}</td>
        ${can('money')?`<td class="num" style="color:${p.marginPct<20?'#E5713F':'#57C08B'}">${money(p.margin)} <span style="font-weight:400;font-size:11px;color:var(--brushed)">${p.marginPct}%</span></td>`:''}
        <td>${u.status==='available'?'<span class="chip c-a">Live</span>':u.status==='reserved'?'<span class="chip c-c">Reserved</span>':'<span class="chip c-sold">Sold</span>'}</td>
        <td><div class="rowacts">
          ${can('edit')?`<button class="btn b-ghost b-sm cbtn" onclick="openEdit(${u.id})">Edit</button>`:''}
          ${u.status==='sold'?'':`<button class="btn b-ghost b-sm cbtn" onclick="markSold(${u.id})">Mark Sold</button>`}
        </div></td>
      </tr>`).join('')}
    </table></div>
  </div>`;
}
/* Nothing goes in wrong forever — every field captured at intake stays editable,
   including the arrival age that drives the markdown, and status is a real
   three-way now instead of a one-way "Mark Sold" trapdoor. */
let editPhoto = null, editId = null;
function openEdit(id){
  const u = state.units.find(x=>x.id===id); if(!u) return;
  editId = id; editPhoto = u.photo;
  renderEdit();
}
function renderEdit(){
  const u = state.units.find(x=>x.id===editId); if(!u) return;
  modal(`Edit — ${u.brand} ${u.model}`, `
    <div class="editgrid">
      <div>
        <label class="uploadzone light ${editPhoto?'has':''}">
          ${editPhoto?`<img src="${editPhoto}" alt="">`:''}
          <span class="lbl">${editPhoto?'Photo attached — tap to replace':'Tap to add photo'}</span>
          <input type="file" accept="image/*" style="display:none" onchange="editTakePhoto(this)">
        </label>
        ${editPhoto?`<button class="lnk" style="margin-top:8px" onclick="editPhoto=null;renderEdit()">Remove photo</button>`:''}
      </div>
      <div>
        <div class="frow">
          <div class="f"><label>Brand</label><input type="text" id="edBrand" value="${esc(u.brand)}"></div>
          <div class="f"><label>Category</label><select id="edCat" onchange="editPreview()">${CATS.map(c=>`<option${c===u.cat?' selected':''}>${c}</option>`).join('')}</select></div>
          <div class="f full"><label>Model description</label><input type="text" id="edModel" value="${esc(u.model)}"></div>
          <div class="f"><label>Serial number</label><input type="text" id="edSerial" value="${esc(u.serial)}"></div>
          <div class="f"><label>Store</label><select id="edLoc">${LOCATIONS.map(l=>`<option${l===u.loc?' selected':''}>${l}</option>`).join('')}</select></div>
          <div class="f"><label>Condition grade</label>
            <select id="edGrade" onchange="editPreview()">
              <option value="A"${u.grade==='A'?' selected':''}>A — Like new</option>
              <option value="B"${u.grade==='B'?' selected':''}>B — Light wear</option>
              <option value="C"${u.grade==='C'?' selected':''}>C — Cosmetic damage</option>
            </select></div>
          <div class="f"><label>Warranty offered</label>
            <select id="edWar">${['90-day parts & labor','60-day parts','30-day parts','As-is, no warranty'].map(w=>`<option${w===u.warranty?' selected':''}>${w}</option>`).join('')}</select></div>
          <div class="f"><label>What we paid (cost)</label><input type="number" id="edCost" value="${u.cost}" oninput="editPreview()"></div>
          <div class="f"><label>Ask price (list)</label><input type="number" id="edList" value="${u.list}" oninput="editPreview()"></div>
          <div class="f"><label>Days on floor</label><input type="number" id="edDays" value="${u.received}" oninput="editPreview()"></div>
          <div class="f"><label>Status on the website</label>
            <select id="edStatus">
              <option value="available"${u.status==='available'?' selected':''}>Live — showing on the site</option>
              <option value="reserved"${u.status==='reserved'?' selected':''}>Reserved — held for a customer</option>
              <option value="sold"${u.status==='sold'?' selected':''}>Sold — off the site</option>
            </select></div>
          <div class="f full"><label>Flaws — say it plainly, it sells the unit</label><input type="text" id="edFlaw" value="${esc(u.flaw||'')}"></div>
        </div>
        <div id="edPreview"></div>
        <div class="dangerzone">
          <div><b>Remove this unit entirely</b><span>Use this for a duplicate or a mis-entry. Marking it sold is the right move for a machine that actually left the floor.</span></div>
          <button class="btn b-ghost b-sm" onclick="confirmDelete()">Delete Unit</button>
        </div>
      </div>
    </div>`, '', '', `<button class="btn b-rust" onclick="saveEdit()">Save Changes</button>`);
  editPreview();
}
function editTakePhoto(input){
  const f = input.files && input.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = e => { editPhoto = e.target.result; renderEdit(); };
  r.readAsDataURL(f);
}
function editPreview(){
  const box = $('edPreview'); if(!box) return;
  const u = state.units.find(x=>x.id===editId); if(!u) return;
  // price against a copy so a half-typed field never mutates live inventory
  const draft = Object.assign({}, u, {
    cat:$('edCat').value, grade:$('edGrade').value,
    cost:+$('edCost').value||0, list:+$('edList').value||0,
    received:+$('edDays').value||0,
    compAvg:catBaseline($('edCat').value,$('edGrade').value)
  });
  const p = priceOf(draft);
  box.innerHTML = `<div class="drop light">
    <div><b style="font-family:var(--fh)">Website price after saving: ${money(p.price)}</b>
    <div style="font-size:11.5px;color:var(--brushed)">${p.reason} Margin ${money(p.margin)} at ${p.marginPct}%.</div></div>
  </div>`;
}
function saveEdit(){
  const u = state.units.find(x=>x.id===editId); if(!u) return;
  const brand=($('edBrand').value||'').trim(), model=($('edModel').value||'').trim();
  const list=+$('edList').value||0;
  if(!brand||!model){ toast('Brand and model are required'); return; }
  if(!list){ toast('Enter an ask price'); return; }
  u.brand=brand; u.model=model;
  u.serial=($('edSerial').value||'').trim()||u.serial;
  u.cat=$('edCat').value; u.grade=$('edGrade').value; u.loc=$('edLoc').value;
  u.warranty=$('edWar').value; u.cost=+$('edCost').value||0; u.list=list;
  u.received=Math.max(0,+$('edDays').value||0);
  u.flaw=($('edFlaw').value||'').trim();
  u.status=$('edStatus').value;
  u.compAvg=catBaseline(u.cat,u.grade);
  u.photo=editPhoto;
  editId=null; editPhoto=null;
  closeModal();
  logAct(`Edited ${u.brand} ${u.model} (${u.serial})`);
  toast('Unit updated — the website is already showing it');
  render();
}
function confirmDelete(){
  const u = state.units.find(x=>x.id===editId); if(!u) return;
  modal('Delete This Unit?', `<div class="ok">
    <h2>Remove ${esc(u.brand)} ${esc(u.model)}?</h2>
    <p>This deletes the unit and its photo from the system. It disappears from the website immediately. Sales already recorded against it stay in the payments ledger.</p>
    <p class="hint">If the machine actually sold, close this and set the status to Sold instead — that keeps the history.</p>
  </div>`, 'sm', `renderEdit()`,
    `<button class="btn b-rust" onclick="deleteUnit()">Yes, Delete It</button>`);
}
function deleteUnit(){
  const i = state.units.findIndex(x=>x.id===editId); if(i<0) return;
  logAct(`Deleted ${state.units[i].brand} ${state.units[i].model}`);
  state.units.splice(i,1);
  editId=null; editPhoto=null;
  closeModal();
  toast('Unit deleted — removed from the website');
  render();
}
function markSold(id){
  const u=state.units.find(x=>x.id===id); if(!u) return;
  const p=priceOf(u); u.status='sold';
  state.payments.push({ref:confNum('SALE'),type:'Counter sale',desc:`${u.brand} ${u.model}`,customer:'Walk-in',amount:p.price,status:'Approved',when:new Date(),balance:0});
  logAct(`Marked ${u.brand} ${u.model} sold`);
  toast('Marked sold — pulled from the website');
  render();
}

/* ---------- WANT LIST ---------- */
function cWants(){
  const waiting = state.wants.filter(w=>w.status==='Waiting');
  const agg = {};
  waiting.forEach(w=>{
    const a = agg[w.cat] = agg[w.cat] || {n:0, bands:{}, oldest:w.when};
    a.n++; a.bands[w.band] = (a.bands[w.band]||0)+1;
    if(w.when < a.oldest) a.oldest = w.when;
  });
  const rows = Object.entries(agg).sort((a,b)=>b[1].n-a[1].n);
  const days = d => Math.max(0, Math.round((Date.now()-d.getTime())/86400000));
  const onFloor = c => availableUnits().filter(u=>u.cat===c).length;

  return `<div class="cpanel">
    <h3>What people asked for that you didn't have</h3>
    <p class="sub">Every visitor who scrolled your whole floor and still didn't find it. This is not a mailing list — it is a buying list. Sorted by how many people are waiting.</p>
    ${rows.length?`<div style="overflow-x:auto"><table class="dt">
      <tr><th>They want</th><th class="num">People Waiting</th><th>Most-Asked Budget</th><th class="num">Longest Wait</th><th class="num">On Your Floor Now</th></tr>
      ${rows.map(([cat,a])=>{
        const band = Object.entries(a.bands).sort((x,y)=>y[1]-x[1])[0][0];
        const have = onFloor(cat);
        return `<tr>
          <td><b style="font-family:var(--fh);font-size:13.5px">${cat}</b></td>
          <td class="num" style="color:${a.n>=3?'#E5713F':'inherit'};font-size:15px">${a.n}</td>
          <td style="font-size:12.5px">${band}</td>
          <td class="num" style="color:var(--brushed)">${days(a.oldest)} days</td>
          <td class="num" style="color:${have?'#57C08B':'#E5713F'}">${have}${have?'':' — none'}</td>
        </tr>`;}).join('')}
    </table></div>
    <div class="callout"><b>Read the top row.</b> That is the machine to go buy at auction this week — you already have the customers for it, and you know what they will pay. Most used dealers buy on gut and hope. This turns the website into a purchasing input.</div>

    <h3 style="margin-top:26px">Individual requests</h3>
    <p class="sub">Call or text these when the right unit lands. Marking one sourced takes them off the waiting count.</p>
    <div style="overflow-x:auto"><table class="dt">
      <tr><th>Date</th><th>Customer</th><th>Mobile</th><th>Wants</th><th>Budget</th><th>Status</th><th></th></tr>
      ${state.wants.slice().sort((a,b)=>b.when-a.when).map((w,i)=>`<tr>
        <td style="white-space:nowrap;color:var(--brushed);font-size:12px">${dshort(w.when)}</td>
        <td>${w.name}</td>
        <td style="font-size:12.5px;color:var(--fog)">${w.phone}</td>
        <td style="font-size:12.5px">${w.cat}</td>
        <td style="font-size:12.5px;color:var(--brushed)">${w.band}</td>
        <td>${w.status==='Waiting'?'<span class="chip c-c">Waiting</span>':'<span class="chip c-a">Sourced</span>'}</td>
        <td>${w.status==='Waiting'?`<button class="btn b-ghost b-sm" style="border-color:rgba(255,255,255,.3);color:var(--paper)" onclick="markSourced('${w.ref}')">Mark Sourced</button>`:''}</td>
      </tr>`).join('')}
    </table></div>`
    :`<p style="font-size:13px;color:var(--brushed)">Nobody on the list yet. The form at the bottom of the home page feeds this.</p>`}
  </div>`;
}
function markSourced(ref){
  const w=state.wants.find(x=>x.ref===ref); if(!w) return;
  w.status='Sourced'; toast('Marked sourced — '+w.name+' gets a text');
  render();
}

/* ---------- PRICING ---------- */
function cPricing(){
  const P=state.pricing;
  const avail=availableUnits().map(u=>({u,p:priceOf(u)}));
  const dropping=avail.filter(x=>x.p.discounted).sort((a,b)=>b.p.pctOff-a.p.pctOff);
  const floored=avail.filter(x=>x.p.floored).length;
  const lost=avail.reduce((s,x)=>s+(x.u.list-x.p.price),0);

  return `
  <div class="simbar">
    <div class="t"><b>Demo control — advance the calendar</b><span style="font-size:12.5px;color:var(--fog)">+${state.dayOffset} days from today</span></div>
    <input type="range" min="0" max="120" step="1" value="${state.dayOffset}" oninput="setOffset(+this.value)">
    <p style="font-size:12.5px;color:var(--fog);margin-top:6px">Drag it forward and watch the floor reprice itself. This slider exists only for the demo — in production the clock does this on its own, overnight, with no one touching a keyboard.</p>
  </div>

  <div class="cpanel">
    <h3>Pricing rules</h3>
    <p class="sub">Two independent rules. Age markdown protects turn. Market comp protects position. When both run, the engine takes the lower of the two and then refuses to go below the margin floor.</p>
    <div class="modes">
      <button class="${P.mode==='off'?'on':''}" onclick="setPMode('off')">Off — manual</button>
      <button class="${P.mode==='age'?'on':''}" onclick="setPMode('age')">Age markdown</button>
      <button class="${P.mode==='comp'?'on':''}" onclick="setPMode('comp')">Market comp</button>
      <button class="${P.mode==='both'?'on':''}" onclick="setPMode('both')">Both</button>
    </div>
    <div class="pricegrid">
      <div style="${P.mode==='comp'||P.mode==='off'?'opacity:.35;pointer-events:none':''}">
        <h3 style="font-size:12px">Age markdown tiers</h3>
        <p class="sub" style="margin-bottom:12px">Once a unit passes a threshold, the discount applies automatically and the site shows a price-drop badge.</p>
        ${P.tiers.map((t,i)=>`<div class="tier">
          <div class="f"><label>After (days)</label><input type="number" value="${t.d}" onchange="setTier(${i},'d',+this.value)"></div>
          <div class="f"><label>Discount (%)</label><input type="number" value="${t.p}" onchange="setTier(${i},'p',+this.value)"></div>
          <div style="font-size:11.5px;color:var(--brushed);padding-bottom:10px">${availableUnits().filter(u=>daysOnFloor(u)>=t.d).length} units</div>
        </div>`).join('')}
      </div>
      <div style="${P.mode==='age'||P.mode==='off'?'opacity:.35;pointer-events:none':''}">
        <h3 style="font-size:12px">Market comp target</h3>
        <p class="sub" style="margin-bottom:12px">Where you want to sit against comparable local listings. 100% is dead-on the average; below undercuts it.</p>
        <div class="rangewrap">
          <div style="display:flex;justify-content:space-between;font-family:var(--fh);font-weight:800;font-size:13px;margin-bottom:6px">
            <span>Price at</span><span>${P.compTarget}% of local average</span></div>
          <input type="range" min="80" max="115" value="${P.compTarget}" oninput="setComp(+this.value)">
        </div>
        <h3 style="font-size:12px;margin-top:20px">Margin floor</h3>
        <p class="sub" style="margin-bottom:12px">The hard stop. No rule may price a unit below this margin over what you paid.</p>
        <div class="rangewrap">
          <div style="display:flex;justify-content:space-between;font-family:var(--fh);font-weight:800;font-size:13px;margin-bottom:6px">
            <span>Never below</span><span>${P.minMargin}% margin</span></div>
          <input type="range" min="0" max="60" value="${P.minMargin}" oninput="setMargin(+this.value)">
        </div>
        <p class="hint">${floored} unit${floored===1?'':'s'} currently held at the floor.</p>
      </div>
    </div>
  </div>

  <div class="cpanel">
    <h3>What the rules are doing right now</h3>
    <p class="sub">${dropping.length} of ${avail.length} units are marked down. Total price concession across the floor: <b style="color:#E5713F">${money(lost)}</b> — which is what it costs to move ${dropping.length} machines that would otherwise still be sitting there.</p>
    ${dropping.length? dropping.slice(0,8).map(({u,p})=>`
      <div class="drop">
        <div style="display:flex;align-items:center;gap:11px;min-width:0">
          <div class="thumb">${unitImage(u)}</div>
          <div style="min-width:0"><b style="font-family:var(--fh);font-size:13px">${u.brand} ${u.model}</b>
          <div style="font-size:11px;color:var(--brushed);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.reason}</div></div>
        </div>
        <div style="text-align:right;white-space:nowrap">
          <div style="font-family:var(--fh);font-weight:900;font-size:16px">${money(p.price)}</div>
          <div style="font-size:11px;color:var(--brushed);text-decoration:line-through">${money(u.list)}</div>
        </div>
      </div>`).join('') : `<p style="font-size:13px;color:var(--brushed)">No markdowns active. Push the calendar slider forward or turn a rule on.</p>`}
    ${dropping.length>8?`<p class="hint" style="margin-top:8px">+ ${dropping.length-8} more.</p>`:''}
    <div class="callout"><b>The honest caveat:</b> market comp needs a real data feed to be worth anything — scraped local listings or a wholesale index. That is a phase-two build. Age markdown works on day one with nothing but your own intake dates, and it is the rule that actually fixes dead stock.</div>
  </div>`;
}
function setOffset(v){ state.dayOffset=v; render(); }
function setPMode(m){ state.pricing.mode=m; render(); }
function setTier(i,k,v){ state.pricing.tiers[i][k]=v; render(); }
function setComp(v){ state.pricing.compTarget=v; render(); }
function setMargin(v){ state.pricing.minMargin=v; render(); }

/* ---------- SCHEDULE ---------- */
/* ============================================================
   DISPATCH
   A board you can only look at is a calendar. This one moves jobs, assigns
   crew, walks a status ladder, and drafts the customer text at each rung —
   because the reschedule and the "we're running late" call are the same event.
============================================================ */
function allJobs(){
  return [...state.deliveries.map(j=>({j,kind:'delivery'})), ...state.service.map(j=>({j,kind:'service'}))];
}
function findJob(ref){ return allJobs().find(x=>x.j.ref===ref) || null; }
function jobStage(j){ return j.stage || 'scheduled'; }
function slotsFor(kind){ return kind==='delivery' ? DELIVERY_SLOTS : SERVICE_SLOTS; }
function slotLoad(kind, dateKey, slot){
  const list = kind==='delivery' ? state.deliveries : state.service;
  return list.filter(x=>x.dateKey===dateKey && x.slot===slot).length;
}
function firstName(n){ return (n||'').split(' ')[0]; }

function draftMsg(kind, j, stage){
  const d = new Date(j.dateKey+'T12:00:00');
  const when = d.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
  const who = firstName(j.customer);
  const crew = j.crew ? j.crew.replace(/^Truck \d+ — /,'') : 'our crew';
  if(kind==='delivery'){
    return {
      scheduled:`Hi ${who} — Cross Appliances. Your ${j.item} is booked for ${when}, ${j.slot}. Reply here if that stops working for you.`,
      assigned:`Hi ${who} — Cross Appliances. ${crew} has your ${j.item} for ${when}, ${j.slot}. We'll text again when the truck rolls.`,
      enroute:`Hi ${who} — ${crew} is on the way with your ${j.item}, about 30 minutes out. Please clear a path to the spot if you can.`,
      done:`Delivered and hooked up. Thanks ${who} — your warranty starts today. Anything acts up, call 817-629-8047.`,
    }[stage];
  }
  return {
    scheduled:`Hi ${who} — Cross Appliances. Your service call is booked for ${when}, ${j.slot}. $89 diagnostic, waived if we do the repair.`,
    assigned:`Hi ${who} — Cross Appliances. ${crew} is taking your ${j.item} on ${when}, ${j.slot}.`,
    enroute:`Hi ${who} — ${crew} is on the way, about 30 minutes out. Someone 18 or older needs to be there to let him in.`,
    done:`All done. Thanks ${who} — parts and labor on this repair are covered for 90 days. Call 817-629-8047 if it comes back.`,
  }[stage];
}
function moveMsg(kind, j, oldKey, oldSlot){
  const nd = new Date(j.dateKey+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
  const od = new Date(oldKey+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
  return `Hi ${firstName(j.customer)} — Cross Appliances. We need to move your ${kind==='delivery'?'delivery':'service call'} from ${od}, ${oldSlot} to ${nd}, ${j.slot}. Sorry for the shuffle — reply here if that doesn't work and we'll find another window.`;
}
function logMsg(j, body){
  state.messages.unshift({ref:j.ref, to:j.customer, phone:j.phone||'', body, when:new Date()});
  j.msgs = (j.msgs||0) + 1;
}

let dispatchRef = null;
function openJob(ref){ dispatchRef = ref; renderJob(); }
function renderJob(){
  const hit = findJob(dispatchRef); if(!hit) return;
  const {j, kind} = hit;
  const stage = jobStage(j);
  const crewList = kind==='delivery' ? CREW.delivery : CREW.service;
  const days = nextDays(10);
  const draft = draftMsg(kind, j, stage);
  modal(`${kind==='delivery'?'Delivery':'Service Call'} — ${j.customer}`, `
    <div class="jobwrap">
      <div class="jobsum">
        <div><b>${esc(j.item)}</b><span>${esc(j.addr)}</span></div>
        <div class="jobref">${j.ref}</div>
      </div>

      <h4 class="jsec">Where it is in the run</h4>
      <div class="stagebar">
        ${JOB_STAGES.map(([k,l,note])=>`<button class="stagebtn ${stage===k?'on':''}" onclick="setStage('${j.ref}','${k}')">
          <b>${l}</b><span>${note}</span></button>`).join('')}
      </div>

      <h4 class="jsec">Who's taking it</h4>
      <div class="crewrow">
        ${crewList.map(c=>`<button class="crewbtn ${j.crew===c?'on':''}" onclick="assignCrew('${j.ref}','${c.replace(/'/g,"\\'")}')">${c}</button>`).join('')}
        ${j.crew?`<button class="lnk" onclick="assignCrew('${j.ref}','')">Unassign</button>`:''}
      </div>

      <h4 class="jsec">Move it</h4>
      <div class="f full"><label>Day</label>
        <select id="jbDay">${days.map(d=>{const k=dkey(d);return `<option value="${k}"${k===j.dateKey?' selected':''}>${d.toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}</option>`;}).join('')}</select></div>
      <div class="slots" style="margin-top:10px">
        ${slotsFor(kind).map(([label,cap])=>{
          const used = slotLoad(kind, j.dateKey, label) - (j.slot===label?1:0);
          const free = cap - used;
          return `<button class="slot ${j.slot===label?'on':''}" ${free<=0&&j.slot!==label?'disabled':''} onclick="moveJob('${j.ref}','${label}')">
            <b>${label}</b><span>${free<=0&&j.slot!==label?'full':`${free} open`}</span></button>`;
        }).join('')}
      </div>
      <p class="hint" style="margin-top:8px">Pick a day, then a window. Capacity is enforced here the same way it is on the customer side — a full window can't take another job.</p>

      <h4 class="jsec">Text the customer</h4>
      <div class="f full"><textarea id="jbMsg" rows="4">${esc(draft)}</textarea></div>
      <p class="hint">Pre-written for where the job is right now. Edit anything before it goes. ${j.msgs?`<b>${j.msgs} message${j.msgs===1?'':'s'} already sent on this job.</b>`:'Nothing sent yet.'}</p>
    </div>`, '', '', `<button class="btn b-rust" onclick="sendJobMsg('${j.ref}')">Send Text To ${esc(firstName(j.customer))}</button>`);
  const sel = $('jbDay');
  if(sel) sel.onchange = () => { moveDay(j.ref, sel.value); };
}
function moveDay(ref, key){
  const hit = findJob(ref); if(!hit) return;
  const {j, kind} = hit;
  const old = {k:j.dateKey, s:j.slot};
  // keep the same window if it still has room on the new day, else drop to unassigned
  const cap = (slotsFor(kind).find(([l])=>l===j.slot)||[,0])[1];
  j.dateKey = key;
  if(slotLoad(kind, key, j.slot) > cap){ j.slot = ''; }
  if(j.slot) queueMove(j, kind, old);
  renderJob();
}
function moveJob(ref, slot){
  const hit = findJob(ref); if(!hit) return;
  const {j, kind} = hit;
  const old = {k:j.dateKey, s:j.slot};
  j.slot = slot;
  queueMove(j, kind, old);
  renderJob();
  render();
}
function queueMove(j, kind, old){
  if(old.k===j.dateKey && old.s===j.slot) return;
  j.pendingMove = old.s ? moveMsg(kind, j, old.k, old.s) : null;
  logAct(`Moved ${j.customer}'s job to ${j.dateKey} ${j.slot}`);
  toast('Moved — the draft text below now says so');
}
function setStage(ref, stage){
  const hit = findJob(ref); if(!hit) return;
  hit.j.stage = stage;
  hit.j.pendingMove = null;
  logAct(`Set ${hit.j.customer}'s job to ${(JOB_STAGES.find(([k])=>k===stage)||[])[1]}`);
  toast('Status updated');
  renderJob(); render();
}
function assignCrew(ref, crew){
  const hit = findJob(ref); if(!hit) return;
  hit.j.crew = crew || null;
  if(crew && jobStage(hit.j)==='scheduled') hit.j.stage='assigned';
  hit.j.pendingMove = null;
  logAct(crew?`Assigned ${hit.j.customer}'s job to ${crew}`:`Unassigned ${hit.j.customer}'s job`);
  toast(crew?`Assigned to ${crew}`:'Unassigned');
  renderJob(); render();
}
function sendJobMsg(ref){
  const hit = findJob(ref); if(!hit) return;
  const body = ($('jbMsg')||{}).value || '';
  if(!body.trim()){ toast('Nothing to send'); return; }
  logMsg(hit.j, body.trim());
  hit.j.pendingMove = null;
  closeModal();
  logAct(`Texted ${hit.j.customer} about ${hit.j.ref}`);
  toast(`Text sent to ${firstName(hit.j.customer)}`);
  render();
}

function cSchedule(){
  const days=nextDays(10);
  const totalCap=DELIVERY_SLOTS.reduce((s,[,c])=>s+c,0)+SERVICE_SLOTS.reduce((s,[,c])=>s+c,0);
  const booked=state.deliveries.length+state.service.length;
  return `<div class="cpanel">
    <h3>Schedule board</h3>
    <p class="sub">Deliveries and service calls in one view, capped by real truck and tech capacity. When a window fills, the website stops offering it — no double-booking, no callback to reschedule. <b style="color:#fff">${booked} jobs booked</b> across the next eight working days.</p>
    <div class="sched">
      ${days.map(d=>{
        const k=dkey(d);
        const del=state.deliveries.filter(x=>x.dateKey===k);
        const svc=state.service.filter(x=>x.dateKey===k);
        const n=del.length+svc.length;
        const pct=Math.min(100, Math.round(n/totalCap*100));
        const cls = pct>=80?'full':(pct>=40?'busy':'');
        return `<div class="sday">
          <h4>${d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</h4>
          <div class="cap">${n} of ${totalCap} slots booked</div>
          <div class="capbar"><i class="${cls}" style="width:${pct}%"></i></div>
          ${del.map(x=>jobCard(x,'delivery')).join('')}
          ${svc.map(x=>jobCard(x,'service')).join('')}
          ${(!n)?`<div class="nojobs">Nothing booked</div>`:''}
        </div>`;
      }).join('')}
    </div>
    <div class="callout"><b>Green = delivery. Amber = service call.</b> Tap any job to move it, assign a truck or tech, walk its status, and text the customer. Capacity is enforced on this side too — a full window won't take another job.</div>
    ${msgLog()}
  </div>`;
}
function jobCard(x, kind){
  const st = jobStage(x);
  const lbl = (JOB_STAGES.find(([k])=>k===st)||[])[1] || 'Scheduled';
  return `<div class="job ${kind==='service'?'svc':''} st-${st}" onclick="openJob('${x.ref}')">
    <div class="jobtop"><b>${esc(x.customer)}</b><span class="jstage s-${st}">${lbl}</span></div>
    <span>${x.slot}<br>${esc(x.item)}<br>${esc(x.addr)}</span>
    <div class="jobfoot">${x.crew?`<span class="jcrew">${esc(x.crew)}</span>`:`<span class="jcrew none">Unassigned</span>`}${x.msgs?`<span class="jmsg">${x.msgs} sent</span>`:''}</div>
  </div>`;
}
function msgLog(){
  const M = state.messages.slice(0,8);
  return `<div class="msglog">
    <b>Texts sent from this board</b>
    ${M.length?M.map(m=>`<div class="msgrow">
      <div class="mto">${esc(m.to)}<span>${m.ref} · ${m.when.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</span></div>
      <div class="mbodytxt">${esc(m.body)}</div>
    </div>`).join(''):`<p class="hint" style="margin:0">Nothing sent yet. Open a job, pick a status, and the text writes itself.</p>`}
    <p class="hint" style="margin-top:10px">Simulated in this prototype. In production this is a real SMS number — replies come back into the same thread, and the driver app gets a push with the stop list for the day.</p>
  </div>`;
}

/* ---------- PAYMENTS ---------- */
function cPayments(){
  const P=state.payments.slice().sort((a,b)=>b.when-a.when);
  const week=Date.now()-7*86400000;
  const recent=P.filter(x=>x.when.getTime()>=week);
  const vol=recent.reduce((s,x)=>s+x.amount,0);
  const est=vol*0.029+recent.length*0.30;
  const outstanding=P.reduce((s,x)=>s+(x.balance||0),0);
  const L=state.leads.slice().sort((a,b)=>b.when-a.when);
  return `<div class="cpanel">
    <h3>Payments ledger</h3>
    <p class="sub">Every deposit, delivery fee, service call and counter sale in one place, tied back to a unit. Simulated in this prototype — production routes through Accept Blue, provisioned by AlliedOne.</p>
    <div style="overflow-x:auto"><table class="dt">
      <tr><th>Date</th><th>Reference</th><th>Type</th><th>What</th><th>Customer</th><th class="num">Amount</th><th class="num">Balance Due</th><th>Status</th></tr>
      ${P.map(x=>`<tr>
        <td style="white-space:nowrap;color:var(--brushed);font-size:12px">${dshort(x.when)}</td>
        <td style="font-family:ui-monospace,Menlo,monospace;font-size:11.5px">${x.ref}</td>
        <td style="white-space:nowrap">${x.type}</td><td style="font-size:12px">${x.desc}</td><td style="font-size:12px">${x.customer}</td>
        <td class="num">${money(x.amount)}</td>
        <td class="num" style="color:var(--brushed)">${x.balance?money(x.balance):'—'}</td>
        <td><span class="chip c-a">${x.status}</span></td></tr>`).join('')}
    </table></div>
    <div class="kpis" style="margin-top:20px">
      <div class="kpi"><b>${money(vol)}</b><span>Card Volume · 7 Days</span></div>
      <div class="kpi"><b>${recent.length}</b><span>Transactions · 7 Days</span></div>
      <div class="kpi"><b>${money(est)}</b><span>Est. Processing Cost</span></div>
      <div class="kpi warn"><b>${money(outstanding)}</b><span>Balances Owed On Holds</span></div>
    </div>
    <div class="callout"><b>The point of putting payments here:</b> deposits stop no-shows on held units, delivery fees get collected before the truck rolls instead of chased after, and service calls are paid at booking. Cross is currently running all three of those on trust and a phone call.</div>
  </div>

  <div class="cpanel">
    <h3>Financing applications started on the website</h3>
    <p class="sub">Every customer who taps Acima or Snap on the financing page becomes a named lead with a phone number — instead of a browser tab they closed at 11pm.</p>
    ${L.length?`<div style="overflow-x:auto"><table class="dt">
      <tr><th>Date</th><th>Reference</th><th>Customer</th><th>Partner</th><th>Spend Band</th><th>Store</th><th>Status</th></tr>
      ${L.map(x=>`<tr>
        <td style="white-space:nowrap;color:var(--brushed);font-size:12px">${dshort(x.when)}</td>
        <td style="font-family:ui-monospace,Menlo,monospace;font-size:11.5px">${x.ref}</td>
        <td>${x.name}</td><td>${x.partner}</td><td style="font-size:12px">${x.band}</td>
        <td style="font-size:12px">${x.loc}</td><td><span class="chip c-c">${x.status}</span></td></tr>`).join('')}
    </table></div>`:`<p style="font-size:13px;color:var(--brushed)">No financing applications started yet.</p>`}
  </div>`;
}

/* ============================================================
   MODAL
============================================================ */
function modal(title, body, size, back, action){
  // `back` is a JS expression string, not stored HTML — going back re-runs the
  // opener so the previous screen is rebuilt from live state, never a stale copy.
  // `action` is the primary CTA, pinned in a real footer so phones always show it.
  $('modalHost').innerHTML=`<div class="scrim" onclick="if(event.target===this)closeModal()">
    <div class="modal ${size||''}">
      <div class="mhead">
        ${back?`<button class="mback" onclick="${back}">${ICON.back} Back</button>`:''}
        <h3>${title}</h3><button class="mclose" onclick="closeModal()" aria-label="Close">&times;</button></div>
      <div class="mbody">${body}</div>
      ${action?`<div class="mfoot">${action}</div>`:''}
    </div></div>`;
  document.body.style.overflow='hidden';
  applyLang();
}
function closeModal(){ $('modalHost').innerHTML=''; document.body.style.overflow=''; }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

seedStaff();
seedOperations();
seedOrders();
applyHash();
render();
