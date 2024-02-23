import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'
import { getAddFilesAction } from '../../actions/add-files'
import { getElementNamePrompt } from '../../prompts/name'
import { getPathPrompt } from '../../prompts/path'
import { getWorkspacePrompt } from '../../prompts/workspace'

const componentGenerator = (plop: PlopTypes.NodePlopAPI): void => {
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
      element: 'component',
      linkedFile,
      workspace,
      plop,
      inquirer,
    })
    const pathPromptResponse = await inquirer.prompt([pathPrompt])

    const path = nodePath.dirname(pathPromptResponse.path)

    // Name
    const namePrompt = getElementNamePrompt({
      element: 'component',
      examples: ['Button', 'Card', 'Form'],
    })
    const { name } = await inquirer.prompt([namePrompt])

    return { workspace, path, name }
  }

  // Actions
  const addFilesActions = getAddFilesAction({
    mode: 'private-folder',
    folderName: 'components',
    files: ['component.tsx', 'index.ts', 'styles.css', 'types.ts', 'constants.ts', 'examples.tsx'],
  })

  // Generator
  plop.setGenerator('🧩 Component', {
    description:
      'Elemento de interfaz de usuario que puede ser reutilizado en diferentes partes de la aplicación.',
    prompts: getPrompts,
    actions: addFilesActions,
  })
}

export { componentGenerator }
