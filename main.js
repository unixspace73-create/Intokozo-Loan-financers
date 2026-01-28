// ===============================================
// Intokozo Financial Services - Main JavaScript
// ===============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.getElementById('navMenu').classList.remove('active');
            }
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Loan Calculator
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    
    if (!loanAmount || loanAmount < 100) {
        alert('Please enter a valid loan amount (minimum R100)');
        return;
    }
    
    const interestRate = 0.40; // 40% interest
    const interest = loanAmount * interestRate;
    const totalRepayment = loanAmount + interest;
    
    // Update results
    document.getElementById('resultLoan').textContent = `R${loanAmount.toFixed(2)}`;
    document.getElementById('resultInterest').textContent = `R${interest.toFixed(2)}`;
    document.getElementById('resultTotal').textContent = `R${totalRepayment.toFixed(2)}`;
    
    // Show results
    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.classList.add('show');
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Auto-calculate when amount changes
document.getElementById('loanAmount').addEventListener('input', (e) => {
    const amount = parseFloat(e.target.value);
    if (amount >= 100) {
        calculateLoan();
    }
});

// Requirements Tabs
function showRequirements(type) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    if (type === 'regular') {
        document.getElementById('regular-requirements').classList.add('active');
        event.target.classList.add('active');
    } else if (type === 'sassa') {
        document.getElementById('sassa-requirements').classList.add('active');
        event.target.classList.add('active');
    }
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Hello Intokozo Financial Services,

*Contact Form Submission*

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Please get back to me at your earliest convenience.`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/27?text=${encodedMessage}`;
    
    // Show confirmation
    if (confirm('Your message will be sent via WhatsApp. Click OK to continue.')) {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Thank you for your message! You will be redirected to WhatsApp to complete the submission.');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.product-card, .step-card, .stat-card, .faq-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Auto-calculate initial loan
    calculateLoan();
});

// Prevent form double submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.disabled = false;
            }, 3000);
        }
    });
});

// Phone number formatting (South African format)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits for South African numbers
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    // Format as XXX XXX XXXX
    if (value.length > 6) {
        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
    } else if (value.length > 3) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    }
    
    e.target.value = value;
});

// Loan amount validation
document.getElementById('loanAmount').addEventListener('blur', function() {
    const value = parseFloat(this.value);
    if (value < 100) {
        alert('Minimum loan amount is R100');
        this.value = 100;
        calculateLoan();
    }
});

// Add loading state for calculator
const originalCalculate = calculateLoan;
calculateLoan = function() {
    const btn = document.querySelector('.calculator-form .btn-primary');
    const originalText = btn.textContent;
    
    btn.textContent = 'Calculating...';
    btn.disabled = true;
    
    setTimeout(() => {
        originalCalculate();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 300);
};

// Print functionality for loan calculation results
function printLoanCalculation() {
    const loanAmount = document.getElementById('resultLoan').textContent;
    const interest = document.getElementById('resultInterest').textContent;
    const total = document.getElementById('resultTotal').textContent;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Loan Calculator Results - Intokozo Financial Services</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    color: #FF6B35;
                    text-align: center;
                }
                .result-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                }
                .total {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #FF6B35;
                    border-top: 2px solid #FF6B35;
                    margin-top: 10px;
                }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    color: #666;
                    font-size: 0.9rem;
                }
            </style>
        </head>
        <body>
            <h1>Intokozo Financial Services</h1>
            <h2>Loan Calculator Results</h2>
            <div class="result-item">
                <span>Loan Amount:</span>
                <span>${loanAmount}</span>
            </div>
            <div class="result-item">
                <span>Interest (40%):</span>
                <span>${interest}</span>
            </div>
            <div class="result-item total">
                <span>Total Repayment:</span>
                <span>${total}</span>
            </div>
            <p style="text-align: center; margin-top: 20px; font-style: italic;">*One-time payment</p>
            <div class="footer">
                <p>670 Tax Rank Street, Kgapane</p>
                <p>Email: intokozofinancialservices@gmail.com</p>
                <p>Monday: 08:00 - 17:30</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Add keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach((question, index) => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFaq(question);
        }
    });
});

// Console welcome message
console.log('%cWelcome to Intokozo Financial Services', 'color: #FF6B35; font-size: 24px; font-weight: bold;');
console.log('%cYour trusted partner in financial solutions', 'color: #2C3E50; font-size: 14px;');
console.log('%cWebsite: Professional, Responsive, & Secure', 'color: #27AE60; font-size: 12px;');
