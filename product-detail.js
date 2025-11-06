// ===================================
// PRODUCT DETAIL PAGE SCRIPTS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initThumbnailGallery();
    initSizeSelection();
    initNegotiationButton();
});

// ===================================
// THUMBNAIL GALLERY
// ===================================

function initThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Add active class to clicked thumbnail
            this.classList.add('active');

            // Update main image
            const fullImageUrl = this.getAttribute('data-full');
            if (mainImage && fullImageUrl) {
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = fullImageUrl;
                    mainImage.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// ===================================
// SIZE SELECTION
// ===================================

function initSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn:not(.disabled)');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const size = this.textContent;
            showNotification(`Größe ${size} ausgewählt`, 'success');
        });
    });
}

// ===================================
// NEGOTIATION BUTTON
// ===================================

function initNegotiationButton() {
    const negotiationBtn = document.querySelector('.btn-secondary');

    if (negotiationBtn) {
        negotiationBtn.addEventListener('click', function() {
            showNegotiationModal();
        });
    }
}

function showNegotiationModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out'
    });

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'negotiation-modal';

    Object.assign(modal.style, {
        background: 'white',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out'
    });

    const currentPrice = 45.00;
    const maxDiscount = 0.15;
    const minPrice = (currentPrice * (1 - maxDiscount)).toFixed(2);

    modal.innerHTML = `
        <div style="padding: 32px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h3 style="margin: 0; font-size: 24px; font-weight: 700;">Preis verhandeln</h3>
                <button class="close-modal" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #757575; padding: 0; width: 32px; height: 32px;">&times;</button>
            </div>

            <div style="background: #F5F5F5; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #757575;">Aktueller Preis:</span>
                    <span style="font-weight: 700; font-size: 18px;">${currentPrice.toFixed(2)}€</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #757575;">Max. Rabatt:</span>
                    <span style="font-weight: 700; color: #2D5016;">15%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #757575;">Min. Preis:</span>
                    <span style="font-weight: 700; font-size: 18px; color: #2D5016;">${minPrice}€</span>
                </div>
            </div>

            <div style="margin-bottom: 24px;">
                <label style="display: block; font-weight: 600; margin-bottom: 12px;">
                    Dein Angebot:
                </label>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <input
                        type="number"
                        id="offerInput"
                        min="${minPrice}"
                        max="${currentPrice}"
                        step="0.50"
                        value="${minPrice}"
                        style="flex: 1; padding: 12px 16px; border: 2px solid #E0E0E0; border-radius: 8px; font-size: 18px; font-weight: 600; outline: none;"
                    >
                    <span style="font-size: 18px; font-weight: 600;">€</span>
                </div>
                <div style="margin-top: 12px;">
                    <input
                        type="range"
                        id="offerSlider"
                        min="${minPrice}"
                        max="${currentPrice}"
                        step="0.50"
                        value="${minPrice}"
                        style="width: 100%;"
                    >
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: #757575;">
                    <span>${minPrice}€</span>
                    <span>${currentPrice.toFixed(2)}€</span>
                </div>
            </div>

            <div style="background: #E8F5E9; padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 14px; color: #2D5016;">
                <div style="display: flex; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="flex-shrink: 0;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <div>
                        <strong>Verhandlungen verbleibend heute: 4/5</strong><br>
                        Nach 5 Verhandlungen: 1€ pro weitere Verhandlung
                    </div>
                </div>
            </div>

            <button class="submit-offer-btn" style="width: 100%; background: #2D5016; color: white; border: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                Angebot senden
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Sync slider and input
    const offerInput = modal.querySelector('#offerInput');
    const offerSlider = modal.querySelector('#offerSlider');

    offerSlider.addEventListener('input', function() {
        offerInput.value = this.value;
    });

    offerInput.addEventListener('input', function() {
        offerSlider.value = this.value;
    });

    // Close modal on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Close modal on close button click
    modal.querySelector('.close-modal').addEventListener('click', closeModal);

    // Submit offer
    modal.querySelector('.submit-offer-btn').addEventListener('click', function() {
        const offer = parseFloat(offerInput.value);
        const discount = ((currentPrice - offer) / currentPrice * 100).toFixed(1);

        closeModal();

        setTimeout(() => {
            showNotification(
                `Angebot gesendet: ${offer.toFixed(2)}€ (${discount}% Rabatt). Der Verkäufer wird benachrichtigt.`,
                'success'
            );
        }, 300);
    });

    // Hover effect for submit button
    const submitBtn = modal.querySelector('.submit-offer-btn');
    submitBtn.addEventListener('mouseenter', function() {
        this.style.background = '#4A7C2C';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    submitBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2D5016';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });

    function closeModal() {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        modal.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes slideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(30px);
            opacity: 0;
        }
    }

    #mainImage {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
