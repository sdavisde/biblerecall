import React, { useState } from 'react';
import styles from '../styles/AddButton.module.scss'

export default function AddButton({...props}) {

	return (
        <button className={styles.addBtn} onClick={props.onClick}>
            Add
        </button>
	);
}