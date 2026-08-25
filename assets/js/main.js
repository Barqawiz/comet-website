/* Small, dependency-free behaviour: keep the hero loop from playing off screen,
   and never let two captures play at once. */
(function () {
  'use strict';

  var hero = document.querySelector('.device video');

  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { hero.play().catch(function () {}); }
        else { hero.pause(); }
      });
    }, { threshold: 0.15 }).observe(hero);
  }

  document.querySelectorAll('.reel video').forEach(function (v) {
    v.addEventListener('play', function () {
      document.querySelectorAll('.reel video').forEach(function (other) {
        if (other !== v) { other.pause(); }
      });
      if (hero) { hero.pause(); }
    });
  });
}());
