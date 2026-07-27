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
const AREAS = [
  ['Weatherford','weatherford'],['Hudson Oaks','hudson-oaks'],['Willow Park','willow-park'],
  ['Brock','brock'],['Annetta','annetta'],['Aledo','aledo'],['Peaster','peaster'],['Cool','cool'],
  ['Millsap','millsap'],['Poolville','poolville'],['Springtown','springtown'],['Azle','azle'],
  ['Mineral Wells','mineral-wells'],['West Fort Worth','west-fort-worth'],
  ['Parker County','parker-county'],['Palo Pinto County','palo-pinto-county'],
];
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
    mk('Kenmore','4.2 cu. ft. Top-Load Washer','Washer','B',195,369,380,44,'Mineral Wells Hwy','Lid hinge replaced','60-day parts'),
    mk('GE','7.2 cu. ft. Gas Dryer','Dryer','A',235,429,440,7,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('LG','French Door Refrigerator, 26 cu. ft.','Refrigerator','B',640,1149,1180,31,'FM 920','Scuff on lower drawer','90-day parts & labor'),
    mk('Frigidaire','30" Electric Range, Smooth Top','Range','A',290,549,565,11,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Bosch','300 Series 24" Dishwasher','Dishwasher','A',320,599,620,5,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Whirlpool','Upright Freezer, 16 cu. ft.','Freezer','B',225,419,405,52,'FM 920','Door seal replaced','60-day parts'),
    mk('Samsung','7.5 cu. ft. Electric Dryer','Dryer','A',345,629,650,14,'FM 920','','90-day parts & labor'),
    mk('Maytag','Bravos Top-Load Washer','Washer','C',165,329,300,94,'FM 920','Console scratched, runs clean','60-day parts'),
    mk('Electrolux','Front-Load Washer, Steam','Washer','B',460,839,820,26,'FM 920','','90-day parts & labor'),
    mk('GE','Top-Freezer Refrigerator, 17 cu. ft.','Refrigerator','B',280,519,505,41,'Mineral Wells Hwy','Small dent, freezer door','90-day parts & labor'),
    mk('Amana','30" Gas Range','Range','B',180,349,360,35,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Kenmore','Over-the-Range Microwave','Microwave','C',45,119,105,77,'FM 920','Door trim cracked','As-is, no warranty'),
    mk('Whirlpool','Cabrio 5.3 cu. ft. Top-Load Washer','Washer','A',330,619,640,8,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('LG','Side-by-Side Refrigerator, 26 cu. ft.','Refrigerator','A',680,1229,1260,3,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Hotpoint','6.2 cu. ft. Electric Dryer','Dryer','C',110,239,225,101,'FM 920','Drum scratched, heats fine','As-is, no warranty'),
    mk('Frigidaire','Chest Freezer, 7 cu. ft.','Freezer','A',135,259,265,19,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Samsung','24" Built-In Dishwasher','Dishwasher','B',230,439,425,29,'FM 920','Handle scuffed','90-day parts & labor'),
    mk('Roper','Top-Load Washer, 3.5 cu. ft.','Washer','C',125,259,240,83,'FM 920','Cosmetic rust, back panel','30-day parts'),
    mk('GE','French Door Refrigerator, 25 cu. ft.','Refrigerator','B',590,1069,1040,48,'FM 920','Ice maker replaced','90-day parts & labor'),
    mk('Speed Queen','Commercial Top-Load Washer','Washer','A',540,979,1010,16,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Maytag','30" Free-Standing Gas Range','Range','A',315,589,610,10,'Mineral Wells Hwy','','90-day parts & labor'),
    mk('Whirlpool','Stackable Washer/Dryer, Gas','Dryer','B',560,1019,990,37,'FM 920','','90-day parts & labor'),
    mk('Insignia','Over-the-Range Microwave','Microwave','A',75,169,175,13,'Mineral Wells Hwy','','60-day parts'),
    mk('Frigidaire','Upright Freezer, 20 cu. ft.','Freezer','B',290,539,525,58,'FM 920','Shelf clip missing','60-day parts'),
    mk('LG','24" Front-Control Dishwasher','Dishwasher','C',105,229,210,96,'FM 920','Front panel dented','30-day parts'),
    mk('Kenmore','Elite Side-by-Side Refrigerator','Refrigerator','B',420,779,760,66,'Mineral Wells Hwy','Dispenser trim scratched','60-day parts'),
  ],
  deliveries:[], service:[], payments:[], leads:[], wants:[], orders:[], messages:[],
  me:null, staff:[], activity:[]
};


/* Per-unit photography + spec sheet. Photos are rendered product shots, shot
   to one consistent setup exactly as the brand direction prescribes. */
const UNIT_EXTRA = [
 {photo:'assets/u01.jpg', finish:'White', specs:['4.5 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u02.jpg', finish:'White', specs:['7.0 cu. ft. capacity','Electric, 240V','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u03.jpg', finish:'Stainless', specs:['25 cu. ft. capacity','Side-by-side','Ice and water in door','36" wide × 69" tall'],
  checked:['Holds 37°F fresh / 0°F freezer','Ice maker cycles','Compressor amp-draw normal']},
 {photo:'assets/u04.jpg', finish:'White', specs:['30" free-standing','Electric, 240V','4 coil elements','Self-clean oven'],
  checked:['Oven holds set temp ±10°F','All burners light and hold flame','Door hinge and seal intact']},
 {photo:'assets/u05.jpg', finish:'Slate', specs:['4.5 cu. ft. capacity','Front-load with steam','Vibration reduction','27" wide × 38" tall'],
  checked:['Full cycle run and drained','Door boot clean, no mildew','Drain pump clear and quiet']},
 {photo:'assets/u06.jpg', finish:'White', specs:['7.0 cu. ft. capacity','Natural gas','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u07.jpg', finish:'White', specs:['18 cu. ft. capacity','Top freezer','Glass shelves','30" wide × 66" tall'],
  checked:['Holds temp in both compartments','Door hinge and seal intact','Defrost cycle verified']},
 {photo:'assets/u08.jpg', finish:'Black', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle run and drained','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u09.jpg', finish:'White', specs:['15 cu. ft. capacity','Chest style','Manual defrost','Power-on indicator'],
  checked:['Pulls down to 0°F','Lid seal and hinge good','Drain plug present']},
 {photo:'assets/u10.jpg', finish:'Stainless', specs:['1.7 cu. ft. capacity','Over-the-range','300 CFM vent','Includes mounting plate'],
  checked:['Heats and turntable spins','Vent fan and light work','Door latch and seal good']},
 {photo:'assets/u11.jpg', finish:'White', specs:['Stacked laundry center','Electric, 240V','Washer 3.8 / dryer 5.9 cu. ft.','27" wide × 76" tall'],
  checked:['Both units run full cycles','Stack brackets included','No leaks anywhere']},
 {photo:'assets/u12.jpg', finish:'Stainless', specs:['30" free-standing','Natural gas','4 sealed burners','Self-clean oven'],
  checked:['Oven holds set temp ±10°F','All burners light and hold flame','Door hinge and seal intact']},
 {photo:'assets/u13.jpg', finish:'Bisque', specs:['7.0 cu. ft. capacity','Electric, 240V','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u14.jpg', finish:'Stainless', specs:['28 cu. ft. capacity','French door, bottom freezer','Ice and water dispenser','36" wide × 70" tall'],
  checked:['Holds temp in all zones','Dispenser and ice maker tested','Doors align, seals good']},
 {photo:'assets/u15.jpg', finish:'White', specs:['4.2 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u16.jpg', finish:'Stainless', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle run and drained','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u17.jpg', finish:'White', specs:['4.2 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u18.jpg', finish:'White', specs:['7.2 cu. ft. capacity','Natural gas','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u19.jpg', finish:'Stainless', specs:['26 cu. ft. capacity','French door, bottom freezer','Ice and water dispenser','36" wide × 70" tall'],
  checked:['Holds temp in all zones','Dispenser and ice maker tested','Doors align, seals good']},
 {photo:'assets/u20.jpg', finish:'Stainless', specs:['30" free-standing','Electric, 240V','4 coil elements','Self-clean oven'],
  checked:['Oven holds set temp ±10°F','All burners light and hold flame','Door hinge and seal intact']},
 {photo:'assets/u21.jpg', finish:'Stainless', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle run and drained','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u22.jpg', finish:'White', specs:['16 cu. ft. capacity','Upright, 4 shelves','Manual defrost','Power-on indicator'],
  checked:['Pulls down to 0°F','Lid seal and hinge good','Drain plug present']},
 {photo:'assets/u23.jpg', finish:'Slate', specs:['7.5 cu. ft. capacity','Electric, 240V','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u24.jpg', finish:'White', specs:['4.2 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u25.jpg', finish:'Stainless', specs:['4.5 cu. ft. capacity','Front-load with steam','Vibration reduction','27" wide × 38" tall'],
  checked:['Full cycle run and drained','Door boot clean, no mildew','Drain pump clear and quiet']},
 {photo:'assets/u26.jpg', finish:'White', specs:['17 cu. ft. capacity','Top freezer','Glass shelves','30" wide × 66" tall'],
  checked:['Holds temp in both compartments','Door hinge and seal intact','Defrost cycle verified']},
 {photo:'assets/u27.jpg', finish:'White', specs:['30" free-standing','Natural gas','4 sealed burners','Self-clean oven'],
  checked:['Oven holds set temp ±10°F','All burners light and hold flame','Door hinge and seal intact']},
 {photo:'assets/u28.jpg', finish:'Black', specs:['1.7 cu. ft. capacity','Over-the-range','300 CFM vent','Includes mounting plate'],
  checked:['Heats and turntable spins','Vent fan and light work','Door latch and seal good']},
 {photo:'assets/u29.jpg', finish:'White', specs:['5.3 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u30.jpg', finish:'Stainless', specs:['26 cu. ft. capacity','Side-by-side','Ice and water in door','36" wide × 69" tall'],
  checked:['Holds 37°F fresh / 0°F freezer','Ice maker cycles','Compressor amp-draw normal']},
 {photo:'assets/u31.jpg', finish:'White', specs:['6.2 cu. ft. capacity','Electric, 240V','Auto-dry sensor','27" wide × 39" tall'],
  checked:['Heats and tumbles normally','Thermal fuse and vent clear','Drum bearing quiet']},
 {photo:'assets/u32.jpg', finish:'White', specs:['7 cu. ft. capacity','Chest style','Manual defrost','Power-on indicator'],
  checked:['Pulls down to 0°F','Lid seal and hinge good','Drain plug present']},
 {photo:'assets/u33.jpg', finish:'Black', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle run and drained','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u34.jpg', finish:'White', specs:['3.5 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u35.jpg', finish:'White', specs:['25 cu. ft. capacity','French door, bottom freezer','Ice and water dispenser','36" wide × 70" tall'],
  checked:['Holds temp in all zones','Dispenser and ice maker tested','Doors align, seals good']},
 {photo:'assets/u36.jpg', finish:'White', specs:['4.2 cu. ft. capacity','Deep-fill option','11 wash cycles','27" wide × 42" tall'],
  checked:['Fills, agitates, drains and spins','Spin balance tested under load','No leaks at inlet or pump']},
 {photo:'assets/u37.jpg', finish:'Stainless', specs:['30" free-standing','Natural gas','4 sealed burners','Self-clean oven'],
  checked:['Oven holds set temp ±10°F','All burners light and hold flame','Door hinge and seal intact']},
 {photo:'assets/u38.jpg', finish:'White', specs:['Stacked laundry center','Natural gas','Washer 3.8 / dryer 5.9 cu. ft.','27" wide × 76" tall'],
  checked:['Both units run full cycles','Stack brackets included','No leaks anywhere']},
 {photo:'assets/u39.jpg', finish:'Stainless', specs:['1.7 cu. ft. capacity','Over-the-range','300 CFM vent','Includes mounting plate'],
  checked:['Heats and turntable spins','Vent fan and light work','Door latch and seal good']},
 {photo:'assets/u40.jpg', finish:'Stainless', specs:['20 cu. ft. capacity','Upright, 4 shelves','Manual defrost','Power-on indicator'],
  checked:['Pulls down to 0°F','Lid seal and hinge good','Drain plug present']},
 {photo:'assets/u41.jpg', finish:'Stainless', specs:['24" built-in','4 wash cycles','Heated dry','Front control panel'],
  checked:['Full cycle run and drained','No leaks at door or pump','Racks and spray arms intact']},
 {photo:'assets/u42.jpg', finish:'White', specs:['25 cu. ft. capacity','Side-by-side','Ice and water in door','36" wide × 69" tall'],
  checked:['Holds 37°F fresh / 0°F freezer','Ice maker cycles','Compressor amp-draw normal']},
];
state.units.forEach((u,i)=>{ const e=UNIT_EXTRA[i]; if(!e) return; u.photo=e.photo; u.finish=e.finish; u.specs=e.specs; u.checked=e.checked; });
