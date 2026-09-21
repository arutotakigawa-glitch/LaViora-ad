(function () {
  const viewed = new Set();
  const emit = (event, params = {}) => {
    const detail = {
      event,
      page_id: "laviora_story",
      page_version: "20260921-first-esthetic-v2",
      experiment_id: "none",
      variant: "skin-story-v2",
      ...params,
    };
    window.dispatchEvent(new CustomEvent("laviora:measurement", { detail }));
    if (window.lavioraAnalyticsConsent === true) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(detail);
    }
  };
  const once = (name, params = {}) => {
    if (!viewed.has(name)) {
      viewed.add(name);
      emit(name, params);
    }
  };
  const pageView = () => {
    if (document.visibilityState === "visible") once("ViewContent");
  };
  pageView();
  document.addEventListener("visibilitychange", pageView);
  const click = (e) => {
    const link = e.target?.closest("a[data-cta]");
    if (!link) return;
    const params = {
      cta_position: link.dataset.cta,
      click_id: crypto.randomUUID(),
      destination: "official_line",
      label_id: "service_price",
    };
    emit("cta_click", params);
    emit("line_outbound_intent", params);
  };
  document.addEventListener("click", click);
  const protectedCaseImage = (target) => target?.closest?.(".case-media");
  document.addEventListener("dragstart", (event) => {
    if (protectedCaseImage(event.target)) event.preventDefault();
  });
  document.addEventListener("contextmenu", (event) => {
    if (protectedCaseImage(event.target)) event.preventDefault();
  });
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) once("ba_reached");
    },
    { threshold: 0.25 },
  );
  const first = document.querySelector('.hero-comparison') || document.querySelector('[data-case="1"]');
  if (first) observer.observe(first);
  const sticky = document.getElementById("sticky-cta");
  const stickyObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (sticky)
        sticky.hidden = !(e.boundingClientRect.bottom < 0 && !e.isIntersecting);
    },
    { threshold: 0 },
  );
  const hero = document.getElementById("hero-cta");
  if (hero) stickyObserver.observe(hero);
  const disclosure = (e) => {
    const el = e.target;
    if (el.open)
      emit("disclosure_open", { disclosure_id: el.dataset.disclosure });
  };
  const details = document.querySelectorAll("details[data-disclosure]");
  details.forEach((el) => el.addEventListener("toggle", disclosure));
  document.querySelectorAll(".swipe-gallery").forEach((gallery) => {
    const slides = [...gallery.children];
    const previous = document.querySelector(
      '[data-gallery-prev="' + gallery.id + '"]',
    );
    const next = document.querySelector(
      '[data-gallery-next="' + gallery.id + '"]',
    );
    const count = document.querySelector(
      '[data-gallery-count="' + gallery.id + '"]',
    );
    let index = 0;
    const update = () => {
      const left = gallery.getBoundingClientRect().left;
      index = slides.reduce(
        (best, slide, i) =>
          Math.abs(slide.getBoundingClientRect().left - left) <
          Math.abs(slides[best].getBoundingClientRect().left - left)
            ? i
            : best,
        0,
      );
      if (count) count.textContent = index + 1 + " / " + slides.length;
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
    };
    const move = (delta) => {
      const target =
        slides[Math.max(0, Math.min(slides.length - 1, index + delta))];
      gallery.scrollBy({
        left:
          target.getBoundingClientRect().left -
          gallery.getBoundingClientRect().left,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    };
    previous?.addEventListener("click", () => move(-1));
    next?.addEventListener("click", () => move(1));
    gallery.addEventListener("scroll", update, { passive: true });
    gallery.addEventListener("keydown", (event) => {
      if (event.target !== gallery) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    });
    window.addEventListener("resize", update);
    update();
  });
})();
