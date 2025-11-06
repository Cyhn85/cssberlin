// ============================================
// PRODUCTS.JS - DİNAMİK ÜRÜN YÖNETİMİ
// ============================================

// Global state
let currentPage = 0;
let currentCategory = null;
let currentSearch = null;
let isLoading = false;

// ========================================
// ANA SAYFA ÜRÜN YÜKLEME
// ========================================

/**
 * Ana sayfayı başlat
 */
async function initHomePage() {
    console.log('🚀 Ana sayfa başlatılıyor...');

    // İstatistikleri yükle
    await loadStats();

    // Öne çıkan ürünleri yükle
    await loadFeaturedProducts();

    // Yeni ürünleri yükle
    await loadNewArrivals();

    // Kategori kartlarını dinamikleştir
    await loadCategories();

    // Arama fonksiyonunu aktif et
    initSearch();

    console.log('✅ Ana sayfa hazır!');
}

/**
 * İstatistikleri yükle ve göster
 */
async function loadStats() {
    const stats = await fetchStats();

    // Header'daki badge'leri güncelle (varsa)
    const totalBadge = document.getElementById('total-products-badge');
    if (totalBadge) {
        totalBadge.textContent = `${stats.total_products} Ürün`;
    }

    // Hero section'da istatistik göster
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${stats.total_products}</span>
                <span class="stat-label">Toplam Ürün</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${stats.total_categories}</span>
                <span class="stat-label">Kategori</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${stats.new_today}</span>
                <span class="stat-label">Bugün Eklenen</span>
            </div>
        `;
    }
}

/**
 * Öne çıkan ürünleri yükle
 */
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // Loading göster
    container.innerHTML = '<div class="loading">Yükleniyor...</div>';

    const data = await fetchFeaturedProducts(12);

    if (data.products.length === 0) {
        container.innerHTML = '<p class="no-products">Henüz ürün yok</p>';
        return;
    }

    container.innerHTML = '';
    data.products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

/**
 * Yeni ürünleri yükle
 */
async function loadNewArrivals() {
    const container = document.getElementById('new-arrivals');
    if (!container) return;

    container.innerHTML = '<div class="loading">Yükleniyor...</div>';

    const data = await fetchNewArrivals(12);

    if (data.products.length === 0) {
        container.innerHTML = '<p class="no-products">Yeni ürün yok</p>';
        return;
    }

    container.innerHTML = '';
    data.products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

/**
 * Kategori kartlarını dinamikleştir
 */
async function loadCategories() {
    const container = document.querySelector('.categories-grid');
    if (!container) return;

    const data = await fetchCategories();

    // Kategori ikonları
    const categoryIcons = {
        'shoes': '👟',
        'clothing': '👕',
        'accessories': '👜',
        'electronics': '📱',
        'home': '🏠',
        'sports': '⚽',
        'books': '📚',
        'toys': '🧸',
        'jewelry': '💍',
        'other': '🎁'
    };

    container.innerHTML = '';
    data.categories.forEach(cat => {
        const icon = categoryIcons[cat.name] || '📦';
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => goToCategory(cat.name);
        categoryCard.innerHTML = `
            <div class="category-icon">${icon}</div>
            <h3>${capitalize(cat.name)}</h3>
            <p>${cat.count} ürün</p>
        `;
        container.appendChild(categoryCard);
    });
}

// ========================================
// ÜRÜN KARTI OLUŞTURMA
// ========================================

/**
 * Ürün kartı oluştur
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => goToProduct(product.id);

    // İlk resim veya placeholder
    const imageUrl = (product.images && product.images.length > 0)
        ? product.images[0]
        : getPlaceholderImage();

    // Yeni badge (24 saat içinde eklendiyse)
    const isNew = isProductNew(product.created_at);
    const newBadge = isNew ? '<span class="badge badge-new">Yeni</span>' : '';

    // Kalite badge (quality_score >= 80)
    const qualityBadge = product.quality_score >= 80
        ? '<span class="badge badge-quality">Kaliteli</span>'
        : '';

    card.innerHTML = `
        <div class="product-image">
            <img src="${imageUrl}" alt="${product.title}" loading="lazy" onerror="this.src='${getPlaceholderImage()}'">
            ${newBadge}
            ${qualityBadge}
        </div>
        <div class="product-info">
            <h3 class="product-title">${truncate(product.title, 50)}</h3>
            <p class="product-platform">${product.platform_name || product.platform}</p>
            <div class="product-details">
                <span class="product-price">${formatPrice(product.price)}</span>
                ${product.condition ? `<span class="product-condition">${product.condition}</span>` : ''}
            </div>
            <div class="product-meta">
                <span>📍 ${product.location || 'Berlin'}</span>
                <span>⏰ ${formatDate(product.created_at)}</span>
            </div>
        </div>
    `;

    return card;
}

/**
 * Ürünün yeni olup olmadığını kontrol et
 */
function isProductNew(createdAt) {
    const productDate = new Date(createdAt);
    const now = new Date();
    const diffHours = (now - productDate) / (1000 * 60 * 60);
    return diffHours < 24;
}

// ========================================
// ARAMA
// ========================================

/**
 * Arama fonksiyonunu başlat
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (!searchInput) return;

    // Enter tuşu ile arama
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Buton ile arama
    if (searchButton) {
        searchButton.onclick = performSearch;
    }

    // Real-time arama (opsiyonel)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value;

        if (query.length >= 3) {
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 500);
        }
    });
}

/**
 * Arama yap ve sonuç sayfasına git
 */
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query.length < 2) {
        showNotification('En az 2 karakter girin', 'error');
        return;
    }

    // Arama sayfasına yönlendir
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

/**
 * Arama önerileri göster (real-time)
 */
async function showSearchSuggestions(query) {
    const data = await searchProducts(query, 0, 5);

    // Öneri dropdown'ı oluştur
    let dropdown = document.getElementById('search-suggestions');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'search-suggestions';
        dropdown.className = 'search-suggestions';
        document.querySelector('.search-container').appendChild(dropdown);
    }

    if (data.products.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    dropdown.innerHTML = data.products.map(p => `
        <div class="suggestion-item" onclick="goToProduct(${p.id})">
            <img src="${p.images[0] || getPlaceholderImage()}" alt="${p.title}">
            <div>
                <div class="suggestion-title">${truncate(p.title, 40)}</div>
                <div class="suggestion-price">${formatPrice(p.price)}</div>
            </div>
        </div>
    `).join('');

    dropdown.style.display = 'block';

    // Dışarı tıklayınca kapat
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            dropdown.style.display = 'none';
        }
    });
}

// ========================================
// SAYFA NAVİGASYONU
// ========================================

/**
 * Ürün detay sayfasına git
 */
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

/**
 * Kategori sayfasına git
 */
function goToCategory(category) {
    window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
}

// ========================================
// YARDIMCI FONKSİYONLAR
// ========================================

/**
 * Metni kes
 */
function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * İlk harfi büyük yap
 */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// ========================================
// SAYFA YÜKLENME
// ========================================

// DOMContentLoaded event'inde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomePage);
} else {
    initHomePage();
}
