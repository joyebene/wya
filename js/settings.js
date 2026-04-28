document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:5000/api/v1/users/settings');

        if (!res.ok) throw new Error("Failed to load settings");

        const settings = await res.json();

        // site title (optional)
        if (settings.siteTitle) {
            document.title = settings.siteTitle;
        }

        // footer values
        const emailEl = document.getElementById('footer-email');
        const phoneEl = document.getElementById('footer-phone');
        const addressEl = document.getElementById('footer-address');

        if (emailEl) emailEl.textContent = `Email: ${settings.contactEmail || 'N/A'}`;
        if (phoneEl) phoneEl.textContent = `Phone: ${settings.phone || 'N/A'}`;
        if (addressEl) addressEl.textContent = `Address: ${settings.address || 'N/A'}`;

    } catch (err) {
        console.error("Settings load error:", err);
    }
});