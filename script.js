var TY={feat:'<svg viewBox="0 0 16 16"><path d="M8 1l2 5 5 .5-4 3.4 1.3 5L8 12l-4.3 2.9L5 9.9 1 6.5 6 6z" fill="#1F4E8C"/></svg>',bug:'<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="3.5" ry="5" fill="#C0392B"/><path d="M2 5l3 2M14 5l-3 2M2 12l3-1.5M14 12l-3-1.5" stroke="#C0392B" stroke-width="1.5"/></svg>',task:'<svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="12" rx="2" fill="#2E7D5B"/><path d="M5 8l2 2 4-4" stroke="#fff" stroke-width="1.8" fill="none"/></svg>'};
var LG=['<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#1F4E8C"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#fff" stroke-width="1.5" transform="rotate(-25 12 12)"/><circle cx="12" cy="12" r="3.5" fill="#fff"/></svg>','<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#2E7D5B"/><circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5" fill="#fff"/></svg>','<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#9A6F22"/><path d="M12 4l2.5 5.500 6 .7-4.400 4 1.200 6L12 17.300 6.700 20.200l1.200-6L3.500 10.200l6-.7z" fill="#fff"/></svg>'];
var W=[{k:"nw",n:"Northwind Logistics",plan:"Growth",lim:99,c:0x3B7DD8,sp:"Sprint 14: Route optimiser"},{k:"hx",n:"Helix Biotech",plan:"Scale",lim:99,c:0x3FB584,sp:"Sprint 9: Lab scheduling"},{k:"mc",n:"Marlowe & Co.",plan:"Starter",lim:5,c:0xD9AA52,sp:"Sprint 3: Client onboarding"}];
var ST=[["backlog","Backlog","#8FA3BF",4.7],["doing","In progress","#5FA8F0",3.7],["review","In review","#E0B04A",2.7],["done","Shipped","#5FD0A0",1.7]];
var SEED={nw:[["NW-101","Model carrier rate cards","high","AK","backlog","feat"],["NW-102","Add depot capacity limits","medium","JR","backlog","task"],["NW-097","Driver app offline sync","high","MS","doing","feat"],["NW-093","Audit log export to CSV","low","AK","review","task"],["NW-088","Dispatcher role permissions","medium","JR","done","feat"],["NW-085","Webhook retries with backoff","medium","MS","done","bug"]],hx:[["HX-211","Instrument booking calendar","high","LP","doing","feat"],["HX-214","Attach assay protocols","medium","DT","backlog","task"],["HX-208","QA sign-off workflow","high","LP","review","feat"],["HX-203","Sprint report by email","low","DT","done","task"]],mc:[["MC-31","Engagement letter template","medium","EH","backlog","task"],["MC-29","Invoice reminder bug","high","EH","doing","bug"],["MC-27","Client portal comments","medium","BV","review","feat"]]};
var PC={high:0xE5584B,medium:0xE8A93A,low:0x45B97C},S={cur:0,sel:null,d:{},plans:{}},sync=function(){};
function fresh(){var c=S.cur;S={cur:c,sel:null,d:{},plans:{}};W.forEach(function(w){S.d[w.k]=SEED[w.k].map(function(r){return{id:r[0],t:r[1],p:r[2],a:r[3],s:r[4],y:r[5],g:Math.random()*6.28}});S.plans[w.k]=w.plan})}
function save(){try{localStorage.setItem("meridian-orbit-v1",JSON.stringify(S))}catch(e){}}
function load(){try{var s=JSON.parse(localStorage.getItem("meridian-orbit-v1"));if(s&&s.d&&s.plans){S=s;return}}catch(e){}fresh()}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function av(a){var h=(a.charCodeAt(0)*37+a.charCodeAt(1||0)*17)%360;return '<svg class="av" viewBox="0 0 30 30"><circle cx="15" cy="15" r="15" fill="hsl('+h+',45%,38%)"/><circle cx="15" cy="12" r="5" fill="#F3D9C4"/><path d="M5 27c1-6 5-8 10-8s9 2 10 8z" fill="#F3D9C4" opacity=".85"/></svg>'}
function cur(){return S.d[W[S.cur].k]}
function note(h,keep){document.getElementById("msg").innerHTML=h||""}
function ui(){
 var w=W[S.cur],L=cur(),dn=L.filter(function(i){return i.s==="done"}).length,pc=L.length?Math.round(dn/L.length*100):0;
 document.getElementById("sI").textContent=L.length;document.getElementById("sD").textContent=pc+"%";document.getElementById("sP").textContent=S.plans[w.k];
 document.getElementById("tabs").innerHTML=W.map(function(x,i){return '<button type="button" class="tab'+(i===S.cur?' on':'')+'" data-a="ws" data-i="'+i+'">'+LG[i]+esc(x.n)+'</button>'}).join("");
 document.getElementById("leg").innerHTML=ST.map(function(s){return '<span><i style="background:'+s[2]+'"></i>'+s[1]+'</span>'}).join("");
 var it=L.filter(function(i){return i.id===S.sel})[0],el=document.getElementById("sel");
 if(!it){el.innerHTML='<h3>'+esc(w.sp)+'</h3><div class="meta">Select an orb or a list row to open an issue.</div>'}
 else{var ix=ST.map(function(s){return s[0]}).indexOf(it.s);
  el.innerHTML='<div class="meta">'+TY[it.y]+esc(it.id)+' · '+ST[ix][1]+'</div><h3>'+esc(it.t)+'</h3><div class="meta">'+av(it.a)+esc(it.a)+' · '+it.p+' priority</div><div class="btns"><button type="button" class="pri" data-a="adv"'+(ix===3?' disabled':'')+'>Move inward</button><button type="button" data-a="back"'+(ix===0?' disabled':'')+'>Send outward</button><button type="button" data-a="pri">Change priority</button><button type="button" data-a="del">Delete</button></div>'}
 document.getElementById("rings").innerHTML=ST.map(function(s){var r=L.filter(function(i){return i.s===s[0]});return '<h4><span>'+s[1]+'</span><span style="color:var(--mute)">'+r.length+'</span></h4>'+(r.length?r.map(function(i){return '<button type="button" class="row'+(i.id===S.sel?' on':'')+'" data-a="sel" data-id="'+i.id+'">'+av(i.a)+'<span>'+esc(i.id)+' '+esc(i.t)+'</span></button>'}).join(""):'<div class="meta" style="color:var(--mute);font-size:13px">Nothing in this ring</div>')}).join("");
 sync();
}
function mv(d){var it=cur().filter(function(i){return i.id===S.sel})[0];if(!it)return;var ix=ST.map(function(s){return s[0]}).indexOf(it.s)+d;if(ix<0||ix>3)return;it.s=ST[ix][0];save();ui()}
document.addEventListener("click",function(e){
 var b=e.target.closest("[data-a]");if(!b)return;var a=b.getAttribute("data-a"),w=W[S.cur],L=cur();
 if(a==="ws"){S.cur=+b.getAttribute("data-i");S.sel=null;note("");save();ui()}
 else if(a==="sel"){S.sel=b.getAttribute("data-id");save();ui()}
 else if(a==="adv")mv(1);else if(a==="back")mv(-1);
 else if(a==="pri"){var it=L.filter(function(i){return i.id===S.sel})[0];if(it){it.p=it.p==="low"?"medium":it.p==="medium"?"high":"low";save();ui()}}
 else if(a==="del"){S.d[w.k]=L.filter(function(i){return i.id!==S.sel});S.sel=null;save();ui()}
 else if(a==="reset"){fresh();note("");save();ui()}
 else if(a==="up"){S.plans[w.k]="Growth";note("");save();ui()}
 else if(a==="add"){var t=document.getElementById("title"),v=t.value.trim();
  if(!v){note("Enter a title before adding an issue.");return}
  if(L.length>=(S.plans[w.k]==="Starter"?w.lim:99)){note('Starter plan limit of '+w.lim+' issues reached. <button type="button" class="pri" data-a="up">Upgrade to Growth (test mode)</button>');return}
  var id=w.k.toUpperCase()+"-"+(300+Math.floor(Math.random()*600));L.unshift({id:id,t:v,p:document.getElementById("prio").value,a:"ME",s:"backlog",y:document.getElementById("type").value,g:Math.random()*6.28});
  S.sel=id;t.value="";note("");save();ui()}
});
document.getElementById("title").addEventListener("keydown",function(e){if(e.key==="Enter")document.querySelector('[data-a="add"]').click()});
load();ui();
(function(){
 try{
  if(typeof THREE==="undefined")throw 0;
  var box=document.getElementById("gl"),R=new THREE.WebGLRenderer({antialias:true,alpha:true});
  R.setPixelRatio(Math.min(devicePixelRatio,2));box.insertBefore(R.domElement,box.firstChild);
  var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(48,1,.1,120);cam.position.set(0,0,12.5);
  sc.add(new THREE.AmbientLight(0xffffff,.55));var pl=new THREE.PointLight(0xffe3a8,1.6,40);sc.add(pl);var dl=new THREE.DirectionalLight(0xffffff,.5);dl.position.set(5,8,6);sc.add(dl);
  var sp=[];for(var q=0;q<700;q++){var u=Math.random()*6.28,v=Math.acos(2*Math.random()-1),r=25+Math.random()*25;sp.push(r*Math.sin(v)*Math.cos(u),r*Math.cos(v),r*Math.sin(v)*Math.sin(u))}
  var sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.Float32BufferAttribute(sp,3));var stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xcfe0ff,size:.12}));sc.add(stars);
  var root=new THREE.Group();root.rotation.x=.75;sc.add(root);
  var core=new THREE.Mesh(new THREE.SphereGeometry(.85,32,24),new THREE.MeshStandardMaterial({color:0xF2C25B,emissive:0xE89A22,emissiveIntensity:.5}));root.add(core);
  var halo=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,1),new THREE.MeshBasicMaterial({color:0xF2C25B,wireframe:true,transparent:true,opacity:.35}));root.add(halo);
  ST.forEach(function(s){var t=new THREE.Mesh(new THREE.TorusGeometry(s[3],.012,8,120),new THREE.MeshBasicMaterial({color:new THREE.Color(s[2]),transparent:true,opacity:.55}));t.rotation.x=Math.PI/2;root.add(t)});
  var shell=new THREE.Mesh(new THREE.SphereGeometry(5.5,28,18),new THREE.MeshBasicMaterial({color:0x3B7DD8,wireframe:true,transparent:true,opacity:.1}));root.add(shell);
  var og=new THREE.Group();root.add(og),orbs=[],glow=0;
  sync=function(){
   var w=W[S.cur],L=cur();shell.material.color.setHex(w.c);
   while(og.children.length)og.remove(og.children[0]);orbs=[];
   L.forEach(function(i){var ix=ST.map(function(s){return s[0]}).indexOf(i.s),m=new THREE.Mesh(new THREE.SphereGeometry(.24,20,16),new THREE.MeshStandardMaterial({color:PC[i.p],emissive:PC[i.p],emissiveIntensity:.25,metalness:.2,roughness:.4}));
    m.userData={i:i,cr:ST[ix][3]+1.5,tr:ST[ix][3],ix:ix};og.add(m);orbs.push(m)});
   var dn=L.filter(function(i){return i.s==="done"}).length;glow=L.length?dn/L.length:0};
  var ray=new THREE.Raycaster(),mp=new THREE.Vector2(),dn=null;
  function size(){var w=box.clientWidth,h=box.clientHeight;R.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()}size();addEventListener("resize",size);
  var cv=R.domElement;
  cv.addEventListener("pointerdown",function(e){dn={x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,m:false};try{cv.setPointerCapture(e.pointerId)}catch(z){}});
  cv.addEventListener("pointermove",function(e){if(!dn)return;if(Math.abs(e.clientX-dn.x)+Math.abs(e.clientY-dn.y)>5)dn.m=true;if(dn.m){root.rotation.y+=(e.clientX-dn.lx)*.008;root.rotation.x=Math.max(.1,Math.min(1.45,root.rotation.x+(e.clientY-dn.ly)*.006))}dn.lx=e.clientX;dn.ly=e.clientY});
  cv.addEventListener("pointerup",function(e){if(dn&&!dn.m){var r=cv.getBoundingClientRect();mp.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(mp,cam);var h=ray.intersectObjects(orbs);if(h.length){S.sel=h[0].object.userData.i.id;ui()}}dn=null});
  var calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
  (function loop(){var t=Date.now()/1000;
   orbs.forEach(function(m){var d=m.userData,i=d.i,ix=ST.map(function(s){return s[0]}).indexOf(i.s);d.tr=ST[ix][3];d.cr+=(d.tr-d.cr)*.05;if(!calm)i.g+=.012/d.cr;
    m.position.set(Math.cos(i.g)*d.cr,Math.sin(i.g*3+t)*.12,Math.sin(i.g)*d.cr);var on=i.id===S.sel,k=m.scale.x+((on?1.7:1)-m.scale.x)*.15;m.scale.setScalar(k);m.material.emissiveIntensity=on?.9:.25});
   core.material.emissiveIntensity=.4+glow*.9;halo.rotation.y+=calm?0:.004;stars.rotation.y+=calm?0:.0004;if(!dn&&!calm)root.rotation.y+=.0015;
   R.render(sc,cam);requestAnimationFrame(loop)})();
  sync();
 }catch(e){document.getElementById("gl").insertAdjacentHTML("beforeend",'<p style="color:#B8C6DA;padding:20px">The 3D view needs WebGL. Every issue is still available in the list.</p>')}
})();
