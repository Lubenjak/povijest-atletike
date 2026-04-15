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
            startBtn.textContent = 'Kliknite na zeleno svjetlo!';
        }, delay);
    }

    function onLightClick() {
        if (light.classList.contains('green')) {
            const reactionTime = Date.now() - startTime;
            result.textContent = `Vaše vrijeme reakcije: ${reactionTime} ms`;
            
            // Provjera za prebrze reakcije
            if (reactionTime < 100) {
                result.innerHTML += '<br><span style="color: #e74c3c; font-weight: bold;">⚠️ Reakcija nije valjana!</span>';
            } else {
                // Prikaži poruku za valjane rezultate
                result.innerHTML += '<br><span style="color: #27ae60; font-weight: bold;">✅ Rezultat valjan!</span>';
                
                // Prikaži tablicu sa usporedbom
                showComparisonTable(reactionTime);
            }
            
            resetTest();
        }
    }

    function resetTest() {
        clearTimeout(timeoutId);
        startBtn.disabled = false;
        startBtn.textContent = 'Započni test';
        light.className = 'light red';
    }

    function showComparisonTable(reactionTime) {
        // Usporedba sa Usainom Boltom (145ms) i prosječnim ljudima (250ms)
        const usainBoltTime = 145;
        const averageHuman = 250;
        
        // Prikaži tablicu ispod rezultata
        const comparisonHTML = `
            <div style="background: white; border-radius: 10px; padding: 20px; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h4 style="color: #2c3e50; margin-bottom: 15px;">📊 Usporedba rezultata</h4>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                    <tr style="background: #f8f9fa;">
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #3498db;">Osoba</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #3498db;">Vrijeme</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #3498db;">Razlika</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">🏃‍♂️ Vi</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1; color: #e74c3c; font-weight: bold;">${reactionTime} ms</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">-</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">⚡ Usain Bolt</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1; color: #27ae60; font-weight: bold;">${usainBoltTime} ms</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1; color: ${reactionTime < usainBoltTime ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                            ${reactionTime < usainBoltTime ? 'Brži ste!' : '+' + (reactionTime - usainBoltTime) + 'ms sporije'}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1;">👥 Prosječan čovjek</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1; color: #f39c12; font-weight: bold;">${averageHuman} ms</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ecf0f1; color: ${reactionTime < averageHuman ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                            ${reactionTime < averageHuman ? 'Brži ste!' : '+' + (reactionTime - averageHuman) + 'ms sporije'}
                        </td>
                    </tr>
                </table>
            </div>
        `;
        
        // Dodaj tablicu ispod rezultata
        result.innerHTML += comparisonHTML;
    }
});