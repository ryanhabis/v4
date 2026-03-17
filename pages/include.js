// include.js - V3 Version
function loadComponent(elementId, componentPath) {
    // Get the correct path based on environment
    const fullPath = getFullPath(componentPath);
    
    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${fullPath}`);
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
            // Optional: Show fallback content
            document.getElementById(elementId).innerHTML = '<p>Error loading component</p>';
        });
}

function getFullPath(componentPath) {
    // Check if we're on localhost or file protocol
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.protocol === 'file:';
    
    if (isLocal) {
        // Local development - use relative paths
        // Count directory depth for proper relative path
        const depth = (window.location.pathname.match(/\//g) || []).length - 1;
        let prefix = '';
        for (let i = 0; i < depth; i++) {
            prefix += '../';
        }
        return prefix + componentPath;
    } else {
        // Live server - use absolute paths
        return '/' + componentPath;
    }
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Use clean component names (no leading slash)
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
    
    if (document.getElementById('trust-banner-placeholder')) {
        loadComponent('trust-banner-placeholder', 'components/trust-banner.html');
    }
    
    if (document.getElementById('affiliate-disclosure-placeholder')) {
        loadComponent('affiliate-disclosure-placeholder', 'components/affiliate-disclosure.html');
    }
});