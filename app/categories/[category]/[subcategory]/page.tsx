import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import '../../category.css'

interface PageProps {
  params: {
    category: string
    subcategory: string
  }
  searchParams: {
    page?: string
    sortBy?: string
    minPrice?: string
    maxPrice?: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { category: catSlug, subcategory: subSlug } = params

  const category = await prisma.category.findUnique({
    where: { slug: catSlug },
    include: {
      subcategories: {
        where: { slug: subSlug }
      }
    }
  })

  if (!category || category.subcategories.length === 0) {
    return {}
  }

  const subcategory = category.subcategories[0]

  return {
    title: `${subcategory.name} - ${category.name} | CSS Berlin`,
    description: `Nachhaltige ${subcategory.name} kaufen. Große Auswahl an Second-Hand ${category.name} Mode. Jeder Kauf rettet das Klima.`,
    keywords: `${subcategory.name}, ${category.name}, Second-Hand, Nachhaltige Mode, CSS Berlin`,
    openGraph: {
      title: `${subcategory.name} - ${category.name}`,
      description: `Nachhaltige Mode bei CSS Berlin`,
      type: 'website',
      locale: 'de_DE'
    }
  }
}

// Server Component - SSR for SEO
export default async function SubcategoryPage({ params, searchParams }: PageProps) {
  const { category: catSlug, subcategory: subSlug } = params
  const page = parseInt(searchParams.page || '1')
  const sortBy = searchParams.sortBy || 'createdAt'
  const limit = 20

  // Fetch category and subcategory
  const category = await prisma.category.findUnique({
    where: { slug: catSlug },
    include: {
      subcategories: {
        where: { slug: subSlug }
      }
    }
  })

  if (!category || category.subcategories.length === 0) {
    notFound()
  }

  const subcategory = category.subcategories[0]

  // Build where clause
  const where: any = {
    subcategoryId: subcategory.id,
    isActive: true
  }

  if (searchParams.minPrice) {
    where.price = { ...where.price, gte: parseFloat(searchParams.minPrice) }
  }
  if (searchParams.maxPrice) {
    where.price = { ...where.price, lte: parseFloat(searchParams.maxPrice) }
  }

  // Fetch products
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: 'desc' },
      include: {
        category: true,
        subcategory: true
      }
    }),
    prisma.product.count({ where })
  ])

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
        <span> / </span>
        <span>{subcategory.name}</span>
      </div>

      <div className="category-header">
        <h1>{subcategory.name}</h1>
        <p>{total} Produkte gefunden</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <Image
                src={product.images}
                alt={product.name}
                width={400}
                height={500}
                style={{ objectFit: 'cover' }}
              />
              {product.sale && <span className="sale-badge">SALE</span>}
            </div>
            <div className="product-info">
              <span className="brand">{product.brand}</span>
              <h3>{product.name}</h3>
              <div className="product-details">
                <span className="size">Größe: {product.size}</span>
                <span className="condition">{product.condition}</span>
              </div>
              <div className="price-row">
                <span className="price">€{product.price.toFixed(2)}</span>
                <span className="original-price">€{product.newPrice.toFixed(2)}</span>
              </div>
              <div className="carbon-saved">
                ♻️ {product.carbonSaved} kg CO₂ gespart
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>Keine Produkte gefunden.</p>
        </div>
      )}
    </div>
  )
}
