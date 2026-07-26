/* ============================================================
   STAFF CONSOLE
============================================================ */
const CTABS=[['intake','Add A Unit'],['inventory','All Inventory'],['wants','Want List'],['pricing','Pricing Engine'],['schedule','Schedule Board'],['payments','Payments']];

function renderConsole(){
  let inner='';
  if(state.ctab==='intake') inner=cIntake();
  else if(state.ctab==='inventory') inner=cInventory();
  else if(state.ctab==='wants') inner=cWants();
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
      <div class="kpi warn"><b>${state.wants.filter(w=>w.status==='Waiting').length}</b><span>Customers Waiting</span></div>
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
function modal(title, body, size, back){
  // `back` is a JS expression string, not stored HTML — going back re-runs the
  // opener so the previous screen is rebuilt from live state, never a stale copy
  $('modalHost').innerHTML=`<div class="scrim" onclick="if(event.target===this)closeModal()">
    <div class="modal ${size||''}">
      <div class="mhead">
        ${back?`<button class="mback" onclick="${back}">${ICON.back} Back</button>`:''}
        <h3>${title}</h3><button onclick="closeModal()">&times;</button></div>
      <div class="mbody">${body}</div>
    </div></div>`;
  document.body.style.overflow='hidden';
  applyLang();
}
function closeModal(){ $('modalHost').innerHTML=''; document.body.style.overflow=''; }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

seedOperations();
seedOrders();
applyHash();
render();
