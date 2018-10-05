import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ellipseLastWord = text => text.replace(/\s([\wа-яА-Я]|\.{3})+$/, '...');

class EllipsisWrapper extends Component {
  ellipsedContainerRef = React.createRef();
  ellipsedElementRef = React.createRef();

  get ellipsedContainer() {
    return this.ellipsedContainerRef.current;
  }

  get ellipsedElement() {
    return this.ellipsedElementRef.current;
  }

  onEllipseElement = () => {
    const ellipsedContainerHeight = this.ellipsedContainer.clientHeight;
    this.ellipsedElement.textContent = this.props.text;

    while (this.ellipsedElement.offsetHeight > ellipsedContainerHeight) {
      this.ellipsedElement.textContent = ellipseLastWord(this.ellipsedElement.textContent);
    }
  };

  componentDidMount = () => {
    this.onEllipseElement();

    window.addEventListener('resize', _.debounce(this.onEllipseElement, 200));
  };


  render() {
    return (
      <div
        className={this.props.className}
        ref={this.ellipsedContainerRef}
        style={{
          overflow: 'hidden',
          height: '2em',
          lineHeight: '1em',
        }}
      >
        <div ref={this.ellipsedElementRef}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

EllipsisWrapper.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default EllipsisWrapper;
