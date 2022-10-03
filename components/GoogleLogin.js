import styles from '../styles/GoogleLogin.module.scss';
import logo from '../assets/google/logo.png';
import Image from 'next/image';

export default function GoogleLogin ({ isLogin, signIn, logOut }) {
    if (isLogin == undefined)
        isLogin = true;
    
    return (
        <div className={styles.container} onClick={isLogin ? signIn : logOut}>
            <Image src={logo} width={32} height={32} alt='' className={styles.logo}/>
            {isLogin ? (
                <p>Sign In With Google</p>
            ) : (
                <p>Log Out</p>
            )}
        </div>
    );
}