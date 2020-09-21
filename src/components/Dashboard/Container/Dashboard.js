import { connect } from "react-redux";
import Dashboard from "../Dashboard";
import { fetchWork } from "../../../store/work/action";

const mapStateToProps = (state) => ({
  works: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWork: (work) => {
      dispatch(fetchWork(work));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
