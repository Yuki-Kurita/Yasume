import { connect } from "react-redux";
import Login from "../Login";
import { login } from "../../../store/user/action";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (cred) => dispatch(login(cred)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
