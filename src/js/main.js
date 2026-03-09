/* ═══════════════════════════════════════════
   Main JS
   ═══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Sticky header scroll state ──
  const header = document.getElementById("site-header");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = y;
    },
    { passive: true }
  );

  // ── Mobile nav toggle ──
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);

      // Animate hamburger → X
      const bars = toggle.querySelectorAll(".nav-toggle-bar");
      if (open) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        bars[0].style.transform = "";
        bars[1].style.opacity = "";
        bars[2].style.transform = "";
      }
    });

    // Close nav on link click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        const bars = toggle.querySelectorAll(".nav-toggle-bar");
        bars[0].style.transform = "";
        bars[1].style.opacity = "";
        bars[2].style.transform = "";
      });
    });
  }

  // ── Scroll-triggered animations ──
  const animatedEls = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ── Smooth scroll for anchor links (fallback for Safari) ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, null, id);
      }
    });
  });
});
