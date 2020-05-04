# 16seg

![Animated preview showing 16 seg displays showing the alphabet](preview.gif)

_Preview of what this repo does. Inspired by [Da Sul's Dribbble post](https://dribbble.com/shots/6717324-16-segment-display)._

## Setup
This repo uses [Parcel](https://github.com/parcel-bundler/parcel/) to bundle all the files and [InvlineSVG](https://github.com/jonnyhaynes/inline-svg#readme) to inline SVG markup in the examples.

Run the following commands and open the localhost URL Parcel provides in the CLI.
```sh
$ npm i
```

```sh
$ npm start
```

## How to use
### Static
```js
// Add the `16seg.svg` to your markup
// and select it.
const svg = document.querySelector('svg');

// Create the display passing in the SVG.
const display = createSegmentDisplay(svg);

// Show a letter on the display!
display.show('A');
```
### Animated
```js
const svg = document.querySelector('svg');

// Pass in optional options.
const display = createSegmentDisplay(svg, {
  loop: true,
  delay: 100,
});

// Ta-da!
display.showSequence(['A', 'B', 'C']);
```

## How it works
### The SVG file
The `16seg.svg` file contains all the segments as SVG polygons. Each polygon in the SVG is in a specifc order.

### Font
A `font` is a key value map of characters and an array of numbers that say which segment should be highlighted. The current font is built in.

```js
const font = {
  'A': [0, 1, 2, 3, 4, 5, 9, 13],
  'B': [2, 3, 4, 5, 6, 7, 11, 13, 15],
  'C': [0, 1, 2, 3, 6, 7]
  //...
}
```

It can also contain arbitrary strings that represent certain segment configurations.


```js
const font = {
   //...
  'CURL1': [0, 1, 2, 10, 11],
  'CURL2': [1, 2, 3, 4, 12, 13],
  'CURL3': [4, 5, 6, 14, 15],
  'CURL4': [0, 5, 6, 7, 8, 9],
  //...
}
```
