const jwt = require("jsonwebtoken")

//funcion para generar el token "la llave"
const generateSign = (id) => {
    //lo que quiero meter dentro del contenido de la llave, es el id para identificar el token(llave) del usuario con su id de usuario
    //añadimos entonces el id, la receta secreta se añade en .env, y opcion de a ver cuando expira, si pierdes esa llave, desaparece. el token(la llave) no se guarda en ningun lugar
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d"})//esa llave a los 30 dias se autodestruye
}

//verificar si es correcto el token
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
    //te comprueba que el token es el correcto y hecho por nosotros y devolverá un objeto con propiedades, como el id
}

module.exports = { generateSign, verifyJwt }