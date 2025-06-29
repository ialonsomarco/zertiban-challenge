# Zertiban Frontend Movies Challenge

## 🧪 Descripción General

Esta prueba técnica consiste en desarrollar una aplicación frontend utilizando **Angular 19** y **Angular Material 3**, centrada en la visualización y gestión de un listado de películas. El objetivo principal es evaluar tus habilidades con Angular, Angular Material y buenas prácticas en desarrollo frontend.

La aplicación trabaja con un **servicio que devuelve un listado de películas**, cada una con los siguientes campos:

- **Título**
- **Director/a**
- **Año**
- **Géneros**
- **País**
- **Duración**

> El servicio ya está implementado y disponible en:  
> `src/api/api.service.ts` como `ApiService`.

> La fuente de datos utilizada en la prueba proviene del método `getData()` de este servicio, que simula una llamada al backend y devuelve el contenido del fichero `data.json`.  
> ⚠️ **Importante:** Este archivo simula la respuesta del backend y **no debe ser modificado** bajo ningún concepto. Toda la lógica debe construirse a partir de este servicio y sus datos tal como están.

> Puedes añadir nuevos modelos en `src/models` si lo consideras necesario. Sin embargo, **no debes modificar el modelo existente `Movie`**.

---

## ⏳ Estimación de tiempo

A continuación se indica el tiempo estimado para completar la prueba.

| Ejercicio                              | Estimación aproximada |
| -------------------------------------- | --------------------- |
| **Ejercicio 1: Tabla de películas**    | Hasta 2 horas         |
| **Ejercicio 2: Añadir nueva película** | Hasta 2 horas         |
| **Extra 1: Pantalla de detalle**       | Hasta 1 hora          |
| **Extra 2: Persistencia de datos**     | Hasta 1 hora          |

**Total estimado: 4 horas**  
**Total estimado con extras: 6 horas**

---

## 🧰 Stack tecnológico

- Angular 19
- Angular Material 3
- TypeScript
- HTML/CSS

---

## 🛠️ Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: >= 18.x)
- [Angular CLI](https://angular.dev/tools/cli) (versión 19)

---

## 🧩 Ejercicios

### Ejercicios obligatorios

Los siguientes ejercicios son obligatorios:

#### Ejercicio 1 — Tabla de películas

Renderiza los datos obtenidos desde `ApiService` en una **tabla utilizando Angular Material**.  
Requisitos:

- Todas las columnas deben ser **ordenables**.
- La tabla debe mostrar todos los campos proporcionados por el servicio.
- ⚠️ **Recuerda:** No debes modificar el archivo `data.json` ni el modelo `Movie`.

#### Ejercicio 2 — Añadir nueva película

Agrega un botón "Añadir película".  
Requisitos:

- Al pulsarlo, debe abrirse un **modal con un formulario** para introducir los datos de una nueva película.
- Valida los datos del formulario (campos obligatorios, tipo y formato).
- Al guardar, la película debe añadirse a la tabla.
- ⚠️ **Importante:** La lógica debe integrarse sin alterar el servicio `ApiService` ni el modelo `Movie`.

---

### Ejercicios extra (opcionales)

Los siguientes ejercicios son opcionales. **Te recomendamos elegir uno de ellos**, pero queda a tu elección si deseas implementar ambos, uno o ninguno.

#### Extra 1 — Pantalla de perfil de película

Al hacer click en una fila de la tabla:

- Redirige a una nueva **pantalla de detalle de la película**.
- Muestra todos los datos de la película seleccionada.
- Incluye un botón para **volver a la vista principal** (tabla de películas).

#### Extra 2 — Persistencia de datos

Haz que los datos **persistan entre recargas** utilizando, por ejemplo, herramientas de almacenamiento de datos en el navegador.

---

## 💡 Consejos para la prueba

- Aplica buenas prácticas en la organización del código.
- Presta especial atención al diseño y correcta estructuración de **componentes y servicios**.
- Usa `RxJS` donde sea necesario.
- Usa reactive forms de forma coherente.
- Código limpio, legible y mantenible.
- Diseño responsive (deseable, no obligatorio).
- **No es necesario dedicar mucho tiempo al diseño visual o al CSS**. Valoramos que la aplicación sea **funcional y clara**, no la creatividad estética.

---

## 📦 Entrega

Puedes entregar la prueba de alguna de las siguientes maneras:

- Compartiendo un repositorio en GitHub, GitLab, etc.
- Enviando un archivo `.zip` con el proyecto completo.
- Proporcionando un enlace a un almacenamiento en la nube (por ejemplo, Google Drive, Dropbox, OneDrive).

Por favor, envía tu entrega a **Álvaro Moreno** (amoreno@zertiban.com) con copia a **Mauricio Federico Zurdo** (mzurdo@zertiban.com) y **Javier Rodríguez** (javier.rodriguez@zertiban.com).

---

## 📩 Contacto

Si tienes alguna duda durante la resolución de la prueba o cualquier consulta relacionada con el proceso de selección, no dudes en escribirnos a:

**Álvaro Moreno — Lead Frontend Developer — amoreno@zertiban.com**  
**Mauricio Federico Zurdo — Recursos Humanos — mzurdo@zertiban.com**  
**Javier Rodríguez — Chief Technology Officer — javier.rodriguez@zertiban.com**

---

## 💪 ¡Ánimo!

Queremos que afrontes esta prueba como una oportunidad para demostrar tu talento. ¡Confía en ti y muestra tu mejor versión!
