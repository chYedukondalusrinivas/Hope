// General JavaScript for handling authentication and other common functionalities
document.addEventListener('DOMContentLoaded', () => {
    const authLinks = document.querySelectorAll('.auth-links');
    const logoutLink = document.querySelector('.logout-link');
    const token = localStorage.getItem('token');

    if (token) {
        authLinks.forEach(link => link.style.display = 'none');
        logoutLink.style.display = 'inline-block';
    } else {
        authLinks.forEach(link => link.style.display = 'inline-block');
        logoutLink.style.display = 'none';
    }

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
});
