import React, {useState} from 'react';
import styles from './index.css';
import { Modal, Button } from 'antd';

export default function(){
    const [visible, visibleChange] = useState(false);

    function openModal(){
        visibleChange(true)
    }

    function handleCancel(){
        visibleChange(false)
    }

    return(
        <div className={styles.headerBox}>
            <div className={styles.title}>简易版大富翁</div>
            <div className={styles.description} onClick={openModal}>活动说明</div>
            <div className={styles.sue}>投诉</div>
            <Modal
                title="活动说明"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <p>?</p>
            </Modal>
        </div>
    )
}