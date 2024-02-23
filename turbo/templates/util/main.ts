import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'
import { getAddFilesAction } from '../../actions/add-files'
import { getElementNamePrompt } from '../../prompts/name'
import { getPathPrompt } from '../../prompts/path'
import { getWorkspacePrompt } from '../../prompts/workspace'

const utilGenerator = (plop: PlopTypes.NodePlopAPI): void => {
  // Prompts
  const getPrompts: PlopTypes.DynamicPromptsFunction = async (inquirer) => {
    // Workspace
    const workspacePrompt = getWorkspacePrompt({ mode: 'apps', plop })
    const workspacePromptResponse = await inquirer.prompt([workspacePrompt])

    const [, workspace] = workspacePromptResponse.workspace.split('/')

    // Path
    const linkedFile = 'page.tsx'

    const pathPrompt = await getPathPrompt({
      mode: 'file',
      element: 'util',
      linkedFile,
      workspace,
      plop,
      inquirer,
    })
    const pathPromptResponse = await inquirer.prompt([pathPrompt])

    const path = nodePath.dirname(pathPromptResponse.path)

    // Name
    const namePrompt = getElementNamePrompt({
      element: 'util',
      examples: ['formatDate', 'getRandomColor', 'capitalize'],
    })
    const { name } = await inquirer.prompt([namePrompt])

    return { workspace, path, name }
  }

  // Actions
  const addFilesActions = getAddFilesAction({
    mode: 'private-folder',
    folderName: 'utils',
    files: ['util.ts', 'index.ts', 'types.ts'],
  })

  // Generator
  plop.setGenerator('🔧 Util', {
    description:
      'Funciones de utilidad que encapsulan lógica reutilizable. No dependen del ciclo de vida de un componente.',
    prompts: getPrompts,
    actions: addFilesActions,
  })
}

export { utilGenerator }
