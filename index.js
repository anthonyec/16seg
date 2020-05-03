function createSegmentDisplay(svgElement, userOptions = {}) {
  const defaultOptions = { inactiveColor: 'grey', activeColor: 'red', hideSegments: [] };
  const options = { ...defaultOptions, ...userOptions};

  const font = {
    ' ': [],
    'A': [0, 1, 2, 3, 4, 5, 9, 13],
    'B': [2, 3, 4, 5, 6, 7, 11, 13, 15],
    'I': [2, 3, 6, 7, 11, 15],
    'N': [0, 1, 4, 5, 10, 14],
    'O': [0, 1, 2, 3, 4, 5, 6, 7],
    'R': [0, 1, 2, 3, 4, 9, 13, 14],
    'R.': [0, 1, 2, 3, 4, 9, 13, 14, 16],
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
    inactiveColor: '#111111',
    activeColor: '#FBAE17',
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

