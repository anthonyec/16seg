import inlineSVG from 'inline-svg';

import createSegmentDisplay from '../';

function main() {
  const svg = document.querySelector('svg');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.';
  const curlSequence = ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4'];

  const alphabetDisplays = alphabet.split('').map((letter) => {
    const hideSegments = letter === '.' ? [] : [16];
    const clone = svg.cloneNode(true);
    const display = createSegmentDisplay(clone, { hideSegments });

    document.body.appendChild(clone);

    return display;
  });

  alphabet.split('').forEach((letter, index) => {
    setTimeout(() => {
      alphabetDisplays[index].showSequence([...curlSequence, letter], {
        delay: 50
      });
    }, 80 * index);

  });

  setTimeout(() => {
    alphabetDisplays[alphabet.split('').length - 1].showSequence([' ', '.'], {
      delay: 200,
      loop: true
    });
  }, 80 * alphabet.split('').length);
}

inlineSVG.init({
  svgSelector: 'img.svg',
}, function() {

  main();
});
