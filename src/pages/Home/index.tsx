import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { authActions } from '../../redux/actions';
import OpenPopup from '../../components/openPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditListing from '../../components/editListing';

interface HomeProps {
  dispatch: Dispatch<any>;
}

const Home: React.FC<HomeProps> = ({ dispatch }) => {
  const [showPopup, setshowPopup] = React.useState(false);
  const [showEdit, setshowEdit] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => {
          dispatch(authActions.signOut());
        }}
        type="submit"
      >
        Sign Out
      </button>
      <button type="button" onClick={() => setshowPopup(true)}>
        select listing
      </button>
      <OpenPopup showPopup={showPopup} setter={setshowPopup} />
      <button type="button" onClick={() => setshowEdit(true)}>
        edit listing
      </button>
      <EditListing showPopup={showEdit} setter={setshowEdit} />
    </div>
  );
};

export default connect()(Home);
