const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function (callback) {
  const lista = []

  for(index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    if(!result) continue; // 0, "", null, undefined == false
    lista.push(item)
  }
  return lista
}

async function main() {
  try {
    const { results } = await obterPessoas('a')

    // por padrão precisa retornar um booleano para informar se deve incluir ou não na nova lista
    // true -> inclui na lista
    // false -> não inclui na nova lista
    // não encontrou = -1
    // encontrou = a posição no array
    // const familiaLars = results.filter(function (item) {
    //   const result = item.name.toLowerCase().indexOf('lars') !== -1
    //   return result
    // })
    
    const familiaLars = results.meuFilter((item, index, lista) =>  {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })

    const names = familiaLars.map(pessoa => pessoa.name)
    console.log(names)
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

main()