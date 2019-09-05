class DrawingCanvas extends HTMLElement {
  get drawing() {
    return this._drawing;
  }
  set drawing(value) {
    if (this._drawing === value) return;
    this._drawing = value;
  }
  constructor() {
    super();
    const canvas = document.createElement('canvas');
    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(canvas);
    canvas.style.height = '100%';
    canvas.style.width = '100%';
    canvas.width = 400;
    canvas.height = 800;
    let scale = 1;
    setTimeout(() => {
      scale = canvas.height / canvas.clientHeight;
    });

    // stolen from: https://codesandbox.io/s/paint-tool-final-g362x?from-embed
    const context = canvas.getContext('2d');
    const strokeWidth = 3;

    // Drawing state
    let latestPoint;
    let drawing = false;
    let currentAngle;

    // Geometry

    const rotatePoint = (distance, angle, origin) => [
      origin[0] + distance * Math.cos(angle),
      origin[1] + distance * Math.sin(angle)
    ];

    const getBearing = (origin, destination) =>
      (Math.atan2(destination[1] - origin[1], destination[0] - origin[0]) -
        Math.PI / 2) %
      (Math.PI * 2);

    const getNewAngle = (origin, destination, oldAngle) => {
      const bearing = getBearing(origin, destination);
      if (typeof oldAngle === "undefined") {
        return bearing;
      }
      return oldAngle - angleDiff(oldAngle, bearing);
    };

    const angleDiff = (angleA, angleB) => {
      const twoPi = Math.PI * 2;
      const diff =
        ((angleA - (angleB > 0 ? angleB : angleB + twoPi) + Math.PI) % twoPi) -
        Math.PI;
      return diff < -Math.PI ? diff + twoPi : diff;
    };

    // Drawing functions

    const strokeBristle = (origin, destination, controlPoint) => {
      context.beginPath();
      context.moveTo(origin[0], origin[1]);
      context.strokeStyle = "black";
      context.lineWidth = strokeWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = "black";
      context.shadowBlur = strokeWidth / 2;
      context.quadraticCurveTo(
        controlPoint[0],
        controlPoint[1],
        destination[0],
        destination[1]
      );
      context.lineTo(destination[0], destination[1]);
      context.stroke();
    };

    const drawStroke = (origin, destination, oldAngle, newAngle) => {
      context.beginPath();
      const bristleOrigin = rotatePoint(
        0 - strokeWidth / 2,
        oldAngle,
        origin
      );

      const bristleDestination = rotatePoint(
        0 - strokeWidth / 2,
        newAngle,
        destination
      );
      const controlPoint = rotatePoint(
        0 - strokeWidth / 2,
        newAngle,
        origin
      );

      strokeBristle(bristleOrigin, bristleDestination, controlPoint);
    };
    const continueStroke = newPoint => {
      const newAngle = getNewAngle(latestPoint, newPoint, currentAngle);
      drawStroke(latestPoint, newPoint, currentAngle, newAngle);
      currentAngle = newAngle % (Math.PI * 2);
      latestPoint = newPoint;

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this._drawing = canvas.toDataURL();
        this.dispatchEvent(new CustomEvent('drawingChanged'));
      }, 300);
    };
    // Event helpers

    const startStroke = point => {
      currentAngle = undefined;
      drawing = true;
      latestPoint = point;
    };

    const getTouchPoint = evt => {
      if (!evt.currentTarget) {
        return [0, 0];
      }
      const rect = evt.currentTarget.getBoundingClientRect();
      const touch = evt.targetTouches[0];
      return [touch.clientX*scale - rect.left*scale, touch.clientY*scale - rect.top*scale];
    };

    const BUTTON = 0b01;
    const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

    // Event handlers

    const mouseMove = evt => {
      if (!drawing) {
        return;
      }
      continueStroke([evt.offsetX * scale, evt.offsetY * scale]);
    };

    const mouseDown = evt => {
      if (drawing) {
        return;
      }
      evt.preventDefault();
      canvas.addEventListener("mousemove", mouseMove, false);
      startStroke([evt.offsetX * scale, evt.offsetY * scale]);
    };

    const mouseEnter = evt => {
      if (!mouseButtonIsDown(evt.buttons) || drawing) {
        return;
      }
      mouseDown(evt);
    };

    const endStroke = evt => {
      if (!drawing) {
        return;
      }
      drawing = false;
      evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
    };

    const touchStart = evt => {
      if (drawing) {
        return;
      }
      evt.preventDefault();
      startStroke(getTouchPoint(evt));
    };

    const touchMove = evt => {
      if (!drawing) {
        return;
      }
      continueStroke(getTouchPoint(evt));
    };

    const touchEnd = evt => {
      drawing = false;
    };

    this.addEventListener("touchstart", touchStart, false);
    this.addEventListener("touchend", touchEnd, false);
    this.addEventListener("touchcancel", touchEnd, false);
    this.addEventListener("touchmove", touchMove, false);

    this.addEventListener("mousedown", mouseDown, false);
    this.addEventListener("mouseup", endStroke, false);
    this.addEventListener("mouseout", endStroke, false);
    this.addEventListener("mouseenter", mouseEnter, false);
  }
}
customElements.define('drawing-canvas', DrawingCanvas);
