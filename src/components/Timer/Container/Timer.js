import { connect } from "react-redux";
import Timer from "../Timer";
import { addWork } from "../../../store/work/action";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWork: (work) => {
      dispatch(addWork(work));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
