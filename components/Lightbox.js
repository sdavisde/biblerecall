import React, { useState } from 'react';
import styles from '../styles/Lightbox.module.scss'

export default function Lightbox({ ...props }) {

	return (
        <>
            {
                <div className={styles.lightboxOverlay}>
                    <div className={styles.lightbox}>
                        <div className={styles.closeBtnContainer} onClick={props.toggleDisplay}>
                            <img className={styles.closeBtn}/>
                        </div>
                        {props.children}
                    </div>
                </div>
            }
        </>
	);
}