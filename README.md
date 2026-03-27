# 🚀 Zela Cidade

## 📌 Sobre o Projeto

A API **Zela Cidade** foi criada para registrar e gerenciar problemas urbanos, como:

- Buracos 
- Vazamentos
- Lixo 
- Iluminação

Essa API nos permite criar registros, visualizar, atualizar e deletar ocorrencias

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Sqlite
- Sqlite3
- Postman
- Nodemon 

---


## 📦 Instalação

`npm install `

----

## ▶️ Como executar 
```bash
npm run dev
```

`http://localhost:3000`
[ Clique Aqui ](http://localhost:3000)

---

## 🗄️Banco de Dados 

O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

## 🧾Tabela

|Campo             |               Descrição|
|--------------    |------------------------|
|id                | identificador unico    |
|tipo_problema     | tipo do problema       |
|localizacao       | onde ocorreu           |
|descricao         | Detalhes do incidentes |
|prioridade        | baixa, media e alta    |
|nome_solicitante  | Quem registrou         |
|data_registro     | data do registro       |
|hora_registro     |hora do registro        |
|status_resolucao  | (Padrão : Pendente)    |


---

## 🔗Endpoints
### Rota Inicial

```http
GET / 

```

Retorna uma página HTML simples com informações da API.

---

### Rota para testar todos os incidentes

```http
GET /incidentes 

```
Retorna tosos os registrodo banco de dados

---

### Rota para buscar um incidente especifico

```http
GET /incidentes/:id

```
Ex: /incidentes/1

Retorna uma ocorrencia especifica

----

### Rota para criar um novo incidente

```http
POST /incidentes
```

### Body (JSON)

```json

    {
        "id": 1,
        "tipo_problema": " Iluminação",
        "localizacao": "Rua das Flores",
        "descricao": "Poste queimado",
        "prioridade": "Média",
        "nome_solicitante": "Salen",
        "data_registro": "16/03/2026",
        "hora_registro": "14:30",
        "status_resolucao": "Em Analise"
    }

```


## Rota para atualizar um incidente

```http
PUT /incidentes/:id
```

### Body (JSON)

```json

    {
        
        "descricao": "Poste queimado",
        "prioridade": "Média",
        "status_resolucao": "Resolvido"
    }

```
### Rota para deletar um incidente

```http
DELETE /incidentes/:id 
```
## 🔐 Segurança

A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?

```

Isso evita o SQL injection.

---

## 📚Conceitos

- CRUD ( Create, Read, Update, Delete) 
- Rotas com Express
- Metodos? Verbos HTTP

---

## Projeto Educacional
Esse projeto foi desenvolvido para fins de aprendizado em back-end com Node.js.

---




<!-- ## Esses emojis é um padrão em praticamente TODO README:

## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
## 🛠️ Tecnologias
## 📦 Instalação
## ▶️ Como Executar
## ⚙️ Configurações
## 🗄️ Banco de Dados
## 🔗 Endpoints
## 🔐 Segurança
## 📚 Conceitos
## 💡Dicas / Melhorias
## 👩‍💻 Autor
---
## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 🧾 Tabela
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença -->

