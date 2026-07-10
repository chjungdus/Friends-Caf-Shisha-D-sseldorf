// Friends Cafe & Shisha - Navigation, Scroll-Reveal und FAQ

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
    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }
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
  var questions = document.querySelectorAll(".faq-q");
  questions.forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var answer = q.nextElementSibling;
      var isOpen = item.classList.toggle("open");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });
})();
