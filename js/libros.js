let libros= JSON.parse(localStorage.getItem('libros')) || []

let editando = false;
let indiceEditar = null;
let ordenAscendente = false;

const agregarLibro = () =>{
    const titulo = document.getElementById('titulo').value.trim()
    const autor = document.getElementById('autor').value.trim()
    const anio = document.getElementById('anio').value
    const genero = document.getElementById('genero').value.trim()
    const leido = document.getElementById("leido").checked

    if(titulo !== '' && autor !== '' && anio !=='' && genero !== ''){

        if(editando){
            libros[indiceEditar] = { titulo, autor, anio, genero, leido }
            editando = false
            indiceEditar = null
            document.querySelector('button[type="submit"]').innerText = 'Agregar libro'

        }else{
            const yaExiste = libros.some(libro =>
                libro.titulo.toLowerCase() === titulo.toLowerCase() &&
                libro.autor.toLowerCase() === autor.toLowerCase() 
            )
            if(yaExiste){
                alert("Este libro ya esta resgistrado en el listado")
                return
            }
            libros.push({ titulo, autor, anio, genero, leido})
        }

        localStorage.setItem('libros', JSON.stringify(libros))

        console.log('libros', libros)

        renderizarLibros()
        mostrarResumen()
        actualizarSelectGenero()

        document.getElementById('crearLibros').reset()
        document.getElementById("leido").checked = false
        document.getElementById('titulo').value = ''
        document.getElementById('autor').value = ''
        document.getElementById('anio').value = ''
        document.getElementById('genero').value = ''

    }
}
const filtrarLibros = () =>{
    const texto = document.getElementById('busqueda').value.toLowerCase()
    const librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(texto))

    renderizarLibros(librosFiltrados)
}
const renderizarLibros = (lista = libros) =>{
    const tabla = document.getElementById('tablaLibros').querySelector('tbody')
   
    tabla.innerText = ''

    lista.forEach(libro => {
        const indexReal = libros.indexOf(libro)
        const fila = document.createElement('tr')

        fila.innerHTML=`
        <td>${indexReal + 1}</td>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.anio}</td>
        <td>${libro.genero}</td>
        <td>
            <button onclick="editarLibro(${indexReal})">Editar</button>
            <button onclick="eliminarLibro(${indexReal})">Eliminar</button>
        </td>
        <td>${libro.leido ? '✅' : '❌'}</td> 
        `
        tabla.appendChild(fila)
    })
}
const editarLibro = (index) => {
    const libro = libros[index]
    document.getElementById('titulo').value = libro.titulo
    document.getElementById('autor').value = libro.autor
    document.getElementById('anio').value = libro.anio
    document.getElementById('genero').value = libro.genero
    document.getElementById("leido").checked = libro.leido;
    document.querySelector('button[type="submit"]').innerText = 'Actualizar libros'
    editando = true
    indiceEditar = index
}
const mostrarResumen = () =>{
    const resumen = document.getElementById('resumenLibros')
    if(libros.length === 0){
        resumen.innerText = 'No existen libros cargados'
        return;
    }
    const total = libros.length 
    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0)
    const promedio = Math.round(sumaAnios / total)
    
    const posterioresA2010 = libros.filter(libro => libro.anio > 2010).length
    
    const libroReciente = libros.reduce((reciente, libro)=> (libro.anio > reciente.anio ? libro : reciente), libros [0])
    
    const libroAntiguo = libros.reduce((reciente, libro)=> (libro.anio < reciente.anio ? libro : reciente), libros [0])
    
    const leidos = libros.filter(libro => libro.leido).length
    const noLeidos = total - leidos

    resumen.innerHTML = `
        <p>Total de libros: ${total}</p>
        <p>Promedio del año de publicación: ${promedio}</p>
        <p>Libros posteriores al año 2010: ${posterioresA2010}</p>
        <p>Libro más reciente: ${libroReciente.titulo} (${libroReciente.anio})</p>
        <p>Libro más antiguo: ${libroAntiguo.titulo} (${libroAntiguo.anio})</p>
        <p>Leídos: ${leidos}</p>
        <p>No leídos: ${noLeidos}</p>
    `
}
const actualizarSelectGenero = () =>{
    const select = document.getElementById('filtroGenero')
    const generosUnicos = [...new Set(libros.map(libro=> libro.genero))]

    select.innerHTML = `<option value="todas">Todas</option>`
    generosUnicos.forEach(genero=>{
        const option = document.createElement("option")
        option.value = genero
        option.text = genero
        select.appendChild(option)
    })
}
const filtrarPorGenero = () =>{
    const genero = document.getElementById('filtroGenero').value

    if(genero === 'todas'){
        renderizarLibros()
    }else{
        const librosFiltrados = libros.filter(libro => libro.genero === genero)
        renderizarLibros(librosFiltrados)
    }
}
const eliminarLibro =(index) =>{
    libros.splice(index, 1)

    localStorage.setItem('libros', JSON.stringify(libros))
    
    renderizarLibros()
}
const ordenarPorAnio = () =>{
    const librosOrdenados = [...libros].sort((a,b)=>{
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio
    })

    ordenAscendente = !ordenAscendente
    renderizarLibros(librosOrdenados)
}
function filtrarPorLectura() {
  const filtro = document.getElementById("filtroLectura").value;

  let filtrados = [...libros]

  if (filtro === "leidos") {
    filtrados = filtrados.filter(libro => libro.leido);
  } else if (filtro === "no-leidos") {
    filtrados = filtrados.filter(libro => !libro.leido);
  }

  renderizarLibros(filtrados)
}
document.addEventListener('DOMContentLoaded', () => {
    renderizarLibros()
    mostrarResumen()
    actualizarSelectGenero()
    filtrarPorLectura()
})