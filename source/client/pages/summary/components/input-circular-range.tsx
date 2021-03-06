import * as React from 'react';
import { IPoint } from 'types';

import utils from '../utils';

const DISABLED_ANGLE = 60;
const DISABLED_PART = DISABLED_ANGLE / 360;
const AVAILABLE_PART = 1 - DISABLED_PART;
const MIN_ANGLE = -270 + DISABLED_ANGLE / 2;
const MAX_ANGLE = 90 - DISABLED_ANGLE / 2;

const SIZE = 210;
const RADIUS = 105;
const STROKE_WIDTH = 24;
const STROKE_WIDTH_HALF = STROKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * (RADIUS - STROKE_WIDTH_HALF);

const defineAngle = (A: IPoint, B: IPoint, C: IPoint) => {
  const AB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
  const BC = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
  const AC = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2);

  // ровно центр
  if (BC === 0 || AB === 0) {
    return 90;
  }

  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
};

const toDegrees = (angle: number) => angle * (180 / Math.PI);

const defineValueByAngle = (
  angle: number,
  minValue: number,
  maxValue: number
) => {
  const part = (-MIN_ANGLE + angle) / (MAX_ANGLE - MIN_ANGLE);
  const difference = maxValue - minValue;

  return Math.round(minValue + part * difference);
};

const defineAngleByValue = (
  value: number,
  minValue: number,
  maxValue: number
) => {
  const part = (-minValue + value) / (maxValue - minValue);
  const difference = MAX_ANGLE - MIN_ANGLE;

  return MIN_ANGLE + part * difference;
};

const defineDashOffset = (
  value: number,
  minValue: number,
  maxValue: number
) => {
  const part = (-minValue + value) / (maxValue - minValue);

  return CIRCUMFERENCE * (1 - part);
};

interface IProps {
  min?: number;
  max?: number;
  defaultValue?: number;
}

class InputCircularRange extends React.Component<IProps> {
  static defaultProps = {
    min: -100,
    max: 100,
    defaultValue: 50
  };

  inputCircularRangeRef = React.createRef<HTMLDivElement>();

  get inputCircularRange() {
    return this.inputCircularRangeRef.current!;
  }

  state = {
    angle: defineAngleByValue(
      this.props.defaultValue!,
      this.props.min!,
      this.props.max!
    )
  };

  onUpdateAngle = (angle: number) => {
    if (angle >= MAX_ANGLE) {
      if (this.state.angle !== MAX_ANGLE) {
        this.setState({ angle: MAX_ANGLE });
      }
    } else if (angle <= MIN_ANGLE) {
      if (this.state.angle !== MIN_ANGLE) {
        this.setState({ angle: MIN_ANGLE });
      }
    } else {
      this.setState({ angle });
    }
  };

  onUpdateAngleByPoint = (clientX: number, clientY: number) => {
    const inputCircularRangeOffset = this.inputCircularRange.getBoundingClientRect();

    const mousePoint = {
      x: clientX - inputCircularRangeOffset.left,
      y: clientY - inputCircularRangeOffset.top
    };
    const centerPoint = {
      x: this.inputCircularRange.offsetWidth / 2,
      y: this.inputCircularRange.offsetHeight / 2
    };
    const startPoint = {
      x: this.inputCircularRange.offsetWidth,
      y: this.inputCircularRange.offsetWidth / 2
    };

    let resultAngle = -toDegrees(
      defineAngle(mousePoint, centerPoint, startPoint)
    );

    // 3 четверть
    if (mousePoint.x < centerPoint.x && mousePoint.y > centerPoint.y) {
      resultAngle = -(360 + resultAngle);
    }

    // 4 четверть
    if (mousePoint.x > centerPoint.y && mousePoint.y > centerPoint.y) {
      resultAngle = -resultAngle;
    }

    this.onUpdateAngle(resultAngle);
  };

  onMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.button !== 0) return;

    this.onUpdateAngleByPoint(event.clientX, event.clientY);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (event: MouseEvent) => {
    event.preventDefault();

    this.onUpdateAngleByPoint(event.clientX, event.clientY);
  };

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    this.onUpdateAngleByPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    );

    this.inputCircularRange.addEventListener('touchmove', this.onTouchMove, {
      capture: true,
      passive: false
    });
    this.inputCircularRange.addEventListener('touchend', this.onTouchEnd, {
      capture: true,
      passive: false
    });
  };

  onTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    this.onUpdateAngleByPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    );
  };

  onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();

    this.inputCircularRange.removeEventListener('touchmove', this.onTouchMove);
    this.inputCircularRange.removeEventListener('touchend', this.onTouchEnd);
  };

  render() {
    const { angle } = this.state;
    const { min, max } = this.props;

    const value = defineValueByAngle(angle, min!, max!);
    const dashOffset = defineDashOffset(value, min!, max!);

    return (
      <div
        className="input-circular-range"
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        ref={this.inputCircularRangeRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
        >
          <filter
            id="filter-for-center"
            width="107.9%"
            height="107.9%"
            x="-3.9%"
            y="-2.8%"
            filterUnits="objectBoundingBox"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="2"
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0.524208121 0 0 0 0 0.475951723 0 0 0 0 0.279118818 0 0 0 0.446388134 0"
            />
          </filter>
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - STROKE_WIDTH_HALF}
            fill="none"
            stroke="#333"
            strokeWidth="24"
          />
          <circle
            strokeDasharray={CIRCUMFERENCE * AVAILABLE_PART}
            strokeDashoffset={dashOffset * AVAILABLE_PART}
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - STROKE_WIDTH_HALF}
            fill="none"
            stroke="#f5a623"
            strokeWidth={STROKE_WIDTH}
            transform={`rotate(${90 + DISABLED_ANGLE / 2} ${RADIUS} ${RADIUS})`}
          />
          <circle
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - DISABLED_PART)}
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - STROKE_WIDTH_HALF}
            fill="none"
            stroke="#fff"
            strokeWidth={STROKE_WIDTH}
            transform={`rotate(${DISABLED_ANGLE} ${RADIUS} ${RADIUS})`}
          />
          <circle
            strokeDasharray="4.3,1"
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - STROKE_WIDTH_HALF}
            fill="none"
            stroke="#fff"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS - 23}
            filter="url(#filter-for-center)"
          />
          <circle cx={RADIUS} cy={RADIUS} r={RADIUS - 23} fill="#fefefe" />
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={RADIUS}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
          <path
            transform={`
              rotate(${90 + angle} ${RADIUS} ${RADIUS})
              translate(${RADIUS - 6} ${STROKE_WIDTH})
            `}
            fill="#333"
            fillRule="nonzero"
            d="M.311 5.944L5.036.59c.335-.38.492-.478.68-.543a.858.858 0 0 1 .568 0c.188.065.345.163.68.543l4.725 5.353a1.32 1.32 0 0 1 0 1.703c-.2.226-.47.353-.752.353H1.063C.476 8 0 7.46 0 6.795c0-.32.112-.626.311-.851z"
          />
        </svg>
        <div className="input-circular-range-value">
          {utils.formatNumberToOutput(value)}
        </div>
      </div>
    );
  }
}

export default InputCircularRange;
