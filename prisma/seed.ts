import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Damen Category
  const damen = await prisma.category.create({
    data: {
      slug: 'damen',
      name: 'Damen',
      displayOrder: 1,
      subcategories: {
        create: [
          { slug: 'oberteile', name: 'Oberteile', displayOrder: 1 },
          { slug: 'hosen-jeans', name: 'Hosen & Jeans', displayOrder: 2 },
          { slug: 'kleider-roecke', name: 'Kleider & Röcke', displayOrder: 3 },
          { slug: 'jacken-maentel', name: 'Jacken & Mäntel', displayOrder: 4 },
          { slug: 'schuhe', name: 'Schuhe', displayOrder: 5 },
          { slug: 'accessoires', name: 'Accessoires', displayOrder: 6 },
        ]
      }
    }
  })

  // Herren Category
  const herren = await prisma.category.create({
    data: {
      slug: 'herren',
      name: 'Herren',
      displayOrder: 2,
      subcategories: {
        create: [
          { slug: 't-shirts-tops', name: 'T-Shirts & Tops', displayOrder: 1 },
          { slug: 'hemden', name: 'Hemden', displayOrder: 2 },
          { slug: 'hosen-jeans', name: 'Hosen & Jeans', displayOrder: 3 },
          { slug: 'jacken-maentel', name: 'Jacken & Mäntel', displayOrder: 4 },
          { slug: 'schuhe', name: 'Schuhe', displayOrder: 5 },
          { slug: 'accessoires', name: 'Accessoires', displayOrder: 6 },
        ]
      }
    }
  })

  // Kinder Category
  const kinder = await prisma.category.create({
    data: {
      slug: 'kinder',
      name: 'Kinder',
      displayOrder: 3,
      subcategories: {
        create: [
          { slug: 'baby-0-2', name: 'Baby (0-2)', displayOrder: 1 },
          { slug: 'kleinkind-3-6', name: 'Kleinkind (3-6)', displayOrder: 2 },
          { slug: 'kind-7-12', name: 'Kind (7-12)', displayOrder: 3 },
          { slug: 'teenager-13-plus', name: 'Teenager (13+)', displayOrder: 4 },
          { slug: 'schuhe', name: 'Schuhe', displayOrder: 5 },
          { slug: 'spielzeug', name: 'Spielzeug', displayOrder: 6 },
        ]
      }
    }
  })

  // Sonstiges Category
  const sonstiges = await prisma.category.create({
    data: {
      slug: 'sonstiges',
      name: 'Sonstiges',
      displayOrder: 4,
      subcategories: {
        create: [
          { slug: 'ohne-kategorie', name: 'Ohne Kategorie', displayOrder: 1 },
          { slug: 'neu-hochgeladen', name: 'Neu hochgeladen', displayOrder: 2 },
          { slug: 'vintage', name: 'Vintage', displayOrder: 3 },
          { slug: 'designer', name: 'Designer', displayOrder: 4 },
        ]
      }
    }
  })

  console.log('✅ Categories created:', {
    damen: `${damen.name} (${damen.id})`,
    herren: `${herren.name} (${herren.id})`,
    kinder: `${kinder.name} (${kinder.id})`,
    sonstiges: `${sonstiges.name} (${sonstiges.id})`
  })

  // Count subcategories
  const subcategoryCount = await prisma.subcategory.count()
  console.log(`✅ Created ${subcategoryCount} subcategories`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
