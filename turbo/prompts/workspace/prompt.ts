import nodePath from 'node:path'
import nodeFs from 'node:fs'
import { Prompt } from './types'
import { PlopTypes } from '@turbo/gen'

type GetWorkspacePromptOptions = {
  mode: 'apps' | 'packages' | 'all'
  plop: PlopTypes.NodePlopAPI
}

const getWorkspacePrompt = ({ mode, plop }: GetWorkspacePromptOptions): Prompt => {
  const basePath = plop.getDestBasePath()

  const basePrompt: Extract<Prompt, { type: 'list' }> = {
    type: 'list',
    name: 'workspace',
    message: `Qué workspace quieres seleccionar?`,
  }

  const apps = nodeFs.readdirSync(nodePath.join(basePath, 'apps')).map((item) => `apps/${item}`)

  if (mode === 'apps') return { ...basePrompt, choices: apps }

  const packages = nodeFs
    .readdirSync(nodePath.join(basePath, 'packages'))
    .map((item) => `packages/${item}`)

  if (mode === 'packages') return { ...basePrompt, choices: packages }

  const choices = [...apps, ...packages]
  return { ...basePrompt, choices }
}

export type { GetWorkspacePromptOptions }
export { getWorkspacePrompt }
