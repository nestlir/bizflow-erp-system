// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content, .dashboard-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Update active navigation
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            pageContents.forEach(content => {
                content.style.display = 'none';
            });
            
            if (targetPage === 'dashboard') {
                document.getElementById('dashboard').style.display = 'block';
            } else {
                document.getElementById(targetPage).style.display = 'block';
            }
        });
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const currentWidth = sidebar.style.width || getComputedStyle(sidebar).width;
            sidebar.style.width = currentWidth === '260px' || currentWidth === '80px' ? '100%' : '80px';
        });
    }
    
    // Initialize modules
    initializeCharts();
    initializeCalendar();
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        // Implement search functionality
        console.log('Search query:', e.target.value);
    });
    
    // Notification click
    const notifications = document.querySelector('.notifications');
    notifications.addEventListener('click', function() {
        alert('You have 3 new notifications');
    });
});

// Utility functions
const utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};