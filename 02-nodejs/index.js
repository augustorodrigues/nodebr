/*
  Exemplo básico de sincronia de funções em JavaScript utilizando timeout

  0 Obter um usuário
  1 Obter o número de telefone de um usuário a partir de seu id
  2 Obter o endereço do usuário pelo id
*/

// Método de sincronia de funções sem promises
// function obterUsuario(callback) {
//   setTimeout(function () {
//     return callback(null, {
//       id: 1,
//       nome: "Aladin",
//       dataNascimento: new Date()
//     })
//   }, 1000)
// }

// function obterTelefone(idUsuario, callback) {
//   setTimeout(() => {
//     return callback(null, {
//       telefone: "000000000",
//       ddd: '75'
//     })
//   }, 2000)
// }

// function obterEndereco(idUsuario, callback) {
//   setTimeout(() => {
//     return callback(null, {
//       rua: "Rua 01",
//       numero: 0
//     }
//   )}, 2000)
// }
 
// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || "" || 0 === false
//   if(error) {
//     console.error('DEU RUIM EM USUÁRIO', error)
//     return
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if(error1) {
//       console.error('DEU RUIM EM TELEFONE', error1)
//       return
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if(error2) {
//         console.error('DEU RUIM EM ENDERECO', error2)
//         return
//       }

//       console.log('usuario', usuario)
//       console.log('telefone', telefone)
//       console.log('endereco', endereco)
//     })
//   })
// })

// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  // quando der algum problema => reject(ERRO)
  // quando sucess => resolve
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('DEU RUIM DE VERDADE!'))

      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "987654321",
        ddd: "75"
      })
    }, 2000)
  })  
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Rua 01",
      numero: 100
    }
  )}, 2000)
}


const usuarioPromise = obterUsuario()
// para manipular o sucesso usamos a função .then
// para maipular erro usamos o .catch
// usuario -> telefone -> (última função) telefone
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: result
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    });
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}      
      Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}

    `)
  })
  .catch(function (error) {
    console.error('DEU RUIM', error)
  })
