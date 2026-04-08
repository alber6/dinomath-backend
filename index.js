require("dotenv").config()
const { connectDB } = require("./src/config/db")
const usersRouter = require("./src/api/routes/user")

const express = require("express")
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())

connectDB();


app.use("/api/v1/users", usersRouter);
// comentado porque no se va a usar 

app.use("", (req, res, next) => {
    console.error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    return res.status(404).json("Ruta no encontrada.")
});

app.listen(3000, () => {
    console.log("Servidor levantado en: http://localhost:3000")
});
