document.addEventListener('DOMContentLoaded', () => {
    const pictures = document.querySelectorAll('.memberpicture');
    let current = 0;
    const interval = 500; // 120 BPM = 0.5s per beat

    function highlightNext() {
        pictures.forEach((img, i) => {
            if (i === current) {
                img.classList.add('highlight-member');
            } else {
                img.classList.remove('highlight-member');
            }
        });
        current = (current + 1) % pictures.length;
    }

    if (pictures.length > 0) {
        highlightNext();
        setInterval(highlightNext, interval);
    }
});