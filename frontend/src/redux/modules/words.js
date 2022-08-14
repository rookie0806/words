const SET_STUDENTLIST = "SET_STUDENTLIST";
const SET_TESTLIST = "SET_TESTLIST";
const SET_CLASSLIST = "SET_CLASSLIST";
const SET_STUDENTINFO = "SET_STUDENTINFO";
const SET_BOOKLIST = "SET_BOOKLIST";
const SET_STATUSCODE = "SET_STATUSCODE";
const SET_TESTINFO = "SET_TESTINFO";
const SET_IMGURL = "SET_IMGURL";
const SET_WORD = "SET_WORD";
const SET_STATUS = "SET_STATUS";
function setStatus(status){
  return{
    type : SET_STATUS,
    status,
  };
}
function setWord(word){
  return{
    type : SET_WORD,
    word,
  };
}
function setImgurl(imgurl) {
  return {
    type: SET_IMGURL,
    imgurl
  };
}
function setStatusCode(statuscode) {
  return {
    type: SET_STATUSCODE,
    statuscode
  };
}
function setStudentList(studentlist) {
  return {
    type: SET_STUDENTLIST,
    studentlist
  };
}
function setTestList(testlist) {
  return {
    type: SET_TESTLIST,
    testlist
  };
}
function setStudentInfo(studentinfo) {
  return {
    type: SET_STUDENTINFO,
    studentinfo
  };
}
function setClassList(classlist) {
  return {
    type: SET_CLASSLIST,
    classlist
  };
}
function setBookList(booklist) {
  return {
    type: SET_BOOKLIST,
    booklist
  };
}
function setTestInfo(testinfo) {
  return {
    type: SET_TESTINFO,
    testinfo
  };
}
// API Actions
function deleteTest(uuid) {
  return (dispatch, getState) => {
    fetch("/words/deletetest/?uuid="+uuid, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setStatus(json));
      })
      .catch(err => console.log(err));
  };
}

function getImgurl(uuid) {
  return (dispatch, getState) => {
    fetch("/words/makeexcelandimg/?uuid="+uuid, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setImgurl(json));
      })
      .catch(err => console.log(err));
  };
}

function getTestInfo(uuid) {
  return (dispatch, getState) => {
    fetch("/words/test/?uuid="+uuid, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setTestInfo(json));
      })
      .catch(err => console.log(err));
  };
}

function getStudentList(id) {
  return (dispatch, getState) => {
    fetch("/words/classperson/?id="+id, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setStudentList(json));
      })
      .catch(err => console.log(err));
  };
}
function getTestList(uuid) {
  return (dispatch, getState) => {
    fetch("/words/getstdtest/?uuid="+uuid, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setTestList(json));
      })
      .catch(err => console.log(err));
  };
}
function setStudentBigo(bigo,uuid) {
  return (dispatch, getState ) => {
      fetch("/words/setpersonbigo/",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "uuid" : uuid,
              "bigo" : bigo
          })
      })
      .then(response => {
        return response;
      })
  }
}
function setFailWord(uuid,id) {
  return (dispatch, getState ) => {
      fetch("/words/failWordRegister/",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "uuid" : uuid,
              "fail_word" : id
          })
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setWord(json));
      })
      .catch(err => console.log(err));
  }
}
function makeTest(uuid,start_day,end_day,percent,book_name){
  return (dispatch, getState ) => {
    fetch("/words/maketest/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "uuid" : uuid,
            "start_day" : start_day,
            "end_day" : end_day,
            "cnt" : percent,
            "book_name" : book_name,
        })
    })
    .then(response => {
      return response.status;
    }) .then(status => {
      dispatch(setStatusCode(status));
    })
}
}

function getBookList(){
  return (dispatch, getState) => {
    fetch("/words/bookname/", {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setBookList(json));
      })
      .catch(err => console.log(err));
  };
}
function getClassList(){
  return (dispatch, getState) => {
    fetch("/words/class/", {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setClassList(json));
      })
      .catch(err => console.log(err));
  };
}
function getStudentInfo(uuid){
  return (dispatch, getState) => {
    fetch("/words/info/?id="+uuid, {
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setStudentInfo(json));
      })
      .catch(err => console.log(err));
  };
}
// Initial State

const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTLIST:
      return applySetStudentList(state, action);
    case SET_TESTLIST:
      return applySetTestList(state, action);
    case SET_CLASSLIST:
        return applySetClassList(state, action);
    case SET_STUDENTINFO:
      return applySetStudentInfo(state, action);
    case SET_BOOKLIST:
      return applySetBookList(state, action);
    case SET_STATUSCODE:
      return applySetStatusCode(state, action);
    case SET_TESTINFO:
      return applySetTestInfo(state, action);
    case SET_IMGURL:
      return applySetImgurl(state, action);
    case SET_WORD:
      return applySetWord(state,action);
    case SET_STATUS:
      return applySetStatus(state,action);
    default:
      return state;
  }
}
// Reducer Functions
function applySetWord(state, action) {
  const { word } = action;
  return {
    ...state,
    word
  };
}
function applySetImgurl(state, action) {
  const { imgurl } = action;
  return {
    ...state,
    imgurl
  };
}
function applySetTestInfo(state, action) {
  const { testinfo } = action;
  return {
    ...state,
    testinfo
  };
}
function applySetStatus(state, action) {
  const { status } = action;
  return {
    ...state,
    status
  };
}
function applySetStatusCode(state, action) {
  const { statuscode } = action;
  return {
    ...state,
    statuscode
  };
}
function applySetClassList(state, action) {
  const { classlist } = action;
  return {
    ...state,
    classlist
  };
}
function applySetStudentInfo(state, action) {
  const { studentinfo } = action;
  return {
    ...state,
    studentinfo
  };
}
function applySetStudentList(state, action) {
  const { studentlist } = action;
  return {
    ...state,
    studentlist
  };
}
function applySetTestList(state, action) {
  const { testlist } = action;
  return {
    ...state,
    testlist
  };
}
function applySetBookList(state, action) {
  const { booklist } = action;
  return {
    ...state,
    booklist
  };
}
const actionCreators = {
  getTestInfo,
  getStudentList,
  getTestList,
  getClassList,
  getStudentInfo,
  setStudentBigo,
  getBookList,
  makeTest,
  getImgurl,
  setFailWord,
  deleteTest,
};

export { actionCreators };

// Export reducer by default

export default reducer;