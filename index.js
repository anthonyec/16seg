function createSegmentDisplay(svgElement, userOptions = {}) {
  const defaultOptions = { inactiveColor: 'grey', activeColor: 'red' };
  const options = { ...defaultOptions, ...userOptions};

  const font = {
    'A': [0, 1, 2, 3, 4, 5, 9, 13],
    'B': [2, 3, 4, 5, 6, 7, 11, 13, 15],
    'I': [2, 3, 6, 7, 11, 15],
    'N': [0, 1, 4, 5, 10, 14],
    'O': [0, 1, 2, 3, 4, 5, 6, 7],
    'R': [0, 1, 2, 3, 4, 9, 13, 14],
    'CURL1': [0, 1, 2, 10, 11],
    'CURL2': [1, 2, 3, 4, 12, 13],
    'CURL3': [4, 5, 6, 14, 15],
    'CURL4': [0, 5, 6, 7, 8, 9],
  };

  const groups = svgElement.querySelectorAll('g');
  const polygons = Array.from(groups).map((group) => {
    return group.querySelector('polygon');
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

      setInterval(() => {
        const char = charSequence[index];

        this.show(char);

        if (index < charSequence.length - 1) {
          index++;
        }

        if (sequenceOptions.loop) {
          index = 0;
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

svgs.forEach((svg, index) => {
  const display = createSegmentDisplay(svg, {
    inactiveColor: '#323132',
    activeColor: '#FBAE17'
  });

  setTimeout(() => {
    display.showSequence(sequences[index], {
      delay: 80
    });
  }, 100 * index)
});

