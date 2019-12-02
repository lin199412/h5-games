import React from "react";
import styles from './index.less';
import mapData from './mapData.json';
import mapData2 from './mapData2.json';
import { Modal } from 'antd';
import picMap2 from './map2.jpg';
// import { Select } from 'antd';
// const { Option } = Select;

type mapData = {
    title: string;
    id: number | string;
    award?: string;
    sWidth?: string;
    sHeight?: string;
    sTop: string;
    sLeft: string;
}

// let tabsOne: mapData[] = [...mapData.data];

// 待补充: 清除定时器
export default class Maps extends React.Component {
    state = {
        num: 0,
        nTop: "0px",
        nLeft: "0px",
        isOk: true,
        visible: false,
        numAdd: 1,
        diceNum: 5,
        mapType: "1",
        tabsOne: [...mapData.data],
        showMask: false,
    }

    // 掷骰子
    gogogo = () => {
        if (this.state.diceNum && this.state.isOk) {
            this.setState({
                diceNum: this.state.diceNum - 1
            }, () => {
                this.switchDice(6);
            })
        }
    }

    // 摇一摇, 掷骰子
    componentDidMount(){
        const EMPTY_VALUE = 100;
        const THREAD_HOLD = 13.8;
        let minX = EMPTY_VALUE;
        let minY = EMPTY_VALUE;
        window.ondevicemotion = function(event){
            let gravity: any = event.accelerationIncludingGravity;
            let x = gravity.x;
            let y = gravity.y;
            if(x < minX) minX = x;
            if(y < minY) minY = y;
            if(Math.abs(x - minX) > THREAD_HOLD && Math.abs(y - minY) > THREAD_HOLD){
                console.log("shake");
                var event2 = new CustomEvent("shake");
                window.dispatchEvent(event2);
                minX = minY = EMPTY_VALUE;
            }
        }
        let _this = this;
        window.addEventListener("shake",function(){
            console.log("window shake callback was called")
            _this.gogogo()
        })
    }

    // 随机切骰子
    switchDice = (switchTime: number) => {
        this.setState({
            isOk: false,
            showMask: true
        }, () => {
            switchTime--;
            if (switchTime >= 0) {
                setTimeout(() => {
                    let numFake: number = Math.floor(Math.random() * (1 - 6) + 6);
                    this.setState({
                        numAdd: numFake
                    }, () => {
                        this.switchDice(switchTime);
                    })
                }, 300)
            } else {
                let numAdd: number = Math.floor(Math.random() * (1 - 6) + 6);
                console.log(numAdd)
                this.setState({
                    numAdd
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            showMask: false,
                        }, () => {
                            this.oneStep(numAdd, true);
                        })
                    }, 500);
                })
            }
        })
    }

    // 前进/后退一步, 做了前进达到终点的归零判断, 待补充"后退不归零的判断"
    oneStep = (numAdd: number, forward?: boolean) => {
        const { num } = this.state;
        if (numAdd >= 1) {
            if (num < 29) {// 当前位置小于29
                setTimeout(() => {
                    this.setState({
                        nTop: forward ? this.state.tabsOne[num + 1].sTop : this.state.tabsOne[num - 1].sTop,
                        nLeft: forward ? this.state.tabsOne[num + 1].sLeft : this.state.tabsOne[num - 1].sLeft,
                        num: forward ? num + 1 : num - 1
                    }, () => {
                        console.log(this.state.nTop, this.state.nLeft)
                        numAdd--;
                        console.log(numAdd);
                        if (numAdd >= 1) {
                            this.oneStep(numAdd, forward);
                        } else {
                            this.arrviedJudgement();
                        }
                    })
                }, 900)
            } else if (num == 29) {//当前位置等于29, 归零处理
                setTimeout(() => {
                    this.setState({
                        nTop: this.state.tabsOne[0].sTop,
                        nLeft: this.state.tabsOne[0].sLeft,
                        num: 0
                    }, () => {
                        console.log(this.state.nTop, this.state.nLeft)
                        numAdd--;
                        console.log(numAdd);
                        if (numAdd >= 1) {
                            this.oneStep(numAdd, forward);
                        } else {
                            this.arrviedJudgement();
                        }
                    })
                }, 900)
            }
        }
    }

    // 落地点判断
    arrviedJudgement = () => {
        // switch(this.state.num){
        //     case 3 || 8:
        //     this.showModal(); 
        // }
        // 中奖
        if (this.state.num == 3 || this.state.num == 8) {
            setTimeout(() => {
                this.showModal(); 
            }, 660);
        }
        // 前进两步
        if (this.state.num == 5) {
            this.oneStep(2, true);
        }
        // 退三格
        if (this.state.num == 9) {
            this.oneStep(3, false);
        }
        // 任意门
        if (this.state.num == 11) {
            setTimeout(() => {
                let numRandom: number = Math.floor(Math.random() * (0 - 29) + 29);
                this.setState({
                    num: numRandom,
                    nTop: this.state.tabsOne[numRandom].sTop,
                    nLeft: this.state.tabsOne[numRandom].sLeft,
                }, () => {
                    this.arrviedJudgement()
                })
            }, 900)
        }

        // 打开开关, 允许再次投掷骰子
        if (this.state.diceNum) {
            this.setState({
                isOk: true
            })
        }
    }

    // 中奖弹窗
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 关闭中奖弹窗
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    //切换地图
    mapChange = (val: string) => {
        console.log(val)
        this.setState({
            mapType: val
        })
        if (this.state.mapType === "2") {
            this.setState({
                nTop: "200px",
                nLeft: "50px",
            })
        }
    }

    // 地图DOM结构
    mapDom = () => {
        switch (this.state.mapType) {
            case "1":
                return <React.Fragment>
                    {
                        this.state.tabsOne.map((item, index) => {
                            return <li key={index}
                                style={{
                                    position: "absolute", border: "1px solid #999", borderRadius: "10px", lineHeight: "50px",
                                    width: item.sWidth, height: item.sHeight, top: item.sTop, left: item.sLeft
                                }}
                            >{item.title}</li>
                        })
                    }
                </React.Fragment>
            case "2":
                return <li>
                    <img src={picMap2} style={{ width: "100%" }} />
                </li>
            default:
                return
        }
    }

    render() {
        return (
            <div className={styles.mapsBox}>
                <ul style={{ position: "relative", width: "300px", height: "420px", margin: "auto" }}>
                    <li
                        className={styles.userBox}
                        style={{
                            top: this.state.nTop, left: this.state.nLeft,
                            position: "absolute", borderRadius: "50%", lineHeight: "50px", width: "50px", height: "50px", background: "", zIndex: 10, transition: "all 1s",
                        }}>
                        <div className={styles.box}></div>
                    </li>
                    {this.mapDom()}
                </ul>
                <section style={{ display: "flex", justifyContent: "space-around" }}>
                    <div
                        onClick={this.gogogo}
                        style={{
                            borderRadius: "10px", lineHeight: "35px", width: "80px", height: "35px", background: this.state.isOk ? "aquamarine" : "#bbb", zIndex: 10,
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>骰子x<em>{this.state.diceNum}</em></span>
                    </div>

                    {/* <Select defaultValue="地图1" style={{ width: 70 }} onChange={this.mapChange} showArrow={false}>
                        <Option value="1">地图1</Option>
                        <Option value="2">地图2</Option>
                        <Option value="3" disabled>地图3</Option>
                    </Select> */}
                </section>
                {
                    this.state.showMask && <section className={styles.maskBox}>
                        <div className={styles.mask}></div>
                        <div className={styles.dices}>
                            <i className={this.state.numAdd == 1 ? `iconfont icondice1 ${styles.show}` : styles.hide}></i>
                            <i className={this.state.numAdd == 2 ? `iconfont icondice2 ${styles.show}` : styles.hide}></i>
                            <i className={this.state.numAdd == 3 ? `iconfont icondice3 ${styles.show}` : styles.hide}></i>
                            <i className={this.state.numAdd == 4 ? `iconfont icondice4 ${styles.show}` : styles.hide}></i>
                            <i className={this.state.numAdd == 5 ? `iconfont icondice5 ${styles.show}` : styles.hide}></i>
                            <i className={this.state.numAdd == 6 ? `iconfont icondice6 ${styles.show}` : styles.hide}></i>
                        </div>
                    </section>
                }


                <Modal
                    title="中奖弹窗"
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