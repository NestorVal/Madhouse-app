# 💈 Madhouse Barbería - Sistema de Gestión

Madhouse es una plataforma web Full-Stack diseñada para digitalizar la gestión de citas, catálogo de servicios y perfiles de usuarios (Clientes y Barberos) para una barbería moderna.

## 🏗️ Arquitectura del Proyecto (Monorepo)

Este repositorio contiene tanto el Frontend como el Backend de la aplicación, separados en sus respectivos directorios.

* **`/frontend`**: Aplicación cliente (SPA) construida con React JS.
* **`/backend`**: API RESTful construida con Java Spring Boot y MySQL.

---

## 💻 Frontend (React JS)

El frontend proporciona una interfaz de usuario fluida y reactiva para el agendamiento de citas y la administración de perfiles.

### Tecnologías Principales
* React JS
* React Router DOM (Navegación)
* SweetAlert2 (Alertas interactivas)
* CSS puro (Modularizado)

### Instalación y Ejecución
1. Navegar al directorio: `cd frontend`
2. Instalar dependencias: `npm install`
3. Iniciar el servidor de desarrollo: `npm start`
4. La aplicación correrá en: `http://localhost:3000`

---

## ⚙️ Backend (Spring Boot)

El backend expone una API REST segura para gestionar la lógica de negocio, autenticación y persistencia de datos.

### Tecnologías Principales
* Java 17+ / Spring Boot 3
* Spring Data JPA (Hibernate)
* Spring Security (BCrypt para contraseñas)
* MySQL (Base de Datos Relacional)
* Postman (Testing de API)

### Instalación y Ejecución
1. Configurar la base de datos MySQL local (`application.properties`).
2. Navegar al directorio: `cd backend`
3. Ejecutar el proyecto mediante el IDE (VS Code/Eclipse) o con Maven: `./mvnw spring-boot:run`
4. La API correrá en: `http://localhost:8080`

---

## 🔐 Endpoints Principales (API)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autenticación de usuarios (Clientes/Barberos) |
| `POST` | `/api/auth/registrar` | Creación de nuevos clientes |
| `GET` | `/api/servicios/servicio` | Retorna el catálogo de servicios |
| `POST` | `/api/reservas/crear` | Genera una nueva cita agendada |

---
**Desarrollado por:** Nestor Alfredo Rubiano Torres
**Ficha:** 3118311 | ADSO - SENA
