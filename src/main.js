const $bloques = document.querySelectorAll('.bloque')
const $botonJugar = document.querySelector('.btn-jugar')
const $tablero = '.contenedor__bloques'
const $botonReiniciar = document.querySelector('.btn-reiniciar')

let patronMaquina = []
let patronUsuario = []
let dificultadMilisegundos = 0

$botonJugar.addEventListener('click', () => {
  $botonReiniciar.classList.remove('oculto')
  $botonJugar.classList.add('oculto')
  bloquearClickUsuario()
  manejarJuego()
})

$botonReiniciar.addEventListener('click', () => {
  reiniciarJuego()
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
  setTimeout(() => {
    apagarCuadro(cuadroAleatorio)
    desbloquearClickUsuario()
  }, dificultadMilisegundos - 500)
}

function apagarCuadro(cuadroAleatorio) {
  document.querySelector(cuadroAleatorio).className = 'bloque'
}

function bloquearClickUsuario() {
  $bloques.forEach((bloque) =>
    bloque.removeEventListener('click', manejarClickUsuario)
  )
}

function desbloquearClickUsuario() {
  $bloques.forEach((bloque) =>
    bloque.addEventListener('click', manejarClickUsuario)
  )
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
  reiniciarJuego()
})

document.querySelector('.normal').addEventListener('click', () => {
  dificultadMilisegundos = 1250
  reiniciarJuego()
})

document.querySelector('.rapido').addEventListener('click', () => {
  dificultadMilisegundos = 900
  reiniciarJuego()
})

function manejarDificultad() {
  if (dificultadMilisegundos === 0) {
    dificultadMilisegundos = 1250
  }
}

function reiniciarJuego() {
  patronMaquina = []
  setTimeout(manejarJuego, 1000)
}
