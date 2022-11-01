'use client';

import { useSession } from "next-auth/react";
// import styles from './page.module.scss';

export default function Layout({ ...props }) {
    const { data: session, status } = useSession();

    return (
        <div>
            <h1>User Home Page</h1>
            <p>{session?.user?.name} - {session?.user?.email}</p>
        </div>
    )
}