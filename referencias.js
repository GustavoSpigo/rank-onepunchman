// Referências: catálogo de fontes, menções numeradas e ressalvas.
// Dados: data/mentions.json (menções) e data/fontes.json (fontes e notas), carregados em app.js.

const AUTOR = "MURATA, Yusuke; ONE";
const OBRA = "One-Punch Man";

const capRef = (m) => `cap. ${m.chapter}${m.chapter_inferred ? " (est.)" : ""}`;

// Fonte de um volume, no formato de referência bibliográfica.
function fonteHTML(f, n) {
  return `<li class="src" id="fonte-${f.vol}"><span class="rn">V${f.vol}</span><div>
    <div class="cite">${AUTOR}. <i>${OBRA}</i>, v. ${f.vol}. [S.l.: s.n.], [s.d.]. Edição digital em português (${f.formato}), arquivo “${esc(f.arquivo)}”, ${f.paginas} imagens. Consultado em ${esc(window.FONTES.consulta)}.</div>
    <div class="small muted">${n ? `${n} ${n === 1 ? "menção conferida" : "menções conferidas"}` : "Nenhuma posição de ranking"} · ${esc(f.metodo)}. ${esc(f.obs)}</div></div></li>`;
}

// Uma menção conferida, citando a fonte do volume.
function mencaoHTML(m) {
  const tags = [];
  if (m.suspect) tags.push('<span class="badge warn">SUSPEITO</span>');
  if (m.status === "retired") tags.push('<span class="badge ret">APOSENT.</span>');
  return `<li class="ref-item c-${m.class}" id="r${m._ref}"><span class="rn">[${m._ref}]</span><div>
    <div class="ref-head"><b>${esc(m.character)}</b> <span class="pill">${rank(m)}</span>${tags.join("")}</div>
    <div class="cite">${AUTOR}. <i>${OBRA}</i>, v. ${m.volume}, ${capRef(m)}, p. ${m.page}. <a href="#/referencias/fonte-${m.volume}">[V${m.volume}]</a></div>
    ${m.note ? `<div class="small muted">${esc(m.note)}</div>` : ""}</div></li>`;
}

function viewReferencias(arg) {
  const F = window.FONTES;
  if (!F) return `<div><div class="eyebrow">Referências</div><h1 class="md">Fontes indisponíveis</h1><p class="lead">Não foi possível carregar data/fontes.json.</p></div>`;

  const ver = mentions.filter((m) => m.verified).sort((a, b) => a._ref - b._ref);
  const wiki = mentions.filter((m) => !m.verified).sort((a, b) => a.chapter - b.chapter || ORDER[b.class] - ORDER[a.class]);
  const porVol = new Map();
  for (const m of ver) porVol.set(m.volume, [...(porVol.get(m.volume) || []), m]);

  const fontes = F.fontes.map((f) => fonteHTML(f, (porVol.get(f.vol) || []).length)).join("");
  const mencoes = [...porVol].map(([v, list]) =>
    `<h3 class="vol-h">Volume ${v} <span class="small muted">${list.length} ${list.length === 1 ? "menção" : "menções"}</span></h3><ol class="ref-list">${list.map(mencaoHTML).join("")}</ol>`).join("");
  const notas = F.notas.map((n) => `<div class="nota" id="nota-${n.id}"><h3>${esc(n.titulo)}</h3><p>${esc(n.texto)}</p></div>`).join("");
  const pend = wiki.map((m) => `<li><span class="pill c-${m.class}">${rank(m)}</span><span class="nm">${esc(m.character)}</span><span class="small muted">cap. ${m.chapter}${m.status === "retired" ? " · aposentado" : ""}</span></li>`).join("");

  setTimeout(() => {
    if (!arg) return;
    const el = document.getElementById(arg);
    if (el) { el.classList.add("hit"); el.scrollIntoView({ block: "center" }); }
  });

  return `
  <div class="row"><div><div class="eyebrow">Referências</div><h1 class="md">Fontes e verificações</h1>
    <p class="lead">Cada posição conferida remete ao volume, ao capítulo e à página do scan onde aparece. Use o número entre colchetes para citar: por exemplo, <b>[${ver[0]?._ref ?? 1}]</b>.</p></div>
    <div class="stats"><div class="stat"><b>${ver.length}</b><span>menções conferidas</span></div>
      <div class="stat"><b>${F.fontes.length}</b><span>volumes consultados</span></div>
      <div class="stat"><b>${wiki.length}</b><span>só na Wikipedia</span></div></div></div>

  <section class="card">
    <h2>Como citar</h2>
    <p>${AUTOR}. <i>${OBRA}</i>, v. 9, cap. 41 (est.), p. 29.</p>
    <p class="small muted">Autor e obra, volume, capítulo e página. “(est.)” indica capítulo estimado, e “p.” é o índice da imagem no arquivo, não a numeração impressa (ver <a href="#/referencias/nota-paginacao">notas</a>). Todos os volumes são edições digitais em português de editora não identificada, daí “[S.l.: s.n.]”. Cada fonte tem um código <b>V</b> seguido do volume.</p>
  </section>

  <section class="card"><h2>Fontes por volume</h2>
    <p class="small muted">Catálogo dos 33 arquivos consultados, com o método usado e o que foi encontrado.</p>
    <ul class="src-list">${fontes}</ul></section>

  <section class="card"><h2>Menções conferidas</h2>
    <p class="small muted">Em ordem de volume e página. Ao lado do nome, a classe e a posição lidas na imagem.</p>${mencoes}</section>

  <section class="card"><h2>Notas e ressalvas</h2><div class="notas">${notas}</div></section>

  <section class="card"><h2>Ainda sem conferência</h2>
    <p class="small muted">${wiki.length} posições vêm só da Wikipedia, sem volume nem página nos scans consultados. Podem divergir do mangá.</p>
    <ul class="list pend">${pend}</ul></section>`;
}

VIEWS.referencias = viewReferencias;
