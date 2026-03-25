// ════════════════════════════════════════════
//  CURSOR
// ════════════════════════════════════════════
const cd=document.getElementById('cur-dot'),cr=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function tick(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cd.style.left=mx+'px';cd.style.top=my+'px';cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(tick)})();
function addHover(sel){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'))})}
addHover('a,button,.wcard,.svc,.ft,.stag,.csg,.pcard,.proc-step,.tcard,.co-link');
document.addEventListener('mousedown',()=>document.body.classList.add('clk'));
document.addEventListener('mouseup',()=>document.body.classList.remove('clk'));

// ════════════════════════════════════════════
//  PRELOADER
// ════════════════════════════════════════════
document.body.style.overflow='hidden';
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('pl').classList.add('out');document.body.style.overflow=''},2600)});

// ════════════════════════════════════════════
//  SCROLL EFFECTS
// ════════════════════════════════════════════
window.addEventListener('scroll',()=>{
  const t=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('sp').style.width=(window.scrollY/t*100)+'%';
  document.getElementById('nav').classList.toggle('sc',window.scrollY>40);
  document.getElementById('btt').classList.toggle('show',window.scrollY>400);
});

// ════════════════════════════════════════════
//  DARK MODE
// ════════════════════════════════════════════
const html=document.documentElement;
const dmBtn=document.getElementById('dm-toggle');
let dark=localStorage.getItem('pk-dark')==='1';
function applyDark(d){
  html.setAttribute('data-theme',d?'dark':'light');
  dmBtn.classList.toggle('on',d);
  dark=d;
  localStorage.setItem('pk-dark',d?'1':'0');
}
applyDark(dark);
function togDark(){applyDark(!dark)}

// ════════════════════════════════════════════
//  REVEAL
// ════════════════════════════════════════════
const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('vis');ro.unobserve(x.target)}})},{threshold:.07,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

// ════════════════════════════════════════════
//  MOBILE NAV
// ════════════════════════════════════════════
function toggleMob(){
  const btn=document.getElementById('mob-btn'),nav=document.getElementById('mob-nav');
  btn.classList.toggle('open');nav.classList.toggle('open');
  document.body.style.overflow=nav.classList.contains('open')?'hidden':'';
}
function closeMob(){
  document.getElementById('mob-btn').classList.remove('open');
  document.getElementById('mob-nav').classList.remove('open');
  document.body.style.overflow='';
}

// ════════════════════════════════════════════
//  FILTER TABS
// ════════════════════════════════════════════
document.querySelectorAll('.ft').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.ft').forEach(t=>t.classList.remove('act'));
    tab.classList.add('act');
    const f=tab.dataset.f;
    document.querySelectorAll('.wcard').forEach(c=>{
      const cats=c.dataset.cat||'';
      const show=f==='all'||cats.includes(f);
      c.style.transition='opacity .35s,transform .35s';
      c.style.opacity=show?'1':'0.15';
      c.style.transform=show?'':'scale(.97)';
    });
  });
});

// ════════════════════════════════════════════
//  LIGHTBOX
// ════════════════════════════════════════════
function openLB(p){
  document.getElementById('lb-img-wrap').innerHTML=p.img
    ?`<img src="${p.img}" alt="${p.title}"/>`
    :`<div class="lb-placeholder">📸 &nbsp; ${p.title}</div>`;
  document.getElementById('lb-tags').innerHTML=(p.tags||[]).map(t=>`<span class="wtg${t==='Featured'?' lm':''}">${t}</span>`).join('');
  document.getElementById('lb-title').textContent=p.title;
  document.getElementById('lb-desc').textContent=p.desc;
  document.getElementById('lb-meta').innerHTML=`
    <div class="lb-meta-item"><label>Stack</label><span>${p.stack||'—'}</span></div>
    <div class="lb-meta-item"><label>Year</label><span>${p.year||'—'}</span></div>
    <div class="lb-meta-item"><label>Category</label><span>${(p.tags||['—'])[p.tags&&p.tags[0]==='Featured'?1:0]||'—'}</span></div>`;
  document.getElementById('lb-actions').innerHTML=p.url
    ?`<a href="${p.url}" target="_blank" class="btn-p" style="font-size:14px;padding:12px 24px">View Live <span class="arr">↗</span></a>`
    :`<span style="font-size:13px;color:var(--txt-3);font-family:'Space Mono',monospace;letter-spacing:1px">LAUNCHING SOON</span>`;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLB(){
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLB();togAdminClose()}});

// ════════════════════════════════════════════
//  ADMIN PANEL + PROJECT UPLOAD
// ════════════════════════════════════════════
let adminOpen=false;
function togAdmin(){adminOpen=!adminOpen;document.getElementById('admin-panel').classList.toggle('open',adminOpen)}
function togAdminClose(){adminOpen=false;document.getElementById('admin-panel').classList.remove('open')}

let uploadedImgData='';
function previewImg(input){
  const file=input.files[0];
  if(!file)return;
  if(file.size>5*1024*1024){alert('Image too large. Max 5MB.');return}
  const reader=new FileReader();
  reader.onload=e=>{
    uploadedImgData=e.target.result;
    const prev=document.getElementById('ap-preview');
    prev.src=uploadedImgData;
    prev.style.display='block';
  };
  reader.readAsDataURL(file);
}

function saveProject(){
  const name=document.getElementById('ap-name').value.trim();
  const desc=document.getElementById('ap-desc').value.trim();
  const cat=document.getElementById('ap-cat').value;
  const stack=document.getElementById('ap-stack').value.trim();
  const url=document.getElementById('ap-url').value.trim();
  const year=document.getElementById('ap-year').value.trim();
  if(!name){alert('Please add a project title.');return}
  const project={id:Date.now(),name,desc,cat,stack,url,year,img:uploadedImgData};
  const existing=JSON.parse(localStorage.getItem('pk-projects')||'[]');
  existing.push(project);
  localStorage.setItem('pk-projects',JSON.stringify(existing));
  renderCustomProjects();
  document.getElementById('ap-success').style.display='block';
  setTimeout(()=>document.getElementById('ap-success').style.display='none',3000);
  // Reset
  ['ap-name','ap-desc','ap-stack','ap-url','ap-year'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('ap-preview').style.display='none';
  uploadedImgData='';
}

function clearProjects(){
  if(!confirm('Remove all custom projects?'))return;
  localStorage.removeItem('pk-projects');
  renderCustomProjects();
}

function renderCustomProjects(){
  const projects=JSON.parse(localStorage.getItem('pk-projects')||'[]');
  document.querySelectorAll('.wcard.custom').forEach(el=>el.remove());
  const grid=document.getElementById('work-grid');
  const base=7;
  projects.forEach((p,i)=>{
    const div=document.createElement('div');
    div.className='wcard custom';
    div.dataset.cat=p.cat;
    div.style.gridColumn='span '+(i%3===0?5:7);
    const tags=p.stack?p.stack.split(',').slice(0,3):[p.cat];
    div.onclick=()=>openLB({title:p.name,desc:p.desc,tags:[p.cat,...tags],img:p.img,stack:p.stack,year:p.year,url:p.url});
    div.innerHTML=`
      <div class="wth">
        ${p.img
          ?`<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.25,.46,.45,.94)">`
          :`<div class="pth lt"><div class="pdots"></div><div class="pan"></div><div class="ptx">Your Project</div></div>`}
      </div>
      <div class="wci">
        <div class="wctg">${tags.map(t=>`<span class="wtg">${t.trim()}</span>`).join('')}</div>
        <div class="wct">${p.name}</div>
        <div class="wcd">${p.desc.slice(0,90)}${p.desc.length>90?'…':''}</div>
      </div>
      <div class="wca"><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="var(--bg-1)"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg></div>`;
    grid.appendChild(div);
    addHover('.wcard.custom');
  });
  const total=base+projects.length;
  document.getElementById('proj-count').textContent=`( ${total} Project${total!==1?'s':''} )`;
}
renderCustomProjects();

// ════════════════════════════════════════════
//  TESTIMONIALS SLIDER
// ════════════════════════════════════════════
let tIdx=0;const totalT=4;
function slide(dir){
  tIdx=(tIdx+dir+totalT)%totalT;
  const tc=document.getElementById('tc');
  const w=window.innerWidth<=900?tc.parentElement.offsetWidth:(tc.parentElement.offsetWidth/2+12);
  tc.style.transform=`translateX(-${tIdx*w}px)`;
  document.querySelectorAll('.tc-dot').forEach((d,i)=>d.classList.toggle('act',i===tIdx));
}
setInterval(()=>slide(1),5000);

// ════════════════════════════════════════════
//  CONTACT FORM
// ════════════════════════════════════════════
function hForm(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.innerHTML='Sending… ⏳';btn.disabled=true;
  setTimeout(()=>{document.getElementById('fsuc').style.display='block';btn.style.display='none';e.target.reset()},1300);
}

// ════════════════════════════════════════════
//  AI CHATBOT
// ════════════════════════════════════════════
let chatOpen=false;
const CTX=`You are the AI assistant for Perkins Creative — Francis Annor's web design agency in Accra, Ghana. Be professional, warm, and concise. Replies under 130 words. No markdown. Speak naturally.

ABOUT FRANCIS:
- Full name: Francis Annor | Location: Accra, Ghana
- Phone/WhatsApp: +233 538 713 916 | Email: annorfrancis23@outlook.com
- LinkedIn: linkedin.com/in/francis-annor-649a0a26a | GitHub: github.com/AnnorFrancis
- 8+ years experience | Managed 5,000+ client records | 85% first-contact resolution | 4.7/5 satisfaction

SKILLS: React.js, JavaScript ES6+, HTML5, CSS3, Node.js, Express.js, Python, MongoDB, REST APIs, Git, Docker, Salesforce, Zendesk, Freshdesk, Google Workspace, SEO

ROLES: Project Manager – Perkins Consultancy (2025–26) | Frontend Developer – WaveCore Technologies (2024–25) | Customer Service/MIS Admin – NHIA Ghana (2023–24)

EDUCATION: BA Philosophy & Political Science, University of Ghana, 2024 | Full Stack Bootcamp, Udemy, 2023

PRICING (GHS):
Starter: GHS 2,000–3,500 (5 pages, mobile responsive, basic SEO, 1 month support)
Business: GHS 5,000–8,000 (12 pages, custom UI/UX, CMS, full SEO, 3 months support) — most popular
Premium: GHS 10,000–15,000 (unlimited pages, e-commerce, web app, 6 months support)
SEO only: GHS 800–2,500 | Landing page: GHS 1,500–4,000 | CRM setup: GHS 1,200–3,500 | Monthly maintenance: GHS 500–1,200/month

Timeline: Starter 1–2 weeks | Business 3–4 weeks | Premium 6–10 weeks

Direct to: WhatsApp +233 538 713 916 or annorfrancis23@outlook.com for a custom quote.`;

function togChat(){chatOpen=!chatOpen;document.getElementById('cpanel').classList.toggle('open',chatOpen);if(chatOpen)document.getElementById('cinput').focus()}
function gTime(){return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
function addMsg(txt,role){const c=document.getElementById('cms');const d=document.createElement('div');d.className='msg '+role;d.innerHTML=`<div class="mb">${txt}</div><div class="mt">${gTime()}</div>`;c.appendChild(d);c.scrollTop=c.scrollHeight}
function showTyp(){const c=document.getElementById('cms');const d=document.createElement('div');d.className='msg ai';d.id='typ';d.innerHTML='<div class="mb"><div class="typ"><span></span><span></span><span></span></div></div>';c.appendChild(d);c.scrollTop=c.scrollHeight}
function rmTyp(){const t=document.getElementById('typ');if(t)t.remove()}
let hist=[];
async function sMsg(){
  const inp=document.getElementById('cinput');
  const txt=inp.value.trim();if(!txt)return;
  inp.value='';inp.style.height='auto';
  document.getElementById('csend').disabled=true;
  addMsg(txt,'me');hist.push({role:'user',content:txt});showTyp();
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,system:CTX,messages:hist})});
    const data=await r.json();
    const reply=data.content?.[0]?.text||"I'm having a connection issue. Please contact Francis at +233 538 713 916";
    rmTyp();addMsg(reply,'ai');hist.push({role:'assistant',content:reply});
    if(hist.length>20)hist=hist.slice(-20);
  }catch(e){rmTyp();addMsg("Connection issue. Reach Francis at +233 538 713 916 or annorfrancis23@outlook.com",'ai')}
  document.getElementById('csend').disabled=false;
}
// ════════════════════════════════════════════
//  PHASE 4 — STAT COUNTERS
// ════════════════════════════════════════════
function animateCounter(el){
  const target=parseInt(el.dataset.target);
  const suffix=el.dataset.suffix||'';
  const isDecimal=el.dataset.decimal==='true';
  const duration=1800;
  const start=performance.now();
  function step(now){
    const elapsed=now-start;
    const progress=Math.min(elapsed/duration,1);
    // Ease out cubic
    const ease=1-Math.pow(1-progress,3);
    let val=target*ease;
    let display;
    if(isDecimal){
      display=(val/10).toFixed(1);
    } else if(target>=1000){
      display=val>=1000?Math.round(val/1000)+'K':Math.round(val)+'';
    } else {
      display=Math.round(val)+'';
    }
    el.innerHTML=display+'<span class="u">'+suffix+'</span>';
    if(progress<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Trigger counters when hero stats scroll into view
const statObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.hsn[data-target]').forEach(animateCounter);
      statObserver.unobserve(e.target);
    }
  });
},{threshold:.5});
const statsRow=document.querySelector('.hst');
if(statsRow)statObserver.observe(statsRow);

// ════════════════════════════════════════════
//  PHASE 4 — BOOK FAB SHOW/HIDE
// ════════════════════════════════════════════
const fab=document.getElementById('book-fab');
window.addEventListener('scroll',()=>{
  const showAt=window.innerHeight*0.8;
  fab.classList.toggle('show',window.scrollY>showAt);
  // Hide when chat is open
  if(chatOpen)fab.classList.remove('show');
});

// ════════════════════════════════════════════
//  PHASE 4 — MAGNETIC BUTTONS
// ════════════════════════════════════════════
document.querySelectorAll('.btn-p, .book-btn-dark, .ncta').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)*0.18;
    const dy=(e.clientY-r.top-r.height/2)*0.18;
    btn.style.transform=`translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave',()=>{
    btn.style.transform='';
  });
});

// ════════════════════════════════════════════
//  PHASE 4 — SMOOTH ANCHOR TRANSITIONS
// ════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id==='#')return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    closeMob();
    setTimeout(()=>{
      target.scrollIntoView({behavior:'smooth',block:'start'});
    },50);
  });
});

// ════════════════════════════════════════════
//  PHASE 4 — TOOL PILL HOVER REGISTRATION
// ════════════════════════════════════════════
addHover('.tool-pill,.book-btn-dark,.book-btn-outline,.fsoc,.footer-col a');

// ════════════════════════════════════════════
//  PHASE 4 — PARALLAX ON HERO SHAPE
// ════════════════════════════════════════════
const heroShape=document.querySelector('.hbs');
const heroGrd=document.querySelector('.hgrd');
window.addEventListener('scroll',()=>{
  const sy=window.scrollY;
  if(heroShape)heroShape.style.transform=`translateY(${sy*0.12}px) rotate(${sy*0.02}deg)`;
  if(heroGrd)heroGrd.style.transform=`translateY(${sy*0.08}px)`;
},{passive:true});

// ════════════════════════════════════════════
//  PHASE 4 — SECTION ACTIVE NAV HIGHLIGHT
// ════════════════════════════════════════════
const sections=['work','about','process','pricing','testi','contact'];
const navLinks=document.querySelectorAll('.nls a');
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.id;
      navLinks.forEach(l=>{
        const href=l.getAttribute('href');
        l.style.color=href==='#'+id?'var(--txt-1)':'';
      });
    }
  });
},{threshold:.3});
sections.forEach(id=>{const el=document.getElementById(id);if(el)sectionObserver.observe(el);});

// ════════════════════════════════════════════
//  PHASE 4 — FAB HIDE WHEN CHAT OPENS
// ════════════════════════════════════════════
const _origTogChat=togChat;
window.togChat=function(){
  _origTogChat();
  document.getElementById('book-fab').classList.toggle('show',!chatOpen&&window.scrollY>window.innerHeight*0.8);
};