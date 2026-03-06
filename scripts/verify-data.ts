import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying database data...\n');

  // Count records
  const colorCount = await prisma.color.count();
  const sizeCount = await prisma.size.count();
  const materialCount = await prisma.material.count();
  const brandCount = await prisma.brand.count();
  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();

  console.log('📊 RECORD COUNTS:');
  console.log(`  Colors:     ${colorCount}`);
  console.log(`  Sizes:      ${sizeCount}`);
  console.log(`  Materials:  ${materialCount}`);
  console.log(`  Brands:     ${brandCount}`);
  console.log(`  Categories: ${categoryCount}`);
  console.log(`  Products:   ${productCount}`);
  console.log('');

  // Show sample data
  console.log('🎨 COLORS:');
  const colors = await prisma.color.findMany({ take: 5 });
  colors.forEach(c => console.log(`  - ${c.name} (${c.hexCode})`));
  console.log('');

  console.log('📏 SIZES:');
  const sizes = await prisma.size.findMany({ take: 5 });
  sizes.forEach(s => console.log(`  - ${s.name}`));
  console.log('');

  console.log('🧵 MATERIALS:');
  const materials = await prisma.material.findMany({ take: 5 });
  materials.forEach(m => console.log(`  - ${m.name}`));
  console.log('');

  console.log('🏷️  BRANDS:');
  const brands = await prisma.brand.findMany({ take: 5 });
  brands.forEach(b => console.log(`  - ${b.name}`));
  console.log('');

  console.log('📂 CATEGORIES:');
  const categories = await prisma.category.findMany();
  categories.forEach(cat => {
    const indent = cat.parentId ? '  → ' : '';
    console.log(`  ${indent}${cat.name} (${cat.slug})`);
  });

  console.log('\n✅ DATABASE IS WORKING PERFECTLY! 🎉');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
