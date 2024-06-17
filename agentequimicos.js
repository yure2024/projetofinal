// Função para calcular a média aritmética
function calculateAverage() {
    let sum = 0;
    for (let i = 1; i <= 10; i++) {
        let measure = parseFloat(document.getElementById(`measure${i}`).value);
        if (!isNaN(measure)) {
            sum += measure;
        }
    }
    let average = sum / 10;
    document.getElementById('result1').innerText = `Média Aritmética: ${average.toFixed(2)} ppm`;
    document.getElementById('result1').style.display = 'block';
}

// Função para verificar insalubridade
function checkInsalubridade() {
    let sum = 0;
    let isInsalubre = false;
    let LT = parseFloat(document.getElementById('limit').value);
    
    for (let i = 11; i <= 20; i++) {
        let measure = parseFloat(document.getElementById(`measure${i}`).value);
        if (!isNaN(measure)) {
            sum += measure;
            if (measure > LT) {
                isInsalubre = true;
            }
        }
    }
    let average = sum / 10;
    if (average > LT) {
        isInsalubre = true;
    }
    let result = isInsalubre ? 'Insalubre' : 'Não Insalubre';
    document.getElementById('result2').innerText = `Média Aritmética: ${average.toFixed(2)} ppm - Resultado: ${result}`;
    document.getElementById('result2').style.display = 'block';
}

// Função para calcular o Valor Máximo (VM)
function calculateVM() {
    let LT = parseFloat(document.getElementById('limit').value);
    let FD = 1;
    
    if (LT <= 1) {
        FD = 3;
    } else if (LT <= 10) {
        FD = 2;
    } else if (LT <= 100) {
        FD = 1.5;
    } else if (LT <= 1000) {
        FD = 1.25;
    } else {
        FD = 1.1;
    }

    let VM = LT * FD;
    let isRisk = false;
    
    for (let i = 11; i <= 20; i++) {
        let measure = parseFloat(document.getElementById(`measure${i}`).value);
        if (!isNaN(measure) && measure > VM) {
            isRisk = true;
        }
    }
        let result = isRisk ? 'RISCO GRAVE E IMINENTE' : 'Dentro do Valor Máximo';
        document.getElementById('result3').innerText = `Valor Máximo: ${VM.toFixed(2)} ppm - Resultado: ${result}`;
        document.getElementById('result3').style.display = 'block';
    }


    var imagemDiv = document.getElementById("imagem");
    var overlayDiv = document.getElementById("overlay");
    var imgElement = document.getElementById("imgToShow");

    // Função para exibir ou ocultar a imagem
    function toggleImagem(src) {
        if (imagemDiv.style.display === "none" || imgElement.src !== src) {
            imgElement.src = src;
            imagemDiv.style.display = "block";
            overlayDiv.style.display = "block";
        } else {
            imagemDiv.style.display = "none";
            overlayDiv.style.display = "none";
            imgElement.src = "";
        }
    }

    // Adiciona um evento de clique ao overlay para ocultar a imagem
    overlayDiv.addEventListener("click", function() {
        imagemDiv.style.display = "none";
        overlayDiv.style.display = "none";
        imgElement.src = "";
});
