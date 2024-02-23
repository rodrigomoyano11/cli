import { PlopTypes } from '@turbo/gen'

type Prompt = Exclude<PlopTypes.Prompts, Function>[number]

type Inquirer = Parameters<PlopTypes.DynamicPromptsFunction>[0]

type FileTreeSelectionPrompt<TAnswers extends Record<string, string> = {}> = Prompt & {
  type: 'file-tree-selection'
  pageSize?: number
  onlyShowDir?: boolean
  onlyShowValid?: boolean
  hideChildrenOfValid?: boolean
  multiple?: boolean
  root?: string
  hideRoot?: boolean
  selectedList?: string[]
  enableGoUpperDirectory?: boolean
  transformer?: import('inquirer').Transformer<TAnswers>
}

export type { FileTreeSelectionPrompt, Inquirer }
