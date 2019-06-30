const service = require('./service')

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = []
  for (let indice = 0; indice < this.length; indice++) {
    const resutado = callback(this[indice], indice)
    novoArrayMapeado.push(resutado)
  }
  return novoArrayMapeado
}

async function main() {
  try {
    const results = await service.obterPessoas('a')
    // const names = []

    // results.results.forEach(function (pessoa) {
    //   names.push(pessoa.name)
    // })

    // const names = results.results.map(function (pessoa) {
    //   return pessoa.name
    // })

    // const names = results.results.map(pessoa => pessoa.name)

    const names = results.results.meuMap((pessoa, indice) => {
      return `[${indice}] ${pessoa.name}`
    })

    console.log(`names`, names)
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

main()