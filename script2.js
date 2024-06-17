// Cálculo do IBUTG
document.getElementById('btnCalcularIBUTG').addEventListener('click', () => {
    const tg = parseFloat(document.getElementById('tg').value);
    const tbn = parseFloat(document.getElementById('tbn').value);
    const tbs = parseFloat(document.getElementById('tbs').value);

    if (isNaN(tg) || isNaN(tbn) || isNaN(tbs)) {
        document.getElementById('resultadoIBUTG').innerText = 'Por favor, insira todos os valores necessários.';
        document.getElementById('resultadoIBUTG').style.display = 'block';
        return;
    }

    const ibutgSemCarga = 0.7 * tbn + 0.3 * tg;
    const ibutgComCarga = 0.7 * tbn + 0.2 * tg + 0.1 * tbs;

    document.getElementById('resultadoIBUTG').innerHTML = `
        <span style="color: green;"><p>IBUTG (Sem Carga Solar): ${ibutgSemCarga.toFixed(2)} °C</p>
        <span style="color: red;"><p>IBUTG (Com Carga Solar): ${ibutgComCarga.toFixed(2)} °C</p>
    `;
    document.getElementById('resultadoIBUTG').style.display = 'block';
});

// Adicionar nova linha na tabela IBUTG
document.getElementById('btnAdicionarIBUTG').addEventListener('click', function() {
    var table = document.getElementById('tableIBUTG').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = '<td><input type="number" class="form-control temperatura" step="0.1"></td><td><input type="number" class="form-control tempo" step="1"></td><td><button class="btn btn-danger remove">Remover</button></td>';

    newRow.querySelector('.remove').addEventListener('click', function() {
        newRow.remove();
    });
});

// Adicionar nova linha na tabela Taxas Metabólicas
document.getElementById('btnAdicionarTaxaMetabolica').addEventListener('click', function() {
    var table = document.getElementById('tableTaxasMetabolicas').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = '<td><input type="number" class="form-control taxa" step="0.1"></td><td><input type="number" class="form-control tempoMetabolico" step="1"></td><td><button class="btn btn-danger remove">Remover</button></td>';

    newRow.querySelector('.remove').addEventListener('click', function() {
        newRow.remove();
    });
});

// Adicionar evento de remoção para os botões existentes
document.querySelectorAll('.remove').forEach(function(button) {
    button.addEventListener('click', function() {
        this.closest('tr').remove();
    });
});

// Calcular IBUTG Média Ponderada
document.getElementById('btnCalcularIBUTGMedia').addEventListener('click', function() {
    var temperaturas = document.querySelectorAll('#tableIBUTG .temperatura');
    var tempos = document.querySelectorAll('#tableIBUTG .tempo');
    var totalTempo = 0, totalPonderado = 0;

    temperaturas.forEach((temp, index) => {
        var t = parseFloat(temp.value);
        var tempo = parseFloat(tempos[index].value);
        totalTempo += tempo;
        totalPonderado += t * tempo;
    });

    if (totalTempo !== 60) {
        document.getElementById('resultadoIBUTGMedia').innerText = 'O tempo total deve ser 60 minutos.';
        document.getElementById('resultadoIBUTGMedia').style.display = 'block';
        return;
    }

    var mediaPonderada = totalPonderado / totalTempo;
    document.getElementById('resultadoIBUTGMedia').innerText = 'IBUTG Média Ponderada: ' + mediaPonderada.toFixed(2) + ' °C';
    document.getElementById('resultadoIBUTGMedia').style.display = 'block';
});

// Calcular Média de Taxas Metabólicas Ponderadas
document.getElementById('btnCalcularTaxaMetabolica').addEventListener('click', function() {
    var taxas = document.querySelectorAll('#tableTaxasMetabolicas .taxa');
    var temposMetabolicos = document.querySelectorAll('#tableTaxasMetabolicas .tempoMetabolico');
    var totalTempoMetabolico = 0, totalPonderadoMetabolico = 0;

    taxas.forEach((taxa, index) => {
        var t = parseFloat(taxa.value);
        var tempo = parseFloat(temposMetabolicos[index].value);
        totalTempoMetabolico += tempo;
        totalPonderadoMetabolico += t * tempo;
    });

    if (totalTempoMetabolico !== 60) {
        document.getElementById('resultadoTaxasMetabolicas').innerText = 'O tempo total deve ser 60 minutos.';
        document.getElementById('resultadoTaxasMetabolicas').style.display = 'block';
        return;
    }

    var mediaPonderadaMetabolica = totalPonderadoMetabolico / totalTempoMetabolico;
    document.getElementById('resultadoTaxasMetabolicas').innerText = 'Média Ponderada de Taxas Metabólicas: ' + mediaPonderadaMetabolica.toFixed(2);
    document.getElementById('resultadoTaxasMetabolicas').style.display = 'block';
});
