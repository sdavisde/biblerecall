import dynamic from 'next/dynamic';

const DynamicLoginWithNoSSR = dynamic(() => import('./Login'), {
    ssr: false
})

export default function DynamicLogin ({ loggedIn, loggedOut }) {
    return <DynamicLoginWithNoSSR loggedIn={loggedIn} loggedOut={loggedOut}/>
} 