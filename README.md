# Habit Tracker – SPA en JavaScript Vanilla

Aplicación **SPA (Single Page Application)** para crear y seguir hábitos diarios, desarrollada con **JavaScript vanilla moderno**, arquitectura **component-based**, programación **funcional, asíncrona y reactiva**, y **Supabase** como Backend-as-a-Service.

> 🎯 Objetivo del proyecto: demostrar una arquitectura frontend moderna sin frameworks, con estado centralizado, flujo de datos unidireccional y separación clara de responsabilidades.

---

## ✨ Features

* 🔐 Autenticación (Supabase Auth)
* 👤 Datos por usuario
* ✅ Creación y seguimiento de hábitos diarios
* 📅 Registro de hábitos por fecha
* 🔁 UI reactiva basada en estado
* 📊 Cálculo de *streaks* (rachas)
* ☁️ Persistencia en Supabase
* 🧱 Arquitectura escalable y mantenible

---

## 🧠 Principios de Arquitectura

* **SPA (Single Page Application)**
* **Component-Based Architecture**
* **Estado centralizado y reactivo**
* **Programación funcional** (inmutabilidad, funciones puras)
* **Flujo de datos unidireccional (Flux-like)**
* **Functional Core / Imperative Shell**

> 📌 La UI es una función del estado

---

## 🧩 Stack Tecnológico

* **JavaScript ES Modules**
* **Vite** (dev server + bundler)
* **Supabase**

  * Auth
  * Database (PostgreSQL)
  * Storage (opcional)
* **HTML / CSS**

---

## 📂 Estructura del Proyecto

```
src/
 ├── app.js              # Entry point
 ├── router/             # SPA routing
 ├── store/              # Estado global reactivo
 │    └── store.js
 ├── components/         # Componentes UI (funciones puras)
 ├── pages/              # Composición de vistas
 ├── effects/            # Lógica async / Supabase
 ├── services/           # Cliente Supabase y helpers
 ├── utils/              # Funciones puras (streaks, fechas, etc.)
 └── styles/
```

---

## 🗃️ Modelo de Datos (Supabase)

### Habit

```ts
{
  id: string,
  user_id: string,
  name: string,
  description?: string,
  frequency: 'daily',
  created_at: string
}
```

### HabitLog

```ts
{
  id: string,
  habit_id: string,
  date: string, // YYYY-MM-DD
  completed: boolean
}
```

---

## 🔁 Flujo de Datos

```
User Action
   ↓
UI Component
   ↓
Effect (async)
   ↓
Supabase
   ↓
Store.setState()
   ↓
UI re-render
```

---

## ⚙️ Estado Global

Ejemplo simplificado del estado:

```js
{
  user: null,
  habits: [],
  logs: [],
  selectedDate: 'YYYY-MM-DD',
  ui: {
    loading: false,
    error: null
  }
}
```

---

## 🧠 Lógica del Dominio

* Un hábito solo puede marcarse **una vez por día**
* Los *streaks* se calculan a partir de los logs
* La lógica de negocio se implementa como **funciones puras**

```txt
habits + logs → streaks
```

---

## 🧪 Patrones de Diseño Utilizados

| Patrón            | Uso                     |
| ----------------- | ----------------------- |
| Component-Based   | UI modular              |
| Observer          | Reactividad del store   |
| Flux-like         | Flujo unidireccional    |
| MVVM (conceptual) | Separación View / State |
| Functional Core   | Lógica pura             |
| Imperative Shell  | Async / efectos         |

---

## 🚀 Instalación y Uso

```bash
npm install
npm run dev
```

Configura tus variables de entorno de Supabase:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 📈 Posibles Mejoras

* 📊 Estadísticas semanales y mensuales
* 🔔 Recordatorios
* 📆 Vista de calendario
* 📡 Realtime sync
* 🌙 Modo oscuro

---

## 🏁 Conclusión

Este proyecto demuestra cómo construir una **SPA moderna, reactiva y escalable** usando únicamente **JavaScript vanilla**, aplicando patrones y principios utilizados en frameworks modernos como React, Vue o Angular.

> **Frameworks cambian, los conceptos permanecen.**

---

## 👤 Autor

Proyecto desarrollado como ejercicio de arquitectura frontend moderna y diseño de aplicaciones SPA.
