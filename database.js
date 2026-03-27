const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

// Criando uma função assíncrona
const criarBanco = async () => {

  const db = await open({

    filename: "./database.db",
    driver: sqlite3.Database

  })

  // tabelas de incidentes
  await db.exec(`
      
        CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_problema TEXT,
        localizacao TEXT,
        descricao TEXT,
        prioridade TEXT,
        nome_solicitante TEXT,
        data_registro TEXT,
        hora_registro TEXT,
        status_resolucao TEXT DEFAULT 'Pendente'
      )
    `)

  //console.log("Banco de dados configurado : A tabela de incidentes foi criada com sucesso! ")

  // Insert - c do CRUD - create



const checagem = await db.get(`SELECT COUNT(*) As total FROM incidents WHERE descricao = "Poste queimado"`)



if (checagem.total === 0) {

  await db.exec(`

    INSERT INTO incidents (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro)
    VALUES (" Iluminação", "Rua das Flores", "Poste queimado", "Média", "Salen", "16/03/2026", "14:30"),
            ("Pavimentação", "Avenida Central", "Buraco na via", "Alta", "Salendra", "17/03/2026", "09:15"),
            ("Sinalização", "Rua dos Pinheiros", "Semáforo com defeito", "Alta", "Sa", "18/03/2026", "11:45"),
            ("Limpeza Urbana", "Praça da Liberdade", "Lixo acumulado", "Média", "leticia", "19/03/2026", "16:00"),
            ("Árvores e Vegetação", "Parque das Águas", "Árvore caída", "Alta", "tata", "20/03/2026", "08:30"),
            ("Iluminação", "Rua das Acácias", "Luminária piscando", "Baixa", "julia", "21/03/2026", "19:00")

  `)

  } else {

   // console.log( `banco pronto com ${checagem.total} incidentes já registrados. ` )

  }



  // Select - r do CRUD - read 

 const todosIncidentes = await db.all(`SELECT * FROM incidents`)

// console.log("Todos os incidentes registrados:")
 //console.table(todosIncidentes)


// exemplo de SELECT especifico - buscando incidentes com prioridade "Médida"

const chamadosJulia = await db.all(`SELECT * FROM incidents WHERE nome_solicitante = "julia"`)

//console.log("Incidentes registrados por Julia:")
//console.table(chamadosJulia)


// UPDATE 

await db.run(`
  UPDATE incidents 
  SET status_resolucao = "Em Analise"
  WHERE data_registro = "16/03/2026" `)

//console.log("Status atualizado para os incidentes registrados em 16/03/2026")

// UPDATE 

await db.run(`
  UPDATE incidents 
  SET status_resolucao = "Resolvido"
  WHERE tipo_problema = "Pavimentação"`)

//console.log("Status atualizado para os incidentes com tipo 'Pavimentação' ")




// DELETE 

await db.run(`
  DELETE FROM incidents 
  WHERE id = 2
`)

//console.log("Incidente com ID 2 pavimentação foi deletado porque foi resolvido")


// RRElatorio final - mostrando o status atualizado dos incidentes

//console.log("Relatório atualizado dos incidentes:")

const resultadoFinal = await db.all(`SELECT * FROM incidents`)
//console.table(resultadoFinal)




return db;

};

module.exports = {criarBanco}