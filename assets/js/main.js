/* The only script on the site: never let two clips play at once. */
(function () {
  'use strict';

  var clips = document.querySelectorAll('.reel video');

  clips.forEach(function (clip) {
    clip.addEventListener('play', function () {
      clips.forEach(function (other) {
        if (other !== clip) { other.pause(); }
      });
    });
  });
}());
