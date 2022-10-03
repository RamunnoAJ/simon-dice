const $bloques = document.querySelectorAll('.bloque')
const $botonJugar = document.querySelector('.btn-jugar')
const $tablero = '.contenedor__bloques'

let patronMaquina = []
let patronUsuario = []
let dificultadMilisegundos = 0

$botonJugar.addEventListener('click', () => {
  bloquearClickUsuario()
  patronMaquina = []
  manejarJuego()
})

function manejarJuego() {
  manejarEstado('Turno de la máquina')
  mostrarElemento('.estado')
  mostrarElemento($tablero)
  bloquearClickUsuario()
  manejarDificultad()

  const nuevoCuadro = obtenerCuadroAleatorio()
  patronMaquina.push(nuevoCuadro)

  const RETRASAR_TURNO_USUARIO =
    (patronMaquina.length + 1) * dificultadMilisegundos

  patronMaquina.forEach(function (cuadro, indice) {
    bloquearClickUsuario()
    const RETRASO = (indice + 1) * dificultadMilisegundos

    setTimeout(() => {
      iluminarCuadro(cuadro)
    }, RETRASO)
  })

  setTimeout(() => {
    manejarEstado(
      `Es tu turno, esta es la ronda número ${patronMaquina.length}`
    )
  }, RETRASAR_TURNO_USUARIO)

  patronUsuario = []
}

function manejarClickUsuario(e) {
  const elementoClickeado = `#${e.target.id}`

  iluminarCuadro(elementoClickeado)
  setTimeout(() => {
    apagarCuadro(elementoClickeado)
    desbloquearClickUsuario()
  }, dificultadMilisegundos)

  patronUsuario.push(elementoClickeado)

  verificarPatrones(elementoClickeado)
}

function verificarPatrones(patron) {
  const cuadroSeleccionadoMaquina = patronMaquina[patronUsuario.length - 1]
  if (patron != cuadroSeleccionadoMaquina) {
    perderJuego()
    return
  }
  if (patronUsuario.length === patronMaquina.length) {
    bloquearClickUsuario()
    setTimeout(manejarJuego, dificultadMilisegundos)
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
  setTimeout(() => {
    apagarCuadro(cuadroAleatorio)
    desbloquearClickUsuario()
  }, dificultadMilisegundos - 500)
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
  ocultarElemento($tablero)
}

document.querySelector('.lento').addEventListener('click', () => {
  dificultadMilisegundos = 1500
})

document.querySelector('.normal').addEventListener('click', () => {
  dificultadMilisegundos = 1250
})

document.querySelector('.rapido').addEventListener('click', () => {
  dificultadMilisegundos = 900
})

function manejarDificultad() {
  if (dificultadMilisegundos === 0) {
    dificultadMilisegundos = 1250
  }
}
