# ⚙️ DinoMath API - Backend (Servidor)

Este repositorio contiene la lógica del lado del servidor para **DinoMath**. Es una API RESTful construida con **Node.js** y **Express** que gestiona la persistencia de datos, la autenticación de usuarios y la sincronización del progreso de las mascotas en la nube.

## 🚀 Tecnologías Utilizadas

* **Node.js & Express:** Framework principal para la creación de rutas, controladores y gestión de peticiones HTTP.
* **MongoDB & Mongoose:** Base de datos NoSQL y modelado de datos para gestionar los perfiles de usuario y sus familias de dinosaurios.
* **JWT (JSON Web Tokens):** Implementación de seguridad para la gestión de sesiones y protección de rutas privadas de usuario.
* **Bcrypt:** Encriptación de contraseñas de alta seguridad para proteger las credenciales de los jugadores.
* **CORS:** Configuración de seguridad para permitir la comunicación exclusiva entre el servidor (Render) y el cliente (Vercel).

## 🔑 Configuración de Variables de Env (.env) ⚠️

El servidor requiere de ciertas claves de configuración para conectar con la base de datos y firmar los tokens de seguridad. Por seguridad, el archivo `.env` **no se sube al repositorio público**.

Para configurar el entorno local:

1. Localiza el archivo **`.env.example`** en la raíz del proyecto.
2. Crea una copia de dicho archivo y cámbiale el nombre a **`.env`**.
3. Rellena las variables con tus credenciales:

```text
PORT=3000
MONGO_URI=tu_cadena_de_conexion_a_mongodb_atlas
JWT_SECRET=tu_palabra_secreta_para_firmar_tokens
`````


# 📍 Endpoints Principales de la API

### Autenticación de Usuarios
POST /api/v1/users/register: 
- Crea una nueva cuenta de usuario con una mascota inicial.

POST /api/v1/users/login: 
- Valida credenciales y devuelve un token JWT de acceso.

### Gestión de Partida y Progreso
PUT /api/v1/users/:id: 
- Endpoint crítico para el autoguardado. Actualiza el nivel, XP, monedas y la mascota activa del usuario.

GET /api/v1/users/:id: 
- Recupera toda la información del jugador para sincronizar el estado del Frontend al iniciar sesión.

## 🛠️ Instalación y Ejecución en Local
Clonar el repositorio:
git clone [https://github.com/alber6/DinoMath-Backend.git](https://github.com/alber6/dinomath-backend.git)

# Instalar dependencias:
```bash
npm install
```

# Arrancar el servidor
## Modo desarrollo (con recarga automática)
```bash
npm run dev
```

## Modo producción
```bash
npm start
```

☁️ Despliegue en Producción
El backend está actualmente desplegado en Render. Es fundamental que, al desplegar en un nuevo entorno, se configuren las Environment Variables en el panel de control del hosting para que la cadena de conexión a MongoDB Atlas funcione correctamente.