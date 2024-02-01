/** @type {import('next').NextConfig} */
const nextConfig = {
    // NextJS - 이미지 최적화 및 보안을 위해 도메인 명시
    images:{
        domains: ['lh3.googleusercontent.com'],
    }
}

module.exports = nextConfig
