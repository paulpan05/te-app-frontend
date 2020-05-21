import React from 'react';
import { connect } from 'react-redux';
import ReactModal from '@bdenzer/react-modal';
import { rootState } from './redux/reducers';
import { modalActions } from './redux/actions';

const mapStateToProps = (state: rootState) => ({
  ...state.modal,
});

const mapDispatchToProps = async (dispatch: any) => ({
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps: any, modalType: any) => {
    dispatch(modalActions.showModal({ modalProps, modalType }));
  },
});

class ModalContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalIsOpen: props.modalProps.open,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.modalProps.open !== this.props.modalProps.open) {
      this.setState({
        modalIsOpen: nextProps.modalProps.open,
      });
    }
  }

  closeModal() {
    this.props.hideModal();
  }

  render() {
    if (!this.props.modalType) {
      return null;
    }
    return (
      <div>
        <ReactModal shouldShowModal={this.state.modalIsOpen} closeModal={this.closeModal}>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
