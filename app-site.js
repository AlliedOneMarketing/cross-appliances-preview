/* ============================================================
   SHELL
============================================================ */
const CUST_VIEWS = [['shop','Shop Inventory'],['delivery','Delivery'],['service','Repair'],['financing','Financing']];
// Locations, Service Area and Reviews are all "are these people real?" questions —
// they belong together, and grouping them frees the bar for the money paths.
const ABOUT = [
  ['view:locations','Our Locations','Both Weatherford stores, hours and directions'],
  ['/service-area/','Service Area','16 towns across Parker County'],
  ['/reviews/','Reviews','What Google, Facebook and Yelp say'],
];
const CARET = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 9l7 7 7-7"/></svg>';

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
/* ---- unit detail, checkout, financing and staff console ----------------
   Second block only so the file stays readable. Merged into ES at load. */
const ES2 = {
// unit detail modal
"Why this price:":"Por qué este precio:",
"Finish":"Acabado","Specs":"Especificaciones","Serial":"Serie",
"Days on floor":"Días en piso","Warranty":"Garantía",
"Stainless":"Acero inoxidable","White":"Blanco","Black":"Negro","Slate":"Pizarra","Bisque":"Hueso",
"90-day parts & labor":"90 días en piezas y mano de obra",
"60-day parts":"60 días en piezas","30-day parts":"30 días en piezas",
"As-is, no warranty":"Tal como está, sin garantía",
"What we tested before it hit the floor":"Lo que probamos antes de ponerlo en piso",
"Schedule Delivery":"Agendar Entrega","See Financing Options":"Ver Opciones De Financiamiento",
"This is the only unit at this price. Deposit holds it for 72 hours and comes off the total.":"Esta es la única unidad a este precio. El depósito la aparta 72 horas y se descuenta del total.",
// reserve / checkout
"Reserve This Unit":"Aparte Esta Unidad","Reserving":"Apartando",
"Full name":"Nombre completo","Card number":"Número de tarjeta","Expires":"Vence",
"Unit price":"Precio de la unidad","Estimated sales tax (8.25%)":"Impuesto estimado (8.25%)",
"Balance due at pickup or delivery":"Saldo al recoger o entregar",
"Charged today — deposit":"Se cobra hoy — depósito",
"Simulated transaction — no live gateway is connected in this prototype. Production routes through Accept Blue.":"Transacción simulada — no hay pasarela activa en este prototipo. En producción se procesa por Accept Blue.",
// financing modals
"Give us three things and we'll text you a secure application link from Acima. Nothing here affects your credit — Acima does not require credit history.":"Denos tres datos y le mandamos por mensaje un enlace seguro de solicitud de Acima. Nada de esto afecta su crédito — Acima no requiere historial crediticio.",
"Give us three things and we'll text you a secure application link from Snap Finance. Nothing here affects your credit — Snap runs a soft check only.":"Denos tres datos y le mandamos por mensaje un enlace seguro de solicitud de Snap Finance. Nada de esto afecta su crédito — Snap solo hace una consulta suave.",
"About how much are you spending?":"¿Cuánto piensa gastar aproximadamente?",
"Under $800":"Menos de $800","Which store?":"¿Cuál tienda?",
"Text Me The Application Link":"Mándenme El Enlace De Solicitud",
"Prototype — no application is actually submitted and no credit inquiry is made.":"Prototipo — no se envía ninguna solicitud ni se hace consulta de crédito.",
// login gate
"Staff Sign-In":"Acceso De Personal","Staff console is restricted.":"La consola interna es restringida.",
"Inventory costs, margins, customer records and the payments ledger live behind this door. Customers never see it.":"Los costos de inventario, márgenes, registros de clientes y el libro de pagos viven detrás de esta puerta. Los clientes nunca los ven.",
"Staff ID":"ID de personal","Demo credentials":"Credenciales de demostración",
"— Staff ID":"— ID de personal",
". In production this is per-person, with roles: counter staff see inventory and scheduling, owners also see cost, margin and payments.":". En producción esto es por persona, con roles: el personal de mostrador ve inventario y citas, los dueños además ven costo, margen y pagos.",
"Signed in — staff console":"Sesión iniciada — consola interna",
"Back to the website":"Volver al sitio","Sign In":"Entrar",
// console chrome
"Add A Unit":"Agregar Unidad","All Inventory":"Todo El Inventario","Want List":"Lista De Pedidos",
"Pricing Engine":"Motor De Precios","Schedule Board":"Tablero De Citas","Payments":"Pagos",
"Units On Floor":"Unidades En Piso","Aged 60+ Days":"Con 60+ Días","Retail Value":"Valor De Venta",
"Gross Margin At Current Price":"Margen Bruto Al Precio Actual",
"Card Volume · 7 Days":"Volumen De Tarjeta · 7 Días","Customers Waiting":"Clientes Esperando",
// intake
"Add a unit to the floor":"Agregar una unidad al piso",
"This is the whole system. Floor staff photographs a machine, fills six fields, hits publish — it is live on the website in under a minute, priced by the engine, counted in the hero unit count. No web developer involved, ever.":"Este es todo el sistema. El personal fotografía una máquina, llena seis campos y publica — está en el sitio en menos de un minuto, con precio calculado por el motor y contada en el total del encabezado. Sin programador, nunca.",
"Tap to add photo":"Toque para agregar foto",
"Camera or file · shot on the tape mark":"Cámara o archivo · tomada sobre la marca de cinta",
"Auto-cropped square for the grid. If no photo is attached the site shows a category placeholder until one is added.":"Se recorta en cuadro automáticamente para la cuadrícula. Si no se adjunta foto, el sitio muestra un marcador de la categoría hasta que se agregue una.",
"Model description — this becomes the product name":"Descripción del modelo — esto se vuelve el nombre del producto",
"Serial number":"Número de serie","Store":"Tienda","Condition grade":"Grado de condición",
"A — Like new":"A — Como nuevo","B — Light wear":"B — Uso ligero","C — Cosmetic damage":"C — Daño cosmético",
"Warranty offered":"Garantía ofrecida","What we paid (cost)":"Lo que pagamos (costo)",
"Ask price (list)":"Precio de lista",
"Flaws — say it plainly, it sells the unit":"Defectos — dígalo claro, eso vende la unidad",
"Small dent, right door. Does not affect operation.":"Golpe pequeño, puerta derecha. No afecta el funcionamiento.",
"Use It":"Usarlo","Publish To Website":"Publicar En El Sitio","Fill Sample Data":"Llenar Datos De Ejemplo",
"Why this matters for Cross:":"Por qué esto importa para Cross:",
"the reason used-appliance dealers have stale websites is that updating one means emailing a web guy. Here, inventory is entered once by the person who already touches the machine, and the site, the price, the store count and the search filters all follow automatically.":"la razón por la que los vendedores de electrodomésticos usados tienen sitios desactualizados es que actualizarlos significa escribirle al que hace las páginas. Aquí el inventario se captura una vez, por la persona que ya toca la máquina, y el sitio, el precio, el conteo por tienda y los filtros de búsqueda siguen solos.",
// all inventory
"Every unit, every store":"Cada unidad, cada tienda",
"Sorted by days on the floor — the oldest money first. Prices below are what the website is showing right now, recalculated by the pricing engine on every page load.":"Ordenado por días en piso — el dinero más viejo primero. Los precios de abajo son los que el sitio está mostrando ahora, recalculados por el motor de precios en cada carga de página.",
"Unit":"Unidad","Grade":"Grado","Days":"Días","Cost":"Costo","List":"Lista",
"Live Price":"Precio Actual","Margin":"Margen","Status":"Estado",
"Live":"En Piso","Mark Sold":"Marcar Vendida","Sold":"Vendida","Reserved":"Apartada",
"Dented back panel, cosmetic":"Panel trasero golpeado, cosmético",
"Dent left side, cooktop scuffed":"Golpe lado izquierdo, parrilla rayada",
"Handle scratched":"Manija rayada","Small dent, right door":"Golpe pequeño, puerta derecha",
"Rack rail replaced":"Riel de canastilla reemplazado","Minor scuff on lid":"Rayón menor en la tapa",
// want list
"What people asked for that you didn't have":"Lo que la gente pidió y usted no tenía",
"Every visitor who scrolled your whole floor and still didn't find it. This is not a mailing list — it is a buying list. Sorted by how many people are waiting.":"Cada visitante que recorrió todo su piso y aun así no lo encontró. Esto no es una lista de correos — es una lista de compras. Ordenada por cuánta gente está esperando.",
"They want":"Piden","People Waiting":"Personas Esperando","Most-Asked Budget":"Presupuesto Más Pedido",
"Longest Wait":"Espera Más Larga","On Your Floor Now":"En Su Piso Ahora",
"Read the top row.":"Lea la primera fila.",
"That is the machine to go buy at auction this week — you already have the customers for it, and you know what they will pay. Most used dealers buy on gut and hope. This turns the website into a purchasing input.":"Esa es la máquina que hay que ir a comprar en subasta esta semana — ya tiene los clientes y ya sabe cuánto van a pagar. La mayoría de los vendedores de usado compran por corazonada. Esto convierte el sitio en una herramienta de compra.",
"Individual requests":"Solicitudes individuales",
"Call or text these when the right unit lands. Marking one sourced takes them off the waiting count.":"Llame o mande mensaje a estas personas cuando llegue la unidad correcta. Marcarla como conseguida las quita del conteo de espera.",
"Date":"Fecha","Wants":"Pide","Budget":"Presupuesto","Waiting":"Esperando","Mark Sourced":"Marcar Conseguida",
// pricing engine
"Demo control — advance the calendar":"Control de demostración — adelante el calendario",
"Drag it forward and watch the floor reprice itself. This slider exists only for the demo — in production the clock does this on its own, overnight, with no one touching a keyboard.":"Arrástrelo hacia adelante y vea cómo el piso se vuelve a poner precio solo. Este control existe únicamente para la demostración — en producción el reloj lo hace solo, de noche, sin que nadie toque un teclado.",
"Pricing rules":"Reglas de precio",
"Two independent rules. Age markdown protects turn. Market comp protects position. When both run, the engine takes the lower of the two and then refuses to go below the margin floor.":"Dos reglas independientes. La rebaja por antigüedad protege la rotación. La comparación de mercado protege la posición. Cuando ambas corren, el motor toma la menor de las dos y luego se niega a bajar del piso de margen.",
"Off — manual":"Apagado — manual","Age markdown":"Rebaja por antigüedad",
"Market comp":"Comparación de mercado","Both":"Ambas",
"Age markdown tiers":"Niveles de rebaja por antigüedad",
"Once a unit passes a threshold, the discount applies automatically and the site shows a price-drop badge.":"Cuando una unidad pasa un umbral, el descuento se aplica automáticamente y el sitio muestra una etiqueta de rebaja.",
"After (days)":"Después de (días)","Discount (%)":"Descuento (%)",
"Market comp target":"Objetivo de comparación de mercado",
"Where you want to sit against comparable local listings. 100% is dead-on the average; below undercuts it.":"Dónde quiere quedar frente a publicaciones locales comparables. 100% es justo el promedio; menos lo deja por debajo.",
"Price at":"Precio al","Margin floor":"Piso de margen",
"The hard stop. No rule may price a unit below this margin over what you paid.":"El tope duro. Ninguna regla puede poner una unidad por debajo de este margen sobre lo que usted pagó.",
"Never below":"Nunca menos de",
"What the rules are doing right now":"Lo que las reglas están haciendo ahora",
"The honest caveat:":"La advertencia honesta:",
"market comp needs a real data feed to be worth anything — scraped local listings or a wholesale index. That is a phase-two build. Age markdown works on day one with nothing but your own intake dates, and it is the rule that actually fixes dead stock.":"la comparación de mercado necesita una fuente de datos real para servir de algo — publicaciones locales recopiladas o un índice mayorista. Eso es una fase dos. La rebaja por antigüedad funciona desde el día uno con nada más que sus propias fechas de recepción, y es la regla que de verdad arregla el inventario muerto.",
// schedule board
"Schedule board":"Tablero de citas",
"Deliveries and service calls in one view, capped by real truck and tech capacity. When a window fills, the website stops offering it — no double-booking, no callback to reschedule.":"Entregas y visitas de servicio en una sola vista, limitadas por la capacidad real de camiones y técnicos. Cuando una ventana se llena, el sitio deja de ofrecerla — sin dobles citas y sin llamadas para reprogramar.",
"across the next eight working days.":"en los próximos ocho días hábiles.",
"Nothing booked":"Nada agendado",
"Green = delivery. Amber = service call.":"Verde = entrega. Ámbar = visita de servicio.",
"Book one from the customer side and it lands here instantly. In production this pushes to the drivers' phones and writes back to the office calendar.":"Agende una del lado del cliente y aparece aquí al instante. En producción esto se manda a los teléfonos de los choferes y se escribe de vuelta en el calendario de la oficina.",
// payments
"Payments ledger":"Libro de pagos",
"Every deposit, delivery fee, service call and counter sale in one place, tied back to a unit. Simulated in this prototype — production routes through Accept Blue, provisioned by AlliedOne.":"Cada depósito, cargo de entrega, visita de servicio y venta en mostrador en un solo lugar, ligado a una unidad. Simulado en este prototipo — en producción se procesa por Accept Blue, gestionado por AlliedOne.",
"Brand and model are required":"Se requiere marca y modelo",
"Enter a card number":"Ingrese un número de tarjeta",
"Enter a name":"Ingrese un nombre",
"Enter an ask price":"Ingrese un precio de lista",
"First name and mobile required":"Se requiere nombre y celular",
"Marked sold — pulled from the website":"Marcada vendida — quitada del sitio",
"Name and address required":"Se requiere nombre y dirección",
"Name and mobile required":"Se requiere nombre y celular",
"Pick a date and window":"Escoja fecha y horario",
"Published — live on the website now":"Publicada — ya está en el sitio",
"Sample data filled":"Datos de ejemplo llenados",
"Signed in — staff console":"Sesión iniciada — consola interna",
"Signed out of staff console":"Sesión cerrada de la consola interna",
"Back":"Atrás","Change":"Cambiar","Buying":"Comprando","Holding":"Apartando","Find My Order":"Buscar Mi Orden",
"Buy This Unit":"Compre Esta Unidad","Hold This Unit":"Aparte Esta Unidad",
"Held For You":"Apartada Para Usted","Paid In Full":"Pagada Por Completo",
"Unit held for 72 hours.":"Unidad apartada por 72 horas.",
"It's yours.":"Ya es suya.",
"Charged today — paid in full":"Se cobra hoy — pagada por completo",
"Nothing else is owed.":"No debe nada más.",
"Keep this number. You can schedule delivery now or any time later with it.":"Guarde este número. Con él puede agendar la entrega ahora o cuando quiera después.",
"I'll Pick It Up":"Yo La Recojo","Schedule Delivery":"Agendar Entrega",
"Delivery is scheduled after you buy — you'll get the option on the next screen, or any time later with your order number. This is the only unit at this price.":"La entrega se agenda después de comprar — le aparece la opción en la siguiente pantalla, o cuando quiera después con su número de orden. Esta es la única unidad a este precio.",
"Use the order number we texted you, or the mobile number you gave us at the counter. Bought in store? Staff can look it up at 817-374-9412.":"Use el número de orden que le mandamos por mensaje, o el celular que nos dio en el mostrador. ¿Compró en la tienda? El personal se lo puede buscar al 817-374-9412.",
"Haven't bought yet?":"¿Todavía no ha comprado?",
"Shop the floor first ›":"Vea el piso primero ›",
"ORD-482913 or your mobile number":"ORD-482913 o su número de celular",
"No order found — check the number":"No se encontró la orden — revise el número",
"That order already has a delivery booked":"Esa orden ya tiene una entrega agendada",
"Find your order first":"Primero busque su orden",
"paid in full":"pagada por completo",
"Ice maker cycles, door seals good":"La fábrica de hielo cicla, la puerta sella bien",
// --- inventory editing ---
"Edit":"Editar","Save Changes":"Guardar Cambios","Delete Unit":"Eliminar Unidad",
"Model description":"Descripción del modelo","Status on the website":"Estado en el sitio",
"Live — showing on the site":"En piso — visible en el sitio",
"Reserved — held for a customer":"Apartada — guardada para un cliente",
"Sold — off the site":"Vendida — fuera del sitio",
"Photo attached — tap to replace":"Foto adjunta — toque para reemplazar",
"Remove photo":"Quitar foto","Remove Photo":"Quitar Foto","Photo removed":"Foto quitada",
"Remove this unit entirely":"Eliminar esta unidad por completo",
"Use this for a duplicate or a mis-entry. Marking it sold is the right move for a machine that actually left the floor.":"Use esto para un duplicado o una captura equivocada. Si la máquina de verdad salió del piso, lo correcto es marcarla vendida.",
"Delete This Unit?":"¿Eliminar Esta Unidad?","Yes, Delete It":"Sí, Eliminarla",
"This deletes the unit and its photo from the system. It disappears from the website immediately. Sales already recorded against it stay in the payments ledger.":"Esto elimina la unidad y su foto del sistema. Desaparece del sitio de inmediato. Las ventas ya registradas se quedan en el libro de pagos.",
"If the machine actually sold, close this and set the status to Sold instead — that keeps the history.":"Si la máquina realmente se vendió, cierre esto y mejor cambie el estado a Vendida — así se conserva el historial.",
"Unit updated — the website is already showing it":"Unidad actualizada — el sitio ya la está mostrando",
"Unit deleted — removed from the website":"Unidad eliminada — quitada del sitio",
// --- bulk import ---
"Or bring in a whole list at once":"O traiga una lista completa de una vez",
"Auction haul, a spreadsheet you already keep, a list from another store — load it in one pass instead of typing forty units. Every row is checked and shown to you before anything reaches the website.":"Lo que trajo de subasta, una hoja de cálculo que ya lleva, una lista de otra tienda — cárguela de una vez en lugar de capturar cuarenta unidades. Cada fila se revisa y se le muestra antes de que algo llegue al sitio.",
"Download The Template":"Descargar La Plantilla","Choose A File":"Escoger Un Archivo",
"CSV or tab-separated. In Excel or Google Sheets:":"CSV o separado por tabulaciones. En Excel o Google Sheets:",
"File → Download → CSV":"Archivo → Descargar → CSV",
". Or just select your cells, copy, and paste below.":". O simplemente seleccione sus celdas, cópielas y péguelas abajo.",
"Paste your rows — header line first":"Pegue sus filas — la línea de encabezado primero",
"Check The Rows":"Revisar Las Filas","Start Over":"Empezar De Nuevo",
"What each column means":"Qué significa cada columna",
"Column":"Columna","Required":"Obligatorio","Front Counter":"Mostrador","Add someone — name":"Agregar a alguien — nombre",
"Starting PIN":"PIN inicial","Optional":"Opcional","Example":"Ejemplo","Notes":"Notas",
"Line":"Línea","Check":"Revisión","Fix":"Corregir",
"Manufacturer.":"Fabricante.",
"Becomes the product name on the site.":"Se convierte en el nombre del producto en el sitio.",
"A, B or C. A = like new, C = cosmetic damage.":"A, B o C. A = como nueva, C = daño cosmético.",
"What you paid. Drives the margin floor. Never shown publicly.":"Lo que usted pagó. Define el piso de margen. Nunca se muestra al público.",
"Your ask price. The engine marks down from here.":"Su precio de lista. El motor rebaja a partir de aquí.",
"Your tag number. Auto-generated if blank.":"Su número de etiqueta. Se genera solo si lo deja en blanco.",
"90-day parts & labor, 60-day parts, 30-day parts, or As-is, no warranty.":"90 días en piezas y mano de obra, 60 días en piezas, 30 días en piezas, o Tal como está, sin garantía.",
"Say it plainly. Blank means no known flaws.":"Dígalo claro. En blanco significa sin defectos conocidos.",
"How long you have had it. 0 = arrived today. Drives the age markdown.":"Cuánto tiempo la ha tenido. 0 = llegó hoy. Define la rebaja por antigüedad.",
"live, reserved or sold. Defaults to live.":"live, reserved o sold. Por defecto es live.",
"Direct link to a photo. Blank shows a category placeholder.":"Enlace directo a una foto. En blanco muestra un marcador de la categoría.",
"Column order does not matter — the header row is what we read. Extra columns are ignored. Prices may include $ and commas.":"El orden de las columnas no importa — leemos la fila de encabezado. Las columnas de más se ignoran. Los precios pueden llevar $ y comas.",
"On PDFs and photos:":"Sobre PDFs y fotos:",
"a PDF packing list has no reliable structure, so this prototype does not pretend to read one. In production that is an extraction step — the PDF goes through OCR, gets mapped to these same columns, and lands in this exact review screen before anything publishes. Same for a folder of photos matched to serial numbers. Both are real builds, neither is a checkbox.":"una lista de empaque en PDF no tiene una estructura confiable, así que este prototipo no finge poder leerla. En producción eso es un paso de extracción — el PDF pasa por OCR, se mapea a estas mismas columnas y llega a esta misma pantalla de revisión antes de publicar nada. Igual para una carpeta de fotos emparejadas por número de serie. Las dos son construcciones reales, ninguna es una casilla que se palomea.",
"Paste your rows or choose a file first":"Primero pegue sus filas o escoja un archivo",
"No data rows found under the header":"No se encontraron filas de datos debajo del encabezado",
"Nothing valid to import":"No hay nada válido que importar",
"Export that sheet as CSV first, or just copy the cells and paste them":"Primero exporte esa hoja como CSV, o simplemente copie las celdas y péguelas",
"Template downloaded — opens in Excel, Numbers or Google Sheets":"Plantilla descargada — se abre en Excel, Numbers o Google Sheets",
// --- dispatch ---
"Scheduled":"Agendado","Assigned":"Asignado","On The Way":"En Camino","Completed":"Completado",
"booked, not yet assigned":"agendado, aún sin asignar","crew is on it":"la cuadrilla ya lo tiene",
"left the shop":"salió del taller","delivered or repaired":"entregado o reparado",
"Unassigned":"Sin asignar","Where it is in the run":"Dónde va en la ruta",
"Who's taking it":"Quién lo lleva","Move it":"Moverlo","Day":"Día",
"Text the customer":"Mándele mensaje al cliente",
"Pick a day, then a window. Capacity is enforced here the same way it is on the customer side — a full window can't take another job.":"Escoja el día y luego la ventana. La capacidad se respeta aquí igual que del lado del cliente — una ventana llena no acepta otro trabajo.",
"Pre-written for where the job is right now. Edit anything before it goes. Nothing sent yet.":"Redactado según dónde va el trabajo ahora mismo. Edite lo que quiera antes de enviarlo. Todavía no se ha enviado nada.",
"Tap any job to move it, assign a truck or tech, walk its status, and text the customer. Capacity is enforced on this side too — a full window won't take another job.":"Toque cualquier trabajo para moverlo, asignar camión o técnico, avanzar su estado y mandarle mensaje al cliente. La capacidad también se respeta de este lado — una ventana llena no acepta otro trabajo.",
"Texts sent from this board":"Mensajes enviados desde este tablero",
"Nothing sent yet. Open a job, pick a status, and the text writes itself.":"Todavía no se ha enviado nada. Abra un trabajo, escoja un estado y el mensaje se escribe solo.",
"Simulated in this prototype. In production this is a real SMS number — replies come back into the same thread, and the driver app gets a push with the stop list for the day.":"Simulado en este prototipo. En producción esto es un número real de mensajes — las respuestas regresan al mismo hilo, y la app del chofer recibe la lista de paradas del día.",
"Moved — the draft text below now says so":"Movido — el borrador de abajo ya lo dice",
"Status updated":"Estado actualizado","Nothing to send":"No hay nada que enviar",
// --- profile, roles, activity ---
"Profile & Settings":"Perfil y Ajustes","Your profile":"Su perfil",
"Everyone who signs in can change their own PIN, name and mobile number here. What you can see and do in the rest of the console comes from your role, and only an owner can change that.":"Cualquiera que entre puede cambiar aquí su propio PIN, nombre y celular. Lo que puede ver y hacer en el resto de la consola viene de su rol, y solo un dueño puede cambiarlo.",
"Display name":"Nombre a mostrar","New PIN":"PIN nuevo","Confirm new PIN":"Confirme el PIN nuevo",
"Save My Profile":"Guardar Mi Perfil",
"Leave the PIN fields blank to keep your current one. PINs are per-person — never share one, or the activity log stops meaning anything.":"Deje los campos de PIN en blanco para conservar el actual. Los PIN son por persona — nunca los comparta, o el registro de actividad deja de servir.",
"What your role can do":"Lo que su rol puede hacer",
"Add and view inventory":"Agregar y ver inventario","Edit and delete units":"Editar y eliminar unidades",
"Bulk import from a file":"Importar en bloque desde un archivo",
"See the schedule board":"Ver el tablero de citas","Move jobs and text customers":"Mover trabajos y mandar mensajes",
"See the want list":"Ver la lista de pedidos","Change the pricing rules":"Cambiar las reglas de precio",
"See cost and margin":"Ver costo y margen","See the payments ledger":"Ver el libro de pagos",
"Manage staff accounts":"Administrar cuentas del personal","See the activity log":"Ver el registro de actividad",
"Owner":"Dueño","Manager":"Gerente","Counter Staff":"Personal de Mostrador",
"Staff accounts":"Cuentas del personal",
"Owners only. Changing someone's role changes what they see the next time they sign in.":"Solo dueños. Cambiar el rol de alguien cambia lo que ve la próxima vez que entre.",
"Person":"Persona","Role":"Rol","Reset PIN":"Reiniciar PIN","that's you":"ese es usted",
"Add Staff Member":"Agregar Personal","PIN Reset":"PIN Reiniciado",
"Give it to them in person. They can change it themselves under Profile & Settings.":"Déselo en persona. Ellos lo pueden cambiar solos en Perfil y Ajustes.",
"Activity log":"Registro de actividad",
"Who changed what, in order. This is the reason PINs are per-person.":"Quién cambió qué, en orden. Por esto los PIN son por persona.",
"Nothing yet this session.":"Nada todavía en esta sesión.",
"Signed in":"Sesión iniciada","Signed out":"Sesión cerrada",
"Name cannot be blank":"El nombre no puede quedar en blanco",
"PIN must be 4 digits":"El PIN debe ser de 4 dígitos",
"The two PINs do not match":"Los dos PIN no coinciden",
"Profile saved":"Perfil guardado","Name and staff ID are required":"Se requiere nombre e ID de personal",
"That staff ID is already taken":"Ese ID de personal ya está ocupado",
"Updated their profile":"Actualizó su perfil",
"Updated their profile and changed their PIN":"Actualizó su perfil y cambió su PIN",
"— three roles, three different consoles.":"— tres roles, tres consolas distintas.",
"Sign in as the counter to see cost, margin, payments and the pricing rules disappear.":"Entre como mostrador para ver desaparecer costo, margen, pagos y las reglas de precio.",
"Optional":"Opcional","e.g. mcruz":"ej. mcruz","4-digit PIN":"PIN de 4 dígitos",
"Started making a grinding noise on the spin cycle about a week ago.":"Empezó a hacer un ruido de rechinido en el ciclo de exprimido hace como una semana.",
"Reference":"Referencia","Type":"Tipo","What":"Qué","Amount":"Monto","Balance Due":"Saldo",
"Service call":"Visita de servicio","Counter sale":"Venta en mostrador",
"Delivery fee":"Cargo de entrega","Deposit":"Depósito",
"Repair — parts & labor":"Reparación — piezas y mano de obra",
"Dryer heating element + labor":"Resistencia de secadora + mano de obra",
"Approved":"Aprobado","Link sent":"Enlace enviado",
"Transactions · 7 Days":"Transacciones · 7 Días",
"Est. Processing Cost":"Costo Est. De Procesamiento",
"Balances Owed On Holds":"Saldos Pendientes En Apartados",
"The point of putting payments here:":"El punto de poner los pagos aquí:",
"deposits stop no-shows on held units, delivery fees get collected before the truck rolls instead of chased after, and service calls are paid at booking. Cross is currently running all three of those on trust and a phone call.":"los depósitos evitan que la gente no llegue por unidades apartadas, los cargos de entrega se cobran antes de que salga el camión en vez de andarlos persiguiendo, y las visitas de servicio se pagan al agendar. Cross hoy hace las tres cosas de palabra y con una llamada.",
"Financing applications started on the website":"Solicitudes de financiamiento iniciadas en el sitio",
"Every customer who taps Acima or Snap on the financing page becomes a named lead with a phone number — instead of a browser tab they closed at 11pm.":"Cada cliente que toca Acima o Snap en la página de financiamiento se vuelve un prospecto con nombre y teléfono — en vez de una pestaña que cerró a las 11 de la noche.",
"Partner":"Socio","Spend Band":"Rango de gasto",
// specs
"Deep-fill option":"Opción de llenado profundo","11 wash cycles":"11 ciclos de lavado",
"Electric, 240V":"Eléctrica, 240V","Auto-dry sensor":"Sensor de secado automático",
"Side-by-side":"Lado a lado","Ice and water in door":"Hielo y agua en la puerta",
"4 coil elements":"4 quemadores de resistencia","Self-clean oven":"Horno autolimpiante",
"Front-load with steam":"Carga frontal con vapor","Vibration reduction":"Reducción de vibración",
"Natural gas":"Gas natural","Sensor dry":"Secado por sensor",
"Top freezer":"Congelador arriba","Glass shelves":"Entrepaños de vidrio",
"4 wash cycles":"4 ciclos de lavado","Heated dry":"Secado con calor",
"Front control panel":"Panel de control frontal","Chest style":"Tipo horizontal",
"Manual defrost":"Descongelado manual","Power-on indicator":"Indicador de encendido",
"Over-the-range":"Sobre la estufa","300 CFM vent":"Extractor de 300 CFM",
"Includes mounting plate":"Incluye placa de montaje",
"Stacked laundry center":"Centro de lavado apilado",
"Washer 3.8 / dryer 5.9 cu. ft.":"Lavadora 3.8 / secadora 5.9 pies³",
"4 sealed burners":"4 quemadores sellados","Broiler drawer":"Cajón asador",
"3 heat settings":"3 niveles de calor",
"French door, bottom freezer":"Puerta francesa, congelador abajo",
"Ice and water dispenser":"Despachador de hielo y agua",
"Auto load sensing":"Detección automática de carga",
"Front control":"Control frontal","Stainless tub":"Tina de acero inoxidable",
"5 wash cycles":"5 ciclos de lavado",
// pre-sale test checklists
"All 4 elements heat":"Los 4 quemadores calientan",
"All burners light and hold flame":"Todos los quemadores encienden y mantienen la llama",
"Back panel dent is cosmetic only":"El golpe del panel trasero es solo cosmético",
"Both units run full cycles":"Las dos unidades corren ciclos completos",
"Compressor amp-draw normal":"Consumo del compresor normal",
"Defrost cycle verified":"Ciclo de descongelado verificado",
"Dispenser and ice maker tested":"Despachador y fábrica de hielo probados",
"Door boot clean":"Empaque de la puerta limpio",
"Door hinge and seal intact":"Bisagra y sello de la puerta intactos",
"Door latch and seal good":"Seguro y sello de la puerta bien",
"Doors align":"Las puertas alinean","Doors align, seals good":"Las puertas alinean, sellos bien",
"Drain plug present":"Tapón de drenaje presente",
"Drain pump clear and quiet":"Bomba de drenaje libre y silenciosa",
"Drum bearing quiet":"Balero del tambor silencioso",
"Fills":"Llena","Full cycle":"Ciclo completo","Full cycle run":"Ciclo completo corrido",
"Full cycle run and drained":"Ciclo completo corrido y drenado",
"Gas fittings leak-checked":"Conexiones de gas revisadas por fugas",
"Gaskets seal":"Los empaques sellan",
"Heats and tumbles normally":"Calienta y gira normal",
"Heats and turntable spins":"Calienta y el plato gira",
"Heats to temp and cycles off":"Calienta a temperatura y se apaga solo",
"Holds 37°F fresh / 0°F freezer":"Mantiene 37°F fresco / 0°F congelador",
"Holds temp in all zones":"Mantiene temperatura en todas las zonas",
"Holds temp in both compartments":"Mantiene temperatura en ambos compartimentos",
"Ice maker cycles":"La fábrica de hielo cicla",
"Igniter and burner tested":"Encendedor y quemador probados",
"Lid seal and hinge good":"Sello y bisagra de la tapa bien",
"Lid switch working":"Interruptor de la tapa funciona",
"Lint path clear":"Ducto de pelusa libre",
"No leaks":"Sin fugas","No leaks anywhere":"Sin fugas en ninguna parte",
"No leaks at door or pump":"Sin fugas en puerta ni bomba",
"No leaks at inlet or pump":"Sin fugas en la entrada ni la bomba",
"Oven holds set temp ±10°F":"El horno mantiene la temperatura ±10°F",
"Oven thermostat calibrated":"Termostato del horno calibrado",
"Pulls down to 0°F":"Baja hasta 0°F",
"Racks":"Canastillas","Racks and spray arms intact":"Canastillas y aspersores intactos",
"Sensor dry ends cycle correctly":"El secado por sensor termina el ciclo correctamente",
"Spin balance tested":"Balance de exprimido probado",
"Spin balance tested under load":"Balance de exprimido probado con carga",
"Stack brackets included":"Soportes de apilado incluidos",
"Thermal fuse and vent clear":"Fusible térmico y ducto libres",
"Vent fan and light work":"Extractor y luz funcionan",
"agitates":"agita","door seals good":"la puerta sella bien",
"drains and spins":"drena y exprime","drum quiet":"tambor silencioso",
"fills and drains":"llena y drena","heats and dries":"calienta y seca",
"no error codes":"sin códigos de error","no mildew":"sin moho","no odor":"sin olor",
"rails and arms intact":"rieles y brazos intactos","seals good":"sella bien",
"thermal fuse good":"fusible térmico bien",
};
Object.assign(ES, ES2);

const APPL = {washer:'una lavadora',dryer:'una secadora',refrigerator:'un refrigerador',
  range:'una estufa',dishwasher:'un lavavajillas',freezer:'un congelador',microwave:'un microondas'};
const DOWFULL = {Monday:'Lunes',Tuesday:'Martes',Wednesday:'Miércoles',Thursday:'Jueves',
  Friday:'Viernes',Saturday:'Sábado',Sunday:'Domingo'};
const DOW3 = {Mon:'Lun',Tue:'Mar',Wed:'Mié',Thu:'Jue',Fri:'Vie',Sat:'Sáb',Sun:'Dom'};
const MON3 = {Jan:'ene',Feb:'feb',Mar:'mar',Apr:'abr',May:'may',Jun:'jun',
  Jul:'jul',Aug:'ago',Sep:'sep',Oct:'oct',Nov:'nov',Dec:'dic'};
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
  [/^(\d+) rows? ready to import$/, "$1 filas listas para importar"],
  [/^(\d+) needs? fixing and will be skipped$/, "$1 necesitan corrección y se van a omitir"],
  [/^Import (\d+) Units? To The Website$/, "Importar $1 Unidades Al Sitio"],
  [/^(\d+) open$/, "$1 libres"],
  [/^Send Text To (\w+)$/, "Mandar Mensaje A $1"],
  [/^Website price after saving: \$([\d,]+)$/, "Precio en el sitio al guardar: $$$1"],
  [/^Delivery — (.+)$/, "Entrega — $1"],
  [/^Service Call — (.+)$/, "Visita de Servicio — $1"],
  [/^Edit — (.+)$/, "Editar — $1"],
  [/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+)$/,
    (m,d,mo,n)=> DOWFULL[d] + ", " + n + " " + MON3[mo]],
  [/^Imported (\d+) units? from a file$/, "Importó $1 unidades desde un archivo"],
  [/^(\d+) messages? already sent on this job\.$/, "$1 mensajes ya enviados en este trabajo."],
  [/^(\d+) sent$/, "$1 enviados"],
  [/^Lower of two rules applied \(age (\d+)% → \$([\d,]+)\s*·\s*market (\d+)% → \$([\d,]+)\)\. Margin \$([\d,]+) at (\d+)%\.$/,
    "Se aplicó la menor de dos reglas (antigüedad $1% → $$$2 · mercado $3% → $$$4). Margen $$$5 al $6%."],
  [/^Price drop −(\d+)%$/, "Rebaja de precio −$1%"],
  [/^Buy It Now — \$([\d,]+)$/, "Cómprela Ya — $$$1"],
  [/^Or Hold It With \$(\d+) Deposit$/, "O Apártela Con $$$1 De Depósito"],
  [/^Pay \$([\d,]+) In Full$/, "Pagar $$$1 Completo"],
  [/^Balance of \$([\d,]+) is due at pickup or delivery\.$/, "Quedan $$$1 por pagar al recoger o entregar."],
  [/^This unit is reserved\. Call ([\d-]+) to be next in line\.$/, "Esta unidad está apartada. Llame al $1 para ser el siguiente en la fila."],
  [/^We texted (\w+) the details\. The (.+) is off the floor and tagged with this number\.$/,
    "Le mandamos los detalles a $1 por mensaje. La $2 ya salió del piso y quedó etiquetada con este número."],
  [/^Order ([A-Z]{3}-\d+) · (.+) · \$([\d,]+) balance due$/, "Orden $1 · $2 · $$$3 por pagar"],
  [/^Order ([A-Z]{3}-\d+) · (.+) · paid in full$/, "Orden $1 · $2 · pagada por completo"],
  [/^(\d+) days?$/, "$1 días"],
  [/^(\d+) reviews?$/, "$1 reseñas"],
  [/^Reserve With \$(\d+) Deposit$/, "Aparte Con $$$1 De Depósito"],
  [/^Pay \$(\d+) Deposit$/, "Pagar $$$1 De Depósito"],
  [/^Lower of two rules applied \(age (\d+)% → \$([\d,]+)\s*·\s*market (\d+)% → \$([\d,]+)\)\.$/,
    "Se aplicó la menor de dos reglas (antigüedad $1% → $$$2 · mercado $3% → $$$4)."],
  [/^([\d.]+) cu\. ft\. capacity$/, "$1 pies³ de capacidad"],
  [/^(\d+)" wide × (\d+)" tall$/, '$1" ancho × $2" alto'],
  [/^(\d+)" free-standing$/, '$1" independiente'],
  [/^(\d+)" built-in$/, '$1" empotrado'],
  [/^Suggested list: \$([\d,]+)$/, "Lista sugerida: $$$1"],
  [/^Local market average for a Grade ([ABC]) (\w+) is about \$([\d,]+)\.$/,
    (m,g,a,v)=> "El promedio del mercado local para " + (APPL[a]||a) + " Grado " + g + " es de unos $" + v + "."],
  [/^\+(\d+) days from today$/, "+$1 días desde hoy"],
  [/^(\d+)% of local average$/, "$1% del promedio local"],
  [/^(\d+)% margin$/, "$1% de margen"],
  [/^(\d+) units? currently held at the floor\.$/, "$1 unidades actualmente detenidas en el piso."],
  [/^(\d+) of (\d+) units are marked down\. Total price concession across the floor:$/,
    "$1 de $2 unidades están rebajadas. Concesión total de precio en el piso:"],
  [/^— which is what it costs to move (\d+) machines that would otherwise still be sitting there\.$/,
    "— que es lo que cuesta mover $1 máquinas que si no seguirían ahí paradas."],
  [/^(\d+) jobs? booked$/, "$1 citas agendadas"],
  [/^(\d+) of (\d+) slots booked$/, "$1 de $2 espacios ocupados"],
  [/^(\d+) — none$/, "$1 — ninguna"],
  [/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+)$/,
    (m,d,mo,n)=> DOW3[d] + ", " + n + " " + MON3[mo]],
  [/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d+)$/, (m,mo,n)=> n + " " + MON3[mo]],
  [/^(\d+) mi (east|west|north|south|northeast|northwest|southeast|southwest)$/, dirEs],
  [/^(\d+) miles? (east|west|north|south|northeast|northwest|southeast|southwest)$/, dirEs],
];
const ES_DOW = {MON:'LUN',TUE:'MAR',WED:'MIÉ',THU:'JUE',FRI:'VIE',SAT:'SÁB',SUN:'DOM'};
// Appliance descriptors appear standalone AND glued to a brand and a SKU
// ("Whirlpool 4.5 cu. ft. Top-Load Washer — CX6946-WA"), so these run as
// ordered substring swaps. Longest phrase first — "Top-Load Washer, Deep
// Fill" has to win before "Top-Load Washer" gets a chance at it.
const ES_PART = [
  ["Front-Load Dryer, Electric","Secadora de Carga Frontal, Eléctrica"],
  ["Grade A · Like New","Grado A · Como Nueva"],
  ["Grade B · Light Wear","Grado B · Uso Ligero"],
  ["Grade C · Cosmetic Damage","Grado C · Daño Cosmético"],
  ["Not heating / not cooling","No calienta / no enfría"],
  ["Won't drain or spin","No drena ni exprime"],
  ["Error code on display","Código de error en pantalla"],
  ["Loud noise or shaking","Hace ruido o vibra"],
  ["Won't turn on","No enciende"],
  ["Leaking water","Tira agua"],
  ["Error code","Código de error"],
  ["Not cooling","No enfría"],
  ["heating element + labor","resistencia + mano de obra"],
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
  ["Front-Load Dryer","Secadora de Carga Frontal"],
  ["Gas Dryer","Secadora de Gas"],
  ["Dented back panel, cosmetic","panel trasero golpeado, cosmético"],
  ["Dent left side, cooktop scuffed","golpe lado izquierdo, parrilla rayada"],
  ["Small dent, right door","golpe pequeño, puerta derecha"],
  ["Rack rail replaced","riel de canastilla reemplazado"],
  ["Minor scuff on lid","rayón menor en la tapa"],
  ["Handle scratched","manija rayada"],
  ["cu. ft.","pies³"],
  [/\bRefrigerator\b/g,"Refrigerador"],
  [/\bDishwasher\b/g,"Lavavajillas"],
  [/\bMicrowave\b/g,"Microondas"],
  [/\bFreezer\b/g,"Congelador"],
  [/\bWasher\b/g,"Lavadora"],
  [/\bDryer\b/g,"Secadora"],
  [/\bRange\b/g,"Estufa"],
];
function esLookup(s){
  const k = s.replace(/\u00a0/g,' ');           // &nbsp; in the markup must not break an exact match
  if(ES[k]) return ES[k];
  if(ES_DOW[k]) return ES_DOW[k];
  if(k.startsWith('\u203a ')){ const r = esLookup(k.slice(2)); if(r) return '\u203a ' + r; }
  for(const [re,out] of ES_RE){ if(re.test(k)) return k.replace(re,out); }
  let out = k, hit = false;
  for(const [a,b] of ES_PART){
    if(a instanceof RegExp){ if(a.test(out)){ out = out.replace(a,b); hit = true; } }
    else if(out.includes(a)){ out = out.split(a).join(b); hit = true; }
  }
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

function render(){
  snapForms();
  $('nav').innerHTML = state.mode==='customer'
    ? CUST_VIEWS.map(([k,l])=>`<button class="${state.view===k?'on':''}" onclick="go('${k}')">${l}</button>`).join('')
      + `<div class="navitem" id="aboutItem">
           <button class="${state.view==='locations'?'on':''}" onclick="toggleAbout(event)">About Us ${CARET}</button>
           <div class="navmenu">
             ${ABOUT.map(([href,label,sub])=> href.startsWith('view:')
               ? `<a href="#${href.slice(5)}" onclick="closeAbout();go('${href.slice(5)}');return false"><b>${label}</b><span>${sub}</span></a>`
               : `<a href="${href}"><b>${label}</b><span>${sub}</span></a>`).join('')}
           </div>
         </div>`
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
  applyLang();
}
function toggleAbout(e){
  e.stopPropagation();
  const el=document.getElementById('aboutItem');
  if(el) el.classList.toggle('open');
}
function closeAbout(){ const el=document.getElementById('aboutItem'); if(el) el.classList.remove('open'); }
document.addEventListener('click', closeAbout);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAbout(); });

const HASH_VIEWS = ['shop','delivery','service','financing','locations'];
function applyHash(){
  const h=(location.hash||'').replace('#','');
  if(HASH_VIEWS.includes(h)){ state.view=h; return true; }
  return false;
}
window.addEventListener('hashchange', ()=>{ if(applyHash()) render(); });

function go(v){ state.view=v; closeAbout(); if(location.hash.replace('#','')!==v) history.replaceState(null,'','#'+v); closeMenu(); window.scrollTo(0,0); render(); }

/* ---------- mobile navigation drawer ---------- */
function renderMobMenu(){
  const el=$('mobmenu'); if(!el) return;
  const avail=availableUnits();
  const counts={shop:avail.length};
  el.innerHTML = `<div class="wrap">
    ${state.mode==='customer' ? CUST_VIEWS.map(([k,l])=>`
      <button class="mlink ${state.view===k?'on':''}" onclick="go('${k}')">
        <span>${l}</span>${k==='shop'?`<span class="c">${counts.shop} in stock</span>`:'<span class="c">&rsaquo;</span>'}
      </button>`).join('') + `
      <div class="mgroup">About Us</div>
      <button class="mlink ${state.view==='locations'?'on':''}" onclick="go('locations')"><span>Our Locations</span><span class="c">2 stores &rsaquo;</span></button>
      <a class="mlink" href="/service-area/"><span>Service Area</span><span class="c">16 towns &rsaquo;</span></a>
      <a class="mlink" href="/reviews/"><span>Reviews</span><span class="c">&rsaquo;</span></a>` : `
      <button class="mlink" onclick="exitStaff()"><span>Back to the website</span><span class="c">&rsaquo;</span></button>
      ${ctabs().map(([k,l])=>`<button class="mlink ${state.ctab===k?'on':''}" onclick="ctab('${k}');closeMenu()"><span>${l}</span><span class="c">&rsaquo;</span></button>`).join('')}`}
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
function signOut(){ closeMenu(); logAct('Signed out'); state.auth=false; state.me=null; state.mode='customer'; window.scrollTo(0,0); render(); toast('Signed out of staff console'); }
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
    <div class="demo-creds"><b>Demo credentials</b> — three roles, three different consoles.<br>
      Owner <b>mcruz</b> / <b>1506</b> · Manager <b>ncruz</b> / <b>2053</b> · Counter <b>staff</b> / <b>1111</b>.<br>
      Sign in as the counter to see cost, margin, payments and the pricing rules disappear.</div>
  `,'sm','',`<button class="btn b-rust" onclick="doLogin()">Sign In</button>`);
  setTimeout(()=>{ const el=$('lgUser'); if(el) el.focus(); },60);
}
function doLogin(){
  const u=($('lgUser').value||'').trim().toLowerCase();
  const p=($('lgPin').value||'').trim();
  if(!u || !p){ loginModal('Enter a staff ID and PIN.'); return; }
  const who = state.staff.find(x=>x.user===u && x.pin===p);
  if(who){
    state.auth=true; state.me=who; state.mode='staff';
    if(!ctabs().some(([k])=>k===state.ctab)) state.ctab = ctabs()[0][0];
    closeModal(); window.scrollTo(0,0); render();
    logAct('Signed in');
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

  <div class="shopwrap">
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
  </div>

  <div class="trust"><div class="wrap">
    <div class="t"><span>Every unit</span><b>90 days</b><p>Parts and labor on most machines. We tell you the exact coverage before you pay a dollar.</p></div>
    <div class="t"><span>Parker County</span><b>$79 delivered</b><p>Delivered, hooked up, and your old unit hauled away. Two-hour window, not all day.</p></div>
    <div class="t"><span>No credit needed</span><b>10 minutes</b><p>Acima and Snap, approved right at the counter. Bring an ID, a checking account and proof of income.</p></div>
  </div></div>

  ${wantSection()}
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
            : `<button class="btn b-ghost" onclick="openCheckout(${u.id},'deposit')">Or Hold It With $50 Deposit</button>
               <button class="btn b-ghost" onclick="closeModal();go('financing')">See Financing Options</button>`}
        </div>
        <p class="hint" style="margin-top:12px">Delivery is scheduled after you buy — you'll get the option on the next screen, or any time later with your order number. This is the only unit at this price.</p>
      </div>
    </div>`, '', '', u.status==='reserved' ? '' : `<button class="btn b-rust" onclick="openCheckout(${u.id},'full')">Buy It Now — ${money(p.price + Math.round(p.price*0.0825))}</button>`);
}

/* ---------- CHECKOUT ---------- */
function openCheckout(id, mode){
  const u=state.units.find(x=>x.id===id); const p=priceOf(u);
  const tax=Math.round(p.price*0.0825), total=p.price+tax;
  const full = mode==='full';
  const charge = full ? total : 50;
  modal(full?'Buy This Unit':'Hold This Unit', `
    <div class="frow">
      <div class="f full"><label>${full?'Buying':'Holding'}</label>
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
      ${full
        ? `<div class="sumrow" style="color:var(--brushed)"><span>Balance due at pickup or delivery</span><span>${money(0)}</span></div>
           <div class="sumrow tot"><span>Charged today — paid in full</span><span>${money(total)}</span></div>`
        : `<div class="sumrow" style="color:var(--brushed)"><span>Balance due at pickup or delivery</span><span>${money(total-50)}</span></div>
           <div class="sumrow tot"><span>Charged today — deposit</span><span>${money(50)}</span></div>`}
    </div>
    <p class="hint" style="margin-top:12px;text-align:center">Simulated transaction — no live gateway is connected in this prototype. Production routes through Accept Blue.</p>
  `,'sm', `openUnit(${u.id})`,
    `<button class="btn b-rust" onclick="payNow(${u.id},'${full?'full':'deposit'}',${charge},${total})">${full?`Pay ${money(total)} In Full`:`Pay ${money(50)} Deposit`}</button>`);
}
function fmtCard(el){ el.value = el.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim(); }
function payNow(id,mode,charge,total){
  const u=state.units.find(x=>x.id===id);
  const name=($('ckName').value||'').trim();
  const phone=($('ckPhone').value||'').trim();
  const card=($('ckCard').value||'').replace(/\s/g,'');
  if(!name){ toast('Enter a name'); return; }
  if(card.length<15){ toast('Enter a card number'); return; }
  const full = mode==='full';
  // Sold units leave the floor. The order is what survives — that is the thing
  // delivery scheduling looks up later, so a bought machine is never orphaned.
  u.status = full ? 'sold' : 'reserved';
  const c = confNum(full?'ORD':'RES');
  state.orders.push({ref:c, unitId:u.id, item:`${u.brand} ${u.model}`, serial:u.serial,
    customer:name, phone:digits(phone), paid:charge, balance:total-charge, full:full,
    when:new Date(), delivery:null});
  state.payments.push({ref:c, type:full?'Counter sale':'Deposit', desc:`${u.brand} ${u.model}`,
    customer:name, amount:charge, status:'Approved', when:new Date(), balance:total-charge});
  modal(full?'Paid In Full':'Held For You', `<div class="ok">
      <div class="tick">✓</div>
      <h2>${full?'It\'s yours.':'Unit held for 72 hours.'}</h2>
      <p>We texted ${esc(name.split(' ')[0])} the details. The ${esc(u.brand)} is off the floor and tagged with this number.</p>
      <div class="conf">${c}</div>
      <p style="margin-bottom:6px">${full?'Nothing else is owed.':`Balance of ${money(total-charge)} is due at pickup or delivery.`}</p>
      <p class="hint" style="margin-bottom:18px">Keep this number. You can schedule delivery now or any time later with it.</p>
      <button class="btn b-rust" onclick="startDelivery('${c}')">Schedule Delivery</button>
      <button class="btn b-ghost" style="margin-left:8px" onclick="closeModal()">I'll Pick It Up</button>
    </div>`,'sm');
  render();
}
function digits(v){ return (v||'').replace(/\D/g,''); }
function findOrderBy(q){
  const t=(q||'').trim().toLowerCase(), d=digits(q);
  if(!t) return null;
  return state.orders.find(o => o.ref.toLowerCase()===t || (d.length>=10 && o.phone.endsWith(d.slice(-10)))) || null;
}

/* ---------- DELIVERY ---------- */
let dSel={date:null,slot:null,order:null};
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
          <div class="f full"><label>What are we delivering?</label>${orderBlock()}</div>
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
/* Delivery is attached to an ORDER, not to whatever is currently on the floor.
   A unit the staff marked sold vanishes from inventory — the order does not,
   so the person who actually bought it can still book a truck. */
function orderBlock(){
  const o = dSel.order ? state.orders.find(x=>x.ref===dSel.order) : null;
  if(o) return `<div class="ordercard">
      <div>
        <b>${esc(o.item)}</b>
        <span>Order ${o.ref} · ${esc(o.customer)}${o.balance>0?` · ${money(o.balance)} balance due`:' · paid in full'}</span>
      </div>
      <button class="lnk" onclick="clearOrder()">Change</button>
    </div>`;
  return `<div class="orderfind">
      <div class="ofrow">
        <input type="text" id="dvOrder" placeholder="ORD-482913 or your mobile number">
        <button class="btn b-dark" onclick="lookupOrder()">Find My Order</button>
      </div>
      <p class="hint">Use the order number we texted you, or the mobile number you gave us at the counter. Bought in store? Staff can look it up at ${MAIN_PHONE}.</p>
      <p class="hint">Haven't bought yet? <button class="lnk" onclick="go('shop')">Shop the floor first &rsaquo;</button></p>
    </div>`;
}
function lookupOrder(){
  const o = findOrderBy(($('dvOrder')||{}).value);
  if(!o){ toast('No order found — check the number'); return; }
  if(o.delivery){ toast('That order already has a delivery booked'); return; }
  dSel.order = o.ref;
  if(!$('dvName').value) $('dvName').value = o.customer;
  render();
}
function clearOrder(){ dSel.order=null; render(); }
function startDelivery(ref){ closeModal(); dSel.order=ref; go('delivery'); }
function pickDay(k){ dSel.date=k; dSel.slot=null; render(); }
function pickSlot(s){ dSel.slot=s; render(); }
function bookDelivery(){
  const name=($('dvName').value||'').trim(), addr=($('dvAddr').value||'').trim();
  const o = dSel.order ? state.orders.find(x=>x.ref===dSel.order) : null;
  if(!o){ toast('Find your order first'); return; }
  if(!dSel.date||!dSel.slot){ toast('Pick a date and window'); return; }
  if(!name||!addr){ toast('Name and address required'); return; }
  const c=confNum('DEL');
  o.delivery=c;
  state.deliveries.push({ref:c,dateKey:dSel.date,slot:dSel.slot,customer:name,addr:addr+', '+$('dvCity').value+' '+$('dvZip').value,item:o.item,notes:$('dvNotes').value});
  state.payments.push({ref:c,type:'Delivery fee',desc:o.item,customer:name,amount:79,status:'Approved',when:new Date(),balance:0});
  const d=new Date(dSel.date+'T12:00:00');
  modal('Delivery Scheduled', `<div class="ok">
    <div class="tick">✓</div><h2>You're on the truck.</h2>
    <p>${dfull(d)}, ${dSel.slot}. We'll text ${esc(name.split(' ')[0])} when the driver is 30 minutes out.</p>
    <div class="conf">${c}</div>
    <button class="btn b-rust" onclick="closeModal();go('shop')">Back To Inventory</button></div>`,'sm');
  dSel={date:null,slot:null,order:null};
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
    <p class="hint" style="margin-top:11px;text-align:center">Prototype — no application is actually submitted and no credit inquiry is made.</p>
  `,'sm','',`<button class="btn b-rust" onclick="submitFin('${partner}')">Text Me The Application Link</button>`);
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
        <div class="locmeta"><a href="${mapsHref(d.street+', '+d.city)}" target="_blank" rel="noopener" style="color:inherit">${d.street}<br>${d.city}</a><br><a href="tel:+1${d.phone.replace(/\D/g,'')}"><b>${d.phone}</b></a></div>
        <p style="font-size:13.5px;color:var(--iron);margin-bottom:16px">${d.note}</p>
        <div class="hoursrow"><b>Mon – Fri</b><span>9:00 AM – 6:00 PM</span></div>
        <div class="hoursrow"><b>Saturday</b><span>9:00 AM – 4:00 PM</span></div>
        <div class="hoursrow closed"><b>Sunday</b><span>Closed</span></div>
      </div>
    </div>
    <div class="mapbox">${mapSvg(d.key)}<span class="mapattr">Locator map · opens in Google Maps</span></div>
    <div class="mapacts">
      <a href="${mapsHref(d.street+', '+d.city)}" target="_blank" rel="noopener">${ICON.pin}Get Directions</a>
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

/* ---------- WANT LIST — capture the customer we didn't have anything for ---------- */
function wantSection(){
  const waiting = state.wants.filter(w=>w.status==='Waiting').length;
  return `<div class="want"><div class="wrap">
    <div>
      <span class="chip c-md">New machines every week</span>
      <h2>Didn't find it?<br>Tell us what<br>you're hunting for.</h2>
      <p class="l">Most of what we take in sells off the floor before it ever reaches this page. Tell us what you need and we'll text you the day one lands — before anybody else sees it.</p>
      <div class="stat">
        <div><b>${waiting}</b><span>People On The List</span></div>
        <div><b>Free</b><span>Costs You Nothing</span></div>
        <div><b>No spam</b><span>One Text, That's It</span></div>
      </div>
      <div class="altcta">
        Appliance already broken? <button onclick="go('service')">Book a repair instead &rsaquo;</button>
      </div>
    </div>
    <div class="wantform">
      <h3>Put me on the list</h3>
      <div class="frow">
        <div class="f full"><label>What are you looking for?</label>
          <select id="wtCat">${CATS.map(c=>`<option>${c}</option>`).join('')}<option>Stackable Washer/Dryer</option><option>Something else</option></select></div>
        <div class="f full"><label>About what budget?</label>
          <select id="wtBand"><option>Under $400</option><option selected>$400 – $700</option><option>$700 – $1,000</option><option>$1,000+</option></select></div>
        <div class="f"><label>First name</label><input type="text" id="wtName" placeholder="Jane"></div>
        <div class="f"><label>Mobile</label><input type="tel" id="wtPhone" placeholder="(817) 555-0142"></div>
      </div>
      <button class="btn b-rust" style="width:100%" onclick="submitWant()">Text Me When One Comes In</button>
      <p class="hint" style="margin-top:10px;text-align:center">We only text you about the machine you asked for.</p>
    </div>
  </div></div>`;
}
function submitWant(){
  const name=($('wtName').value||'').trim(), phone=($('wtPhone').value||'').trim();
  if(!name||!phone){ toast('First name and mobile required'); return; }
  const cat=$('wtCat').value, band=$('wtBand').value;
  state.wants.push({ref:confNum('WANT'),cat,band,name,phone,when:new Date(),status:'Waiting'});
  const ahead=state.wants.filter(w=>w.cat===cat&&w.status==='Waiting').length-1;
  modal('You\'re On The List', `<div class="ok">
    <div class="tick">✓</div><h2>We'll text you.</h2>
    <p>${esc(name)}, the next ${cat.toLowerCase()} we take in around ${band} — you hear about it first.</p>
    ${ahead>0?`<p style="color:var(--iron)">${ahead} other ${ahead===1?'person is':'people are'} waiting on the same thing, so we're actively looking.</p>`:''}
    <p style="margin-bottom:18px">Can't wait? Call ${MAIN_PHONE} and we'll tell you what's coming.</p>
    <button class="btn b-rust" onclick="closeModal()">Done</button></div>`,'sm');
  clearForm(['wtName','wtPhone']);
  render();
}

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
          <span class="fsmall">Sales &amp; general</span>
          <a class="fphone" href="tel:+18176298047" style="margin-top:10px">${REPAIR_PHONE}</a>
          <span class="fsmall">Repairs line</span>
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
            <li><a href="/service-area/" style="text-decoration:none">Service Area &mdash; ${AREAS.length} Towns</a></li>
            <li><a href="/reviews/" style="text-decoration:none">Reviews</a></li>
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
        ${AREAS.map(([t,sl])=>`<a href="/appliances-${sl}-tx/">${t}</a>`).join(' &middot; ')}
      </div>

      <div class="fbottom">
        <span>© 2026 Cross Appliances LLC · Weatherford, Texas · All rights reserved</span>
        <span>Working prototype built by AlliedOne Marketing. Inventory, pricing, scheduling and payments are demonstration data.</span>
      </div>
    </div>
  </footer>`;
}
