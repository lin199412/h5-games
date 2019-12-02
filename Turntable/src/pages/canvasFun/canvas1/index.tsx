import React, {useEffect} from 'react';
import styles from './index.css';

export default function() {

    useEffect(() => {
        console.log("123")
    }, []); 

    return (
        <div>
            <canvas id="canvas"></canvas>
            111
        </div>
    );
}
