let audioContext;

const sounds = ['sounds/OMI-A.mp3', 
                'sounds/OMI-D.mp3', 
                'sounds/OMI-Dup.mp3', 
                'sounds/OMI-Fs.mp3', 
                'sounds/OMI-G.mp3'];

const soundWeights = [
    { sound: 'sounds/OMI-A.mp3', weight: 4 },
    { sound: 'sounds/OMI-D.mp3', weight: 4 },
    { sound: 'sounds/OMI-Dup.mp3', weight: 2 },
    { sound: 'sounds/OMI-G.mp3', weight: 2 },
    { sound: 'sounds/OMI-Fs.mp3', weight: 1 }
];

const weightedSounds = soundWeights.flatMap(({ sound, weight }) => Array(weight).fill(sound));

const audioBuffers = {};

function loadSound(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            audioBuffers[url] = buffer;
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

function playRandomSound() {
    const randomSound = weightedSounds[Math.floor(Math.random() * weightedSounds.length)];
    playSound(audioBuffers[randomSound], 0.5);
}

document.addEventListener('click', function(e) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        Promise.all(sounds.map(loadSound)).then(() => {
            loadSound('sounds/OMI-Back.mp3').then(() => {
                playSound(audioBuffers['sounds/OMI-Back.mp3'], 0.2, true);
            });
            loadSound('sounds/OMI-D.mp3').then(() => {
                playSound(audioBuffers['sounds/OMI-D.mp3'], 0.2);
            });
        });
    }
    playRandomSound();
});