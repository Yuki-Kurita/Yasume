import { connect } from "react-redux";
import Timer from "../Timer";
import { addWork } from "../../../store/works/action";
import { setTime } from "../../../store/timer/action";

const mapStateToProps = (state) => ({
  works: state,
  timer: state.timer,
  uid: state.user.uid,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWork: (work) => {
      dispatch(addWork(work));
    },
    setTime: (time) => {
      dispatch(setTime(time));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
