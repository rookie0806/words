import React from "react";
import PropTypes from "prop-types";
import {Router,Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { ResponsiveLine } from '@nivo/line'
import {Treebeard} from 'react-treebeard';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from 'react-to-print';
import ReactLoading from 'react-loading';
const footer = (
  <p>날짜를 선택해주세요</p>
);
const Detail = (props, context) => (
 
  <div className={styles.main}>
    <>
      <div className={styles.loadingpage}>
        {(props.imgok || props.alram)  && (<ReactLoading type={"spinningBubbles"} color={"black"} height={'200px'} width={'200px'} />)}
      </div>
    </>
    {!props.imgok && (
    <>
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div  className={styles.hrsect}>책을 선택해주세요</div>
        <div className={styles.box}>
        <select name="selectbook" onChange={props.handle} className={styles.selectbox}>
          {props.booklist.length!=0 && props.booklist.map((book,index) =>
             <option value={book.name}>{book.name}</option>
            )}
            
        </select>
        </div>
        <div  className={styles.hrsect}>테스트 날짜를 입력해주세요</div>
        <div className={styles.box}>
          <input name="test_date" onChange={props.handle} className={styles.inputbox} defaultValue={props.test_date}/>
        </div>
        <div  className={styles.hrsect}>시작 날짜와 끝날짜를 입력해주세요</div>
        <div className={styles.box}>
        <input name="start_day" onChange={props.handle} className={styles.inputbox} defaultValue={props.start_day}/>
        <div> ~ </div>
        <input name="end_day" onChange={props.handle} className={styles.inputbox} defaultValue={props.end_day}/>
        </div>
        <div className={styles.hrsect}>출제 비율을 선택해주세요</div>
        <div className={styles.box}>
        <select name="selectcnt" onChange={props.handle} className={styles.selectbox}>
          <option value={100}>100%</option>
          <option value={75}>75%</option>
          <option value={50}>50%</option>
        </select>
        </div>
        <button id={props.stdinfo!=[] && props.stdinfo.uuid}  onClick={props.makeTestClick} className={styles.rbtn}>
          테스트 만들기
        </button>

    </Modal>
    <Modal
        isOpen={props.isOpen2}
        onRequestClose={props.closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div  className={styles.hrsect}>틀린 단어의 id를 입력 및 엔터 입력</div>
        <input id="failword" onKeyPress={props.onKeyPress} name="id" onChange={props.handle} className={styles.inputbox2} defaultValue={props.id}/>
        <div  className={styles.hrtext}>{!props.word=="" && (
          <>
          {props.word} 등록 완료
          </>
        )}</div>
    </Modal>
    <div className={styles.logo}>
      <div className={styles.text}>
        <div className={styles.front}>
          B & Y
        </div>
        <div className={styles.back}>
          ENGLISH
        </div>
      </div>
    </div>
    <div className={styles.mainbox}>
      <div className={styles.topbox}>
        <div className={styles.toptopbox}>
          <div className={styles.box}>
            <div className={styles.infotitle}>학생 정보</div>
            <div className={styles.infotext}>이름 : {props.stdinfo!=[] && props.stdinfo.name}</div>
            <textarea name="text" onChange={props.handle} id="textarea" className={styles.bigo} />
            <button onClick={props.onsaveClick} id={props.stdinfo!=[] && props.stdinfo.uuid} className={styles.rbtn}>
              저장
            </button>
          </div>
        </div>
        <div className={styles.middle2box}>
          선택한 그룹 인원 : {props.stdlist.length} 명
        </div>
        <div className={styles.topbottombox}>

              
          <div className={styles.leftbox}>
            {!props.testlistloading && (
              <>
                <Treebeard
                      data={props.data}
                      onToggle={props.onToggle}
                  />
              </>
            )}
          </div>
          <div className={styles.rightbox}>
            {props.stdlist.length==0 && (
              <ul>
                <li>
                  왼쪽에서 학생을 선택해주세요
                </li>
              </ul>
            )}
            {props.stdlist.length!=0 && (
              <ul>
                {props.stdlist.map((std,index) =>
                <Stdli {...props} std={std}/>
                )}
              </ul>
            )}
          
        </div>
        </div>
      </div>
      
      <div className={styles.middlebox}>
        <div className={styles.box}>
          <div className={styles.btnbox}>
          <button onClick={props.openModal2}className={styles.newbtn2}>
            틀린 문제 등록
          </button>
          <button onClick={props.makeFailTestClick}className={styles.newbtn2}>
            오답문제지 출력 
          </button>
          <button onClick={props.openModal}className={styles.newbtn}>
            새로운 시험지 만들기
          </button>
          </div>
          <table className={styles.result}>
              <tr className={styles.headerrow}>
                <th className={styles.header}>
                  삭제
                </th>
                <th className={styles.header}>
                  과정
                </th>
                <th className={styles.header}>시험날짜
                </th>
                <th className={styles.header}>DAY
                </th>
                <th className={styles.header}>문제수
                </th>
                <th className={styles.header}>시험회차
                </th>
                <th className={styles.header}>복습회차
                </th>
              </tr>
              {props.testlist.length!=0 && (
                  <>
                  {props.testlist.map((test,index) =>
                  <TestButton {...props} test2={props.testlist.length} index={index} test={test}/>
                  )}
                  </>
              )}
          </table>
         
        </div>
        
        
      </div>
    </div>
    </>
    )}
  </div>
  
);
const Stdli= (props,context) => (
  <>
  {props.stduuid == props.std.uuid && (
    <li onClick={
        props.onClick} className={styles.stdlired} id={props.std.uuid}>
        {props.std.name}
    </li>
  )
  }
  {props.stduuid != props.std.uuid && (
    <li onClick={
        props.onClick} className={styles.stdli} id={props.std.uuid}>
        {props.std.name}
    </li>
  )
  }
    
  </>
)
const TestButton = (props,context) => (
  <>
    {(props.index==0 || props.index==2 || props.index== 4 || props.index== 8) && (
      <tr className={styles.headerrowred}>
      <td onClick={(e) => props.delete(props.test.uuid)} className={styles.bodys}>
        삭제
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>
        {props.test.book_name} 
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.test_date}
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.start_day} ~ {props.test.end_day}
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.test_words_count}
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test2-props.index}
      </td>
      <td  onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.index+1}
      </td>
    </tr>
    )}
     {!(props.index==0 || props.index==2 || props.index== 4 || props.index== 8)  && (
      <tr  className={styles.headerrow}>
      <td onClick={(e) => props.delete(props.test.uuid)} className={styles.bodys}>
        삭제
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>
        {props.test.book_name} 
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.test_date}
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.start_day} ~ {props.test.end_day}
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test.test_words_count}
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.test2-props.index}
      </td>
      <td onClick={(e) => props.printImage(props.test.uuid)} className={styles.bodys}>{props.index+1}
      </td>
    </tr>
    )}
    
  </>
)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Detail.propTypes = {
  data: PropTypes.array.isRequired,
  testlistloading : PropTypes.bool.isRequired,
  onToggle : PropTypes.func.isRequired,
  onClick:PropTypes.func.isRequired,
  onsaveClick:PropTypes.func.isRequired,
  handle:PropTypes.func.isRequired,
  noselect : PropTypes.func.isRequired,
  stdlist : PropTypes.object.isRequired,
  makeFailTestClick:PropTypes.func.isRequired,
  delete :  PropTypes.func.isRequired,
  stdinfo : PropTypes.object.isRequired,
  testlist :  PropTypes.object.isRequired,
  openModal : PropTypes.func.isRequired,
  closeModal : PropTypes.func.isRequired,
  openModal2 : PropTypes.func.isRequired,
  closeModal2 : PropTypes.func.isRequired,
  isOpen : PropTypes.bool.isRequired,
  isOpen2 : PropTypes.bool.isRequired,
  booklist :  PropTypes.bool.isRequired,
  setSelectedDay : PropTypes.func.isRequired,
  selectedDay : PropTypes.element.isRequired,
  start_day : PropTypes.number.isRequired,
  end_day : PropTypes.number.isRequired,
  makeTestClick: PropTypes.func.isRequired,
  printImage:PropTypes.func.isRequired,
  imgok : PropTypes.bool.isRequired,
  alram :  PropTypes.bool.isRequired,
  stduuid : PropTypes.string.isRequired,
};
Stdli.propTypes = {
  std: PropTypes.array.isRequired,
  stduuid : PropTypes.string.isRequired,
};
TestButton.propTypes = {
  test : PropTypes.array.isRequired,
  test2 : PropTypes.number.isRequired,
  index : PropTypes.number.isRequired
};
export default Detail;