function createSegmentDisplay(svgElement, userOptions = {}) {
  const defaultOptions = { inactiveColor: '#242424', activeColor: '#F73F02', hideSegments: [] };
  const options = { ...defaultOptions, ...userOptions};

  const font = {
    ' ': [],
    '.': [16],
    'A': [0, 1, 2, 3, 4, 5, 9, 13],
    'B': [2, 3, 4, 5, 6, 7, 11, 13, 15],
    'C': [0, 1, 2, 3, 6, 7],
    'D': [2, 3, 4, 5, 6, 7, 11, 15],
    'E': [0, 1, 2, 3, 6, 7, 9],
    'F': [0, 1, 2, 3, 9],
    'G': [0, 1, 2, 3, 5, 6, 7, 13],
    'H': [0, 1, 4, 5, 9, 13],
    'I': [2, 3, 6, 7, 11, 15],
    'J': [0, 4, 5, 6, 7],
    'K': [0, 1, 9, 12, 14],
    'L': [0, 1, 6, 7],
    'M': [0, 1, 4, 5, 10, 12 ],
    'N': [0, 1, 4, 5, 10, 14],
    'O': [0, 1, 2, 3, 4, 5, 6, 7],
    'P': [0, 1, 2, 3, 4, 9, 13],
    'Q': [0, 1, 2, 3, 4, 5, 6, 7, 14],
    'R': [0, 1, 2, 3, 4, 9, 13, 14],
    'R.': [0, 1, 2, 3, 4, 9, 13, 14, 16],
    'S': [2, 3, 5, 6, 7, 10, 13],
    'T': [2, 3, 11, 15],
    'U': [0, 1, 4, 5, 6, 7],
    'V': [0, 1, 8, 12],
    'W': [0, 1, 4, 5, 8, 14],
    'X': [8, 10, 12, 14],
    'Y': [1, 4, 9, 13, 15],
    'Z': [2, 3, 6, 7, 8, 12],
    'CURL1': [0, 1, 2, 10, 11],
    'CURL2': [1, 2, 3, 4, 12, 13],
    'CURL3': [4, 5, 6, 14, 15],
    'CURL4': [0, 5, 6, 7, 8, 9],
  };

  const groups = svgElement.querySelectorAll('g');
  const polygons = Array.from(groups).map((group) => {
    return group.querySelector('polygon') || group.querySelector('circle');
  });

  options.hideSegments.forEach((index) => {
    polygons[index].style.opacity = '0';
  });

  const segmentDisplay = {
    clear: function() {
      polygons.forEach((polygon) => {
        if (polygon) {
          polygon.style.fill = options.inactiveColor;
        }
      });
    },

    show: function(char) {
      const pattern = font[char];

      this.clear();

      pattern.forEach((segIndex) => {
        polygons[segIndex].style.fill = options.activeColor;
      });
    },
    showSequence: function (charSequence, sequenceOptions = { delay: 100, loop: 0 }) {
      let index = 0;
      let interval;

      interval = setInterval(() => {
        const char = charSequence[index];

        this.show(char);

        if (index < charSequence.length - 1) {
          index++;
        } else {
          if (sequenceOptions.loop) {
            index = 0;
          } else {
            clearInterval(interval);
          }
        }

      }, sequenceOptions.delay);
    }
  }

  segmentDisplay.clear();

  return segmentDisplay;
}

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

return;

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

