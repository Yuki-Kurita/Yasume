import { connect } from "react-redux";
import SignUp from "../SignUp";
import { signUp } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  authError: state.user.authError,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (cred) => dispatch(signUp(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
