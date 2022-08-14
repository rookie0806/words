import React from "react";
import PropTypes from "prop-types";
import {Router,Link } from "react-router-dom";
import styles from "./styles.module.scss";
const Main = (props, context) => (
  <div className={styles.main}>
    <div className={styles.top}>
      <img
          src={require("../../images/logo.png")}
          className={styles.logo}
          alt={"Logo"}
      />
      <div>
        {props.test_words.length!=0 && props.student.name}
        {}
      </div>
    </div>
    <div>
      {props.test_words.length!=0 && props.test_words.map((word,index) =>
             <div>{word.day} / {word.word_eng}</div>
      )}
    </div>
  </div>
);

Main.propTypes = {
  onKeyPress:PropTypes.func.isRequired,
  test_words : PropTypes.array.isRequired,
  student : PropTypes.array.isRequired,
};

export default Main;