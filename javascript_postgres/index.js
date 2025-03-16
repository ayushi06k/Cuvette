const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "Britney@201020",
    host: "localhost",
    port: 5432,
    database: "Jobs"
})

client.connect()
.then(() => console.log("Connected successfuly"))
.catch(e => console.log)
.finally(() => client.end())