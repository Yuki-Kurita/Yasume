import { connect } from "react-redux";
import Auth from "../Auth";
import { changeStatus } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeStatus: () => dispatch(changeStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
