// Initialize EmailJS with your public key
(function() {
    emailjs.init("C8MlB_1Bo5z2thMe6");
})();

const mainContainer = document.getElementById('main-container');
const successContainer = document.getElementById('success-container');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// --- THE "NO" BUTTON LOGIC (The Impossible Button) ---

// Function to move the button to a random spot
const moveButton = () => {
    // Get the current size of the browser window
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate new random positions ensuring it stays on screen
    // We subtract button size to keep it from overflowing the edge
    const newX = Math.random() * (windowWidth - btnWidth - 50);
    const newY = Math.random() * (windowHeight - btnHeight - 50);

    // Apply new CSS styles to move it
    noBtn.style.position = 'fixed'; // Switch to fixed positioning so it can fly anywhere
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    // Makes it harder to catch by changing z-index subtly
    noBtn.style.zIndex = "1"; 
};

// Trigger movement on mouse hover (desktop)
noBtn.addEventListener('mouseover', moveButton);
// Trigger movement on touch start (mobile) before they can actually tap it
noBtn.addEventListener('touchstart', moveButton);


// --- THE "YES" BUTTON LOGIC (Email & Success Screen) ---

yesBtn.addEventListener('click', () => {
    // 1. Change UI immediately so she sees something happened
    yesBtn.innerText = "Sending Love... 💕";
    
    // 2. Prepare parameters for the email (optional, but good practice)
    const templateParams = {
        to_name: "Danny",
        message: "She clicked Yes!"
    };

    // 3. Send the email using EmailJS
    emailjs.send('service_cny07mr', 'template_awcwn6i', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Hide proposal, show success screen upon successful email sending
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        }, function(error) {
            console.log('FAILED...', error);
            // Even if the email fails technically, still show her the success screen
            // because she clicked yes!
            mainContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
            alert("She said yes, but the email notification failed to send. Check console.");
        });
});