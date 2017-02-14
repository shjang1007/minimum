import { connect } from "react-redux";
import { signout } from "../../actions/session_actions";
import Home from "./home";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
