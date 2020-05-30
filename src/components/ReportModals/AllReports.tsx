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

let reports = [];
const AllReports: React.FC<HomeProps> = ({ user }) => {
  const [reportString, updateReportString] = useState('');

  return (
    <>
      <button
        onClick={async () => {
          reports = await getReports(user);
          reports.forEach(
            (report: {
              type: string;
              reportId: string;
              userId: string;
              description: string;
              listingId?: string;
              reportedUserId?: string;
              commentId?: string;
            }) => {
              let str =
                '\n\r' +
                'type: ' +
                report.type +
                '\n\rreportId: ' +
                report.reportId +
                '\n\ruserId: ' +
                report.userId +
                '\n\rdescription: ' +
                report.description +
                '\n\rId: ' +
                (report.listingId ? report.listingId : '') +
                (report.reportedUserId ? report.reportedUserId : '') +
                (report.commentId ? report.commentId : '') +
                '\n\r';
              //let str1 = reportString.concat(str);
              updateReportString((reportString) => reportString.concat(str));
              //console.log(str1);
            },
          );

          //updateReportString(JSON.stringify(reports));
        }}
        type="submit"
      >
        Get All Reports
      </button>
      <pre>{reportString}</pre>
    </>
  );
};

export default connect(mapStateToProps)(AllReports);
