// --- CONFIGURATION ---
const PUBLIC_KEY = "C8M1B_1Bo5z2thMe6";  
const SERVICE_ID = "service_cny07mr";
const TEMPLATE_ID = "template_awcwn6i";

(function() {
    emailjs.init(PUBLIC_KEY);
})();

const mainContainer = document.getElementById('main-container');
const whiteBox = document.getElementById('white-box'); // The Jail
const successContainer = document.getElementById('success-container');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// --- "NO" BUTTON LOGIC ---
const moveButton = () => {
    // 1. Get dimensions of the White Box (The Jail)
    const boxRect = whiteBox.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // 2. Calculate valid area INSIDE the white box
    // We subtract the button size so it doesn't overflow the right/bottom
    const maxX = boxRect.width - btnRect.width;
    const maxY = boxRect.height - btnRect.height;

    // 3. Generate random positions
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // 4. Apply position
    // We switch to absolute position relative to the white box
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
};

// Triggers
noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});
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