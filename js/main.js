// Friends Cafe & Shisha - Navigation, Reveal, FAQ, Filter, Lightbox, Finder

(function () {
  "use strict";

  // ---- Mobiles Menue ----
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  function closeMenu() {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  // ---- Scroll-Reveal ----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---- FAQ Akkordeon ----
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var answer = q.nextElementSibling;
      var isOpen = item.classList.toggle("open");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  // ---- Shisha Filter ----
  var filterBtns = document.querySelectorAll(".filter-btn");
  var flavorCards = document.querySelectorAll(".flavor-card");
  function applyFilter(cat) {
    filterBtns.forEach(function (b) {
      var active = b.getAttribute("data-filter") === cat;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    flavorCards.forEach(function (card) {
      var cats = card.getAttribute("data-cats") || "";
      var show = cat === "all" || cats.split(" ").indexOf(cat) !== -1;
      card.classList.toggle("hidden", !show);
    });
  }
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () { applyFilter(b.getAttribute("data-filter")); });
  });

  // ---- Galerie Lightbox ----
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImage = document.getElementById("lbImage");
    var galleryImgs = Array.prototype.slice.call(document.querySelectorAll(".gallery-item img"));
    var current = 0;

    function showImage(i) {
      current = (i + galleryImgs.length) % galleryImgs.length;
      var img = galleryImgs[current];
      lbImage.src = img.getAttribute("src");
      lbImage.alt = img.getAttribute("alt") || "";
    }
    function openLightbox(i) {
      showImage(i);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }
    galleryImgs.forEach(function (img, i) {
      img.addEventListener("click", function () { openLightbox(i); });
    });
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", function () { showImage(current - 1); });
    document.getElementById("lbNext").addEventListener("click", function () { showImage(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showImage(current - 1);
      else if (e.key === "ArrowRight") showImage(current + 1);
    });
  }

  // ---- Finde deine Sorte ----
  var finder = document.getElementById("finderWidget");
  if (finder) {
    var RECS = {
      fruchtig:  { eis: ["watermelon", "Watermelon", "Wassermelone Eis"],   pur: ["hawaii", "Hawaii", "Ananas Mango Maracuja"] },
      minzig:    { eis: ["lime-king", "Lime King", "Zitrone Limette Minze"], pur: ["nana", "Nana", "Minze"] },
      cremig:    { eis: ["ice-bear", "Ice Bear", "Ice Bon Bon"],             pur: ["pistacio-cream", "Pistacio Cream", "Pistazie Vanilleeis"] },
      klassisch: { eis: ["apple25", "Apple25", "Doppel Apfel"],             pur: ["faloom-gum", "Faloom Gum", "Türkischer Kaugummi"] }
    };
    var chosenCat = null;
    var steps = {
      1: finder.querySelector('[data-step="1"]'),
      2: finder.querySelector('[data-step="2"]'),
      3: finder.querySelector('[data-step="3"]')
    };
    function goStep(n) {
      for (var k in steps) steps[k].hidden = (String(n) !== k);
    }
    finder.querySelectorAll('[data-cat]').forEach(function (b) {
      b.addEventListener("click", function () { chosenCat = b.getAttribute("data-cat"); goStep(2); });
    });
    finder.querySelectorAll('[data-mod]').forEach(function (b) {
      b.addEventListener("click", function () {
        var rec = RECS[chosenCat][b.getAttribute("data-mod")];
        document.getElementById("finderSwatch").className = "finder-swatch cat-" + chosenCat + "-bg";
        document.getElementById("finderName").textContent = rec[1];
        document.getElementById("finderDesc").textContent = rec[2];
        goStep(3);
      });
    });
    document.getElementById("finderToKarte").addEventListener("click", function () {
      if (chosenCat) applyFilter(chosenCat);
    });
    document.getElementById("finderRestart").addEventListener("click", function () {
      chosenCat = null;
      goStep(1);
    });
  }
})();
