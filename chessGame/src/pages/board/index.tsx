import React from 'react';
import { Carousel } from 'antd';
import styles from './index.css';

export default function(){
    type winner = {
        name: string;
        id?: number | string;
        award: string;
    }

    let winnerList: winner[] = [
        {
            name: "张三",
            id: "1",
            award: "一等奖"
        },{
            name: "李四",
            id: "2",
            award: "二等奖"
        },{
            name: "王五",
            id: "3",
            award: "三等奖"
        }
    ]

    return(
        <div className={styles.boardBox}>
            <i className="iconfont icondTrumpet" style={{position: "absolute",left: "10px",top: "6px",fontSize: "16px"}}></i>
            <Carousel autoplay dotPosition="right" dots={false}>
                {
                    winnerList.map((item,index)=>{
                        return <div key={index}>{"恭喜" + item.name + "获得" + item.award}</div>
                    })
                }
            </Carousel>
        </div>
    )
}