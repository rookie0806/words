import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as wordsActions } from "../../redux/modules/words"

const mapStateToProps = (state, ownProps) => {
  const { words:{testinfo}, router: { location } } = state;
  return {
    testinfo,
    pathname: location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTestInfo: (uuid) => {
      dispatch(wordsActions.getTestInfo(uuid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);