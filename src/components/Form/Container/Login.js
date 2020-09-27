import { connect } from "react-redux";
import Login from "../Login";
import { login } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  authError: state.user.authError,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (cred) => dispatch(login(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
