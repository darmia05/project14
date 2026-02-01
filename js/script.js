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

// --- "NO" BUTTON LOGIC (Reference: iamovi/button-will-react) ---
const moveButton = () => {
    // 1. Get current viewport dimensions
    // We subtract the button size to ensure it never goes off-screen
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    // 2. Generate random positions
    // Math.random() gives 0.0 to 1.0, so we multiply by max available space
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // 3. Apply the new position
    // We switch to 'fixed' position so it is relative to the screen (viewport)
    // This allows it to fly over any element
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};

// Trigger on hover (Desktop)
noBtn.addEventListener('mouseover', moveButton);

// Trigger on touch (Mobile) - Prevents tapping
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

// Trigger if they somehow manage to click it (Failsafe)
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