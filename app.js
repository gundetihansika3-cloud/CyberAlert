document.addEventListener('DOMContentLoaded', () => {

    // --- Load user from session (set by login) ---
    const authData = sessionStorage.getItem('cyberalert_auth');
    const userData = sessionStorage.getItem('cyberalert_user');
    
    if (!authData) {
        window.location.href = 'login.html';
        return;
    }

    const user = userData ? JSON.parse(userData) : { name: 'User', email: 'user@example.com' };
    
    // Dynamic profile update
    const avatarImg = document.querySelector('.avatar');
    const profileName = document.querySelector('.user-profile'); // Add name display if needed
    if (avatarImg) {
        const nameForAvatar = user.name || user.email.split('@')[0];
        avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=0D8ABC&color=fff&size=128&bold=true`;
        avatarImg.alt = user.name || user.email;
        avatarImg.title = user.name || user.email;
    }

    console.log('👤 Logged in as:', user);

    // --- Navigation Logic (SPA Routing) ---
    const navItems = document.querySelectorAll('.nav-item, .tool-card[data-target]');
    const viewSections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    // Title mappings
    const titles = {
        'dashboard': 'Dashboard Overview',
        'reporting': 'Submit a Fraud Report',
        'database': 'Fraud Analytics & Database',
        'investigation': 'Active Investigations',
        'support': 'User Support Hub',
        'admin': 'Law Enforcement Portal',
        'features': 'Smart Tools & Detection'
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            if (item.classList.contains('nav-item')) {
                item.classList.add('active');
            }

            const targetId = item.getAttribute('data-target');
            viewSections.forEach(section => {
                section.classList.remove('active');
                setTimeout(() => {
                    if (!section.classList.contains('active')) {
                        section.classList.add('hidden');
                    }
                }, 10);
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }

            if (titles[targetId]) {
                pageTitle.textContent = titles[targetId];
            }
        });
    });

    // Welcome banner personalization
    const welcomeBanner = document.querySelector('.banner-content h3');
    if (welcomeBanner && user.name) {
        welcomeBanner.textContent = `Welcome back, ${user.name}!`;
    }
});

// --- Feature: Submit Report Mockup ---
function submitReport() {
    const form = document.getElementById('report-form');
    if (form.checkValidity()) {
        Swal.fire({
            title: 'Report Submitted Successfully!',
            text: 'Your case has been securely registered in the CyberAlert Intelligence Hub. A tracking ID will be sent to you.',
            icon: 'success',
            background: '#0F172A',
            color: '#fff',
            confirmButtonColor: '#4F46E5',
            backdrop: `rgba(15, 23, 42, 0.8)`
        }).then(() => {
            form.reset();
            document.querySelector('[data-target="dashboard"]').click();
        });
    } else {
        form.reportValidity();
    }
}

// --- Logout Logic ---
function logout() {
    Swal.fire({
        title: 'Logging Out',
        text: 'Clearing session data...',
        timer: 1000,
        showConfirmButton: false,
        background: '#0F172A',
        color: '#fff',
        didOpen: () => {
            Swal.showLoading();
            sessionStorage.clear(); // Clear all session data
        }
    }).then(() => {
        window.location.href = 'login.html';
    });
}

// ... (rest of functions unchanged - checkLink, analyzePattern, quiz functions remain the same)
function checkLink() { /* unchanged */ }
function analyzePattern() { /* unchanged */ }
const quizQuestions = [ /* unchanged */ ];
function startQuiz() { /* unchanged */ }
function renderQuestion() { /* unchanged */ }
function answerQuestion() { /* unchanged */ }
function showQuizResults() { /* unchanged */ }
