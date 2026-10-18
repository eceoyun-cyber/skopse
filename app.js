/* SKOPSE Dünya Atlası — saf JavaScript. İçeriği düzenlemek için data/world.json dosyasını değiştirin. */
(() => {
  'use strict';
  let world;
  let byId = new Map();
  let state = {view:'characters',selected:'nil',subtab:'genel',search:''};
  const $ = id => document.getElementById(id);
  const TABS = [['genel','Genel Bilgi'],['gecmis','Geçmiş'],['iliskiler','İlişkiler'],['yetenekler','Yetenekler'],['notlar','Ek Notlar']];
  const NAV = [['city','ŞEHİR'],['characters','KARAKTERLER'],['places','BÖLGELER'],['factions','TOPLULUKLAR'],['companies','ŞİRKETLER'],['timeline','ZAMAN ÇİZELGESİ'],['notes','NOTLAR']];
  const typeNames={characters:'Karakterler',places:'Bölgeler',factions:'Topluluklar',companies:'Şirketler',concepts:'Dosyalar'};
  const escapeHtml = (value) => String(value??'').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const escAttr=escapeHtml;
  const initials=name=>String(name||'SK').replace(/[🐼]/gu,'').split(/\s+/).filter(Boolean).slice(0,2).map(s=>s.charAt(0)).join('').toUpperCase();
  const strip = s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('tr');
  const imgSource = ent => ent.image || world.images?.[ent.id] || '';
  const urlFor=(ent)=>`#${ent.type==='places' && ent.id==='skopse'?'city':ent.type}/${encodeURIComponent(ent.id)}`;
  function image(ent, className='', aria='') {
    const path=imgSource(ent);
    return path ? `<img class="${escAttr(className)}" src="${escAttr(path)}" alt="${escAttr(aria||ent.name)}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('image-unavailable')">` : '';
  }
  function getViewItems(){
    if (state.view==='city') return world.entities.filter(x=>['skopse','eski_sehir','yeni_sehir','tunek','sifon','batak','diadolas','paradise'].includes(x.id));
    if (state.view==='timeline')return [];
    if (state.view==='notes')return world.entities.filter(x=>x.type==='concepts');
    return world.entities.filter(x=>x.type===state.view);
  }
  function navLabel(view) {return NAV.find(i=>i[0]===view)?.[1]||'DOSYALAR'}
  function start(){
    $('version').textContent=world.version;
    byId=new Map(world.entities.map(e=>[e.id,e]));
    $('brandButton').addEventListener('click',()=>navigate('city','skopse'));
    $('topNav').addEventListener('click',e=>{let b=e.target.closest('[data-view]');if(b) navigate(b.dataset.view)});
    $('railList').addEventListener('click',e=>{let b=e.target.closest('[data-id]');if(b) navigate(b.dataset.view||state.view,b.dataset.id)});
    $('mainContent').addEventListener('click',e=>{
      let b=e.target.closest('[data-open]');if(b){const id=b.dataset.open;const ent=byId.get(id);if(ent) navigate(ent.type,id);return}
      let t=e.target.closest('[data-tab]');if(t){state.subtab=t.dataset.tab;renderFeature();return}
      let v=e.target.closest('[data-switch]');if(v){navigate(v.dataset.switch);return}
    });
    $('menuToggle').addEventListener('click',()=>toggleMenu());
    $('searchInput').addEventListener('input',e=>{state.search=e.target.value;openSearch();renderSearch()});
    $('searchInput').addEventListener('focus',()=>{if(state.search)openSearch();renderSearch()});
    $('searchDialog').addEventListener('click',e=>{
      if(e.target===$('searchDialog'))closeSearch();
      const b=e.target.closest('[data-find]');if(b){let ent=byId.get(b.dataset.find);if(ent){closeSearch();state.search='';$('searchInput').value='';navigate(ent.type,ent.id)}}
    });
    $('closeSearch').addEventListener('click',closeSearch);
    document.addEventListener('keydown',e=>{
      const tag=document.activeElement?.tagName||'';
      if(e.key==='/' && tag!=='INPUT' && tag!=='TEXTAREA'){e.preventDefault();$('searchInput').focus();openSearch();renderSearch()}
      if(e.key==='Escape'){$('sidebar').classList.remove('is-open');$('menuToggle').setAttribute('aria-expanded','false');closeSearch()}
    });
    window.addEventListener('hashchange',readHash);
    readHash();
  }
  function toggleMenu(){const a=$('sidebar').classList.toggle('is-open');$('menuToggle').setAttribute('aria-expanded',String(a));}
  function openSearch(){const d=$('searchDialog');if(!d.open){try{d.show()}catch(e){}}}
  function closeSearch(){const d=$('searchDialog');if(d.open)d.close()}
  function renderSearch(){
    const q=strip(state.search.trim());
    const es=world.entities.filter(x=>!q||strip([x.name,x.tagline,x.summary,...Object.values(x.meta||{})].join(' ')).includes(q)).slice(0,12);
    $('searchResults').innerHTML=es.length?es.map(ent=>`<button class="search-result" data-find="${escAttr(ent.id)}"><span class="rail-avatar">${image(ent)}${!imgSource(ent)?escapeHtml(initials(ent.name)):''}</span><span><span class="search-result-label">${escapeHtml(ent.name)}</span><span class="search-result-small">${escapeHtml(ent.tagline)}</span></span></button>`).join(''):`<div class="empty-state"><strong>Sonuç bulunamadı</strong>Başka bir kelime dene.</div>`;
  }
  function readHash(){
    const fragment=decodeURIComponent(location.hash.replace(/^#/,''));
    const [view,id]=fragment.split('/');
    const valid=NAV.some(item=>item[0]===view);
    if(valid){state.view=view;state.selected=byId.has(id)?id:defaultId(view)}
    else {state.view='characters';state.selected='nil'}
    state.subtab='genel';render();
  }
  function defaultId(v){return ({city:'skopse',characters:'nil',places:'eski_sehir',factions:'gezginler',companies:'cennet',notes:'abonelik'})[v]||null}
  function navigate(view,id){
    state.view=view;state.selected=id||defaultId(view);state.subtab='genel';
    const hash=view+(state.selected?'/'+encodeURIComponent(state.selected):'');
    if(location.hash.slice(1)!==hash)history.pushState(null,'','#'+hash);
    $('sidebar').classList.remove('is-open');$('menuToggle').setAttribute('aria-expanded','false');
    render();document.querySelector('.main-stage').scrollTo?.({top:0,behavior:'instant'});window.scrollTo(0,0);
  }
  function render(){renderNav();renderRail();renderFeature()}
  function renderNav(){
    $('topNav').innerHTML=NAV.map(([id,label])=>`<button class="nav-link" data-view="${id}" ${state.view===id?'aria-current="page"':''}>${escapeHtml(label)}</button>`).join('');
  }
  function renderRail(){
    const items=getViewItems();
    $('railTitle').textContent=state.view==='city'?'ŞEHİR HARİTASI':state.view==='notes'?'SÖZLÜK & DOSYALAR':navLabel(state.view);
    $('railCount').textContent=items.length?String(items.length).padStart(2,'0'):'';
    if(state.view==='timeline'){$('railList').innerHTML='<div class="empty-state"><strong>Zaman çizgisi</strong>Kronolojiyi ana bölümden inceleyebilirsin.</div>';return}
    const q=strip(state.search);
    const shown=items.filter(e=>!q||strip(e.name+' '+e.summary).includes(q));
    $('railList').innerHTML=shown.map(ent=>`<button class="rail-item ${ent.id===state.selected?'is-active':''}" data-id="${escAttr(ent.id)}" data-view="${escAttr(ent.type==='places'&&ent.id==='skopse'?'city':ent.type)}" ${ent.id===state.selected?'aria-current="true"':''}>
      <span class="rail-avatar">${image(ent)}${!imgSource(ent)?escapeHtml(initials(ent.name)):''}</span>
      <span class="rail-copy"><span class="rail-name">${escapeHtml(ent.name)}</span><span class="rail-detail">${escapeHtml(ent.tagline)}</span></span>
      </button>`).join('')||'<div class="empty-state"><strong>Kayıt yok</strong>Başka bir arama yap.</div>';
  }
  function renderFeature(){
    if(state.view==='timeline'){renderTimeline();return}
    if(state.view==='notes'){renderNotes();return}
    const ent=byId.get(state.selected)||byId.get(defaultId(state.view));
    if(!ent){$('mainContent').innerHTML='<div class="empty-state">Bu bölüm henüz hazır değil.</div>';return}
    const sections=ent.sections||{};const tab=sections[state.subtab]?state.subtab:Object.keys(sections)[0]||'genel';
    const src=imgSource(ent), fallback=escapeHtml(initials(ent.name));
    const tabMarkup=TABS.map(([id,label])=>`<button type="button" role="tab" aria-selected="${String(id===tab)}" data-tab="${id}" class="tab-btn">${escapeHtml(label)}</button>`).join('');
    const body=sections[tab]||'Bu başlıkla ilgili ayrıntılar henüz yazılmadı.';
    const meta=Object.entries(ent.meta||{}).slice(0,4).map(([k,v])=>`<div class="meta-item"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
    const related=(ent.related||[]).map(id=>byId.get(id)).filter(Boolean).slice(0,8);
    $('mainContent').innerHTML=`<article class="feature">
      <div class="feature-image ${ent.type==='places'||ent.type==='companies'?'is-city':''}">
        <div class="fallback-art" aria-hidden="true">${fallback}</div>${image(ent)}
        <div class="image-tag"><span class="line"></span><strong>SKOPSE · ${escapeHtml(typeNames[ent.type]||'DÜNYA DOSYASI')}</strong><span>${escapeHtml(ent.tagline)}</span></div>
      </div>
      <div class="feature-body">
        <span class="eyebrow">${escapeHtml(ent.tagline)}</span>
        <h1 class="feature-title">${escapeHtml(ent.name)}</h1>
        ${ent.quote?`<p class="feature-quote">${escapeHtml(ent.quote)}</p>`:''}
        <p class="feature-summary">${escapeHtml(ent.summary)}</p>
        ${meta?`<dl class="meta">${meta}</dl>`:''}
        <div class="profile-tabs" role="tablist" aria-label="Profil bölümleri">${tabMarkup}</div>
        <div class="profile-panel" role="tabpanel"><span class="panel-caption">${escapeHtml(TABS.find(t=>t[0]===tab)?.[1]||'Genel bilgi')}</span>${escapeHtml(body)}</div>
        ${related.length?`<div class="relation-row"><span class="small-label">İLGİLİ DOSYALAR</span>${related.map(x=>`<button class="relation-chip" data-open="${escAttr(x.id)}">${escapeHtml(x.name)} ↗</button>`).join('')}</div>`:''}
        ${ent.status?`<div class="status-line"><span class="status-dot">◆</span> ${escapeHtml(ent.status)}</div>`:''}
      </div>
    </article>${renderLower(ent)}`;
    // This active sub-tab is re-rendered without changing the top navigation.
  }
  function renderLower(active){
    const ids=active.type==='characters' ? ['eski_sehir','yeni_sehir','tunek','sifon','gezginler','diadolas','paradise'] :
      active.type==='companies' ? ['cennet','derman','kentel','helion','harman','siper','payda','uzan'] :
      active.type==='factions' ? ['gezginler','batak','sifon','angels'] :
      ['eski_sehir','yeni_sehir','tunek','sifon','gezginler','diadolas','paradise'];
    const cards=ids.map(id=>byId.get(id)).filter(x=>x&&x.id!==active.id);
    return `<section class="content-lower" aria-label="Dünyayı keşfet">
     <div class="lower-top"><h2 class="section-title">${active.type==='companies'?'Şirket ağı':'Skopse’nin öteki yüzleri'}</h2><div class="section-sub">Bir dosya seçerek ayrıntılarını incele</div></div>
     <div class="thumb-grid">${cards.map(ent=>`<button class="thumb-card" data-open="${escAttr(ent.id)}" aria-label="${escAttr(ent.name)} dosyasını aç"><span class="no-image-thumb">${escapeHtml(initials(ent.name))}</span>${image(ent)}<span class="thumb-arrow">↗</span><span class="thumb-content"><span class="thumb-title">${escapeHtml(ent.name)}</span><span class="thumb-sub">${escapeHtml(ent.tagline)}</span></span></button>`).join('')}</div>
     <div class="atlas-band"><div class="band-card"><div class="band-heading">Birbirine bağlı bir şehir</div><p>${escapeHtml(world.intro)}</p><div class="quicklinks"><button class="quicklink" data-switch="companies">Şirketler ↗</button><button class="quicklink" data-switch="factions">Topluluklar ↗</button><button class="quicklink" data-switch="notes">Sözlük ↗</button></div></div>
       <div class="band-card"><div class="band-heading">Önceki hikaye haritası</div><p>Eski kart haritası, ayrıntılı arşiv ve önceki taslak notları korunuyor. Güncel atlas ise son kararları esas alıyor.</p><a class="archive-link" href="eski-hikaye-haritasi.html" target="_blank" rel="noopener">Haritayı aç ↗</a></div>
     </div></section>`;
  }
  function renderTimeline(){
    $('mainContent').innerHTML=`<section class="section-banner"><span class="eyebrow">SKOPSE / KİTAP I</span><h1>Zaman Çizelgesi</h1><p>Şehrin savaş sonrası dönüşümünden Nil’in ilk sorularına uzanan olaylar. Netleşmemiş tarihler ayrıca belirtilmiştir.</p></section><div class="timeline-shell"><div class="timeline-items">${world.timeline.map(t=>`<article class="timeline-item"><span class="timeline-when">${escapeHtml(t.when)}</span><h2>${escapeHtml(t.title)}</h2><p>${escapeHtml(t.body)}</p></article>`).join('')}</div></div>`;
  }
  function renderNotes(){
    const terms=world.glossary.map(t=>`<div class="glossary-term"><strong>${escapeHtml(t.term)}</strong><span>${escapeHtml(t.meaning)}</span></div>`).join('');
    const notes=world.authorNotes.map(n=>`<article class="note-card"><h2>${escapeHtml(n.title)}</h2><p>${escapeHtml(n.body)}</p></article>`).join('');
    $('mainContent').innerHTML=`<section class="section-banner"><span class="eyebrow">SKOPSE / YAZAR ARŞİVİ</span><h1>Notlar & Terimler</h1><p>Güncel dünya kurma kararları, açık sorular ve şehrin günlük dili.</p></section>
      <div class="notes-shell"><h2 class="notes-heading">Sokak sözlüğü</h2><div class="glossary-list">${terms}</div><h2 class="notes-heading">Yazım dosyası</h2><div class="notes-grid">${notes}</div>
      <a href="eski-hikaye-haritasi.html" target="_blank" rel="noopener" class="archive-link">Eski interaktif haritayı aç ↗</a></div>`;
  }
  async function load(){
    try{
      const response=await fetch('data/world.json',{cache:'no-store'});
      if(!response.ok)throw new Error('Veri dosyası bulunamadı ('+response.status+').');
      world=await response.json();
      if(!world?.entities?.length)throw new Error('İçerik dosyası boş.');
      start();
    }catch(err){
      $('mainContent').innerHTML=`<section class="error-state"><h2>Atlas verileri açılamadı</h2><p>Siteyi çift tıklayarak <code>file://</code> üzerinden açtıysan tarayıcın JSON dosyasının okunmasına izin vermiyor olabilir. GitHub Pages'te çalışır; bilgisayarında denemek için klasörde <code>python -m http.server 8000</code> komutunu çalıştırıp <code>http://localhost:8000</code> adresine git.</p><p>${escapeHtml(err.message)}</p></section>`;
      console.error(err);
    }
  }
  load();
})();
