// --- GALERİ SLIDER SCRİPTİ ---
        const slider = document.getElementById('sliderWrapper');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Butonla kaydırma
        nextBtn.addEventListener('click', () => {
            slider.scrollLeft += 320; // Bir resim genişliği + boşluk kadar kaydır
        });
        prevBtn.addEventListener('click', () => {
            slider.scrollLeft -= 320;
        });

        // Sürükle-Bırak ile kaydırma (Masaüstü için ekstra rahatlık)
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            // Sürüklerken smooth scroll'u kapat ki takılmasın
            slider.style.scrollBehavior = 'auto'; 
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.style.scrollBehavior = 'smooth';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.style.scrollBehavior = 'smooth';
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // *2 ile daha hızlı kaydır
            slider.scrollLeft = scrollLeft - walk;
        });