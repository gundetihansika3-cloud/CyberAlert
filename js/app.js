document.addEventListener('DOMContentLoaded', () => {

    // --- Load user from session (set by login) ---
    const authData = sessionStorage.getItem('cyberalert_auth');
    const userData = sessionStorage.getItem('cyberalert_user');
    
    // Only redirect if NOT on the login page
    if (!authData && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }

    if (userData) {
        const user = JSON.parse(userData);
        const avatarImg = document.querySelector('.avatar');
        if (avatarImg) {
            const nameForAvatar = user.name || user.email?.split('@')[0] || 'User';
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=0D8ABC&color=fff&size=128&bold=true`;
        }
        const welcomeBanner = document.querySelector('.banner-content h3');
        if (welcomeBanner && user.name) {
            welcomeBanner.textContent = `Welcome back, ${user.name}!`;
        }
    }

    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item, .tool-card[data-target]');
    const viewSections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            if (item.classList.contains('nav-item')) item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            viewSections.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }
        });
    });
});

// --- Feature: Registration Logic ---
async function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('User registered successfully!');
            window.location.href = 'login.html';
        } else {
            const error = await response.text();
            alert('Registration failed: ' + error);
        }
    } catch (err) {
        console.error('Registration Error:', err);
        alert('An error occurred during registration.');
    }
}

// --- Logout Logic ---
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// --- Mockup Functions ---
function submitReport() {
    alert('Report Submitted Successfully!');
    document.querySelector('[data-target="dashboard"]')?.click();
}
