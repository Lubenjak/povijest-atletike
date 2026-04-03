// Optimized persistent background music system
(function() {
    // Globalni audio player koji preživljava navigaciju
    let globalAudio = window.globalBackgroundAudio;
    
    // Ako audio ne postoji, kreiraj ga
    if (!globalAudio) {
        globalAudio = new Audio('music/background-music.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.2;
        globalAudio.preload = 'auto';
        
        // Dodaj event listenere za bolju kontrolu
        globalAudio.addEventListener('canplaythrough', () => {
            console.log('Muzika učitana i spremna');
        });
        
        globalAudio.addEventListener('play', () => {
            console.log('Muzika svira');
        });
        
        globalAudio.addEventListener('pause', () => {
            console.log('Muzika pauzirana');
        });
        
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
    
    // Brza provjera i nastavak puštanja
    function quickResume() {
        if (globalAudio.readyState >= 2 && globalAudio.paused) {
            globalAudio.currentTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
            globalAudio.play().catch(error => {
                console.log('Greška pri brzom nastavku:', error);
            });
        }
    }
    
    // Pokreni odmah ako je moguće
    if (globalAudio.readyState >= 2) {
        quickResume();
    } else {
        globalAudio.addEventListener('canplay', quickResume, { once: true });
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
    
    // Brzo čuvanje stanja prilikom navigacije
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('backgroundMusicTime', globalAudio.currentTime);
        sessionStorage.setItem('backgroundMusicPlaying', !globalAudio.paused);
    });
    
    // Brzo vraćanje stanja nakon učitavanja
    window.addEventListener('load', () => {
        const savedTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
        const wasPlaying = sessionStorage.getItem('backgroundMusicPlaying') === 'true';
        
        if (wasPlaying && savedTime > 0) {
            globalAudio.currentTime = savedTime;
            if (globalAudio.readyState >= 2) {
                globalAudio.play().catch(error => {
                    console.log('Greška pri vraćanju muzike:', error);
                });
            }
        }
    });
    
    // Manji delay za SPA navigaciju
    let navigationTimer;
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href) {
            navigationTimer = setTimeout(() => {
                sessionStorage.setItem('backgroundMusicTime', globalAudio.currentTime);
                sessionStorage.setItem('backgroundMusicPlaying', !globalAudio.paused);
            }, 50);
        }
    });
    
    // Očisti timer ako navigacija ne uspije
    window.addEventListener('pageshow', () => {
        clearTimeout(navigationTimer);
    });
    
    console.log('Optimized background music sistem učitan');
})();
