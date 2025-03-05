document.addEventListener('mousemove', function(e) {
    const h1 = document.querySelector('h1');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    h1.style.transform = `translate(${x * 10}%, ${y * 10}%)`;
});

document.addEventListener('mouseleave', function(e) {
    const h1 = document.querySelector('h1');
    h1.style.transform = 'translate(0, 0)';
});

// Clicking

const sounds = ['sounds/OMI-A.mp3', 'sounds/OMI-D.mp3', 'sounds/OMI-Dup.mp3', 'sounds/OMI-F#.mp3', 'sounds/OMI-G.mp3'];

document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 1000);

    // Play random click sound
    const sounds = ['sounds/OMI-A.mp3','sounds/OMI-A.mp3', 'sounds/OMI-D.mp3','sounds/OMI-D.mp3','sounds/OMI-D.mp3', 'sounds/OMI-Dup.mp3', 'sounds/OMI-F#.mp3', 'sounds/OMI-G.mp3'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const clickSound = new Audio(randomSound);
    clickSound.volume = 0.5;
    clickSound.play();
});

// Play constant background sound
const backgroundSound = new Audio('sounds/OMI-Back.mp3');
backgroundSound.loop = true;
backgroundSound.play();