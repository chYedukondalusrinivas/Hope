document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const orphanageId = userType === 'orphanage' ? document.getElementById('orphanageId').value : null;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, userType, orphanageId })
    });

    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
    }
});

document.querySelectorAll('input[name="userType"]').forEach(input => {
    input.addEventListener('change', () => {
        const orphanageIdDiv = document.getElementById('orphanageIdDiv');
        if (input.value === 'orphanage') {
            orphanageIdDiv.style.display = 'block';
        } else {
            orphanageIdDiv.style.display = 'none';
        }
    });
});
