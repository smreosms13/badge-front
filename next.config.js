/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
               protocol: 'https',
               hostname: 'firebasestorage.googleapis.com',
               pathname: '/v0/b/openbadges-537a3.appspot.com/**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**'
             },
        ],
    }
}

module.exports = nextConfig
