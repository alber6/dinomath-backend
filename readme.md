# 🧮 MathPets - Backend API 🚀

Este repositorio contiene el código fuente del backend para **MathPets**, una aplicación web gamificada (Edutainment) diseñada para ayudar a los alumnos desde 1º hasta 6º de Educación Primaria a mejorar su cálculo mental mediante la adopción y evolución de mascotas virtuales.

Esta API RESTful se encarga de gestionar la lógica de negocio, la persistencia de datos en la nube, la autenticación segura de los estudiantes y el sistema de progresión y recompensas del juego.

---

## 🛠️ Tecnologías y Stack

El proyecto está construido bajo el entorno de ejecución Node.js utilizando las siguientes tecnologías clave:

* **Node.js & Express:** Framework principal para la creación del servidor y enrutamiento de la API.
* **MongoDB & Mongoose:** Base de datos NoSQL alojada en MongoDB Atlas para guardar el progreso, experiencia (XP), nivel y mascotas ("mochila") de cada usuario.
* **JSON Web Tokens (JWT):** Sistema de seguridad y autenticación para proteger las sesiones de los alumnos.
* **Bcrypt:** Encriptación y hashing de contraseñas para garantizar la seguridad de los datos.
* **CORS:** Middleware para permitir la comunicación segura con el frontend (React).

---

## 📋 Requisitos Previos

Para ejecutar este servidor en un entorno local, necesitas tener instalado:
* [Node.js](https://nodejs.org/) (Versión 16 o superior recomendada).
* Una conexión a internet (la base de datos se encuentra alojada en la nube mediante MongoDB Atlas).

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para arrancar el backend en tu máquina local:

1. **Clonar o descargar el repositorio** e ingresar a la carpeta del backend.
2. **Instalar las dependencias** de Node.js ejecutando en la terminal:
   ```bash
   npm install