const $bloques = document.querySelectorAll('.bloque')
const $botonJugar = document.querySelector('.btn-jugar')

let patronDeMaquina = []
let patronDeUsuario = []

$botonJugar.addEventListener('click', manejarJuego)

function manejarJuego() {
  manejarEstado('Turno de la máquina')
  mostrarElemento('.estado')
  bloquearClickUsuario()

  const nuevoCuadro = obtenerCuadroAleatorio()
  patronDeMaquina.push(nuevoCuadro)

  const RETRASAR_TURNO_USUARIO = (patronDeMaquina.length + 1) * 1000

  patronDeMaquina.forEach(function (cuadro, indice) {
    bloquearClickUsuario()
    const RETRASO = (indice + 1) * 1000

    setTimeout(() => {
      iluminarCuadro(cuadro)
    }, RETRASO)
  })

  setTimeout(() => {
    manejarEstado(
      `Es tu turno, esta es la ronda número ${patronDeMaquina.length}`
    )
  }, RETRASAR_TURNO_USUARIO)

  patronDeUsuario = []
}

function manejarClickUsuario(e) {
  const elementoClickeado = `#${e.target.id}`

  iluminarCuadro(elementoClickeado)

  patronDeUsuario.push(elementoClickeado)

  verificarPatrones(elementoClickeado)
}

function verificarPatrones(patron) {
  const cuadroSeleccionadoMaquina = patronDeMaquina[patronDeUsuario.length - 1]
  if (patron != cuadroSeleccionadoMaquina) {
    perderJuego()
    return
  }
  if (patronDeUsuario.length === patronDeMaquina.length) {
    bloquearClickUsuario()
    setTimeout(manejarJuego, 1000)
  }
}

function obtenerCuadroAleatorio() {
  const cantidadCuadros = 4
  let numeroCuadroAleatorio = Math.floor(Math.random() * cantidadCuadros) + 1

  if (numeroCuadroAleatorio === 1) {
    return '#cuadro-amarillo'
  }
  if (numeroCuadroAleatorio === 2) {
    return '#cuadro-azul'
  }
  if (numeroCuadroAleatorio === 3) {
    return '#cuadro-verde'
  }
  if (numeroCuadroAleatorio === 4) {
    return '#cuadro-rojo'
  }
}

function iluminarCuadro(cuadroAleatorio) {
  bloquearClickUsuario()
  document.querySelector(cuadroAleatorio).className = 'bloque activo'
  setTimeout(() => apagarCuadro(cuadroAleatorio), 1000)
  desbloquearClickUsuario()
}

function apagarCuadro(cuadroAleatorio) {
  document.querySelector(cuadroAleatorio).className = 'bloque'
}

function bloquearClickUsuario() {
  const $cuadroAmarillo = document.querySelector('#cuadro-amarillo')
  const $cuadroAzul = document.querySelector('#cuadro-azul')
  const $cuadroVerde = document.querySelector('#cuadro-verde')
  const $cuadroRojo = document.querySelector('#cuadro-rojo')

  $cuadroAmarillo.removeEventListener('click', manejarClickUsuario)
  $cuadroAzul.removeEventListener('click', manejarClickUsuario)
  $cuadroVerde.removeEventListener('click', manejarClickUsuario)
  $cuadroRojo.removeEventListener('click', manejarClickUsuario)
}

function desbloquearClickUsuario() {
  const $cuadroAmarillo = document.querySelector('#cuadro-amarillo')
  const $cuadroAzul = document.querySelector('#cuadro-azul')
  const $cuadroVerde = document.querySelector('#cuadro-verde')
  const $cuadroRojo = document.querySelector('#cuadro-rojo')

  $cuadroAmarillo.addEventListener('click', manejarClickUsuario)
  $cuadroAzul.addEventListener('click', manejarClickUsuario)
  $cuadroVerde.addEventListener('click', manejarClickUsuario)
  $cuadroRojo.addEventListener('click', manejarClickUsuario)
}

function mostrarElemento(elemento) {
  document.querySelector(elemento).classList.remove('oculto')
}

function ocultarElemento(elemento) {
  document.querySelector(elemento).classList.add('oculto')
}

function manejarEstado(nuevoEstado) {
  const $estado = document.querySelector('.estado')
  $estado.textContent = nuevoEstado
}

function perderJuego() {
  manejarEstado('Perdiste')
}
