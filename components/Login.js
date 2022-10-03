import { useEffect, useState } from 'react';
import { auth, signInWithGoogle, logout } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from 'next/image';
import GoogleLogin from '../components/GoogleLogin';
import dummy from '../assets/dummy_profile_pic.png';
import styles from '../styles/Login.module.scss';

export default function Login({ GlobalLogin, GlobalLogout }) {
    const [showLogout, setShowLogout] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            onSuccess();
        } else {
            GlobalLogout();
        }
    }, [user, loggedIn]);

    const onSuccess = () => {
        setProfile({
            name: user.displayName,
            imageUrl: user.photoURL
        });
        GlobalLogin(user.uid);
    }
    
    const logOut = () => {
        setProfile(null);
        logout(); // Firebase logout
        setLoggedIn(false);
        GlobalLogout();
    };

    return ( 
        <div className={styles.loginContainer} onMouseOut={() => setShowLogout(false)}>
            {profile ? (
                <>
                    <div className={styles.profileContainer} onMouseOver={() => setShowLogout(true)} >
                        <Image className={styles.profilePic} src={profile.imageUrl ? profile.imageUrl : dummy} alt="user image" width={50} height={50} />
                    </div>
                    <div className={styles.logOutTooltip}>
                        <GoogleLogin isLogin={false} logOut={logOut}/>
                    </div>
                </>
            ) : (
                <GoogleLogin isLogin={true} signIn={signInWithGoogle}/>
            )}
        </div>
    )
}
