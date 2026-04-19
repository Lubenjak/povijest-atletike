// Audio gumb kontrola - sinhronizacija sa background-music.js
document.addEventListener('DOMContentLoaded', function() {
    const audioToggle = document.getElementById('audio-toggle');
    
    if (!audioToggle) {
        console.log('Audio gumb nije pronaen');
        return;
    }
    
    console.log('Audio gumb pronaen, inicijaliziram kontrolu');
    
    // Funkcija za update gumba
    function updateAudioButton() {
        if (window.backgroundMusic && window.backgroundMusic.isPlaying()) {
            audioToggle.classList.add('playing');
            audioToggle.innerHTML = '<i class="fas fa-pause"></i><span>Muzika</span>';
            console.log('Gumb update: PLAYING');
        } else {
            audioToggle.classList.remove('playing');
            audioToggle.innerHTML = '<i class="fas fa-play"></i><span>Muzika</span>';
            console.log('Gumb update: PAUSED');
        }
    }
    
    // Event listener za klik na gumb - samo JEDAN put
    audioToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Gumb kliknut - pozivam toggle');
        
        if (window.backgroundMusic) {
            try {
                // Provjeri trenutno stanje
                const wasPlaying = window.backgroundMusic.isPlaying();
                console.log('Prije togglea - svira:', wasPlaying);
                
                // Pozovi toggle
                window.backgroundMusic.toggle();
                
                // Saèekaj malo i update gumba
                setTimeout(() => {
                    updateAudioButton();
                    const isPlaying = window.backgroundMusic.isPlaying();
                    console.log('Poslije togglea - svira:', isPlaying);
                }, 100);
                
            } catch (error) {
                console.error('Greka pri toggle:', error);
            }
        } else {
            console.log('Background music nije dostupan');
        }
    });
    
    // Update gumba svake sekunde da bi bio sinhroniziran
    setInterval(updateAudioButton, 1000);
    
    // Postavi poèetno stanje
    setTimeout(updateAudioButton, 500);
    
    console.log('Audio kontrola inicijalizirana');
});
