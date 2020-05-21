import * as React from 'react';
import Modal, { ICustomModalStyle } from '@bdenzer/react-modal';
import styles from './index.module.scss';

interface IAppState {
  shouldShowModal: boolean;
}

class TestModal extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shouldShowModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  public render(): JSX.Element {
    const modalStyle: ICustomModalStyle = {
      animationTime: 400,
      closeButtonText: {
        color: 'black',
      },
      hoveredButtonText: {
        fontWeight: 'bold',
      },
      modalTitle: {
        color: 'darkBlue',
        display: 'inline',
        textAlign: 'center',
        textAlignLast: 'center',
        alignContent: 'center',
        alignItems: 'center',
      },
      modalBody: {
        width: '100%',
      },
      modalHeader: {
        alignContent: 'center',
        alignItems: 'center',
      },
      modalInner: {
        borderRadius: '25px',
      },
    };
    return (
      <div>
        <Modal
          closeModal={this.closeModal}
          customStyle={modalStyle}
          shouldShowModal={this.state.shouldShowModal}
          title="Report User"
          onlyCloseWithButton
        >
          <div>
            <div className={styles.modalBody} />
            picture
            <div className={styles.modalBody}> Sarah A.</div>
            <br />
            <div className={styles.modalBody}>Reason for Reporting?</div>
            <br />
            <textarea cols={80} rows={10} />
            <br />
            <button className={styles.modalBody} onClick={() => {}}
            >
              Submit
            </button>
          </div>
        </Modal>
        <button onClick={this.openModal}>Report User</button>
      </div>
    );
  }

  private closeModal(): void {
    this.setState({ shouldShowModal: false });
  }

  private openModal(): void {
    this.setState({ shouldShowModal: true });
  }
}

export default TestModal;
