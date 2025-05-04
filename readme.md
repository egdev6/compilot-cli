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


Compilot CLI is a tool designed to automate the creation of React components, pages, hooks, and services based on predefined templates. It streamlines the development process by generating boilerplate code, allowing developers to focus on building features rather than setting up file structures.

## ✨ Features

• 🧩 Component Generation: Quickly create React components with TypeScript support, including stories for Storybook.

• 📄 Page Creation: Generate pages with logic, view, and routing setup.

• 🔁 Custom Hooks: Easily create reusable hooks with Zustand, React context-api or local state.

• 🔌 Service Setup: Generate services with TypeScript types, mock data, and handlers for API calls.

• 💬 Prompt-Based Interface: User-friendly prompts guide you through the creation process.

• ⚙️ Customizable Configuration: Default paths, language, files activation or naming customization can be overridden with a user-defined configuration file.
	
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

## 📦 Installation

```bash
npm i -D @egdev6/compilot-cli
```

## 🚀 Usage

```bash
npx compilot-cli
```

Follow the prompts to select the type of component you want to create (component, page, hook, or service) and provide the necessary details.

## 🛠 Configuration

### ⚙️ Default Configuration

The package includes a default configuration file that defines the base paths and file extensions for the generated files. The default configuration looks like this:

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

### 🔧 Overriding the Configuration

If you want to customize the paths or file extensions, you can create a `compilot.config.json` file in the root of your project. This file will override the default configuration.

#### Example of a Custom Configuration

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

In this example:
- Files will be generated with the `.js` extension.
- Disable output for generated files.
- Components will be created in the `custom/components` folder.
- The "atomic" methodology is disbaled
- The component folder in pascalCase
- Disable .stories and .test generated files

#### 🧪 How the “Atomic” Methodology Works

When the "atomic" methodology is enabled, the generated files will be organized into folders based on their atomic design category (e.g., `atoms`, `molecules`, `organisms`). For example:

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

If the "atomic" methodology is disabled, all components will be generated in a flat structure under the config `components` folder:

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
#### 🧪 Adding Providers to your project with hook context type

If you choose context when create a hook because you're using React api-context, you can add a comment in your provider file to auto generate tree Providers nesting.
Ensure than file path is correctly configured:

```json
	"hooks": {
		"context": {
			"file": "src/app/main.tsx",
			"mode": "tree"
		}
	},
```

I recommend configure this package in your project: https://github.com/reinerBa/vite-plugin-mock-simple

Move all the calls in mockSimple([]) to a folder and export it for vite.

```javascript
import mockSimple from 'vite-plugin-mock-simple'
import { mockServer } from 'src/mocks/mockServer.ts'

export default defineConfig({
  plugins: [
    mockSimple(mockServer)
  ]
})
```

Add this variable to your .env.development

```
VITE_ENVIROPMENT='DEV'
```

#### 🧪 Adding Lazy Imports and Routes for Pages

If you want the `page` type to automatically insert a lazy/regular import and the route into your routes file, you need to add specific comments to the file configured in `config.pages.routes`. These comments act as placeholders where the tool will append the necessary code.
Ensure than file path is correctly configured:

```json
	"pages": {
		"routes": "src/app/Router.tsx",
		"files": {
			"types": "file",
			"lazy": true
		}
	},
```

#### 🧪 Adding Mock to your server

If you want the `service` type to automatically insert a mock into your server file, you need to add specific comments to the file configured in `config.services.mocks.server` and turn on `config.services.mocks.enabled`. These comments act as placeholders where the tool will append the necessary code.

```json
	"services": {
		"mocks": {
			"enabled": true,
			"data": "src/mocks/data",
			"server": "src/mocks/server.ts"
		}
	}
```

#### Required Comments 

Add the following comments to your routes file (e.g., `src/app/Router.tsx`):

```javascript
//-- plop hook for import --//
{/*-- plop hook for route --*/}
```

Add the following comments to your app providers file (e.g., `src/app/main.tsx`):

```javascript
{/*-- plop hook for providers --*/}<App/>
```

Add the following comments to your mock file (e.g., `src/mocks/server.tsx`):

```javascript
//-- plop hook for mocks -- //
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
If you like the tool... 🌟 always help!!! 

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 📬 Contact

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
[readme-es-url]:https://github.com/egdev6/compilot-cli/blob/main/readme-es.md
[readme-en-url]:https://github.com/egdev6/compilot-cli/
[es-shield]: https://img.shields.io/badge/ES-red.svg?style=for-the-badge
[en-shield]: https://img.shields.io/badge/EN-blue.svg?style=for-the-badge
