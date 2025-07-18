// BookNest Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the application
    initializeApp();
    
    function initializeApp() {
        setupSidebarNavigation();
        setupFilterTabs();
        setupBookCardInteractions();
        setupResponsiveFeatures();
        setupSearchFunctionality();
        setupAnimations();
    }
    
    // Sidebar Navigation
    function setupSidebarNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get the category from data attribute
                const category = this.getAttribute('data-category');
                
                // Filter books based on category
                if (category) {
                    filterBooksByCategory(category);
                    
                    // Update filter tabs
                    const filterBtns = document.querySelectorAll('.filter-btn');
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    
                    const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
                    if (targetBtn) {
                        targetBtn.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Filter Tabs Functionality
    function setupFilterTabs() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter books
                filterBooksByCategory(filter);
                
                // Update sidebar navigation
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => link.classList.remove('active'));
                
                if (filter !== 'all') {
                    const targetNavLink = document.querySelector(`.nav-link[data-category="${filter}"]`);
                    if (targetNavLink) {
                        targetNavLink.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Filter Books by Category
    function filterBooksByCategory(category) {
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update visible books count
        updateVisibleBooksCount();
    }
    
    // Update visible books count
    function updateVisibleBooksCount() {
        const visibleBooks = document.querySelectorAll('.book-card[style*="display: block"], .book-card:not([style*="display: none"])');
        const totalBooks = document.querySelectorAll('.book-card');
        
        // You can add a counter display here if needed
        console.log(`Showing ${visibleBooks.length} of ${totalBooks.length} books`);
    }
    
    // Book Card Interactions
    function setupBookCardInteractions() {
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const readBtn = card.querySelector('.btn-read');
            const bookTitle = card.querySelector('.book-title').textContent;
            const bookAuthor = card.querySelector('.book-author').textContent;
            
            // Read button functionality
            if (readBtn) {
                readBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    handleReadBook(bookTitle, bookAuthor);
                });
            }
            
            // Card click functionality
            card.addEventListener('click', function() {
                showBookDetails(this);
            });
            
            // Keyboard navigation
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showBookDetails(this);
                }
            });
        });
    }
    
    // Handle Read Book Action
    function handleReadBook(title, author) {
        // Create a simple modal or notification
        const message = `Opening "${title}" by ${author}...`;
        showNotification(message, 'success');
        
        // Here you would typically redirect to a reading page or open a reader
        console.log(`Reading: ${title} by ${author}`);
    }
    
    // Show Book Details
    function showBookDetails(card) {
        const title = card.querySelector('.book-title').textContent;
        const author = card.querySelector('.book-author').textContent;
        const rating = card.querySelector('.rating-text').textContent;
        const genre = card.querySelector('.genre-tag').textContent;
        
        // Create a simple modal
        const modal = createBookModal(title, author, rating, genre);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
    
    // Create Book Modal
    function createBookModal(title, author, rating, genre) {
        const modal = document.createElement('div');
        modal.className = 'book-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Author:</strong> ${author}</p>
                        <p><strong>Rating:</strong> ${rating}/5</p>
                        <p><strong>Genre:</strong> ${genre}</p>
                        <p><strong>Description:</strong> This is a fantastic book that will captivate readers with its engaging storyline and well-developed characters.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" onclick="handleReadBook('${title}', '${author}')">Read Now</button>
                        <button class="btn-secondary" onclick="addToWishlist('${title}', '${author}')">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const styles = `
            .book-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .book-modal.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h2 {
                margin: 0;
                color: var(--primary-brown);
                font-family: 'Playfair Display', serif;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .modal-body {
                padding: 1.5rem;
                line-height: 1.6;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .btn-primary, .btn-secondary {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .btn-primary {
                background: var(--primary-brown);
                color: white;
            }
            
            .btn-primary:hover {
                background: var(--secondary-brown);
            }
            
            .btn-secondary {
                background: transparent;
                color: var(--primary-brown);
                border: 2px solid var(--primary-brown);
            }
            
            .btn-secondary:hover {
                background: var(--primary-brown);
                color: white;
            }
        `;
        
        // Add styles to head if not already added
        if (!document.querySelector('#modal-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'modal-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(modal);
            }
        });
        
        // Keyboard navigation
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        });
        
        return modal;
    }
    
    // Close Modal
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    // Add to Wishlist
    window.addToWishlist = function(title, author) {
        showNotification(`"${title}" by ${author} added to wishlist!`, 'success');
        // Here you would typically save to local storage or send to server
    };
    
    // Show Notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add notification styles
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            
            .notification.success {
                background: #28a745;
            }
            
            .notification.error {
                background: #dc3545;
            }
            
            .notification.info {
                background: #17a2b8;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Responsive Features
    function setupResponsiveFeatures() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        // Create mobile menu toggle
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Add toggle styles
        const toggleStyles = `
            .mobile-toggle {
                position: fixed;
                top: 1rem;
                left: 1rem;
                background: var(--primary-brown);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 1001;
                display: none;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
            }
            
            .mobile-toggle:hover {
                background: var(--secondary-brown);
                transform: scale(1.1);
            }
            
            @media (max-width: 768px) {
                .mobile-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        `;
        
        // Add toggle styles
        if (!document.querySelector('#toggle-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'toggle-styles';
            styleSheet.textContent = toggleStyles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(mobileToggle);
        
        // Toggle sidebar on mobile
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    // Search Functionality (Basic implementation)
    function setupSearchFunctionality() {
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search books..." class="search-input">
            <i class="fas fa-search search-icon"></i>
        `;
        
        // Add search styles
        const searchStyles = `
            .search-container {
                position: relative;
                margin-bottom: 2rem;
                max-width: 400px;
            }
            
            .search-input {
                width: 100%;
                padding: 0.75rem 1rem 0.75rem 2.5rem;
                border: 2px solid var(--primary-brown);
                border-radius: 25px;
                font-size: 1rem;
                transition: all 0.3s ease;
                background: white;
            }
            
            .search-input:focus {
                outline: none;
                border-color: var(--secondary-brown);
                box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
            }
            
            .search-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--primary-brown);
            }
        `;
        
        // Add search styles
        if (!document.querySelector('#search-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'search-styles';
            styleSheet.textContent = searchStyles;
            document.head.appendChild(styleSheet);
        }
        
        // Insert search container
        const sectionHeader = document.querySelector('.section-header');
        sectionHeader.insertBefore(searchContainer, sectionHeader.firstChild);
        
        // Search functionality
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterBooksBySearch(searchTerm);
        });
    }
    
    // Filter Books by Search
    function filterBooksBySearch(searchTerm) {
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase();
            const author = card.querySelector('.book-author').textContent.toLowerCase();
            const genre = card.querySelector('.genre-tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm) || genre.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Setup Animations
    function setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe book cards
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
        
        // Observe recommended items
        const recommendedItems = document.querySelectorAll('.recommended-item');
        recommendedItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });
    }
    
    // Initialize tooltips
    function initializeTooltips() {
        const bookCards = document.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const tooltip = card.querySelector('.book-tooltip');
            if (tooltip) {
                // Position tooltip properly
                card.addEventListener('mouseenter', () => {
                    const rect = card.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // Check if tooltip would go off-screen
                    if (rect.bottom + 150 > viewportHeight) {
                        tooltip.style.top = 'auto';
                        tooltip.style.bottom = '100%';
                        tooltip.style.marginTop = '0';
                        tooltip.style.marginBottom = '0.5rem';
                    }
                });
            }
        });
    }
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styles for keyboard navigation
    const keyboardStyles = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--light-brown) !important;
            outline-offset: 2px !important;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyboardStyles;
    document.head.appendChild(styleSheet);
    
    console.log('BookNest application initialized successfully!');
});

// Global functions for modal actions
window.handleReadBook = function(title, author) {
    const message = `Opening "${title}" by ${author}...`;
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            background: #28a745;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Close any open modals
    const modals = document.querySelectorAll('.book-modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
};
