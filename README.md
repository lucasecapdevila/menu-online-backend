# 🍽️ Menu Online Backend

Backend API para sistema de menú online que utiliza Google Sheets como base de datos. Permite gestionar elementos del menú con operaciones CRUD completas.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuir](#contribuir)

## ✨ Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar elementos del menú
- ✅ **Google Sheets Integration**: Utiliza Google Sheets como base de datos
- ✅ **Validación de Datos**: Validación robusta de entrada con mensajes de error detallados
- ✅ **Manejo de Errores**: Sistema centralizado de manejo de errores
- ✅ **CORS Habilitado**: Configurado para aplicaciones frontend
- ✅ **Variables de Entorno**: Configuración segura y flexible
- ✅ **Arquitectura Modular**: Código bien organizado y mantenible

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Google Sheets API** - Base de datos
- **Google Auth** - Autenticación con Google
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Manejo de variables de entorno

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Google con acceso a Google Sheets
- Service Account de Google Cloud

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd menu-online-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env con tus credenciales
   touch .env
   ```

4. **Configurar Google Sheets**
   - Crear una nueva hoja de cálculo en Google Sheets
   - Configurar las columnas según el formato requerido
   - Obtener el ID de la hoja de cálculo

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Configuración de Google Sheets
GOOGLE_SHEET_ID=tu_sheet_id_aqui
GOOGLE_SHEET_NAME=Hoja1
GOOGLE_CLIENT_EMAIL=tu_service_account_email@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu_private_key_aqui\n-----END PRIVATE KEY-----\n"

# CORS (opcional)
ALLOWED_ORIGINS=http://localhost:3000,https://tu-dominio.com
```

### Formato de Google Sheets

La hoja de cálculo debe tener las siguientes columnas en este orden:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| ID | CATEGORIA | PRODUCTO | PRECIO | DESCRIPCION | IMAGEN |

**Ejemplo de datos:**
| ID | CATEGORIA | PRODUCTO | PRECIO | DESCRIPCION | IMAGEN |
|----|-----------|----------|---------|-------------|---------|
| 1234567890 | Bebidas | Coca Cola | 2.50 | Bebida gaseosa refrescante | https://example.com/coca.jpg |

### Configuración de Google Cloud

1. **Crear un proyecto en Google Cloud Console**
2. **Habilitar Google Sheets API**
3. **Crear Service Account**
4. **Descargar credenciales JSON**
5. **Compartir la hoja de cálculo con el email del Service Account**

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponibles

#### 🏥 Health Check
```http
GET /health
```
**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 📋 Obtener todos los elementos del menú
```http
GET /menu
```
**Respuesta:**
```json
[
  {
    "ID": "1234567890",
    "CATEGORIA": "Bebidas",
    "PRODUCTO": "Coca Cola",
    "PRECIO": "2.50",
    "DESCRIPCION": "Bebida gaseosa refrescante",
    "IMAGEN": "https://example.com/coca.jpg",
    "_rowNumber": 2
  }
]
```

#### ➕ Crear nuevo elemento del menú
```http
POST /menu
Content-Type: application/json
```
**Body:**
```json
{
  "categoria": "Bebidas",
  "producto": "Pepsi",
  "precio": 2.30,
  "descripcion": "Bebida cola refrescante", // Opcional
  "imagen": "https://example.com/pepsi.jpg" // Opcional
}
```
**Respuesta:**
```json
{
  "id": "1234567891",
  "categoria": "Bebidas",
  "producto": "Pepsi",
  "precio": 2.30,
  "descripcion": "Bebida cola refrescante",
  "imagen": "https://example.com/pepsi.jpg"
}
```

#### ✏️ Actualizar elemento del menú
```http
PUT /menu/:id
Content-Type: application/json
```
**Body (todos los campos son opcionales):**
```json
{
  "categoria": "Bebidas Gaseosas",
  "precio": 2.80,
  "descripcion": "Nueva descripción"
}
```

#### 🗑️ Eliminar elemento del menú
```http
DELETE /menu/:id
```
**Respuesta:**
```json
{
  "success": true,
  "id": "1234567890"
}
```

### Códigos de Estado HTTP

- `200` - OK
- `201` - Creado
- `400` - Solicitud incorrecta
- `404` - No encontrado
- `500` - Error interno del servidor

### Ejemplos de Errores

```json
{
  "error": "Datos de entrada inválidos",
  "details": [
    "Categoría es requerida",
    "Precio debe ser un número válido"
  ]
}
```

## 📁 Estructura del Proyecto

```
menu-online-backend/
├── src/
│   ├── config/
│   │   └── env.js              # Configuración de variables de entorno
│   ├── controllers/
│   │   └── menuController.js   # Controladores de la API
│   ├── middleware/
│   │   ├── errorHandler.js     # Manejo centralizado de errores
│   │   └── validation.js       # Validaciones de entrada
│   ├── routes/
│   │   ├── index.js           # Rutas principales
│   │   └── menuRoutes.js      # Rutas específicas del menú
│   ├── services/
│   │   └── googleSheetsService.js # Servicio de Google Sheets
│   ├── utils/
│   │   └── constants.js       # Constantes del proyecto
│   └── app.js                 # Configuración de Express
├── index.js                   # Punto de entrada
├── package.json
├── .env.example              # Plantilla de variables de entorno
└── README.md
```

### Descripción de Directorios

- **`config/`** - Configuraciones del proyecto
- **`controllers/`** - Lógica de controladores
- **`middleware/`** - Middlewares personalizados
- **`routes/`** - Definición de rutas
- **`services/`** - Servicios externos (Google Sheets)
- **`utils/`** - Utilidades y constantes

## 📝 Scripts Disponibles

```json
{
  "start": "node index.js",           // Producción
  "dev": "nodemon index.js",          // Desarrollo
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 🔧 Desarrollo

### Añadir nuevos campos

1. **Actualizar constantes** en `src/utils/constants.js`
2. **Modificar servicio** en `src/services/googleSheetsService.js`
3. **Actualizar validaciones** en `src/middleware/validation.js`
4. **Probar endpoints** con Postman o similar

### Debugging

Para debug detallado, puedes añadir logs en los controladores:
```javascript
console.log('Debug info:', data);
```

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Verifica tu configuración de Google Sheets
3. Comprueba las variables de entorno
4. Revisa los logs del servidor

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
