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
  ],
  deliveries:[], service:[], payments:[], leads:[], wants:[], orders:[]
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
