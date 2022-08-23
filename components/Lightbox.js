import React, { useState } from 'react';
import styles from '../styles/Lightbox.module.scss'
import CloseButton from './CloseButton'

export default function Lightbox({ ...props }) {

	return (
        <div className={styles.lightboxOverlay}>
            <div className={styles.lightbox}>
                <CloseButton onClick={props.toggleDisplay}/>
                {props.children}
            </div>
        </div>
	);
}