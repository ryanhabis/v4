// include.js - V4 Version with Local/Server path handling
function loadComponent(elementId, componentPath) {
    // Auto-detect if running locally
    const isLocal = window.location.protocol === 'file:';
    
    // Adjust path based on environment
    let fullPath = componentPath;
    
    if (isLocal) {
        // Local: Remove leading slash and add '../' since we're in /pages/
        fullPath = '..' + componentPath;
    }
    // On server: keep as-is (/components/header.html)
    
    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${fullPath}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            
            // Initialize specific components
            if (componentPath.includes('header.html')) {
                initMobileMenu();
            }
            // Add CSS files from components if needed
            addComponentStyles(data);
        })
        .catch(error => {
            console.error('Error loading component:', error);
            // Fallback content
            document.getElementById(elementId).innerHTML = `<div style="color: red; padding: 1rem;">Failed to load component</div>`;
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

function addComponentStyles(html) {
    // Extract and add any inline styles from components
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const styles = tempDiv.querySelectorAll('style');
    styles.forEach(style => {
        document.head.appendChild(style.cloneNode(true));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Load components with paths that work both locally and on server
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');
    
    if (document.getElementById('trust-banner-placeholder')) {
        loadComponent('trust-banner-placeholder', '/components/trust-banner.html');
    }
    
    if (document.getElementById('affiliate-disclosure-placeholder')) {
        loadComponent('affiliate-disclosure-placeholder', '/components/affiliate-disclosure.html');
    }
});