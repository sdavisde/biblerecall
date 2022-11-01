'use client';

import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';
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

    if (status === "unauthenticated") { // * COVER PAGE
        return (
            <main className={styles.main}>
                <div className={styles.section}>
                <h2>Please Login</h2>
                <button onClick={() => signIn("google", {callbackUrl: "/home"})} > {/* "/google-signin", "Sample Sign In" */}
                    Sign In with Google
                </button>
                </div>
            </main>
        )
    }
    else if (status === "authenticated") { // * Redirect to user page
        return (
            <main className={styles.main}>
                <div className={styles.section}>
                    <p>
                        You are logged in
                    </p>
                    <Link href={'/home'}>Go to Home</Link>
                </div>
            </main>
        )
    }
    else { // * Loading from an authentication change
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