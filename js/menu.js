// ===== Menu & Dark Mode =====
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');

    const homeLink = document.getElementById('homeLink');
    const historyLink = document.getElementById('historyLink');
    const backupLink = document.getElementById('backupLink');
    const backupModal = document.getElementById('backupModal');
    const restoreCloseBtn = document.querySelector('#backupModal .closeBackupBtn');

    const homeSection = document.getElementById('home');
    const catatanSection = document.getElementById('catatan');
    const historyEditModal = document.getElementById('historyEditModal');

    function hideAllSections() {
        homeSection.style.display = 'none';
        catatanSection.style.display = 'none';
        if (backupModal) backupModal.style.display = 'none';
        if (historyEditModal) historyEditModal.style.display = 'none';
    }

    // Toggle menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
        document.addEventListener('click', e => {
            if (!navMenu.contains(e.target) && e.target !== menuToggle) navMenu.classList.remove('show');
        });
    }

    // Dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    }

    // Navigation
    if (homeLink) homeLink.addEventListener('click', () => { hideAllSections(); homeSection.style.display = 'block'; });
    if (historyLink) historyLink.addEventListener('click', () => { hideAllSections(); catatanSection.style.display = 'block'; });
    if (backupLink) backupLink.addEventListener('click', () => { hideAllSections(); backupModal.style.display = 'flex'; });
    if (restoreCloseBtn) restoreCloseBtn.addEventListener('click', () => { backupModal.style.display = 'none'; homeSection.style.display = 'block'; });

    // Close modals when clicking outside
    window.addEventListener('click', e => {
        if (e.target === backupModal) { backupModal.style.display = 'none'; homeSection.style.display = 'block'; }
        if (e.target === historyEditModal) historyEditModal.style.display = 'none';
        const formModal = document.getElementById('formModal');
        if (e.target === formModal) formModal.style.display = 'none';
    });
});
