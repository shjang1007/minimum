import { connect } from "react-redux";
import { signin, signup } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state, ownProps) => {
  const errors = state.session.errors;
  const formType = ownProps.location.pathname === "/signin" ? "signin" : "signup";

  return { errors, formType };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.location.pathname === "/signin" ? signin : signup;
  return {
    processForm: (user) => dispatch(action(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
