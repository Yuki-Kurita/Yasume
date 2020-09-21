import { connect } from "react-redux";
import SingleRoom from "../SingleRoom";
import { addWork } from "../../../store/work/action";

const mapStateToProps = (state) => ({
  works: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWork: (work) => {
      dispatch(addWork(work));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoom);
