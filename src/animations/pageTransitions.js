import gsap from 'gsap';

export function transitionPages(currentElement, onMidpoint, nextSelector) {
  if (!currentElement) {
    if (onMidpoint) onMidpoint();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' }
  });

  tl.to(currentElement, {
    opacity: 0,
    y: -8,
    duration: 0.15,
    onComplete: () => {
      if (onMidpoint) onMidpoint();

      requestAnimationFrame(() => {
        const nextElement = document.querySelector(nextSelector);
        if (nextElement) {
          gsap.fromTo(
            nextElement,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
          );
        }
      });
    }
  });

  return tl;
}

export function animateHeroEntrance() {
  // Silent or minimal
}
