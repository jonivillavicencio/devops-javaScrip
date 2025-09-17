// Hacemos frutas global para poder resetearlo en los tests
global.frutas = ["banana", "manzana", "ciruela"]

function mostrarFrutas() {
    const listaFrutas = document.getElementById("listaFrutas")
    listaFrutas.innerHTML = ''
    frutas.forEach(fruta => {
        const li = document.createElement('li')
        li.innerText = fruta
        listaFrutas.appendChild(li)
    })
}

function agregarFruta() {
    const nuevaFruta = document.getElementById('nuevaFruta').value
    frutas.push(nuevaFruta)
    alert(`Nueva fruta agregada: ${nuevaFruta}`)
    console.log("frutas", frutas);
    mostrarFrutas()
}

function eliminarFruta() {
    const posicionFruta = parseInt(document.getElementById('posicionFruta').value, 10)
    const cantidadFrutas = parseInt(document.getElementById('cantidadFruta').value, 10)
    frutas.splice(posicionFruta, cantidadFrutas)
    console.log("frutas", frutas);
}

function transformarFrutas() {
    const resultadoFrutas = document.getElementById('resultadoFrutas')
    const listaFrutasEnMayuscula = frutas.map(item => item.toUpperCase())
    console.log(listaFrutasEnMayuscula);
    resultadoFrutas.innerText = "Frutas en mayuscula: " + listaFrutasEnMayuscula.join(', ')
}

// Exportamos funciones para Jest
module.exports = {
    mostrarFrutas,
    agregarFruta,
    eliminarFruta,
    transformarFrutas
}
