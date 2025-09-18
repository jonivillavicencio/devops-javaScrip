/**
 * @jest-environment jsdom
 */

const fs = require('fs')
const path = require('path')

// Cargar el contenido de tu archivo JS
const archivo = fs.readFileSync(path.resolve(__dirname, './frutas.js'), 'utf8')
eval(archivo)

describe('Funciones de manejo de frutas', () => {
  beforeEach(() => {
    // Reiniciar DOM
    document.body.innerHTML = `
      <ul id="listaFrutas"></ul>
      <input id="nuevaFruta" />
      <input id="posicionFruta" />
      <input id="cantidadFruta" />
      <div id="resultadoFrutas"></div>
    `

    // Reiniciar array de frutas
    global.frutas = ["banana", "manzana", "pera"]

    // Mock de alert y console.log
    global.alert = jest.fn()
    global.console.log = jest.fn()
  })

  test('mostrarFrutas agrega li al ul', () => {
    mostrarFrutas()
    const lista = document.getElementById('listaFrutas')
    expect(lista.children.length).toBe(3)
    expect(lista.children[0].innerText).toBe('banana')
  })

  test('agregarFruta agrega una nueva fruta y llama a alert', () => {
    const input = document.getElementById('nuevaFruta')
    input.value = 'kiwi'
    agregarFruta()
    expect(global.frutas).toContain('kiwi')
    expect(global.alert).toHaveBeenCalledWith('Nueva fruta agregada: kiwi')
    const lista = document.getElementById('listaFrutas')
    expect(lista.children.length).toBe(4)
  })

  test('eliminarFruta elimina las frutas indicadas', () => {
    document.getElementById('posicionFruta').value = '1'
    document.getElementById('cantidadFruta').value = '1'
    eliminarFruta()
    expect(global.frutas).toEqual(["banana", "pera"])
  })

  test('transformarFrutas muestra frutas en mayúscula', () => {
    transformarFrutas()
    const resultado = document.getElementById('resultadoFrutas')
    expect(resultado.innerText).toBe('Frutas en mayuscula: BANANA, MANZANA, PERA')
  })
})
