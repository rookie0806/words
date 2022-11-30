import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./presenter";
import { zhCN } from "date-fns/locale";

class Container extends Component {
  state = {
    text : "",
    test_words : [],
    student : [],
    test : [],
    test2 : [],
    testtable : [],
  };
  
  static propTypes = {
    testinfo : PropTypes.array.isRequired,
    pathname : PropTypes.array.isRequired,
    getTestInfo : PropTypes.func.isRequired
  };
  
  componentWillReceiveProps = nextProps => {
    const {pathname,getTestInfo} = this.props;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const kor = urlParams.get('kor');
    if(nextProps.testinfo){
      var x = [];
      for (var i = 0; i < nextProps.testinfo.test_words.length/75; i++) {
        x.push(i)
      }
      console.log(x);
      this.setState((
        {
          test2 : x,
          test : nextProps.testinfo,
        } 
        
      ),
      ()=>
      {
        for(var i=0;i<nextProps.testinfo.test_words.length;i++){
          document.getElementById("day"+i).innerText  = nextProps.testinfo.test_words[i].day
          document.getElementById("no"+i).innerText  = nextProps.testinfo.test_words[i].id
          document.getElementById("word"+i).innerText = nextProps.testinfo.test_words[i].word_eng
          if(kor=='yes'){
            document.getElementById("kor"+i).innerText = nextProps.testinfo.test_words[i].word_kor
          }
        }
      }
      )
      
      
    }
    
  };
  componentDidMount() {
    var x= [];
    var y = [];
    for (var i = 0; i < 25; i++) {
      x.push(i)
    }
    
    this.setState({
      testtable : x
    })
    const {pathname,getTestInfo} = this.props;
    getTestInfo(pathname.split('test/')[1]);
  };
  onKeyPress = (e) =>{
    const {getStudentList } = this.props;
    this.setState({
      text : e.target.value
    })
    if(e.key==='Enter'){
      getStudentList(e.target.value);
    }
  }
  render() {
    return (
      <>
      <Main {...this.state} onKeyPress={this.onKeyPress} />
      </>
    );
  }
}

export default Container;