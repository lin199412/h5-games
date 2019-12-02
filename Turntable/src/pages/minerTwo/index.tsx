import React from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';
// import awardList from './data/awardList.json';
// type awardData = {
//     title: string;
//     id: number | string;
//     pic?: string;
//     nTop?: string;
//     nLeft?: string;
//     pTop?: string;
//     pLeft?: string
// }

// let awardInfo: awardData[] = [...awardList.data];
export default class Miner extends React.Component {

    state = {
        visible: false,
        turnDeg: 10,
        playTimes: 6,
        resultInfo: "",
        isRotating: true,// 正在旋转
        clockwise: true,// 顺时针
        headTop: 0,
        headLeft: 0,
        flyTimes: 100,
        flyBalls: false,
        minerWidth: 80,
    }

    componentDidMount() {
        this.rotation()
    }

    // 锚点自转
    rotation = () => {
        const { turnDeg, clockwise } = this.state;
        if (this.state.isRotating) {
            setTimeout(() => {
                this.setState({
                    turnDeg: clockwise ? turnDeg + 10 : turnDeg - 10,
                }, () => {
                    if (turnDeg < 170 && 10 < turnDeg) {
                        // console.log(turnDeg)
                        this.rotation()
                    } else if (turnDeg >= 170) {
                        // console.log(turnDeg)
                        this.setState({
                            clockwise: false
                        }, () => {
                            this.rotation()
                        })
                    } else if (turnDeg <= 10) {
                        this.setState({
                            clockwise: true
                        }, () => {
                            this.rotation()
                        })
                    }
                })
            }, 100)
        }
    }

    // 抛锚
    dropAnchor = () => {
        console.log(this.state.turnDeg);
        if (this.state.isRotating) {
            this.setState({
                isRotating: false,
                turnDeg: this.state.clockwise ? this.state.turnDeg + 10 : this.state.turnDeg - 10
            }, () => {
                // 定时器过渡, 让动画更自然
                setTimeout(() => {
                    // 弧度
                    let radian = 2 * Math.PI / 360 * this.state.turnDeg;
                    // 对边
                    let headSin: number = Math.sin(radian) * 80;
                    // 邻边
                    let headCos: number = Math.cos(radian) * 80;
                    console.log(this.state.turnDeg, headSin, headCos);
                    let headTop: number = headSin;
                    let headLeft: number = 162 + headCos;
                    console.log(headTop, headLeft)
                    this.setState({
                        headTop: headTop - 8,
                        headLeft: headLeft - 8,
                        flyBalls: true
                    }, () => {
                        this.anchorFly(25)
                    })
                },300)
            })
        }
    }

    // 锚点飞出
    anchorFly = (times: number) => {
        if (times > 0) {
            setTimeout(() => {
                // console.log('fly')
                // 弧度
                let radian = 2 * Math.PI / 360 * this.state.turnDeg;
                // 对边
                let headSin: number = Math.sin(radian) * 20;
                // 邻边
                let headCos: number = Math.cos(radian) * 20;
                this.setState({
                    headTop: this.state.headTop + headSin,
                    headLeft: this.state.headLeft + headCos,
                    minerWidth: this.state.minerWidth + 20
                }, () => {
                    // 简易版碰撞检测, 先写一个类似黄金矿工的小游戏, 之后再修改
                    let length = Math.sqrt(Math.pow((this.state.headTop+7 - 375),2) + Math.pow((this.state.headLeft+7 - 75),2))
                    let twoRadio = 7 + 25 - 10;
                    let length2 = Math.sqrt(Math.pow((this.state.headTop+7 - 413),2) + Math.pow((this.state.headLeft+7 - 163),2))
                    let twoRadio2 = 7 + 33 - 10;
                    let length3 = Math.sqrt(Math.pow((this.state.headTop+7 - 343),2) + Math.pow((this.state.headLeft+7 - 253),2))
                    let twoRadio3 = 7 + 33 - 10;
                    if(length <= twoRadio || length2 <= twoRadio2 || length3 <= twoRadio3){
                        setTimeout(() => {
                            alert("中奖")
                            return
                        }, 100);
                    }else{
                        console.log(this.state.headTop, this.state.headLeft)
                        this.anchorFly(times - 1)
                    }
                })
                // if (this.state.turnDeg > 0 && this.state.turnDeg < 90) {
                //     this.setState({
                //         headTop: this.state.headTop + headSin,
                //         headLeft: this.state.headLeft + headCos,
                //     }, () => {
                //         console.log(this.state.headTop, this.state.headLeft)
                //         this.anchorFly(times - 1)
                //     })
                // } else if (this.state.turnDeg > 90 && this.state.turnDeg < 180) {
                //     this.setState({
                //         headTop: this.state.headTop + headSin,
                //         headLeft: this.state.headLeft + headCos,
                //     }, () => {
                //         console.log(this.state.headTop, this.state.headLeft)
                //         this.anchorFly(times - 1)
                //     })
                // }
            }, 100)
        }
    }

    // 打开中奖弹窗
    openModal = () => {
        this.setState({
            visible: true
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
            <div className={styles.gameMiner}>
                <section className={styles.minerBox}>
                    <div className={styles.miner}
                        style={{
                            width: `${this.state.minerWidth}px`,
                            transform: `rotate(${this.state.turnDeg}deg)`, transformOrigin: "left center", transition: "all 0.1s linear"
                        }}>
                        <span className={styles.line}></span>
                        {
                            !this.state.flyBalls && <span className={styles.header}></span>
                        }
                    </div>
                    {
                        this.state.flyBalls && <span className={styles.header2}
                            style={{
                                position: "absolute",
                                left: this.state.headLeft,
                                top: this.state.headTop,
                                transition: "all 0.1s linear"
                            }}
                        ></span>
                    }
                    <div className={styles.award1}>1</div>
                    <div className={styles.award2}>2</div>
                    <div className={styles.award3}>3</div>
                </section>

                <Button onClick={this.dropAnchor}>抛锚x{this.state.playTimes}</Button>
                <Modal
                    title="奖品"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <p>中奖了</p>
                </Modal>
            </div>
        );
    }
}
