import { connect } from "react-redux";
import RightNav from "../RightNav";
import { logout } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
