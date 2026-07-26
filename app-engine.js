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
function toast(msg){ const t=$('toast'); t.textContent=(__lang==='es' && esLookup(msg)) || msg; t.classList.add('show'); clearTimeout(t._x); t._x=setTimeout(()=>t.classList.remove('show'),2400); }
function confNum(p){ return p + '-' + Math.floor(100000 + Math.random()*899999); }
function availableUnits(){ return state.units.filter(u=>u.status!=='sold'); }
const IS_APPLE = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                 navigator.platform === 'MacIntel' || /Mac OS X/.test(navigator.userAgent);
function mapsHref(addr){
  const q = encodeURIComponent(addr);
  return IS_APPLE ? 'https://maps.apple.com/?daddr=' + q
                  : 'https://www.google.com/maps/dir/?api=1&destination=' + q;
}
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

  [[9,'Gas Dryer','Under $400','Sherry Vasquez','(817) 555-0164'],
   [7,'Refrigerator','$400 – $700','Dwayne Kirkpatrick','(817) 555-0119'],
   [6,'Gas Dryer','$400 – $700','Marla Odom','(940) 555-0177'],
   [5,'Stackable Washer/Dryer','$700 – $1,000','Curtis Lang','(817) 555-0132'],
   [4,'Gas Dryer','Under $400','Nathan Beeler','(817) 555-0148'],
   [3,'Chest Freezer','Under $400','Yolanda Prieto','(817) 555-0155'],
   [2,'Refrigerator','$400 – $700','Trey Hollifield','(682) 555-0103'],
   [1,'Gas Range','$400 – $700','Bonnie Shackelford','(817) 555-0192']
  ].forEach(([d,cat,band,name,phone])=>{
    state.wants.push({ref:confNum('WANT'),cat,band,name,phone,when:ago(d),status:'Waiting'});
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
