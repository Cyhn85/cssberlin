// ===================================
// CSS Berlin - Complete Interactive Script V2
// ===================================

// Sample product data for demonstration
const sampleProducts = [
    {
        id: 1,
        brand: 'Zara',
        name: 'Elegante Blazer Jacke',
        size: 'M',
        condition: 'Sehr gut',
        price: 45.00,
        newPrice: 89.95,
        carbonSaved: 18.5,
        tier: 'champion',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 2,
        brand: 'H&M',
        name: 'Casual Jeans Hose',
        size: '32/32',
        condition: 'Gut',
        price: 28.00,
        newPrice: 49.99,
        carbonSaved: 12.3,
        tier: 'profi',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
        sale: true
    },
    {
        id: 3,
        brand: 'Mango',
        name: 'Sommer Kleid mit Blumenmuster',
        size: 'S',
        condition: 'Sehr gut',
        price: 32.00,
        newPrice: 59.99,
        carbonSaved: 8.7,
        tier: 'fortgeschritten',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 4,
        brand: 'Nike',
        name: 'Sport Sneakers Air Max',
        size: '42',
        condition: 'Gut',
        price: 65.00,
        newPrice: 129.99,
        carbonSaved: 5.2,
        tier: 'einsteiger',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 5,
        brand: 'Adidas',
        name: 'Performance Trainingsjacke',
        size: 'L',
        condition: 'Sehr gut',
        price: 38.00,
        newPrice: 75.00,
        carbonSaved: 14.2,
        tier: 'profi',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 6,
        brand: 'Tommy Hilfiger',
        name: 'Classic Poloshirt',
        size: 'M',
        condition: 'Gut',
        price: 22.00,
        newPrice: 49.99,
        carbonSaved: 6.8,
        tier: 'fortgeschritten',
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
        sale: true
    },
    {
        id: 7,
        brand: 'Levi\'s',
        name: '501 Original Fit Jeans',
        size: '30/32',
        condition: 'Sehr gut',
        price: 48.00,
        newPrice: 99.95,
        carbonSaved: 15.7,
        tier: 'champion',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 8,
        brand: 'Puma',
        name: 'Running Laufschuhe',
        size: '41',
        condition: 'Gut',
        price: 42.00,
        newPrice: 89.99,
        carbonSaved: 9.5,
        tier: 'profi',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 9,
        brand: 'Calvin Klein',
        name: 'Slim Fit Hemd',
        size: 'L',
        condition: 'Sehr gut',
        price: 35.00,
        newPrice: 79.90,
        carbonSaved: 11.3,
        tier: 'fortgeschritten',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 10,
        brand: 'The North Face',
        name: 'Outdoor Winterjacke',
        size: 'M',
        condition: 'Gut',
        price: 85.00,
        newPrice: 189.99,
        carbonSaved: 22.4,
        tier: 'champion',
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 11,
        brand: 'Vans',
        name: 'Old Skool Sneakers',
        size: '43',
        condition: 'Gut',
        price: 38.00,
        newPrice: 75.00,
        carbonSaved: 7.9,
        tier: 'profi',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop',
        sale: true
    },
    {
        id: 12,
        brand: 'Ralph Lauren',
        name: 'Polo Shirt Classic',
        size: 'L',
        condition: 'Sehr gut',
        price: 52.00,
        newPrice: 119.00,
        carbonSaved: 16.8,
        tier: 'champion',
        image: 'https://images.unsplash.com/photo-1598032895371-d5b3ac2a2ead?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 13,
        brand: 'Gap',
        name: 'Denim Jacke Vintage',
        size: 'M',
        condition: 'Gut',
        price: 32.00,
        newPrice: 69.95,
        carbonSaved: 10.2,
        tier: 'fortgeschritten',
        image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 14,
        brand: 'Converse',
        name: 'Chuck Taylor All Star',
        size: '42',
        condition: 'Sehr gut',
        price: 28.00,
        newPrice: 59.99,
        carbonSaved: 6.3,
        tier: 'einsteiger',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 15,
        brand: 'Uniqlo',
        name: 'Lightweight Down Jacket',
        size: 'S',
        condition: 'Sehr gut',
        price: 45.00,
        newPrice: 99.90,
        carbonSaved: 13.5,
        tier: 'profi',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop',
        sale: false
    },
    {
        id: 16,
        brand: 'Esprit',
        name: 'Casual Chino Hose',
        size: '32/34',
        condition: 'Gut',
        price: 26.00,
        newPrice: 59.99,
        carbonSaved: 8.1,
        tier: 'fortgeschritten',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
        sale: false
    }
];

// Carbon tier translations
const carbonTiers = {
    'champion': { label: 'Champion', color: '#FFD700' },
    'profi': { label: 'Profi', color: '#4169E1' },
    'fortgeschritten': { label: 'Fortgeschritten', color: '#9370DB' },
    'einsteiger': { label: 'Einsteiger', color: '#20B2AA' }
};

// Global state
let currentProductsIndex = 16; // Already showing 16 (4 rows)
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initBannerTransformation();
    initNewsSlider();
    initCategoryFilter();
    initProductGrid();
    initWishlistButtons();
    initLoadMore();
    initNotifications();
    initNewsletterForm();
});

// ===================================
// BANNER TRANSFORMATION
// ===================================

function initBannerTransformation() {
    const bannerWrapper = document.querySelector('.banner-image-wrapper');
    const marsVersion = document.querySelector('.mars-version');
    const earthVersion = document.querySelector('.earth-version');

    if (!bannerWrapper) return;

    // Hover effect
    bannerWrapper.addEventListener('mouseenter', function() {
        bannerWrapper.classList.remove('auto-animate');
        marsVersion.classList.remove('active');
        earthVersion.classList.add('active');
    });

    bannerWrapper.addEventListener('mouseleave', function() {
        marsVersion.classList.add('active');
        earthVersion.classList.remove('active');

        // Restart auto-animation after 2 seconds
        setTimeout(() => {
            bannerWrapper.classList.add('auto-animate');
        }, 2000);
    });

    // Auto-animation: Start after 3 seconds
    setTimeout(() => {
        bannerWrapper.classList.add('auto-animate');
    }, 3000);
}

// ===================================
// NEWS SLIDER
// ===================================

function initNewsSlider() {
    const newsSlider = document.getElementById('newsSlider');
    if (!newsSlider) return;

    // Clone news items for infinite scroll
    const newsItems = newsSlider.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        const clone = item.cloneNode(true);
        newsSlider.appendChild(clone);
    });

    // Click handler for news items
    newsSlider.addEventListener('click', function(e) {
        const newsItem = e.target.closest('.news-item');
        if (newsItem) {
            const link = newsItem.dataset.link;
            console.log('Navigate to:', link);
            showNotification('Dieser Bereich wird bald verfügbar sein!', 'info');
        }
    });
}

// ===================================
// CATEGORY FILTER DROPDOWN
// ===================================

function initCategoryFilter() {
    const filterBtn = document.getElementById('categoryFilterBtn');
    if (!filterBtn) return;

    filterBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        showCategoryDropdown();
    });
}

function showCategoryDropdown() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '100px 20px 20px',
        animation: 'fadeIn 0.3s ease-out'
    });

    // Create dropdown panel
    const panel = document.createElement('div');
    panel.className = 'category-dropdown-panel';
    Object.assign(panel.style, {
        background: 'white',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '70vh',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        animation: 'slideDown 0.3s ease-out'
    });

    const categories = [
        {
            name: 'Damen',
            subcategories: ['Oberteile', 'Hosen & Jeans', 'Kleider & Röcke', 'Jacken & Mäntel', 'Schuhe', 'Accessoires']
        },
        {
            name: 'Herren',
            subcategories: ['T-Shirts & Tops', 'Hemden', 'Hosen & Jeans', 'Jacken & Mäntel', 'Schuhe', 'Accessoires']
        },
        {
            name: 'Kinder',
            subcategories: ['Baby (0-2)', 'Kleinkind (3-6)', 'Kind (7-12)', 'Teenager (13+)']
        },
        {
            name: 'Sport & Outdoor',
            subcategories: ['Sportbekleidung', 'Sportschuhe', 'Outdoor-Jacken', 'Funktionskleidung']
        },
        {
            name: 'Accessoires',
            subcategories: ['Taschen', 'Gürtel', 'Schmuck', 'Uhren', 'Sonnenbrillen', 'Schals & Tücher']
        },
        {
            name: 'Sonstiges',
            subcategories: ['Ohne Kategorie', 'Neu hochgeladen', 'Vintage']
        }
    ];

    panel.innerHTML = `
        <div style="padding: 24px; border-bottom: 1px solid #E0E0E0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 20px; font-weight: 700;">Kategorien durchsuchen</h3>
                <button class="close-panel" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #757575;">&times;</button>
            </div>
            <div style="margin-top: 16px;">
                <input
                    type="text"
                    id="categorySearch"
                    placeholder="Kategorie suchen..."
                    style="width: 100%; padding: 12px; border: 2px solid #E0E0E0; border-radius: 8px; font-size: 15px; outline: none;"
                >
            </div>
        </div>
        <div style="padding: 16px; max-height: 400px; overflow-y: auto;" id="categoryList">
            ${categories.map(cat => `
                <div class="category-group" style="margin-bottom: 20px;">
                    <div class="category-main" style="padding: 12px; background: #F5F5F5; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        <span>${cat.name}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="chevron" style="transition: transform 0.3s;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                    <div class="subcategory-list" style="display: none; padding: 8px 0 0 16px;">
                        ${cat.subcategories.map(sub => `
                            <div class="subcategory-item" data-category="${cat.name}" data-subcategory="${sub}" style="padding: 8px 12px; cursor: pointer; border-radius: 6px; transition: background 0.2s;">
                                ${sub}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close panel handlers
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePanel();
    });

    panel.querySelector('.close-panel').addEventListener('click', closePanel);

    // Category expand/collapse
    panel.querySelectorAll('.category-main').forEach(main => {
        main.addEventListener('click', function() {
            const sublist = this.nextElementSibling;
            const chevron = this.querySelector('.chevron');
            const isExpanded = sublist.style.display === 'block';

            // Collapse all
            panel.querySelectorAll('.subcategory-list').forEach(list => {
                list.style.display = 'none';
            });
            panel.querySelectorAll('.chevron').forEach(ch => {
                ch.style.transform = 'rotate(0deg)';
            });

            // Expand clicked
            if (!isExpanded) {
                sublist.style.display = 'block';
                chevron.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Subcategory selection
    panel.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#E8F5E9';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            const subcategory = this.dataset.subcategory;
            closePanel();
            showNotification(`Filter angewendet: ${category} → ${subcategory}`, 'success');
            console.log('Filter:', category, subcategory);
        });
    });

    // Search functionality
    const searchInput = panel.querySelector('#categorySearch');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        panel.querySelectorAll('.category-group').forEach(group => {
            const mainText = group.querySelector('.category-main span').textContent.toLowerCase();
            const subcats = Array.from(group.querySelectorAll('.subcategory-item'));

            let hasMatch = mainText.includes(query);
            let visibleSubcats = 0;

            subcats.forEach(sub => {
                const subText = sub.textContent.toLowerCase();
                if (subText.includes(query) || mainText.includes(query)) {
                    sub.style.display = 'block';
                    visibleSubcats++;
                    hasMatch = true;
                } else {
                    sub.style.display = 'none';
                }
            });

            if (hasMatch) {
                group.style.display = 'block';
                if (query) {
                    group.querySelector('.subcategory-list').style.display = 'block';
                    group.querySelector('.chevron').style.transform = 'rotate(180deg)';
                }
            } else {
                group.style.display = 'none';
            }
        });
    });

    function closePanel() {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        panel.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
            document.getElementById('categoryFilterBtn').classList.remove('active');
        }, 300);
    }
}

// ===================================
// PRODUCT GRID
// ===================================

function initProductGrid() {
    renderProducts(sampleProducts);
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => createProductCard(product)).join('');

    // Re-initialize wishlist buttons after rendering
    initWishlistButtons();
}

function createProductCard(product) {
    const isInWishlist = wishlist.includes(product.id);

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <div class="carbon-badge ${product.tier}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                    </svg>
                    <span>-${product.carbonSaved}kg CO₂</span>
                </div>
                ${product.sale ? '<div class="sale-badge">BOGO</div>' : ''}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <span class="product-size">Größe ${product.size}</span>
                    <span class="product-condition">${product.condition}</span>
                </div>
                <div class="price-row">
                    <div class="price-info">
                        <span class="current-price">${product.price.toFixed(2)}€</span>
                        <span class="new-price-label">Neupreis: <a href="#" class="price-link">${product.newPrice.toFixed(2)}€</a></span>
                    </div>
                </div>
                <button class="add-to-cart-btn">In den Warenkorb</button>
            </div>
        </div>
    `;
}

// ===================================
// WISHLIST
// ===================================

function initWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.dataset.productId);
            toggleWishlist(productId, this);
        });
    });

    // Product card click
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart-btn')) {
                return;
            }
            const productId = this.dataset.productId;
            console.log('Navigate to product:', productId);
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            const productTitle = card.querySelector('.product-title').textContent;

            this.textContent = '✓ Hinzugefügt';
            this.style.background = '#4A7C2C';

            setTimeout(() => {
                this.textContent = 'In den Warenkorb';
                this.style.background = '';
            }, 2000);

            showNotification(`"${productTitle}" zum Warenkorb hinzugefügt`, 'success');
        });
    });
}

function toggleWishlist(productId, button) {
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        button.classList.remove('active');
        button.querySelector('svg').setAttribute('fill', 'none');
        showNotification('Aus Wunschliste entfernt', 'info');
    } else {
        wishlist.push(productId);
        button.classList.add('active');
        button.querySelector('svg').setAttribute('fill', 'currentColor');
        showNotification('Zur Wunschliste hinzugefügt', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ===================================
// LOAD MORE
// ===================================

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function() {
        this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle></svg> Lädt...';
        this.disabled = true;

        setTimeout(() => {
            // Generate more random products (simulate API call)
            const moreProducts = generateRandomProducts(8);
            const grid = document.getElementById('productsGrid');

            moreProducts.forEach(product => {
                const card = document.createElement('div');
                card.innerHTML = createProductCard(product);
                grid.appendChild(card.firstElementChild);
            });

            initWishlistButtons();

            this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 9 12 15 18 9"></polyline></svg> Mehr Produkte laden';
            this.disabled = false;

            showNotification('8 neue Produkte geladen', 'success');
        }, 1000);
    });
}

function generateRandomProducts(count) {
    const brands = ['Zara', 'H&M', 'Mango', 'Nike', 'Adidas', 'Puma', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein'];
    const names = ['Jacke', 'Hose', 'Kleid', 'Hemd', 'T-Shirt', 'Pullover', 'Schuhe', 'Sneakers'];
    const conditions = ['Sehr gut', 'Gut', 'Neu'];
    const sizes = ['S', 'M', 'L', 'XL', '32', '34', '36', '38', '40', '42'];
    const tiers = ['champion', 'profi', 'fortgeschritten', 'einsteiger'];
    const images = [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    ];

    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            id: currentProductsIndex++,
            brand: brands[Math.floor(Math.random() * brands.length)],
            name: names[Math.floor(Math.random() * names.length)],
            size: sizes[Math.floor(Math.random() * sizes.length)],
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            price: Math.floor(Math.random() * 80) + 20,
            newPrice: Math.floor(Math.random() * 150) + 50,
            carbonSaved: (Math.random() * 20 + 5).toFixed(1),
            tier: tiers[Math.floor(Math.random() * tiers.length)],
            image: images[Math.floor(Math.random() * images.length)],
            sale: Math.random() > 0.8
        });
    }
    return products;
}

// ===================================
// NOTIFICATIONS
// ===================================

function initNotifications() {
    const notificationBtn = document.querySelector('.icon-btn[title="Benachrichtigungen"]');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotificationPanel();
        });
    }

    // Negotiation button
    const negotiationBtn = document.querySelector('.icon-btn[title="Verhandlungen"]');
    if (negotiationBtn) {
        negotiationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Verhandlungsübersicht wird bald verfügbar sein!', 'info');
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: type === 'success' ? '#4A7C2C' : type === 'error' ? '#D32F2F' : '#2D5016',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px',
        fontSize: '14px',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showNotificationPanel() {
    const overlay = document.createElement('div');
    overlay.className = 'notification-panel-overlay';

    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '80px 20px 20px'
    });

    const panel = document.createElement('div');
    panel.className = 'notification-panel';

    Object.assign(panel.style, {
        background: 'white',
        width: '400px',
        maxHeight: '600px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        animation: 'slideInRight 0.3s ease-out'
    });

    panel.innerHTML = `
        <div style="padding: 24px; border-bottom: 1px solid #E0E0E0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 20px; font-weight: 700;">Benachrichtigungen</h3>
                <button class="close-panel" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #757575;">&times;</button>
            </div>
        </div>
        <div style="padding: 16px; max-height: 500px; overflow-y: auto;">
            <div class="notification-item" style="padding: 16px; margin-bottom: 12px; background: #F5F5F5; border-radius: 8px; cursor: pointer; transition: background 0.2s;">
                <div style="display: flex; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: #4A7C2C; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">🎉</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 4px;">Willkommen bei CSS Berlin!</div>
                        <div style="font-size: 14px; color: #757575; margin-bottom: 4px;">Entdecke nachhaltige Mode und spare CO₂</div>
                        <div style="font-size: 12px; color: #9E9E9E;">vor 2 Stunden</div>
                    </div>
                </div>
            </div>

            <div class="notification-item" style="padding: 16px; margin-bottom: 12px; background: #F5F5F5; border-radius: 8px; cursor: pointer; transition: background 0.2s;">
                <div style="display: flex; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 700; flex-shrink: 0;">🏆</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 4px;">Neues BOGO Angebot!</div>
                        <div style="font-size: 14px; color: #757575; margin-bottom: 4px;">1 kaufen, 1 gratis bei ausgewählten Produkten</div>
                        <div style="font-size: 12px; color: #9E9E9E;">vor 5 Stunden</div>
                    </div>
                </div>
            </div>

            <div class="notification-item" style="padding: 16px; margin-bottom: 12px; background: #F5F5F5; border-radius: 8px; cursor: pointer; transition: background 0.2s;">
                <div style="display: flex; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: #4169E1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0;">📦</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; margin-bottom: 4px;">Versandaktualisierung</div>
                        <div style="font-size: 14px; color: #757575; margin-bottom: 4px;">Dein Paket wurde versandt</div>
                        <div style="font-size: 12px; color: #9E9E9E;">gestern</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePanel();
    });

    panel.querySelector('.close-panel').addEventListener('click', closePanel);

    panel.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = '#E8F5E9';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = '#F5F5F5';
        });
    });

    function closePanel() {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        panel.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => overlay.remove(), 300);
    }
}

// ===================================
// NEWSLETTER FORM
// ===================================

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showNotification(`Newsletter-Anmeldung erfolgreich für: ${email}`, 'success');
        this.reset();
    });
}

// ===================================
// CSS ANIMATIONS (injected)
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes slideDown {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
