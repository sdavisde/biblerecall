import '../styles/globals.scss';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [userId, setUserId] = useState(null);

    let loggedIn = (googleId) => {
        setUserId(googleId);
    }

    let loggedOut = () => {
        setUserId(null);
    }

    return <Component key={userId}
        {...pageProps} 
        userId={userId} 
        setUserId={setUserId} 
        loggedIn={loggedIn}
        loggedOut={loggedOut}/>
}

export default MyApp
