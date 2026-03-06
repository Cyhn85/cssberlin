import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Colors
  console.log('📦 Seeding Colors...');
  const colors = [
    { id: 'black', name: 'Schwarz', hexCode: '#000000' },
    { id: 'white', name: 'Weiß', hexCode: '#FFFFFF' },
    { id: 'red', name: 'Rot', hexCode: '#FF0000' },
    { id: 'blue', name: 'Blau', hexCode: '#0000FF' },
    { id: 'green', name: 'Grün', hexCode: '#00FF00' },
    { id: 'beige', name: 'Beige', hexCode: '#F5F5DC' },
    { id: 'brown', name: 'Braun', hexCode: '#8B4513' },
    { id: 'grey', name: 'Grau', hexCode: '#808080' },
  ];

  for (const color of colors) {
    await prisma.color.upsert({
      where: { id: color.id },
      update: {},
      create: color,
    });
  }
  console.log(`✅ ${colors.length} colors seeded`);

  // 2. Sizes
  console.log('📦 Seeding Sizes...');
  const sizes = [
    { id: 'xs', name: 'XS' },
    { id: 's', name: 'S' },
    { id: 'm', name: 'M' },
    { id: 'l', name: 'L' },
    { id: 'xl', name: 'XL' },
    { id: 'xxl', name: 'XXL' },
    { id: '36', name: '36' },
    { id: '38', name: '38' },
    { id: '40', name: '40' },
    { id: '42', name: '42' },
  ];

  for (const size of sizes) {
    await prisma.size.upsert({
      where: { id: size.id },
      update: {},
      create: size,
    });
  }
  console.log(`✅ ${sizes.length} sizes seeded`);

  // 3. Materials
  console.log('📦 Seeding Materials...');
  const materials = [
    { id: 'cotton', name: 'Baumwolle' },
    { id: 'polyester', name: 'Polyester' },
    { id: 'wool', name: 'Wolle' },
    { id: 'leather', name: 'Leder' },
    { id: 'denim', name: 'Denim' },
    { id: 'silk', name: 'Seide' },
    { id: 'linen', name: 'Leinen' },
  ];

  for (const material of materials) {
    await prisma.material.upsert({
      where: { id: material.id },
      update: {},
      create: material,
    });
  }
  console.log(`✅ ${materials.length} materials seeded`);

  // 4. Brands
  console.log('📦 Seeding Brands...');
  const brands = [
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'zara', name: 'Zara' },
    { id: 'hm', name: 'H&M' },
    { id: 'levis', name: "Levi's" },
    { id: 'gucci', name: 'Gucci' },
    { id: 'chanel', name: 'Chanel' },
    { id: 'mango', name: 'Mango' },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { id: brand.id },
      update: {},
      create: brand,
    });
  }
  console.log(`✅ ${brands.length} brands seeded`);

  // 5. Categories
  console.log('📦 Seeding Categories...');
  const categories = [
    { id: 'damen', name: 'Damen', slug: 'damen', parentId: null },
    { id: 'herren', name: 'Herren', slug: 'herren', parentId: null },
    { id: 'kinder', name: 'Kinder', slug: 'kinder', parentId: null },
    { id: 'damen-kleider', name: 'Kleider', slug: 'damen-kleider', parentId: 'damen' },
    { id: 'damen-hosen', name: 'Hosen', slug: 'damen-hosen', parentId: 'damen' },
    { id: 'herren-hemden', name: 'Hemden', slug: 'herren-hemden', parentId: 'herren' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
