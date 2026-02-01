// --- CONFIGURATION ---
const PUBLIC_KEY = "C8MlB_1Bo5z2thMe6";  
const SERVICE_ID = "service_cny07mr";
const TEMPLATE_ID = "template_awcwn6i";

(function() {
    emailjs.init(PUBLIC_KEY);
})();

const mainContainer = document.getElementById('main-container');
const successContainer = document.getElementById('success-container');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// --- "NO" BUTTON LOGIC (THE SAFE ZONE FIX) ---
const moveButton = () => {
    // 1. Get current viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 2. Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Define the "Safe Zone"
    // We want the button to stay away from the edges by at least 100px
    // This calculation finds the available space in the middle of the screen
    const minX = 80; // Keep 80px away from left
    const maxX = viewportWidth - btnWidth - 80; // Keep 80px away from right
    
    const minY = 80; // Keep 80px away from top
    const maxY = viewportHeight - btnHeight - 80; // Keep 80px away from bottom

    // Safety check: If screen is super small, just wiggle slightly
    const safeMaxX = Math.max(minX + 10, maxX);
    const safeMaxY = Math.max(minY + 10, maxY);

    // 4. Generate Random Position within Safe Zone
    const randomX = Math.floor(Math.random() * (safeMaxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;

    // 5. Apply new position
    // We use 'fixed' so it is relative to the browser window, not the card
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

// Events to trigger movement
noBtn.addEventListener('mouseover', moveButton);

// For mobile: trigger on touch
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

// Just in case they are fast enough to click
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    moveButton();
});

// --- "YES" BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    yesBtn.innerText = "Sending Love... 💕";
    
    const templateParams = {
        to_name: "Danny",
        message: "Isabella said YES!"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        }, function(error) {
            console.log('FAILED...', error);
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        });
});