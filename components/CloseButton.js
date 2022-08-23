import React, { useState } from 'react';
import styles from '../styles/CloseButton.module.scss'

export default function CloseButton({ ...props }) {

	return (
        <a className={styles.close} onClick={props.onClick}/>
	);
}