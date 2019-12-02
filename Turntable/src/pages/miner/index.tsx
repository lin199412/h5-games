import React from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';
import awardList from './awardsList.json';
import { run } from 'jest-cli/build/cli';
import { number } from 'prop-types';
// type awardData = {
//     title: string;
//     id: number | string;
//     pic?: string;
//     nTop?: string;
//     nLeft?: string;
//     pTop?: string;
//     pLeft?: string
// }


// (function run() {
//     requestAnimationFrame(() => {
//         // 代码
//         console.log(333)
//         run();
//     });
// })()

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
        awardsData: [...awardList.data],
        selectOne: 0,
        alreadyGet: [],
        awardModalInfo: "",
    }

    componentDidMount() {
        this.rotation()
    }

    // 锚点自转
    rotation = () => {
        const { turnDeg, clockwise } = this.state;
        if (this.state.isRotating) {
            let timeRotate = setTimeout(() => {
                this.setState({
                    turnDeg: clockwise ? turnDeg + 2 : turnDeg - 2,
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
                    clearTimeout(timeRotate)
                })
            }, 20)
        }
    }

    // 抛锚
    dropAnchor = () => {
        // console.log(this.state.turnDeg);
        if (this.state.isRotating && this.state.playTimes > 0) {
            this.setState({
                isRotating: false,
                playTimes: this.state.playTimes - 1,
                turnDeg: this.state.clockwise ? this.state.turnDeg + 2 : this.state.turnDeg - 2
            }, () => {
                // 定时器过渡, 让动画更自然
                setTimeout(() => {
                    // 弧度
                    let radian = 2 * Math.PI / 360 * this.state.turnDeg;
                    // 对边
                    let headSin: number = Math.sin(radian) * 80;
                    // 邻边
                    let headCos: number = Math.cos(radian) * 80;
                    // console.log(this.state.turnDeg, headSin, headCos);
                    let headTop: number = headSin;
                    let headLeft: number = 162 + headCos;
                    // console.log(headTop, headLeft)
                    this.setState({
                        headTop: headTop - 8,
                        headLeft: headLeft - 8,
                        flyBalls: true
                    }, () => {
                        this.anchorFly(21)
                    })
                }, 200)
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
                    let getIndex:number[] = [];
                    this.state.awardsData.map((item,index)=>{
                        let lengthPow = 
                            Math.pow((this.state.headTop + 7 - item.top - item.width/2), 2) 
                            + Math.pow((this.state.headLeft + 7 - item.left - item.width/2), 2)
                        let length = Math.sqrt(lengthPow)
                        let twoRadio = 7 + item.width/2;
                        console.log("index",index,"lengthPow",lengthPow,"length",length,"twoRadio",twoRadio)
                        if(length <= twoRadio){
                            getIndex.push(index)
                        }
                    })
                    // 判断锚点和目标是否碰到, 以及是否能被勾到
                    if (getIndex.length && this.state.awardsData[getIndex[0]].can) {
                        console.log(getIndex.length)
                        setTimeout(() => {
                            this.pullBack(getIndex[0]);
                        }, 200);
                    }else{
                        this.anchorFly(times - 1)
                    }
                })
            }, 40)
        } else {
            this.getNothing()
        }
    }

    // 无功而返
    getNothing = () => {
        if (this.state.minerWidth >= 100) {
            setTimeout(() => {
                // 弧度
                let radian = 2 * Math.PI / 360 * this.state.turnDeg;
                // 对边
                let headSin: number = Math.sin(radian) * 20;
                // 邻边
                let headCos: number = Math.cos(radian) * 20;
                this.setState({
                    headTop: this.state.headTop - headSin,
                    headLeft: this.state.headLeft - headCos,
                    minerWidth: this.state.minerWidth - 20,
                }, () => {
                    this.getNothing()
                })
            }, 40);
        } else {
            this.setState({
                isRotating: true,
                flyBalls: false
            }, () => {
                this.rotation()
            })
        }
    }

    // 拖回奖品
    pullBack = (num: number) => {
        if (this.state.minerWidth >= 100) {
            setTimeout(() => {
                // 弧度
                let radian = 2 * Math.PI / 360 * this.state.turnDeg;
                // 对边
                let headSin: number = Math.sin(radian) * 12;
                // 邻边
                let headCos: number = Math.cos(radian) * 12;
                let awardsDataNow = [...this.state.awardsData];
                awardsDataNow[num].top = awardsDataNow[num].top - headSin;
                awardsDataNow[num].left = awardsDataNow[num].left - headCos;
                // console.log(awardsDataNow)
                this.setState({
                    headTop: this.state.headTop - headSin,
                    headLeft: this.state.headLeft - headCos,
                    minerWidth: this.state.minerWidth - 12,
                    awardsData: awardsDataNow
                }, () => {
                    this.pullBack(num)
                })
            }, 40);
        } else {
            let awardsDataNow = [...this.state.awardsData];
            awardsDataNow[num].show = false;
            awardsDataNow[num].can = false;
            this.setState({
                awardsData: awardsDataNow,
                visible: true,
                isRotating: true,
                flyBalls: false,
                awardModalInfo: awardsDataNow[num].title
            }, () => {
                this.rotation()
            })
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
                            transform: `rotate(${this.state.turnDeg}deg)`, transformOrigin: "left center", transition: "all 0.05s linear"
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
                                transition: "all 0.05s linear"
                            }}
                        ></span>
                    }
                    {
                        this.state.awardsData.map((item) => {
                            return item.show && <div key={item.id} style={{
                                width: `${item.width}px`,
                                height: `${item.height}px`,
                                background: item.can?item.background2:item.background,
                                position: "absolute",
                                borderRadius: "50%",
                                transition: "all 0.05s linear",
                                top: `${item.top}px`,
                                left: `${item.left}px`
                            }}>{item.title}</div>
                        })
                    }
                </section>

                <Button disabled={this.state.playTimes > 0 ? false : true} onClick={this.dropAnchor}>抛锚x{this.state.playTimes}</Button>
                <Modal
                    title="奖品"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                <p>恭喜您获得奖品: {this.state.awardModalInfo}</p>
                </Modal>
            </div>
        );
    }
}
