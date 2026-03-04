/**
 * Robots.txt for CSS Berlin
 * SEO configuration for search engine crawlers
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# CSS Berlin - Second-Hand Fashion Store
# https://cssberlin.de

User-agent: *
Allow: /
Allow: /categories/
Allow: /api/categories
Allow: /api/products/

# Disallow admin areas (future)
Disallow: /admin/
Disallow: /api/admin/

# Disallow private API routes
Disallow: /api/auth/

# Allow Google Image Bot
User-agent: Googlebot-Image
Allow: /

# Sitemap
Sitemap: https://cssberlin.de/sitemap.xml

# Crawl delay (be nice to our free tier servers!)
Crawl-delay: 1
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
