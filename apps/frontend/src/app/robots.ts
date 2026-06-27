import { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? process.env.SITE_DOMAIN ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost'
    const scheme = domain && (domain.startsWith("localhost") || domain.endsWith(".local")) ? 'http' : 'https'
    const host = domain ? new URL(`${scheme}://${domain}`) : undefined
    const sitemap = host ? new URL('/sitemap.xml', host).href : undefined

    const isProdLike = (process.env.VERCEL_ENV === 'production') || (
        domain &&
        !domain.includes('localhost') &&
        !domain.endsWith('.local') &&
        !domain.includes('vercel.app')
    );

    return {
        rules: {
            userAgent: '*',
            ...(isProdLike
                ? { allow: '/', disallow: ['/api/'] }
                : { disallow: '/' }
            ),
        },
        sitemap,
        host: host?.href,
    }
}