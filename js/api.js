// ============================================
// API SERVICE - BACKEND BAĞLANTISI
// ============================================

// API Base URL (production'da değişecek)
const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://api.cssberlin.de';

// ========================================
// ÜRÜN API'LERİ
// ========================================

/**
 * Tüm ürünleri çek
 */
async function fetchProducts(options = {}) {
    const {
        skip = 0,
        limit = 20,
        category = null,
        platform = null,
        minPrice = null,
        maxPrice = null,
        condition = null,
        sortBy = 'created_at',
        sortOrder = 'desc'
    } = options;

    const params = new URLSearchParams({
        skip,
        limit,
        sort_by: sortBy,
        sort_order: sortOrder
    });

    if (category) params.append('category', category);
    if (platform) params.append('platform', platform);
    if (minPrice) params.append('min_price', minPrice);
    if (maxPrice) params.append('max_price', maxPrice);
    if (condition) params.append('condition', condition);

    try {
        const response = await fetch(`${API_BASE}/api/products?${params}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchProducts error:', error);
        showNotification('Ürünler yüklenirken hata oluştu', 'error');
        return { total: 0, products: [] };
    }
}

/**
 * Tek ürün detayı çek
 */
async function fetchProductDetail(productId) {
    try {
        const response = await fetch(`${API_BASE}/api/products/${productId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Ürün bulunamadı');
            }
            throw new Error('API hatası');
        }
        return await response.json();
    } catch (error) {
        console.error('fetchProductDetail error:', error);
        showNotification(error.message, 'error');
        return null;
    }
}

/**
 * Kategoriye göre ürünler
 */
async function fetchProductsByCategory(category, skip = 0, limit = 20) {
    try {
        const response = await fetch(`${API_BASE}/api/products/category/${category}?skip=${skip}&limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchProductsByCategory error:', error);
        return { total: 0, products: [] };
    }
}

/**
 * Ürün araması
 */
async function searchProducts(query, skip = 0, limit = 20) {
    if (!query || query.length < 2) {
        return { total: 0, products: [] };
    }

    try {
        const response = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('searchProducts error:', error);
        showNotification('Arama sırasında hata oluştu', 'error');
        return { total: 0, products: [] };
    }
}

/**
 * Öne çıkan ürünler
 */
async function fetchFeaturedProducts(limit = 12) {
    try {
        const response = await fetch(`${API_BASE}/api/featured?limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchFeaturedProducts error:', error);
        return { total: 0, products: [] };
    }
}

/**
 * Yeni eklenen ürünler
 */
async function fetchNewArrivals(limit = 12) {
    try {
        const response = await fetch(`${API_BASE}/api/new-arrivals?limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchNewArrivals error:', error);
        return { total: 0, products: [] };
    }
}

/**
 * En iyi fırsatlar
 */
async function fetchBestDeals(limit = 12) {
    try {
        const response = await fetch(`${API_BASE}/api/deals?limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchBestDeals error:', error);
        return { total: 0, products: [] };
    }
}

/**
 * Benzer ürünler
 */
async function fetchSimilarProducts(productId, limit = 6) {
    try {
        const response = await fetch(`${API_BASE}/api/products/${productId}/similar?limit=${limit}`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchSimilarProducts error:', error);
        return { total: 0, products: [] };
    }
}

// ========================================
// KATEGORİ VE İSTATİSTİKLER
// ========================================

/**
 * Tüm kategoriler
 */
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE}/api/categories`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchCategories error:', error);
        return { categories: [] };
    }
}

/**
 * Tüm platformlar
 */
async function fetchPlatforms() {
    try {
        const response = await fetch(`${API_BASE}/api/platforms`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchPlatforms error:', error);
        return { platforms: [] };
    }
}

/**
 * Genel istatistikler
 */
async function fetchStats() {
    try {
        const response = await fetch(`${API_BASE}/api/stats`);
        if (!response.ok) throw new Error('API hatası');
        return await response.json();
    } catch (error) {
        console.error('fetchStats error:', error);
        return {
            total_products: 0,
            total_categories: 0,
            average_price: 0,
            new_today: 0
        };
    }
}

// ========================================
// YARDIMCI FONKSİYONLAR
// ========================================

/**
 * Bildirim göster
 */
function showNotification(message, type = 'info') {
    // Basit notification sistemi
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : '#4CAF50'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Loading spinner göster/gizle
 */
function toggleLoading(show = true) {
    let spinner = document.getElementById('loading-spinner');

    if (show && !spinner) {
        spinner = document.createElement('div');
        spinner.id = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        spinner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        document.body.appendChild(spinner);
    } else if (!show && spinner) {
        spinner.remove();
    }
}

/**
 * URL parametresi al
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Fiyat formatla (EUR)
 */
function formatPrice(price) {
    return `€${parseFloat(price).toFixed(2)}`;
}

/**
 * Tarih formatla
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Bugün';
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
    return date.toLocaleDateString('tr-TR');
}

/**
 * Placeholder image (resim yüklenmediyse)
 */
function getPlaceholderImage() {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23ddd" width="400" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';
}

// CSS animasyonları
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #333;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
