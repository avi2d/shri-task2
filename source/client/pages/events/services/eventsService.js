import _ from 'lodash';

const sameId = (event1, event2) => event1.pointerId === event2.pointerId;

const sameSign = (number1, number2) => number1 * number2 > 0;

const toDegrees = angle => angle * (180 / Math.PI);

const defineAngle = (point1, point2) =>
  Math.atan2(point2.y - point1.y, point2.x - point1.x);

const defineEventsDiff = (event1, event2) => ({
  x: event2.clientX - event1.clientX,
  y: event2.clientY - event1.clientY
});

const defineMidpoint = ([event1, event2]) => ({
  x: (event1.clientX + event2.clientX) / 2,
  y: (event1.clientY + event2.clientY) / 2
});

class EventsService {
  events = [];

  scrollStartEvent = null;

  prevPinchDistance = undefined;

  prevRotateMidpoint = null;
  prevRotatePoint = null;
  prevRotateAngle = undefined;

  get eventsCount() {
    return this.events.length;
  }

  get curPinchDistance() {
    if (this.events.length !== 2) return undefined;

    const dx = this.events[0].clientX - this.events[1].clientX;
    const dy = this.events[0].clientY - this.events[1].clientY;

    return Math.sqrt(dx * dx + dy * dy);
  }

  get curRotateMidpoint() {
    if (this.events.length !== 2) return null;

    return defineMidpoint(this.events);
  }

  get curRotateRightPoint() {
    if (this.events.length !== 2) return null;

    return this.events[1];
  }

  get curRotateAngle() {
    if (this.events.length !== 2) return undefined;

    return toDegrees(
      defineAngle(this.curRotateMidpoint, this.curRotateRightPoint)
    );
  }

  get scrollDiff() {
    if (!this.scrollStartEvent) return { x: 0, y: 0 };

    return defineEventsDiff(this.scrollStartEvent, this.events[0]);
  }

  get pinchDiff() {
    let pinchDistanceDiff = 0;

    if (this.prevPinchDistance !== undefined) {
      pinchDistanceDiff = this.curPinchDistance - this.prevPinchDistance;
    }

    this.prevPinchDistance = this.curPinchDistance;

    return pinchDistanceDiff;
  }

  get rotateDiff() {
    let rotateDiff = 0;

    if (
      this.prevRotateMidpoint &&
      this.prevRotatePoint &&
      this.prevRotateAngle !== undefined
    ) {
      if (!sameSign(this.curRotateAngle, this.prevRotateAngle)) {
        rotateDiff = 0;
      } else {
        rotateDiff = this.curRotateAngle - this.prevRotateAngle;
      }
    }

    this.prevRotateMidpoint = this.curRotateMidpoint;
    this.prevRotatePoint = this.curRotateRightPoint;
    this.prevRotateAngle = this.curRotateAngle;

    return rotateDiff;
  }

  setScrollStartEvent = () => {
    this.scrollStartEvent = this.events[0];
  };

  setRotateStartEvent = () => {
    if (this.eventsCount === 2) {
      this.prevRotateMidpoint = defineMidpoint(this.events);
      this.prevRotatePoint = this.events[1];
    }
  };

  clearScroll = () => {
    this.scrollStartEvent = null;
  };

  clearPinch = () => {
    this.prevPinchDistance = undefined;
  };

  clearRotate = () => {
    this.prevRotateMidpoint = null;
    this.prevRotatePoint = null;
    this.prevRotateAngle = undefined;
  };

  clearEventsAccounts = () => {
    if (this.eventsCount < 2) {
      this.clearPinch();
      this.clearRotate();
    }

    this.clearScroll();
  };

  addEvent = event => {
    this.events.push(event);
  };

  updateEvent = event => {
    this.events = _.map(
      this.events,
      item => (sameId(item, event) ? event : item)
    );
  };

  removeEvent = event => {
    _.remove(this.events, { pointerId: event.pointerId });
  };
}

export default EventsService;
