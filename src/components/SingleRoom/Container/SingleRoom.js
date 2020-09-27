import { connect } from "react-redux";
import SingleRoom from "../SingleRoom";
import { addWork } from "../../../store/works/action";

const mapStateToProps = (state) => ({
  works: state,
  uid: state.user.uid,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addWork: (work) => {
      dispatch(addWork(work));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoom);
