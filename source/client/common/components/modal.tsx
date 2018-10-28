import classNames from 'classnames';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { IModals } from 'stores/modals';
import { ModalActive } from 'types';

import Button from './button';

interface IProps {
  type: ModalActive;
  modals?: IModals;
  children: JSX.Element[] | JSX.Element;
}

@inject('modals')
@observer
class Modal extends React.Component<IProps> {
  onModalToggle = () => {
    const { modalToggle, active } = this.props.modals!;

    modalToggle(active);
  };

  componentWillUnmount = () => this.props.modals!.stateClear();

  render() {
    const { type, children } = this.props;

    const opened = type === this.props.modals!.active;

    return ReactDOM.createPortal(
      <div className={classNames('modal-wrapper', 'modal-effect', { opened })}>
        <div className={classNames('modal')}>
          <div className="modal-content">{children}</div>
          <div className="modal-footer">
            <Button shStyle="primary" onClick={this.onModalToggle}>
              Применить
            </Button>
            <Button onClick={this.onModalToggle}>Закрыть</Button>
          </div>
        </div>
      </div>,
      document.querySelector('#root') as Element
    );
  }
}

export default Modal;
