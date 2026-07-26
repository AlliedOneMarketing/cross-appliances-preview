/* ============================================================
   CONSTANTS
============================================================ */
const LOCATIONS = ['Mineral Wells Hwy','FM 920'];
const LOCDATA = {
  'Mineral Wells Hwy':{
    key:'mw', img:'assets/loc1.jpg',
    street:'1506 Mineral Wells Hwy, Suite A', city:'Weatherford, TX 76086',
    phone:'817-374-9412', email:'sales@crossappliances.com',
    note:'Showroom and sales counter. Financing applications processed here.',
    dir:'1506+Mineral+Wells+Hwy+Suite+A,+Weatherford,+TX+76086'
  },
  'FM 920':{
    key:'fm', img:'assets/loc2.jpg',
    street:'2053 FM 920', city:'Weatherford, TX 76088',
    phone:'817-374-9412', email:'service@crossappliances.com',
    note:'Warehouse, service bay and repair intake. Delivery trucks stage here.',
    dir:'2053+FM+920,+Weatherford,+TX+76088'
  }
};
const CATS = ['Washer','Dryer','Refrigerator','Range','Dishwasher','Freezer','Microwave'];
const GRADE_LABEL = {A:'Grade A · Like New', B:'Grade B · Light Wear', C:'Grade C · Cosmetic Damage'};
const GRADE_CLASS = {A:'c-a', B:'c-b', C:'c-c'};
const MAIN_PHONE = '817-374-9412';
const REPAIR_PHONE = '817-629-8047';

let uid = 100;
function mk(brand,model,cat,grade,cost,list,compAvg,days,loc,flaw,warranty){
  return {id:++uid,brand,model,cat,grade,cost,list,compAvg,received:days,loc,flaw:flaw||'',warranty:warranty||'90-day parts & labor',status:'available',photo:null,serial:'CX'+(Math.floor(Math.random()*9000)+1000)+'-'+cat.slice(0,2).toUpperCase()};
}

/* ============================================================
   STATE
============================================================ */
const state = {
  mode:'customer', view:'shop', ctab:'intake',
  auth:false, dayOffset:0,
  pricing:{ mode:'both', tiers:[{d:30,p:8},{d:60,p:16},{d:90,p:28}], compTarget:100, minMargin:22 },
  filters:{cat:'all',loc:'all',grade:'all',max:2000,sort:'new'},
  units:[
    mk('Whirlpool','4.5 cu. ft. Top-Load Washer','Washer','A',260,449,470,12,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Maytag','7.0 cu. ft. Electric Dryer','Dryer','A',215,399,415,12,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Frigidaire','25 cu. ft. Side-by-Side Refrigerator','Refrigerator','B',430,799,760,54,'FM 920','Small dent, right door','90-day parts & labor'),
    mk('GE','30" Free-Standing Electric Range','Range','C',175,399,360,71,'FM 920','Dent left side, cooktop scuffed','60-day parts'),
    mk('Samsung','Front-Load Washer, Steam','Washer','A',420,749,780,6,'FM 920','','90-day parts & labor'),
    mk('LG','Gas Dryer, Sensor Dry','Dryer','B',300,549,530,33,'Mineral Wells Hwy','Minor scuff on lid','90-day parts & labor'),
    mk('Whirlpool','Top-Freezer Refrigerator, 18 cu. ft.','Refrigerator','A',340,629,650,9,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Amana','24" Built-In Dishwasher','Dishwasher','B',120,279,265,47,'FM 920','Rack rail replaced','60-day parts'),
    mk('Kenmore','Chest Freezer, 15 cu. ft.','Freezer','A',185,349,340,21,'FM 920','','90-day parts & labor'),
    mk('Frigidaire','Over-the-Range Microwave','Microwave','B',65,149,140,63,'Mineral Wells Hwy','Handle scratched','30-day parts'),
    mk('GE','Stackable Washer/Dryer, Electric','Washer','B',520,949,910,28,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Hotpoint','30" Gas Range','Range','B',195,379,395,17,'FM 920','','90-day parts & labor'),
    mk('Whirlpool','Front-Load Dryer, Electric','Dryer','C',150,299,285,88,'FM 920','Dented back panel, cosmetic','60-day parts'),
    mk('Samsung','French Door Refrigerator, 28 cu. ft.','Refrigerator','A',720,1299,1340,4,'FM 920','','90-day parts & labor'),
    mk('Maytag','Top-Load Washer, Deep Fill','Washer','B',245,429,440,38,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Whirlpool','24" Front-Control Dishwasher','Dishwasher','A',175,349,365,15,'Mineral Wells Hwy','','90-day parts & labor'),
  ],
  deliveries:[], service:[], payments:[], leads:[]
};


/* Per-unit photography + spec sheet. Photos are rendered product shots, shot
   to one consistent setup exactly as the brand direction prescribes. */
const UNIT_EXTRA = [
 {photo:'assets/u01.jpg', finish:'White', specs:['4.5 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u02.jpg', finish:'White', specs:['7.0 cu. ft. capacity','Electric, 240V','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats to temp and cycles off','Drum bearing quiet','Lint path clear, thermal fuse good']},
 {photo:'assets/u03.jpg', finish:'Stainless', specs:['25 cu. ft. capacity','Side-by-side','Ice and water in door','36" wide × 69" tall'],
  checked:['Holds 37°F fresh / 0°F freezer','Compressor amp-draw normal','Ice maker cycles, door seals good']},
 {photo:'assets/u04.jpg', finish:'White', specs:['30" free-standing','Electric, 240V','4 coil elements','Self-clean oven'],
  checked:['All 4 elements heat','Oven holds set temp ±10°F','Door hinge and seal intact']},
 {photo:'assets/u05.jpg', finish:'Slate', specs:['4.5 cu. ft. capacity','Front-load with steam','Vibration reduction','27" wide × 38" tall'],
  checked:['Full cycle run, no error codes','Door boot clean, no mildew','Drain pump clear and quiet']},
 {photo:'assets/u06.jpg', finish:'White', specs:['7.4 cu. ft. capacity','Natural gas','Sensor dry','27" wide × 39" tall'],
  checked:['Igniter and burner tested','Sensor dry ends cycle correctly','Gas fittings leak-checked']},
 {photo:'assets/u07.jpg', finish:'White', specs:['18 cu. ft. capacity','Top freezer','Glass shelves','30" wide × 66" tall'],
  checked:['Holds temp in both compartments','Defrost cycle verified','Gaskets seal, no odor']},
 {photo:'assets/u08.jpg', finish:'Black', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle, fills and drains','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u09.jpg', finish:'White', specs:['15 cu. ft. capacity','Chest style','Manual defrost','Power-on indicator'],
  checked:['Pulls down to 0°F','Lid seal and hinge good','Drain plug present']},
 {photo:'assets/u10.jpg', finish:'Stainless', specs:['1.7 cu. ft. capacity','Over-the-range','300 CFM vent','Includes mounting plate'],
  checked:['Heats and turntable spins','Vent fan and light work','Door latch and seal good']},
 {photo:'assets/u11.jpg', finish:'White', specs:['Stacked laundry center','Electric, 240V','Washer 3.8 / dryer 5.9 cu. ft.','27" wide × 76" tall'],
  checked:['Both units run full cycles','No leaks, drum quiet','Stack brackets included']},
 {photo:'assets/u12.jpg', finish:'Stainless', specs:['30" free-standing','Natural gas','4 sealed burners','Broiler drawer'],
  checked:['All burners light and hold flame','Oven thermostat calibrated','Gas fittings leak-checked']},
 {photo:'assets/u13.jpg', finish:'Bisque', specs:['7.0 cu. ft. capacity','Electric, 240V','3 heat settings','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Back panel dent is cosmetic only','Thermal fuse and vent clear']},
 {photo:'assets/u14.jpg', finish:'Stainless', specs:['28 cu. ft. capacity','French door, bottom freezer','Ice and water dispenser','36" wide × 70" tall'],
  checked:['Holds temp in all zones','Dispenser and ice maker tested','Doors align, seals good']},
 {photo:'assets/u15.jpg', finish:'White', specs:['4.2 cu. ft. capacity','Deep-fill option','Auto load sensing','27" wide × 42" tall'],
  checked:['Full cycle run and drained','Spin balance tested','Lid switch working']},
 {photo:'assets/u16.jpg', finish:'Stainless', specs:['24" built-in','Front control','Stainless tub','5 wash cycles'],
  checked:['Full cycle, heats and dries','No leaks anywhere','Racks, rails and arms intact']},
];
state.units.forEach((u,i)=>{ const e=UNIT_EXTRA[i]; if(!e) return; u.photo=e.photo; u.finish=e.finish; u.specs=e.specs; u.checked=e.checked; });

/* ============================================================
   PRICING ENGINE
============================================================ */
function daysOnFloor(u){ return u.received + state.dayOffset; }
function ageDiscount(u){
  const d = daysOnFloor(u);
  let pct = 0;
  state.pricing.tiers.slice().sort((a,b)=>a.d-b.d).forEach(t=>{ if(d >= t.d) pct = t.p; });
  return pct;
}
function roundRetail(x){
  if(x<=0) return 0;
  return Math.max(Math.floor(x/10)*10 - 1, 9);
}
function priceOf(u){
  const P = state.pricing, list = u.list;
  const agePct = ageDiscount(u);
  const agePrice = list * (1 - agePct/100);
  const compPrice = u.compAvg * (P.compTarget/100);
  let target = list, reason = 'List price';

  if(P.mode === 'off'){ target = list; reason = 'Manual list price. Pricing engine is off.'; }
  else if(P.mode === 'age'){
    target = agePrice;
    reason = agePct>0 ? `Automatic markdown: ${agePct}% off after ${daysOnFloor(u)} days on the floor.` : `No markdown yet — ${daysOnFloor(u)} days on the floor.`;
  }
  else if(P.mode === 'comp'){
    target = compPrice;
    reason = `Priced at ${P.compTarget}% of the local market average ($${Math.round(u.compAvg)}).`;
  }
  else {
    target = Math.min(agePrice, compPrice);
    reason = `Lower of two rules applied (age ${agePct}% → $${roundRetail(agePrice)}  ·  market ${P.compTarget}% → $${roundRetail(compPrice)}).`;
  }

  const floor = u.cost * (1 + P.minMargin/100);
  let floored = false;
  if(target < floor && P.mode !== 'off'){ target = floor; floored = true; reason += ` Held at the ${P.minMargin}% margin floor.`; }

  const final = roundRetail(target);
  const cut = list - final;
  const meaningful = cut >= 20 && final <= list*0.95;
  return {
    price: final, list, discounted: meaningful,
    pctOff: Math.max(0, Math.round((1 - final/list)*100)),
    reason, floored, agePct,
    margin: final - u.cost,
    marginPct: final ? Math.round(((final - u.cost)/final)*100) : 0
  };
}

/* ============================================================
   HELPERS
============================================================ */
const $ = id => document.getElementById(id);
const money = n => '$' + Math.round(n).toLocaleString('en-US');
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove('show'),2400); }
function confNum(p){ return p + '-' + Math.floor(100000 + Math.random()*899999); }
function availableUnits(){ return state.units.filter(u=>u.status!=='sold'); }
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function svgFor(cat){
  const s='stroke="#3F4850" stroke-width="2.5" fill="none"';
  const base = {
    'Washer':`<rect x="14" y="8" width="72" height="104" rx="3" fill="#F8F6F2" ${s}/><circle cx="50" cy="70" r="22" fill="#E6E1D9" ${s}/><circle cx="50" cy="70" r="15" fill="#D3CCC2" ${s}/><line x1="14" y1="34" x2="86" y2="34" ${s}/><circle cx="73" cy="21" r="4" fill="#C24A1E"/>`,
    'Dryer':`<rect x="14" y="8" width="72" height="104" rx="3" fill="#F8F6F2" ${s}/><circle cx="50" cy="70" r="22" fill="#E6E1D9" ${s}/><path d="M40 70a10 10 0 0 1 20 0" ${s}/><line x1="14" y1="34" x2="86" y2="34" ${s}/><rect x="24" y="17" width="22" height="6" rx="1" fill="#8D959C"/>`,
    'Refrigerator':`<rect x="16" y="8" width="68" height="104" rx="3" fill="#F8F6F2" ${s}/><line x1="16" y1="46" x2="84" y2="46" ${s}/><rect x="72" y="24" width="4" height="16" rx="2" fill="#8D959C"/><rect x="72" y="54" width="4" height="20" rx="2" fill="#8D959C"/>`,
    'Range':`<rect x="12" y="24" width="76" height="84" rx="3" fill="#F8F6F2" ${s}/><rect x="24" y="42" width="52" height="34" rx="2" fill="#DDD7CD" ${s}/><line x1="12" y1="36" x2="88" y2="36" ${s}/><circle cx="26" cy="86" r="3.5" fill="#C24A1E"/><circle cx="40" cy="86" r="3.5" fill="#8D959C"/><circle cx="60" cy="86" r="3.5" fill="#8D959C"/><circle cx="74" cy="86" r="3.5" fill="#8D959C"/>`,
    'Dishwasher':`<rect x="16" y="16" width="68" height="92" rx="3" fill="#F8F6F2" ${s}/><line x1="16" y1="34" x2="84" y2="34" ${s}/><rect x="28" y="22" width="30" height="5" rx="1" fill="#8D959C"/><rect x="30" y="52" width="40" height="34" rx="2" fill="#E6E1D9" ${s}/>`,
    'Freezer':`<rect x="8" y="34" width="84" height="60" rx="3" fill="#F8F6F2" ${s}/><line x1="8" y1="50" x2="92" y2="50" ${s}/><rect x="42" y="38" width="16" height="5" rx="2" fill="#8D959C"/><circle cx="20" cy="72" r="4" fill="#2E6B4C"/>`,
    'Microwave':`<rect x="8" y="34" width="84" height="52" rx="3" fill="#F8F6F2" ${s}/><rect x="16" y="42" width="48" height="36" rx="2" fill="#DDD7CD" ${s}/><rect x="72" y="44" width="12" height="4" rx="1" fill="#8D959C"/><circle cx="78" cy="62" r="5" fill="#C24A1E"/>`
  };
  return `<svg viewBox="0 0 100 120">${base[cat] || base['Washer']}</svg>`;
}
function unitImage(u){ return u.photo ? `<img src="${u.photo}" alt="">` : svgFor(u.cat); }

const ICON = {
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M4 12l5 5L20 6"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="4" y="10" width="16" height="11" rx="1"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
};

/* ============================================================
   SCHEDULING
============================================================ */
const DELIVERY_SLOTS = [['8:00 – 10:00 AM',2],['10:00 AM – 12:00 PM',2],['12:00 – 2:00 PM',2],['2:00 – 4:00 PM',2],['4:00 – 6:00 PM',1]];
const SERVICE_SLOTS  = [['8:00 – 11:00 AM',3],['11:00 AM – 2:00 PM',3],['2:00 – 5:00 PM',3]];

function nextDays(n){
  const out=[]; const base=new Date();
  for(let i=1;i<=n+6;i++){
    const d=new Date(base.getTime()+i*86400000);
    if(d.getDay()===0) continue;
    out.push(d);
  }
  return out.slice(0,8);
}
const dkey = d => d.toISOString().slice(0,10);
const dlabel = d => d.toLocaleDateString('en-US',{weekday:'short'}).toUpperCase();
const dnum = d => d.getDate();
const dfull = d => d.toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'});
const dshort = d => d.toLocaleDateString('en-US',{month:'short', day:'numeric'});

function slotsTaken(kind, dateKey, slot){
  const list = kind==='delivery' ? state.deliveries : state.service;
  return list.filter(x=>x.dateKey===dateKey && x.slot===slot).length;
}

/* ============================================================
   SEED OPERATIONAL DATA — so the boards read like a live week
============================================================ */
function seedOperations(){
  const D = nextDays(10);
  const k = i => dkey(D[Math.min(i, D.length-1)]);

  [['Dana Whitfield','412 Santa Fe Dr, Weatherford',0,0,'Whirlpool 4.5 cu. ft. Top-Load Washer'],
   ['Marcus Kelley','1108 E Bankhead Dr, Weatherford',0,2,'Frigidaire 25 cu. ft. Side-by-Side Refrigerator'],
   ['Teresa Nolan','205 Oak St, Millsap',1,1,'GE 30" Free-Standing Electric Range'],
   ['Bobby Ruiz','3300 Fort Worth Hwy, Hudson Oaks',1,3,'Kenmore Chest Freezer, 15 cu. ft.'],
   ['Angela Prine','77 County Rd 3690, Springtown',2,0,'Samsung Front-Load Washer, Steam'],
   ['Hector Salinas','1420 Palo Pinto St, Weatherford',3,4,'LG Gas Dryer, Sensor Dry'],
   ['Wanda Tibbs','902 N Main St, Weatherford',5,1,'Whirlpool Top-Freezer Refrigerator, 18 cu. ft.']
  ].forEach(([c,a,di,si,item])=>{
    state.deliveries.push({ref:confNum('DEL'),dateKey:k(di),slot:DELIVERY_SLOTS[si][0],customer:c,addr:a,item,notes:''});
  });

  [['Ramona Estes','818 Alford Dr, Weatherford',0,0,'Refrigerator — Not heating / not cooling'],
   ['Chuck Lindley','2210 Zion Hill Rd, Weatherford',0,1,'Dryer — Not heating / not cooling'],
   ['Priscilla Vance','604 Ranger Hwy, Weatherford',1,2,"Washer — Won't drain or spin"],
   ['Danny Kowalczyk','130 Bethel Rd, Aledo',2,0,'Range — Error code on display'],
   ['Ellen Marsh','55 Old Dennis Rd, Weatherford',4,1,'Dishwasher — Leaking water']
  ].forEach(([c,a,di,si,item])=>{
    state.service.push({ref:confNum('SVC'),dateKey:k(di),slot:SERVICE_SLOTS[si][0],customer:c,addr:a,item,notes:''});
  });

  const ago = n => new Date(Date.now() - n*86400000);
  [[6,'Counter sale','Maytag 7.0 cu. ft. Electric Dryer','Gilbert Ozuna',399,0],
   [6,'Service call','Refrigerator — Not cooling','Ramona Estes',89,0],
   [5,'Counter sale','Whirlpool Front-Load Dryer, Electric','Sheila Barrow',249,0],
   [5,'Delivery fee','Whirlpool Front-Load Dryer','Sheila Barrow',79,0],
   [5,'Deposit','Frigidaire 25 cu. ft. Side-by-Side','Marcus Kelley',50,715],
   [4,'Repair — parts & labor','Dryer heating element + labor','Chuck Lindley',218,0],
   [4,'Counter sale','Hotpoint 30" Gas Range','Delia Fontenot',379,0],
   [3,'Delivery fee','GE Electric Range','Teresa Nolan',79,0],
   [3,'Deposit','Samsung Front-Load Washer, Steam','Angela Prine',50,760],
   [2,'Counter sale','Amana 24" Built-In Dishwasher','Rudy Kaplan',259,0],
   [2,'Service call',"Washer — Won't drain or spin",'Priscilla Vance',89,0],
   [1,'Counter sale','Samsung French Door Refrigerator, 28 cu. ft.','Marisol Aguirre',1299,0],
   [1,'Delivery fee','Samsung French Door Refrigerator','Marisol Aguirre',79,0],
   [1,'Deposit','Kenmore Chest Freezer, 15 cu. ft.','Bobby Ruiz',50,327],
   [0,'Service call','Range — Error code','Danny Kowalczyk',89,0],
   [0,'Counter sale','Frigidaire Over-the-Range Microwave','Pete Hollingsworth',129,0]
  ].forEach(([d,type,desc,customer,amount,balance])=>{
    state.payments.push({ref:confNum(type.slice(0,3).toUpperCase()),type,desc,customer,amount,status:'Approved',when:ago(d),balance});
  });

  [[3,'Krystal Ferrer','Acima','$1,500 – $2,500','Mineral Wells Hwy'],
   [2,'Omar Beltran','Snap Finance','$800 – $1,500','FM 920'],
   [1,'Latoya Simms','Acima','Under $800','Mineral Wells Hwy']
  ].forEach(([d,name,partner,band,loc])=>{
    state.leads.push({ref:confNum('FIN'),name,partner,band,loc,when:ago(d),status:'Link sent'});
  });

  // reflect the week's sales in inventory status
  const sell = m => { const u=state.units.find(x=>x.model===m); if(u) u.status='sold'; };
  const hold = m => { const u=state.units.find(x=>x.model===m); if(u) u.status='reserved'; };
  sell('7.0 cu. ft. Electric Dryer'); sell('Front-Load Dryer, Electric');
  hold('25 cu. ft. Side-by-Side Refrigerator'); hold('Front-Load Washer, Steam');
}

/* ============================================================
   FORM PERSISTENCE ACROSS RE-RENDER
============================================================ */
const formCache={};
function snapForms(){
  document.querySelectorAll('#app input[id], #app select[id], #app textarea[id]').forEach(el=>{
    if(el.type==='file') return; formCache[el.id]=el.value;
  });
}
function restoreForms(){
  Object.keys(formCache).forEach(id=>{
    const el=document.getElementById(id);
    if(!el || el.type==='file' || el.type==='range') return;
    if(!el.matches('input,select,textarea')) return;
    if(formCache[id]!==undefined && formCache[id]!=='') el.value=formCache[id];
  });
}
function clearForm(ids){ ids.forEach(i=>{ delete formCache[i]; const el=document.getElementById(i); if(el) el.value=''; }); }

/* ============================================================
   SHELL
============================================================ */
const CUST_VIEWS = [['shop','Shop Inventory'],['delivery','Delivery'],['service','Service &amp; Repair'],['financing','Financing'],['locations','Locations']];

function render(){
  snapForms();
  $('nav').innerHTML = state.mode==='customer'
    ? CUST_VIEWS.map(([k,l])=>`<button class="${state.view===k?'on':''}" onclick="go('${k}')">${l}</button>`).join('')
    : '';
  $('modeswitch').innerHTML = state.mode==='customer'
    ? `<button class="on">Customer</button>
       <button onclick="requestStaff()"><span class="lock">${ICON.lock}</span>Staff Console</button>`
    : `<button onclick="exitStaff()">Customer</button>
       <button class="on">Staff Console</button>
       <button onclick="signOut()" title="Sign out">Sign Out</button>`;
  renderMobMenu();
  $('app').innerHTML = state.mode==='staff' ? renderConsole() : renderCustomer();
  restoreForms();
  if(state.mode==='staff' && state.ctab==='intake') suggestPrice();
  if(state.mode==='customer' && state.view==='financing') updateEstimate();
}
function go(v){ state.view=v; closeMenu(); window.scrollTo(0,0); render(); }

/* ---------- mobile navigation drawer ---------- */
function renderMobMenu(){
  const el=$('mobmenu'); if(!el) return;
  const avail=availableUnits();
  const counts={shop:avail.length};
  el.innerHTML = `<div class="wrap">
    ${state.mode==='customer' ? CUST_VIEWS.map(([k,l])=>`
      <button class="mlink ${state.view===k?'on':''}" onclick="go('${k}')">
        <span>${l}</span>${k==='shop'?`<span class="c">${counts.shop} in stock</span>`:'<span class="c">&rsaquo;</span>'}
      </button>`).join('') : `
      <button class="mlink" onclick="exitStaff()"><span>Back to the website</span><span class="c">&rsaquo;</span></button>
      ${CTABS.map(([k,l])=>`<button class="mlink ${state.ctab===k?'on':''}" onclick="ctab('${k}');closeMenu()"><span>${l}</span><span class="c">&rsaquo;</span></button>`).join('')}`}
    <a class="mcall" href="tel:+18173749412">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>
      Call 817-374-9412</a>
    <div class="minfo"><b>Mineral Wells Hwy</b>1506 Mineral Wells Hwy, Ste A · Weatherford</div>
    <div class="minfo"><b>FM 920</b>2053 FM 920 · Weatherford</div>
    <div class="minfo"><b>Hours</b>Mon–Fri 9–6 · Sat 9–4 · Closed Sunday</div>
    ${state.mode==='customer'
      ? `<button class="mstaff" onclick="closeMenu();requestStaff()"><span class="lock">${ICON.lock}</span> Staff Console</button>`
      : `<button class="mstaff" onclick="closeMenu();signOut()">Sign Out</button>`}
  </div>`;
}
function toggleMenu(){
  const m=$('mobmenu'), b=$('burger');
  const open=!m.classList.contains('open');
  m.classList.toggle('open',open); b.classList.toggle('on',open);
  b.setAttribute('aria-expanded',open?'true':'false');
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu(){
  const m=$('mobmenu'), b=$('burger');
  if(!m) return;
  m.classList.remove('open'); b.classList.remove('on');
  b.setAttribute('aria-expanded','false');
  if(!$('modalHost').innerHTML) document.body.style.overflow='';
}
function ctab(t){ state.ctab=t; window.scrollTo(0,0); render(); }
function exitStaff(){ closeMenu(); state.mode='customer'; window.scrollTo(0,0); render(); }
function shopCat(c){ closeMenu(); state.mode='customer'; state.view='shop'; state.filters.cat=c; window.scrollTo(0,0); render(); }

/* ---------- STAFF AUTH ---------- */
function requestStaff(){
  closeMenu();
  if(state.auth){ state.mode='staff'; window.scrollTo(0,0); render(); return; }
  loginModal();
}
function signOut(){ closeMenu(); state.auth=false; state.mode='customer'; window.scrollTo(0,0); render(); toast('Signed out of staff console'); }
function loginModal(err){
  modal('Staff Sign-In', `
    <div class="loginwrap">
      <div class="shield" style="padding:14px">${ICON.lock}</div>
      <h2>Staff console is restricted.</h2>
      <p>Inventory costs, margins, customer records and the payments ledger live behind this door. Customers never see it.</p>
    </div>
    ${err?`<div class="err">${err}</div>`:''}
    <div class="frow">
      <div class="f full"><label>Staff ID</label><input type="text" id="lgUser" placeholder="e.g. mcruz" autocomplete="off"></div>
      <div class="f full"><label>PIN</label><input type="password" id="lgPin" placeholder="4-digit PIN" maxlength="4" onkeydown="if(event.key==='Enter')doLogin()"></div>
    </div>
    <button class="btn b-rust" style="width:100%" onclick="doLogin()">Sign In</button>
    <div class="demo-creds"><b>Demo credentials</b> — Staff ID <b>mcruz</b> · PIN <b>1506</b>. In production this is per-person, with roles: counter staff see inventory and scheduling, owners also see cost, margin and payments.</div>
  `,'sm');
  setTimeout(()=>{ const el=$('lgUser'); if(el) el.focus(); },60);
}
function doLogin(){
  const u=($('lgUser').value||'').trim().toLowerCase();
  const p=($('lgPin').value||'').trim();
  if(!u || !p){ loginModal('Enter a staff ID and PIN.'); return; }
  if((u==='mcruz'||u==='ncruz'||u==='staff') && p==='1506'){
    state.auth=true; state.mode='staff'; closeModal(); window.scrollTo(0,0); render();
    toast('Signed in — staff console');
  } else {
    loginModal('That staff ID and PIN combination was not recognized.');
  }
}

/* ============================================================
   CUSTOMER PAGES
============================================================ */
function renderCustomer(){
  if(state.view==='delivery')  return pageDelivery();
  if(state.view==='service')   return pageService();
  if(state.view==='financing') return pageFinancing();
  if(state.view==='locations') return pageLocations();
  return pageShop();
}

function pageShop(){
  const avail = availableUnits();
  const priced = avail.map(u=>({u,p:priceOf(u)}));
  const onSale = priced.filter(x=>x.p.discounted).length;

  let list = priced.filter(({u,p})=>{
    const f=state.filters;
    if(f.cat!=='all' && u.cat!==f.cat) return false;
    if(f.loc!=='all' && u.loc!==f.loc) return false;
    if(f.grade!=='all' && u.grade!==f.grade) return false;
    if(p.price > f.max) return false;
    return true;
  });
  const s=state.filters.sort;
  list.sort((a,b)=>{
    if(s==='new') return daysOnFloor(a.u)-daysOnFloor(b.u);
    if(s==='low') return a.p.price-b.p.price;
    if(s==='high') return b.p.price-a.p.price;
    if(s==='drop') return b.p.pctOff-a.p.pctOff;
    return 0;
  });

  return `
  <div class="hero"><div class="wrap">
    <div>
      <span class="chip c-md">${avail.length} Units On The Floor Today</span>
      <h1>Appliances that<br>run. Priced to go.</h1>
      <p>Every washer, dryer, fridge and range on this page is a real machine sitting in Weatherford right now — photographed, graded, and warrantied by our floor staff. Not a catalog.</p>
      <div class="cta">
        <button class="btn b-rust" onclick="document.getElementById('inv').scrollIntoView({behavior:'smooth'})">Shop What's In Stock</button>
        <button class="btn b-light" onclick="go('service')">Book a Repair</button>
      </div>
      <span class="fam">Family Owned &nbsp;·&nbsp; Discount Appliances &nbsp;·&nbsp; Service &amp; Repairs &nbsp;·&nbsp; Weatherford, TX</span>
    </div>
    <div class="hstats">
      <div class="hstat"><b>${avail.length}</b><span>Units In Stock</span></div>
      <div class="hstat"><b>${onSale}</b><span>Marked Down Today</span></div>
      <div class="hstat"><b>2</b><span>Weatherford Locations</span></div>
    </div>
  </div></div>

  <div class="filters"><div class="wrap">
    <div class="fgroup"><label>Category</label>
      <select onchange="setF('cat',this.value)">
        <option value="all">All appliances</option>
        ${CATS.map(c=>`<option ${state.filters.cat===c?'selected':''}>${c}</option>`).join('')}
      </select></div>
    <div class="fgroup"><label>Location</label>
      <select onchange="setF('loc',this.value)">
        <option value="all">Both stores</option>
        ${LOCATIONS.map(l=>`<option ${state.filters.loc===l?'selected':''}>${l}</option>`).join('')}
      </select></div>
    <div class="fgroup"><label>Condition</label>
      <select onchange="setF('grade',this.value)">
        <option value="all">Any grade</option>
        <option value="A" ${state.filters.grade==='A'?'selected':''}>Grade A — Like new</option>
        <option value="B" ${state.filters.grade==='B'?'selected':''}>Grade B — Light wear</option>
        <option value="C" ${state.filters.grade==='C'?'selected':''}>Grade C — Cosmetic damage</option>
      </select></div>
    <div class="fgroup"><label>Max price — ${money(state.filters.max)}</label>
      <input type="range" min="100" max="2000" step="50" value="${state.filters.max}" oninput="setF('max',+this.value)" style="width:150px"></div>
    <div class="fgroup"><label>Sort</label>
      <select onchange="setF('sort',this.value)">
        <option value="new" ${s==='new'?'selected':''}>Newest arrivals</option>
        <option value="drop" ${s==='drop'?'selected':''}>Biggest price drop</option>
        <option value="low" ${s==='low'?'selected':''}>Price: low to high</option>
        <option value="high" ${s==='high'?'selected':''}>Price: high to low</option>
      </select></div>
    <div class="fcount">${list.length} shown</div>
  </div></div>

  <div class="section" id="inv"><div class="wrap">
    <div class="grid">
      ${list.length ? list.map(({u,p})=>unitCard(u,p)).join('') :
        `<div class="empty"><b>Nothing matches those filters.</b><br>Try widening the price range or switching stores.</div>`}
    </div>
  </div></div>
  ${siteFooter()}`;
}

function unitCard(u,p){
  return `<button class="unit" onclick="openUnit(${u.id})">
    <div class="img">
      <div class="tags">
        <span class="chip ${GRADE_CLASS[u.grade]}">Grade ${u.grade}</span>
        ${p.discounted?`<span class="chip c-md">−${p.pctOff}%</span>`:''}
      </div>
      ${u.status==='reserved'?`<div class="tagsR"><span class="chip c-sold">Reserved</span></div>`:''}
      ${unitImage(u)}
    </div>
    <div class="body">
      <div class="brand">${u.brand}</div>
      <div class="name">${u.model}</div>
      <div class="price">${money(p.price)} ${p.discounted?`<span class="was">${money(p.list)}</span>`:''}</div>
      <div class="foot"><span>${u.loc}</span><span>${daysOnFloor(u)} days on floor</span></div>
    </div>
  </button>`;
}
function setF(k,v){ state.filters[k]=v; render(); }

/* ---------- UNIT DETAIL ---------- */
function openUnit(id){
  const u = state.units.find(x=>x.id===id); if(!u) return;
  const p = priceOf(u);
  modal(`${u.brand} — ${u.model}`, `
    <div class="det">
      <div>
        <div class="ph">${unitImage(u)}</div>
        <div style="display:flex;gap:7px;margin-top:12px;flex-wrap:wrap">
          <span class="chip ${GRADE_CLASS[u.grade]}">${GRADE_LABEL[u.grade]}</span>
          <span class="chip c-out">${u.warranty}</span>
          ${p.discounted?`<span class="chip c-md">Price drop −${p.pctOff}%</span>`:''}
        </div>
      </div>
      <div>
        <div class="eyebrow">${u.brand}</div>
        <h2>${u.model}</h2>
        <div class="bigprice">${money(p.price)} ${p.discounted?`<span class="was">${money(p.list)}</span>`:''}</div>
        <div class="why"><b>Why this price:</b> ${p.reason}</div>
        <table class="specs">
          <tr><td>Condition</td><td>${GRADE_LABEL[u.grade]}${u.flaw?` — ${u.flaw}`:''}</td></tr>
          ${u.finish?`<tr><td>Finish</td><td>${u.finish}</td></tr>`:''}
          ${u.specs?`<tr><td>Specs</td><td>${u.specs.join('<br>')}</td></tr>`:''}
          <tr><td>Serial</td><td>${u.serial}</td></tr>
          <tr><td>Location</td><td>${u.loc}, Weatherford TX</td></tr>
          <tr><td>Days on floor</td><td>${daysOnFloor(u)}</td></tr>
          <tr><td>Warranty</td><td>${u.warranty}</td></tr>
        </table>
        ${u.checked?`<div class="checked">
          <h4>What we tested before it hit the floor</h4>
          <ul>${u.checked.map(c=>`<li>${ICON.check}<span>${c}</span></li>`).join('')}</ul>
        </div>`:''}
        <div class="stack">
          ${u.status==='reserved'
            ? `<div class="why" style="border-left-color:var(--amber)">This unit is reserved. Call ${MAIN_PHONE} to be next in line.</div>`
            : `<button class="btn b-rust" onclick="openCheckout(${u.id})">Reserve With $50 Deposit</button>
               <button class="btn b-ghost" onclick="closeModal();go('delivery')">Schedule Delivery</button>
               <button class="btn b-ghost" onclick="closeModal();go('financing')">See Financing Options</button>`}
        </div>
        <p class="hint" style="margin-top:12px">This is the only unit at this price. Deposit holds it for 72 hours and comes off the total.</p>
      </div>
    </div>`);
}

/* ---------- CHECKOUT ---------- */
function openCheckout(id){
  const u=state.units.find(x=>x.id===id); const p=priceOf(u);
  const deposit=50, tax=Math.round(p.price*0.0825), total=p.price+tax;
  modal('Reserve This Unit', `
    <div class="frow">
      <div class="f full"><label>Reserving</label>
        <div style="font-family:var(--fh);font-weight:800;font-size:16px">${u.brand} ${u.model}</div>
        <div class="hint">${u.serial} · ${u.loc} · ${GRADE_LABEL[u.grade]}</div></div>
      <div class="f"><label>Full name</label><input type="text" id="ckName" placeholder="Jane Cross"></div>
      <div class="f"><label>Mobile</label><input type="tel" id="ckPhone" placeholder="(817) 555-0142"></div>
      <div class="f full"><label>Email</label><input type="email" id="ckEmail" placeholder="you@email.com"></div>
      <div class="f full"><label>Card number</label><input type="text" id="ckCard" placeholder="4242 4242 4242 4242" maxlength="19" oninput="fmtCard(this)"></div>
      <div class="f"><label>Expires</label><input type="text" id="ckExp" placeholder="09 / 29" maxlength="7"></div>
      <div class="f"><label>CVC</label><input type="text" id="ckCvc" placeholder="123" maxlength="4"></div>
    </div>
    <div class="sumbox">
      <div class="sumrow"><span>Unit price</span><span>${money(p.price)}</span></div>
      <div class="sumrow"><span>Estimated sales tax (8.25%)</span><span>${money(tax)}</span></div>
      <div class="sumrow" style="color:var(--brushed)"><span>Balance due at pickup or delivery</span><span>${money(total-deposit)}</span></div>
      <div class="sumrow tot"><span>Charged today — deposit</span><span>${money(deposit)}</span></div>
    </div>
    <button class="btn b-rust" style="width:100%" onclick="payDeposit(${u.id},${deposit},${total})">Pay ${money(deposit)} Deposit</button>
    <p class="hint" style="margin-top:11px;text-align:center">Simulated transaction — no live gateway is connected in this prototype. Production routes through Accept Blue.</p>
  `,'sm');
}
function fmtCard(el){ el.value = el.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim(); }
function payDeposit(id,deposit,total){
  const u=state.units.find(x=>x.id===id);
  const name=($('ckName').value||'').trim();
  const card=($('ckCard').value||'').replace(/\s/g,'');
  if(!name){ toast('Enter a name'); return; }
  if(card.length<15){ toast('Enter a card number'); return; }
  u.status='reserved';
  const c=confNum('RES');
  state.payments.push({ref:c,type:'Deposit',desc:`${u.brand} ${u.model}`,customer:name,amount:deposit,status:'Approved',when:new Date(),balance:total-deposit});
  modal('Reserved', `<div class="ok">
      <div class="tick">✓</div>
      <h2>Unit reserved for 72 hours.</h2>
      <p>We texted ${esc(name.split(' ')[0])} the details. The ${u.brand} is off the floor and tagged with this number.</p>
      <div class="conf">${c}</div>
      <p style="margin-bottom:18px">Balance of ${money(total-deposit)} is due at pickup or delivery.</p>
      <button class="btn b-rust" onclick="closeModal();go('delivery')">Schedule Delivery Now</button>
      <button class="btn b-ghost" style="margin-left:8px" onclick="closeModal()">Done</button>
    </div>`,'sm');
  render();
}

/* ---------- DELIVERY ---------- */
let dSel={date:null,slot:null};
function pageDelivery(){
  const days=nextDays(10);
  return `<div class="section"><div class="wrap">
    <div class="eyebrow">Delivery &amp; Install</div>
    <h2 class="ph1">Pick a day. We'll bring it and hook it up.</h2>
    <p class="plede">$79 flat within Parker County, includes haul-away of your old unit. Two-hour arrival windows so you aren't waiting all day. Slots are live — when a window fills, it disappears.</p>
    <div class="two">
      <div class="panel">
        <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:4px">1 — Choose a date</h3>
        <p class="hint">Closed Sundays.</p>
        <div class="days">${days.map(d=>{
          const k=dkey(d); const full=DELIVERY_SLOTS.every(([s,cap])=>slotsTaken('delivery',k,s)>=cap);
          return `<button class="day ${dSel.date===k?'on':''}" ${full?'disabled':''} onclick="pickDay('${k}')">
            <span>${dlabel(d)}</span><b>${dnum(d)}</b></button>`;}).join('')}
        </div>
        <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin:24px 0 4px">2 — Choose a window</h3>
        <p class="hint">${dSel.date?'Remaining capacity shown per window.':'Select a date first.'}</p>
        <div class="slots">${DELIVERY_SLOTS.map(([s,cap])=>{
          const left = dSel.date ? cap - slotsTaken('delivery',dSel.date,s) : cap;
          return `<button class="slot ${dSel.slot===s?'on':''}" ${(!dSel.date||left<=0)?'disabled':''} onclick="pickSlot('${s.replace(/'/g,"\\'")}')">
            <b>${s}</b><span>${dSel.date? (left>0? left+' left':'Full') : cap+' trucks'}</span></button>`;}).join('')}
        </div>
      </div>
      <div class="panel">
        <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:14px">3 — Where are we going?</h3>
        <div class="frow">
          <div class="f"><label>Name</label><input type="text" id="dvName" placeholder="Jane Cross"></div>
          <div class="f"><label>Mobile</label><input type="tel" id="dvPhone" placeholder="(817) 555-0142"></div>
          <div class="f full"><label>Street address</label><input type="text" id="dvAddr" placeholder="1204 Palo Pinto St"></div>
          <div class="f"><label>City</label><input type="text" id="dvCity" value="Weatherford"></div>
          <div class="f"><label>ZIP</label><input type="text" id="dvZip" value="76086" maxlength="5"></div>
          <div class="f full"><label>What are we delivering?</label>
            <select id="dvUnit">
              <option value="">— Select a reserved or in-stock unit —</option>
              ${availableUnits().map(u=>`<option value="${u.id}">${u.brand} ${u.model} — ${u.serial}</option>`).join('')}
            </select></div>
          <div class="f full"><label>Gate code, dogs, stairs, anything we should know</label><textarea id="dvNotes" rows="2" placeholder="Optional"></textarea></div>
        </div>
        <div class="sumbox">
          <div class="sumrow"><span>Delivery, install &amp; haul-away</span><span>$79</span></div>
          <div class="sumrow tot"><span>Charged when scheduled</span><span>$79</span></div>
        </div>
        <button class="btn b-rust" style="width:100%" onclick="bookDelivery()">Confirm Delivery — Pay $79</button>
        <p class="hint" style="margin-top:10px;text-align:center">Simulated transaction. Production routes through Accept Blue.</p>
      </div>
    </div>
  </div></div>${siteFooter()}`;
}
function pickDay(k){ dSel.date=k; dSel.slot=null; render(); }
function pickSlot(s){ dSel.slot=s; render(); }
function bookDelivery(){
  const name=($('dvName').value||'').trim(), addr=($('dvAddr').value||'').trim(), unitId=$('dvUnit').value;
  if(!dSel.date||!dSel.slot){ toast('Pick a date and window'); return; }
  if(!name||!addr){ toast('Name and address required'); return; }
  const u = unitId ? state.units.find(x=>x.id===+unitId) : null;
  const c=confNum('DEL');
  state.deliveries.push({ref:c,dateKey:dSel.date,slot:dSel.slot,customer:name,addr:addr+', '+$('dvCity').value+' '+$('dvZip').value,item:u?`${u.brand} ${u.model}`:'Unit TBD',notes:$('dvNotes').value});
  state.payments.push({ref:c,type:'Delivery fee',desc:u?`${u.brand} ${u.model}`:'Delivery',customer:name,amount:79,status:'Approved',when:new Date(),balance:0});
  const d=new Date(dSel.date+'T12:00:00');
  modal('Delivery Scheduled', `<div class="ok">
    <div class="tick">✓</div><h2>You're on the truck.</h2>
    <p>${dfull(d)}, ${dSel.slot}. We'll text ${esc(name.split(' ')[0])} when the driver is 30 minutes out.</p>
    <div class="conf">${c}</div>
    <button class="btn b-rust" onclick="closeModal();go('shop')">Back To Inventory</button></div>`,'sm');
  dSel={date:null,slot:null};
  clearForm(['dvName','dvPhone','dvAddr','dvNotes']);
  render();
}

/* ---------- SERVICE ---------- */
let sSel={date:null,slot:null};
function pageService(){
  const days=nextDays(10);
  return `<div class="section"><div class="wrap">
    <div class="eyebrow">Service &amp; Repair</div>
    <h2 class="ph1">Broken appliance? Book a tech.</h2>
    <p class="plede">$89 diagnostic, waived if you have us do the repair. We service what we sell and what we didn't. Parker County and surrounding. Repairs line: ${REPAIR_PHONE}.</p>
    <div class="two">
      <div class="panel">
        <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:14px">What's wrong?</h3>
        <div class="frow">
          <div class="f"><label>Appliance</label>
            <select id="svCat">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></div>
          <div class="f"><label>Brand</label><input type="text" id="svBrand" placeholder="Whirlpool"></div>
          <div class="f full"><label>Problem</label>
            <select id="svIssue">
              <option>Won't turn on</option><option>Not heating / not cooling</option>
              <option>Leaking water</option><option>Loud noise or shaking</option>
              <option>Won't drain or spin</option><option>Error code on display</option>
              <option>Something else</option>
            </select></div>
          <div class="f full"><label>Describe it in your own words</label><textarea id="svNotes" rows="3" placeholder="Started making a grinding noise on the spin cycle about a week ago."></textarea></div>
          <div class="f"><label>Name</label><input type="text" id="svName" placeholder="Jane Cross"></div>
          <div class="f"><label>Mobile</label><input type="tel" id="svPhone" placeholder="(817) 555-0142"></div>
          <div class="f full"><label>Service address</label><input type="text" id="svAddr" placeholder="1204 Palo Pinto St, Weatherford TX 76086"></div>
        </div>
      </div>
      <div class="panel">
        <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:4px">When can we come?</h3>
        <p class="hint">Three-hour arrival windows. Closed Sundays.</p>
        <div class="days">${days.map(d=>{
          const k=dkey(d); const full=SERVICE_SLOTS.every(([s,cap])=>slotsTaken('service',k,s)>=cap);
          return `<button class="day ${sSel.date===k?'on':''}" ${full?'disabled':''} onclick="pickSDay('${k}')">
            <span>${dlabel(d)}</span><b>${dnum(d)}</b></button>`;}).join('')}
        </div>
        <div class="slots" style="grid-template-columns:1fr;margin-top:16px">${SERVICE_SLOTS.map(([s,cap])=>{
          const left = sSel.date ? cap - slotsTaken('service',sSel.date,s) : cap;
          return `<button class="slot ${sSel.slot===s?'on':''}" ${(!sSel.date||left<=0)?'disabled':''} onclick="pickSSlot('${s.replace(/'/g,"\\'")}')">
            <b>${s}</b><span>${sSel.date?(left>0?left+' techs available':'Fully booked'):cap+' techs'}</span></button>`;}).join('')}
        </div>
        <div class="sumbox">
          <div class="sumrow"><span>Diagnostic call</span><span>$89</span></div>
          <div class="sumrow" style="color:var(--brushed)"><span>Waived if we do the repair</span><span>−$89</span></div>
          <div class="sumrow tot"><span>Charged when booked</span><span>$89</span></div>
        </div>
        <button class="btn b-rust" style="width:100%" onclick="bookService()">Book Tech — Pay $89</button>
        <p class="hint" style="margin-top:10px;text-align:center">Simulated transaction. Production routes through Accept Blue.</p>
      </div>
    </div>
  </div></div>${siteFooter()}`;
}
function pickSDay(k){ sSel.date=k; sSel.slot=null; render(); }
function pickSSlot(s){ sSel.slot=s; render(); }
function bookService(){
  const name=($('svName').value||'').trim(), addr=($('svAddr').value||'').trim();
  if(!sSel.date||!sSel.slot){ toast('Pick a date and window'); return; }
  if(!name||!addr){ toast('Name and address required'); return; }
  const c=confNum('SVC');
  const desc=`${$('svCat').value} — ${$('svIssue').value}`;
  state.service.push({ref:c,dateKey:sSel.date,slot:sSel.slot,customer:name,addr,item:desc,notes:$('svNotes').value});
  state.payments.push({ref:c,type:'Service call',desc,customer:name,amount:89,status:'Approved',when:new Date(),balance:0});
  const d=new Date(sSel.date+'T12:00:00');
  modal('Tech Booked', `<div class="ok">
    <div class="tick">✓</div><h2>Tech is scheduled.</h2>
    <p>${dfull(d)}, ${sSel.slot}. ${esc(desc)}.</p>
    <div class="conf">${c}</div>
    <button class="btn b-rust" onclick="closeModal();go('shop')">Back To Inventory</button></div>`,'sm');
  sSel={date:null,slot:null};
  clearForm(['svName','svPhone','svAddr','svNotes','svBrand']);
  render();
}

/* ---------- FINANCING ---------- */
function pageFinancing(){
  return `
  <div class="finhero"><div class="wrap">
    <div class="eyebrow" style="color:#E5713F">Financing</div>
    <h1>No credit? Still yes.</h1>
    <p>Approved in the store in about ten minutes. Bring a photo ID, a checking account, and proof of income. Both Weatherford locations, both partners, same day.</p>
  </div></div>

  <div class="section" style="padding-top:0"><div class="wrap">
    <div class="fincards">
      <div class="fincard">
        <div class="lockup lk-acima">acima</div>
        <h3>Lease-to-own up to $4,000</h3>
        <p class="d">No credit needed. Take the appliance home today and own it through scheduled payments, with early purchase options that cut the total.</p>
        <ul class="finfacts">
          <li>${ICON.check}<span>Approval decision in minutes, in the store</span></li>
          <li>${ICON.check}<span>No credit history required to apply</span></li>
          <li>${ICON.check}<span>Early purchase option lowers what you pay overall</span></li>
          <li>${ICON.check}<span>Available at both Weatherford locations</span></li>
        </ul>
        <button class="btn b-rust" onclick="finModal('Acima')">Start With Acima</button>
      </div>
      <div class="fincard">
        <div class="lockup lk-snap">snap<i>.</i></div>
        <h3>100-day purchase option</h3>
        <p class="d">Soft credit check only — applying will not affect your credit score. Pay it off inside 100 days and you pay substantially less than the full lease term.</p>
        <ul class="finfacts">
          <li>${ICON.check}<span>Soft check — no impact on your credit score</span></li>
          <li>${ICON.check}<span>100-day early payoff option</span></li>
          <li>${ICON.check}<span>Apply from your phone before you come in</span></li>
          <li>${ICON.check}<span>Available at both Weatherford locations</span></li>
        </ul>
        <button class="btn b-dark" onclick="finModal('Snap Finance')">Start With Snap Finance</button>
      </div>
    </div>

    <div class="steps">
      <div class="step"><div class="n">01</div><h4>Pick your appliance</h4><p>Find the unit on this site or on the floor. Every price already includes the warranty — financing doesn't change the sticker.</p></div>
      <div class="step"><div class="n">02</div><h4>Apply in about 10 minutes</h4><p>Photo ID, a checking account and proof of income. We run it at the counter with you, or you start it here and finish in store.</p></div>
      <div class="step"><div class="n">03</div><h4>Take it home</h4><p>Approved same day. Pick it up, or put it on the delivery truck with install and haul-away for $79.</p></div>
    </div>

    <div class="est">
      <div>
        <h3>What would the payment look like?</h3>
        <p>Slide to the price of the appliance you're considering. This gives you the ballpark weekly payment on a typical 12-month lease-to-own agreement so you're not guessing before you walk in.</p>
        <input type="range" id="estRange" min="150" max="2000" step="25" value="600" oninput="updateEstimate()">
        <div style="display:flex;justify-content:space-between;font-family:var(--fh);font-weight:800;font-size:13px;margin-top:8px">
          <span>Appliance price</span><span id="estPrice">$600</span>
        </div>
        <p class="disclaim">Illustrative estimate only. Actual terms, payment amounts, fees and total cost are set by Acima or Snap Finance based on your application — not by Cross Appliances. Early purchase options reduce the total substantially. Ask us for the exact numbers before you sign anything.</p>
      </div>
      <div class="out">
        <b id="estOut">$22 – $30</b>
        <span>Estimated weekly payment</span>
        <div style="border-top:1px solid rgba(255,255,255,.16);margin-top:16px;padding-top:14px">
          <b id="estCash" style="font-size:26px">$600</b>
          <span>If you pay cash today</span>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:34px">
      <h3 style="font-size:13px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:10px">Paying with a card instead</h3>
      <p style="font-size:14.5px;color:var(--iron)">Deposits, delivery fees, service calls and full purchases can all be paid by card online or at the counter. Same price either way — we don't add a card surcharge. Questions on any of it, call ${MAIN_PHONE}.</p>
    </div>
  </div></div>
  ${siteFooter()}`;
}
function updateEstimate(){
  const r=$('estRange'); if(!r) return;
  const v=+r.value;
  const low=Math.round(v*1.55/52), high=Math.round(v*2.1/52);
  $('estPrice').textContent=money(v);
  $('estOut').textContent=`${money(low)} – ${money(high)}`;
  $('estCash').textContent=money(v);
}
function finModal(partner){
  modal(`Start With ${partner}`, `
    <p style="font-size:14.5px;color:var(--iron);margin-bottom:18px">Give us three things and we'll text you a secure application link from ${partner}. Nothing here affects your credit — ${partner==='Snap Finance'?'Snap runs a soft check only':'Acima does not require credit history'}.</p>
    <div class="frow">
      <div class="f"><label>Full name</label><input type="text" id="fnName" placeholder="Jane Cross"></div>
      <div class="f"><label>Mobile</label><input type="tel" id="fnPhone" placeholder="(817) 555-0142"></div>
      <div class="f"><label>About how much are you spending?</label>
        <select id="fnBand"><option>Under $800</option><option selected>$800 – $1,500</option><option>$1,500 – $2,500</option><option>$2,500 – $4,000</option></select></div>
      <div class="f"><label>Which store?</label>
        <select id="fnLoc">${LOCATIONS.map(l=>`<option>${l}</option>`).join('')}</select></div>
    </div>
    <button class="btn b-rust" style="width:100%" onclick="submitFin('${partner}')">Text Me The Application Link</button>
    <p class="hint" style="margin-top:11px;text-align:center">Prototype — no application is actually submitted and no credit inquiry is made.</p>
  `,'sm');
}
function submitFin(partner){
  const name=($('fnName').value||'').trim(), phone=($('fnPhone').value||'').trim();
  if(!name||!phone){ toast('Name and mobile required'); return; }
  state.leads.push({ref:confNum('FIN'),name,partner,band:$('fnBand').value,loc:$('fnLoc').value,when:new Date(),status:'Link sent'});
  modal('Link Sent', `<div class="ok">
    <div class="tick">✓</div><h2>Check your phone.</h2>
    <p>${esc(name.split(' ')[0])}, we sent a secure ${partner} application link to ${esc(phone)}. It takes about ten minutes and you can finish it here or at the counter.</p>
    <p style="margin-bottom:18px">Questions before you start? Call ${MAIN_PHONE}.</p>
    <button class="btn b-rust" onclick="closeModal();go('shop')">Keep Shopping</button></div>`,'sm');
  render();
}

/* ---------- LOCATIONS ---------- */
function mapSvg(kind){
  const road='#FFFFFF', casing='#D6D0C6', land='#E8E4DC', block='#DFDAD0', green='#D8E0D2';
  if(kind==='mw'){
    return `<svg viewBox="0 0 640 300" role="img" aria-label="Map of 1506 Mineral Wells Hwy, Weatherford">
      <rect width="640" height="300" fill="${land}"/>
      <rect x="30" y="30" width="150" height="80" fill="${block}"/><rect x="430" y="40" width="170" height="70" fill="${block}"/>
      <rect x="60" y="200" width="130" height="70" fill="${green}"/><rect x="470" y="195" width="140" height="80" fill="${block}"/>
      <path d="M-10 165 L650 128" stroke="${casing}" stroke-width="30"/><path d="M-10 165 L650 128" stroke="${road}" stroke-width="23"/>
      <path d="M250 -10 L268 310" stroke="${casing}" stroke-width="20"/><path d="M250 -10 L268 310" stroke="${road}" stroke-width="14"/>
      <path d="M-10 250 L650 236" stroke="${casing}" stroke-width="13"/><path d="M-10 250 L650 236" stroke="${road}" stroke-width="8"/>
      <path d="M-10 165 L650 128" stroke="#C24A1E" stroke-width="4" stroke-dasharray="12 9" opacity=".55"/>
      <text x="60" y="152" font-family="Archivo,Arial" font-size="12" font-weight="700" fill="#6f7a80" letter-spacing="1.6">US-180 · MINERAL WELLS HWY</text>
      <text x="278" y="286" font-family="Archivo,Arial" font-size="11" font-weight="700" fill="#8a939a" letter-spacing="1.4">BANKHEAD DR</text>
      <text x="276" y="40" font-family="Archivo,Arial" font-size="11" font-weight="700" fill="#8a939a" letter-spacing="1.4">CLEAR LAKE RD</text>
      <g transform="translate(300,120)">
        <path d="M0 26 C-13 8 -18 2 -18 -6 A18 18 0 1 1 18 -6 C18 2 13 8 0 26Z" fill="#C24A1E"/>
        <circle cx="0" cy="-6" r="6.5" fill="#fff"/>
      </g>
      <rect x="322" y="96" width="196" height="30" fill="#16191C"/>
      <text x="333" y="116" font-family="Archivo,Arial" font-size="13" font-weight="800" fill="#fff" letter-spacing=".6">1506 MINERAL WELLS HWY</text>
      <rect x="500" y="262" width="112" height="6" fill="#9aa3a9"/>
      <text x="500" y="256" font-family="Archivo,Arial" font-size="10" font-weight="700" fill="#6f7a80">0.5 MI</text>
    </svg>`;
  }
  return `<svg viewBox="0 0 640 300" role="img" aria-label="Map of 2053 FM 920, Weatherford">
    <rect width="640" height="300" fill="${land}"/>
    <rect x="40" y="35" width="160" height="90" fill="${green}"/><rect x="450" y="30" width="160" height="85" fill="${block}"/>
    <rect x="45" y="205" width="150" height="70" fill="${block}"/><rect x="440" y="210" width="170" height="65" fill="${green}"/>
    <path d="M330 -10 L300 310" stroke="${casing}" stroke-width="28"/><path d="M330 -10 L300 310" stroke="${road}" stroke-width="21"/>
    <path d="M-10 175 L650 190" stroke="${casing}" stroke-width="19"/><path d="M-10 175 L650 190" stroke="${road}" stroke-width="13"/>
    <path d="M-10 70 L650 58" stroke="${casing}" stroke-width="12"/><path d="M-10 70 L650 58" stroke="${road}" stroke-width="7"/>
    <path d="M330 -10 L300 310" stroke="#C24A1E" stroke-width="4" stroke-dasharray="12 9" opacity=".55"/>
    <text x="340" y="272" font-family="Archivo,Arial" font-size="12" font-weight="700" fill="#6f7a80" letter-spacing="1.6">FM 920</text>
    <text x="60" y="168" font-family="Archivo,Arial" font-size="11" font-weight="700" fill="#8a939a" letter-spacing="1.4">POOLVILLE RD</text>
    <text x="62" y="52" font-family="Archivo,Arial" font-size="11" font-weight="700" fill="#8a939a" letter-spacing="1.4">GARNER RD</text>
    <g transform="translate(316,145)">
      <path d="M0 26 C-13 8 -18 2 -18 -6 A18 18 0 1 1 18 -6 C18 2 13 8 0 26Z" fill="#C24A1E"/>
      <circle cx="0" cy="-6" r="6.5" fill="#fff"/>
    </g>
    <rect x="338" y="121" width="150" height="30" fill="#16191C"/>
    <text x="349" y="141" font-family="Archivo,Arial" font-size="13" font-weight="800" fill="#fff" letter-spacing=".6">2053 FM 920</text>
    <rect x="500" y="262" width="112" height="6" fill="#9aa3a9"/>
    <text x="500" y="256" font-family="Archivo,Arial" font-size="10" font-weight="700" fill="#6f7a80">0.5 MI</text>
  </svg>`;
}

function pageLocations(){
  return `<div class="section"><div class="wrap">
    <div class="eyebrow">Locations</div>
    <h2 class="ph1">Two stores in Weatherford.</h2>
    <p class="plede">Sales and showroom on Mineral Wells Hwy. Warehouse, service bay and delivery staging on FM 920. Same inventory system, same warranty, same phone number.</p>
    <div class="locgrid">
      ${LOCATIONS.map(l=>locCard(l)).join('')}
    </div>
  </div></div>${siteFooter()}`;
}
function locCard(l){
  const d=LOCDATA[l];
  const stock=availableUnits().filter(u=>u.loc===l).map(u=>({u,p:priceOf(u)}))
            .sort((a,b)=>daysOnFloor(a.u)-daysOnFloor(b.u));
  return `<div>
    <div class="loccard">
      <div class="locshot" style="background-image:url('${d.img}')">
        <span class="badge chip c-a">${stock.length} units in stock</span>
        <span class="plc">Storefront photo</span>
      </div>
      <div class="locbody">
        <h3>${l}</h3>
        <div class="locmeta">${d.street}<br>${d.city}<br><b>${d.phone}</b></div>
        <p style="font-size:13.5px;color:var(--iron);margin-bottom:16px">${d.note}</p>
        <div class="hoursrow"><b>Mon – Fri</b><span>9:00 AM – 6:00 PM</span></div>
        <div class="hoursrow"><b>Saturday</b><span>9:00 AM – 4:00 PM</span></div>
        <div class="hoursrow closed"><b>Sunday</b><span>Closed</span></div>
      </div>
    </div>
    <div class="mapbox">${mapSvg(d.key)}<span class="mapattr">Locator map · opens in Google Maps</span></div>
    <div class="mapacts">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${d.dir}" target="_blank" rel="noopener">${ICON.pin}Get Directions</a>
      <a href="tel:+1${d.phone.replace(/\D/g,'')}">${ICON.phone}Call Store</a>
      <a href="mailto:${d.email}">${ICON.mail}Email</a>
    </div>
    <div class="stocklist">
      <div class="stockhead"><span>In stock at this store</span><span style="color:var(--brushed)">${stock.length} units</span></div>
      ${stock.length ? stock.slice(0,7).map(({u,p})=>`
        <button class="stockrow" onclick="openUnit(${u.id})">
          <div class="stockthumb">${unitImage(u)}</div>
          <div class="m"><b>${u.brand} ${u.model}</b><span>Grade ${u.grade} · ${daysOnFloor(u)} days on floor</span></div>
          <div class="pz">${money(p.price)}</div>
        </button>`).join('')
        : `<div style="padding:22px 18px;font-size:13px;color:var(--brushed)">Nothing on the floor here right now.</div>`}
      ${stock.length>7?`<button class="stockrow" style="justify-content:center" onclick="viewStore('${l}')">
          <span style="font-family:var(--fh);font-weight:800;font-size:11.5px;letter-spacing:.09em;text-transform:uppercase">See all ${stock.length} units at ${l}</span></button>`:''}
    </div>
  </div>`;
}
function viewStore(l){ state.filters.loc=l; state.filters.cat='all'; go('shop'); }

/* ---------- FOOTER ---------- */
function siteFooter(){
  const avail=availableUnits();
  const byCat=c=>avail.filter(u=>u.cat===c).length;
  return `<footer class="site">
    <div class="wrap">
      <div class="fgrid">
        <div class="fcol">
          <div class="flogo">Cross<em>·</em>Appliances</div>
          <p class="ftag">Family-owned discount appliance store serving Weatherford and Parker County. Like-new washers, dryers, refrigerators and ranges — graded, warrantied, delivered and repaired in house.</p>
          <a class="fphone" href="tel:+18173749412">${MAIN_PHONE}</a>
          <span class="fsmall">Sales &amp; general · Repairs line ${REPAIR_PHONE}</span>
          <div class="fbadges">
            <span class="fbadge">Family Owned</span>
            <span class="fbadge">Warranty Included</span>
            <span class="fbadge">Delivery Available</span>
            <span class="fbadge">Acima &amp; Snap</span>
          </div>
        </div>

        <div class="fcol">
          <h4>Shop Appliances</h4>
          <ul>
            ${CATS.map(c=>`<li><button onclick="shopCat('${c}')">${c}s <span style="color:#6b747a">(${byCat(c)})</span></button></li>`).join('')}
            <li><button onclick="shopCat('all')">View all inventory</button></li>
          </ul>
        </div>

        <div class="fcol">
          <h4>Services</h4>
          <ul>
            <li><button onclick="go('delivery')">Delivery &amp; Installation</button></li>
            <li><button onclick="go('delivery')">Old Appliance Haul-Away</button></li>
            <li><button onclick="go('service')">Appliance Repair</button></li>
            <li><button onclick="go('service')">Same-Week Service Calls</button></li>
            <li><button onclick="go('financing')">Lease-to-Own Financing</button></li>
            <li><button onclick="go('locations')">Store Locations &amp; Hours</button></li>
          </ul>
        </div>

        <div class="fcol">
          <h4>Visit Us</h4>
          ${LOCATIONS.map(l=>{const d=LOCDATA[l];return `
            <div class="floc">
              <b>${l}</b>
              <p>${d.street}<br>${d.city}<br>
              Mon–Fri 9–6 · Sat 9–4 · Sun Closed<br>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${d.dir}" target="_blank" rel="noopener" style="display:inline-block;padding:10px 0;min-height:40px">Get directions →</a></p>
            </div>`;}).join('')}
        </div>
      </div>

      <div class="fserve">
        <b>Appliance sales, delivery and repair serving</b>
        Weatherford · Aledo · Willow Park · Hudson Oaks · Annetta · Brock · Millsap · Peaster · Poolville · Springtown · Azle · Cool · Mineral Wells · Parker County · Palo Pinto County · West Fort Worth
      </div>

      <div class="fbottom">
        <span>© 2026 Cross Appliances LLC · Weatherford, Texas · All rights reserved</span>
        <span>Working prototype built by AlliedOne Marketing. Inventory, pricing, scheduling and payments are demonstration data.</span>
      </div>
    </div>
  </footer>`;
}

/* ============================================================
   STAFF CONSOLE
============================================================ */
const CTABS=[['intake','Add A Unit'],['inventory','All Inventory'],['pricing','Pricing Engine'],['schedule','Schedule Board'],['payments','Payments']];

function renderConsole(){
  let inner='';
  if(state.ctab==='intake') inner=cIntake();
  else if(state.ctab==='inventory') inner=cInventory();
  else if(state.ctab==='pricing') inner=cPricing();
  else if(state.ctab==='schedule') inner=cSchedule();
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
      <div class="kpi good"><b>${money(retail-cost)}</b><span>Gross Margin At Current Price</span></div>
      <div class="kpi hot"><b>${money(volume)}</b><span>Card Volume · 7 Days</span></div>
    </div>
    <div class="ctabs">${CTABS.map(([k,l])=>`<button class="${state.ctab===k?'on':''}" onclick="ctab('${k}')">${l}</button>`).join('')}</div>
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
  </div>`;
}
function takePhoto(input){
  const f=input.files && input.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{ pendingPhoto=e.target.result; render(); };
  r.readAsDataURL(f);
}
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
      <tr><th>Unit</th><th>Store</th><th>Grade</th><th>Days</th><th class="num">Cost</th><th class="num">List</th><th class="num">Live Price</th><th class="num">Margin</th><th>Status</th><th></th></tr>
      ${rows.map(({u,p})=>`<tr>
        <td><div class="tdname"><div class="thumb">${unitImage(u)}</div>
          <div><b>${u.brand} ${u.model}</b><span>${u.serial}${u.flaw?' · '+u.flaw:''}</span></div></div></td>
        <td style="font-size:12px">${u.loc}</td>
        <td><span class="chip ${GRADE_CLASS[u.grade]}">${u.grade}</span></td>
        <td class="num" style="${daysOnFloor(u)>=60?'color:#C88A14':''}">${daysOnFloor(u)}</td>
        <td class="num" style="color:var(--brushed)">${money(u.cost)}</td>
        <td class="num" style="color:var(--brushed)">${money(u.list)}</td>
        <td class="num">${money(p.price)} ${p.discounted?`<span class="dropcell">−${p.pctOff}%</span>`:''}</td>
        <td class="num" style="color:${p.marginPct<20?'#E5713F':'#57C08B'}">${money(p.margin)} <span style="font-weight:400;font-size:11px;color:var(--brushed)">${p.marginPct}%</span></td>
        <td>${u.status==='available'?'<span class="chip c-a">Live</span>':u.status==='reserved'?'<span class="chip c-c">Reserved</span>':'<span class="chip c-sold">Sold</span>'}</td>
        <td>${u.status==='sold'?'':`<button class="btn b-ghost b-sm" style="border-color:rgba(255,255,255,.3);color:var(--paper)" onclick="markSold(${u.id})">Mark Sold</button>`}</td>
      </tr>`).join('')}
    </table></div>
  </div>`;
}
function markSold(id){
  const u=state.units.find(x=>x.id===id); if(!u) return;
  const p=priceOf(u); u.status='sold';
  state.payments.push({ref:confNum('SALE'),type:'Counter sale',desc:`${u.brand} ${u.model}`,customer:'Walk-in',amount:p.price,status:'Approved',when:new Date(),balance:0});
  toast('Marked sold — pulled from the website');
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
          ${del.map(x=>`<div class="job"><b>${x.customer}</b><span>${x.slot}<br>${x.item}<br>${x.addr}</span></div>`).join('')}
          ${svc.map(x=>`<div class="job svc"><b>${x.customer}</b><span>${x.slot}<br>${x.item}<br>${x.addr}</span></div>`).join('')}
          ${(!n)?`<div class="nojobs">Nothing booked</div>`:''}
        </div>`;
      }).join('')}
    </div>
    <div class="callout"><b>Green = delivery. Amber = service call.</b> Book one from the customer side and it lands here instantly. In production this pushes to the drivers' phones and writes back to the office calendar.</div>
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
function modal(title, body, size){
  $('modalHost').innerHTML=`<div class="scrim" onclick="if(event.target===this)closeModal()">
    <div class="modal ${size||''}">
      <div class="mhead"><h3>${title}</h3><button onclick="closeModal()">&times;</button></div>
      <div class="mbody">${body}</div>
    </div></div>`;
  document.body.style.overflow='hidden';
}
function closeModal(){ $('modalHost').innerHTML=''; document.body.style.overflow=''; }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

seedOperations();
render();