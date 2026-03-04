/**
 * Vinted Product Scraper
 * Fetches all products from a Vinted user profile
 *
 * Usage: node scripts/vinted-scraper.js
 */

const VINTED_USER_ID = '293217988';
const VINTED_BASE_URL = 'https://www.vinted.de';

/**
 * Fetch products from Vinted API
 * Uses undocumented API endpoint that Vinted frontend uses
 */
async function fetchVintedProducts(userId) {
  console.log(`🔍 Fetching products for user ID: ${userId}...`);

  const products = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      // Vinted API endpoint (discovered from network tab)
      const apiUrl = `${VINTED_BASE_URL}/api/v2/users/${userId}/items?page=${page}&per_page=96`;

      console.log(`📄 Page ${page}...`);

      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        hasMore = false;
        break;
      }

      // Extract product info
      for (const item of data.items) {
        const product = {
          // Basic Info
          vintedId: item.id,
          title: item.title,
          description: item.description || '',
          price: parseFloat(item.price),
          currency: item.currency || 'EUR',

          // Brand & Category
          brand: item.brand_title || 'Unknown',
          categoryId: item.catalog_id,
          categoryPath: item.path || '',

          // Condition
          condition: item.status || 'Gut',

          // Images
          images: item.photos.map(photo => ({
            url: photo.full_size_url || photo.url,
            thumbnail: photo.url,
            width: photo.width,
            height: photo.height,
          })),

          // Additional Details
          size: item.size_title || '',
          color: item.color1 || '',
          material: item.fabric || '',

          // Metadata
          url: `${VINTED_BASE_URL}/items/${item.id}`,
          createdAt: item.created_at_ts,
          updatedAt: item.updated_at_ts,

          // Stats
          viewCount: item.view_count || 0,
          favouriteCount: item.favourite_count || 0,
        };

        products.push(product);
      }

      console.log(`✅ Found ${data.items.length} products on page ${page}`);

      // Check if there are more pages
      if (!data.pagination || page >= data.pagination.total_pages) {
        hasMore = false;
      } else {
        page++;
        // Rate limiting - wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      hasMore = false;
    }
  }

  return products;
}

/**
 * Map Vinted category to CSS Berlin category
 */
function mapToCSBerlinCategory(vintedPath, productTitle) {
  const pathLower = vintedPath.toLowerCase();
  const titleLower = productTitle.toLowerCase();

  // Women's categories
  if (pathLower.includes('/frauen')) {
    if (pathLower.includes('oberteile') || titleLower.includes('shirt') || titleLower.includes('bluse')) {
      return { category: 'damen', subcategory: 'oberteile' };
    }
    if (pathLower.includes('hose') || titleLower.includes('jeans') || titleLower.includes('hose')) {
      return { category: 'damen', subcategory: 'hosen-jeans' };
    }
    if (pathLower.includes('kleider') || pathLower.includes('rocke')) {
      return { category: 'damen', subcategory: 'kleider-rocke' };
    }
    if (pathLower.includes('jacken') || pathLower.includes('mantel')) {
      return { category: 'damen', subcategory: 'jacken-maentel' };
    }
    if (pathLower.includes('schuhe')) {
      return { category: 'damen', subcategory: 'schuhe' };
    }
    if (pathLower.includes('accessoires') || pathLower.includes('taschen')) {
      return { category: 'damen', subcategory: 'accessoires' };
    }
    return { category: 'damen', subcategory: 'oberteile' }; // Default
  }

  // Men's categories
  if (pathLower.includes('/manner') || pathLower.includes('/herren')) {
    if (pathLower.includes('t-shirts') || pathLower.includes('tops')) {
      return { category: 'herren', subcategory: 't-shirts-tops' };
    }
    if (pathLower.includes('hemden')) {
      return { category: 'herren', subcategory: 'hemden' };
    }
    if (pathLower.includes('hose') || titleLower.includes('jeans')) {
      return { category: 'herren', subcategory: 'hosen-jeans' };
    }
    if (pathLower.includes('jacken') || pathLower.includes('mantel')) {
      return { category: 'herren', subcategory: 'jacken-maentel' };
    }
    if (pathLower.includes('schuhe')) {
      return { category: 'herren', subcategory: 'schuhe' };
    }
    if (pathLower.includes('accessoires')) {
      return { category: 'herren', subcategory: 'accessoires' };
    }
    return { category: 'herren', subcategory: 't-shirts-tops' }; // Default
  }

  // Kids categories
  if (pathLower.includes('/kinder')) {
    if (titleLower.includes('baby') || pathLower.includes('0-2')) {
      return { category: 'kinder', subcategory: 'baby-0-2' };
    }
    if (titleLower.includes('kleinkind') || pathLower.includes('3-6')) {
      return { category: 'kinder', subcategory: 'kleinkind-3-6' };
    }
    if (pathLower.includes('7-12')) {
      return { category: 'kinder', subcategory: 'kind-7-12' };
    }
    if (pathLower.includes('teenager') || pathLower.includes('13+')) {
      return { category: 'kinder', subcategory: 'teenager-13' };
    }
    return { category: 'kinder', subcategory: 'kind-7-12' }; // Default
  }

  // Designer/Luxury
  if (titleLower.includes('gucci') || titleLower.includes('prada') ||
      titleLower.includes('louis vuitton') || titleLower.includes('designer')) {
    return { category: 'sonstiges', subcategory: 'designer' };
  }

  // Vintage
  if (titleLower.includes('vintage') || titleLower.includes('retro')) {
    return { category: 'sonstiges', subcategory: 'vintage' };
  }

  // Default: "Neu hochgeladen"
  return { category: 'sonstiges', subcategory: 'neu-hochgeladen' };
}

/**
 * Transform Vinted products to CSS Berlin format
 */
function transformProducts(vintedProducts) {
  return vintedProducts.map(vp => {
    const { category, subcategory } = mapToCSBerlinCategory(vp.categoryPath, vp.title);

    return {
      // Vinted Reference
      vintedId: vp.vintedId,
      vintedUrl: vp.url,

      // Basic Info
      name: vp.title,
      description: vp.description,
      brand: vp.brand,

      // Pricing
      price: vp.price,
      currency: vp.currency,

      // Category Mapping
      categorySlug: category,
      subcategorySlug: subcategory,

      // Product Details
      size: vp.size,
      color: vp.color,
      material: vp.material,
      condition: vp.condition,

      // Images
      images: vp.images,
      primaryImage: vp.images[0]?.url || '',

      // Metadata
      slug: generateSlug(vp.title, vp.vintedId),
      tier: determineTier(vp.brand),
      carbonSaved: calculateCarbonSaved(vp.price),

      // Stats
      viewCount: vp.viewCount,
      favouriteCount: vp.favouriteCount,

      // Timestamps
      createdAt: new Date(vp.createdAt * 1000).toISOString(),
      updatedAt: new Date(vp.updatedAt * 1000).toISOString(),
    };
  });
}

/**
 * Generate SEO-friendly slug
 */
function generateSlug(title, id) {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50) + `-${id}`;
}

/**
 * Determine product tier based on brand
 */
function determineTier(brand) {
  const brandLower = brand.toLowerCase();

  // Premium brands
  const premiumBrands = ['gucci', 'prada', 'louis vuitton', 'chanel', 'dior', 'versace'];
  if (premiumBrands.some(b => brandLower.includes(b))) {
    return 'premium';
  }

  // Designer brands
  const designerBrands = ['hugo boss', 'tommy hilfiger', 'calvin klein', 'armani'];
  if (designerBrands.some(b => brandLower.includes(b))) {
    return 'designer';
  }

  // Vintage
  if (brandLower.includes('vintage')) {
    return 'vintage';
  }

  return 'standard';
}

/**
 * Calculate CO2 saved (approximation)
 * Average new clothing produces ~7kg CO2
 * Second-hand saves ~80% = 5.6kg per item
 */
function calculateCarbonSaved(price) {
  // Higher price items usually save more CO2 (heavier/more material)
  const baseCarbon = 5.6; // kg
  const priceMultiplier = Math.log10(price + 1) / 2; // Logarithmic scaling
  return Number((baseCarbon * (1 + priceMultiplier)).toFixed(2));
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 CSS Berlin - Vinted Product Scraper\n');

  try {
    // Fetch products
    const vintedProducts = await fetchVintedProducts(VINTED_USER_ID);
    console.log(`\n✅ Total products fetched: ${vintedProducts.length}\n`);

    if (vintedProducts.length === 0) {
      console.log('⚠️  No products found. Check user ID or profile privacy settings.');
      return;
    }

    // Transform products
    const cssBerlinProducts = transformProducts(vintedProducts);

    // Save to JSON (for review)
    const fs = require('fs');
    const outputPath = './scripts/vinted-products.json';
    fs.writeFileSync(outputPath, JSON.stringify(cssBerlinProducts, null, 2));
    console.log(`💾 Saved to: ${outputPath}`);

    // Statistics
    console.log('\n📊 Statistics:');
    console.log(`   Total products: ${cssBerlinProducts.length}`);

    const categoryStats = {};
    cssBerlinProducts.forEach(p => {
      const key = `${p.categorySlug}/${p.subcategorySlug}`;
      categoryStats[key] = (categoryStats[key] || 0) + 1;
    });

    console.log('\n   By category:');
    Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count} products`);
      });

    const totalValue = cssBerlinProducts.reduce((sum, p) => sum + p.price, 0);
    const totalCarbon = cssBerlinProducts.reduce((sum, p) => sum + p.carbonSaved, 0);

    console.log(`\n   Total value: €${totalValue.toFixed(2)}`);
    console.log(`   Total CO₂ saved: ${totalCarbon.toFixed(2)} kg`);

    console.log('\n✅ Scraping completed successfully!');
    console.log('\n📝 Next step: Run "node scripts/import-to-database.js" to import to PostgreSQL');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { fetchVintedProducts, transformProducts };
