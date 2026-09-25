import gsap from 'gsap';

export function animateResultReveal({
  counterElement,
  targetScore,
  percentageElement,
  targetPercentage,
  statsContainer,
  cardsContainer
}) {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  if (counterElement) {
    const scoreObj = { val: 0 };
    tl.to(
      scoreObj,
      {
        val: targetScore,
        duration: 0.6,
        ease: 'power1.out',
        onUpdate: () => {
          counterElement.innerText = Math.round(scoreObj.val);
        }
      },
      0
    );
  }

  if (percentageElement) {
    const pctObj = { val: 0 };
    tl.to(
      pctObj,
      {
        val: targetPercentage,
        duration: 0.6,
        ease: 'power1.out',
        onUpdate: () => {
          percentageElement.innerText = `${Math.round(pctObj.val)}%`;
        }
      },
      0
    );
  }

  if (statsContainer) {
    const statCards = statsContainer.querySelectorAll('.stat-badge-item');
    if (statCards.length > 0) {
      tl.fromTo(
        statCards,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 },
        0.1
      );
    }
  }

  if (cardsContainer) {
    const reviewCards = cardsContainer.querySelectorAll('.review-card-item');
    if (reviewCards.length > 0) {
      tl.fromTo(
        reviewCards,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.03 },
        0.15
      );
    }
  }

  return tl;
}

export function animateFilterSwitch(containerElement, onFilterApply) {
  if (!containerElement) {
    if (onFilterApply) onFilterApply();
    return;
  }

  gsap.to(containerElement, {
    opacity: 0,
    duration: 0.1,
    ease: 'power1.in',
    onComplete: () => {
      if (onFilterApply) onFilterApply();
      requestAnimationFrame(() => {
        gsap.fromTo(
          containerElement,
          { opacity: 0 },
          { opacity: 1, duration: 0.15, ease: 'power1.out' }
        );
      });
    }
  });
}
