const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DB);
        console.log("Conexión con éxito con la base de datos ✅")
    } catch (error) {
        console.log("Error de conexión con mongodb ❌")
        //si usas otra dirección ip, si esa dirección ip no se encuentra registrada y aceptada en mongodb, dará error al conectarse a la base de datos de mongo
    }
};

module.exports = { connectDB }