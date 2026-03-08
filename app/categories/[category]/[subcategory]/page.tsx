import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import '../../category.css'

interface PageProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
  searchParams: Promise<{
    page?: string
    sortBy?: string
    minPrice?: string
    maxPrice?: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params
  const { category: catSlug, subcategory: subSlug } = resolvedParams

  const category = await prisma.category.findUnique({
    where: { slug: catSlug },
    include: {
      children: {
        where: { slug: subSlug }
      }
    }
  })

  if (!category || category.children.length === 0) {
    return {}
  }

  const subcategory = category.children[0]

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
  const resolvedParams = await params
  const { category: catSlug, subcategory: subSlug } = resolvedParams
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const sortBy = resolvedSearchParams.sortBy || 'createdAt'
  const limit = 20

  // Fetch category and subcategory
  const category = await prisma.category.findUnique({
    where: { slug: catSlug },
    include: {
      children: {
        where: { slug: subSlug }
      }
    }
  })

  if (!category || category.children.length === 0) {
    notFound()
  }

  const subcategory = category.children[0]

  // Build where clause
  const where: any = {
    categoryId: subcategory.id
  }

  if (resolvedSearchParams.minPrice) {
    where.price = { ...where.price, gte: parseFloat(resolvedSearchParams.minPrice) }
  }
  if (resolvedSearchParams.maxPrice) {
    where.price = { ...where.price, lte: parseFloat(resolvedSearchParams.maxPrice) }
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
        brand: true,
        size: true,
        color: true
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
              <span className="brand">{product.brand?.name || "N/A"}</span>
              <h3>{product.name}</h3>
              <div className="product-details">
                <span className="size">Größe: {product.size?.name || "N/A"}</span>
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
