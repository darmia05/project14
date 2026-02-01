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

// --- "NO" BUTTON LOGIC (Source: visibait/valentines) ---
const moveButton = () => {
    // 1. Get the current screen width and height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // 2. Get the button's size
    var btnWidth = noBtn.offsetWidth;
    var btnHeight = noBtn.offsetHeight;

    // 3. Calculate random positions
    // We subtract the button size to ensure it never goes off screen
    var randomX = Math.random() * (windowWidth - btnWidth);
    var randomY = Math.random() * (windowHeight - btnHeight);

    // 4. Apply new position
    // IMPORTANT: specific logic to ensure it works on top of other elements
    noBtn.style.position = "fixed"; // Forces it to use screen coordinates
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
};

// Trigger on hover (Desktop)
noBtn.addEventListener('mouseover', moveButton);

// Trigger on touch (Mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents the 'click' from happening
    moveButton();
});

// Backup click handler
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