// REPLACE THESE WITH YOUR REAL KEYS FROM EMAILJS DASHBOARD
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

// --- THE "NO" BUTTON LOGIC (Strictly bounded) ---

const moveButton = () => {
    // 1. Get current viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 2. Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Calculate strict boundaries (keep it 20px away from the edge)
    // The max X position is the screen width minus the button width minus padding
    const maxPosX = viewportWidth - btnWidth - 20;
    const maxPosY = viewportHeight - btnHeight - 20;

    // 4. Generate random positions within these strict bounds
    // We use Math.max(0, ...) to ensure it never goes negative (off left/top)
    const newX = Math.max(0, Math.floor(Math.random() * maxPosX));
    const newY = Math.max(0, Math.floor(Math.random() * maxPosY));

    // 5. Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Ensure it's clickable but tricky
    noBtn.style.zIndex = "999"; 
};

// Events to trigger movement
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent clicking on mobile
    moveButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Just in case they manage to click it
    moveButton();
});

// --- THE "YES" BUTTON LOGIC ---

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
            // Show success anyway
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        });
});