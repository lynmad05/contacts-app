# Contacts App

Aplicación full-stack para gestión de contactos usando Node.js, Express y PostgreSQL.

---

## Requisitos

- Node.js 18 o superior
- PostgreSQL instalado y en ejecución
- Git (opcional)

---

## Estructura del proyecto

```

contacts-app/
├── backend/
├── frontend/

````

---

## 1. Ejecutar el proyecto SIN Docker (modo local)

### 1.1 Clonar el repositorio

```bash
git clone https://github.com/usuario/contacts-app.git
cd contacts-app
````

---

### 1.2 Configurar base de datos

Abrir PostgreSQL y ejecutar:

```sql
CREATE DATABASE contactsdb;
```

---

### 1.3 Configurar variables de entorno

Verifica que estés dentro de la carpeta backend:

```bash
cd backend
````

Crear el archivo `.env` usando terminal:

```bash
echo DB_HOST=localhost > .env
echo DB_PORT=5432 >> .env
echo DB_NAME=contactsdb >> .env
echo DB_USER=postgres >> .env
echo DB_PASSWORD=tu_password >> .env
echo PORT=3000 >> .env
```

Verifica que el archivo se creó correctamente:

```bash
cat .env
```
### 1.4 Instalar dependencias

```bash
cd backend
npm install
```

---

### 1.5 Ejecutar backend

```bash
npm start
```

El servidor quedará corriendo en:

```
http://localhost:3000
```

---

### 1.6 Ejecutar frontend

No requiere instalación ni servidor.

Asegúrate de estar en la carpeta raíz del proyecto (`contacts-app`) y ejecuta:

```bash id="q8k2sa"
start frontend/index.html
```

Esto abrirá el frontend directamente en el navegador.
---
## 2. Ejecutar con Docker (opcional)

### 2.1 Levantar contenedores

```bash
docker compose up --build
```

---

## 3. API REST

### Base URL

```
http://localhost:3000/api/contacts
```


### Endpoints

* GET `/api/contacts` → listar contactos
* GET `/api/contacts/:id` → obtener contacto
* POST `/api/contacts` → crear contacto
* PUT `/api/contacts/:id` → actualizar contacto
* DELETE `/api/contacts/:id` → eliminar contacto

---

## 4. Health check

```
GET /health
```

Respuesta:

```json
{ "status": "ok" }
```

---

## 5. Notas importantes

* El backend debe estar ejecutándose antes de abrir el frontend
* PostgreSQL debe estar activo
* El frontend consume `http://localhost:3000`
* Si se cambia el puerto del backend, actualizarlo en `frontend/index.html`

```
```
