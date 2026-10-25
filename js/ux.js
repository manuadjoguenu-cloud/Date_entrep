// Date Entrepreneur — confort d'usage (sans dépendance)
(function () {
  // 1. Compte à rebours (19 décembre 2026, 15h00 à Lomé = UTC+0)
  var cible = new Date("2026-12-19T15:00:00Z").getTime();
  var fin = new Date("2026-12-19T22:00:00Z").getTime();
  var box = document.getElementById("countdown");
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    if (!box) return;
    var now = Date.now(), d = cible - now;
    if (now >= fin) { box.innerHTML = '<p class="countdown-label">L\u2019\u00e9v\u00e8nement est termin\u00e9. Merci \u00e0 tous !</p>'; clearInterval(timer); return; }
    if (d <= 0) { box.innerHTML = '<p class="countdown-label">C\u2019est aujourd\u2019hui \u2014 l\u2019\u00e9v\u00e8nement a commenc\u00e9 !</p>'; clearInterval(timer); return; }
    var j = Math.floor(d / 864e5), hh = Math.floor(d % 864e5 / 36e5), m = Math.floor(d % 36e5 / 6e4), s = Math.floor(d % 6e4 / 1e3);
    var v = { d: j, h: pad(hh), m: pad(m), s: pad(s) };
    box.querySelectorAll("[data-u]").forEach(function (el) { el.textContent = v[el.dataset.u]; });
  }
  var timer = setInterval(tick, 1000); tick();

  // 2. Barre de progression + bouton « retour en haut »
  var bar = document.querySelector(".progress"), top = document.querySelector(".backtop");
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    if (top) top.classList.toggle("show", h.scrollTop > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // 3. Lien actif dans le menu selon la section visible
  var liens = document.querySelectorAll("nav a[href^='#']");
  if ("IntersectionObserver" in window && liens.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        liens.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { obs.observe(s); });
  }
})();
