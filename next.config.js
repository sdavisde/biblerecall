/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    env: {
        googleClientId: '825711072827-ujegkvt6u1b8eoehgk3bfev6rn3q49j9.apps.googleusercontent.com',
    }
}

module.exports = nextConfig
