'use client';

import Image from 'next/image';
import styles from './Profile.module.scss';
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";

/* 
 * session.user has name, email, and image attributes
*/

export default function Profile() {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <>
                <div className={styles.profileContainer}>
                    <Image src={session.user.image} 
                        width={50} 
                        height={50} 
                        alt='Profile Pic' 
                        className={styles.image}/>
                </div>
            </>
        )
    }
    else if (status === "unauthenticated") {
        // if status is unathenticated, we don't want to show a loading text
        return (<></>)
    }
    else {
        // if status is not one of the above, it is loading
        return (<p>...</p>)
    }
}