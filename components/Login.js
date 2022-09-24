import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dummy from '../assets/dummy_profile_pic.png';
import styles from '../styles/Login.module.scss';

export default function Login({ loggedIn, loggedOut }) {
    const [showLogout, setShowLogout] = useState(false);
    const [profile, setProfile] = useState(null);
    const clientId = process.env.googleClientId;

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };

        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        loggedIn(res.googleId);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    const logOut = () => {
        setProfile(null);
        loggedOut();
    };

    return ( 
        <>
            {profile ? (
                <div className={styles.loginContainer}>
                    <div onClick={() => setShowLogout(true)}>
                        <Image className={styles.profilePic} src={profile.imageUrl ? profile.imageUrl : dummy} alt="user image" width={50} height={50} />
                    </div>
                    <div className={styles.logOutTooltip}>
                        {showLogout && 
                            <GoogleLogout
                                className={styles.logOut}
                                clientId={clientId} 
                                buttonText="Log Out" 
                                onLogoutSuccess={logOut} />
                        }
                    </div>
                </div>
            ) : (
                <GoogleLogin
                    className={styles.signIn}
                    clientId={clientId}
                    buttonText="Sign in"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    disabled={false}
                />
            )}
        </>
    )
}
