// Date Entrepreneur — animations GSAP (légères)
window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return; // sans GSAP, le site reste lisible
  // Si le système demande moins de mouvement : fondu seul, sans déplacement
  const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const M = calme ? 0 : 1;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Entrée du hero
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero .eyebrow", { y: 20 * M, opacity: 0, duration: .6 })
    .from(".hero h1", { y: 40 * M, opacity: 0, duration: .9 }, "-=.3")
    .from(".hero .lead", { y: 30 * M, opacity: 0, duration: .7 }, "-=.5")
    .from(".hero .actions .btn", { y: 20 * M, opacity: 0, duration: .5, stagger: .12 }, "-=.4")
    .from(".infos div", { y: 30 * M, opacity: 0, duration: .6, stagger: .1 }, "-=.3");

  // 2. Apparition au scroll : titres, textes, affiches
  gsap.utils.toArray(".section h2, .banner h2, .section .eyebrow, .poster").forEach((el) => {
    gsap.from(el, {
      y: 40 * M, opacity: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  // 3. Cartes, tags, chiffres : apparition en cascade par groupe
  ["card", "tags li", "stats div"].forEach((sel) => {
    const s = sel.startsWith("card") ? ".grid .card" : sel.startsWith("tags") ? ".tags li" : ".stats div";
    const groupes = new Set(gsap.utils.toArray(s).map((e) => e.parentElement));
    groupes.forEach((parent) => {
      gsap.from(parent.querySelectorAll(":scope > *"), {
        y: 40 * M, opacity: 0, duration: .7, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: parent, start: "top 85%", once: true }
      });
    });
  });

  // 4. Programme : les lignes arrivent de la gauche
  gsap.from(".timeline li", {
    x: -30 * M, opacity: 0, duration: .5, stagger: .06, ease: "power2.out",
    scrollTrigger: { trigger: ".timeline", start: "top 80%", once: true }
  });

  // 5. Légère profondeur sur les affiches
  if (!calme) gsap.utils.toArray(".poster img").forEach((img) => {
    gsap.fromTo(img, { yPercent: -3 }, {
      yPercent: 3, ease: "none",
      scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true }
    });
  });


  // 7. Illustrations : fil jaune qui se trace, silhouettes qui montent, ampoule qui flotte
  if (!calme) {
    gsap.from(".line-draw", { strokeDashoffset: 1, duration: 1.8, ease: "power2.inOut",
      scrollTrigger: { trigger: ".people-art", start: "top 80%", once: true } });
    gsap.from(".person", { y: 40, opacity: 0, duration: .8, stagger: .15, ease: "power3.out",
      scrollTrigger: { trigger: ".people-art", start: "top 80%", once: true } });
    gsap.to(".hero-art .bulb", { y: -12, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(".hero-art .glow", { opacity: .55, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }

  // 6. Ferme le menu mobile après un clic
  document.querySelectorAll("nav a").forEach((a) =>
    a.addEventListener("click", () => (document.getElementById("menu-toggle").checked = false))
  );
});
