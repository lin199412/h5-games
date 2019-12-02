import React from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';
import awardList from './data/awardList.json'
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
        playTimes: 6,
        resultInfo: ""
    }

    // 转动指针
    turnturn = () => {
        let deg: number = Math.floor(Math.random() * (1024 - 2048) + 2048);
        if (this.state.playTimes > 0) {
            this.setState({
                playTimes: this.state.playTimes - 1,
                turnDeg: this.state.turnDeg - deg
            }, () => {
                // 判断指针停留的区域
                console.log(this.state.turnDeg)
                setTimeout(() => {
                    let degNow = this.state.turnDeg % 360;
                    let award = Math.ceil(degNow / 30);
                    console.log(degNow, -award);

                    if(awardInfo[-award].title){
                        alert(`恭喜您获得${awardInfo[-award].title}`)
                    }else{
                        alert('很遗憾, 没有中奖')
                    }
                }, 3200)
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
                    <div className={styles.turntables}
                    style={{ transform: `rotate(${this.state.turnDeg}deg)`, transformOrigin: "center center", transition: "all 3s cubic-bezier(0.75, 0.25, 0.25, 0.75)" }}>
                        <div className={styles.turntable}></div>
                        <ul className={styles.dividBox}>
                            <li className={styles.lines} style={{ transform: "rotate(0deg)", transformOrigin: "left center", }}></li>
                            <li className={styles.lines} style={{ transform: "rotate(30deg)", transformOrigin: "left center", }}></li>
                            <li className={styles.lines} style={{ transform: "rotate(60deg)", transformOrigin: "left center", }}></li>
                            <li className={styles.lines} style={{ transform: "rotate(90deg)", transformOrigin: "left center", }}></li>
                            <li className={styles.lines} style={{ transform: "rotate(120deg)", transformOrigin: "left center", }}></li>
                            <li className={styles.lines} style={{ transform: "rotate(150deg)", transformOrigin: "left center", }}></li>
                        </ul>
                        <ul className={styles.awardBox}>
                            {
                                awardInfo.map((item, index) => {
                                    return <li key={index} className={styles.award} style={{transform: `rotate(${-12+(index+1)*30}deg)`, transformOrigin: "left center"}}>
                                        <span className={styles.pic}>
                                            <img src="http://hq-expert.oss-cn-shenzhen.aliyuncs.com/hangjia/v2/image/u=1397492903,1134826276&fm=26&gp=0-cpm3j05q2ieuaoa.jpg" alt=""/>
                                        </span>
                                        <span className={styles.name}>{item.title}</span>
                                    </li>
                                })
                            }
                        </ul>
                        <ul className={styles.awardPic}>
                            <li></li>
                        </ul>
                    </div>
                    <div className={styles.circle}></div>
                    <div className={styles.needle} style={{
                        width: "100px", height: "8px", background: "#fff", position: "absolute", left: "180px", top: "176px",
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
