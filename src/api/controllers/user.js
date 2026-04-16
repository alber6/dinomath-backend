const { generateSign } = require("../../utils/jwt");
const User = require("../models/user")
const bcrypt = require("bcrypt")


const register = async (req, res) => {
    try {
        const user = new User(req.body);
        //para poder añadir img al registrarse
        if(req.file) {
            user.img = req.file.path;
        };
        const userDuplicated = await User.findOne({ username: req.body.username})
        if(userDuplicated){
            return res.status(400).json("Este nombre de usuario ya existe. ¡Elige otro!")
        }

        const userSaved = await user.save();
        return res.status(200).json(userSaved);
    } catch (error) {
        console.log("❌ ERROR EXACTO DEL REGISTRO:", error);
        return res.status(400).json("Error al registrar el usuario.")
    }
}

const login = async (req, res) => {
    //Json WEb Token libreria genera llaves para nuestros usuarios y luego comprobar si con esas llaves te deja pasar por algun sitio o no
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if(!user){
            return res.status(400).json("Usuario o contraseña incorrecto.")
        }
        if(bcrypt.compareSync(password, user.password)){
            const token = generateSign(user._id);
            return res.status(200).json({ token, user })
        } else {
            return res.status(400).json("Usuario o contraseña incorrecto.")
        }
    } catch (error) {
        return res.status(400).json("Error")
    }
}

// se añade esta función para realizar llamada a la base de datos para actualizar el Authcontext y que al dar a seguir aventura porque el navegador ya nos conoce, actualice los datos nuevos que ha hecho el usuario en otro dispositivo
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Buscamos al usuario en la base de datos
        const user = await User.findById(id); 
        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        }
        // Devolvemos el usuario actualizado
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Error al sincronizar usuario");
    }
};

// No olvides exportarla al final del archivo junto a las demás:
// module.exports = { register, login, getUserById, ... }

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("pets");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("Error")
    }
} 

const changeRole = async (req, res) => {
    try {
        const { id } = req.params; // El ID del usuario al que vamos a ascender/descender
        const { roles } = req.body; // El nuevo rol ("admin" o "user")

        // Pequeña seguridad extra: verificar que el rol sea válido
        if (!['user', 'admin'].includes(roles)) {
            return res.status(400).json("Rol no válido");
        }

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { roles: roles }, 
            { new: true }
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        // evitar que un usuario borre la cuenta de otro
        const { id } = req.params;
        if (req.user.roles !== 'admin' && req.user._id.toString() !== id) {
            return res.status(403).json("No autorizado");
        }
        const userDeleted = await User.findByIdAndDelete(id);
        deleteFile(userDeleted.img)
        // Usamos un ternario para la respuesta
        return userDeleted 
            ? res.status(200).json({ msg: "Eliminado", userDeleted })
            : res.status(404).json("Usuario no encontrado");
    } catch (error) {
        return res.status(500).json("Error de servidor");
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (req.user.roles !== 'admin' && req.user._id.toString() !== id) {
            return res.status(403).json("No puedes modificar la partida de otro jugador.");
        }
        
        const user = await User.findById(id);
        if (!user) return res.status(404).json("Usuario no encontrado");

        // 1. ACTUALIZAR MOCHILA CON "MARK MODIFIED" (LA BALA DE PLATA)
        if (req.body.pets) {
            user.pets = req.body.pets;
            // 🚀 ESTO OBLIGA A MONGOOSE A GUARDAR EL ARRAY SÍ O SÍ
            user.markModified('pets'); 
        }

        // 2. ACTUALIZAR MASCOTA ACTIVA
        if (req.body.mascotaActiva) {
            user.mascotaActiva = req.body.mascotaActiva;
            user.markModified('mascotaActiva'); 
        } else if (req.body.mascotaActiva === null) {
            user.mascotaActiva = null; 
        }

        const userUpdated = await user.save();
        
        // 🔍 CHIVATO EN LA CONSOLA DEL SERVIDOR
        console.log("✅ Partida guardada en la BD:", userUpdated.mascotaActiva.nombre, "Nivel:", userUpdated.mascotaActiva.nivel);

        return res.status(200).json(userUpdated);

    } catch (error) {
        console.log("❌ ERROR AL ACTUALIZAR PARTIDA:", error);
        return res.status(400).json("Error al actualizar la partida.");
    }
}

module.exports = { register, login, getUsers, getUserById, deleteUser, changeRole, updateUser }