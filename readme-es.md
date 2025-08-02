<div align="center">
  
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<div align="center">

[![ES][es-shield]][readme-es-url]
[![EN][en-shield]][readme-en-url]

</div>

<div align="center">

[![Compilot-cli-Banner.png](https://i.postimg.cc/MTGc6VGK/Compilot-cli-Banner.png)](https://postimg.cc/WDQpSDrQ)


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Ink](https://img.shields.io/badge/ink-%23646CFF.svg?style=for-the-badge&logo=ink&logoColor=white) ![Plop](https://img.shields.io/badge/plop-%2300317E.svg?style=for-the-badge&logo=plop&logoColor=white)

# ⚛️ Compilot CLI

</div>


Compilot CLI es una herramienta diseñada para automatizar la creación de componentes, páginas, hooks y servicios en React a partir de plantillas predefinidas. Simplifica el proceso de desarrollo generando código base (boilerplate), permitiendo a los desarrolladores centrarse en las funcionalidades en lugar de en la estructura de archivos.

## ✨ Funcionalidades

• 🧩 Generación de Componentes: Crea componentes de React rápidamente con soporte para TypeScript y stories para Storybook.

• 📄 Creación de Páginas: Genera páginas completas con lógica, vista y configuración de rutas.

• 🔁 Hooks Personalizados: Crea hooks reutilizables fácilmente, usando Zustand, context-api de React o estado local.

• 🔌 Servicios: Genera servicios con tipos en TypeScript, mocks y handlers para llamadas a APIs.

• 💬 Interfaz por Prompts: Guías interactivas para facilitar el proceso de creación.

• ⚙️ Configuración Personalizable: Puedes sobrescribir rutas, nombres y comportamiento por defecto mediante un archivo de configuración propio.

## 🎨 UI

<table>
	<tr>
		<td>
			
[![SCR-20250503-rnaf.png](https://i.postimg.cc/Jzn8WrxN/SCR-20250503-rnaf.png)](https://postimg.cc/SJw36pwR)
  		</td>
		<td>
  [![SCR-20250503-rnpp.png](https://i.postimg.cc/2SqtwVTK/SCR-20250503-rnpp.png)](https://postimg.cc/87Swkk2R)</td>
	</tr>
</table>

## 📦 Instalación

```bash
npm i -D @egdev6/compilot-cli
```

## 🚀 Uso

```bash
npx compilot-cli
```

Sigue los prompts para elegir el tipo de recurso que quieres generar (componente, página, hook o servicio) e introduce los detalles necesarios.

## 🛠 Configuración

### ⚙️ Por defecto

El paquete incluye una configuración por defecto que define las rutas base y extensiones de los archivos generados:

```json
{
	"config": {
		"language": "typescript", // ["typescript", ["javascript"]]
		"generatedFiles": true, // [true, false]
		"openFiles": true // [true, false]
	},
	"components": {
		"base": "src/components",
		"atomic": true, // [true, false]
		"naming": {
			"folder": "kebabCase" // ["kebabCase", "pascalCase", "camelCase"]
		},
		"files": {
			"types": "file", // ["file", "inline"]
			"stories": true, // [true, false]
			"test": true // [true, false]
		}
	},
	"pages": {
		"base": "src/pages",
		"routes": "src/app/Router.tsx",
		"files": {
			"types": "file", // ["file", "inline"]
			"lazy": true // [true, false]
		}
	},
	"hooks": {
		"base": "src/hooks",
		"context": {
			"file": "src/app/main.tsx",
			"mode": "tree" // ["tree", "array"]
		}
	},
	"services": {
		"base": "src/services",
		"axios": "src/config/axios",
		"types": "src/models/api",
		"mocks": {
			"enabled": true,
			"data": "src/mocks/data",
			"server": "src/mocks/server.ts"
		}
	}
}

```

### 🔧 Sobrescribir la Configuración

Puedes crear un archivo compilot.config.json en la raíz de tu proyecto para personalizar rutas, extensiones y comportamiento:

#### Ejemplo de configuración personalizada

```json
{
	"config": {
		"language": "javascript",
		"generatedFiles": false,
	},
  "components": {
		"base": "src/components",
		"atomic": false,
		"naming": {
			"folder": "pascalCase"
		},
		"files": {
			"types": "inline",
			"stories": false,
			"test": false
		}
	},
}
```

En este ejemplo:

•	Los archivos se generarán con la extensión .js.
•	Se desactiva la generación automática de los archivos.
•	Los componentes se crearán en la carpeta custom/components.
•	La metodología “atomic” está desactivada.
•	La carpeta del componente usará el formato PascalCase.
•	No se generarán los archivos .stories ni .test.

### 🔧 Ejemplos para Rutas Anidadas
- **Estructura de Carpetas Anidadas**: Usa rutas de carpetas como `src/pages/home/user` para crear rutas anidadas.
  - Comando: `npx compilot-cli`
  - Tipo: `page`
  - Nombre: `user`
  - Carpeta: `src/pages/home/user`
  - Resultado: Genera `src/pages/home/user/UserPage.jsx` con ruta añadida a `src/app/Router.tsx`.
- **Múltiples Niveles Anidados**: Para `src/pages/admin/dashboard/settings`, repite el proceso.
  - Nombre: `settings`
  - Carpeta: `src/pages/admin/dashboard/settings`
- **Ejemplo de Ruta Personalizada**: Añade un comentario en `Router.tsx` como:
```jsx
//-- plop hook for import --//
{/*-- plop hook for route --*/}
<Route path="/admin/*" element={<AdminLayout />}>
  {/*-- plop hook for nested route --*/}
</Route>
```

#### Soporte para Next.js
Compilot CLI no soporta nativamente Next.js, pero puede integrarse manualmente:
- Instala dependencias: `npm install -D vitest @vitejs/plugin-react jsdom`.
- Configura `vitest.config.js`:
  ```javascript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
    },
  });
  

#### 🧪 Cómo funciona la Metodología “Atomic”

Si está activada, los componentes se agrupan en atoms, molecules y organisms:

```
src/components
├── atoms
│   └── button
│       ├── Button.tsx
│       ├── Button.stories.tsx
│       └── index.ts
├── molecules
│   └── form
│       ├── Form.tsx
│       ├── Form.stories.tsx
│       └── index.ts
└── organisms
    └── header
        ├── Header.tsx
        ├── Header.stories.tsx
        └── index.ts
```

Si está desactivada, todos los componentes se generan en la raíz de components/ o la ruta que tengas sobreescrita en la configuración:

```
src/components
├── button
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── form
│   ├── Form.tsx
│   ├── Form.stories.tsx
│   └── index.ts
└── header
    ├── Header.tsx
    ├── Header.stories.tsx
    └── index.ts
```
#### 🧪 Añadir Providers automáticamente (context + árbol)

Si eliges "context" al crear un hook, se puede insertar automáticamente en tu archivo de providers:

```json
	"hooks": {
		"context": {
			"file": "src/app/main.tsx",
			"mode": "tree"
		}
	},
```

#### 🧪 Añadir Imports Lazy y Rutas para las Páginas

Si quieres que el tipo page inserte automáticamente un import lazy (o regular) y su correspondiente ruta en tu archivo de rutas, debes añadir comentarios específicos en el archivo definido en config.pages.routes.
Estos comentarios actúan como marcadores donde la herramienta añadirá el código necesario.

Asegúrate de que la ruta del archivo esté correctamente configurada en tu compilot-cli.config.json, por ejemplo:

```json
	"pages": {
		"routes": "src/app/Router.tsx",
		"files": {
			"types": "file",
			"lazy": true
		}
	},
```

#### 🧪 Añadir Mocks a tu Servidor

Si quieres que el tipo service inserte automáticamente un mock en tu archivo de servidor, debes:
	1.	Activar la opción config.services.mocks.enabled en tu archivo de configuración.
	2.	Añadir comentarios específicos en el archivo definido en config.services.mocks.server.

Estos comentarios actuarán como marcadores donde la herramienta insertará el código necesario.

```json
	"services": {
		"mocks": {
			"enabled": true,
			"data": "src/mocks/data",
			"server": "src/mocks/server.ts"
		}
	}
```

Recomiendo configurar este paquete en tu proyecto https://github.com/reinerBa/vite-plugin-mock-simple
	1.	Mueve todas las llamadas dentro de mockSimple([]) a una carpeta específica.
	2.	Exporta esa configuración desde dicha carpeta para usarla en Vite.

```javascript
import mockSimple from 'vite-plugin-mock-simple'
import { mockServer } from 'src/mocks/mockServer.ts'

export default defineConfig({
  plugins: [
    mockSimple(mockServer)
  ]
})
```

Además, añade esta variable en tu archivo .env.development:

```
VITE_ENVIROPMENT='DEV'
```

#### Comentarios Requeridos

Añade los siguientes comentarios en tu archivo de rutas (por ejemplo, src/app/Router.tsx):

```javascript
//-- plop hook for import --//
{/*-- plop hook for route --*/}
```

Añade los siguientes comentarios en tu archivo de providers de la aplicación (por ejemplo, src/app/main.tsx):

```javascript
{/*-- plop hook for providers --*/}<App/>
```

Añade los siguientes comentarios en tu archivo de mocks (por ejemplo, src/mocks/server.tsx):

```javascript
//-- plop hook for mocks -- //
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna mejora o detectas un error, no dudes en abrir un issue o enviar un pull request.
Si te gusta la herramienta… 🌟 ¡una estrella siempre ayuda!

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## 📬 Contacto

<div align="center">

[![image](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/egdev/)
[![image](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/egdev6)
[![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:egdev6o@gmail.com)

</div>

[stars-shield]: https://img.shields.io/github/stars/egdev6/compilot-cli.svg?style=for-the-badge
[stars-url]: https://github.com/egdev6/compilot-cli/stargazers
[issues-shield]: https://img.shields.io/github/issues/egdev6/compilot-cli.svg?style=for-the-badge
[issues-url]: https://github.com/egdev6/compilot-cli/issues
[license-shield]: https://img.shields.io/github/license/egdev6/compilot-cli.svg?style=for-the-badge
[license-url]: https://github.com/egdev6/compilot-cli/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/egdev6
[readme-es-url]:https://github.com/egdev6/compilot-cli/blob/main/readme-es.md
[readme-en-url]:https://github.com/egdev6/compilot-cli/
[es-shield]: https://img.shields.io/badge/ES-red.svg?style=for-the-badge
[en-shield]: https://img.shields.io/badge/EN-blue.svg?style=for-the-badge
