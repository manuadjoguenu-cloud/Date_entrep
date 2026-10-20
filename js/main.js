// Date Entrepreneur — animations GSAP (légères)
window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return; // sans GSAP, le site reste lisible
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Entrée du hero
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero .eyebrow", { y: 20, opacity: 0, duration: .6 })
    .from(".hero h1", { y: 40, opacity: 0, duration: .9 }, "-=.3")
    .from(".hero .lead", { y: 30, opacity: 0, duration: .7 }, "-=.5")
    .from(".hero .actions .btn", { y: 20, opacity: 0, duration: .5, stagger: .12 }, "-=.4")
    .from(".infos div", { y: 30, opacity: 0, duration: .6, stagger: .1 }, "-=.3");

  // 2. Apparition au scroll : titres, textes, affiches
  gsap.utils.toArray(".section h2, .banner h2, .eyebrow:not(.hero .eyebrow), .poster").forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  // 3. Cartes, tags, chiffres : apparition en cascade par groupe
  [".grid .card", ".tags li", ".stats div"].forEach((s) => {
    const groupes = new Set(gsap.utils.toArray(s).map((e) => e.parentElement));
    groupes.forEach((parent) => {
      gsap.from(parent.querySelectorAll(":scope > *"), {
        y: 40, opacity: 0, duration: .7, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: parent, start: "top 85%", once: true }
      });
    });
  });

  // 4. Programme : les lignes arrivent de la gauche
  gsap.from(".timeline li", {
    x: -30, opacity: 0, duration: .5, stagger: .06, ease: "power2.out",
    scrollTrigger: { trigger: ".timeline", start: "top 80%", once: true }
  });

  // 5. Légère profondeur sur les affiches
  gsap.utils.toArray(".poster img").forEach((img) => {
    gsap.fromTo(img, { yPercent: -3 }, {
      yPercent: 3, ease: "none",
      scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // 6. Ferme le menu mobile après un clic
  document.querySelectorAll("nav a").forEach((a) =>
    a.addEventListener("click", () => (document.getElementById("menu-toggle").checked = false))
  );
});