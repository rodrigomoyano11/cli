import { PlopTypes } from '@turbo/gen'
import nodeFs from 'node:fs'
import nodePath from 'node:path'
import { FileTreeSelectionPrompt, Inquirer } from './types'

type GetPathPromptOptions =
  | {
      mode: 'file'
      element: string
      workspace: string
      plop: PlopTypes.NodePlopAPI
      inquirer: Inquirer
      linkedFile: string
    }
  | {
      mode: 'folder'
      element: string
      workspace: string
      plop: PlopTypes.NodePlopAPI
      inquirer: Inquirer
    }

const getPathPrompt = async (options: GetPathPromptOptions): Promise<FileTreeSelectionPrompt> => {
  // Options
  const { element, plop, inquirer, workspace, mode } = options

  // Dependencies
  const fileTreeSelection = await import('inquirer-file-tree-selection-prompt')
  inquirer.registerPrompt('file-tree-selection', fileTreeSelection.default)

  // Constants
  const message = `A qué página quieres añadir el ${element}? ${mode === 'file' ? `Selecciona un archivo "${options.linkedFile}".` : `Selecciona una carpeta.`}`

  const root = nodePath.join(plop.getDestBasePath(), 'apps', workspace, 'src\\app')

  // Main
  return {
    type: 'file-tree-selection',
    name: 'path',
    message,
    root,
    hideRoot: true,
    validate: (input) => {
      if (mode === 'file') {
        const hasLinkedFile = input.endsWith(options.linkedFile)
        return hasLinkedFile || `Selecciona un archivo "${options.linkedFile}"`
      }

      const isFolder = nodeFs.statSync(input).isDirectory()
      return isFolder || 'Selecciona una carpeta'
    },
    transformer: (input: string) => {
      const name = nodePath.basename(input)

      const isFolder = nodeFs.statSync(input).isDirectory()
      if (isFolder) return `📁 ${name}`

      if (mode === 'folder') return `🔘 ${name}`

      const isLinkedElement = name === options.linkedFile
      const icon = isLinkedElement ? '🟢' : '🔴'
      return `${icon} ${name}`
    },
  }
}

export type { GetPathPromptOptions }
export { getPathPrompt }
