/* ============================================================
   Y.A.S Custom Cleaning Services — interactive behaviours
   Mobile-first · Vanilla JS · no dependencies
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 12;
    header.classList.toggle("header--scrolled", scrolled);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mobileMenu");
  var menuLinks = menu ? Array.prototype.slice.call(menu.querySelectorAll(".mobile-menu__link, .mobile-menu__foot a")) : [];

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var firstLink = menu.querySelector(".mobile-menu__link");
      if (firstLink) firstLink.focus({ preventScroll: true });
    } else if (toggle) {
      toggle.focus({ preventScroll: true });
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
    });
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    // Close when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && menu.classList.contains("is-open")) setMenu(false);
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".rev"));
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active nav link ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }
  if ("IntersectionObserver" in window && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });
    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq__item"));
  faqItems.forEach(function (item) {
    var trigger = item.querySelector(".faq__trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherTrigger = other.querySelector(".faq__trigger");
        if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Quote form → WhatsApp ---------- */
  var form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements["name"].value || "").trim();
      var phone = (form.elements["phone"].value || "").trim();
      var service = (form.elements["service"].value || "").trim();
      var message = (form.elements["message"].value || "").trim();

      var valid = true;
      ["name", "phone", "service"].forEach(function (fieldName) {
        var field = form.elements[fieldName];
        var ok = (field.value || "").trim().length > 0;
        var wrap = field.closest(".field");
        if (wrap) wrap.classList.toggle("field--invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;

      var text =
        "Hello Y.A.S! My name is " + name + ".\n" +
        "Phone: " + phone + "\n" +
        "Service needed: " + service + "\n" +
        (message ? "Details: " + message + "\n" : "") +
        "Please get back to me.";

      var url = "https://wa.me/27711790374?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();
