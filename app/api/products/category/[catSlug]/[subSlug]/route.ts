import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { catSlug: string; subSlug: string } }
) {
  try {
    const { catSlug, subSlug } = params
    const searchParams = request.nextUrl.searchParams

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Sorting
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'

    // Filters
    const minPrice = parseFloat(searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
    const condition = searchParams.get('condition')

    // Find parent category
    const parentCategory = await prisma.category.findUnique({
      where: { slug: catSlug },
      include: {
        children: {
          where: { slug: subSlug }
        }
      }
    })

    if (!parentCategory || parentCategory.children.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category or subcategory not found' },
        { status: 404 }
      )
    }

    const subcategory = parentCategory.children[0]

    // Build where clause
    const where: any = {
      categoryId: subcategory.id,
      price: { gte: minPrice, lte: maxPrice }
    }

    if (condition) {
      where.condition = condition
    }

    // Fetch products and total count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: { select: { name: true, slug: true } },
          brand: { select: { name: true } },
          color: { select: { name: true } },
          size: { select: { name: true } }
        }
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      category: {
        name: parentCategory.name,
        slug: parentCategory.slug
      },
      subcategory: {
        name: subcategory.name,
        slug: subcategory.slug
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
