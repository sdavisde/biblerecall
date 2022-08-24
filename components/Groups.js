import React, { useEffect, useState } from 'react';
import styles from '../styles/Groups.module.scss'



export default function Groups({...props}) {
    let [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('api/collections')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGroups(data);
            })
    }, []);

	return (
        <>
            {groups.map((group, index) => 
                <div>
                    <h2 key={index} className={styles.groupLabel}>
                        {group.groupName}
                    </h2>
                    <div key={index} className={styles.verses}>
                        {group.verses.map((verse, index_2) => 
                            <h4 key={index_2} className={styles.verse}>{verse.book} {verse.chapter}:{verse.verse}</h4>
                        )}
                    </div>
                </div>
            )}
        </>
	);
}