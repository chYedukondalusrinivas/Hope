document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch('/api/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert('Failed to fetch user data.');
        return;
    }

    const user = await response.json();
    const donorDashboard = document.getElementById('donorDashboard');
    const orphanageDashboard = document.getElementById('orphanageDashboard');

    if (user.userType === 'donor') {
        donorDashboard.style.display = 'block';
        document.getElementById('donorName').textContent = user.name;
        // Fetch and display donation summary, pending requests, donation history
    } else if (user.userType === 'orphanage') {
        orphanageDashboard.style.display = 'block';
        document.getElementById('orphanageName').textContent = user.name;
        // Fetch and display request summary, new request form, pending and fulfilled requests
    }
});
