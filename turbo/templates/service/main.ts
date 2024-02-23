import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'
import { getAddFilesAction } from '../../actions/add-files'
import { getElementNamePrompt } from '../../prompts/name'
import { getPathPrompt } from '../../prompts/path'
import { getWorkspacePrompt } from '../../prompts/workspace'

const serviceGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  // Prompts
  const getPrompts: PlopTypes.DynamicPromptsFunction = async (inquirer) => {
    // Workspace
    const workspacePrompt = getWorkspacePrompt({ mode: 'apps', plop })
    const workspacePromptResponse = await inquirer.prompt([workspacePrompt])

    const [, workspace] = workspacePromptResponse.workspace.split('/')

    // Path
    const pathPrompt = await getPathPrompt({
      mode: 'file',
      element: 'service',
      linkedFile: 'page.tsx',
      workspace,
      plop,
      inquirer,
    })
    const pathPromptResponse = await inquirer.prompt([pathPrompt])

    const path = nodePath.dirname(pathPromptResponse.path)

    // Name
    const namePrompt = getElementNamePrompt({
      element: 'service',
      examples: ['posts', 'comments', 'users'],
    })
    const { name } = await inquirer.prompt([namePrompt])

    return { workspace, path, name }
  }

  // Actions
  const addFilesActions = getAddFilesAction({
    mode: 'private-folder',
    folderName: 'services',
    files: ['service.ts', 'index.ts', 'types.ts'],
  })

  // Generator
  plop.setGenerator('🧠 Service', {
    description:
      'Conjunto de funciones que encapsulan lógica de negocio. Comúnmente utilizado para realizar peticiones a una API.',
    prompts: getPrompts,
    actions: addFilesActions,
  })
}

export { serviceGenerator }
