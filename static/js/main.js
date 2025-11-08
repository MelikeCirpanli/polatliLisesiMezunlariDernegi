document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBİL MENÜ ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            document.querySelectorAll('.nav-links li').forEach((link, index) => {
                 link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        });
    }

    // --- 2. HAKKIMIZDA SEKMELERİ ---
    const tabs = document.querySelectorAll('.tab-btn');
    const allContent = document.querySelectorAll('.tab-content');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            allContent.forEach(content => content.classList.remove('active-content'));
            document.getElementById(tab.getAttribute('data-target')).classList.add('active-content');
        });
    });

    // --- 3. GALERİ SLIDER (KAYDIRMA) ---
    const slider = document.getElementById('sliderWrapper');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let isDragging = false;

    if (slider) {
        if(nextBtn) nextBtn.addEventListener('click', () => slider.scrollBy({ left: 300, behavior: 'smooth' }));
        if(prevBtn) prevBtn.addEventListener('click', () => slider.scrollBy({ left: -300, behavior: 'smooth' }));

        let isDown = false, startX, scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true; isDragging = false;
            slider.style.cursor = 'grabbing'; slider.style.scrollBehavior = 'auto';
            startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.style.cursor = 'grab'; slider.style.scrollBehavior = 'smooth'; });
        slider.addEventListener('mouseup', () => { isDown = false; slider.style.cursor = 'grab'; slider.style.scrollBehavior = 'smooth'; setTimeout(() => isDragging = false, 50); });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
            if(Math.abs(walk) > 5) isDragging = true;
        });
    }

    // =========================================
    // 4. LIGHTBOX (GEZİNMELİ)
    // =========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    
    const galleryImages = Array.from(document.querySelectorAll('.slide-item img'));
    let currentImageIndex = 0;

    const updateLightboxImage = (index) => {
        if (!lightboxImg) return;
        if (index < 0) index = galleryImages.length - 1;
        if (index >= galleryImages.length) index = 0;
        currentImageIndex = index;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    };

    document.querySelectorAll('.slide-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            if (isDragging) { e.preventDefault(); return; }
            const clickedImg = item.querySelector('img');
            if (clickedImg) {
                currentImageIndex = galleryImages.indexOf(clickedImg);
                updateLightboxImage(currentImageIndex);
                lightbox.classList.add('active');
            }
        });
    });

    if(lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); updateLightboxImage(currentImageIndex - 1); });
    if(lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); updateLightboxImage(currentImageIndex + 1); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') updateLightboxImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') updateLightboxImage(currentImageIndex + 1);
        if (e.key === 'Escape') closeBox();
    });

    let touchStartX = 0;
    let touchEndX = 0;
    if(lightbox) {
        lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, false);
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) updateLightboxImage(currentImageIndex + 1);
            if (touchEndX > touchStartX + 50) updateLightboxImage(currentImageIndex - 1);
        }, false);
    }

    const closeBox = () => lightbox.classList.remove('active');
    if(closeLightbox) closeLightbox.addEventListener('click', closeBox);
    if(lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeBox(); });

    // --- 5. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Mobilde menüyü kapat
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').classList.remove('nav-active');
                    if(document.querySelector('.burger')) document.querySelector('.burger').classList.remove('toggle');
                }
            }
        });
    });

// --- 6. İLETİŞİM FORMU (AJAX GÖNDERİMİ) ---
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("my-form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Sayfanın yenilenmesini engelle
            const data = new FormData(contactForm);
            
            // Butonu pasif yap (çift gönderimi önle)
            const submitBtn = contactForm.querySelector('.btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Gönderiliyor...";
            formStatus.innerHTML = ""; // Önceki mesajları temizle

            fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formStatus.innerHTML = "✅ Mesajınız başarıyla gönderildi! Teşekkürler.";
                    formStatus.style.color = "green";
                    contactForm.reset(); // Form kutularını temizle
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = "❌ " + data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formStatus.innerHTML = "❌ Oops! Gönderimde bir hata oluştu.";
                        }
                        formStatus.style.color = "red";
                    });
                }
            }).catch(error => {
                formStatus.innerHTML = "❌ Oops! Sunucu hatası oluştu.";
                formStatus.style.color = "red";
            }).finally(() => {
                // İşlem bitince butonu eski haline getir
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Gönder";
                // 5 saniye sonra başarı mesajını sil (isteğe bağlı)
                setTimeout(() => { formStatus.innerHTML = ""; }, 5000);
            });
        });
    }
}); // DOMContentLoaded SONU