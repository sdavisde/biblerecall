import React, { useEffect, useState } from 'react';
import styles from '../styles/Groups.module.scss'



export default function Groups({...props}) {
    let [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('api/collections')
            .then((res) => {
                console.log('in retrieval');
            });
    }, []);

	return (
        <>
            <a className={styles.groupLabel}>
                Group 1
            </a>
            <a className={styles.groupLabel}>
                Group 2
            </a>
        </>
	);
}