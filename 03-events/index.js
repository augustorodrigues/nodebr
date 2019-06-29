const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {
  // implementando todos os métodos de 'events'
}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function (click) {
  console.log('um usuario clicou', click)
})

meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function () {
  meuEmissor.emit(nomeEvento, 'no número: ' + count++)
}, 1000)



// Event Emitter funcionando para ações contínuas
// const stdin = process.openStdin()
// stdin.addListener('data', function (value) {
//   console.log(`voce digitou: ${value.toString().trim()}`)
// })

// Exemplo com promise que executa uma única vez
// const stdin = process.openStdin()

// function main() {
//   return new Promise(function (resolve, reject) {
//     stdin.addListener('data', function (value) {
//       // console.log(`voce digitou: ${value.toString().trim()}`)
//       return resolve(value)
//     })
//   })
// }
// main().then(function (resultado) {
//   console.log('resultado', resultado.toString());
// })