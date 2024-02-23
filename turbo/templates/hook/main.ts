import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'
import { getAddFilesAction } from '../../actions/add-files'
import { getElementNamePrompt } from '../../prompts/name'
import { getPathPrompt } from '../../prompts/path'
import { getWorkspacePrompt } from '../../prompts/workspace'

const hookGenerator = (plop: PlopTypes.NodePlopAPI): void => {
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
      element: 'hook',
      linkedFile,
      workspace,
      plop,
      inquirer,
    })
    const pathPromptResponse = await inquirer.prompt([pathPrompt])

    const path = nodePath.dirname(pathPromptResponse.path)

    // Name
    const namePrompt = getElementNamePrompt({
      element: 'hook',
      examples: ['useLocalStorage', 'useFetch', 'useDebounce'],
    })
    const { name } = await inquirer.prompt([namePrompt])

    return { workspace, path, name }
  }

  // Actions
  const addFilesActions = getAddFilesAction({
    mode: 'private-folder',
    folderName: 'hooks',
    files: ['hook.ts', 'index.ts', 'types.ts'],
  })

  // Generator
  plop.setGenerator('🪝  Hook', {
    description: 'Función que encapsula lógica reutilizable.',
    prompts: getPrompts,
    actions: addFilesActions,
  })
}

export { hookGenerator }
