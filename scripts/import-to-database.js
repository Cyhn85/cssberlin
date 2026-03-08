/**
 * Import Vinted Products to PostgreSQL (Neon)
 * Reads vinted-products.json and imports to database
 *
 * Usage: node scripts/import-to-database.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

/**
 * Download and store images to Cloudflare R2 or local
 * For now, we'll store Vinted URLs directly (they're stable)
 */
async function processImages(images) {
  // Option 1: Use Vinted URLs directly (simple, fast)
  return images.map((img, index) => ({
    url: img.url,
    alt: `Product image ${index + 1}`,
    isPrimary: index === 0,
  }));

  // Option 2: Download and upload to Cloudflare R2 (future implementation)
  // TODO: Implement R2 upload when needed
}

/**
 * Find or create category
 */
async function ensureCategory(slug, name) {
  let category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        slug,
        name,
        displayOrder: getDisplayOrder(slug),
        isActive: true,
      },
    });
    console.log(`   ✅ Created category: ${name}`);
  }

  return category;
}

/**
 * Find or create subcategory
 */
async function ensureSubcategory(categoryId, slug, name) {
  let subcategory = await prisma.subcategory.findFirst({
    where: {
      slug,
      categoryId,
    },
  });

  if (!subcategory) {
    subcategory = await prisma.subcategory.create({
      data: {
        slug,
        name,
        categoryId,
        displayOrder: getSubcategoryDisplayOrder(slug),
      },
    });
    console.log(`   ✅ Created subcategory: ${name}`);
  }

  return subcategory;
}

/**
 * Get category display order
 */
function getDisplayOrder(slug) {
  const order = {
    'damen': 1,
    'herren': 2,
    'kinder': 3,
    'sonstiges': 4,
  };
  return order[slug] || 99;
}

/**
 * Get subcategory display order
 */
function getSubcategoryDisplayOrder(slug) {
  const order = {
    // Damen
    'oberteile': 1,
    'hosen-jeans': 2,
    'kleider-rocke': 3,
    'jacken-maentel': 4,
    'schuhe': 5,
    'accessoires': 6,

    // Herren
    't-shirts-tops': 1,
    'hemden': 2,

    // Kinder
    'baby-0-2': 1,
    'kleinkind-3-6': 2,
    'kind-7-12': 3,
    'teenager-13': 4,

    // Sonstiges
    'neu-hochgeladen': 1,
    'vintage': 2,
    'designer': 3,
    'ohne-kategorie': 4,
  };
  return order[slug] || 99;
}

/**
 * Get category/subcategory names (German)
 */
function getCategoryName(slug) {
  const names = {
    'damen': 'Damen',
    'herren': 'Herren',
    'kinder': 'Kinder',
    'sonstiges': 'Sonstiges',
  };
  return names[slug] || slug;
}

function getSubcategoryName(slug) {
  const names = {
    'oberteile': 'Oberteile',
    'hosen-jeans': 'Hosen & Jeans',
    'kleider-rocke': 'Kleider & Röcke',
    'jacken-maentel': 'Jacken & Mäntel',
    'schuhe': 'Schuhe',
    'accessoires': 'Accessoires',

    't-shirts-tops': 'T-Shirts & Tops',
    'hemden': 'Hemden',

    'baby-0-2': 'Baby (0-2)',
    'kleinkind-3-6': 'Kleinkind (3-6)',
    'kind-7-12': 'Kind (7-12)',
    'teenager-13': 'Teenager (13+)',

    'neu-hochgeladen': 'Neu hochgeladen',
    'vintage': 'Vintage',
    'designer': 'Designer',
    'ohne-kategorie': 'Ohne Kategorie',
  };
  return names[slug] || slug;
}

/**
 * Import products to database
 */
async function importProducts(products) {
  console.log(`\n📦 Importing ${products.length} products to database...\n`);

  let imported = 0;
  let updated = 0;
  let skipped = 0;

  for (const product of products) {
    try {
      // Ensure category exists
      const category = await ensureCategory(
        product.categorySlug,
        getCategoryName(product.categorySlug)
      );

      // Ensure subcategory exists
      const subcategory = await ensureSubcategory(
        category.id,
        product.subcategorySlug,
        getSubcategoryName(product.subcategorySlug)
      );

      // Check if product already exists (by Vinted ID)
      const existingProduct = await prisma.product.findFirst({
        where: {
          slug: product.slug,
        },
      });

      if (existingProduct) {
        // Update existing product
        await prisma.product.update({
          where: { id: existingProduct.id },
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            brand: product.brand,
            size: product.size,
            color: product.color,
            material: product.material,
            condition: product.condition,
            tier: product.tier,
            carbonSaved: product.carbonSaved,
            images: product.images,
            vintedId: product.vintedId,
            vintedUrl: product.vintedUrl,
          },
        });

        updated++;
        console.log(`   🔄 Updated: ${product.name.substring(0, 50)}...`);
      } else {
        // Create new product
        await prisma.product.create({
          data: {
            slug: product.slug,
            name: product.name,
            description: product.description,
            price: product.price,
            brand: product.brand,
            size: product.size,
            color: product.color,
            material: product.material,
            condition: product.condition,
            tier: product.tier,
            carbonSaved: product.carbonSaved,
            images: product.images,
            vintedId: product.vintedId,
            vintedUrl: product.vintedUrl,
            categoryId: category.id,
            subcategoryId: subcategory.id,
          },
        });

        imported++;
        console.log(`   ✅ Imported: ${product.name.substring(0, 50)}...`);
      }

    } catch (error) {
      console.error(`   ❌ Error importing "${product.name}":`, error.message);
      skipped++;
    }
  }

  return { imported, updated, skipped };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 CSS Berlin - Database Import\n');

  try {
    // Read products from JSON
    const jsonPath = path.join(__dirname, 'vinted-products.json');

    if (!fs.existsSync(jsonPath)) {
      console.error('❌ Error: vinted-products.json not found!');
      console.log('   Run "node scripts/vinted-scraper.js" first.');
      process.exit(1);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const products = JSON.parse(rawData);

    console.log(`📄 Loaded ${products.length} products from JSON\n`);

    // Import to database
    const { imported, updated, skipped } = await importProducts(products);

    // Summary
    console.log('\n✅ Import completed!\n');
    console.log('📊 Summary:');
    console.log(`   ✅ Imported: ${imported} new products`);
    console.log(`   🔄 Updated: ${updated} existing products`);
    console.log(`   ❌ Skipped: ${skipped} errors`);
    console.log(`   📦 Total: ${imported + updated} products in database\n`);

    // Verify database
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    const totalSubcategories = await prisma.subcategory.count();

    console.log('🗄️  Database stats:');
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Subcategories: ${totalSubcategories}`);
    console.log(`   Products: ${totalProducts}`);

    console.log('\n🎉 Done! Your products are now live on cssberlin.de');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { importProducts };
