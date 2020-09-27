import { connect } from "react-redux";
import Today from "../Today";
import { fetchWork } from "../../../store/works/action";

const mapStateToProps = (state) => ({
  works: state.works,
  uid: state.user.uid,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWork: (uid) => {
      dispatch(fetchWork(uid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
