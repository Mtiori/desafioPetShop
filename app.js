const express = require('express')
const app = express()
const port = 3000;
const mysql = require('mysql2');
 

app.listen(port , () =>{

    class Pessoa {
        constructor(nome, email) {
          this.nome = nome;
          this.email = email;
          this.telefone = [];
          this.endereco = {};
        }
      }
    
      class Cliente extends Pessoa {
        constructor(nome, email, cpf) {
          super(nome, email)
          this.cpf = cpf
        }
      }
    
      class Fornecedor extends Pessoa {
        constructor(nome, email, cnpj) {
          super(nome, email)
          this.cnpj = cnpj
        }
      }
    
      class Endereco {
          constructor (rua, numero, bairro, cep, cidade, estado, complemento){
              this.rua = rua;
              this.numero = numero;
              this.bairro = bairro;
              this.cep = cep;
              this.cidade = cidade;
              this.estado = estado;

              if (complemento){
                  this.complemento = complemento;
              }else{
                  this.complemento = '';
              }
          }
          
          
        }
      class Telefone {
        constructor (ddi, ddd, numero, descricao){
          if (ddi == undefined){
            this.ddi = 55;
          }
            this.ddi = ddi;
            this.ddd = ddd;
            this.numero = numero;
            this.descricao = descricao;
        }
      }
    
      const cliente1 = new Cliente("Joao", "joao@mail.com", "000.000.000-00")
      const fornecedor1 = new Fornecedor("Juana", "Juana@teste.com", "(00)0000-0000", "000000000000000")
      //console.log(fornecedor1)
      const endereco1 = new Endereco("rua teste", 1004, "Residencial Teste", "00552245-6", "Maringá", "Paraná")
      cliente1.endereco = endereco1;
      let telefoneC1 = new Telefone(55, 44, 998150593, "");
      let telefoneF1 = new Telefone(52, 41, 988811092, "empresa");
      cliente1.telefone.push(telefoneC1);
      fornecedor1.telefone.push(telefoneF1);
      //console.log(cliente1)
      //console.log(fornecedor1)

// | CONECÇÃO COM O BANCO |
      
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "petshop"
      });
      console.log('Initialized..');

// | SELECTS |

      const selectAllCliente = () => connection.query(
        'SELECT * FROM cliente', (err, result) => {
            if (err){
              throw err;
            }
            console.log(result);
        }
      );

      const selectAllFornecedor = () => connection.query(
        'SELECT * FROM fornecedor', (err, result, fields) => {
            if (err){
              throw err;
            }
            console.log(result);
        }
      );

      const selectClienteETelefones = () => connection.query(
        'SELECT * FROM cliente c inner join telefone t on c.id = t.id_Cliente', (err, result, fields) =>{
          if (err){
            throw err;
          }
          console.log(result)
        }
      );

// | DELETES |
      const deleteAllCliente = () => connection.query(
        'DELETE FROM cliente where id>0', (err, result) => {
          if (err){
            throw err;
          }
          console.log("Linhas afetadas: "+ result.affectedRows);
        }
      )

      const deleteAllFornecedor = () => connection.query(
        'DELETE FROM fornecedor where id>0', (err, result) => {
          if (err){
            throw err;
          }
          console.log("Linhas afetadas: "+ result.affectedRows);
        }
      )
      
// | INSERTS |

      let inserirSqlCliente = (id, nome, email, cpf) => connection.query(
        `INSERT INTO cliente (id, nome, email, cpf) VALUES ('${id}', '${nome}', '${email}', '${cpf}')`, (err) => {
        if (err) throw err;
        
        console.log("1 linha inserida");
      });
      

      let inserirSqlFornecedor = (id, nome, email, cnpj) => connection.query(
        `INSERT INTO fornecedor (id, nome, email, cnpj) VALUES ('${id}', '${nome}', '${email}', '${cnpj}')`, (err) => {
        if (err) throw err;
        
        console.log("1 linha inserida");
      });

      let inserirSqlTelefoneCliente = (id, ddi, ddd, numero, descricao, id_Cliente) => connection.query(
        `INSERT INTO telefone (id, ddi, ddd, numero, descricao, id_Cliente) VALUES ('${id}', '${ddi}', '${ddd}', '${numero}', '${descricao}', '${id_Cliente}')`, (err) => {
        if (err) throw err;
        
        console.log("1 linha inserida");
      });

      let inserirSqlTelefoneFornecedor = (id, ddi, ddd, numero, descricao, id_Fornecedor) => connection.query(
        `INSERT INTO telefone (id, ddi, ddd, numero, descricao, id_Fornecedor) VALUES ('${id}', '${ddi}', '${ddd}', '${numero}', '${descricao}', '${id_Fornecedor}')`, (err) => {
        if (err) throw err;
        
        console.log("1 linha inserida");
      });




// | CONECÇÃO COM O BANCO | 

      connection.query(
        'SELECT * FROM cliente', (err, result) =>{
            let lista = [];
            lista = result;

            let c1 = new Cliente()
            lista.forEach( l => {
              //console.log(l)
              c1.nome = l.nome;
              c1.email = l.email;
              c1.cpf = l.cpf
            });
      });

      connection.query(
        'SELECT * FROM telefone', (err, resultset, fields)=>{
          const telefones = [];
          resultset.forEach(data=>{
            telefones.push(new Telefone(
              data.ddi,
              data.ddd,
              data.numero))
          })
          
        }
      )
})