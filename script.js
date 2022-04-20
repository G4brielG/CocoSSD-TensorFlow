const salida = document.getElementById("salida")
const buttonPredic = document.getElementById("predict")
const img = document.getElementById('img');

// valida si hay un archivo, de lo contrario desabilita el boton "predecir"
if(file) {
    buttonPredic.className = "btn btn-primary disabled";
} else {
    buttonPredic.className = "btn btn-primary";
}

function mostrar() {
    salida.innerHTML = ""
    salida.className = ""
    let archivo = document.getElementById("file").files[0];
    let reader = new FileReader();
    if (file) {
        //si se selecciona un archivo habilita el botón "predecir"
        buttonPredic.className = "btn btn-primary";
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            // renderiza la imagen seleccionada
            img.src = reader.result;
        }
    }
}

function predecir() {
    // cada vez que se presione el boton "predecir" va a modificar en contenido y la clase del div "salida"
    salida.innerHTML = ""
    salida.className = ""
    
    // asigna la clase spinner al div "salida"
    salida.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>'

    cocoSsd.load().then(model => {
        // vacía el contenido del div
        salida.innerHTML = ""
        // asigna la clase para centrar el texto
        salida.className = "text-center"
        
        model.detect(img).then(predictions => {
            // realiza un mapeo del array "predictions"
            //por cada elemento encontrado crea un elemento html para mostrar cada predicción
            predictions.map((item) => {
                const result = document.createElement("h3")
                result.textContent = item.class
                salida.appendChild(result);
            });
        });
    });
}