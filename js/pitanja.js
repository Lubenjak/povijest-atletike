function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('contactForm').reset();
    document.getElementById('formMessage').textContent = '';
    document.getElementById('formMessage').className = 'form-message';
}

async function sendFormspree(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-button');
    const formMessage = document.getElementById('formMessage');
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Slanje...';
    
    try {
        const response = await fetch('https://formspree.io/f/xaqlpjao', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formMessage.textContent = '✅ Hvala na pitanju! Odgovorit ću Vam što prije.';
            formMessage.className = 'form-message success';
            form.reset();
            
            setTimeout(() => {
                closeContactForm();
            }, 3000);
        } else {
            throw new Error('Greška pri slanju');
        }
    } catch (error) {
        formMessage.textContent = '❌ Greška pri slanju. Molimo pokušajte ponovo.';
        formMessage.className = 'form-message error';
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Pošalji pitanje';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactForm();
    }
}
