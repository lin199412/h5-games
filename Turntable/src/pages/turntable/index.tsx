import React from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';
import awardList from './data/awardList.json';
type awardData = {
    title: string;
    id: number | string;
    pic?: string;
    nTop?: string;
    nLeft?: string;
    pTop?: string;
    pLeft?: string
}

let awardInfo: awardData[] = [...awardList.data];
export default class Turntable extends React.Component {

    state = {
        visible: false,
        turnDeg: 0,
        rotateDeg: 40,
        playTimes: 6,
        resultInfo: ""
    }

    // 转动指针
    turnturn = () => {
        let deg:number = Math.floor(Math.random() * (1024 - 2048) + 2048);
        if(this.state.playTimes > 0){
            this.setState({
                playTimes : this.state.playTimes -1,
                turnDeg: this.state.turnDeg + deg
            }, () => {
                // 判断指针停留的区域
                console.log(this.state.turnDeg)
                setTimeout(()=>{
                    let degNow = this.state.turnDeg % 360;
                    let award = Math.ceil(degNow / 30);
                    console.log(degNow, award-1);
                    // let needleDom = document.getElementById('turnNeedle');
                    // console.log(needleDom.style.transform);

                    if(awardInfo[award-1].title){
                        alert(`恭喜您获得${awardInfo[award-1].title}`)
                    }else{
                        alert('很遗憾, 没有中奖')
                    }
                },3200)
            })
        }
    }

    // 打开中奖弹窗
    openModal = () => {
        this.setState({
            visible: true,
        })
    }

    // 关闭中奖弹窗
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div className={styles.turnBox}>
                <section className={styles.turntableBox}>
                    <div className={styles.turntable}></div>
                    <ul className={styles.dividBox}>
                        <li className={styles.lines} style={{transform: "rotate(0deg)", transformOrigin: "left center",}}></li>
                        <li className={styles.lines} style={{transform: "rotate(30deg)", transformOrigin: "left center",}}></li>
                        <li className={styles.lines} style={{transform: "rotate(60deg)", transformOrigin: "left center",}}></li>
                        <li className={styles.lines} style={{transform: "rotate(90deg)", transformOrigin: "left center",}}></li>
                        <li className={styles.lines} style={{transform: "rotate(120deg)", transformOrigin: "left center",}}></li>
                        <li className={styles.lines} style={{transform: "rotate(150deg)", transformOrigin: "left center",}}></li>
                    </ul>
                    <ul className={styles.awardNameBox}>
                        {
                            awardInfo.map((item,index)=>{
                                return <li key={index} className={styles.awardName} style={{top:`${item.nTop}`,left:`${item.nLeft}`}}>{item.title}</li>
                            })
                        }
                    </ul>
                    <ul className={styles.awardPicBox}>
                        {
                            awardInfo.map((item,index)=>{
                                return <li key={index} className={styles.awardPic} style={{top:`${item.pTop}`,left:`${item.pLeft}`}}><img src={item.pic}/></li>
                            })
                        }
                    </ul>
                    <ul className={styles.awardPic}>
                        <li></li>
                    </ul>
                    <div className={styles.circle} style={{  }}></div>
                    <div className={styles.needle} id="turnNeedle"
                    style={{
                        width: "8px", height: "100px", background: "#fff", position: "absolute", left: "175px", top: "80px",
                        transform: `rotate(${this.state.turnDeg}deg)`, transformOrigin: "center bottom", transition: "all 3s cubic-bezier(0.75, 0.25, 0.25, 0.75)"
                    }}></div>
                </section>

                <Button onClick={this.turnturn}>转盘x{this.state.playTimes}</Button>
                <Modal
                    title="奖品"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <p>{this.state.resultInfo}</p>
                </Modal>
            </div>
        );
    }
}
