window.addEventListener('load', () => { window.complete = true; });

let cursor;
const keyDirections = Array(4).fill(0);

const bg = {
  xPos: 0,
  yPos: 0,
  hToWRatio: 0.4,
  wheelDistanceUnit: 1.4,
  wheelThrottleMs: 40,
  tapDistanceUnit: 1.4,
  tapThrottleMs: 120,
  dragDistanceUnit: 1,
  dragThrottleMs: 120,
  keyDistanceUnit: 1,
  keyThrottleMs: 50,
};

const components = {
  isInFrame: (el, deltas) => {
    const offset = [Math.max(1000, 5 * Math.abs(deltas[0])),
      Math.max(1000 * bg.hToWRatio, 5 * Math.abs(deltas[1]))];

    const frameTopLeft = [bg.xPos, bg.yPos];
    const elTrueTopLeft = [el.dataset.left * bg.width, el.dataset.top * bg.width * bg.hToWRatio];
    const elTopLeft = [elTrueTopLeft[0] - offset[0], elTrueTopLeft[1] - offset[1]];
    const frameBottomRight = [
      frameTopLeft[0] + window.innerWidth,
      frameTopLeft[1] + window.innerHeight,
    ];
    const elBottomRight = [
      elTrueTopLeft[0] + el.clientWidth + offset[0],
      elTrueTopLeft[1] + el.clientHeight + offset[1],
    ];

    const tooLow = elTopLeft[0] > frameBottomRight[0] || elTopLeft[1] > frameBottomRight[1];
    const tooHigh = elBottomRight[0] < frameTopLeft[0] || elBottomRight[1] < frameTopLeft[1];

    return !(tooLow || tooHigh);
  },
  scrollElement: (el) => {
    switch (el.dataset.id) {
      case '1':
        components.repositionComponent(el, {
          x: (x) => x * 1.05,
          y: (y) => y * 1.15,
        });
        break;
      case '2':
        components.repositionComponent(el, {
          x: (x) => x * 0.952,
          y: (y) => y * 0.870,
        });
        break;
      case '3':
        components.repositionComponent(el, {
          x: (x) => x * 0.4,
          y: (y) => y,
        });
        break;
      case '12':
        components.repositionComponent(el, {
          x: (x) => x * 1.2,
          y: (y) => y,
        });
        break;
      default:
        components.repositionComponent(el);
    }
  },
  scrollSubElement: (el) => {
    const elem = el;
    switch (el.dataset.id) {
      case '4':
        components.repositionComponent(el, {
          x: (x) => {
            const nx = x / bg.width;
            return (-30.65 * (nx ** 4) + 20.6 * (nx ** 3)
              - 3.742 * (nx ** 2) + 0.2623 * nx + 0.06709) * bg.width;
          },
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            const ny = y / bgHeight;
            return (-283.4 * (ny ** 4) + 187.2 * (ny ** 3)
              - 35.6 * (ny ** 2) + 1.279 * ny + 0.1226) * bgHeight;
          },
          override: true,
        });
        break;
      case '5':
        components.repositionComponent(el, {
          x: (x) => (0.09406 * Math.sin(7.411 * (x / bg.width) + 1.062) + 0.03684) * bg.width,
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            return (0.03476 * Math.sin(29.64 * (y / bgHeight) + 0.8934) + 0.1235) * bgHeight;
          },
          override: true,
        });
        break;
      case '6':
        components.repositionComponent(el, {
          x: (x) => {
            const nx = x / bg.width;
            return (-16.34 * (nx ** 4) + 10.91 * (nx ** 3)
              - 2.176 * (nx ** 2) + 0.4579 * nx + 0.02161) * bg.width;
          },
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            return (0.04238 * Math.sin(16.05 * (y / bgHeight) + 4.234) + 0.1539) * bgHeight;
          },
          override: true,
        });
        break;
      case '7':
        components.repositionComponent(el, {
          x: (x) => (0.02106 * Math.sin(17.3 * (x / bg.width) + 4.838) + 0.09428) * bg.width,
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            const ny = y / bgHeight;
            return (-17.96 * (ny ** 4) + 13.75 * (ny ** 3)
              - 3.219 * (ny ** 2) + 0.6572 * ny + 0.007435) * bgHeight;
          },
          override: true,
        });
        break;
      case '8':
        components.repositionComponent(el, {
          x: (x) => {
            const nx = x / bg.width;
            return (-1.205 * (nx ** 3) + 1.852 * (nx ** 2) - 0.7283 * nx + 0.1289) * bg.width;
          },
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            const ny = y / bgHeight;
            return (-43.74 * (ny ** 4) + 77.09 * (ny ** 3)
              - 47.93 * (ny ** 2) + 12.25 * ny - 0.9267) * bgHeight;
          },
          override: true,
        });
        break;
      case '9':
        components.repositionComponent(el, {
          x: (x) => {
            const nx = x / bg.width;
            return (-0.9066 * (nx ** 2) + 0.8117 * nx - 0.0611) * bg.width;
          },
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            return (0.6378 * (y / bgHeight) - 0.1412) * bgHeight;
          },
          override: true,
        });
        break;
      case '10':
        components.repositionComponent(el, {
          x: (x) => (0.1723 * (x / bg.width) + 0.01126) * bg.width,
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            const sy = y / bgHeight;
            let ny;
            if (sy < 0.294475) ny = 0.294475;
            else if (sy > 0.552141) ny = 0.552141;
            else ny = sy;
            return (276.6 * (ny ** 4) - 478.8 * (ny ** 3)
              + 306.9 * (ny ** 2) - 86.35 * ny + 9.074) * bgHeight;
          },
          override: true,
        });
        break;
      case '11':
        components.repositionComponent(el, {
          x: (x) => (0.02431 * Math.cos(15.17 * (x / bg.width) + 0.6355) + 0.07352) * bg.width,
          y: (y) => {
            const bgHeight = bg.width * bg.hToWRatio;
            const ny = y / bgHeight;
            return (150 * (ny ** 4) - 273.2 * (ny ** 3)
              + 183.6 * (ny ** 2) - 54.75 * ny + 6.42) * bgHeight;
          },
          override: true,
        });
        break;
      case '13':
      case '14':
        elem.getElementsByClassName('triangle')[0].style.transform = `rotate(${bg.yPos / 2}deg)`;
        break;
      default:
    }
  },
  repositionComponent: (el, customs) => {
    const bgHeight = bg.width * bg.hToWRatio;
    const elem = el;
    let position = [];
    let fxns = customs;

    if (el.dataset.id === 'analyze' && el.style.transform && fxns === undefined) {
      const parts = el.style.transform.split('px');
      position = [parseFloat(parts[0].slice(12)), parseFloat(parts[1].slice(2))];
      fxns = {
        x: () => el.dataset.left * bg.width - position[0],
        y: () => el.dataset.top * bgHeight - position[1],
      };
    }

    let x;
    let y;
    if (fxns) {
      if (fxns.override) {
        x = fxns.x(bg.xPos);
        y = fxns.y(bg.yPos);
      } else {
        x = el.dataset.left * bg.width - fxns.x(bg.xPos);
        y = el.dataset.top * bgHeight - fxns.y(bg.yPos);
      }
    } else {
      x = el.dataset.left * bg.width - bg.xPos;
      y = el.dataset.top * bgHeight - bg.yPos;
    }
    elem.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (el.dataset.id === 'analyze') {
      console.log(x, y);
      console.log(
        (bg.xPos / bg.width).toFixed(6),
        (bg.yPos / bgHeight).toFixed(6),
        (position[0] / bg.width).toFixed(6),
        (position[1] / bgHeight).toFixed(6),
      );
    }
    if (el.dataset.height) elem.style.height = `${el.dataset.height * bgHeight}px`;
    if (el.dataset.width) elem.style.width = `${el.dataset.width * bg.width}px`;
    if (el.dataset.fontSize) elem.style.fontSize = `${el.dataset.fontSize * bgHeight}px`;
  },
  scroll: (deltas) => {
    for (const el of components.elements) {
      if (components.isInFrame(el, deltas)) {
        components.scrollElement(el);
      }
    }
    for (const el of components.subElements) {
      if (components.isInFrame(el.parentNode, deltas)) {
        components.scrollSubElement(el);
      }
    }
  },
  repositionAll: () => {
    for (const el of components.elements) {
      components.repositionComponent(el);
    }
    for (const el of components.subElements) {
      components.repositionComponent(el, components.noOffsetFxns);
    }
  },
  noOffsetFxns: {
    x: () => 0,
    y: () => 0,
  },
};

function mainScroll(e) {
  let deltaY; let deltaX; let
    distanceUnit;

  if (e.type === 'mousemove') {
    if (!bg.lastClick.active) return;
    if (e.timeStamp - bg.lastScroll <= bg.dragThrottleMs) return;
    deltaX = bg.lastClick.coord[0] - e.clientX;
    deltaY = bg.lastClick.coord[1] - e.clientY;
    bg.lastClick.coord = [e.clientX, e.clientY];
    distanceUnit = bg.dragDistanceUnit;
  } else if (e.type === 'wheel') {
    if (e.timeStamp - bg.lastScroll <= bg.wheelThrottleMs) return;
    deltaX = e.deltaX;
    deltaY = e.deltaY;
    distanceUnit = bg.wheelDistanceUnit;
  } else if (e.type === 'touchmove') {
    if (e.timeStamp - bg.lastScroll <= bg.tapThrottleMs) return;
    const coord = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    deltaX = bg.lastTouch.coord[0] - coord[0];
    deltaY = bg.lastTouch.coord[1] - coord[1];
    distanceUnit = bg.tapDistanceUnit;
    bg.lastTouch.coord = coord;
  } else if (e.directions) {
    deltaY = (e.directions[2] - e.directions[0]) * 30;
    deltaX = (e.directions[1] - e.directions[3]) * 30;
    distanceUnit = bg.keyDistanceUnit;
  } else return;
  bg.lastScroll = e.timeStamp;

  const maxY = bg.width * bg.hToWRatio - window.innerHeight;
  const maxX = bg.width - window.innerWidth;
  const x = (deltaY + deltaX) * distanceUnit;
  const deltas = [x, x * (maxY / maxX)];

  if (bg.xPos + deltas[0] < 0) deltas[0] = -bg.xPos;
  if (bg.yPos + deltas[1] < 0) deltas[1] = -bg.yPos;
  if (bg.xPos + deltas[0] > maxX || bg.yPos + deltas[0] > maxY) {
    deltas[0] = maxX - bg.xPos;
    deltas[1] = maxY - bg.yPos;
  }

  bg.xPos += deltas[0];
  bg.yPos += deltas[1];
  bg.element.style.transform = `translate3d(-${bg.xPos}px, -${bg.yPos}px, 0)`;
  components.scroll(deltas);
}

function setScaleBgDims() {
  bg.width = Math.max(window.innerWidth * 3.5, (window.innerHeight * 2.2) / bg.hToWRatio);
  bg.element.style.width = `${bg.width}px`;
  bg.element.style.height = ` ${bg.width * bg.hToWRatio}px`;
}

function checkOrientation() {
  const overlayEl = document.getElementById('rotate-overlay');
  if (window.innerHeight > window.innerWidth) {
    overlayEl.style.display = 'block';
  } else {
    overlayEl.style.display = 'none';
  }
}

function resize() {
  checkOrientation();
  setScaleBgDims();
  const maxY = bg.width * bg.hToWRatio - window.innerHeight;
  const maxX = bg.width - window.innerWidth;
  bg.yPos = bg.xPos * (maxY / maxX);
  if (bg.xPos > maxX || bg.yPos > maxY) {
    bg.xPos = maxX;
    bg.yPos = maxY;
  }
  bg.element.style.transform = `translate3d(-${bg.xPos}px, -${bg.yPos}px, 0)`;
  components.repositionAll();
}

function moveCursor(e) {
  cursor.parentNode.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY + 30}px, 0)`;
}

function updateKeyDirections(e, value) {
  if (e.key === 'ArrowUp' || e.key === 'PageUp') keyDirections[0] = value;
  else if (e.key === 'ArrowDown' || e.key === 'PageDown') keyDirections[2] = value;
  else if (e.key === 'ArrowRight') keyDirections[1] = value;
  else if (e.key === 'ArrowLeft') keyDirections[3] = value;
}

function hook() {
  document.addEventListener('wheel', mainScroll);
  document.addEventListener('touchmove', mainScroll);
  document.addEventListener('mousemove', mainScroll);
  window.addEventListener('mousemove', moveCursor);

  document.addEventListener('keydown', (e) => updateKeyDirections(e, 1));
  document.addEventListener('keyup', (e) => updateKeyDirections(e, 0));
  setInterval(() => {
    if (keyDirections.includes(1)) {
      mainScroll({ directions: keyDirections });
    }
  }, bg.keyThrottleMs);

  document.addEventListener('touchstart', (e) => {
    bg.lastTouch.coord = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
  });
  document.addEventListener('mousedown', (e) => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    bg.lastClick.active = true;
    bg.lastClick.coord = [e.clientX, e.clientY];
  });
  document.addEventListener('mouseup', () => { bg.lastClick.active = false; });
  document.addEventListener('dragstart', () => { bg.lastClick.active = false; });

  const enlarge = () => { cursor.style.transform = 'scale(2) rotate(-90deg)'; };
  const normal = () => { cursor.style.transform = ''; };
  for (const a of document.getElementsByTagName('a')) {
    a.addEventListener('mouseover', enlarge);
    a.addEventListener('mouseout', normal);
  }

  window.addEventListener('resize', resize);
}

function init() {
  cursor = document.getElementById('cursor');
  bg.element = document.getElementById('bg');
  bg.lastScroll = 0;
  bg.lastTouch = {};
  bg.lastClick = {};
  const loader = {
    loaded: 0,
    loadList: [window, bg.element],
    overlay: document.getElementById('load-overlay'),
    overlayMsg: document.getElementById('load-message'),
    bar: document.getElementById('load-arrow'),
    barParts: Array.from(document.getElementsByTagName('polygon')),
  };

  checkOrientation();
  setScaleBgDims();

  const loaded = () => {
    loader.loaded += 1;

    const max = Math.floor((loader.loaded / loader.loadList.length) * 10);
    for (let i = 0; i < max; i += 1) {
      loader.barParts[i].style.fill = '#ffffff';
    }

    if (loader.loaded === loader.loadList.length) {
      for (const el of components.elements) {
        el.classList.add('smooth');
      }

      document.body.style.cursor = 'none';
      loader.overlay.style.opacity = 0;
      loader.overlay.style.zIndex = 100;
      setTimeout(() => { loader.bar.style.zIndex = 98; }, 1400);
      hook();
    }
  };

  const elements = document.getElementsByClassName('element');
  components.elements = elements;
  for (const el of elements) {
    components.repositionComponent(el);
    if (el.id === 'load-arrow') loader.bar.style.opacity = 1;
  }

  const subElements = document.getElementsByClassName('sub-element');
  components.subElements = subElements;
  for (const el of subElements) {
    components.repositionComponent(el, components.noOffsetFxns);
    if (el.id === 'load-message') loader.overlayMsg.style.opacity = 1;
  }

  loader.loadList.push(...Array.from(document.getElementsByTagName('img')));

  for (const el of loader.loadList) {
    if (el.complete) {
      loaded();
    } else {
      el.addEventListener('load', () => {
        loaded();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
