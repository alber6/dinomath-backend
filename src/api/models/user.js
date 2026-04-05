const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default: "https://via.placeholder.com/150" }, // Avatar por defecto si no suben foto,
    roles: {
        type: String,
        default: "user",
        enum: [ "user", "admin" ]
    },
        // 2. DATOS EDUCATIVOS
        nombre: { type: String, required: true }, // Su nombre real para saludarle en el juego
        curso: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5, 6]
        },
        // 3. LA PARTIDA ACTUAL
        mascotaActiva: {
        nombre: { type: String, default: null }, 
        nivel: { type: Number, default: 1 },
        xp: { type: Number, default: 0 }
        },
        // 4. EL ÁLBUM DE CROMOS, guardamos el progreso de cada pokemon que tengamos para poder seguir subiendole más de nivel si queremos
        pets: [{
            nombre: { type: String },
            nivel: { type: Number, default: 1 },
            xp: { type: Number, default: 0 }
        }]
        // pets: [{ type: mongoose.Types.ObjectId, ref: "pets" }] no lo añadimos como un solo objeto sino que añadimos las variables nombre, nivel y xp para poder modificar bien los datos que hay dentro del objeto
    },
    {
     timestamps: true,
    }
);

//sirve para encriptar la contraseña y que no se vea
userSchema.pre("save", function () {
    // Solo encriptar si la contraseña es NUEVA o ha sido cambiada.
    // Si solo estamos actualizando la XP del niño, ignoramos este paso.
    if (this.isModified("password")){
        this.password = bcrypt.hashSync(this.password, 10);
    }
});
const User = mongoose.model("users", userSchema, "users");

module.exports = User;