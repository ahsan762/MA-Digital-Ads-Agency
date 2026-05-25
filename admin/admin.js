/* ===== Auth ===== */
const CREDS = { username: 'admin', password: '12345' };

document.addEventListener('DOMContentLoaded', () => {
    // Check session
    if (sessionStorage.getItem('ma_admin_auth') === 'true') {
        showDashboard();
    }

    // Login
    document.getElementById('loginForm').addEventListener('submit', e => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;
        if (user === CREDS.username && pass === CREDS.password) {
            sessionStorage.setItem('ma_admin_auth', 'true');
            showDashboard();
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('ma_admin_auth');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('sidebarOverlay').classList.toggle('hidden');
    });
    document.getElementById('sidebarOverlay').addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.add('hidden');
    });

    // Tab navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
            // Close mobile sidebar
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.add('hidden');
        });
    });

    // Modal form
    document.getElementById('modalForm').addEventListener('submit', handleModalSubmit);

    // Hero form
    document.getElementById('heroForm').addEventListener('submit', handleHeroSave);

    // Settings form
    document.getElementById('settingsForm').addEventListener('submit', handleSettingsSave);
});

/* ===== Show Dashboard ===== */
function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadAllData();
}

/* ===== Image Path Resolver ===== */
function resolveImagePath(image, defaultFolder) {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:') || image.startsWith('/') || image.startsWith('./') || image.startsWith('../')) {
        return image;
    }
    return defaultFolder + image;
}

/* ===== Data Manager ===== */
const DEFAULT_DATA = {
    hero: { headline: "MA Digital Ads Agency", subheading: "We Turn Clicks Into Customers", description: "Helping businesses grow with powerful Facebook & Instagram advertising campaigns.", cta1: "Start Project", cta2: "View Services", image: "banner.png" },
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
    settings: { logoText: "MA Digital", email: "mahsan396794752@gmail.com", phone: "+92 321 3548485", location: "Multan, Punjab, Pakistan", facebook: "https://facebook.com", linkedin: "https://linkedin.com", whatsapp: "https://wa.me/923213548485", instagram: "https://instagram.com" }
};

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
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
    localStorage.setItem('ma_digital_data', JSON.stringify(data));
}

/* ===== Load All Data Into Forms ===== */
function loadAllData() {
    const data = getData();

    // Projects list
    renderProjectsList(data.projects);

    // Testimonials list
    renderTestimonialsList(data.testimonials);

    // Services list
    renderServicesList(data.services);

    // Hero form
    document.getElementById('heroHeadline').value = data.hero.headline;
    document.getElementById('heroSubheading').value = data.hero.subheading;
    document.getElementById('heroDescription').value = data.hero.description;
    document.getElementById('heroCta1').value = data.hero.cta1;
    document.getElementById('heroCta2').value = data.hero.cta2;
    document.getElementById('heroImageInput').value = data.hero.image || 'banner.png';

    // Settings form
    document.getElementById('setLogo').value = data.settings.logoText;
    document.getElementById('setEmail').value = data.settings.email;
    document.getElementById('setPhone').value = data.settings.phone;
    document.getElementById('setLocation').value = data.settings.location;
    document.getElementById('setFacebook').value = data.settings.facebook || '';
    document.getElementById('setLinkedin').value = data.settings.linkedin || '';
    document.getElementById('setWhatsapp').value = data.settings.whatsapp || '';
    document.getElementById('setInstagram').value = data.settings.instagram || '';
}

/* ===== Render Lists ===== */
function renderProjectsList(projects) {
    const el = document.getElementById('projectsList');
    if (!projects.length) { el.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No projects added yet.</p>'; return; }
    el.innerHTML = projects.map((p, i) => `
        <div class="admin-list-item">
            <div class="flex items-center gap-4 min-w-0">
                <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-gray-800 border border-white/5">
                    <img src="${resolveImagePath(p.image, '../images/projects/')}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                    <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center" style="display:none">
                        <i class="fa-solid fa-image text-blue-400 text-xs"></i>
                    </div>
                </div>
                <div class="min-w-0">
                    <div class="font-semibold text-sm truncate">${p.name}</div>
                    <div class="text-xs text-gray-500 truncate">${p.description}</div>
                </div>
            </div>
            <div class="flex items-center gap-4 shrink-0">
                <span class="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+${p.result}</span>
                <div class="admin-list-actions">
                    <button class="edit-btn" onclick="editItem('project', ${i})"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn" onclick="deleteItem('project', ${i})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonialsList(testimonials) {
    const el = document.getElementById('testimonialsList');
    if (!testimonials.length) { el.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No testimonials added yet.</p>'; return; }
    el.innerHTML = testimonials.map((t, i) => `
        <div class="admin-list-item">
            <div class="flex items-center gap-4 min-w-0">
                <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gray-800 text-sm font-bold text-blue-400 border border-white/5">
                    <img src="${resolveImagePath(t.image, '../images/clients/')}" alt="${t.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                    <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center" style="display:none">
                        ${t.name.charAt(0)}
                    </div>
                </div>
                <div class="min-w-0">
                    <div class="font-semibold text-sm truncate">${t.name}</div>
                    <div class="text-xs text-gray-500 truncate">${t.review}</div>
                </div>
            </div>
            <div class="admin-list-actions">
                <button class="edit-btn" onclick="editItem('testimonial', ${i})"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn" onclick="deleteItem('testimonial', ${i})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function renderServicesList(services) {
    const el = document.getElementById('servicesList');
    if (!services.length) { el.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No services added yet.</p>'; return; }
    el.innerHTML = services.map((s, i) => `
        <div class="admin-list-item">
            <div class="flex items-center gap-4 min-w-0">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <i class="fa-${s.iconType || 'solid'} ${s.icon} text-blue-400 text-sm"></i>
                </div>
                <div class="min-w-0">
                    <div class="font-semibold text-sm truncate">${s.title}</div>
                    <div class="text-xs text-gray-500 truncate">${s.description}</div>
                </div>
            </div>
            <div class="admin-list-actions">
                <button class="edit-btn" onclick="editItem('service', ${i})"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn" onclick="deleteItem('service', ${i})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

/* ===== Modal ===== */
function openModal(type, editIndex = -1) {
    const modal = document.getElementById('modal');
    const fields = document.getElementById('modalFields');
    const title = document.getElementById('modalTitle');
    document.getElementById('modalType').value = type;
    document.getElementById('modalEditIndex').value = editIndex;

    const data = getData();

    if (type === 'project') {
        title.textContent = editIndex >= 0 ? 'Edit Project' : 'Add New Project';
        const p = editIndex >= 0 ? data.projects[editIndex] : {};
        fields.innerHTML = `
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Project Name</label><input type="text" class="admin-input" id="m_name" value="${p.name || ''}" required></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Description</label><textarea class="admin-input" id="m_desc" rows="2" required>${p.description || ''}</textarea></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Project Image URL or Filename</label><input type="text" class="admin-input" id="m_image" value="${p.image || ''}" placeholder="e.g. https://images.unsplash.com/... or ecommerce.jpg" required><p class="text-xs text-gray-600 mt-1">Provide a web image URL or a filename placed in /images/projects/ folder</p></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Campaign Result %</label><input type="text" class="admin-input" id="m_result" value="${p.result || ''}" placeholder="e.g. 340%" required></div>
        `;
    } else if (type === 'testimonial') {
        title.textContent = editIndex >= 0 ? 'Edit Testimonial' : 'Add New Testimonial';
        const t = editIndex >= 0 ? data.testimonials[editIndex] : {};
        fields.innerHTML = `
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Client Name</label><input type="text" class="admin-input" id="m_name" value="${t.name || ''}" required></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Review</label><textarea class="admin-input" id="m_review" rows="3" required>${t.review || ''}</textarea></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Client Image URL or Filename</label><input type="text" class="admin-input" id="m_image" value="${t.image || ''}" placeholder="e.g. https://images.unsplash.com/... or client1.jpg" required><p class="text-xs text-gray-600 mt-1">Provide a web image URL or a filename placed in /images/clients/ folder</p></div>
        `;
    } else if (type === 'service') {
        title.textContent = editIndex >= 0 ? 'Edit Service' : 'Add New Service';
        const s = editIndex >= 0 ? data.services[editIndex] : {};
        fields.innerHTML = `
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Service Title</label><input type="text" class="admin-input" id="m_title" value="${s.title || ''}" required></div>
            <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Description</label><textarea class="admin-input" id="m_desc" rows="2" required>${s.description || ''}</textarea></div>
            <div class="grid grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Icon Class</label><input type="text" class="admin-input" id="m_icon" value="${s.icon || ''}" placeholder="fa-chart-line" required></div>
                <div><label class="block text-sm font-medium text-gray-300 mb-1.5">Icon Type</label><select class="admin-input" id="m_iconType"><option value="solid" ${s.iconType !== 'brands' ? 'selected' : ''}>Solid</option><option value="brands" ${s.iconType === 'brands' ? 'selected' : ''}>Brands</option></select></div>
            </div>
            <p class="text-xs text-gray-600">Find icons at <a href="https://fontawesome.com/icons" target="_blank" class="text-blue-400 hover:underline">fontawesome.com/icons</a></p>
        `;
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.remove('hidden'), 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    setTimeout(() => modal.style.display = 'none', 300);
}

/* ===== Handle Modal Submit ===== */
function handleModalSubmit(e) {
    e.preventDefault();
    const type = document.getElementById('modalType').value;
    const editIndex = parseInt(document.getElementById('modalEditIndex').value);
    const data = getData();

    if (type === 'project') {
        const item = {
            name: document.getElementById('m_name').value,
            description: document.getElementById('m_desc').value,
            image: document.getElementById('m_image').value,
            result: document.getElementById('m_result').value
        };
        if (editIndex >= 0) data.projects[editIndex] = item;
        else data.projects.push(item);
        renderProjectsList(data.projects);
    } else if (type === 'testimonial') {
        const item = {
            name: document.getElementById('m_name').value,
            review: document.getElementById('m_review').value,
            image: document.getElementById('m_image').value
        };
        if (editIndex >= 0) data.testimonials[editIndex] = item;
        else data.testimonials.push(item);
        renderTestimonialsList(data.testimonials);
    } else if (type === 'service') {
        const item = {
            title: document.getElementById('m_title').value,
            description: document.getElementById('m_desc').value,
            icon: document.getElementById('m_icon').value,
            iconType: document.getElementById('m_iconType').value
        };
        if (editIndex >= 0) data.services[editIndex] = item;
        else data.services.push(item);
        renderServicesList(data.services);
    }

    saveData(data);
    closeModal();
    showAdminToast(editIndex >= 0 ? 'Updated successfully!' : 'Added successfully!');
}

/* ===== Edit Item ===== */
function editItem(type, index) {
    openModal(type, index);
}

/* ===== Delete Item ===== */
function deleteItem(type, index) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const data = getData();

    if (type === 'project') {
        data.projects.splice(index, 1);
        renderProjectsList(data.projects);
    } else if (type === 'testimonial') {
        data.testimonials.splice(index, 1);
        renderTestimonialsList(data.testimonials);
    } else if (type === 'service') {
        data.services.splice(index, 1);
        renderServicesList(data.services);
    }

    saveData(data);
    showAdminToast('Deleted successfully!');
}

/* ===== Hero Save ===== */
function handleHeroSave(e) {
    e.preventDefault();
    const data = getData();
    data.hero = {
        headline: document.getElementById('heroHeadline').value,
        subheading: document.getElementById('heroSubheading').value,
        description: document.getElementById('heroDescription').value,
        cta1: document.getElementById('heroCta1').value,
        cta2: document.getElementById('heroCta2').value,
        image: document.getElementById('heroImageInput').value
    };
    saveData(data);
    showAdminToast('Hero text saved!');
}

/* ===== Settings Save ===== */
function handleSettingsSave(e) {
    e.preventDefault();
    const data = getData();
    data.settings = {
        logoText: document.getElementById('setLogo').value,
        email: document.getElementById('setEmail').value,
        phone: document.getElementById('setPhone').value,
        location: document.getElementById('setLocation').value,
        facebook: document.getElementById('setFacebook').value,
        linkedin: document.getElementById('setLinkedin').value,
        whatsapp: document.getElementById('setWhatsapp').value,
        instagram: document.getElementById('setInstagram').value
    };
    saveData(data);
    showAdminToast('Settings saved!');
}

/* ===== Toast ===== */
function showAdminToast(msg) {
    const toast = document.getElementById('adminToast');
    document.getElementById('adminToastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}