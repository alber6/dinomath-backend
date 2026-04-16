const { register, login, getUsers, getUserById, deleteUser, changeRole, updateUser } = require("../controllers/user");
const { isAuth } = require("../../middlewares/isAuth")
const usersRouter = require("express").Router();

//RUTAS PÚBLICAS -> cualquiera puede verlo
// tanto register como login son rutas públicas
usersRouter.post("/register", register);
usersRouter.post("/login", login);

//RUTAS DE ADMINISTRADOR -- añadido por si en un futuro se añade un admin
// Ruta para cambiar el rol a otro usuario
usersRouter.put("/change-role/:id", isAuth(["admin"]), changeRole);
usersRouter.get("/", isAuth(["admin"]), getUsers);

// RUTAS DE USUARIO LOGUEADO
// ruta para encontrar el usuario en base de datos y que se sincronicen los datos para seguir jugando
usersRouter.get("/:id", isAuth(), getUserById);
// usuarios que puedan modificar o borrar su cuenta
usersRouter.put("/:id", isAuth(), updateUser);
usersRouter.delete("/:id", isAuth(), deleteUser);


module.exports = usersRouter;