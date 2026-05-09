
const IMG_BASE = '../images/';

const destinations = [
    {
        id: 1,
        name: "Maldives",
        region: "asia",
        image: IMG_BASE + "maldives.jpg",
        description: "Paradise islands with crystal waters and overwater villas",
        highlights: ["Snorkeling", "Water Sports", "Spa Retreats"],
        bestTime: "November - April"
    },
    {
        id: 2,
        name: "Swiss Alps",
        region: "europe",
        image: IMG_BASE + "Swiss Alps.jpg",
        description: "Snow-capped peaks and luxury mountain lodges",
        highlights: ["Skiing", "Hiking", "Alpine Dining"],
        bestTime: "December - March"
    },
    {
        id: 3,
        name: "Dubai",
        region: "middle-east",
        image: IMG_BASE + "Dubai.jpg",
        description: "Ultra-modern luxury in the desert",
        highlights: ["Shopping", "Desert Safari", "Fine Dining"],
        bestTime: "October - April"
    },
    {
        id: 4,
        name: "Bali",
        region: "asia",
        image: IMG_BASE + "Bali.jpg",
        description: "Tropical paradise with ancient temples and rice terraces",
        highlights: ["Yoga", "Temples", "Beach Clubs"],
        bestTime: "April - October"
    },
    {
        id: 5,
        name: "Paris",
        region: "europe",
        image: IMG_BASE + "Paris.jpg",
        description: "The City of Light with iconic landmarks and haute cuisine",
        highlights: ["Museums", "Dining", "Shopping"],
        bestTime: "April - June"
    },
    {
        id: 6,
        name: "Santorini",
        region: "europe",
        image: IMG_BASE + "Santorini.jpg",
        description: "Greek island with white-washed buildings and sunset views",
        highlights: ["Wine Tasting", "Sunsets", "Local Cuisine"],
        bestTime: "May - September"
    },
    {
        id: 7,
        name: "Lebanon",
        region: "middle-east",
        image: IMG_BASE + "lebanon.jpg",
        description: "Mediterranean country with ancient ruins, coastal resorts, and vibrant cuisine",
        highlights: ["History", "Cuisine", "Beaches"],
        bestTime: "April - October"
    },
    {
        id: 8,
        name: "Tunisia",
        region: "africa",
        image: IMG_BASE + "Tunisia.jpg",
        description: "A North African country that blends a 3,000-year history with a stunning Mediterranean landscape",
        highlights: ["History", "Architecture", "Land Scape"],
        bestTime: "September - November"
    }
];

const packages = [
    {
        id: 1,
        name: "Island Escape",
        duration: "7",
        price: "$3,500",
        destination: "Maldives",
        image: IMG_BASE + "maldives2.jpg",
        includes: ["5-star overwater villa", "Daily spa treatments", "Gourmet dining", "Water sports", "Private yacht cruise"],
        rating: "4.9"
    },
    {
        id: 2,
        name: "Alpine Adventure",
        duration: "5",
        price: "$4,000",
        destination: "Swiss Alps",
        image: IMG_BASE + "swissalps2.jpg",
        includes: ["Luxury mountain lodge", "Guided hiking tours", "Michelin-star dining", "Skiing lessons", "Helicopter tour"],
        rating: "4.8"
    },
    {
        id: 3,
        name: "Urban Luxury",
        duration: "4",
        price: "$1,000",
        destination: "Dubai",
        image: IMG_BASE + "dubai2.jpg",
        includes: ["7-star hotel", "Desert safari", "Shopping tour", "Fine dining experiences", "Spa & wellness"],
        rating: "4.7"
    },
    {
        id: 4,
        name: "Tropical Paradise",
        duration: "7",
        price: "$3,000",
        destination: "Bali",
        image: IMG_BASE + "bali2.jpg",
        includes: ["Private villa with pool", "Yoga retreats", "Temple tours", "Traditional massage", "Beach club access"],
        rating: "4.9"
    },
    {
        id: 5,
        name: "Parisian Romance",
        duration: "5",
        price: "$1,500",
        destination: "Paris",
        image: IMG_BASE + "paris2.jpg",
        includes: ["5-star hotel", "Museum tours", "Cooking classes", "Seine river cruise", "Champagne tasting"],
        rating: "4.8"
    },
    {
        id: 6,
        name: "Greek Islands",
        duration: "7",
        price: "$2,500",
        destination: "Santorini",
        image: IMG_BASE + "santorini2.jpg",
        includes: ["Luxury cliffside villa", "Wine tasting tours", "Sunset cruises", "Local cuisine experiences", "Island hopping"],
        rating: "4.9"
    }
];

// ========== STATE ==========
let currentFilter = {
    destinations: 'all',
    packages: 'all'
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function () {
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const btn = document.querySelector('.theme-toggle');
        if (btn) btn.textContent = '☀️';
    }

    // Only render grids on pages that have them
    if (document.getElementById('destinationsGrid')) {
        renderDestinations('all');
    }
    if (document.getElementById('packagesGrid')) {
        renderPackages('all');
        // Show discount popup once per session
        if (!sessionStorage.getItem('discountShown')) {
            sessionStorage.setItem('discountShown', 'true');
            setTimeout(function () {
                const modal = document.getElementById('discountModal');
                if (modal) modal.classList.add('active');
            }, 600);
        }
    }

    setupParallaxScrolling();
    setupScrollAnimations();
});

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    const map = {
        home: 'index.html',
        destinations: 'destinations.html',
        packages: 'packages.html',
        contact: 'contact.html'
    };
    if (map[pageId]) window.location.href = map[pageId];
}

// ========== SIGN IN MODAL ==========
function openSignIn() {
    const modal = document.getElementById('signInModal');
    modal.classList.add('active');
}

function closeSignIn() {
    const modal = document.getElementById('signInModal');
    modal.classList.remove('active');
}

function handleSignIn(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    alert(`✈️ Welcome back, ${name}!\nYou are now signed in as: ${email}`);
    form.reset();
    closeSignIn();
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('signInModal');
    if (event.target === modal) {
        closeSignIn();
    }
});

// ========== AGE VERIFICATION ==========
function verifyAge(isAdult) {
    const modal = document.getElementById('ageModal');
    if (isAdult) {
        modal.classList.remove('active');
    } else {
        alert('Sorry, you must be 18 or older to access this site.');
        window.location.href = 'https://www.google.com';
    }
}

// ========== DARK / LIGHT MODE ==========
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = isDark ? '🔆' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ========== DISCOUNT MODAL ==========
function closeDiscount() {
    document.getElementById('discountModal').classList.remove('active');
}

// ========== DESTINATIONS RENDERING ==========
function renderDestinations(filter) {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;
    const filtered = filter === 'all'
        ? destinations
        : destinations.filter(d => d.region === filter);

    grid.innerHTML = filtered.map((dest, idx) => `
        <div class="destination-full-card" style="animation-delay: ${idx * 0.1}s">
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.description}</p>
            <div class="highlights">
                ${dest.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
            </div>
            <p class="best-time">Best Time: ${dest.bestTime}</p>
        </div>
    `).join('');
    currentFilter.destinations = filter;
}

function filterDestinations(filter) {
    document.querySelectorAll('.filter-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderDestinations(filter);
}

// ========== PACKAGES RENDERING ==========
function renderPackages(filter) {
    const grid = document.getElementById('packagesGrid');
    if (!grid) return;
    const filtered = filter === 'all'
        ? packages
        : packages.filter(p => p.duration === filter);

    grid.innerHTML = filtered.map((pkg, idx) => `
        <div class="package-card" style="animation-delay: ${idx * 0.1}s">
            <div class="package-card-image">
                <img src="${pkg.image}" alt="${pkg.name}">
                <div class="package-duration">${pkg.duration} Days</div>
                <div class="package-rating">⭐ ${pkg.rating}</div>
            </div>
            <div class="package-card-content">
                <p class="package-destination">${pkg.destination}</p>
                <h3>${pkg.name}</h3>
                <div class="package-includes">
                    <p>What's Included:</p>
                    <ul>
                        ${pkg.includes.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                        ${pkg.includes.length > 3 ? `<li>+${pkg.includes.length - 3} more benefits</li>` : ''}
                    </ul>
                </div>
                <div class="package-footer">
                    <div>
                        <p class="package-price">Starting from</p>
                        <p class="package-price-amount">${pkg.price}</p>
                    </div>
                    <button class="btn btn-primary" onclick="alert('Booking feature coming soon!')">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
    currentFilter.packages = filter;
}

function filterPackages(filter) {
    document.querySelectorAll('.filter-section .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderPackages(filter);
}

// ========== FORM SUBMISSIONS ==========
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    alert('Thank you for your message! Our specialists will contact you shortly.');
    form.reset();
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing! A confirmation email has been sent to ${email}`);
    event.target.reset();
}

// ========== PARALLAX SCROLLING ==========
function setupParallaxScrolling() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.destination-card, .package-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSignIn();
    }
});

// ========== SCROLL TO TOP BUTTON ==========
window.addEventListener('scroll', function () {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});

// ========== LAZY LOAD IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== CONSOLE MESSAGE ==========
console.log('%cFIRAS Voyage', 'font-size: 24px; color: #d4af37; font-weight: bold;');
console.log('%cLuxury Travel Agency Website', 'font-size: 14px; color: #1a1a1a;');
console.log('%cDesigned with elegance and precision', 'font-size: 12px; color: #666;');