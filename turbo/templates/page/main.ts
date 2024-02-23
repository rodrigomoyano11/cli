import { PlopTypes } from '@turbo/gen'
import nodeFs from 'node:fs'
import nodePath from 'node:path'
import { getAddFilesAction } from '../../actions/add-files'
import { getElementNamePrompt } from '../../prompts/name'
import { getPathPrompt } from '../../prompts/path'
import { getWorkspacePrompt } from '../../prompts/workspace'

const pageGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  // Prompts
  const getPrompts: PlopTypes.DynamicPromptsFunction = async (inquirer) => {
    // Workspace
    const workspacePrompt = getWorkspacePrompt({ plop, mode: 'apps' })
    const workspacePromptResponse = await inquirer.prompt([workspacePrompt])

    const [, workspace] = workspacePromptResponse.workspace.split('/')

    // Path
    const pathPrompt = await getPathPrompt({
      mode: 'folder',
      element: 'page',
      workspace,
      plop,
      inquirer,
    })
    const pathPromptResponse = await inquirer.prompt([pathPrompt])

    const isFolder = nodeFs.statSync(pathPromptResponse.path).isDirectory()
    const path = isFolder ? pathPromptResponse.path : nodePath.dirname(pathPromptResponse.path)

    // Name
    const namePrompt = getElementNamePrompt({
      element: 'page',
      examples: ['home', 'about', 'contact'],
    })
    const { name } = await inquirer.prompt([namePrompt])

    // Includes
    const includesPrompt: PlopTypes.PromptQuestion = {
      type: 'checkbox',
      name: 'includes',
      message: 'Qué elementos te gustaría incluir?',
      choices: ['page.tsx', 'styles.css', 'types.ts', 'data.json'].map((file, index) => ({
        name: file,
        checked: true,
        key: index.toString(),
        extra: { file, index },
      })),
    }

    const includesPromptResponse = await inquirer.prompt([includesPrompt])

    const { includes } = includesPromptResponse

    console.log({ workspace, path, name, includes })

    return { workspace, path, name, includes }
  }

  // Actions
  const addFilesActions = getAddFilesAction({
    mode: 'same-folder',
    files: ['page.tsx', 'styles.css', 'types.ts', 'data.json'],
  })

  // Generator
  plop.setGenerator('🔎 Page', {
    description:
      'Componente que dispone de una ruta asociada y que puede ser accedido directamente desde el navegador.',
    prompts: getPrompts,
    actions: addFilesActions,
  })
}

export { pageGenerator }
