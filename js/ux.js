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

  // 4. Réglages (js/config.js)
  var C = window.SITE || {};
  var ICONS = {
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    facebook: '<path d="M14 8h2V4h-2.5A3.5 3.5 0 0010 7.5V10H8v4h2v7h4v-7h2.2l.8-4H14V7.8c0-.5.3-.8.8-.8z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    whatsapp: '<path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.200zm4.5-6.1c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 01-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.300 3 3 0 00-.9 2.200c0 1.300.9 2.600 1.100 2.800.1.200 1.900 2.900 4.600 4 1.700.7 2.400.8 3.200.7.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.2-1.200-.1-.2-.3-.2-.5-.3z" fill="currentColor" stroke="none"/>',
    linkedin: '<path d="M4 9h4v11H4zM6 4a2 2 0 110 4 2 2 0 010-4zM10 9h4v1.6c.6-1 1.8-1.8 3.4-1.8 3 0 3.6 2 3.6 4.6V20h-4v-5.8c0-1.4-.2-2.4-1.6-2.4s-1.4 1.3-1.4 2.4V20h-4z" fill="currentColor" stroke="none"/>',
    tiktok: '<path d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5M14 4c.4 2.5 2 4 4.5 4.2"/>',
    youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>'
  };
  var LABELS = { email: "E-mail", facebook: "Facebook", instagram: "Instagram", whatsapp: "WhatsApp", linkedin: "LinkedIn", tiktok: "TikTok", youtube: "YouTube" };
  document.querySelectorAll("[data-socials]").forEach(function (box) {
    Object.keys(ICONS).forEach(function (k) {
      if (!C[k]) return;
      var a = document.createElement("a");
      a.href = k === "email" ? "mailto:" + C[k] : k === "whatsapp" ? "https://wa.me/" + C[k] : C[k];
      if (k !== "email") { a.target = "_blank"; a.rel = "noopener"; }
      a.setAttribute("aria-label", LABELS[k]); a.title = LABELS[k];
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[k] + '</svg>';
      box.appendChild(a);
    });
  });

  // 5. Formulaire d'inscription
  var f = document.getElementById("reg-form");
  var st = document.getElementById("form-status");
  document.querySelectorAll("[data-intent]").forEach(function (a) {
    a.addEventListener("click", function () {
      var sel = document.getElementById("f-intention");
      if (sel) sel.value = a.dataset.intent;
    });
  });
  if (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.website.value) return; // anti-spam
      var d = { nom: f.nom.value.trim(), tel: f.tel.value.trim(), email: f.email.value.trim(),
                profil: f.profil.value, intention: f.intention.value, message: f.message.value.trim() };
      var wa = "https://wa.me/" + (C.whatsapp || "22892604260") + "?text=" + encodeURIComponent(
        "Bonjour, je souhaite : " + d.intention + " (Date Entrepreneur, 19 d\u00e9cembre 2026).\n" +
        "Nom : " + d.nom + "\nT\u00e9l\u00e9phone : " + d.tel + (d.email ? "\nE-mail : " + d.email : "") +
        "\nProfil : " + d.profil + (d.message ? "\nMessage : " + d.message : ""));
      var btn = f.querySelector("button[type=submit]");
      if (C.formEndpoint) {
        btn.disabled = true; st.className = "form-status"; st.textContent = "Envoi en cours\u2026";
        fetch(C.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw new Error(); st.className = "form-status ok"; st.textContent = "Merci " + d.nom + " ! Votre demande est bien envoy\u00e9e, nous vous r\u00e9pondons rapidement."; f.reset(); })
          .catch(function () { st.className = "form-status err"; st.innerHTML = 'Envoi impossible pour le moment. <a href="' + wa + '" target="_blank" rel="noopener">\u00c9crivez-nous sur WhatsApp</a>.'; })
          .finally(function () { btn.disabled = false; });
      } else {
        window.open(wa, "_blank", "noopener");
        st.className = "form-status ok"; st.textContent = "Votre message est pr\u00eat dans WhatsApp : appuyez sur \u00ab Envoyer \u00bb pour finaliser votre demande.";
      }
    });
  }
})();
