import { connect } from "react-redux";
import Today from "../Today";
// import { fetchWork } from "../../../store/works/action";

const mapStateToProps = (state) => ({
  works: state.works,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchWork: (work) => {
    //   dispatch(fetchWork(work));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
