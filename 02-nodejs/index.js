/*
  Exemplo básico de sincronia de funções em JavaScript utilizando timeout

  0 Obter um usuário
  1 Obter o número de telefone de um usuário a partir de seu id
  2 Obter o endereço do usuário pelo id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "000000000",
      ddd: '75'
    })
  }, 2000)
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Rua 01",
      numero: 0
    }
  )}, 2000)
}

function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
  // null || "" || 0 === false
  if(error) {
    console.error('DEU RUIM EM USUÁRIO', error)
    return
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if(error1) {
      console.error('DEU RUIM EM TELEFONE', error1)
      return
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if(error2) {
        console.error('DEU RUIM EM ENDERECO', error2)
        return
      }

      console.log('usuario', usuario)
      console.log('telefone', telefone)
      console.log('endereco', endereco)
    })
  })
})

// const telefone = obterTelefone(usuario.id)

// console.log('usuario', usuario)
// console.log('telefone', telefone)