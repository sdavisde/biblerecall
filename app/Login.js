'use client';

import Image from 'next/image';
import styles from '../styles/Login.module.scss';
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";

/* 
 * session.user has name, email, and image attributes
*/

export default function Login() {
    const { data: session, status } = useSession();
    const [ inHover, setInHover ] = useState(false);

    if (status === "authenticated") {
        return (
            <>
                <p> Signed in as {session.user.email}</p>
                <div className={styles.profileContainer} onMouseEnter={() => setInHover(true)} onMouseLeave={() => setInHover(false)}>
                    <Image src={session.user.image} 
                        width={50} 
                        height={50} 
                        alt='Profile Pic' 
                        className={styles.image}/>
                    
                    {inHover &&
                        <button onClick={() => signOut()}>
                            Sign out
                        </button>
                    }
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