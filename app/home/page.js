'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import styles from './page.module.scss';

export default function Layout({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'unauthenticated') {
        router.push('/');
    }

    return (
        <div>
            {status === 'authenticated' &&
                <>
                    <h1>User Home Page</h1>
                    <p>{session?.user?.name} - {session?.user?.email}</p>
                </>
            }
            {status === 'unauthenticated' &&
                <>
                    <p>Not logged in. Redirecting...</p>
                </>
            }
            {status === undefined &&
                <>
                    Loading...
                </>
            }
            
        </div>
    )
}