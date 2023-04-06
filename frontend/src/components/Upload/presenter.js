import React from "react";
import PropTypes from "prop-types";
import {Router,Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["pdf"];
const Upload = (props,context)=>(
  <div className={styles.main}>
    <div className={styles.file}>
      {!props.uploading &&  (
        <>
        <h1>Drag & Drop CSV Files</h1>
        <FileUploader
          className={styles.label}
          multiple={false}
          handleChange={props.handleChange}
          name="file"
          types={fileTypes}
        />
        </>
      )}
    {props.uploading &&  (
        <>
        {props.statusflag==0 &&
          <h1>업로드 중</h1>
        }
        {props.statusflag==1 &&
          <a href={props.url} download>다운로드</a> 
        }
        {props.statusflag==2 &&
          <h1>업로드 실패</h1>
        }
        </>
      )}
    </div>
  </div>
)

Upload.propTypes = {
  handleChange:PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  statusflag: PropTypes.number.isRequired,
  url : PropTypes.string.isRequired
};
export default Upload;