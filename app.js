const demoMatches = [
  { league: "Premier League", country: "Inglaterra", home: "Northbridge FC", away: "Kingsport United", homeShort: "NF", awayShort: "KU", time: "Ejemplo · 16:00" },
  { league: "La Liga", country: "España", home: "Real del Valle", away: "Atlético Bahía", homeShort: "RV", awayShort: "AB", time: "Ejemplo · 18:30" },
  { league: "Serie A", country: "Italia", home: "AC Montelupo", away: "Sporting Verdi", homeShort: "AM", awayShort: "SV", time: "Ejemplo · 20:45" },
  { league: "Premier League", country: "Inglaterra", home: "Westford City", away: "Riverside Rovers", homeShort: "WC", awayShort: "RR", time: "Ejemplo · 21:00" }
];

const matchList = document.querySelector("#matchList");
const searchInput = document.querySelector("#searchInput");
const leagueFilter = document.querySelector("#leagueFilter");
const emptyState = document.querySelector("#emptyState");

function renderMatches() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const league = leagueFilter.value;
  const filtered = demoMatches.filter(match => {
    const matchesQuery = `${match.home} ${match.away} ${match.league} ${match.country}`.toLocaleLowerCase("es").includes(query);
    return matchesQuery && (league === "all" || match.league === league);
  });

  matchList.innerHTML = filtered.map(match => `
    <article class="match-card">
      <div class="match-meta"><span>${match.league} · ${match.country}</span><span class="demo-tag">DEMO</span></div>
      <div class="teams">
        <div class="team"><div class="team-badge">${match.homeShort}</div>${match.home}</div>
        <div class="versus">VS</div>
        <div class="team"><div class="team-badge">${match.awayShort}</div>${match.away}</div>
      </div>
      <div class="match-footer"><span>${match.time}</span><button type="button" class="details-button" data-home="${match.home}" data-away="${match.away}">Ver análisis ↗</button></div>
    </article>`).join("");

  emptyState.classList.toggle("hidden", filtered.length > 0);
}
searchInput.addEventListener("input", renderMatches);
leagueFilter.addEventListener("change", renderMatches);
matchList.addEventListener("click", event => {
  const button = event.target.closest(".details-button");
  if (button) alert(`El análisis de ${button.dataset.home} vs ${button.dataset.away} se activará cuando conectemos datos reales. Este partido es ficticio.`);
});

const today = new Date();
document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(today);
document.querySelector("#year").textContent = today.getFullYear();
document.querySelector("#createBetButton").addEventListener("click", () => {
  document.querySelector("#builderMessage").textContent = "Siguiente fase: partidos reales, mercados y cuotas disponibles.";
});
document.querySelector("#menuButton").addEventListener("click", () => {
  document.querySelector(".topbar nav").classList.toggle("open");
});
document.querySelectorAll(".topbar nav a").forEach(link => link.addEventListener("click", () => document.querySelector(".topbar nav").classList.remove("open")));
renderMatches();
