// Background music system - kontinuirano sviranje izmeðu stranica
(function() {
    let globalAudio = window.globalBackgroundAudio;
    
    if (!globalAudio) {
        globalAudio = new Audio('music/background-music.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.2;
        globalAudio.preload = 'auto';
        window.globalBackgroundAudio = globalAudio;
        
        // NE POKRECI MUZIKU AUTOMATSKI - cekaj na korisnikov klik
        console.log('Background music spreman, cekam na korisnikovu interakciju');
    }
    
    function startAudio() {
        if (globalAudio.paused) {
            globalAudio.play().catch(error => {
                console.log('Greka pri pustanju:', error);
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
    
    // NE ZAUSTAVLJAJ MUZIKU PRI PROMJENI STRANICE - samo spremi stanje
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('backgroundMusicTime', globalAudio.currentTime);
        sessionStorage.setItem('backgroundMusicPlaying', !globalAudio.paused);
        console.log('Spremljeno stanje muzike - svira:', !globalAudio.paused);
        // NE ZAUSTAVLJAJ MUZIKU - ne pozivaj globalAudio.pause()
    });
    
    window.addEventListener('load', () => {
        const wasPlaying = sessionStorage.getItem('backgroundMusicPlaying') === 'true';
        const savedTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
        
        if (wasPlaying && savedTime > 0) {
            globalAudio.currentTime = savedTime;
            console.log('Muzika bila svirala, nastavljam sa:', savedTime);
            
            // NASTAVI SVIRANJE AUTOMATSKI AKO JE BILO SVIRALO
            globalAudio.play().catch(error => {
                console.log('Autoplay blokiran, cekam na interakciju za nastavak');
                // Ako je autoplay blokiran, cekaj na prvi klik
                document.addEventListener('click', () => {
                    if (wasPlaying && globalAudio.paused) {
                        globalAudio.play().catch(e => console.log('Greka:', e));
                    }
                }, { once: true });
            });
        }
    });
})();
