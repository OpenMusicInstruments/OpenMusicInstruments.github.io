const app = new PIXI.Application();
await app.init({ resizeTo: window, backgroundColor: 0x111111 });
const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;
document.getElementById('drawing').appendChild(app.canvas);


// === Instrument shapes ===

function createShapes(centerX, centerY) {
    const bloop = [
        {x: centerX - 120, y: centerY - 100},
        {x: centerX + 120,  y: centerY - 100},
        {x: centerX + 120,  y: centerY + 100},
        {x: centerX - 120, y: centerY + 100},
        {x: centerX - 120, y: centerY - 100},
        {x: centerX - 90,  y: centerY - 70},
        {x: centerX + 90,  y: centerY - 70},
        {x: centerX + 90, y: centerY + 40},
        {x: centerX - 90,  y: centerY + 40},
        {x: centerX - 90,  y: centerY + 70},
        {x: centerX - 70,  y: centerY + 70},
        {x: centerX - 70,  y: centerY + 60},
        {x: centerX - 50,  y: centerY + 70},

        {x: centerX - 40,  y: centerY + 70},
        {x: centerX - 35,  y: centerY + 65},
        {x: centerX - 30,  y: centerY + 60},
        {x: centerX - 25,  y: centerY + 60},
        {x: centerX - 20,  y: centerY + 65},

        {x: centerX - 15,  y: centerY + 70},
        {x: centerX - 20,  y: centerY + 75},
        {x: centerX - 25,  y: centerY + 80},
        {x: centerX - 30,  y: centerY + 80},
        {x: centerX - 35,  y: centerY + 75},
        {x: centerX - 40,  y: centerY + 70},

        {x: centerX - 50,  y: centerY + 70},
        {x: centerX - 70,  y: centerY + 80},
        {x: centerX - 70,  y: centerY + 70},

        {x: centerX - 90,  y: centerY + 70},
        {x: centerX - 90,  y: centerY + 40},
        {x: centerX - 90,  y: centerY - 70},
        
    ];

    const keyboard = [
        // Outer rectangle
        {x: centerX - 150, y: centerY + 70},
        {x: centerX - 170, y: centerY - 70},
        {x: centerX + 170, y: centerY - 70},

        {x: centerX + 150, y: centerY - 40},
        {x: centerX - 150, y: centerY - 40},
        {x: centerX - 170, y: centerY - 70},
        {x: centerX + 170, y: centerY - 70},

        {x: centerX + 150, y: centerY + 70},
        {x: centerX - 150, y: centerY + 70},

        {x: centerX - 150, y: centerY + 70},

        // Inner rectangle
        {x: centerX - 120, y: centerY + 70},
        {x: centerX - 120, y: centerY + 20},
        {x: centerX + 120, y: centerY + 20},
        {x: centerX + 120, y: centerY + 70},

        {x: centerX + 90, y: centerY + 70},
        {x: centerX + 90, y: centerY + 20},
        {x: centerX + 60, y: centerY + 20},
        {x: centerX + 60, y: centerY + 70},
        {x: centerX + 30, y: centerY + 70},
        {x: centerX + 30, y: centerY + 20},
        {x: centerX, y: centerY + 20},
        {x: centerX, y: centerY + 70},
        {x: centerX - 30, y: centerY + 70},
        {x: centerX - 30, y: centerY + 20},
        {x: centerX - 60, y: centerY + 20},
        {x: centerX - 60, y: centerY + 70},
        {x: centerX - 90, y: centerY + 70},
        {x: centerX - 90, y: centerY + 20},
        {x: centerX - 120, y: centerY + 20},
        {x: centerX - 120, y: centerY + 70},
    ];

    const vinyl = [
        // Outer circle (12 points approximating a circle)
        {x: centerX, y: centerY - 100},
        {x: centerX + 50, y: centerY - 87},
        {x: centerX + 87, y: centerY - 50},
        {x: centerX + 100, y: centerY},
        {x: centerX + 87, y: centerY + 50},
        {x: centerX + 50, y: centerY + 87},
        {x: centerX, y: centerY + 100},
        {x: centerX - 50, y: centerY + 87},
        {x: centerX - 87, y: centerY + 50},
        {x: centerX - 100, y: centerY},
        {x: centerX - 87, y: centerY - 50},
        {x: centerX - 50, y: centerY - 87},

        {x: centerX, y: centerY - 100},
        {x: centerX - 100, y: centerY - 100},
        {x: centerX - 100, y: centerY + 100},
        {x: centerX + 100, y: centerY + 100},
        {x: centerX + 100, y: centerY - 100},
        

        {x: centerX, y: centerY },
        {x: centerX, y: centerY },
        {x: centerX, y: centerY },

        {x: centerX + 20, y: centerY - 20},

        {x: centerX + 25, y: centerY},

        {x: centerX + 20, y: centerY + 20},

        {x: centerX, y: centerY + 25},

        {x: centerX - 20, y: centerY + 20},

        {x: centerX - 25, y: centerY},

        {x: centerX - 20, y: centerY - 20},

        {x: centerX, y: centerY - 25},

        {x: centerX + 20, y: centerY - 20},
        {x: centerX + 100, y: centerY - 100},

    ];

    return [bloop, keyboard, vinyl];
}


// === Helper to create a scrambled position version ===

function scramblePositions(points) {
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;

    const margin = 50;
    const maxRadiusAmplifier = 0.3;

    const maxRadius = Math.min(
        centerX, centerY,
        app.screen.width - centerX,
        app.screen.height - centerY
    ) - margin;

    return points.map(() => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxRadius * maxRadiusAmplifier;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });
}


// === Interpolation ===

function interpolate(shapeA, shapeB, t) {
    return shapeA.map((ptA, i) => ({
        x: ptA.x * (1 - t) + shapeB[i].x * t,
        y: ptA.y * (1 - t) + shapeB[i].y * t
    }));
}


// === Draw ===

const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

function drawShape(points) {
    graphics.clear();
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.lineTo(points[0].x, points[0].y);

    for (const pt of points) {
        graphics.beginFill(0x111111,0);
        graphics.endFill();
    }
}


// === Initialization ===

let instruments = [];
let currentInstrumentIndex = 0;
let phase, timer, shapeA, scrambledShape1, scrambledShape2, shapeB, currentPoints;

function initShapesAndAnimation() {
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;
    instruments = createShapes(centerX, centerY);

    currentInstrumentIndex = 0;
    phase = 'toScramble1';
    timer = 0;
    shapeA = instruments[currentInstrumentIndex];
    scrambledShape1 = scramblePositions(shapeA);
    scrambledShape2 = scramblePositions(shapeA);
    shapeB = instruments[(currentInstrumentIndex + 1) % instruments.length];
    currentPoints = shapeA;
    drawShape(currentPoints);
}

initShapesAndAnimation();

const observer = new ResizeObserver(() => {
    initShapesAndAnimation();
});

observer.observe(app.canvas);

// === Animation loop ===

const holdTime = 1; // seconds
const scrambleTime = 0.5; // seconds

await new Promise(r => setTimeout(r, 900));

app.ticker.add(() => {
    const dt = app.ticker.deltaMS / 900; // Seconds passed since last frame
    
    timer += dt;

    if (phase === 'toScramble1') {
        const t = Math.min(timer / scrambleTime, 1);
        currentPoints = interpolate(shapeA, scrambledShape1, t);
        drawShape(currentPoints);
        if (t >= 1) {
            phase = 'toScramble2';
            timer = 0;
        }
    } else if (phase === 'toScramble2') {
        const t = Math.min(timer / scrambleTime, 1);
        currentPoints = interpolate(scrambledShape1, scrambledShape2, t);
        drawShape(currentPoints);
        if (t >= 1) {
            phase = 'toNext';
            timer = 0;
        }
    } else if (phase === 'toNext') {
        const t = Math.min(timer / scrambleTime, 1);
        currentPoints = interpolate(scrambledShape2, shapeB, t);
        drawShape(currentPoints);
        if (t >= 1) {
        phase = 'hold';
        timer = 0;
        }
    } else if (phase === 'hold') {
        drawShape(shapeB);
        if (timer >= holdTime) {
        currentInstrumentIndex = (currentInstrumentIndex + 1) % instruments.length;
        shapeA = shapeB;
        scrambledShape1 = scramblePositions(shapeA);
        scrambledShape2 = scramblePositions(shapeA);
        shapeB = instruments[(currentInstrumentIndex + 1) % instruments.length];
        phase = 'toScramble1';
        timer = 0;
        }
    }
});


/////////////////////////////////////////////////////////


document.body.addEventListener('click', (event) => {
    clickAnimation(event);
});

function pickRandomColor() {
    const colors = ['#FFFFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function clickAnimation(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.pageX}px`;
    ripple.style.top = `${e.pageY}px`;

    ripple.style.backgroundColor = pickRandomColor();

    ripple.style.animationName = 'ripple-animation';

    document.body.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

/////////////////////////////////////////////////////////

let audioContext;
let isMuted = false;

const soundsFolder = './back/experience/sounds/';
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

document.addEventListener('click', function(e) {
    if (!audioContext) {
        unmuteSound();
    } else {
        playRandomSound();
    }
});