document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch('/api/requests', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert('Failed to fetch requests.');
        return;
    }

    const requests = await response.json();
    const requestsContainer = document.getElementById('requestsContainer');

    requests.forEach(request => {
        const requestElement = document.createElement('div');
        requestElement.classList.add('request');
        
        const itemName = document.createElement('h3');
        itemName.textContent = request.itemName;
        requestElement.appendChild(itemName);
        
        const description = document.createElement('p');
        description.textContent = request.description;
        requestElement.appendChild(description);
        
        const quantity = document.createElement('p');
        quantity.textContent = `Quantity: ${request.quantity}`;
        requestElement.appendChild(quantity);
        
        const orphanageName = document.createElement('p');
        orphanageName.textContent = `Orphanage: ${request.orphanageName}`;
        requestElement.appendChild(orphanageName);
        
        const status = document.createElement('p');
        status.textContent = `Status: ${request.status}`;
        requestElement.appendChild(status);
        
        if (request.status === 'Pending') {
            const fulfillButton = document.createElement('button');
            fulfillButton.textContent = 'Fulfill Request';
            fulfillButton.addEventListener('click', async () => {
                const fulfillResponse = await fetch(`/api/requests/${request._id}/fulfill`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (fulfillResponse.ok) {
                    alert('Request fulfilled successfully.');
                    window.location.reload();
                } else {
                    alert('Failed to fulfill request.');
                }
            });
            requestElement.appendChild(fulfillButton);
        }
        
        requestsContainer.appendChild(requestElement);
    });
});
