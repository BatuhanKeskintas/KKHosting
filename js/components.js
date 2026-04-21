/* ============================================
   KK Hosting — Shared Components (Header/Footer)
   ============================================ */

// Get current page for active nav highlighting
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

// Inject Header
function initHeader(transparent = false) {
  const currentPage = getCurrentPage();
  const headerClass = transparent ? 'site-header site-header--transparent' : 'site-header site-header--solid';
  
  const header = document.createElement('header');
  header.className = headerClass;
  header.id = 'site-header';
  
  const navLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'short-term.html', label: 'Short-Term' },
    { href: 'long-term.html', label: 'Long-Term' },
    { href: 'list-property.html', label: 'List Property' },
    { href: 'about.html', label: 'About' },
  ];

  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="header-logo">
        <img src="public/images/logo/logo.png" alt="KK Hosting" />
      </a>
      <nav class="nav-links" id="nav-links">
        ${navLinks.map(link => `
          <a href="${link.href}" class="${currentPage === link.href ? 'active' : ''}">${link.label}</a>
        `).join('')}
        <a href="contact.html" class="btn btn--gold btn--sm nav-cta">Request a Stay</a>
      </nav>
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-nav">
      ${navLinks.map(link => `
        <a href="${link.href}" class="${currentPage === link.href ? 'active' : ''}">${link.label}</a>
      `).join('')}
      <a href="contact.html" class="btn btn--gold" style="margin-top: 1rem;">Request a Stay</a>
    </nav>
  `;

  document.body.prepend(header);

  // Add page-home class for home-specific styling
  if (transparent) {
    document.body.classList.add('page-home');
  }

  // Mobile toggle
  const toggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Header scroll effect
  if (transparent) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// Inject Footer
function initFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="public/images/logo/logo.png" alt="KK Hosting" />
          <p>Premium hospitality and property management in Warsaw. Hotel comfort with home privacy — curated stays for discerning guests.</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="short-term.html">Short-Term Rentals</a>
          <a href="long-term.html">Long-Term Stays</a>
          <a href="list-property.html">List Your Property</a>
          <a href="about.html">About Us</a>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="contact.html">Request a Stay</a>
          <a href="list-property.html">Property Management</a>
          <a href="contact.html">Guest Support</a>
          <a href="contact.html">Business Inquiries</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="mailto:info@kkhosting.com">info@kkhosting.com</a>
          <a href="tel:+48000000000">+48 000 000 000</a>
          <a href="https://wa.me/48000000000" target="_blank" rel="noopener">WhatsApp</a>
          <a href="#">Warsaw, Poland</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} KK Hosting. All rights reserved. Premium hospitality in Warsaw.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}
