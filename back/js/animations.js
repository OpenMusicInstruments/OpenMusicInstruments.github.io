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

let firstClick = true;

document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;

    if (firstClick) {
        ripple.style.animationName = 'suction-animation';
        firstClick = false;
    } else {
        ripple.style.animationName = 'ripple-animation';
    }
    document.body.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});