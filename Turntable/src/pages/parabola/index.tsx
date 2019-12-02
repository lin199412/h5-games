import React from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';
import { relative } from 'path';

export default class Turntable extends React.Component {
    state = {
        toX: 0,
        toY: 250,
        rotateDeg: 0,
        upOrDown: true,
    }

    jumpjump = () => {
        console.log("jump")
        this.setState({
            toX: this.state.toX + 50,
            toY: this.state.toY - 45,
            rotateDeg: this.state.rotateDeg+180
        },()=>{
            console.log(this.state.toX+"px", this.state.toY+"px")
            setTimeout(() => {
                this.setState({
                    upOrDown: false
                },()=>{
                    this.setState({
                        toX: this.state.toX + 50,
                        toY: this.state.toY + 45,
                        rotateDeg: this.state.rotateDeg+180
                    },()=>{
                        this.setState({
                            upOrDown: true
                        })
                    })
                })               
            }, 600);
        })
    }
    render() {
        return (
            <div>
                <div style={{width: "300px", height: "300px", background: "#333", position:"relative"}}>
                    <div className={styles.jumpBox} style={{
                        width: "50px", height: "50px", background: "aquamarine",display:"inline-block",
                        // animation: `${styles.rotate} .5s linear`,
                        transform:`rotate(${this.state.rotateDeg}deg)`, transformOrigin: "center",
                        position:"absolute", left: this.state.toX+"px", top: this.state.toY+"px",
                        transition: `all 0.6s linear`
                    }}></div>
                </div>

                <Button onClick={this.jumpjump}>jump</Button>
            </div>
        )
    }
}