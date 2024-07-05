document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const form=document.getElementById("loginForm");

form.onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // You can perform additional actions here before redirecting (optional)
  
    window.location.href = "orphanage.html";  // Redirect to target page
  
    return false;
  }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
