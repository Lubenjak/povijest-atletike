document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const light = document.getElementById('light');
    const result = document.getElementById('result');

    let startTime;
    let timeoutId;

    startBtn.addEventListener('click', startTest);
    light.addEventListener('click', onLightClick);

    function startTest() {
        startBtn.disabled = true;
        startBtn.textContent = 'Pripremi se...';
        result.textContent = '';
        light.className = 'light wait';

        // Random delay between 1-5 seconds
        const delay = Math.random() * 4000 + 1000;

        timeoutId = setTimeout(() => {
            light.className = 'light green';
            startTime = Date.now();
            startBtn.textContent = 'Klikni na zeleno svjetlo!';
        }, delay);
    }

    function onLightClick() {
        if (light.classList.contains('green')) {
            const reactionTime = Date.now() - startTime;
            result.textContent = `Vaše vrijeme reakcije: ${reactionTime} ms`;
            resetTest();
        }
    }

    function resetTest() {
        clearTimeout(timeoutId);
        startBtn.disabled = false;
        startBtn.textContent = 'Započni test';
        light.className = 'light red';
    }
});