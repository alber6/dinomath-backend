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

//estas líneas de código se han añadido para que render pueda dejar esta backend en la nube 
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor levantado en: ${PORT}`)
});
