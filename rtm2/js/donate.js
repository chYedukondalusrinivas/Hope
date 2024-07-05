document.getElementById('donationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvc = document.getElementById('cvc').value;

    // Call your backend API to process the donation
    const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount, cardNumber, expiryDate, cvc })
    });

    if (response.ok) {
        alert('Donation successful!');
    } else {
        alert('Donation failed!');
    }
});
