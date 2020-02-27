const express = require('express')
const app = express()

app.get('/', (req, res) => {

})

app.listen(3000, () => {
  class Pessoa {
    constructor(name, email, telephone_number) {
      this.name = name
      this.email = email
      if (telephone_number) {
        this.telephone_number = telephone_number
      } else {
        this.telephone_number = ''
      }
      this.endereco = {}
    }
  }

  class Cliente extends Pessoa {
    constructor(name, email, cpf, telephone_number) {
      super(name, email, telephone_number)
      this.cpf = cpf
    }
  }

  class Fornecedor extends Pessoa {
    constructor(name, email, telephone_number, cnpj) {
      super(name, email, telephone_number)
      this.cnpj = cnpj
    }
  }

  const cliente1 = new Cliente("Thiago", "teste@gmail.com", "000.000.000-00", "(00)0000-1000")
  const fornecedor1 = new Fornecedor("teste", "teste@teste.com", "(00)0000-0000", "000000000000000") 

  class Endereco {
    constructor(cep, rua, numero, cidade, estado) {
      if (cep === undefined) {
        throw new Error("Cep é obrigatório");
      }
      this.cep = cep;
      this.rua = rua;
      this.numero = numero;
      this.cidade = cidade;
      this.estado = estado;
    }
  }

  const endereco1 = new Endereco("87055-555", "rua sei la", "152", "Maringá", "Paraná")
  cliente1.endereco = endereco1

  console.log(cliente1)
})