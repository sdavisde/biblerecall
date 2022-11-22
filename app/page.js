'use client';

import GoogleLogin from './(c)/GoogleLogin';
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import useLocalStorage from 'use-local-storage';
import styles from './page.module.scss';

export default function Layout({ ...props }) {
    const { data: session, status } = useSession();
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const router = useRouter();

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme])

    const popupCenter = (url, title) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;
        const width =
        window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

        const height =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;

        const systemZoom = width / window.screen.availWidth;

        const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
        const top = (height - 550) / 2 / systemZoom + dualScreenTop;

        const newWindow = window.open(
            url,
            title,
            `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
        );

        newWindow?.focus();
    };

    // * Redirect to user page before cover page is rendered
    if (status === "authenticated") {
        router.push('/home');
    }

    // * Loading from an authentication change
    return (
        <main className={styles.main}>
            <div className={styles.section}>
                {status === "unauthenticated" 
                ?
                    <>
                        <h2>Welcome to Bible Recall!</h2>
                        <p>Bible Recall is a free application meant to help everyone memorize scripture on any device.</p>
                        <p>I hope you enjoy! Please start by signing in with your google account below:</p> 
                        <GoogleLogin isLogin={true} signIn={() => popupCenter("/google-signin", "Sample Sign In")} />
                    </>
                :
                    <p className={styles.message}>
                        Loading...
                    </p>
                }
            </div>
        </main>
    )
    
}