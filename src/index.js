import express from "express"
import cors from "cors"
import mysql from "mysql2"


const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME}=process.env

const app = express()
const port = 3333


app.use(cors())
app.use(express.json())

app.get("/", (request, response) =>{

    const selectCommand = "SELECT name, email, age, nickname FROM geovannacosta_02ta"

    database.query(selectCommand, (error, users) => {
        if (error){
            console.log(error)
            return
        }

        response.json(users)
    })
})

app.post("/cadastrar", (request, response) => {
    const{ name, email, age, nickname, password} = request.body

    const insertCommand = `
    INSERT INTO geovannacosta_02ta(name, email, age, nickname, password)
    VALUES(?, ?, ?, ?, ?)
    `

    database.query(insertCommand, [name, email, age, nickname, password], (error) => {
        if (error){
            console.log(error)
            return
        }

        response.status(201).json({ Message: "Usuário cadastrado com sucesso"})
    })
})

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}!`)
})

const database = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10
})