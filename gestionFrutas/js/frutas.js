global.frutas = ["banana", "manzana", "pera"]
//empieza
function mostrarFrutas() {
  const listaFrutas = document.getElementById("listaFrutas")
  listaFrutas.innerHTML = ''
  global.frutas.forEach(fruta => {
    const li = document.createElement('li')
    li.innerText = fruta
    listaFrutas.appendChild(li)
  })
}

function agregarFruta() {
  const nuevaFruta = document.getElementById('nuevaFruta').value
  global.frutas.push(nuevaFruta)
  alert(`Nueva fruta agregada: ${nuevaFruta}`)
  console.log("frutas", global.frutas)
  mostrarFrutas()
}

function eliminarFruta() {
  const posicionFruta = parseInt(document.getElementById('posicionFruta').value, 10)
  const cantidadFrutas = parseInt(document.getElementById('cantidadFruta').value, 10)
  global.frutas.splice(posicionFruta, cantidadFrutas)
  console.log("frutas", global.frutas)
  mostrarFrutas()
}

function transformarFrutas() {
  const resultadoFrutas = document.getElementById('resultadoFrutas')
  const listaFrutasEnMayuscula = global.frutas.map(item => item.toUpperCase())
  console.log(listaFrutasEnMayuscula)
  resultadoFrutas.innerText = "Frutas en mayuscula: " + listaFrutasEnMayuscula.join(', ')
}

module.exports = {
  mostrarFrutas,
  agregarFruta,
  eliminarFruta,
  transformarFrutas
}
