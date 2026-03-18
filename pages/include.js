// include.js - Simple Version
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (componentPath.includes('header.html')) {
                initMobileMenu();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
    
    if (document.getElementById('trust-banner-placeholder')) {
        loadComponent('trust-banner-placeholder', 'components/trust-banner.html');
    }
    
    if (document.getElementById('affiliate-disclosure-placeholder')) {
        loadComponent('affiliate-disclosure-placeholder', 'components/affiliate-disclosure.html');
    }
});