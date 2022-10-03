import dynamic from 'next/dynamic';

const DynamicLoginWithNoSSR = dynamic(() => import('./Login'), {
    ssr: false
})

export default function DynamicLogin ({ GlobalLogin, GlobalLogout }) {
    return <DynamicLoginWithNoSSR GlobalLogin={GlobalLogin} GlobalLogout={GlobalLogout}/>
} 