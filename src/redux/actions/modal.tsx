import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { modalConstants } from '../constants';

type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;

const showModal: ThunkActionCreator = (modalProps, modalType) => async (dispatch) => {
  dispatch({
    type: modalConstants.SHOW_MODAL,
    modalProps,
    modalType,
  });
};

const hideModal: ThunkActionCreator = () => async (dispatch) => {
  dispatch({
    type: modalConstants.HIDE_MODAL,
  });
};

const modalActions = {
  showModal,
  hideModal,
};

export default modalActions;
