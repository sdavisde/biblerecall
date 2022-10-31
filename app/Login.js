// import { useEffect, useState } from 'react';
// import { auth, signInWithGoogle, logout } from "../firebaseConfig";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image';
// import GoogleLogin from '../components/GoogleLogin';
import dummy from '../assets/dummy_profile_pic.png';
import styles from '../styles/Login.module.scss';

export default function Login({ ...props }) {

    return (
        <>
            <p>Not Logged In</p>
            <Image src={dummy} width={50} height={50} alt='Login Image' className={styles.image}/>
        </>
    )
    // const { data: session } = useSession();

    // if(session) {
    //     return <>
    //         Signed in as {session.user.email} <br/>
    //         <button onClick={() => signOut()}>Sign out</button>
    //         </>
    // }
    // return <>
    //     Not signed in <br/>
    //     <button onClick={() => signIn()}>Sign in</button>
    // </>

    // const onSuccess = () => {
    // }
    
    // const logOut = () => {
    // };

    // return ( 
    //     <div className={styles.loginContainer} onMouseOut={() => setShowLogout(false)}>
    //         {profile ? (
    //             <>
    //                 <div className={styles.profileContainer} onMouseOver={() => setShowLogout(true)} >
    //                     <Image className={styles.profilePic} src={profile.imageUrl ? profile.imageUrl : dummy} alt="user image" width={50} height={50} />
    //                 </div>
    //                 <div className={styles.logOutTooltip}>
    //                     <GoogleLogin isLogin={false} logOut={logOut}/>
    //                 </div>
    //             </>
    //         ) : (
    //             // <GoogleLogin isLogin={true} signIn={signInWithGoogle}/>
    //         )}
    //     </div>
    // )
}
