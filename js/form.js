// LOADER
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1200);
}


// NAVBAR
window.addEventListener('scroll', () => {
    let nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// REVEAL
function reveal() {
    let reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        let top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);


reveal();

// COUNTERS
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    let updateCount = () => {
        let target = +counter.getAttribute('data-target');
        let count = +counter.innerText;

        let speed = 50;
        let inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = target + "+";
        }
    }
    updateCount();
});

//FORM
// Handle Join Form Submission
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('form-message');
const submitButton = joinForm.querySelector('button[type="submit"]');

joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Submitting...';
    formMessage.className = 'hidden'; // Hide previous messages

    const formData = {
        full_name: document.getElementById('full_name').value,
        phone_number: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        lga: document.getElementById('lga').value,
        polling_unit: document.getElementById('polling_unit').value,
        ward: document.getElementById('ward').value,
        occupation: document.getElementById('occupation').value,
        age: document.getElementById('age').value ? parseInt(document.getElementById('age').value, 10) : null,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        reason_to_join: document.getElementById('reason_to_join').value,
    };

    try {
        const response = await fetch('http://localhost:5000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
            // Use the error message from the backend
            throw new Error(result.message || 'An unknown error occurred.');
        }

        formMessage.textContent = 'Registration successful! Welcome to the movement.';
        formMessage.className = 'p-3 rounded-lg mb-4 text-center bg-green-500 text-white';
        joinForm.reset();

    } catch (error) {
        formMessage.textContent = `Error: ${error.message}`;
        formMessage.className = 'p-3 rounded-lg mb-4 text-center bg-red-500 text-white';
    } finally {
        // Always re-enable the button and restore text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('home-events');
    if (!container) return;

    try {
        const res = await fetch('http://localhost:5000/api/v1/users/events');

        if (!res.ok) throw new Error('Failed to fetch events');

        let events = await res.json();

        // ✅ sort by newest first
        events = events.sort((a, b) => new Date(b.date) - new Date(a.date));

        // ✅ take only 3
        events = events.slice(0, 3);

        container.innerHTML = '';

        if (events.length === 0) {
            container.innerHTML = `
                <p class="text-gray-600 col-span-3 text-center">
                    No upcoming events yet.
                </p>
            `;
            return;
        }

        events.forEach(event => {
            const date = new Date(event.date).toLocaleDateString();

            const card = document.createElement('div');
            card.className = "bg-gray-100 rounded-2xl p-4 shadow";

            card.innerHTML = `
                <img src="${event.image_url}" class="rounded-xl mb-4 h-48 w-full object-cover">

                <h3 class="text-xl font-bold">${event.name}</h3>

                <p class="text-gray-600">📅 ${date}</p>
                <p class="text-gray-600">📍 ${event.location}</p>

                <a href="events.html"
                   class="inline-block mt-4 bg-yellow-500 px-4 py-2 rounded">
                    View Details
                </a>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <p class="text-red-500 col-span-3 text-center">
                Failed to load events
            </p>
        `;
    }
});