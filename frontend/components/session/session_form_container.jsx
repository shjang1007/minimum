import { connect } from "react-redux";
import { signIn, signUp } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = (state, ownProps) => {
  const errors = state.session.errors;
  const formType =
    ownProps.formType === "signIn" ? "signIn" : "signUp";

  return { errors, formType };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.formType === "signIn" ? signIn : signUp;
  return {
    submitForm: (user) => dispatch(action(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
