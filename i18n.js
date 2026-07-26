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
