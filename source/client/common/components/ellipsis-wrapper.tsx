import _ from 'lodash';
import * as React from 'react';

const ellipseLastWord = text => text.replace(/\s([\wа-яА-Я]|\.{3})+$/, '...');

interface IProps {
  className?: string;
  text: string;
}

class EllipsisWrapper extends React.Component<IProps> {
  ellipsedContainerRef = React.createRef<HTMLDivElement>();
  ellipsedElementRef = React.createRef<HTMLDivElement>();

  get ellipsedContainer() {
    return this.ellipsedContainerRef.current;
  }

  get ellipsedElement() {
    return this.ellipsedElementRef.current;
  }

  onEllipseElement = () => {
    if (!this.ellipsedContainer || !this.ellipsedElement) return;

    const ellipsedContainerHeight = this.ellipsedContainer.clientHeight;
    this.ellipsedElement.textContent = this.props.text;

    while (this.ellipsedElement.offsetHeight > ellipsedContainerHeight) {
      this.ellipsedElement.textContent = ellipseLastWord(
        this.ellipsedElement.textContent
      );
    }
  };

  componentDidMount = () => {
    this.onEllipseElement();

    window.addEventListener('resize', _.throttle(this.onEllipseElement, 16));
  };

  render() {
    return (
      <div
        className={this.props.className}
        ref={this.ellipsedContainerRef}
        style={{
          overflow: 'hidden',
          height: '2em',
          lineHeight: '1em'
        }}
      >
        <div ref={this.ellipsedElementRef}>{this.props.text}</div>
      </div>
    );
  }
}

export default EllipsisWrapper;
