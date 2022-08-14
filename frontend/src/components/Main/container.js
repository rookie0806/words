import React, { Component } from "react";
import PropTypes from "prop-types";
import Main from "./presenter";

class Container extends Component {
  state = {
    text : "",
    test_words : [],
    student : [],
    test : [],
  };
  static propTypes = {
    testinfo : PropTypes.array.isRequired,
    pathname : PropTypes.array.isRequired,
    getTestInfo : PropTypes.func.isRequired
  };
  
  componentWillReceiveProps = nextProps => {
    if(nextProps.testinfo){
      this.setState({
        student : nextProps.testinfo.student,
        test_words : nextProps.testinfo.test_words
      })
    }
  };
  componentDidMount() {
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