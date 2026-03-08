import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Sample products from the static site with category assignments
const sampleProducts = [
  {
    id: 1, brand: 'Zara', name: 'Elegante Blazer Jacke', size: 'M',
    condition: 'Sehr gut', price: 45.00, newPrice: 89.95, carbonSaved: 18.5,
    tier: 'champion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'damen', subSlug: 'jacken-maentel', gender: 'female'
  },
  {
    id: 2, brand: 'H&M', name: 'Casual Jeans Hose', size: '32/32',
    condition: 'Gut', price: 28.00, newPrice: 49.99, carbonSaved: 12.3,
    tier: 'profi',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
    sale: true,
    categorySlug: 'herren', subSlug: 'hosen-jeans', gender: 'male'
  },
  {
    id: 3, brand: 'Mango', name: 'Sommer Kleid mit Blumenmuster', size: 'S',
    condition: 'Sehr gut', price: 32.00, newPrice: 59.99, carbonSaved: 8.7,
    tier: 'fortgeschritten',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'damen', subSlug: 'kleider-roecke', gender: 'female'
  },
  {
    id: 4, brand: 'Nike', name: 'Sport Sneakers Air Max', size: '42',
    condition: 'Gut', price: 65.00, newPrice: 129.99, carbonSaved: 5.2,
    tier: 'einsteiger',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'schuhe', gender: 'unisex'
  },
  {
    id: 5, brand: 'Adidas', name: 'Performance Trainingsjacke', size: 'L',
    condition: 'Sehr gut', price: 38.00, newPrice: 75.00, carbonSaved: 14.2,
    tier: 'profi',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'jacken-maentel', gender: 'male'
  },
  {
    id: 6, brand: 'Tommy Hilfiger', name: 'Classic Poloshirt', size: 'M',
    condition: 'Gut', price: 22.00, newPrice: 49.99, carbonSaved: 6.8,
    tier: 'fortgeschritten',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    sale: true,
    categorySlug: 'herren', subSlug: 't-shirts-tops', gender: 'male'
  },
  {
    id: 7, brand: 'Levi\'s', name: '501 Original Fit Jeans', size: '30/32',
    condition: 'Sehr gut', price: 48.00, newPrice: 99.95, carbonSaved: 15.7,
    tier: 'champion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'hosen-jeans', gender: 'unisex'
  },
  {
    id: 8, brand: 'Puma', name: 'Running Laufschuhe', size: '41',
    condition: 'Gut', price: 42.00, newPrice: 89.99, carbonSaved: 9.5,
    tier: 'profi',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'schuhe', gender: 'unisex'
  },
  {
    id: 9, brand: 'Calvin Klein', name: 'Slim Fit Hemd', size: 'L',
    condition: 'Sehr gut', price: 35.00, newPrice: 79.90, carbonSaved: 11.3,
    tier: 'fortgeschritten',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'hemden', gender: 'male'
  },
  {
    id: 10, brand: 'The North Face', name: 'Outdoor Winterjacke', size: 'M',
    condition: 'Gut', price: 85.00, newPrice: 189.99, carbonSaved: 22.4,
    tier: 'champion',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'jacken-maentel', gender: 'unisex'
  },
  {
    id: 11, brand: 'Vans', name: 'Old Skool Sneakers', size: '43',
    condition: 'Gut', price: 38.00, newPrice: 75.00, carbonSaved: 7.9,
    tier: 'profi',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop',
    sale: true,
    categorySlug: 'herren', subSlug: 'schuhe', gender: 'unisex'
  },
  {
    id: 12, brand: 'Ralph Lauren', name: 'Polo Shirt Classic', size: 'L',
    condition: 'Sehr gut', price: 52.00, newPrice: 119.00, carbonSaved: 16.8,
    tier: 'champion',
    image: 'https://images.unsplash.com/photo-1598032895371-d5b3ac2a2ead?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 't-shirts-tops', gender: 'male'
  },
  {
    id: 13, brand: 'Gap', name: 'Denim Jacke Vintage', size: 'M',
    condition: 'Gut', price: 32.00, newPrice: 69.95, carbonSaved: 10.2,
    tier: 'fortgeschritten',
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'sonstiges', subSlug: 'vintage', gender: 'unisex'
  },
  {
    id: 14, brand: 'Converse', name: 'Chuck Taylor All Star', size: '42',
    condition: 'Sehr gut', price: 28.00, newPrice: 59.99, carbonSaved: 6.3,
    tier: 'einsteiger',
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'schuhe', gender: 'unisex'
  },
  {
    id: 15, brand: 'Uniqlo', name: 'Lightweight Down Jacket', size: 'S',
    condition: 'Sehr gut', price: 45.00, newPrice: 99.90, carbonSaved: 13.5,
    tier: 'profi',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'jacken-maentel', gender: 'unisex'
  },
  {
    id: 16, brand: 'Esprit', name: 'Casual Chino Hose', size: '32/34',
    condition: 'Gut', price: 26.00, newPrice: 59.99, carbonSaved: 8.1,
    tier: 'fortgeschritten',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    sale: false,
    categorySlug: 'herren', subSlug: 'hosen-jeans', gender: 'male'
  }
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  console.log('📦 Migrating products...')

  for (const product of sampleProducts) {
    // Find category and subcategory
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
      include: {
        children: {
          where: { slug: product.subSlug }
        }
      }
    })

    if (!category || category.children.length === 0) {
      console.error(`❌ Category not found: ${product.categorySlug}/${product.subSlug}`)
      continue
    }

    const subcategory = category.children[0]

    // Create product
    const createdProduct = await prisma.product.create({
      data: {
        brand: product.brand,
        name: product.name,
        slug: slugify(`${product.brand}-${product.name}`),
        size: product.size,
        condition: product.condition,
        price: product.price,
        newPrice: product.newPrice,
        carbonSaved: product.carbonSaved,
        tier: product.tier,
        images: product.image, // Store as string (single image for now)
        sale: product.sale,
        categoryId: category.id,
        categoryId: subcategory.id,
        gender: product.gender,
        isActive: true
      }
    })

    console.log(`✅ ${createdProduct.brand} ${createdProduct.name} → ${category.name}/${subcategory.name}`)
  }

  const totalProducts = await prisma.product.count()
  console.log(`\n🎉 Migration completed! Total products: ${totalProducts}`)
}

main()
  .catch((e) => {
    console.error('❌ Migration error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
