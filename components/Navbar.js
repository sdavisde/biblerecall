import DynamicLogin from '../components/DynamicLogin';
import styles from '../styles/Navbar.module.scss';

export default function Navbar({ GlobalLogin, GlobalLogout }) {
    return ( 
        <nav className={styles.container}>
            <DynamicLogin GlobalLogin={GlobalLogin} GlobalLogout={GlobalLogout}/>
        </nav>
    )
}
