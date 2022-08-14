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
      <div className={styles.info}>
        <div className={styles.line}>
          DAY  : 
          {props.test.length!=0 && props.test.start_day}
          ~
          {props.test.length!=0 && props.test.end_day}
        </div>
        <div className={styles.line}>
          테스트 날짜 : 
          {props.test.length!=0 && props.test.test_date}
        </div>
        <div className={styles.line}>
          이름 : {props.test.length!=0 && props.test.student.name}
        </div>
      </div>
    </div>
    <div>
      
    <div className={styles.testtable}>
      <table className={styles.result}>
          <tr className={styles.headerrow}>
            <th className={styles.headerd}>
              DAY
            </th>
            <th className={styles.headern}>
              NO
            </th>
            <th className={styles.headerw}>
              WORD
            </th>
            <th className={styles.headerw}>
              CHECK
            </th>
          </tr>
          <>
          {props.testtable.map((word,index) =>
          <TestButton {...props} index={index}  test={0}  word={word}/>
          )}
          </>
      </table>
      <table className={styles.result}>
          <tr className={styles.headerrow}>
            <th className={styles.headerd}>
              DAY
            </th>
            <th className={styles.headern}>
              NO
            </th>
            <th className={styles.headerw}>
              WORD
            </th>
            <th className={styles.headerw}>
              CHECK
            </th>
          </tr>
          <>
          {props.testtable.map((word,index) =>
          <TestButton {...props} index={index}  test={1} word={word}/>
          )}
          </>
      </table>
      <table className={styles.result}>
          <tr className={styles.headerrow}>
            <th className={styles.headerd}>
              DAY
            </th>
            <th className={styles.headern}>
              NO
            </th>
            <th className={styles.headerw}>
              WORD
            </th>
            <th className={styles.headerw}>
              CHECK
            </th>
          </tr>
          <>
          {props.testtable.map((word,index) =>
          <TestButton {...props} index={index}  test={2}  word={word}/>
          )}
          </>
      </table>
    </div>
    
    </div>
  </div>
);


const TestButton = (props,context) => (
  <>
    { (
      <tr className={styles.headerrowred}>
      <td id={"day"+(props.word + 35*props.test)}  className={styles.bodys}>
        
      </td>
      <td id={"no"+(props.word + 35*props.test)} className={styles.bodys}>
      </td>
      <td id={"word"+ (props.word + 35*props.test)} className={styles.bodys}>
      </td>
      <td   className={styles.bodys}>

      </td>
    </tr>
    )}
    
  </>
)

Main.propTypes = {
  onKeyPress:PropTypes.func.isRequired,
  test_words : PropTypes.array.isRequired,
  student : PropTypes.array.isRequired,
  testtable:PropTypes.array.isRequired,
};

export default Main;