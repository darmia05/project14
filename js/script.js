// --- CONFIGURATION ---
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

    // 3. Calculate strictly safe boundaries 
    // We create a safety padding of 80px so it never touches the edge
    const maxPosX = viewportWidth - btnWidth - 80;
    const maxPosY = viewportHeight - btnHeight - 80;

    // 4. Generate random positions within these strict bounds
    // Math.max ensures we don't get negative numbers
    const newX = Math.max(20, Math.floor(Math.random() * maxPosX));
    const newY = Math.max(20, Math.floor(Math.random() * maxPosY));

    // 5. Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Ensure it's visually under the Yes button if they overlap
    noBtn.style.zIndex = "90"; 
};

// Events to trigger movement
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Stop mobile click
    moveButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stop desktop click
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
            // Even if email fails, show success screen so she isn't confused
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        });
});