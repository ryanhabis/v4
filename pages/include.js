// include.js - V4 Version
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (componentPath.includes('header.html')) {
                initMobileMenu();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Paths go UP one level (../) since we're in /pages/ folder
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');
    
    if (document.getElementById('trust-banner-placeholder')) {
        loadComponent('trust-banner-placeholder', '/components/trust-banner.html');
    }
    
    if (document.getElementById('affiliate-disclosure-placeholder')) {
        loadComponent('affiliate-disclosure-placeholder', '/components/affiliate-disclosure.html');
    }
});