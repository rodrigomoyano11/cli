import { PlopTypes } from '@turbo/gen'

type Prompt = Exclude<PlopTypes.Prompts, Function>[number]

export type { Prompt }
