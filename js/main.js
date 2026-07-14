// Friends Cafe & Shisha - Interaktion und Effekte

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

  // ---- Header kompakter beim Scrollen + Zurueck-nach-oben ----
  var header = document.querySelector(".site-header");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // ---- Gestaffeltes Reveal fuer Kartenraster ----
  ["usp-grid", "steps", "flavor-grid", "cocktail-grid", "gallery", "review-grid"].forEach(function (cls) {
    document.querySelectorAll("." + cls).forEach(function (grid) {
      grid.classList.remove("reveal", "visible");
      Array.prototype.forEach.call(grid.children, function (child, i) {
        child.classList.add("reveal");
        child.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
      });
    });
  });

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

  // ---- Bewertung hochzaehlen ----
  var rating = document.getElementById("ratingScore");
  if (rating && "IntersectionObserver" in window) {
    var counted = false;
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !counted) {
          counted = true;
          var target = parseFloat(rating.getAttribute("data-target") || "0");
          var dur = 1000, start = null;
          function tick(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            rating.textContent = (target * p).toFixed(1).replace(".", ",");
            if (p < 1) requestAnimationFrame(tick);
            else rating.textContent = target.toFixed(1).replace(".", ",");
          }
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.6 });
    rObs.observe(rating);
  }

  // ---- Scroll-Spy fuer die Navigation ----
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a"));
  var idToLink = {};
  navLinks.forEach(function (a) {
    var h = a.getAttribute("href");
    if (h && h.charAt(0) === "#" && h.length > 1) idToLink[h.slice(1)] = a;
  });
  var spyTargets = Object.keys(idToLink).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (spyTargets.length && "IntersectionObserver" in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("active"); });
          if (idToLink[e.target.id]) idToLink[e.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    spyTargets.forEach(function (s) { spyObs.observe(s); });
  }

  // ---- Oeffnungs-Status ----
  // Schluss > 24 bedeutet nach Mitternacht (z.B. 25 = 01:00). Tag: 0=So .. 6=Sa
  var HOURS = { 0: [14, 24], 1: [15, 25], 2: [15, 25], 3: [15, 25], 4: [15, 25], 5: [15, 26], 6: [15, 26] };
  function isOpen(d) {
    var day = d.getDay();
    var now = d.getHours() + d.getMinutes() / 60;
    var t = HOURS[day];
    if (now >= t[0] && now < t[1]) return true;
    var y = HOURS[(day + 6) % 7];
    if (y[1] > 24 && now < (y[1] - 24)) return true;
    return false;
  }
  var openNow = isOpen(new Date());
  var badge = document.getElementById("openStatus");
  if (badge) {
    badge.hidden = false;
    badge.textContent = openNow ? "Jetzt geöffnet" : "Zurzeit geschlossen";
    badge.classList.add(openNow ? "open" : "closed");
  }
  var heroOpen = document.getElementById("heroOpen");
  if (heroOpen) heroOpen.textContent = openNow ? "Jetzt geöffnet" : "Geschlossen";

  // ---- FAQ Akkordeon ----
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var answer = q.nextElementSibling;
      var isOpenItem = item.classList.toggle("open");
      answer.style.maxHeight = isOpenItem ? answer.scrollHeight + "px" : null;
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
    var lbCaption = document.getElementById("lbCaption");
    var galleryImgs = Array.prototype.slice.call(document.querySelectorAll(".gallery-item img"));
    var current = 0, touchX = null;

    function showImage(i) {
      current = (i + galleryImgs.length) % galleryImgs.length;
      var img = galleryImgs[current];
      lbImage.src = img.getAttribute("src");
      lbImage.alt = img.getAttribute("alt") || "";
      if (lbCaption) lbCaption.textContent = img.getAttribute("alt") || "";
    }
    function openLightbox(i) {
      showImage(i);
      lightbox.hidden = false;
      requestAnimationFrame(function () { lightbox.classList.add("open"); });
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
      setTimeout(function () { lightbox.hidden = true; }, 250);
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
    lightbox.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (dx > 45) showImage(current - 1);
      else if (dx < -45) showImage(current + 1);
      touchX = null;
    }, { passive: true });
  }

  // ---- Finde deine Sorte ----
  var finder = document.getElementById("finderWidget");
  if (finder) {
    var RECS = {
      fruchtig:  { eis: ["Watermelon", "Wassermelone Eis"],   pur: ["Hawaii", "Ananas Mango Maracuja"] },
      minzig:    { eis: ["Lime King", "Zitrone Limette Minze"], pur: ["Nana", "Minze"] },
      cremig:    { eis: ["Ice Bear", "Ice Bon Bon"],           pur: ["Pistacio Cream", "Pistazie Vanilleeis"] },
      klassisch: { eis: ["Apple25", "Doppel Apfel"],           pur: ["Faloom Gum", "Türkischer Kaugummi"] }
    };
    var chosenCat = null;
    var stepEls = Array.prototype.slice.call(finder.querySelectorAll(".finder-step"));
    function showStep(name) {
      stepEls.forEach(function (el) {
        var match = el.getAttribute("data-step") === String(name);
        if (match) {
          el.hidden = false;
          el.classList.remove("in");
          void el.offsetWidth; // Reflow, damit die Animation neu startet
          el.classList.add("in");
        } else {
          el.hidden = true;
        }
      });
    }
    finder.querySelectorAll("[data-cat]").forEach(function (b) {
      b.addEventListener("click", function () { chosenCat = b.getAttribute("data-cat"); showStep(2); });
    });
    finder.querySelectorAll("[data-mod]").forEach(function (b) {
      b.addEventListener("click", function () {
        var rec = RECS[chosenCat][b.getAttribute("data-mod")];
        showStep("loading");
        setTimeout(function () {
          document.getElementById("finderSwatch").className = "finder-swatch cat-" + chosenCat + "-bg";
          document.getElementById("finderName").textContent = rec[0];
          document.getElementById("finderDesc").textContent = rec[1];
          showStep(3);
        }, 850);
      });
    });
    document.getElementById("finderToKarte").addEventListener("click", function () {
      if (chosenCat) applyFilter(chosenCat);
    });
    document.getElementById("finderRestart").addEventListener("click", function () {
      chosenCat = null;
      showStep(1);
    });
  }
})();
