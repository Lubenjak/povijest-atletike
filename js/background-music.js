// Background music system
(function() {
    let globalAudio = window.globalBackgroundAudio;
    
    if (!globalAudio) {
        globalAudio = new Audio('music/background-music.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.2;
        globalAudio.preload = 'auto';
        window.globalBackgroundAudio = globalAudio;
        
        globalAudio.play().catch(error => {
            console.log('Autoplay blokiran, cekam interakciju');
        });
    }
    
    function startAudio() {
        if (globalAudio.paused) {
            globalAudio.play().catch(error => {
                console.log('Gre\u0161ka pri pu\u0161tanju:', error);
            });
        }
    }
    
    if (!window.audioInitialized) {
        document.addEventListener('click', startAudio, { once: true });
        document.addEventListener('keydown', startAudio, { once: true });
        document.addEventListener('touchstart', startAudio, { once: true });
        window.audioInitialized = true;
    }
    
    window.backgroundMusic = {
        play: () => globalAudio.play(),
        pause: () => globalAudio.pause(),
        setVolume: (vol) => globalAudio.volume = Math.max(0, Math.min(1, vol)),
        toggle: () => globalAudio.paused ? globalAudio.play() : globalAudio.pause(),
        isPlaying: () => !globalAudio.paused
    };
    
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('backgroundMusicTime', globalAudio.currentTime);
        sessionStorage.setItem('backgroundMusicPlaying', !globalAudio.paused);
    });
    
    window.addEventListener('load', () => {
        const wasPlaying = sessionStorage.getItem('backgroundMusicPlaying') === 'true';
        const savedTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
        
        if (wasPlaying && savedTime > 0) {
            globalAudio.currentTime = savedTime;
            globalAudio.play().catch(error => console.log('Gre\u0161ka:', error));
        }
    });
})();
