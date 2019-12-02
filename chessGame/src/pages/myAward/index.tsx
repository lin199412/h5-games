import React,{useState} from 'react';
// import styles from './index.css';
import { Modal, Button } from 'antd';

export default function () {
    const [visible, visibleChange] = useState(false);

    function openModal(){
        visibleChange(true)
    }
    function handleCancel(){
        visibleChange(false)
    }

    return (
        <div>
            <Button onClick={openModal}>我的奖品</Button>
            <Modal
                title="我的奖品"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <p>?</p>
            </Modal>
        </div>
    );
}