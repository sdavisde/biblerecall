import React, { useState } from 'react';
import styles from '../styles/VerseBox.module.scss'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Link from 'next/link';

export default function ProgressBar ({ bgcolor, completed }) {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: 'rgb(166, 166, 148)',
        borderRadius: 50,
        margin: 10,
    }
    
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'right',
    }
    
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
}