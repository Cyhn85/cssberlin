'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import './Header.css'

interface Category {
  id: number
  slug: string
  name: string
  subcategories: {
    id: number
    slug: string
    name: string
  }[]
}

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.categories)
        }
      })
      .catch(err => console.error('Failed to load categories:', err))
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const mainNavItems = [
    { name: 'MARKT', href: '/' },
    { name: 'HERREN', href: '/categories/herren' },
    { name: 'DAMEN', href: '/categories/damen' },
    { name: 'KINDER', href: '/categories/kinder' },
    { name: 'ELEKTRONIK', href: '/categories/sonstiges' },
    { name: 'SALE', href: '/sale' },
    { name: 'WIR UNTERSTÜTZEN', href: '/support' },
  ]

  return (
    <header className="modern-header">
      {/* Top Bar with Location */}
      <div className="top-bar">
        <div className="container">
          <div className="location-info">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Liefer in 10407 Berlin</span>
          </div>
          <div className="top-actions">
            <Link href="/hilfe" className="top-link">Hilfe</Link>
            <Link href="/anmelden" className="top-link">Anmelden</Link>
            <Link href="/registrieren" className="top-link">Registrieren</Link>
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Search */}
      <div className="main-header">
        <div className="container">
          <Link href="/" className="logo">
            <h1>CSS Berlin</h1>
            <span className="tagline">Second Chance Shop</span>
          </Link>

          {/* Search Bar */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Suche nach nachhaltiger Mode, Marken, Artikeln..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">Suchen</button>
            </div>
          </form>

          {/* Header Icons */}
          <div className="header-icons">
            <button className="icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="badge">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="container">
          <div className="nav-items">
            <button
              className="nav-item categories-btn"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Kategorien</span>
            </button>

            {mainNavItems.map((item) => (
              <Link key={item.name} href={item.href} className="nav-item">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mega Menu */}
          {showMegaMenu && categories.length > 0 && (
            <div
              className="mega-menu"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <div className="mega-menu-grid">
                {categories.map(category => (
                  <div key={category.id} className="mega-menu-column">
                    <h3 className="mega-menu-title">
                      <Link href={`/categories/${category.slug}`}>
                        {category.name}
                      </Link>
                    </h3>
                    <ul className="mega-menu-list">
                      {category.subcategories.map(sub => (
                        <li key={sub.id}>
                          <Link href={`/categories/${category.slug}/${sub.slug}`}>
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
