import React, { Component } from "react";
import PropTypes from "prop-types";
import Detail from "./presenter";
import Main from "../Main/presenter";
class Container extends Component {
  state = {
    text : "",
    start_day : 1,
    end_day : 5,
    test_day : 0,
    cnt : 100,
    testlistloading:true,
    alram : false,
    data : {
    
    },
    stdlist : [

    ],
    stdinfo : [

    ],
    testlist : [

    ],  
    booklist : [

    ],
    noselect : true,
    isOpen : false,
    isOpen2 : false,
    selectedDay: null,
    selectedDate: "",
    selectbook : "",
    selectcnt : 100,
    stduuid : "",
    imgok : false,
    id : "",
    word : "",
    deleteflag : false,
    testuuid : "",
  };
  static propTypes = {
    getTestList : PropTypes.func.isRequired,
    getClassList : PropTypes.func.isRequired,
    getStudentList : PropTypes.func.isRequired,
    getStudentInfo : PropTypes.func.isRequired,
    getImgurl: PropTypes.func.isRequired,
    setStudentBigo : PropTypes.func.isRequired,
    getBookList : PropTypes.func.isRequired,
    pathname:PropTypes.string.isRequired,
    testlist: PropTypes.array.isRequired,
    classlist: PropTypes.array.isRequired,
    studentlist: PropTypes.array.isRequired,
    booklist : PropTypes.array.isRequired,
    studentinfo: PropTypes.array.isRequired,
    makeTest : PropTypes.array.isRequired,
    deleteTest : PropTypes.func.isRequired,
    imgurl : PropTypes.string.isRequired,
    setFailWord: PropTypes.func.isRequired,
  };
  constructor(props){
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }
  onKeyPress = (e) =>{
    const {setFailWord } = this.props;
    if(e.key==='Enter'){
      setFailWord(this.state.stduuid,e.target.value);
      try{
        this.setState({
          stduuid : '',
        })
        document.getElementById("failword").value = "";
      }
      catch (error) {
      }
    }
  }
  openModal= (e) =>  {
    this.setState(() => (
      {
        isOpen: true,
      }
    ))
  }
  openModal2= (e) =>  {
    this.setState(() => (
      {
        isOpen2: true,
      }
    ))
  }
  delete = (uuid) => {
    const {deleteTest} = this.props;
    this.setState({
      deleteflag : true
    })
    deleteTest(uuid);
  }
  printImage = (uuid) => {
    const {getImgurl} = this.props;
    var win = window.open("/test/"+uuid);
        setTimeout(function() {
          win.print();
          win.close();
      }, 700);
  }
  setSelectedDay = (day) => {
    
    this.setState(() => (
      {
        selectedDay: day,
        selectedDate : day.toISOString()
      }
    ))
     
  }
  closeModal= (e) => {
    this.setState(() => (
      {
        isOpen: false,
      }
    ))
  }
  closeModal2= (e) => {
    this.setState(() => (
      {
        isOpen2: false,
      }
    ))
  }
  onToggle(node, toggled){
    const {cursor, data} = this.state;
    const {getStudentList} = this.props;
    getStudentList(node.id);
    if (cursor) {
        this.setState(() => ({cursor, active: false}));
    }
    
    if (node.children) { 
        node.toggled = toggled; 
    }
    this.setState(() => ({cursor: node, data: data}));
}
  componentWillReceiveProps = nextProps => {
    const{getTestList} = this.props;
    if(nextProps.imgurl){
      if(this.state.imgok==true){
        this.setState({
          imgok : false,
        })
        var win = window.open("/test/"+this.state.testuuid);
        setTimeout(function() {
          win.print();
          win.close();
      }, 250);
        /*
        win.document.write('<html lang="jp"><head>');
        win.document.write('<meta charset="UTF-8">');
        win.document.write('')
        win.document.write('</head><body>');
        win.document.write('</body></html>');
        win.document.close();
        var oImg = document.createElement("img");
        oImg.setAttribute('src', nextProps.imgurl.url);
        oImg.style.width = "100%";
        win.document.body.appendChild(oImg);
        document.margin = "11mm 17mm 17mm 17mm";
        */
        setTimeout(function() {
            win.print();
            win.close();
        }, 250);
      }
    }
    if(nextProps.classlist){
      this.setState({
        data : nextProps.classlist,
        testlistloading:false
      })
    }
    if(nextProps.studentlist){
      this.setState({
        stdlist : nextProps.studentlist,
      })
    }
    if(nextProps.studentinfo){
      this.setState({
        stdinfo: nextProps.studentinfo,
        text : nextProps.studentinfo.bigo,
      })
      try{
        document.getElementById("textarea").value = nextProps.studentinfo.bigo;
      }
      catch (error) {
      }
    }
    if(nextProps.testlist){
      try{
        this.setState({
          testlist: nextProps.testlist,
          start_day : nextProps.testlist[0].end_day + 1,
          end_day : nextProps.testlist[0].end_day + 3
        })
      }
      catch(e){
        this.setState({
          testlist: nextProps.testlist,
        })
      }
      
    }
    if(nextProps.booklist){
      this.setState({
        booklist: nextProps.booklist,
        selectbook : nextProps.booklist[0].name
      })
    }
    if(nextProps.status){
      if(this.state.deleteflag==true){
        this.setState({
          deleteflag : false
        })
        console.log(nextProps.status.status)
        if(nextProps.status.status=="delete"){
          getTestList(this.state.stduuid)
        }
      }
    }
    if(nextProps.word){
      this.setState({
        word : nextProps.word
      })
    }
    if(nextProps.statuscode){
      if(this.state.alram==true){
        if(nextProps.statuscode==201){
          alert("테스트 생성 완료")
          getTestList(this.state.stduuid)
        }
        if(nextProps.statuscode!=201){
          alert("테스트 생성 실패")
        }
        this.setState({
          alram: false,
        })
      }
    }
  };
  
  componentDidMount() {
    const{getClassList,getBookList} = this.props;
    getClassList();
    getBookList();
  };
  onClick = (e) =>{
    const{getStudentInfo} = this.props;
    getStudentInfo(e.currentTarget.id);
    this.setState({
      "stduuid" : e.currentTarget.id
    }
    )
    const {getTestList} = this.props;
    getTestList(e.currentTarget.id)
  }
  onsaveClick = (e) =>{
    const {setStudentBigo} = this.props;
    setStudentBigo(this.state.text,e.currentTarget.id);
    alert("저장하였습니다")
  }
  makeTestClick = (e) =>{
    const{makeTest} = this.props;
    this.setState({
      isOpen: false,
      alram: true,
      stduuid : e.currentTarget.id
    })
    makeTest(e.currentTarget.id,this.state.start_day,this.state.end_day,this.state.selectcnt,this.state.selectbook)
    
  }
  handle = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    const {isOpen,data,testlist,testlistloading,noselect,stdlist,stdinfo} = this.state;
    return (
      <Detail delete={this.delete} printImage={this.printImage }makeTestClick={this.makeTestClick} onKeyPress={this.onKeyPress} setSelectedDay={this.setSelectedDay} {...this.state} isOpen={isOpen} openModal2={this.openModal2} closeModal2={this.closeModal2} openModal={this.openModal} closeModal={this.closeModal} handle={this.handle} onsaveClick={this.onsaveClick} testlist={testlist} stdinfo={stdinfo} stdlist={stdlist} testlistloading={testlistloading} data={data} noselect={noselect}
      onToggle={this.onToggle} onClick={this.onClick} />
    );
  }
}
const formatDate = (current_datetime)=>{
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
  return formatted_date;
}
export default Container;