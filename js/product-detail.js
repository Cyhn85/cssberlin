// ============================================
// PRODUCT DETAIL - ÜRÜN DETAY SAYFASI
// ============================================

let currentProduct = null;
let currentImageIndex = 0;

// ========================================
// SAYFA BAŞLATMA
// ========================================

/**
 * Ürün detay sayfasını başlat
 */
async function initProductDetailPage() {
    console.log('🚀 Ürün detay sayfası başlatılıyor...');

    // URL'den product ID al
    const productId = getUrlParameter('id');

    if (!productId) {
        showNotification('Ürün ID bulunamadı', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    // Loading göster
    toggleLoading(true);

    // Ürün detayını yükle
    await loadProductDetail(parseInt(productId));

    // Loading gizle
    toggleLoading(false);

    console.log('✅ Ürün detay sayfası hazır!');
}

// ========================================
// ÜRÜN DETAYI YÜKLEME
// ========================================

/**
 * Ürün detayını yükle ve göster
 */
async function loadProductDetail(productId) {
    const product = await fetchProductDetail(productId);

    if (!product) {
        // 404 - Ürün bulunamadı
        showProductNotFound();
        return;
    }

    currentProduct = product;

    // Sayfayı doldur
    updatePageTitle(product);
    renderProductImages(product);
    renderProductInfo(product);
    renderProductDescription(product);
    renderSellerInfo(product);

    // Benzer ürünleri yükle
    await loadSimilarProducts(productId);

    // Meta tags güncelle (SEO)
    updateMetaTags(product);
}

/**
 * Sayfa başlığını güncelle
 */
function updatePageTitle(product) {
    document.title = `${product.title} - ${formatPrice(product.price)} | CSS Berlin`;
}

/**
 * Ürün görsellerini render et
 */
function renderProductImages(product) {
    const gallery = document.getElementById('product-gallery');
    if (!gallery) return;

    const images = product.images && product.images.length > 0
        ? product.images
        : [getPlaceholderImage()];

    // Ana görsel
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = images[0];
        mainImage.alt = product.title;
        mainImage.onerror = () => mainImage.src = getPlaceholderImage();
    }

    // Thumbnail'ler
    const thumbnails = document.getElementById('image-thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = images.map((img, index) => `
            <img src="${img}"
                 alt="${product.title} - ${index + 1}"
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 onclick="changeImage(${index})"
                 onerror="this.src='${getPlaceholderImage()}'">
        `).join('');
    }

    // Zoom özelliği (opsiyonel)
    if (mainImage) {
        mainImage.onclick = () => openImageModal(images, currentImageIndex);
    }
}

/**
 * Ürün bilgilerini render et
 */
function renderProductInfo(product) {
    // Başlık
    const title = document.getElementById('product-title');
    if (title) title.textContent = product.title;

    // Fiyat
    const price = document.getElementById('product-price');
    if (price) price.textContent = formatPrice(product.price);

    // Platform
    const platform = document.getElementById('product-platform');
    if (platform) {
        platform.textContent = product.platform_name || product.platform;
        platform.className = `platform-badge platform-${product.platform}`;
    }

    // Durum
    const condition = document.getElementById('product-condition');
    if (condition && product.condition) {
        condition.textContent = product.condition;
    }

    // Kategori
    const category = document.getElementById('product-category');
    if (category && product.category) {
        category.textContent = capitalize(product.category);
        category.onclick = () => goToCategory(product.category);
    }

    // Marka
    const brand = document.getElementById('product-brand');
    if (brand && product.brand) {
        brand.textContent = product.brand;
    }

    // Beden (varsa)
    const size = document.getElementById('product-size');
    if (size && product.size) {
        size.textContent = product.size;
    }

    // Renk (varsa)
    const color = document.getElementById('product-color');
    if (color && product.color) {
        color.textContent = product.color;
    }

    // Lokasyon
    const location = document.getElementById('product-location');
    if (location) {
        location.innerHTML = `📍 ${product.location || 'Berlin, Deutschland'}`;
    }

    // Eklenme tarihi
    const date = document.getElementById('product-date');
    if (date) {
        date.innerHTML = `⏰ ${formatDate(product.created_at)}`;
    }

    // Kalite skoru (varsa)
    const quality = document.getElementById('product-quality');
    if (quality && product.quality_score) {
        quality.innerHTML = `⭐ Kalite: ${product.quality_score}/100`;
    }

    // Orijinal link
    const originalLink = document.getElementById('original-link');
    if (originalLink && product.url) {
        originalLink.href = product.url;
        originalLink.target = '_blank';
    }
}

/**
 * Ürün açıklamasını render et
 */
function renderProductDescription(product) {
    const description = document.getElementById('product-description');
    if (!description) return;

    if (product.description) {
        // Açıklamayı paragraflarla göster
        const paragraphs = product.description.split('\n').filter(p => p.trim());
        description.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    } else {
        description.innerHTML = '<p>Açıklama bulunmuyor.</p>';
    }
}

/**
 * Satıcı bilgilerini render et
 */
function renderSellerInfo(product) {
    const sellerName = document.getElementById('seller-name');
    const sellerRating = document.getElementById('seller-rating');

    if (sellerName) {
        sellerName.textContent = product.seller_name || 'Satıcı';
    }

    if (sellerRating && product.seller_rating) {
        sellerRating.innerHTML = `⭐ ${product.seller_rating}/5`;
    }
}

// ========================================
// BENZER ÜRÜNLER
// ========================================

/**
 * Benzer ürünleri yükle
 */
async function loadSimilarProducts(productId) {
    const container = document.getElementById('similar-products');
    if (!container) return;

    container.innerHTML = '<div class="loading">Yükleniyor...</div>';

    const data = await fetchSimilarProducts(productId, 6);

    if (data.products.length === 0) {
        container.innerHTML = '<p class="no-products">Benzer ürün bulunamadı</p>';
        return;
    }

    container.innerHTML = '';
    data.products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// ========================================
// GÖRSEL GALERİSİ
// ========================================

/**
 * Ana görseli değiştir
 */
function changeImage(index) {
    if (!currentProduct || !currentProduct.images) return;

    currentImageIndex = index;

    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = currentProduct.images[index];
    }

    // Thumbnail aktif state
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

/**
 * Görsel modal aç (zoom)
 */
function openImageModal(images, startIndex) {
    let modal = document.getElementById('image-modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'image-modal';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeImageModal()">&times;</span>
            <img id="modal-image" src="${images[startIndex]}" alt="Product Image">
            <div class="modal-nav">
                <button onclick="prevModalImage()" ${startIndex === 0 ? 'disabled' : ''}>❮ Önceki</button>
                <span>${startIndex + 1} / ${images.length}</span>
                <button onclick="nextModalImage()" ${startIndex === images.length - 1 ? 'disabled' : ''}>Sonraki ❯</button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    modal.dataset.images = JSON.stringify(images);
    modal.dataset.currentIndex = startIndex;

    // ESC tuşu ile kapat
    document.addEventListener('keydown', handleModalKeydown);
}

/**
 * Modal kapat
 */
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleModalKeydown);
    }
}

/**
 * Modal'da önceki görsel
 */
function prevModalImage() {
    const modal = document.getElementById('image-modal');
    const images = JSON.parse(modal.dataset.images);
    let index = parseInt(modal.dataset.currentIndex);

    if (index > 0) {
        index--;
        modal.dataset.currentIndex = index;
        document.getElementById('modal-image').src = images[index];
        updateModalNav(index, images.length);
    }
}

/**
 * Modal'da sonraki görsel
 */
function nextModalImage() {
    const modal = document.getElementById('image-modal');
    const images = JSON.parse(modal.dataset.images);
    let index = parseInt(modal.dataset.currentIndex);

    if (index < images.length - 1) {
        index++;
        modal.dataset.currentIndex = index;
        document.getElementById('modal-image').src = images[index];
        updateModalNav(index, images.length);
    }
}

/**
 * Modal navigasyon butonlarını güncelle
 */
function updateModalNav(index, total) {
    const modal = document.getElementById('image-modal');
    const nav = modal.querySelector('.modal-nav');
    nav.innerHTML = `
        <button onclick="prevModalImage()" ${index === 0 ? 'disabled' : ''}>❮ Önceki</button>
        <span>${index + 1} / ${total}</span>
        <button onclick="nextModalImage()" ${index === total - 1 ? 'disabled' : ''}>Sonraki ❯</button>
    `;
}

/**
 * Modal klavye kontrolleri
 */
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    } else if (e.key === 'ArrowLeft') {
        prevModalImage();
    } else if (e.key === 'ArrowRight') {
        nextModalImage();
    }
}

// ========================================
// 404 - ÜRÜN BULUNAMADI
// ========================================

/**
 * Ürün bulunamadı sayfası göster
 */
function showProductNotFound() {
    const container = document.querySelector('.product-detail-container');
    if (!container) return;

    container.innerHTML = `
        <div class="not-found">
            <h1>😔 Ürün Bulunamadı</h1>
            <p>Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
            <button onclick="window.location.href='index.html'" class="btn-primary">
                Ana Sayfaya Dön
            </button>
        </div>
    `;
}

// ========================================
// SEO - META TAGS
// ========================================

/**
 * Meta tags güncelle (SEO)
 */
function updateMetaTags(product) {
    // Description
    updateMetaTag('description', truncate(product.description || product.title, 160));

    // Open Graph (Facebook, WhatsApp)
    updateMetaTag('og:title', product.title);
    updateMetaTag('og:description', truncate(product.description || '', 200));
    updateMetaTag('og:image', product.images[0] || '');
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('og:type', 'product');
    updateMetaTag('og:price:amount', product.price);
    updateMetaTag('og:price:currency', 'EUR');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', product.title);
    updateMetaTag('twitter:description', truncate(product.description || '', 200));
    updateMetaTag('twitter:image', product.images[0] || '');
}

/**
 * Meta tag güncelle yardımcı fonksiyon
 */
function updateMetaTag(property, content) {
    let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);

    if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
            meta.setAttribute('property', property);
        } else {
            meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
    }

    meta.setAttribute('content', content);
}

// ========================================
// SAYFA YÜKLENME
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
    initProductDetailPage();
}
