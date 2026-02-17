document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    if (!track || !prev || !next) return;

    const gap = 16;
    function cardWidth(){
      const card = track.querySelector('.card');
      return card ? Math.round(card.getBoundingClientRect().width) + gap : 300;
    }

    prev.addEventListener('click', () => {
      track.scrollBy({left: -cardWidth(), behavior: 'smooth'});
    });
    next.addEventListener('click', () => {
      track.scrollBy({left: cardWidth(), behavior: 'smooth'});
    });

    // Close keyboard control: left/right arrows
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev.click();
      if (e.key === 'ArrowRight') next.click();
    });

    // Make carousel focusable for keyboard use
    carousel.setAttribute('tabindex', '0');
  });
});
