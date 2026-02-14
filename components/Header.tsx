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
  const [currentBanner, setCurrentBanner] = useState(0)

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

  // Animated banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % 2)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const banners = [
    { icon: '🌍', text: '248.5 Tonnen CO₂ gespart - Jeder Kauf zählt für unseren Planeten!' },
    { icon: '♻️', text: 'Nachhaltige Mode für eine bessere Zukunft - Zusammen machen wir den Unterschied!' }
  ]

  return (
    <header className="header">
      {/* Animated Top Banner */}
      <div className="top-banner">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`banner-item ${index === currentBanner ? 'active' : ''}`}
            >
              <span className="banner-icon">{banner.icon}</span>
              <span>{banner.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="header-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <h1>CSS Berlin</h1>
          </Link>

          {/* Category Filter Button + Mega Menu */}
          <div
            className="category-section"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <button className="category-filter-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Kategorien</span>
            </button>

            {/* Mega Menu */}
            {showMegaMenu && categories.length > 0 && (
              <div className="mega-menu">
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

          {/* Navigation */}
          <nav className="nav">
            <Link href="/inserieren">Inserieren</Link>
            <Link href="/wunschliste">Wunschliste</Link>
            <Link href="/warenkorb">Warenkorb</Link>
            <Link href="/anmelden">Anmelden</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
