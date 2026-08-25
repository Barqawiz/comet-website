/* Small, dependency-free behaviour: a screenshot lightbox and a hero video
   that does not keep playing while it is off screen. */
(function () {
  'use strict';

  /* ---- lightbox ---- */
  var box = document.getElementById('lightbox');
  if (box) {
    var img = box.querySelector('img');
    var closeBtn = box.querySelector('.close');

    document.querySelectorAll('#gallery button[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var inner = btn.querySelector('img');
        img.src = btn.getAttribute('data-full');
        img.alt = inner ? inner.alt : '';
        if (typeof box.showModal === 'function') { box.showModal(); }
        else { box.setAttribute('open', ''); }
      });
    });

    var close = function () {
      if (typeof box.close === 'function') { box.close(); } else { box.removeAttribute('open'); }
      img.src = '';
    };
    closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
  }

  /* ---- pause the hero loop when it scrolls away ---- */
  var hero = document.querySelector('.device video');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { hero.play().catch(function () {}); }
        else { hero.pause(); }
      });
    }, { threshold: 0.15 }).observe(hero);
  }

  /* ---- one reel at a time ---- */
  document.querySelectorAll('.reel video').forEach(function (v) {
    v.addEventListener('play', function () {
      document.querySelectorAll('.reel video').forEach(function (other) {
        if (other !== v) { other.pause(); }
      });
      if (hero) { hero.pause(); }
    });
  });
}());
