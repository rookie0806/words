import React, { Component } from "react";
import PropTypes from "prop-types";
import Upload from "./presenter";

class Container extends Component {
  state = {
    uploading:false,
    statusflag : 0,
    url : ""
  };
  
  static propTypes = {
    csvupload : PropTypes.func.isRequired,
    status:PropTypes.object.isRequired,
  };
  
  componentWillReceiveProps = nextProps => {
    if(nextProps.status){
      if(this.state.uploading==true){
        console.log(nextProps.status.length,nextProps.status)
        if(nextProps.status[0].length>8){
          this.setState({
            statusflag : 1,
            url : nextProps.status
          })
        }
        if(nextProps.status=="fail"){
          this.setState({
            statusflag : 2,
          })
        }
      }
    }
  };
  handleChange = (file) => {
    const {csvupload } = this.props;
    this.setState({
      uploading : true
    })
    console.log(file.files)
    csvupload(file);
  };
  componentDidMount() {
   
  }
  render() {
    return (
      <>
      <Upload handleChange={this.handleChange} {...this.state} onKeyPress={this.onKeyPress} />
      </>
    );
  }
}

export default Container;