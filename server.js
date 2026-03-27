// importação do express
const express = require('express') // framework para criar o servidor e lidar com rotas

const { criarBanco } = require('./database') // a chave que vai abrir a conexao com o banco de dados 

const app = express() //lgando o motor do sercidor 

app.use(express.json()) // para o servidor entender os dados em formato json

app.get('/', (req, res) => {

    res.send(`
    
    <body>
        
        <h1>Bem-vindo ao Zela Cidade</h1>
        <h2>Gestão de problemas urbanos </h2>
        <p> Endponint para o gerenciamento de incidentes urbanos. </p>


    </body>
    
    `)

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`)
    criarBanco()
})

// rota de listagem de incidentes

app.get('/incidentes', async (req, res) => {

    const db = await criarBanco()

    const listasIncidentes = await db.all(`SELECT * FROM incidents`)

    res.json(listasIncidentes)
})


// Rota especifica 

app.get("/incidentes/:id", async (req, res) => {

    const { id } = req.params

    const db = await criarBanco()

    const incidenteEspecifico = await db.all(`SELECT * FROM incidents WHERE id = ?`, [id])

    res.json(incidenteEspecifico)

})


// Rotas POST novos registros / Endpoints 

app.post("/incidentes", async (req, res) => {

    const { tipo_problema, localizacao, descricao, prioridade,
        nome_solicitante, data_registro, hora_registro } = req.body

    const db = await criarBanco()

    await db.run(`

            INSERT INTO incidents (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro)
            VALUES (?, ?, ?, ?, ?, ?, ?)
         `,

        [tipo_problema, localizacao, descricao, prioridade,
            nome_solicitante, data_registro, hora_registro])

    res.send(`Incidente novo registrado : ${tipo_problema} na data ${data_registro} por ${nome_solicitante} `)

})


// Rota de atualização de status

app.put("/incidentes/:id", async (req, res) => {

    // pega o id do incidente a ser atualizado a partir dos parâmetros da URL
    const { id } = req.params

    //pega os dados requisitados que sera atualiados
    const { descricao, prioridade, status_resolucao } = req.body

    // abre a conecao com o banco de dados
    const db = await criarBanco()

    await db.run(`

        UPDATE incidents 
        SET descricao = ?, 
        prioridade = ?,
        status_resolucao = ?
        WHERE id = ?

    `, 
    
    [descricao, prioridade, status_resolucao, id]

)

// resposta para o cliente confirmando a atualização do incidente
res.send(` O incidente ${id} foi atualizado com sucesso!` )

    })


// Rota de exclusão de incidente

app.delete("/incidentes/:id", async (req, res) => {

    // pega o id do incidente a ser excluido a partir dos parâmetros da URL
    const { id } = req.params       

    // abre a conecao com o banco de dados
    const db = await criarBanco()
    
    // executa a query de exclusão do incidente com o id especificado
    await db.run(`
        DELETE FROM incidents WHERE id = ?`,
         [id] )

    // resposta para o cliente confirmando a exclusão do incidente
    res.send(` O incidente ${id} foi excluido com sucesso!`)

})


