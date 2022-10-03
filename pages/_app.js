import '../styles/globals.scss';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [userId, setUserId] = useState(null);

    let GlobalLogin = (googleId) => {
        setUserId(googleId);
    }

    let GlobalLogout = () => {
        setUserId(null);
    }

    return <Component key={userId}
        {...pageProps} 
        userId={userId} 
        setUserId={setUserId} 
        GlobalLogin={GlobalLogin}
        GlobalLogout={GlobalLogout}/>
}

export default MyApp
