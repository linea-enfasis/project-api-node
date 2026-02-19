# Node API Products

API REST profesional construida con **Node.js** y **Express** para la gestión de productos, utilizando **MySQL** como motor de base de datos.

## Tabla de Contenidos

- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Inicialización de Base de Datos](#-inicialización-de-base-de-datos)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)

## Características

- 🛠️ **Arquitectura Limpia**: Separación de rutas, controladores y configuración.
- 🔄 **Inicializador Interactivo**: Script automático para configurar la base de datos con un solo comando.
- 📦 **Semilla de Datos**: Incluye productos de ejemplo para pruebas inmediatas.
- ⏱️ **Timestamps**: Soporte para `created_at` y `updated_at` en la base de datos.
- 🛡️ **Seguridad**: Uso de variables de entorno para proteger credenciales.

---

## Arquitectura del Proyecto

```text
project-api-node/
├── scripts/              # Scripts de utilidad
│   └── db-init.js        # Script de inicialización interactiva
├── src/                  # Código fuente
│   ├── controllers/      # Lógica de negocio (Controladores)
│   ├── routes/           # Definición de rutas
│   ├── app.js            # Configuración de Express
│   ├── config.js         # Gestión de variables de entorno
│   ├── db.js             # Configuración del Pool de MySQL
│   └── index.js          # Punto de entrada de la aplicación
├── .env                  # Variables de entorno (Sensible)
├── .env.example          # Plantilla de variables de entorno
├── products.sql          # Esquema SQL y datos semilla
└── package.json          # Dependencias y scripts
```

---

## Requisitos Previos

- **Node.js**: v16.x o superior
- **MySQL Server**: v5.7 o superior
- **npm**: v8.x o superior

---

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd project-api-node
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y edítalo con tus credenciales:

   ```bash
   cp .env.example .env
   ```

   Asegúrate de llenar los campos en `.env`:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_DATABASE=apienfasis
   DB_PORT=3306
   PORT=5000
   ```

---

## Inicialización de Base de Datos

Hemos simplificado el proceso de configuración. No necesitas ejecutar SQL manualmente. El script interactivo se encargará de:

- Crear la base de datos si no existe.
- Crear la tabla `products` con la estructura actualizada.
- Insertar datos de ejemplo (Seeding).

**Simplemente ejecuta:**

```bash
npm run db:init
```

---

## Ejecución del Servidor

Para iniciar el servidor en modo desarrollo (con recarga automática):

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:5000`

---

## Endpoints de la API

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/products` | Lista todos los productos. |
| **GET** | `/products/:id` | Obtiene un producto específico por su ID. |
| **POST** | `/products` | Crea un nuevo producto. |
| **PATCH/PUT** | `/products/:id` | Actualiza un producto existente. |
| **DELETE** | `/products/:id` | Elimina un producto. |

---

## Tecnologías Utilizadas

- **Core**: Node.js & Express
- **Base de Datos**: MySQL (mysql2/promise)
- **Monitoreo**: Morgan & Nodemon
- **Variables de Entorno**: Dotenv
- **Seguridad y CORS**: Cors

---
