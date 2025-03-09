let audioContext;
let isMuted = false;

const soundsFolder = '/back/sounds/';
const backgroundSound = soundsFolder + 'OMI-Back.mp3';
const initialSound = soundsFolder + 'OMI-D.mp3';
const sounds = ['OMI-A.mp3', 'OMI-D.mp3', 'OMI-Dup.mp3', 'OMI-Fs.mp3', 'OMI-G.mp3'].map(sound => soundsFolder + sound);

const soundWeights = [
    { sound: 'OMI-A.mp3', weight: 4 },
    { sound: 'OMI-D.mp3', weight: 4 },
    { sound: 'OMI-Dup.mp3', weight: 2 },
    { sound: 'OMI-G.mp3', weight: 2 },
    { sound: 'OMI-Fs.mp3', weight: 1 }
];

let backgroundVolume = 0.2;
let clickVolume = 0.5;

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
    playSound(audioBuffers[soundsFolder + randomSound], clickVolume);
}

function muteSound() {
    isMuted = true;
    audioContext.close();
}

function unmuteSound() {
    isMuted = false;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    Promise.all(sounds.map(loadSound)).then(() => {
        loadSound(backgroundSound).then(() => {
            playSound(audioBuffers[backgroundSound], backgroundVolume, true);
        });
        loadSound(initialSound).then(() => {
            playSound(audioBuffers[initialSound], backgroundVolume);
        });
    });
}

function toggleSound() {
    const toggleCheckbox = document.getElementById('toggle-sound');
    if (toggleCheckbox.checked) {
        unmuteSound();
    } else {
        muteSound();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('toggle-sound');
    toggleCheckbox.addEventListener('change', toggleSound);
});

document.addEventListener('click', function(e) {
    if (!audioContext) {
        unmuteSound();
    } else {
        playRandomSound();
    }
});