/* SKOPSE Atlas 3.4 — GitHub Pages, root-level world.json, no external dependencies. */
(()=>{'use strict';
let world, byId=new Map(), page='anasayfa', selected='nil', tab='genel', slide=0;
const $=id=>document.getElementById(id);
const names={sehir:'Şehir',karakterler:'Karakterler',sirketler:'Şirketler',zaman:'Zaman Çizelgesi',sozluk:'Sözlük',bolumler:'Bölüm Özetleri'};
const esc=x=>String(x??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const norm=s=>String(s??'').toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const imagePath=e=>(e?.image||world.images?.[e?.id]||'').replace(/^assets\//,'');
const image=(e,cls='',loading='lazy')=>{let src=imagePath(e);return src?`<img class="${cls}" src="${esc(src)}" data-fallback="${esc(world.imageFallbacks?.[e?.id]||'')}" loading="${loading}" alt="${esc(e.name)}">`:''};
const link=(pg,id)=>`#${pg}${id?'/'+encodeURIComponent(id):''}`;
const makeButton=(pg,id,body,cls='')=>`<button class="${cls}" type="button" data-page="${pg}" ${id?`data-id="${esc(id)}"`:''}>${body}</button>`;
function routeFor(e){return e.type==='characters'?'karakterler':e.type==='companies'?'sirketler':e.type==='places'?'sehir':'sozluk'}
function nav(pg,id){const url=link(pg,id);if(location.hash!==url)history.pushState(null,'',url);page=pg;selected=id||defaultId(pg);tab='genel';render();window.scrollTo({top:0,behavior:'instant'});$('mainNav').classList.remove('is-open');$('menuToggle').setAttribute('aria-expanded','false')}
function defaultId(pg){return {karakterler:'nil',sehir:'skopse',sirketler:'cennet'}[pg]||''}
function parseHash(){let [p,id]=decodeURIComponent(location.hash.replace(/^#/,'' )).split('/');page=Object.keys(names).includes(p)?p:'anasayfa';selected=byId.has(id==='cennet_merkez'?'paradise':id)?(id==='cennet_merkez'?'paradise':id):defaultId(page);tab='genel';render()}
function sectionHead(title,sub,num){return `<header class="page-head"><div><div class="eyebrow">SKOPSE / DÜNYA ATLASI</div><h1 class="section-title">${esc(title)}</h1><p>${esc(sub)}</p></div>${num!==undefined?`<span class="count">${String(num).padStart(2,'0')} DOSYA</span>`:''}</header>`}
function tile(pg,num,title,desc){return `<a class="home-tile" href="${link(pg)}"><span class="tile-n">${num} / 06</span><div class="circle"></div><h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="arr">↗</span></a>`}
function home(){
  const old=homeOld();
  const start=old.indexOf('<aside class="home-preview">');
  const end=old.indexOf('</aside>',start);
  if(start<0||end<0)return old;
  const ids=(world.vitrine||[]).filter(id=>byId.get(id)?.type==='places');
  if(!ids.length)return old;
  slide=((slide%ids.length)+ids.length)%ids.length;
  const p=byId.get(ids[slide]);
  const place=`<aside class="home-preview" aria-label="Skopse mekan vitrini"><div class="hero-place">
    <div class="hero-place-top"><span class="eyebrow">MEKAN VİTRİNİ</span><span class="carousel-count" id="vitrinCount">${String(slide+1).padStart(2,'0')} / ${String(ids.length).padStart(2,'0')}</span></div>
    <div class="hero-place-art" id="vitrinArt" aria-live="off"><img class="vitrin-layer is-visible" src="${esc(imagePath(p))}" alt="${esc(p.name)}" loading="eager"><img class="vitrin-layer" src="" alt="" aria-hidden="true"></div>
    <div class="hero-place-caption"><h2 id="vitrinName">${esc(p.name)}</h2><p id="vitrinSummary">${esc(p.summary)}</p><div class="hero-place-actions"><span class="vitrin-auto-indicator">OTOMATİK GÖSTERİM</span><button class="ghost-btn place-visit" type="button" data-page="sehir" data-id="${esc(p.id)}" id="vitrinVisit">MEKANI İNCELE →</button></div></div>
  </div></aside>`;
  return old.slice(0,start)+place+old.slice(end+'</aside>'.length);
}
let slideLoading=false;
function advanceShowcase(){
  if(page!=='anasayfa'||slideLoading||document.hidden)return;
  const art=$('vitrinArt');if(!art)return;
  const ids=(world.vitrine||[]).filter(id=>byId.get(id)?.type==='places');if(ids.length<2)return;
  const index=(slide+1)%ids.length, place=byId.get(ids[index]);
  const target=art.querySelector('img:not(.is-visible)'),current=art.querySelector('img.is-visible');
  if(!target||!current||!place)return;
  slideLoading=true;
  const loader=new Image();
  loader.onload=()=>{
    if(!art.isConnected){slideLoading=false;return;}
    target.src=loader.src;
    target.alt=place.name;
    target.setAttribute('aria-hidden','false');
    current.setAttribute('aria-hidden','true');
    $('vitrinCount').textContent=`${String(index+1).padStart(2,'0')} / ${String(ids.length).padStart(2,'0')}`;
    $('vitrinName').textContent=place.name;
    $('vitrinSummary').textContent=place.summary;
    $('vitrinVisit').dataset.id=place.id;
    current.classList.remove('is-visible');
    target.classList.add('is-visible');
    slide=index;
    slideLoading=false;
  };
  loader.onerror=()=>{slideLoading=false;};
  loader.src=imagePath(place);
}
function rail(ents,heading){return `<aside class="explorer-rail"><h2>${esc(heading)} / ${String(ents.length).padStart(2,'0')}</h2><div class="record-list">${ents.map(e=>makeButton(routeFor(e),e.id,`<span class="rail-thumb">${image(e)}${!imagePath(e)?esc(e.name.slice(0,1)):''}</span><span>${esc(e.name)}<small>${esc(e.shortLabel||e.tagline||'')}</small></span>`,`record-link ${selected===e.id?'active':''}`)).join('')}</div></aside>`}
function meta(e){return Object.entries(e.meta||{}).map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
function related(e){const items=(e.related||[]).map(id=>byId.get(id)).filter(Boolean).slice(0,8);return items.length?`<div class="related-row">${items.map(v=>makeButton(routeFor(v),v.id,esc(v.name))).join('')}</div>`:''}
const tabs=[['genel','Genel Bilgi'],['gecmis','Geçmiş'],['iliskiler','İlişkiler'],['yetenekler','Yetenekler'],['notlar','Ek Notlar']];
function characterContent(e){let section=(e.sections||{})[tab]||e.summary;return `<div class="portrait-layout"><div class="media-panel">${image(e,'','eager')}${!imagePath(e)?'<span class="portrait-pending">PORTRE HENÜZ SEÇİLMEDİ</span>':''}<span class="media-tag">KARAKTER DOSYASI · ${esc(e.name).toLocaleUpperCase('tr')}</span></div><div class="details-panel"><div class="eyebrow">${esc(e.tagline)}</div><h2>${esc(e.name)}</h2><p class="summary">${esc(e.summary)}</p><dl class="detail-meta">${meta(e)}</dl><div role="tablist" class="detail-tabs" aria-label="Karakter bilgileri">${tabs.map(([k,v])=>`<button type="button" role="tab" aria-selected="${tab===k}" data-tab="${k}" class="${tab===k?'active':''}">${v.toLocaleUpperCase('tr')}</button>`).join('')}</div><div class="detail-body" role="tabpanel"><p>${esc(section)}</p></div>${related(e)}</div></div>`}
function cityContent(e){
  const cityTabs=[['genel','Genel Bilgi'],['gecmis','Geçmiş'],['iliskiler','Bağlantılar'],['yetenekler','Özellikler'],['notlar','Ek Notlar']].filter(([k])=>e.sections?.[k]);
  const active=cityTabs.some(([k])=>k===tab)?tab:'genel';
  const section=e.sections?.[active]||e.summary;
  return `<div class="place-layout"><div class="media-panel">${image(e,'','eager')}<span class="media-tag">MEKAN DOSYASI · ${esc(e.name).toLocaleUpperCase('tr')}</span></div><div class="details-panel"><div class="eyebrow">${esc(e.tagline)}</div><h2>${esc(e.name)}</h2><p class="summary">${esc(e.summary)}</p><dl class="detail-meta">${meta(e)}</dl><div role="tablist" class="detail-tabs" aria-label="Mekan bilgileri">${cityTabs.map(([k,v])=>`<button type="button" role="tab" aria-selected="${active===k}" data-tab="${k}" class="${active===k?'active':''}">${v.toLocaleUpperCase('tr')}</button>`).join('')}</div><div class="detail-body" role="tabpanel"><p>${esc(section)}</p></div>${related(e)}</div></div>`;
}
function explorer(type){const ents=world.entities.filter(e=>e.type===type), isCh=type==='characters', e=byId.get(selected)?.type===type?byId.get(selected):ents[0];if(e)selected=e.id;return `<div class="atlas-page">${sectionHead(isCh?'Karakterler':'Şehir',isCh?'Skopse hikayesinin karakter dosyaları.':'Skopse’nin semtleri, kurumları ve yaşayan mekanları.',ents.length)}<div class="explorer">${rail(ents,isCh?'KARAKTERLER':'ŞEHİR / MEKANLAR')}<div class="record-feature">${isCh?characterContent(e):cityContent(e)}</div></div></div>`}
function companies(){const c=world.entities.filter(e=>e.type==='companies');return `<div class="atlas-page">${sectionHead('Şirketler','Abonelik, üretim, kredi ve altyapı üzerinden kurulan ekonomik ilişkiler.',c.length)}<div class="company-layout">${c.map(e=>`<article id="atlas-company-${esc(e.id)}" class="company-card" ${e.id==='cennet'?'data-primary="true"':''}><span class="company-seal" aria-hidden="true">${esc(e.id==='payda'?'🐼':e.name[0])}</span><div><div class="eyebrow">${esc(e.tagline)}</div><h3>${esc(e.name)}</h3><p>${esc(e.summary)}</p><p class="tiny">${esc(e.status||'Dünya notu')}</p></div></article>`).join('')}</div></div>`}
function timeline(){return `<div class="atlas-page">${sectionHead('Zaman Çizelgesi','Kronoloji kesinleşen kararlar ve henüz planlanan aşamalarla birlikte tutulur.',world.timeline.length)}<div class="timeline">${world.timeline.map((e,i)=>`<article class="timeline-row" id="atlas-timeline-${i}"><div class="timeline-date">${esc(e.when)}</div><div><h3>${esc(e.title)}</h3><p>${esc(e.body)}</p></div></article>`).join('')}</div></div>`}
function glossary(){const records=[...(world.glossary||[])];return `<div class="atlas-page">${sectionHead('Sözlük','SKOPSE’de kullanılan teknoloji, ekonomi ve sokak dili terimleri.',records.length)}<div class="glossary">${records.map(v=>`<article class="gloss-entry" id="atlas-term-${esc(v.term)}"><h3>${esc(v.term)}</h3><p>${esc(v.meaning)}</p></article>`).join('')}</div></div>`}
function chapters(){const records=world.chapters||[];return `<div class="atlas-page">${sectionHead('Bölüm Özetleri','Bölüm başlıkları ve olay planları çalışma notudur; tamamlanmış metin yerine geçmez.',records.length)}<div class="chapters">${records.map(c=>`<article class="chapter" id="atlas-chapter-${esc(c.number)}"><div class="chapter-top"><span class="chapter-no">${esc(c.number)}</span><div><span class="status">${esc(c.status)}</span><h3>${esc(c.title)}</h3></div></div><p>${esc(c.summary)}</p>${c.points?.length?`<ul>${c.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>`:''}</article>`).join('')}</div></div>`}
function render(){document.title=`${page==='anasayfa'?'Dünya Atlası':names[page]} — SKOPSE`;$('content').innerHTML=page==='anasayfa'?home():page==='sehir'?explorer('places'):page==='karakterler'?explorer('characters'):page==='sirketler'?companies():page==='zaman'?timeline():page==='sozluk'?glossary():chapters();document.querySelectorAll('.primary-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page))}
function openSearch(){
  const panel=$('headerSearch');if(!panel)return;
  panel.hidden=false;
  $('searchToggle').setAttribute('aria-expanded','true');
  $('searchInput').focus();search();
}
function closeSearch(){
  const panel=$('headerSearch');if(!panel)return;
  panel.hidden=true;
  $('searchToggle').setAttribute('aria-expanded','false');
}
function search(){
  const raw=$('searchInput').value.trim(), term=norm(raw);
  const container=$('searchResults');
  if(!term){container.innerHTML='<p class="search-hint">Karakter, mekan, şirket, kavram, olay veya bölüm arayın.</p>';return;}
  const entries=[
    ...world.entities.filter(e=>['characters','places','companies'].includes(e.type)).map(e=>({
      pg:routeFor(e),id:e.type==='companies'?'':e.id,target:e.type==='companies'?'atlas-company-'+e.id:'',
      name:e.name,group:names[routeFor(e)],description:e.summary,
      content:[e.name,e.shortLabel,e.tagline,e.summary,...Object.values(e.meta||{}),...Object.values(e.sections||{})].join(' ')
    })),
    ...(world.glossary||[]).map(e=>({pg:'sozluk',target:'atlas-term-'+e.term,name:e.term,group:'Sözlük',description:e.meaning,content:e.term+' '+e.meaning})),
    ...(world.timeline||[]).map((e,i)=>({pg:'zaman',target:'atlas-timeline-'+i,name:e.title,group:'Zaman Çizelgesi',description:e.when+' · '+e.body,content:e.when+' '+e.title+' '+e.body})),
    ...(world.chapters||[]).map(e=>({pg:'bolumler',target:'atlas-chapter-'+e.number,name:e.number+' — '+e.title,group:'Bölüm Özetleri',description:e.summary,content:e.number+' '+e.title+' '+e.summary+' '+(e.points||[]).join(' ')}))
  ];
  const tokens=term.split(/\s+/).filter(Boolean);
  const results=entries.map(e=>({...e,normalizedName:norm(e.name),normalizedContent:norm(e.content)}))
    .filter(e=>tokens.every(t=>e.normalizedContent.includes(t)))
    .sort((a,b)=>{
      const score=e=>e.normalizedName===term?0:e.normalizedName.startsWith(term)?1:e.normalizedName.includes(term)?2:3;
      return score(a)-score(b)||a.name.localeCompare(b.name,'tr');
    }).slice(0,12);
  container.innerHTML=results.length?results.map(e=>`<button type="button" class="result-btn" data-page="${e.pg}" ${e.id?`data-id="${esc(e.id)}"`:''} ${e.target?`data-search-target="${esc(e.target)}"`:''}><span>${esc(e.group)}</span><strong>${esc(e.name)}</strong><small>${esc(e.description)}</small></button>`).join(''):'<p class="search-hint">Bu aramayla eşleşen kayıt bulunamadı.</p>';
}
function bindings(){
  document.body.addEventListener('error',ev=>{
    const pic=ev.target;if(pic?.tagName==='IMG'&&pic.dataset.fallback&&!pic.dataset.fallbackDone){pic.dataset.fallbackDone='1';pic.src=pic.dataset.fallback;}
  },true);
  document.body.addEventListener('click',ev=>{
    const b=ev.target.closest('button[data-tab]');if(b){tab=b.dataset.tab;render();return;}
    const p=ev.target.closest('button[data-page]');
    if(p){
      const scrollTarget=p.dataset.searchTarget;
      nav(p.dataset.page,p.dataset.id);
      closeSearch();
      if(scrollTarget)requestAnimationFrame(()=>{
        const el=document.getElementById(scrollTarget);if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('search-hit');setTimeout(()=>el.classList.remove('search-hit'),1900);}
      });
      return;
    }
    if(!$('headerSearch').hidden&&!ev.target.closest('#headerSearch,#searchToggle'))closeSearch();
  });
  $('menuToggle').addEventListener('click',()=>{let opened=$('mainNav').classList.toggle('is-open');$('menuToggle').setAttribute('aria-expanded',String(opened));});
  $('searchToggle').addEventListener('click',()=>{$('headerSearch').hidden?openSearch():closeSearch();});
  $('searchClose').addEventListener('click',closeSearch);
  $('searchInput').addEventListener('input',search);
  $('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter'){const first=$('searchResults').querySelector('button[data-page]');if(first){e.preventDefault();first.click();}}});
  window.addEventListener('hashchange',parseHash);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!$('headerSearch').hidden){e.preventDefault();closeSearch();$('searchToggle').focus();}
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();openSearch();}
  });
}
async function init(){try{let res=await fetch('world.json',{cache:'no-cache'});if(!res.ok)throw Error('world.json: '+res.status);world=await res.json();if(!Array.isArray(world.entities)||!Array.isArray(world.chapters))throw Error('Atlas veri yapısı eksik');byId=new Map(world.entities.map(e=>[e.id,e]));bindings();parseHash();window.setInterval(()=>{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)advanceShowcase();},6500)}catch(e){$('content').innerHTML=`<div class="load-error"><h1>Atlas verileri açılamadı.</h1><p>world.json dosyası, index.html ile aynı dizinde bulunmalı.</p><code>${esc(e.message)}</code></div>`}}
init();
})();