import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as wordsActions } from "../../redux/modules/words"

const mapStateToProps = (state, ownProps) => {
  const { words:{status}, router: { location } } = state;
  return {
    status,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    csvupload : (file) => {
      dispatch(wordsActions.csvupload(file))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);