'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const PORTRAITS = {
  "Air": "assets/portraits/air.png",
  "Amai Mask": "assets/portraits/amai-mask.png",
  "Armored Chief Clerk": "assets/portraits/armored-chief-clerk.png",
  "Atirador": "assets/portraits/atirador-v2.png",
  "Atomic Samurai": "assets/portraits/atomic-samurai.png",
  "Bang": "assets/portraits/bang.png",
  "Battery Man": "assets/portraits/battery-man.png",
  "Blast": "assets/portraits/blast.png",
  "Blue Fire": "assets/portraits/blue-fire-v2.png",
  "Bone": "assets/portraits/bone.png",
  "Bunbun Man": "assets/portraits/bunbun-man.png",
  "Buraco Duplo": "assets/portraits/buraco-duplo.png",
  "Bushi Drill": "assets/portraits/bushi-drill-v2.png",
  "Butterfly DX": "assets/portraits/butterfly-dx.png",
  "Captain Mizuki": "assets/portraits/captain-mizuki.png",
  "Chain Toad": "assets/portraits/chain-toad.png",
  "Chifre Selvagem": "assets/portraits/chifre-selvagem.png",
  "Child Emperor": "assets/portraits/child-emperor.png",
  "Crescent Eyebroll": "assets/portraits/crescent-eyebroll.png",
  "D-Pad": "assets/portraits/d-pad.png",
  "Darkness Blade": "assets/portraits/darkness-blade.png",
  "Death Gatling": "assets/portraits/death-gatling-v2.png",
  "Drive Knight": "assets/portraits/drive-knight.png",
  "Dynamite Man": "assets/portraits/dynamite-man.png",
  "Ecolo G": "assets/portraits/ecolo-g-v2.png",
  "Eyelashes": "assets/portraits/eyelashes-v2.png",
  "Feather": "assets/portraits/feather.png",
  "Flashy Flash": "assets/portraits/flashy-flash.png",
  "Food Battler Futoshi": "assets/portraits/food-battler-futoshi.png",
  "Forte": "assets/portraits/forte-v2.png",
  "Funeral Suspenders": "assets/portraits/funeral-suspenders.png",
  "Gasmask Cowboy": "assets/portraits/gasmask-cowboy.png",
  "Gearspear": "assets/portraits/gearspear.png",
  "Genos": "assets/portraits/genos.png",
  "Golden Ball": "assets/portraits/golden-ball-v2.png",
  "Grave Eight": "assets/portraits/grave-eight.png",
  "Great Philosopher": "assets/portraits/great-philosopher.png",
  "Green": "assets/portraits/green.png",
  "Heavy Kong": "assets/portraits/heavy-kong.png",
  "Heavy Tank Loincloth": "assets/portraits/heavy-tank-loincloth.png",
  "Hellish Blizzard": "assets/portraits/fubuki.png",
  "Homem Choroso": "assets/portraits/homem-choroso.png",
  "Homem Raivoso": "assets/portraits/homem-raivoso.png",
  "Homem Sorriso": "assets/portraits/homem-sorriso.png",
  "Horse-Bone": "assets/portraits/horse-bone.png",
  "Iaian": "assets/portraits/iaian.png",
  "King": "assets/portraits/king.png",
  "Lightning Genji": "assets/portraits/lightning-genji.png",
  "Lightning Max": "assets/portraits/lightning-max.png",
  "Mad Devil Yankee": "assets/portraits/mad-devil-yankee.png",
  "Magicman": "assets/portraits/magicman.png",
  "Mestre dos Odores": "assets/portraits/mestre-dos-odores.png",
  "Metal Bat": "assets/portraits/metal-bat.png",
  "Metal Knight": "assets/portraits/metal-knight.png",
  "Monocross": "assets/portraits/monocross.png",
  "Monster Roper Shell": "assets/portraits/monster-roper-shell.png",
  "Mumen Rider": "assets/portraits/mumen-rider.png",
  "Narcisstoic": "assets/portraits/narcisstoic.png",
  "Needlestar": "assets/portraits/needlestar.png",
  "Okama Itachi": "assets/portraits/okama-itachi.png",
  "One Shotter": "assets/portraits/one-shotter.png",
  "Pig God": "assets/portraits/pig-god.png",
  "Poison": "assets/portraits/poison-v2.png",
  "Puri-Puri Prisoner": "assets/portraits/puri-puri-prisoner.png",
  "Pólvora": "assets/portraits/polvora.png",
  "Pós-graduado": "assets/portraits/pos-graduado.png",
  "Red Muffler": "assets/portraits/red-muffler.png",
  "Saitama": "assets/saitama-art.png",
  "Shadow Ring": "assets/portraits/shadow-ring.png",
  "Smileman": "assets/portraits/smileman.png",
  "Snakebite Snek": "assets/portraits/snakebite-snek.png",
  "Spring Mustachio": "assets/portraits/spring-mustachio.png",
  "Stinger": "assets/portraits/stinger.png",
  "Superalloy Blackluster": "assets/portraits/superalloy-blackluster.png",
  "Tank-Top Blackhole": "assets/portraits/tank-top-blackhole.png",
  "Tank-Top Master": "assets/portraits/tank-top-master.png",
  "Tank-Top Tiger": "assets/portraits/tank-top-tiger.png",
  "Tank-Top Vegetarian": "assets/portraits/tank-top-vegetarian.png",
  "Tengu das Armadilhas": "assets/portraits/tengu-das-armadilhas.png",
  "Terrible Tornado": "assets/portraits/tatsumaki.png",
  "Terry Pêssego": "assets/portraits/terry-pessego.png",
  "Tranças Gêmeas": "assets/portraits/trancas-gemeas.png",
  "Vespa Rosa": "assets/portraits/vespa-rosa.png",
  "Watchdog Man": "assets/portraits/watchdog-man.png",
  "Wild Monkey": "assets/portraits/wild-monkey.png",
  "Zombieman": "assets/portraits/zombieman.png",
  "Óculos": "assets/portraits/oculos.png"
};
const CLASSES=['S','A','B','C'], COLORS=['#f5bf69','#78b7dc','#a99cce'], MAX={S:20,A:40,B:260,C:350};
const state={who:'Saitama',chapter:236,view:'trajectory',filter:'all',query:'',comparisons:[],record:null,playing:false};let data=[],names=[],chapters=[],timer=null;
const history=(n,cap=state.chapter)=>data.filter(m=>m.name===n&&m.position!=null&&m.chapter<=cap),latest=n=>history(n).at(-1),rank=m=>m?`${m.class} #${m.position}`:'—',where=m=>`Cap. ${m.chapter}${m.chapter_inferred?' (est.)':''}`,initials=n=>n.split(/[ -]/).filter(Boolean).slice(0,2).map(s=>s[0]).join('');
function movement(a,b){if(!a)return 'Primeira menção';if(a.class!==b.class)return CLASSES.indexOf(b.class)<CLASSES.indexOf(a.class)?`Promoção ${a.class} → ${b.class}`:`Mudança ${a.class} → ${b.class}`;let d=a.position-b.position;return d?`${d>0?'↑':'↓'} ${Math.abs(d)} ${Math.abs(d)===1?'posição':'posições'}`:'Posição mantida';}
function currentRows(){return names.map(n=>latest(n)).filter(Boolean)}
function announce(t){$('#announcement').textContent=t}
function selectHero(n){state.who=n;state.record=null;state.comparisons=state.comparisons.filter(x=>x!==n);render();announce(`Herói selecionado: ${n}. ${rank(latest(n))}`)}
function renderRoster(){const rows=names.map(n=>({n,m:latest(n)})).filter(({n,m})=>n.toLowerCase().includes(state.query.toLowerCase())&&(state.filter==='all'||m?.class===state.filter)).sort((a,b)=>(a.n==='Saitama'?-1:b.n==='Saitama'?1:a.n==='Genos'?-1:b.n==='Genos'?1:0)||a.n.localeCompare(b.n));$('#hero-count').textContent=String(names.length).padStart(2,'0');$('#hero-list').innerHTML=rows.length?rows.map(({n,m})=>`<button class="hero-row ${state.who===n?'active':''}" data-hero="${esc(n)}" aria-pressed="${state.who===n}"><span class="avatar">${PORTRAITS[n]?`<img src="${esc(PORTRAITS[n])}" alt="" loading="lazy">`:esc(initials(n))}</span><span class="hero-name">${esc(n)}</span><span class="hero-rank">${m?`${m.class} · ${String(m.position).padStart(2,'0')}`:'—'}</span></button>`).join(''):'<p class="empty">Nenhum herói encontrado para estes filtros.</p>';$$('[data-hero]').forEach(b=>b.onclick=()=>selectHero(b.dataset.hero));}
function renderDossier(){const m=state.record||latest(state.who),h=history(state.who),id=String(names.indexOf(state.who)+1).padStart(3,'0');$('#dossier').innerHTML=`${PORTRAITS[state.who]?`<img class="character-art" src="${esc(PORTRAITS[state.who])}" alt="Ilustração de ${esc(state.who)}">`:`<div class="hero-monogram" aria-hidden="true">${esc(initials(state.who))}</div>`}<div class="dossier-top"><span class="dossier-number">HA / ${id}</span><span class="dossier-stamp">英雄</span></div><div class="dossier-data"><p class="eyebrow">${state.record?'REGISTRO EM FOCO':'ÚLTIMO RANK CONHECIDO'}</p><div class="big-rank">${m?m.class:'—'} <span>${m?`#${String(m.position).padStart(2,'0')}`:'SEM REGISTRO'}</span></div><div class="dossier-meta">${m?`<b>${where(m)}${m.volume?` · Vol. ${m.volume}`:''}</b><br>${m.verified?'✓ Conferido no mangá':'○ Fonte secundária'}${m.status==='retired'?'<br>Aposentado':''}${m.suspect?'<br>Registro com ressalva':''}`:`Avance os capítulos para<br>encontrar a primeira menção.`}</div>${m?'<button class="record-link" id="record-link">Examinar evidência <span>↗</span></button>':''}</div>`;if(m)$('#record-link').onclick=()=>sourceDialog(m);}
function svgStart(w,h,title){return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><defs><filter id="glow"><feGaussianBlur stdDeviation="3"/></filter><linearGradient id="wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5bf69" stop-opacity=".12"/><stop offset="100%" stop-color="#f5bf69" stop-opacity="0"/></linearGradient></defs>`}
function drawTrajectory(){const w=Math.max(250,$('#visual').clientWidth),h=290,top=16,bh=56,left=32,right=44,bottom=top+bh*4;let series=[state.who,...state.comparisons].map((n,i)=>({n,h:history(n),color:COLORS[i]})),all=series.flatMap(s=>s.h),lo=all.length?Math.min(...all.map(m=>m.chapter)):12,hi=all.length?Math.max(lo+1,...all.map(m=>m.chapter)):state.chapter;const x=m=>left+(m.chapter-lo)/(hi-lo)*(w-left-right),y=m=>top+CLASSES.indexOf(m.class)*bh+10+(bh-22)*Math.log(Math.max(m.position,1))/Math.log(Math.max(MAX[m.class],m.position));let out=svgStart(w,h,`Trajetórias por capítulo: ${series.map(s=>s.n).join(', ')}. Classes S, A, B e C, melhor posição no topo de cada faixa.`);
CLASSES.forEach((c,i)=>{const yy=top+i*bh;out+=`<line x1="${left}" y1="${yy+bh}" x2="${w-5}" y2="${yy+bh}" stroke="#ffffff0c"/><text x="5" y="${yy+34}" font-family="Space Grotesk,monospace" font-size="12" fill="${c==='S'?'#cab181':'#607086'}">${c}</text><text x="${w-28}" y="${yy+40}" font-family="Manrope,sans-serif" font-size="48" font-weight="500" text-anchor="middle" fill="#ffffff03">${c}</text>`;});
const ticks=w<400?4:6;for(let i=0;i<ticks;i++){const xx=left+i*(w-left-right)/(ticks-1),ch=Math.round(lo+i*(hi-lo)/(ticks-1));out+=`<line x1="${xx}" y1="${top}" x2="${xx}" y2="${bottom}" stroke="#ffffff06" stroke-dasharray="2 5"/><text x="${xx}" y="${bottom+20}" text-anchor="middle" class="plot-label">${ch}</text>`;}
const targets=[];series.slice().reverse().forEach(s=>{if(!s.h.length)return;let path=`M${x(s.h[0])},${y(s.h[0])}`;s.h.slice(1).forEach(m=>path+=`H${x(m)}V${y(m)}`);if(s.n===state.who){out+=`<path d="${path}L${x(s.h.at(-1))},${bottom}L${x(s.h[0])},${bottom}Z" fill="url(#wash)"/><path d="${path}" fill="none" stroke="${s.color}" stroke-width="5" opacity=".2" filter="url(#glow)"/>`;}out+=`<path d="${path}" fill="none" stroke="${s.color}" stroke-width="${s.n===state.who?2:1.5}" stroke-linejoin="round"/>`;s.h.forEach((m,i)=>{const idx=targets.push(m)-1,last=i===s.h.length-1;out+=`<circle cx="${x(m)}" cy="${y(m)}" r="${last?4.5:3}" fill="${s.color}" stroke="#0c121a" stroke-width="1.5"/>`;if(last){out+=`<circle cx="${x(m)}" cy="${y(m)}" r="8" fill="none" stroke="${s.color}" opacity=".25"/><text x="${x(m)}" y="${y(m)-15}" text-anchor="${x(m)>w-65?'end':'middle'}" font-size="9" font-family="Space Grotesk,monospace" fill="${s.color}">${rank(m)}</text>`;}out+=`<circle class="point-target" data-point="${idx}" cx="${x(m)}" cy="${y(m)}" r="11" fill="transparent" role="button" tabindex="0" aria-label="${esc(m.name)}, ${rank(m)}, ${where(m)}"><title>${esc(m.name)} · ${rank(m)} · ${where(m)}</title></circle>`;});});
if(!all.length)out+=`<text x="${w/2}" y="${h/2}" text-anchor="middle" font-size="11" fill="#8190a1">Nenhuma menção até este capítulo.</text>`;out+=`<text x="${(left+w-right)/2}" y="${h-3}" text-anchor="middle" class="plot-label" style="font-size:7px;letter-spacing:1.5px">CAPÍTULOS COM REGISTROS</text></svg>`;$('#visual').innerHTML=out;$$('[data-point]').forEach(b=>{const action=()=>sourceDialog(targets[+b.dataset.point]);b.onclick=action;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action()}};});$('#chart-description').textContent='Degraus entre menções. #1 no topo de cada faixa; escala logarítmica dentro da classe. Não é uma escala de poder.';}
function drawAtlas(){const w=Math.max(250,$('#visual').clientWidth),h=290,cx=w/2,cy=137,rmax=Math.min(w/2-28,119),rows=currentRows();let out=svgStart(w,h,'Mapa da Associação: cada órbita é uma classe. Selecione um ponto para abrir um herói.');out+=`<line x1="${cx-rmax-15}" y1="${cy}" x2="${cx+rmax+15}" y2="${cy}" stroke="#ffffff08"/><line x1="${cx}" y1="${cy-rmax-15}" x2="${cx}" y2="${cy+rmax+15}" stroke="#ffffff08"/>`;
CLASSES.forEach((c,i)=>{let r=rmax*(i+1)/4;out+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${i===0?'#f5bf6928':'#ffffff15'}" stroke-dasharray="${i===0?'0':'2 4'}"/><text x="${cx+r+5}" y="${cy-3}" font-size="9" fill="#8b9aab" font-family="Space Grotesk,monospace">${c}</text>`;const members=rows.filter(m=>m.class===c).sort((a,b)=>a.position-b.position||a.name.localeCompare(b.name));members.forEach((m,j)=>{const angle=-Math.PI/2+j*2*Math.PI/Math.max(1,members.length)+(i%2?.16:0),xx=cx+r*Math.cos(angle),yy=cy+r*Math.sin(angle),chosen=m.name===state.who,compare=state.comparisons.indexOf(m.name),color=chosen?COLORS[0]:compare>=0?COLORS[compare+1]:'#657a90';if(chosen)out+=`<line x1="${cx}" y1="${cy}" x2="${xx}" y2="${yy}" stroke="${color}" opacity=".3"/><circle cx="${xx}" cy="${yy}" r="12" fill="${color}" opacity=".07"/><circle cx="${xx}" cy="${yy}" r="8" fill="none" stroke="${color}" opacity=".4"/>`;out+=`<circle cx="${xx}" cy="${yy}" r="${chosen?4:3}" fill="${color}"/>`;if(chosen){const anchor=xx>cx?'end':'start',tx=xx>cx?xx-10:xx+10;out+=`<text x="${tx}" y="${yy-12}" text-anchor="${anchor}" font-size="10" fill="${color}">${esc(m.name)}</text>`;}out+=`<circle data-node="${esc(m.name)}" cx="${xx}" cy="${yy}" r="8" fill="transparent" class="point-target" tabindex="0" role="button" aria-label="${esc(m.name)}, ${rank(m)}"><title>${esc(m.name)} · ${rank(m)}</title></circle>`;});});out+=`<circle cx="${cx}" cy="${cy}" r="2" fill="#f5bf69"/><text x="${cx}" y="${h-7}" text-anchor="middle" class="plot-label" style="font-size:7px;letter-spacing:1px">${rows.length} HERÓIS / ${CLASSES.length} CLASSES / CAP. ${state.chapter}</text></svg>`;$('#visual').innerHTML=out;$$('[data-node]').forEach(b=>{const action=()=>selectHero(b.dataset.node);b.onclick=action;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action()}};});$('#chart-description').textContent='Cada órbita representa uma classe: S no centro, C na borda. A posição angular apenas organiza os heróis por rank.';}
function drawVisual(){state.view==='trajectory'?drawTrajectory():drawAtlas()}
function renderMilestones(){const h=history(state.who),changes=h.map((m,i)=>({m,i})).filter(({m,i})=>!i||rank(m)!==rank(h[i-1]));$('#event-total').textContent=`${String(changes.length).padStart(2,'0')} MARCOS`;$('#milestones').innerHTML=changes.length?changes.map(({m,i})=>`<button class="milestone ${i&&m.class!==h[i-1].class?'promotion':''}" data-event="${m.id}"><small>${where(m).toUpperCase()}</small><span class="event-arrow">↗</span><strong>${rank(m)}</strong><p>${movement(h[i-1],m)}</p></button>`).join(''):'<p class="empty">Ainda não há marcos neste período. Avance a linha do tempo para descobrir a primeira menção.</p>';$$('[data-event]').forEach(b=>b.onclick=()=>sourceDialog(data.find(m=>m.id===+b.dataset.event)));}
function renderTime(){const cap=state.chapter;$('#chapter-number').textContent=String(cap).padStart(3,'0');$('#time').value=cap;$('#time').style.setProperty('--progress',`${(cap-12)/(236-12)*100}%`);$('#chapter-summary').textContent=`${currentRows().length} ${currentRows().length===1?'HERÓI REGISTRADO':'HERÓIS REGISTRADOS'}`;$('#time-ticks').innerHTML=chapters.map((c,i)=>`<span class="${i%4===0?'major ':''}${c<=cap?'past':''}" style="left:${(c-12)/(236-12)*100}%"></span>`).join('');$('#prev').disabled=cap<=chapters[0];$('#next').disabled=cap>=chapters.at(-1);$('#play').textContent=state.playing?'Ⅱ':'▶';$('#play').setAttribute('aria-label',state.playing?'Pausar linha do tempo':'Reproduzir linha do tempo');}
function render(){const h=history(state.who);$('#hero-title').textContent=state.who;$('#hero-alias').textContent=state.who==='Saitama'?'サイタマ / CAPA CARECA':`${h.length} MENÇÕES ATÉ O CAPÍTULO ${state.chapter}`;$('#stage-eyebrow').textContent=`DOSSIÊ / ${String(names.indexOf(state.who)+1).padStart(3,'0')}`;$('#comparison-chips').innerHTML=[state.who,...state.comparisons].map((n,i)=>`<button class="compare-chip" style="--series:${COLORS[i]}" ${i?`data-remove="${esc(n)}" aria-label="Remover comparação com ${esc(n)}"`:'disabled'}><i></i>${esc(n)}${i?'<span>×</span>':''}</button>`).join('');$$('[data-remove]').forEach(b=>b.onclick=()=>{state.comparisons=state.comparisons.filter(n=>n!==b.dataset.remove);render()});renderRoster();renderDossier();drawVisual();renderMilestones();renderTime();}
function stop(){clearInterval(timer);timer=null;state.playing=false;renderTime()}
function setChapter(c){state.chapter=c;state.record=null;render()}
function openDialog(html){stop();$('#dialog-content').innerHTML=html;if(!$('#dialog').open)$('#dialog').showModal()}
function sourceDialog(m){openDialog(`<p class="eyebrow">EVIDÊNCIA / ${String(m.id+1).padStart(3,'0')}</p><h2>${esc(m.name)}<br><span style="color:var(--gold)">${rank(m)}</span></h2><span class="dialog-label">${m.verified?'CONFERIDO NO MANGÁ':'FONTE SECUNDÁRIA'}</span><p><b>${where(m)}</b>${m.volume?` · Volume ${m.volume}`:''}${m.page?` · Página ${m.page}`:''}</p><p>${esc(m.note||'Sem observação adicional neste registro.')}</p>${m.suspect?'<p>Este registro está sinalizado como suspeito na base original.</p>':''}${m.chapter_inferred?'<p>O capítulo é estimado a partir do scan. A posição foi registrada na página indicada.</p>':''}${m.page?'<p>A página é o índice da imagem no arquivo digital; pode diferir da paginação impressa.</p>':''}${/^https:\/\//.test(m.source||'')?`<p><a target="_blank" rel="noopener" href="${esc(m.source)}">Consultar fonte original ↗</a></p>`:''}<p>ONE & Yusuke Murata · One-Punch Man</p>`)}
function about(){openDialog(`<p class="eyebrow">NOTAS DO ARQUIVO</p><h2>Os números não<br>contam tudo.</h2><p>Hero Atlas acompanha <b>${data.length} menções de ${names.length} heróis</b>, copiadas da base de pesquisa do projeto original. A posição exibida é sempre a última conhecida até o capítulo escolhido.</p><p>Os registros conferidos no mangá apontam volume e página. As fontes secundárias e os capítulos estimados são identificados individualmente. Os arquivos completos do mangá não são publicados aqui.</p><p>Uma mudança pode ter ocorrido entre duas menções. Posições coincidentes são preservadas: não há informações suficientes para reconstruir todas as posições a cada capítulo.</p><p>A trajetória usa faixas separadas por classe, com escala logarítmica interna. O mapa usa órbitas por classe e ordena os heróis por rank no sentido horário. Nenhum deles mede força ou poder.</p><p>Projeto de fãs, sem afiliação oficial. One-Punch Man é uma obra de ONE e Yusuke Murata. As ilustrações dos personagens foram criadas com IA para esta experiência.</p><p><a href="assets/portraits/">Ver galeria de retratos ↗</a></p>`)}
function compareDialog(){openDialog(`<p class="eyebrow">CRUZAR TRAJETÓRIAS</p><h2>Histórias lado a lado.</h2><p>Compare ${esc(state.who)} com até dois heróis. As linhas compartilham os mesmos capítulos e faixas de classe.</p><input id="compare-search" class="compare-search" placeholder="Buscar herói para comparar" aria-label="Buscar herói para comparar"><div class="compare-options" id="compare-options"></div>`);fillCompare('');$('#compare-search').oninput=e=>fillCompare(e.target.value)}
function fillCompare(q){const options=names.filter(n=>n!==state.who&&n.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>(a==='Genos'?-1:b==='Genos'?1:0)||history(b).length-history(a).length);$('#compare-options').innerHTML=options.length?options.map(n=>`<button data-compare="${esc(n)}" class="${state.comparisons.includes(n)?'selected':''}" aria-pressed="${state.comparisons.includes(n)}">${esc(n)}<span>${state.comparisons.includes(n)?'✓':rank(latest(n))}</span></button>`).join(''):'<p class="empty">Nenhum herói encontrado.</p>';$$('[data-compare]').forEach(b=>b.onclick=()=>{const n=b.dataset.compare;if(state.comparisons.includes(n))state.comparisons=state.comparisons.filter(x=>x!==n);else if(state.comparisons.length<2)state.comparisons.push(n);else{announce('Você já está comparando dois heróis. Remova um para adicionar outro.');return}render();fillCompare($('#compare-search').value)});$$('[data-compare]').forEach(b=>b.disabled=state.comparisons.length>=2&&!state.comparisons.includes(b.dataset.compare));}
$('#search').oninput=e=>{state.query=e.target.value;renderRoster()};$$('[data-filter]').forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;$$('[data-filter]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',t===b)});renderRoster()});$$('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;$$('[data-view]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',t===b)});drawVisual()});$('#time').oninput=e=>{const chapter=+e.target.value;stop();setChapter(chapter)};$('#prev').onclick=()=>{stop();setChapter([...chapters].reverse().find(c=>c<state.chapter)??chapters[0])};$('#next').onclick=()=>{stop();setChapter(chapters.find(c=>c>state.chapter)??chapters.at(-1))};$('#play').onclick=()=>{if(state.playing){stop();return}if(state.chapter>=chapters.at(-1))setChapter(chapters[0]);state.playing=true;renderTime();timer=setInterval(()=>{const n=chapters.find(c=>c>state.chapter);if(n==null){stop();return}setChapter(n);if(n===chapters.at(-1))stop()},1200)};$('#compare').onclick=compareDialog;$('#about').onclick=about;$('#footer-sources').onclick=about;$('#view-help').onclick=()=>openDialog(state.view==='trajectory'?`<p class="eyebrow">COMO LER / TRAJETÓRIAS</p><h2>Subir muda tudo.</h2><p>O eixo horizontal representa os capítulos com menções dos heróis selecionados. As faixas verticais são S, A, B e C; dentro de cada faixa, #1 fica no topo.</p><p>A escala dentro de cada classe é logarítmica para acomodar posições muito diferentes. Ela não permite medir a distância de poder entre heróis.</p><p>Cada ponto é uma menção. Os degraus conectam essas evidências, mas não confirmam a data exata da mudança. Selecione um ponto ou um marco abaixo para consultar a fonte.</p>`:`<p class="eyebrow">COMO LER / MAPA</p><h2>Uma Associação.<br>Quatro órbitas.</h2><p>Cada círculo representa uma classe. A classe S ocupa o centro e a C, a borda. Dentro da órbita, os heróis são ordenados por rank no sentido horário, a partir do topo.</p><p>A distância angular é apenas uma distribuição visual. Selecione um ponto para abrir o dossiê do herói, ou use a lista para encontrá-lo pelo nome.</p><p>Avance ou recue os capítulos para reconstruir as últimas posições conhecidas na Associação.</p>`);$('.dialog-close').onclick=()=>$('#dialog').close();$('#dialog').onclick=e=>{if(e.target===$('#dialog'))$('#dialog').close()};document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!$('#dialog').open){e.preventDefault();$('#search').focus()}});let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(drawVisual,100)});document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.playing)stop()});
fetch('data/mentions.json').then(r=>{if(!r.ok)throw Error('Arquivo indisponível');return r.json()}).then(raw=>{data=raw.map((m,id)=>({...m,id,name:m.character.replace(/\s*\(.*\)\s*$/,'')})).sort((a,b)=>a.chapter-b.chapter||(a.page||0)-(b.page||0));names=[...new Set(data.map(m=>m.name))].sort();chapters=[...new Set(data.map(m=>m.chapter))].sort((a,b)=>a-b);render()}).catch(()=>{$('#visual').innerHTML='<p class="empty">O arquivo não pôde ser carregado. Recarregue a página para tentar novamente.</p>'});
