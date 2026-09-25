import gsap from 'gsap';

export function animateQuestionChange(containerElement, direction, onMidpoint) {
  if (!containerElement) {
    if (onMidpoint) onMidpoint();
    return;
  }

  const exitX = direction === 'next' ? -15 : 15;
  const enterX = direction === 'next' ? 15 : -15;

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' }
  });

  tl.to(containerElement, {
    opacity: 0,
    x: exitX,
    duration: 0.12,
    onComplete: () => {
      if (onMidpoint) onMidpoint();

      requestAnimationFrame(() => {
        gsap.fromTo(
          containerElement,
          { opacity: 0, x: enterX },
          { opacity: 1, x: 0, duration: 0.16, ease: 'power2.out' }
        );
      });
    }
  });

  return tl;
}

export function animateAnswerSelect() {
  // Rely on native CSS active states for natural feel
}

export function animateProgressBar(barElement, targetPercentage) {
  if (!barElement) return;

  gsap.to(barElement, {
    width: `${targetPercentage}%`,
    duration: 0.25,
    ease: 'power2.out'
  });
}
