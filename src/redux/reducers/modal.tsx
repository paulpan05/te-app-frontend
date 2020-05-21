import { AnyAction } from 'redux';
import { modalConstants } from '../constants';

export interface modalState {
  modalType: string | undefined | null;
  modalProps: {
    shouldShowModal: boolean;
    closeModal: () => void;
    title?: string;
    customStyle?: object;
    onlyCloseWithButton?: boolean;
  };
}

const initialState: modalState = {
  modalType: null,
  modalProps: {
    shouldShowModal: false,
    closeModal: () => {},
  },
};

const modal = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case modalConstants.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      };
    case modalConstants.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modal;
