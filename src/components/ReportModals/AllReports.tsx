import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { rootState } from '../../redux/reducers';
import { getReports } from '../../api';

interface HomeProps {
  user: firebase.User | null | undefined;
}

const mapStateToProps = (state: rootState) => ({
  user: state.auth.user,
});

let reports = {};
const AllReports: React.FC<HomeProps> = ({ user }) => {
  let [reportString, updateReportString] = useState('');

  return (
    <>
      <button
        onClick={async () => {
          reports = await getReports(user);
          updateReportString((reportString = JSON.stringify(reports)));
        }}
        type="submit"
      >
        Get All Reports
      </button>
      <div>{reportString}</div>
    </>
  );
};

export default connect(mapStateToProps)(AllReports);
