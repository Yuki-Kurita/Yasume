import { connect } from "react-redux";
import Login from "../Login";
import { login } from "../../../store/user/action";
import { setForm } from "../../../store/form/action";

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (cred) => dispatch(login(cred)),
    setForm: (form) => dispatch(setForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
