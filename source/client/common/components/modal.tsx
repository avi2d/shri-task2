import * as React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@bem-react/classname';
import { inject, observer } from 'mobx-react';
import { IModals } from 'stores/modals';
import { ModalActive } from 'types';

import Button from './button';

const block = cn('Modal');

interface IProps {
  type: ModalActive;
  effect?: 'default';
  modals?: IModals;
  children: JSX.Element[] | JSX.Element;
}

@inject('modals')
@observer
class Modal extends React.Component<IProps> {
  static defaultProps = {
    effect: 'default'
  };

  onModalToggle = () => {
    const { modalToggle, active } = this.props.modals!;

    modalToggle(active);
  };

  componentWillUnmount = () => this.props.modals!.stateClear();

  render() {
    const { type, effect, children } = this.props;

    const opened = type === this.props.modals!.active;

    return ReactDOM.createPortal(
      <div className={block({ opened, effect })}>
        <div className={block('Container')}>
          <div className={block('Content')}>{children}</div>
          <div className={block('Footer')}>
            <Button
              shStyle="primary"
              className={block('FooterButton')}
              onClick={this.onModalToggle}
            >
              Применить
            </Button>
            <Button
              className={block('FooterButton')}
              onClick={this.onModalToggle}
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>,
      document.querySelector('#root') as Element
    );
  }
}

export default Modal;
