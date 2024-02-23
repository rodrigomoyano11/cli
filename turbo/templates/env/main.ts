import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'

const envGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  const basePath = plop.getDestBasePath()

  plop.setGenerator('🌐 Env', {
    description: 'Archivo de configuración que define las variables de entorno de la aplicación.',

    prompts: [
      {
        type: 'list',
        choices: [
          { name: 'Local', value: 'local' },
          { name: 'Development', value: 'development' },
          { name: 'Production', value: 'production' },
        ],
        name: 'environment',
        message: 'Cuál es el nombre del entorno?',
        default: 'development',
      },
    ],

    actions: [
      {
        type: 'add',
        path: nodePath.join(basePath, '.env.{{ environment }}'),
        templateFile: 'env.hbs',
      },
    ],
  })
}

export { envGenerator }
