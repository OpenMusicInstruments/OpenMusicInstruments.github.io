document.addEventListener('mousemove', function(e) {
    const h1 = document.querySelector('h1');
    const body = document.querySelector('body');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    h1.style.transform = `translate(${x * 10}%, ${y * 100}%)`;
    body.style.transform = `translate(${x * 0.5}%, ${y * 0.5}%)`;
});

document.addEventListener('mouseleave', function(e) {
    const h1 = document.querySelector('h1');
    const body = document.querySelector('body');
    h1.style.transform = 'translate(0, 0)';
    body.style.transform = 'translate(0, 0)';
});

let audioContext;
const sounds = ['sounds/OMI-A.mp3', 'sounds/OMI-D.mp3', 'sounds/OMI-Dup.mp3', 'sounds/OMI-Fs.mp3', 'sounds/OMI-G.mp3'];
const audioBuffers = {};

function loadSound(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            audioBuffers[url] = buffer;
            console.log(`Loaded sound: ${url}`);
        })
        .catch(error => console.error(`Error loading sound: ${url}`, error));
}

function playSound(buffer, volume = 1.0, loop = false) {
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    source.buffer = buffer;
    source.loop = loop;
    gainNode.gain.value = volume;
    source.connect(gainNode).connect(audioContext.destination);
    source.start(0);
    return source;
}

document.addEventListener('click', function(e) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        Promise.all(sounds.map(loadSound)).then(() => {
            console.log('All sounds loaded');
            // Play constant background sound
            loadSound('sounds/OMI-Back.mp3').then(() => {
                playSound(audioBuffers['sounds/OMI-Back.mp3'], 0.2, true);
                console.log('Playing background sound');
            });
        });
    }

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 1000);

    // Play random click sound with priority to D and A
    const weightedSounds = ['sounds/OMI-A.mp3', 'sounds/OMI-A.mp3', 'sounds/OMI-D.mp3', 'sounds/OMI-D.mp3', 'sounds/OMI-Dup.mp3', 'sounds/OMI-F#.mp3', 'sounds/OMI-G.mp3'];
    const randomSound = weightedSounds[Math.floor(Math.random() * weightedSounds.length)];
    playSound(audioBuffers[randomSound], 0.5);
});