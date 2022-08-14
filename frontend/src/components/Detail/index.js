import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as wordsActions } from "../../redux/modules/words"

const mapStateToProps = (state, ownProps) => {
  const { words:{word,testlist,classlist,studentlist,studentinfo,booklist,statuscode,imgurl,status}, router: { location } } = state;
  return {
    testlist,
    classlist,
    studentlist,
    studentinfo,
    booklist,
    statuscode,
    status,
    imgurl,
    word,
    pathname: location.pathname
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getImgurl : (uuid) => {
      dispatch(wordsActions.getImgurl(uuid));
    }, 
    getTestList : (uuid) => {
      dispatch(wordsActions.getTestList(uuid));
    },
    getStudentList : (id) => {
      dispatch(wordsActions.getStudentList(id));
    },
    getClassList : () => {
      dispatch(wordsActions.getClassList());
    },
    getBookList : () => {
      dispatch(wordsActions.getBookList());
    },
    getStudentInfo : (uuid) => {
      dispatch(wordsActions.getStudentInfo(uuid));
    },
    setStudentBigo : (bigo,uuid) => {
      dispatch(wordsActions.setStudentBigo(bigo,uuid));
    },
    makeTest : (uuid,start_day,end_day,percent,book_name) => {
      dispatch(wordsActions.makeTest(uuid,start_day,end_day,percent,book_name));
    },
    setFailWord : (uuid,id) => {
      dispatch(wordsActions.setFailWord(uuid,id));
    },
    deleteTest : (uuid) => {
      dispatch(wordsActions.deleteTest(uuid))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);