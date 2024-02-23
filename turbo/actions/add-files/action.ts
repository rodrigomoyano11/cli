import { PlopTypes } from '@turbo/gen'
import nodePath from 'node:path'

type GetAddFilesActionOptions =
  | {
      mode: 'private-folder'
      folderName: string
      files: `${string}.${string}`[]
    }
  | {
      mode: 'same-folder'
      files: `${string}.${string}`[]
    }

const getAddFilesAction = (options: GetAddFilesActionOptions): PlopTypes.ActionType[] => {
  const { mode, files } = options

  return files.map((file): PlopTypes.ActionType => {
    const [templateFile] = file.split('.')

    if (mode === 'same-folder') {
      return {
        type: 'add',
        path: nodePath.join(`{{ path }}`, file),
      }
    }

    const { folderName } = options

    return {
      type: 'add',
      path: nodePath.join(`{{ path }}\\_\\${folderName}`, `{{ name }}`, file),
      templateFile: `./${templateFile}.hbs`,
    }
  })
}

export type { GetAddFilesActionOptions }
export { getAddFilesAction }
