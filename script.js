/* ===== Default Data ===== */
const DEFAULT_DATA = {
    hero: {
        headline: "MA Digital Ads Agency",
        subheading: "We Turn Clicks Into Customers",
        description: "Helping businesses grow with powerful Facebook & Instagram advertising campaigns.",
        cta1: "Start Project",
        cta2: "View Services",
        image: "banner.png"
    },
    services: [
        { title: "Facebook Ads Management", description: "Generate leads & sales with precision-targeted Facebook advertising campaigns.", icon: "fa-facebook", iconType: "brands" },
        { title: "Instagram Ads Campaigns", description: "Brand growth marketing through visually compelling Instagram ad strategies.", icon: "fa-instagram", iconType: "brands" },
        { title: "Lead Generation", description: "High-quality customer acquisition through optimized lead generation funnels.", icon: "fa-users", iconType: "solid" },
        { title: "Retargeting Ads", description: "Recover lost visitors and convert warm audiences into paying customers.", icon: "fa-bullseye", iconType: "solid" },
        { title: "Brand Awareness", description: "Expand your brand visibility and reach new audiences across Meta platforms.", icon: "fa-bullhorn", iconType: "solid" },
        { title: "Sales Funnel Strategy", description: "Convert visitors into customers with strategically built sales funnels.", icon: "fa-chart-line", iconType: "solid" }
    ],
    projects: [
        { name: "Real Estate Lead Campaign", description: "Generated 500+ qualified leads for a real estate firm in Lahore.", result: "340%", image: "realestate.jpg" },
        { name: "Ecommerce Sales Campaign", description: "Scaled an online store from $1K to $15K monthly revenue.", result: "1400%", image: "ecommerce.jpg" },
        { name: "Local Business Promotion", description: "Increased foot traffic by 200% for a restaurant chain in Multan.", result: "200%", image: "local.jpg" }
    ],
    testimonials: [
        { name: "Ahmed Khan", review: "MA Digital completely transformed our Facebook ads. We went from wasting money to getting consistent leads every day. Highly recommended!", image: "client1.jpg" },
        { name: "Sarah Malik", review: "Their Instagram campaigns are incredible. Our brand visibility increased by 300% in just 2 months. The team is professional and responsive.", image: "client2.jpg" },
        { name: "Usman Ali", review: "Best investment we made for our ecommerce store. Revenue tripled in 90 days. The ROI optimization is next level.", image: "client3.jpg" },
        { name: "Fatima Noor", review: "Very professional team. They understood our goals and delivered beyond expectations. Our lead cost dropped by 60%.", image: "client4.jpg" }
    ],
    settings: {
        logoText: "MA Digital",
        email: "mahsan396794752@gmail.com",
        phone: "+92 321 3548485",
        location: "Multan, Punjab, Pakistan",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/923213548485",
        instagram: "https://instagram.com"
    }
};

/* ===== Image Path Resolver ===== */
function resolveImagePath(image, defaultFolder) {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:') || image.startsWith('/') || image.startsWith('./') || image.startsWith('../')) {
        return image;
    }
    return defaultFolder + image;
}

/* ===== Data Manager ===== */
function getData() {
    try {
        const stored = localStorage.getItem('ma_digital_data');
        if (stored) {
            const parsed = JSON.parse(stored);
            
            // Migrate old settings/WhatsApp number to new requested default (+92 321 3548485)
            if (parsed.settings) {
                if (parsed.settings.phone === "+92 329 6794752") parsed.settings.phone = "+92 321 3548485";
                if (parsed.settings.whatsapp === "https://wa.me/923296794752") parsed.settings.whatsapp = "https://wa.me/923213548485";
            }

            // Migrate old hero image to banner.png
            if (parsed.hero) {
                if (parsed.hero.image === "hero.jpg" || parsed.hero.image === "hero.png") {
                    parsed.hero.image = "banner.png";
                }
            }
            
            return { ...DEFAULT_DATA, ...parsed };
        }
    } catch(e) {}
    return { ...DEFAULT_DATA };
}

function saveData(data) {
    localStorage.setItem('ma_digital_data', JSON.stringify(data));
}

/* ===== Initialize ===== */
document.addEventListener('DOMContentLoaded', () => {
    const data = getData();

    // Loading screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s';
            setTimeout(() => loader.remove(), 500);
        }, 800);
    });

    // Render hero
    const hero = data.hero;
    if (document.getElementById('heroHeadlineText')) {
        document.getElementById('heroHeadlineText').textContent = hero.headline;
    }
    document.getElementById('heroSubheading').textContent = hero.subheading;
    document.getElementById('heroDescription').textContent = hero.description;
    document.getElementById('heroCta1').querySelector('span').textContent = hero.cta1;
    document.getElementById('heroCta2').querySelector('span').textContent = hero.cta2;
    document.getElementById('navLogo').textContent = data.settings.logoText;

    // Render Hero Image dynamically
    const heroImgEl = document.getElementById('heroImage');
    if (heroImgEl) {
        const resolvedSrc = resolveImagePath(hero.image || 'banner.png', 'images/');
        if (heroImgEl.tagName === 'IMG') {
            heroImgEl.src = resolvedSrc;
        } else {
            heroImgEl.style.backgroundImage = "url('" + resolvedSrc + "')";
        }
    }

    // Dynamic social & contact links from settings
    const settings = data.settings;
    const waUrl = settings.whatsapp || 'https://wa.me/923213548485';
    let finalWaUrl = waUrl;
    if (!waUrl.startsWith('http')) {
        const cleanNum = waUrl.replace(/[^0-9]/g, '');
        finalWaUrl = `https://wa.me/${cleanNum}`;
    }

    // Dynamic WhatsApp updates
    if (document.getElementById('navGetQuote')) document.getElementById('navGetQuote').href = finalWaUrl;
    if (document.getElementById('mobileGetQuote')) document.getElementById('mobileGetQuote').href = finalWaUrl;
    if (document.getElementById('whatsappFloat')) document.getElementById('whatsappFloat').href = finalWaUrl + "?text=Hi!%20I'm%20interested%20in%20your%20digital%20marketing%20services.";
    if (document.getElementById('starterWhatsApp')) document.getElementById('starterWhatsApp').href = finalWaUrl + "?text=Hi!%20I'm%20interested%20in%20the%20Starter%20Plan.";
    if (document.getElementById('professionalWhatsApp')) document.getElementById('professionalWhatsApp').href = finalWaUrl + "?text=Hi!%20I'm%20interested%20in%20the%20Professional%20Plan.";
    if (document.getElementById('enterpriseWhatsApp')) document.getElementById('enterpriseWhatsApp').href = finalWaUrl + "?text=Hi!%20I'm%20interested%20in%20the%20Enterprise%20Plan.";
    if (document.getElementById('contactWhatsApp')) document.getElementById('contactWhatsApp').href = finalWaUrl;

    // Contact details updates
    if (document.getElementById('contactEmail')) {
        document.getElementById('contactEmail').textContent = settings.email;
        document.getElementById('contactEmail').href = `mailto:${settings.email}`;
    }
    if (document.getElementById('contactPhone')) {
        document.getElementById('contactPhone').textContent = settings.phone;
        document.getElementById('contactPhone').href = `tel:${settings.phone.replace(/[^0-9+]/g, '')}`;
    }
    if (document.getElementById('contactLocation')) {
        document.getElementById('contactLocation').textContent = settings.location;
    }



    // Render services
    renderServices(data.services);

    // Render projects
    renderProjects(data.projects);

    // Render testimonials
    renderTestimonials(data.testimonials);

    // Render footer socials
    renderSocials(data.settings);

    // Init all features
    initScrollProgress();
    initCursorGlow();
    initScrollReveal();
    initCounters();
    initTestimonialSlider();
    initMobileMenu();
    initSmoothScroll();
    initNavScroll();
    initContactForm();
    initLazyLoad();
});



/* ===== Render Services ===== */
function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map((s, i) => `
        <div class="service-card glass-card p-8 rounded-2xl reveal-up" style="animation-delay:${i * 0.1}s">
            <div class="service-icon mb-5">
                <i class="fa-${s.iconType || 'solid'} ${s.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">${s.title}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">${s.description}</p>
        </div>
    `).join('');
    // Re-init scroll reveal for new elements
    setTimeout(initScrollReveal, 100);
}

/* ===== Render Projects ===== */
function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!projects.length) {
        grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-12">No projects yet. Add some from the admin panel.</p>';
        return;
    }
    grid.innerHTML = projects.map((p, i) => `
        <div class="project-card reveal-up" style="animation-delay:${i * 0.1}s">
            <div class="relative h-72 overflow-hidden">
                <img src="${resolveImagePath(p.image, 'images/projects/')}" alt="${p.name}" class="w-full h-full object-cover" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <div class="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 items-center justify-center" style="display:none"><i class="fa-solid fa-image text-4xl text-white/20"></i></div>
                <div class="project-badge">+${p.result}</div>
                <div class="project-overlay">
                    <h3 class="text-lg font-bold mb-1">${p.name}</h3>
                    <p class="text-gray-400 text-sm">${p.description}</p>
                </div>
            </div>
        </div>
    `).join('');
    setTimeout(initScrollReveal, 100);
}

/* ===== Render Testimonials ===== */
let currentSlide = 0;
let totalSlides = 0;
let autoSlideInterval;

function renderTestimonials(testimonials) {
    const slider = document.getElementById('testimonialSlider');
    if (!testimonials.length) {
        slider.innerHTML = '<p class="text-gray-500 text-center py-12 w-full">No testimonials yet.</p>';
        return;
    }
    slider.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="glass-card p-8 rounded-2xl h-full flex flex-col">
                <div class="flex items-center gap-1 mb-4">
                    ${'<i class="fa-solid fa-star text-yellow-400 text-sm"></i>'.repeat(5)}
                </div>
                <p class="text-gray-300 text-sm leading-relaxed flex-1 mb-6">"${t.review}"</p>
                <div class="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div class="w-11 h-11 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-sm font-bold overflow-hidden">
                        <img src="${resolveImagePath(t.image, 'images/clients/')}" alt="${t.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentElement.textContent='${t.name.charAt(0)}';">
                    </div>
                    <div>
                        <div class="font-semibold text-sm">${t.name}</div>
                        <div class="text-xs text-gray-500">Verified Client</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    totalSlides = testimonials.length;
    updateDots();
    startAutoSlide();
}

function initTestimonialSlider() {
    document.getElementById('prevTestimonial').addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlide();
    });
    document.getElementById('nextTestimonial').addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlide();
    });
}

function goToSlide(index) {
    const slider = document.getElementById('testimonialSlider');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const perView = isMobile ? 1 : isTablet ? 2 : 3;
    const maxSlide = Math.max(0, totalSlides - perView);

    currentSlide = Math.max(0, Math.min(index, maxSlide));
    const offset = currentSlide * (100 / perView);
    slider.style.transform = `translateX(-${offset}%)`;
    updateDots();
}

function updateDots() {
    const dotsContainer = document.getElementById('testimonialDots');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const perView = isMobile ? 1 : isTablet ? 2 : 3;
    const dotsCount = Math.max(1, totalSlides - perView + 1);

    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === currentSlide ? 'active' : ''}`;
        dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
        dotsContainer.appendChild(dot);
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        const perView = isMobile ? 1 : isTablet ? 2 : 3;
        const maxSlide = Math.max(0, totalSlides - perView);
        goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

window.addEventListener('resize', () => { updateDots(); goToSlide(currentSlide); });

/* ===== Render Socials ===== */
function renderSocials(settings) {
    const container = document.getElementById('footerSocials');
    const links = [
        { url: settings.facebook, icon: 'fa-facebook-f', iconType: 'brands' },
        { url: settings.linkedin, icon: 'fa-linkedin-in', iconType: 'brands' },
        { url: settings.whatsapp, icon: 'fa-whatsapp', iconType: 'brands' },
        { url: settings.instagram, icon: 'fa-instagram', iconType: 'brands' }
    ];
    container.innerHTML = links.map(l => `
        <a href="${l.url}" target="_blank" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300">
            <i class="fa-${l.iconType} ${l.icon} text-sm"></i>
        </a>
    `).join('');
}

/* ===== Scroll Progress ===== */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    });
}

/* ===== Cursor Glow ===== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                const ms = parseFloat(delay) * 1000;
                setTimeout(() => entry.target.classList.add('revealed'), ms);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        if (!el.classList.contains('revealed')) observer.observe(el);
    });
}

/* ===== Animated Counters ===== */
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    let isOpen = false;

    btn.addEventListener('click', () => {
        isOpen = !isOpen;
        menu.classList.toggle('hidden', !isOpen);
        btn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* ===== Nav Scroll ===== */
function initNavScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scrolled state
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active section
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

/* ===== Contact Form ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('submitBtn');

    form.addEventListener('submit', e => {
        e.preventDefault();
        btn.classList.add('sending');

        // Simulate send (in production, connect to Formspree/EmailJS)
        setTimeout(() => {
            btn.classList.remove('sending');
            form.reset();
            showToast('Message sent successfully! We\'ll get back to you soon.');
        }, 2000);
    });
}

/* ===== Toast ===== */
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ===== Lazy Load ===== */
function initLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) img.classList.add('loaded');
        else observer.observe(img);
    });
}