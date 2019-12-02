import React from 'react';
import styles from './index.css';
import Turntable from './turntable';
import Turntable2 from './turntableTwo';
import { Modal, Button } from 'antd';
import router from 'umi/router';
import Parabola from './parabola';
import Miner from './miner';
import CanvasFun from './canvasFun';
export default function() {

    return (
        <div>
            {/* <div style={{width:"100%",height:"120px",background:"#ccc",lineHeight:"120px"}}>转盘小游戏</div>
            <Turntable/>
            <Turntable2/>
            <Parabola/> */}
            <Miner/>
            {/* <CanvasFun/> */}
        </div>
    );
}
