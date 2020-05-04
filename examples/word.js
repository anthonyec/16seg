import inlineSVG from 'inline-svg';

import createSegmentDisplay from '../';

function main() {
  const masterSvg = document.querySelector('svg');
  const svgs = [masterSvg];

  for (let index = 0; index < 4; index++) {
    const clone = masterSvg.cloneNode(true);
    document.body.appendChild(clone);
    svgs.push(clone);
  }

  const sequences = [
    ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'O'],
    ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'N'],
    ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'A'],
    ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'I'],
    ['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'R']
  ];

  const endSequenceForR = ['R', 'R.'];
  const displays = [];

  svgs.forEach((svg, index) => {
    const display = createSegmentDisplay(svg, {
      inactiveColor: '#242424',
      activeColor: '#F73F02',
      hideSegments: index === 4 ? [] : [16]
    });

    displays.push(display);

    setTimeout(() => {
      display.showSequence(sequences[index], {
        delay: 80
      });
    }, 200 * index);

    if (index !== svgs.length - 1) {
      return;
    }

    setTimeout(() => {
      display.showSequence(endSequenceForR, {
        delay: 400,
        loop: true
      });
    }, (200 * svgs.length) + 500);
  });

  setTimeout(() => {
    displays.forEach((display, index) => {
      setTimeout(() => {
        display.showSequence(['CURL1', 'CURL2', 'CURL3', 'CURL4', 'CURL1', 'CURL2', 'CURL3', 'CURL4', ' ']);
      }, 200 * index);
    });
  }, 5000);
}

inlineSVG.init({
  svgSelector: 'img.svg',
}, function() {
  main();
});
