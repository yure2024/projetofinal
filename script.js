document.addEventListener('DOMContentLoaded', function() {
    const limites = [
        { nivel: 85, tempo: 480 },
        { nivel: 86, tempo: 420 },
        { nivel: 87, tempo: 360 },
        { nivel: 88, tempo: 300 },
        { nivel: 89, tempo: 270 },
        { nivel: 90, tempo: 240 },
        { nivel: 91, tempo: 210 },
        { nivel: 92, tempo: 180 },
        { nivel: 93, tempo: 160 },
        { nivel: 94, tempo: 135 },
        { nivel: 95, tempo: 120 },
        { nivel: 96, tempo: 105 },
        { nivel: 98, tempo: 75 },
        { nivel: 100, tempo: 60 },
        { nivel: 102, tempo: 45 },
        { nivel: 104, tempo: 35 },
        { nivel: 105, tempo: 30 },
        { nivel: 106, tempo: 25 },
        { nivel: 108, tempo: 20 },
        { nivel: 110, tempo: 15 },
        { nivel: 112, tempo: 10 },
        { nivel: 114, tempo: 8 },
        { nivel: 115, tempo: 7 }
    ];

    document.getElementById('addRow').addEventListener('click', function() {
        const table = document.getElementById('noiseTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td><input type="number" class="form-control nivel" required></td>
            <td><input type="number" class="form-control tempo" required></td>
            <td class="tempoPermitido"></td>
            <td><button class="btn btn-danger remove">Remover</button></td>
        `;
    });

    document.getElementById('noiseTable').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove')) {
            event.target.closest('tr').remove();
        }
    });

    document.getElementById('calculate').addEventListener('click', function() {
        const rows = document.querySelectorAll('#noiseTable tbody tr');
        let totalDose = 0;
        let allSafe = true;

        rows.forEach(row => {
            const nivel = parseInt(row.querySelector('.nivel').value);
            const tempo = parseInt(row.querySelector('.tempo').value);
            let tempoPermitido = null;

            for (let i = 0; i < limites.length; i++) {
                if (nivel == limites[i].nivel) {
                    tempoPermitido = limites[i].tempo;
                    break;
                }
            }

            const tempoPermitidoCell = row.querySelector('.tempoPermitido');

            if (tempoPermitido === null) {
                tempoPermitidoCell.innerText = 'Nível não encontrado';
                allSafe = false;
            } else {
                tempoPermitidoCell.innerText = tempoPermitido;
                const dose = (tempo / tempoPermitido);
                totalDose += dose;
                if (dose > 1) {
                    allSafe = false;
                }
            }
        });

        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Dose Total de Ruído: ${totalDose.toFixed(2)}<br>`;

        if (totalDose > 1) {
            resultDiv.innerHTML += '<span style="color: red;">Exposição acima do limite de Tolerância - É insalubre!</span>';
        } else {
            resultDiv.innerHTML += '<span style="color: green;">A exposição está dentro do limite seguro.</span>';
        }
    });
});
