import { connect } from "react-redux";
import RightNav from "../RightNav";
import { logout } from "../../../store/user/action";
import { setForm } from "../../../store/form/action";

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
  isLoginForm: state.form.isLoginForm,
  isDisplay: state.form.isDisplay,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    setForm: (form) => dispatch(setForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
