import styles from '../styles/GoogleLogin.module.scss';
import logo from '../assets/google/logo.png';
import Image from 'next/image';

export default function GoogleLogin ({ isLogin, signIn, logOut }) {
    if (isLogin == undefined)
        isLogin = true;
    
    return (
        <div className={styles.container} onClick={isLogin ? signIn : logOut}>
            <div className={styles.logoContainer}>
                <Image src={logo} width={30} height={30} alt='' className={styles.logo}/>
            </div>            
            {isLogin ? (
                <p>Sign In With Google</p>
            ) : (
                <p>Log Out</p>
            )}
        </div>
    );
}