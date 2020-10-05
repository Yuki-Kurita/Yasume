import { connect } from "react-redux";
import SignUp from "../SignUp";
import { setForm } from "../../../store/form/action";
import { signUp } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (cred) => dispatch(signUp(cred)),
    setForm: (form) => dispatch(setForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
