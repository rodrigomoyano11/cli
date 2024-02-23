import { Prompt } from './types'

type GetElementNamePromptOptions = {
  element: string
  examples: string[]
}

const getElementNamePrompt = ({ element, examples }: GetElementNamePromptOptions): Prompt => ({
  type: 'input',
  name: 'name',
  message: `Cuál es el nombre del elemento "${element}"? (ej. ${examples.join(', ')})`,
  validate: (input) =>
    input ? true : `Por favor, introduce un nombre para el elemento "${element}"`,
})

export type { GetElementNamePromptOptions }
export { getElementNamePrompt }
