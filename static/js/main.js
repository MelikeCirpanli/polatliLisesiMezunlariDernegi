// --- MOBİL MENÜ SCRİPTİ ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}
navSlide();

// --- HAKKIMIZDA TAB SCRİPTİ ---
const tabs = document.querySelectorAll('.tab-btn');
const allContent = document.querySelectorAll('.tab-content');

if (tabs.length > 0) {
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // Aktif tab sınıfını hepsinden kaldır
            tabs.forEach(t => t.classList.remove('active'));
            // Tıklanana ekle
            tab.classList.add('active');

            // Tüm içerikleri gizle
            allContent.forEach(content => content.classList.remove('active-content'));
            
            // Hedef içeriği göster
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active-content');
        });
    });
}

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Mobilde tıklandığında menüyü kapat
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.toggle('toggle');
                    // Link animasyonlarını sıfırla
                    const navLinks = document.querySelectorAll('.nav-links li');
                    navLinks.forEach((link) => {
                            link.style.animation = '';
                    });
                }
            }
        }
    });
});