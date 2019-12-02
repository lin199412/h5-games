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
            <Button onClick={openModal}>我要骰子</Button>
            <Modal
                title="我要骰子"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <p>?</p>
            </Modal>
        </div>
    );
}