// Persistent background music system
(function() {
    // Globalni audio player koji preživljava navigaciju
    let globalAudio = window.globalBackgroundAudio;
    
    // Ako audio ne postoji, kreiraj ga
    if (!globalAudio) {
        globalAudio = new Audio('music/background-music.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.2;
        globalAudio.preload = 'auto';
        
        // Sačuvaj globalni referencu
        window.globalBackgroundAudio = globalAudio;
        
        // Pokušaj autoplay (može biti blokiran)
        globalAudio.play().catch(error => {
            console.log('Autoplay blokiran, čekam korisničku interakciju');
        });
    }
    
    // Funkcija za pokretanje muzike nakon interakcije
    function startAudio() {
        if (globalAudio.paused) {
            globalAudio.play().catch(error => {
                console.log('Greška pri puštanju:', error);
            });
        }
    }
    
    // Pokreni nakon bilo koje interakcije (samo jednom po session)
    if (!window.audioInitialized) {
        document.addEventListener('click', startAudio, { once: true });
        document.addEventListener('keydown', startAudio, { once: true });
        document.addEventListener('touchstart', startAudio, { once: true });
        window.audioInitialized = true;
    }
    
    // Nastavi puštati ako je već sviralo
    if (!globalAudio.paused && globalAudio.readyState >= 3) {
        globalAudio.play().catch(error => {
            console.log('Greška pri nastavku puštanja:', error);
        });
    }
    
    // Globalne kontrole
    window.backgroundMusic = {
        play: () => {
            globalAudio.play().catch(error => {
                console.log('Greška pri puštanju:', error);
            });
        },
        pause: () => {
            globalAudio.pause();
        },
        setVolume: (vol) => {
            globalAudio.volume = Math.max(0, Math.min(1, vol));
        },
        toggle: () => {
            if (globalAudio.paused) {
                globalAudio.play().catch(error => {
                    console.log('Greška pri puštanju:', error);
                });
            } else {
                globalAudio.pause();
            }
        },
        isPlaying: () => !globalAudio.paused,
        getCurrentTime: () => globalAudio.currentTime,
        setCurrentTime: (time) => {
            globalAudio.currentTime = time;
        }
    };
    
    // Očuvaj stanje prilikom navigacije
    window.addEventListener('beforeunload', () => {
        // Sačuvaj trenutno vrijeme i stanje
        sessionStorage.setItem('backgroundMusicTime', globalAudio.currentTime);
        sessionStorage.setItem('backgroundMusicPlaying', !globalAudio.paused);
    });
    
    // Vrati stanje nakon učitavanja
    window.addEventListener('load', () => {
        const savedTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
        const wasPlaying = sessionStorage.getItem('backgroundMusicPlaying') === 'true';
        
        if (savedTime > 0) {
            globalAudio.currentTime = savedTime;
        }
        
        if (wasPlaying && !globalAudio.paused) {
            globalAudio.play().catch(error => {
                console.log('Greška pri vraćanju muzike:', error);
            });
        }
    });
    
    console.log('Background music sistem učitan');
})();
