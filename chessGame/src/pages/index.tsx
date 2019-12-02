import React,{useState} from 'react';
import styles from './index.css';
import Maps from './maps';
import Board from './board';
import Header from './header';
import Getdice from './getdice';
import MyAward from './myAward';

export default function () {

  return (
    <div>
      <Header />
      <Board />
      <Maps />
      <div className={styles.btns}>
        <Getdice />
        <MyAward />
      </div>
    </div>
  );
}
