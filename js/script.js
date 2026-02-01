// --- CONFIGURATION ---
// Keys verified from your screenshots
const PUBLIC_KEY = "C8MIB_1Bo5z2thMe6";  
const SERVICE_ID = "service_cny07mr";
const TEMPLATE_ID = "template_awcwn6i";

(function() {
    emailjs.init(PUBLIC_KEY);
})();

const mainContainer = document.getElementById('main-container');
const successContainer = document.getElementById('success-container');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// --- "NO" BUTTON LOGIC ---
const moveButton = () => {
    // 1. Get current viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 2. Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Calculate Strictly Safe Boundaries
    // We create a safety padding of 50px so it never touches the edge
    const maxPosX = viewportWidth - btnWidth - 50;
    const maxPosY = viewportHeight - btnHeight - 50;

    // 4. Generate random positions within these strict bounds
    // Math.max(0, ...) ensures we never get a negative number (off-screen left/top)
    // If the screen is too small, it defaults to 10px (top left safe zone)
    const newX = Math.max(10, Math.floor(Math.random() * maxPosX));
    const newY = Math.max(10, Math.floor(Math.random() * maxPosY));

    // 5. Apply new position
    // We use 'fixed' so it is relative to the screen, not the card
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Double check visibility
    noBtn.style.zIndex = "9999"; 
};

// Events to trigger movement
noBtn.addEventListener('mouseover', moveButton);

// For mobile: trigger on touch
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Stop the click from registering
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
            // Even if email fails, show success screen so the moment isn't ruined
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        });
});