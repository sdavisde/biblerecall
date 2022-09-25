import React, { useState } from 'react';
import styles from '../styles/Lightbox.module.scss'
import CloseButton from './CloseButton'

export default function Lightbox({ ...props }) {

	return (
        props.control &&
            <div className={styles.lightboxOverlay}>
            {
                props.simpleLayout
                ?
                (
                    <div className={styles.simpleLightbox}>
                        {
                            props.showClose
                            &&
                            <CloseButton onClick={props.toggleDisplay}/>
                        }
                        {props.children}
                    </div>
                )
                :
                (
                    <div className={styles.lightbox}>
                        {
                            props.showClose
                            &&
                            <CloseButton onClick={props.toggleDisplay}/>
                        }
                        {props.children}
                    </div>
                )
            }
        </div>
	);
}