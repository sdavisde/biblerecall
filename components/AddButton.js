import React, { useState } from 'react';
import styles from '../styles/AddButton.module.scss'

export default function AddButton({...props}) {

	return (
        <button onClick={props.onClick}>
            Add
        </button>
	);
}