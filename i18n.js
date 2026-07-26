/* ============================================================
   SPANISH LAYER
   Exact-match phrase dictionary applied over the rendered DOM after
   every render(). Anything not in the dictionary stays in English
   rather than getting mangled — coverage grows by adding entries,
   never by guessing. Original text is cached on the node so
   switching back to English is a restore, not a reverse-translation.
============================================================ */
const ES = {
// chrome
"Working Prototype — AlliedOne Marketing  ·  Payments are simulated · No live gateway connected":"Prototipo de Trabajo — AlliedOne Marketing  ·  Los pagos son simulados · Sin pasarela activa",
"Mon–Fri 9–6  ·  Sat 9–4  ·  Closed Sun":"Lun–Vie 9–6  ·  Sáb 9–4  ·  Domingo cerrado",
"Mon–Fri 9–6 · Sat 9–4 · Closed Sunday":"Lun–Vie 9–6 · Sáb 9–4 · Domingo cerrado",
"Mon–Fri 9–6 · Sat 9–4 · Sun Closed":"Lun–Vie 9–6 · Sáb 9–4 · Dom cerrado",
"2 Weatherford Locations":"2 Tiendas en Weatherford",
"Family Owned · Delivery Available":"Negocio Familiar · Entrega Disponible",
"Shop Inventory":"Ver Inventario","Delivery":"Entrega","Repair":"Reparación","Financing":"Financiamiento",
"About Us":"Nosotros","Our Locations":"Nuestras Tiendas","Service Area":"Área de Servicio","Reviews":"Reseñas",
"Both Weatherford stores, hours and directions":"Las dos tiendas en Weatherford, horarios y cómo llegar",
"16 towns across Parker County":"16 pueblos del condado de Parker",
"What Google, Facebook and Yelp say":"Lo que dicen Google, Facebook y Yelp",
"Call":"Llamar","Call 817-374-9412":"Llame al 817-374-9412","Customer":"Cliente","Staff Console":"Consola Interna","Sign Out":"Cerrar Sesión",
"Hours":"Horario","Locations":"Tiendas","Visit Us":"Visítanos",
// hero
"Appliances that":"Electrodomésticos que",
"run. Priced to go.":"sirven. A precio de salida.",
"Every washer, dryer, fridge and range on this page is a real machine sitting in Weatherford right now — photographed, graded, and warrantied by our floor staff. Not a catalog.":"Cada lavadora, secadora, refrigerador y estufa en esta página es una máquina real que está en Weatherford ahora mismo — fotografiada, clasificada y con garantía de nuestro personal. No es un catálogo.",
"Shop What's In Stock":"Ver Lo Que Hay","Book a Repair":"Agendar Reparación",
"Family Owned  ·  Discount Appliances  ·  Service & Repairs  ·  Weatherford, TX":"Negocio Familiar  ·  Electrodomésticos de Descuento  ·  Servicio y Reparación  ·  Weatherford, TX",
"Units In Stock":"Unidades Disponibles","Marked Down Today":"Rebajadas Hoy","Weatherford Locations":"Tiendas en Weatherford",
// filters
"Category":"Categoría","All appliances":"Todos los electrodomésticos",
"Washer":"Lavadora","Dryer":"Secadora","Refrigerator":"Refrigerador","Range":"Estufa",
"Dishwasher":"Lavavajillas","Freezer":"Congelador","Microwave":"Microondas",
"Location":"Tienda","Both stores":"Las dos tiendas","Condition":"Condición","Any grade":"Cualquier grado",
"Grade A — Like new":"Grado A — Como nuevo","Grade B — Light wear":"Grado B — Uso ligero","Grade C — Cosmetic damage":"Grado C — Daño cosmético",
"Sort":"Ordenar","Newest arrivals":"Lo más nuevo","Biggest price drop":"Mayor rebaja",
"Price: low to high":"Precio: menor a mayor","Price: high to low":"Precio: mayor a menor",
"Reserved":"Apartado","Sold":"Vendido",
// promise strip
"Every unit":"Cada unidad","90 days":"90 días",
"Parts and labor on most machines. We tell you the exact coverage before you pay a dollar.":"Piezas y mano de obra en la mayoría de las máquinas. Le decimos la cobertura exacta antes de que pague un dólar.",
"Parker County":"Condado de Parker","$79 delivered":"$79 entregado",
"Delivered, hooked up, and your old unit hauled away. Two-hour window, not all day.":"Entregado, instalado y nos llevamos su unidad vieja. Ventana de dos horas, no todo el día.",
"No credit needed":"Sin crédito","10 minutes":"10 minutos",
"Acima and Snap, approved right at the counter. Bring an ID, a checking account and proof of income.":"Acima y Snap, aprobado en el mostrador. Traiga identificación, cuenta de cheques y comprobante de ingresos.",
// want list
"New machines every week":"Máquinas nuevas cada semana","Didn't find it?":"¿No lo encontró?",
"Tell us what":"Díganos qué","you're hunting for.":"anda buscando.",
"Most of what we take in sells off the floor before it ever reaches this page. Tell us what you need and we'll text you the day one lands — before anybody else sees it.":"La mayoría de lo que recibimos se vende del piso antes de llegar a esta página. Díganos qué necesita y le mandamos un mensaje el día que llegue — antes que nadie más lo vea.",
"People On The List":"Personas En La Lista","Costs You Nothing":"No Le Cuesta Nada","One Text, That's It":"Un Mensaje, Nada Más",
"Free":"Gratis","No spam":"Sin spam",
"Appliance already broken?":"¿Ya se le descompuso?","Book a repair instead ›":"Mejor agende una reparación ›",
"Put me on the list":"Apúnteme en la lista","What are you looking for?":"¿Qué está buscando?",
"Something else":"Otra cosa","About what budget?":"¿Qué presupuesto?","Under $400":"Menos de $400",
"First name":"Nombre","Mobile":"Celular","Text Me When One Comes In":"Avísenme Cuando Llegue Uno",
"We only text you about the machine you asked for.":"Solo le escribimos sobre la máquina que pidió.",
// footer
"Family-owned discount appliance store serving Weatherford and Parker County. Like-new washers, dryers, refrigerators and ranges — graded, warrantied, delivered and repaired in house.":"Tienda familiar de electrodomésticos de descuento que sirve a Weatherford y al condado de Parker. Lavadoras, secadoras, refrigeradores y estufas como nuevas — clasificadas, con garantía, entregadas y reparadas por nosotros.",
"Sales & general":"Ventas y general","Repairs line":"Línea de reparaciones",
"Family Owned":"Negocio Familiar","Warranty Included":"Garantía Incluida","Delivery Available":"Entrega Disponible",
"Shop Appliances":"Electrodomésticos","Washers":"Lavadoras","Dryers":"Secadoras","Refrigerators":"Refrigeradores",
"Ranges":"Estufas","Dishwashers":"Lavavajillas","Freezers":"Congeladores","Microwaves":"Microondas",
"View all inventory":"Ver todo el inventario","Services":"Servicios",
"Delivery & Installation":"Entrega e instalación","Old Appliance Haul-Away":"Retiro del aparato viejo",
"Appliance Repair":"Reparación de electrodomésticos","Same-Week Service Calls":"Visitas la misma semana",
"Lease-to-Own Financing":"Financiamiento con opción a compra","Store Locations & Hours":"Tiendas y horarios",
"Appliance sales, delivery and repair serving":"Venta, entrega y reparación de electrodomésticos en",
"Get directions →":"Cómo llegar →",
"© 2026 Cross Appliances LLC · Weatherford, Texas · All rights reserved":"© 2026 Cross Appliances LLC · Weatherford, Texas · Todos los derechos reservados",
"Working prototype built by AlliedOne Marketing. Inventory, pricing, scheduling and payments are demonstration data.":"Prototipo funcional creado por AlliedOne Marketing. Inventario, precios, citas y pagos son datos de demostración.",
// delivery
"Delivery & Install":"Entrega e Instalación",
"Pick a day. We'll bring it and hook it up.":"Escoja el día. Se lo llevamos y lo instalamos.",
"$79 flat within Parker County, includes haul-away of your old unit. Two-hour arrival windows so you aren't waiting all day. Slots are live — when a window fills, it disappears.":"$79 fijo dentro del condado de Parker, incluye retiro de su unidad vieja. Ventanas de llegada de dos horas para que no espere todo el día. Los horarios son en vivo — cuando se llena una ventana, desaparece.",
"1 — Choose a date":"1 — Escoja la fecha","Closed Sundays.":"Cerrado los domingos.",
"2 — Choose a window":"2 — Escoja la ventana","Select a date first.":"Primero escoja una fecha.",
"3 — Where are we going?":"3 — ¿A dónde vamos?","Name":"Nombre","Street address":"Dirección",
"City":"Ciudad","ZIP":"Código postal","What are we delivering?":"¿Qué vamos a entregar?",
"— Select a reserved or in-stock unit —":"— Seleccione una unidad apartada o disponible —",
"Gate code, dogs, stairs, anything we should know":"Código de portón, perros, escaleras, lo que debamos saber",
"Delivery, install & haul-away":"Entrega, instalación y retiro","Charged when scheduled":"Se cobra al agendar",
"Simulated transaction. Production routes through Accept Blue.":"Transacción simulada. En producción se procesa por Accept Blue.",
// service
"Service & Repair":"Servicio y Reparación","Broken appliance? Book a tech.":"¿Aparato descompuesto? Agende un técnico.",
"$89 diagnostic, waived if you have us do the repair. We service what we sell and what we didn't. Parker County and surrounding. Repairs line: 817-629-8047.":"Diagnóstico de $89, sin costo si nosotros hacemos la reparación. Damos servicio a lo que vendemos y a lo que no. Condado de Parker y alrededores. Línea de reparaciones: 817-629-8047.",
"What's wrong?":"¿Qué tiene?","Appliance":"Aparato","Brand":"Marca","Problem":"Problema",
"Won't turn on":"No enciende","Not heating / not cooling":"No calienta / no enfría","Leaking water":"Tira agua",
"Loud noise or shaking":"Hace ruido o vibra","Won't drain or spin":"No drena ni exprime","Error code on display":"Código de error en pantalla",
"Describe it in your own words":"Descríbalo en sus propias palabras","Service address":"Dirección del servicio",
"When can we come?":"¿Cuándo podemos ir?","Three-hour arrival windows. Closed Sundays.":"Ventanas de llegada de tres horas. Cerrado los domingos.",
"Diagnostic call":"Visita de diagnóstico","Waived if we do the repair":"Sin costo si hacemos la reparación","Charged when booked":"Se cobra al agendar",
// financing
"No credit? Still yes.":"¿Sin crédito? También sí.",
"Approved in the store in about ten minutes. Bring a photo ID, a checking account, and proof of income. Both Weatherford locations, both partners, same day.":"Aprobado en la tienda en unos diez minutos. Traiga identificación con foto, cuenta de cheques y comprobante de ingresos. En las dos tiendas de Weatherford, con los dos socios, el mismo día.",
"Lease-to-own up to $4,000":"Arrendamiento con opción a compra hasta $4,000",
"No credit needed. Take the appliance home today and own it through scheduled payments, with early purchase options that cut the total.":"Sin crédito. Llévese el aparato hoy y hágalo suyo con pagos programados, con opciones de compra anticipada que reducen el total.",
"Approval decision in minutes, in the store":"Decisión de aprobación en minutos, en la tienda",
"No credit history required to apply":"No se requiere historial de crédito para aplicar",
"Early purchase option lowers what you pay overall":"La compra anticipada reduce lo que paga en total",
"Available at both Weatherford locations":"Disponible en las dos tiendas de Weatherford",
"Start With Acima":"Empezar Con Acima","Start With Snap Finance":"Empezar Con Snap Finance",
"100-day purchase option":"Opción de compra a 100 días",
"Soft credit check only — applying will not affect your credit score. Pay it off inside 100 days and you pay substantially less than the full lease term.":"Solo consulta suave de crédito — aplicar no afecta su puntaje. Si lo paga dentro de 100 días, paga mucho menos que el plazo completo.",
"Soft check — no impact on your credit score":"Consulta suave — sin impacto en su puntaje de crédito",
"100-day early payoff option":"Opción de pago anticipado a 100 días",
"Apply from your phone before you come in":"Aplique desde su teléfono antes de venir",
"Pick your appliance":"Escoja su aparato",
"Find the unit on this site or on the floor. Every price already includes the warranty — financing doesn't change the sticker.":"Encuentre la unidad en este sitio o en el piso. Cada precio ya incluye la garantía — el financiamiento no cambia la etiqueta.",
"Apply in about 10 minutes":"Aplique en unos 10 minutos",
"Photo ID, a checking account and proof of income. We run it at the counter with you, or you start it here and finish in store.":"Identificación con foto, cuenta de cheques y comprobante de ingresos. Lo hacemos con usted en el mostrador, o lo empieza aquí y lo termina en la tienda.",
"Take it home":"Llévelo a casa",
"Approved same day. Pick it up, or put it on the delivery truck with install and haul-away for $79.":"Aprobado el mismo día. Recójalo, o súbalo al camión de entrega con instalación y retiro por $79.",
"What would the payment look like?":"¿De cuánto sería el pago?",
"Slide to the price of the appliance you're considering. This gives you the ballpark weekly payment on a typical 12-month lease-to-own agreement so you're not guessing before you walk in.":"Deslice al precio del aparato que está considerando. Le da el pago semanal aproximado en un contrato típico de 12 meses con opción a compra, para que no llegue adivinando.",
"Appliance price":"Precio del aparato","Estimated weekly payment":"Pago semanal estimado",
"If you pay cash today":"Si paga en efectivo hoy",
"Illustrative estimate only. Actual terms, payment amounts, fees and total cost are set by Acima or Snap Finance based on your application — not by Cross Appliances. Early purchase options reduce the total substantially. Ask us for the exact numbers before you sign anything.":"Estimado ilustrativo únicamente. Los términos, montos, cargos y costo total reales los define Acima o Snap Finance según su solicitud — no Cross Appliances. Las opciones de compra anticipada reducen el total considerablemente. Pídanos los números exactos antes de firmar.",
"Paying with a card instead":"Si prefiere pagar con tarjeta",
"Deposits, delivery fees, service calls and full purchases can all be paid by card online or at the counter. Same price either way — we don't add a card surcharge. Questions on any of it, call 817-374-9412.":"Depósitos, cargos de entrega, visitas de servicio y compras completas se pueden pagar con tarjeta en línea o en el mostrador. El mismo precio de cualquier forma — no cobramos recargo por tarjeta. Cualquier duda, llame al 817-374-9412.",
// locations
"Two stores in Weatherford.":"Dos tiendas en Weatherford.",
"Sales and showroom on Mineral Wells Hwy. Warehouse, service bay and delivery staging on FM 920. Same inventory system, same warranty, same phone number.":"Ventas y sala de exhibición en Mineral Wells Hwy. Bodega, taller de servicio y carga de entregas en FM 920. El mismo sistema de inventario, la misma garantía, el mismo teléfono.",
"Storefront photo":"Foto de la tienda",
"Showroom and sales counter. Financing applications processed here.":"Sala de exhibición y mostrador de ventas. Aquí se procesan las solicitudes de financiamiento.",
"Warehouse, service bay and repair intake. Delivery trucks stage here.":"Bodega, taller de servicio y recepción de reparaciones. Aquí se cargan los camiones de entrega.",
"Mon – Fri":"Lun – Vie","Saturday":"Sábado","Sunday":"Domingo","Closed":"Cerrado",
"Locator map · opens in Google Maps":"Mapa de ubicación · abre en Google Maps",
"Get Directions":"Cómo Llegar","Call Store":"Llamar a la Tienda","Email":"Correo",
"In stock at this store":"Disponible en esta tienda",
// misc
"Close":"Cerrar","Sign In":"Entrar","Cancel":"Cancelar",
// static SEO pages
"Home":"Inicio","Pages":"Páginas","Towns We Serve":"Pueblos Que Servimos","Average":"Promedio",
"in town":"en la ciudad","Both stores are in town":"Las dos tiendas están en la ciudad",
"Distance":"Distancia","Closest store":"Tienda más cercana","Route":"Ruta",
"© 2026 Cross Appliances LLC · Weatherford, Texas":"© 2026 Cross Appliances LLC · Weatherford, Texas",
"Working prototype built by AlliedOne Marketing. Inventory, pricing and reviews are demonstration data.":"Prototipo funcional creado por AlliedOne Marketing. Inventario, precios y reseñas son datos de demostración.",
"Both locations":"Las dos tiendas","What we carry":"Lo que tenemos","Financing":"Financiamiento",
"Other towns we serve":"Otros pueblos que servimos","Not on the list?":"¿No está en la lista?",
"Call us. If you are close to one of our routes we will usually still get it to you.":"Llámenos. Si está cerca de una de nuestras rutas, casi siempre se lo llevamos igual.",
"most weekdays":"casi todos los días entre semana","Tuesdays and Thursdays":"martes y jueves",
"by arrangement":"con cita previa","Monday through Saturday":"de lunes a sábado",
};
const DIRS = {east:'este',west:'oeste',north:'norte',south:'sur',
  northeast:'noreste',northwest:'noroeste',southeast:'sureste',southwest:'suroeste'};
const dirEs = (m,n,d)=> n + ' mi al ' + (DIRS[d]||d);
// Patterns for strings that carry a number. Applied only when the exact
// dictionary misses, so a wrong pattern can never clobber a good match.
const ES_RE = [
  [/^(\d+) Units On The Floor Today$/, "$1 Unidades En El Piso Hoy"],
  [/^(\d+) in stock$/, "$1 disponibles"],
  [/^(\d+) shown$/, "$1 mostradas"],
  [/^(\d+) units? in stock$/, "$1 unidades disponibles"],
  [/^(\d+) units?$/, "$1 unidades"],
  [/^(\d+) days? on floor$/, "$1 días en piso"],
  [/^Grade ([ABC]) · (\d+) days? on floor$/, "Grado $1 · $2 días en piso"],
  [/^Grade ([ABC])$/, "Grado $1"],
  [/^(\d+) trucks?$/, "$1 camiones"],
  [/^(\d+) techs?$/, "$1 técnicos"],
  [/^(\d+) stores? ›$/, "$1 tiendas ›"],
  [/^(\d+) towns? ›$/, "$1 pueblos ›"],
  [/^Max price — \$([\d,]+)$/, "Precio máximo — $$$1"],
  [/^Service Area — (\d+) Towns$/, "Área de Servicio — $1 Pueblos"],
  [/^Confirm Delivery — Pay \$(\d+)$/, "Confirmar Entrega — Pagar $$$1"],
  [/^Book Tech — Pay \$(\d+)$/, "Agendar Técnico — Pagar $$$1"],
  [/^People On The List$/, "Personas En La Lista"],
  [/^(\d+) reviews?$/, "$1 reseñas"],
  [/^(\d+) mi (east|west|north|south|northeast|northwest|southeast|southwest)$/, dirEs],
  [/^(\d+) miles? (east|west|north|south|northeast|northwest|southeast|southwest)$/, dirEs],
];
const ES_DOW = {MON:'LUN',TUE:'MAR',WED:'MIÉ',THU:'JUE',FRI:'VIE',SAT:'SÁB',SUN:'DOM'};
// Appliance descriptors appear standalone AND glued to a brand and a SKU
// ("Whirlpool 4.5 cu. ft. Top-Load Washer — CX6946-WA"), so these run as
// ordered substring swaps. Longest phrase first — "Top-Load Washer, Deep
// Fill" has to win before "Top-Load Washer" gets a chance at it.
const ES_PART = [
  ["Stackable Washer/Dryer, Electric","Lavadora/Secadora Apilable, Eléctrica"],
  ["Stackable Washer/Dryer","Lavadora/Secadora Apilable"],
  ["Free-Standing Electric Range","Estufa Eléctrica Independiente"],
  ["Front-Control Dishwasher","Lavavajillas de Control Frontal"],
  ["Side-by-Side Refrigerator","Refrigerador Lado a Lado"],
  ["Top-Freezer Refrigerator","Refrigerador con Congelador Arriba"],
  ["French Door Refrigerator","Refrigerador de Puerta Francesa"],
  ["Over-the-Range Microwave","Microondas Sobre Estufa"],
  ["Top-Load Washer, Deep Fill","Lavadora de Carga Superior, Llenado Profundo"],
  ["Front-Load Washer, Steam","Lavadora de Carga Frontal, con Vapor"],
  ["Gas Dryer, Sensor Dry","Secadora de Gas, Secado por Sensor"],
  ["Built-In Dishwasher","Lavavajillas Empotrado"],
  ["Top-Load Washer","Lavadora de Carga Superior"],
  ["Electric Dryer","Secadora Eléctrica"],
  ["Chest Freezer","Congelador Horizontal"],
  ["Gas Range","Estufa de Gas"],
  ["Electric Range","Estufa Eléctrica"],
  ["cu. ft.","pies³"],
];
function esLookup(s){
  const k = s.replace(/\u00a0/g,' ');           // &nbsp; in the markup must not break an exact match
  if(ES[k]) return ES[k];
  if(ES_DOW[k]) return ES_DOW[k];
  if(k.startsWith('\u203a ')){ const r = esLookup(k.slice(2)); if(r) return '\u203a ' + r; }
  for(const [re,out] of ES_RE){ if(re.test(k)) return k.replace(re,out); }
  let out = k, hit = false;
  for(const [a,b] of ES_PART){ if(out.includes(a)){ out = out.split(a).join(b); hit = true; } }
  return hit ? out : null;
}
let __lang = 'en';
function applyLang(){
  if(window.ES_PAGE) Object.assign(ES, window.ES_PAGE);   // static pages ship their own body copy
  const es = __lang === 'es';
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes=[]; let n;
  while(n = w.nextNode()){
    const p = n.parentElement;
    if(!p || p.closest('script,style,[data-nt]')) continue;
    if(n.nodeValue.trim()) nodes.push(n);
  }
  nodes.forEach(nd=>{
    if(nd.__en === undefined) nd.__en = nd.nodeValue;
    if(!es){ nd.nodeValue = nd.__en; return; }
    const raw = nd.__en, t = raw.trim();
    const hit = esLookup(t);
    if(hit) nd.nodeValue = raw.replace(t, hit);
  });
  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{
    ['placeholder','aria-label','title'].forEach(a=>{
      const cur = el.getAttribute(a); if(cur===null) return;
      const key = '__en_'+a;
      if(el[key] === undefined) el[key] = cur;
      if(!es){ el.setAttribute(a, el[key]); return; }
      const hit = esLookup(el[key].trim());
      if(hit) el.setAttribute(a, hit);
    });
  });
  document.documentElement.lang = es ? 'es' : 'en';
  const lbl = document.getElementById('langlbl');
  if(lbl) lbl.textContent = es ? 'English' : 'En Español';
  const sw = document.getElementById('langsw');
  if(sw) sw.setAttribute('aria-label', es ? 'Switch to English' : 'Cambiar a Español');
}
function toggleLang(){
  __lang = __lang === 'es' ? 'en' : 'es';
  applyLang();
  if(typeof toast === 'function') toast(__lang === 'es' ? 'Sitio en español' : 'Site in English');
}
if(typeof document !== 'undefined' && !document.getElementById('app')) {
  // static SEO page — no render() loop to hang the translator off of
  document.addEventListener('DOMContentLoaded', applyLang);
}
