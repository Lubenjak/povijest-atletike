// Background music system - pamti stanje između stranica
(function() {
    let globalAudio = window.globalBackgroundAudio;
    
    if (!globalAudio) {
        globalAudio = new Audio('music/background-music.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.2;
        globalAudio.preload = 'auto';
        window.globalBackgroundAudio = globalAudio;
        
        console.log('Background music spreman');
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
        play: () => {
            globalAudio.play().then(() => {
                // OZNAČI DA JE KORISNIK UKLJUČIO MUZIKU
                sessionStorage.setItem('userEnabledMusic', 'true');
                console.log('Korisnik je uključio muziku - spremljeno u sessionStorage');
            }).catch(error => {
                console.log('Greka pri paljenju:', error);
            });
        },
        pause: () => {
            globalAudio.pause();
            // OZNAČI DA JE KORISNIK ISKLJUČIO MUZIKU
            sessionStorage.setItem('userEnabledMusic', 'false');
            console.log('Korisnik je isključio muziku - spremljeno u sessionStorage');
        },
        setVolume: (vol) => globalAudio.volume = Math.max(0, Math.min(1, vol)),
        toggle: () => {
            if (globalAudio.paused) {
                window.backgroundMusic.play();
            } else {
                window.backgroundMusic.pause();
            }
        },
        isPlaying: () => !globalAudio.paused
    };
    
    // PRI PROMJENI STRANICE - SPREMI SVE STANJE
    window.addEventListener('beforeunload', () => {
        const isPlaying = !globalAudio.paused;
        const currentTime = globalAudio.currentTime;
        
        sessionStorage.setItem('backgroundMusicTime', currentTime.toString());
        sessionStorage.setItem('backgroundMusicPlaying', isPlaying.toString());
        
        console.log('BeforeUnload - spremljeno:');
        console.log('- userEnabledMusic:', sessionStorage.getItem('userEnabledMusic'));
        console.log('- backgroundMusicTime:', currentTime);
        console.log('- backgroundMusicPlaying:', isPlaying);
        
        // NE ZAUSTAVLJAJ MUZIKU - neka nastavi svirati u novoj stranici
    });
    
    window.addEventListener('load', () => {
        // PROVJERI SVE SESSIONSTORAGE VRIJEDNOSTI
        const userEnabledMusic = sessionStorage.getItem('userEnabledMusic') === 'true';
        const wasPlaying = sessionStorage.getItem('backgroundMusicPlaying') === 'true';
        const savedTime = parseFloat(sessionStorage.getItem('backgroundMusicTime') || '0');
        
        console.log('Load - učitano iz sessionStorage:');
        console.log('- userEnabledMusic:', userEnabledMusic);
        console.log('- backgroundMusicPlaying:', wasPlaying);
        console.log('- backgroundMusicTime:', savedTime);
        
        if (userEnabledMusic && wasPlaying && savedTime >= 0) {
            // NASTAVI SVIRANJE SAMO AKO JE KORISNIK UKLJUČIO
            globalAudio.currentTime = savedTime;
            console.log('Pokušavam nastaviti muziku sa vremena:', savedTime);
            
            // POČEKAJ MALO PA POKUŠAJ POKRENUTI
            setTimeout(() => {
                globalAudio.play().then(() => {
                    console.log('Muzika uspješno nastavljena!');
                }).catch(error => {
                    console.log('Autoplay blokiran, čekam na interakciju:', error);
                    // Ako je autoplay blokiran, čekaj na prvi klik
                    document.addEventListener('click', () => {
                        if (userEnabledMusic && globalAudio.paused) {
                            globalAudio.play().then(() => {
                                console.log('Muzika pokrenuta nakon interakcije');
                            }).catch(e => console.log('Greka:', e));
                        }
                    }, { once: true });
                });
            }, 100);
        } else {
            // ZAUSTAVI MUZIKU - korisnik je isključio ili nikada nije uključio
            globalAudio.pause();
            console.log('Muzika ostaje isključena - korisnik nije uključio ili nije svirala');
        }
    });
})();
