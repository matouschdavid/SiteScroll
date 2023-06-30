processSlideIn();
processAddClassWhenVisible();

function processSlideIn() {
  const elementsToAnimate = document.querySelectorAll("[slide-up]");
  for (const element of elementsToAnimate) {
    element.classList.add("invisible");
    element.dataset.whenVisible = "slide-in";
  }
}

function processAddClassWhenVisible() {
  const elementsToAnimate = document.querySelectorAll("[data-when-visible]");
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      requestIdleCallback(() => {
        for (const entry of entries) {
          const elem = entry.target;
          if (entry.isIntersecting) {
            if (!elem.classList.contains(elem.dataset.whenVisible)) {
              const delay = elem.dataset.delay || 0;
              setTimeout(() => {
                elem.classList.add(elem.dataset.whenVisible);
              }, delay);
            }
          } else {
            elem.classList.remove(elem.dataset.whenVisible);
          }
        }
      });
    },
    { threshold: 0.5, rootMargin: "400px 0px 0px 0px" }
  );

  for (const element of elementsToAnimate) {
    intersectionObserver.observe(element);
  }
}
