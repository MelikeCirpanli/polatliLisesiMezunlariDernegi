// --- MOBİL MENÜ SCRİPTİ ---
        const navSlide = () => {
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('.nav-links');
            const navLinks = document.querySelectorAll('.nav-links li');

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

        navSlide();

        // --- HAKKIMIZDA TAB SCRİPTİ ---
        const tabs = document.querySelectorAll('.tab-btn');
        const allContent = document.querySelectorAll('.tab-content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                // Aktif tab sınıfını hepsinden kaldır
                tabs.forEach(tab => {tab.classList.remove('active')});
                // Tıklanana ekle
                tab.classList.add('active');

                // Tüm içerikleri gizle
                allContent.forEach(content => {content.classList.remove('active-content')});
                
                // Hedef içeriği göster
                const target = tab.getAttribute('data-target');
                document.getElementById(target).classList.add('active-content');
            });
        });

        // --- SMOOTH SCROLL (Eski tarayıcılar için JS desteği, modernler için CSS'de scroll-behavior: smooth yeterli olabilir ama JS daha garanti) ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                 // Mobilde tıklandığında menüyü kapat
                 if(window.innerWidth <= 768) {
                     document.querySelector('.nav-links').classList.remove('nav-active');
                 }
            });
        });