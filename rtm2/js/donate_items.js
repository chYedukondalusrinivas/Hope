document.getElementById('donateItemsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const location = document.getElementById('location').value;

    const nearestOrphanageResponse = await fetch(`/api/orphanages/nearest?location=${location}`);
    if (!nearestOrphanageResponse.ok) {
        alert('Failed to find nearest orphanage.');
        return;
    }
    
    const nearestOrphanage = await nearestOrphanageResponse.json();

    const donationResponse = await fetch('/api/donations/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName, description, quantity, orphanageId: nearestOrphanage.id })
    });

    if (donationResponse.ok) {
        alert('Donation successful!');
        window.location.href = 'dashboard.html';
    } else {
        const errorData = await donationResponse.json();
        alert(`Donation failed: ${errorData.message}`);
    }
});
