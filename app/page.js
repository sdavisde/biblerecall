'use client';

import { useSession } from "next-auth/react";
import styles from './page.module.scss';

export default function Layout({ ...props }) {
    const { data: session, status } = useSession();
    
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

    if (status === "unauthenticated") {
        return (
            <main className={styles.main}>
                <div className={styles.section}>
                <h2>Please Login</h2>
                <button onClick={() => popupCenter("/google-signin", "Sample Sign In")} >
                    Sign In with Google
                </button>
                </div>
            </main>
        )
    }
    else if (status === "authenticated") {
        // User page. Should i redirect?
        return (
            <main className={styles.main}>
                <div className={styles.section}>
                    <p>
                        You are logged in
                    </p>
                </div>
            </main>
        )
    }
    else {
        // If in here, page is loading from a authentication change.
        return (
            <main className={styles.main}>
                <div className={styles.section}>
                    <p className={styles.message}>
                        Loading...
                    </p>
                </div>
            </main>
        )
    }
}