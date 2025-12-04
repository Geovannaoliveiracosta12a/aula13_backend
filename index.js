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

//rota para o login

app.post("/login", (request, response) => {
    const { email, password } = request.body;

    const selectCommand = "SELECT * FROM geovannacosta_02ta WHERE email = ?";

    database.query(selectCommand, [email], (error, users) => {
        if (error) {
            console.log(error);
            return response.status(500).json({ message: "Erro no servidor" });
        }

        if (users.length === 0 || users[0].password !== password) {
            return response.status(401).json({ message: "Usuário ou senha incorretos!" });
        }

        response.json({
            id: users[0].id,
            name: users[0].name
        });
    });
});


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