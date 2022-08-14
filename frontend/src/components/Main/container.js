import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./presenter";

class Container extends Component {
  state = {
    text : "",
    test_words : [],
    student : [],
    test : [],
    testtable : [],
  };
  
  static propTypes = {
    testinfo : PropTypes.array.isRequired,
    pathname : PropTypes.array.isRequired,
    getTestInfo : PropTypes.func.isRequired
  };
  
  componentWillReceiveProps = nextProps => {
    if(nextProps.testinfo){
      this.setState({
        test : nextProps.testinfo
      })
      var n = 105;
      if(nextProps.testinfo.test_words.length<105){
        n = nextProps.testinfo.test_words.length
      }
      for(var i=0;i<n;i++){
        document.getElementById("day"+i).innerText  = nextProps.testinfo.test_words[i].day
        document.getElementById("no"+i).innerText  = nextProps.testinfo.test_words[i].id
        document.getElementById("word"+i).innerText = nextProps.testinfo.test_words[i].word_eng
      }
    }
  };
  componentDidMount() {
    var x= [];
    for (var i = 0; i < 35; i++) {
      x.push(i)
    }
    this.setState({
      testtable : x
    })
    console.log(this.state.testtable);
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
      <Main {...this.state} onKeyPress={this.onKeyPress} />
    );
  }
}

export default Container;