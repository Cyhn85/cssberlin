'use client'

import { useState, useEffect } from 'react'
import './home.css'

export default function HomePage() {
  const [socialSlide, setSocialSlide] = useState(0)
  const [infoSlide, setInfoSlide] = useState(0)

  // Social media banner slides
  const socialSlides = [
    {
      icon: '📱',
      title: 'Folgen Sie uns',
      subtitle: 'in sozialen Medien',
      platforms: ['Instagram', 'Facebook', 'TikTok']
    },
    {
      icon: '💚',
      title: 'Community',
      subtitle: '10.000+ Mitglieder',
      platforms: ['Nachhaltigkeit', 'Mode', 'Klima']
    }
  ]

  // Info banner slides
  const infoSlides = [
    {
      icon: '♻️',
      title: 'Second Chance',
      subtitle: 'Nachhaltige Mode für alle',
      description: 'Jeder Kauf rettet das Klima',
      color: 'from-purple-600 to-blue-600'
    },
    {
      icon: '🌍',
      title: '248.5 Tonnen CO₂',
      subtitle: 'bereits gespart!',
      description: 'Gemeinsam für den Planeten',
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: '⭐',
      title: 'Premium Qualität',
      subtitle: 'Geprüfte Artikel',
      description: 'Nur das Beste für Sie',
      color: 'from-amber-600 to-orange-600'
    }
  ]

  // Auto-rotate social banner
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialSlide(prev => (prev + 1) % socialSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate info banner
  useEffect(() => {
    const interval = setInterval(() => {
      setInfoSlide(prev => (prev + 1) % infoSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="homepage">
      {/* Dual Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="dual-banners">
            {/* Left Banner - Social Media */}
            <div className="banner social-banner">
              <div className="banner-slider">
                {socialSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`slide ${index === socialSlide ? 'active' : ''}`}
                  >
                    <div className="slide-icon">{slide.icon}</div>
                    <h3 className="slide-title">{slide.title}</h3>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <div className="platform-tags">
                      {slide.platforms.map((platform, i) => (
                        <span key={i} className="platform-tag">{platform}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="slider-dots">
                {socialSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === socialSlide ? 'active' : ''}`}
                    onClick={() => setSocialSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Banner - Info Slider */}
            <div className="banner info-banner">
              <div className="banner-slider">
                {infoSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`slide ${index === infoSlide ? 'active' : ''} bg-gradient-to-br ${slide.color}`}
                  >
                    <div className="slide-icon-large">{slide.icon}</div>
                    <h3 className="slide-title-large">{slide.title}</h3>
                    <p className="slide-subtitle-large">{slide.subtitle}</p>
                    <p className="slide-description">{slide.description}</p>
                  </div>
                ))}
              </div>
              <div className="slider-dots">
                {infoSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === infoSlide ? 'active' : ''}`}
                    onClick={() => setInfoSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="quick-categories">
        <div className="container">
          <h2 className="section-title">Beliebte Kategorien</h2>
          <div className="category-grid">
            <a href="/categories/damen" className="category-card">
              <div className="category-icon">👗</div>
              <h3>Damen</h3>
              <p>Mode & Accessoires</p>
            </a>
            <a href="/categories/herren" className="category-card">
              <div className="category-icon">👔</div>
              <h3>Herren</h3>
              <p>Kleidung & Schuhe</p>
            </a>
            <a href="/categories/kinder" className="category-card">
              <div className="category-icon">👶</div>
              <h3>Kinder</h3>
              <p>Baby bis Teenager</p>
            </a>
            <a href="/categories/sonstiges/vintage" className="category-card">
              <div className="category-icon">✨</div>
              <h3>Vintage</h3>
              <p>Besondere Stücke</p>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Schnelle Lieferung</h3>
              <p>In 2-3 Werktagen bei dir</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Sicher Bezahlen</h3>
              <p>Alle Zahlungsmethoden</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>100% Nachhaltig</h3>
              <p>Gut für die Umwelt</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Geprüfte Qualität</h3>
              <p>Nur beste Artikel</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
