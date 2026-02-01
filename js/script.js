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

// --- "NO" BUTTON LOGIC ---
const moveButton = () => {
    // 1. Get the current screen width and height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // 2. Get the button's size
    var btnWidth = noBtn.offsetWidth;
    var btnHeight = noBtn.offsetHeight;

    // 3. Calculate random positions
    // We subtract the button size AND a 50px buffer to keep it clearly visible
    var randomX = Math.random() * (windowWidth - btnWidth - 50);
    var randomY = Math.random() * (windowHeight - btnHeight - 50);

    // Ensure it doesn't go off the top/left edge either by using Math.max
    randomX = Math.max(10, randomX);
    randomY = Math.max(10, randomY);

    // 4. Apply new position
    // We switch to 'fixed' so it moves relative to the screen
    noBtn.style.position = "fixed"; 
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
};

// Trigger on hover (Desktop)
noBtn.addEventListener('mouseover', moveButton);

// Trigger on touch (Mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
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