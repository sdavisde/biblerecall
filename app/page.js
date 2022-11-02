'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Layout({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();

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
                        <h2>Please Login</h2>
                        <button onClick={() => popupCenter("/google-signin", "Sample Sign In") }>
                            Sign In with Google
                        </button>
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