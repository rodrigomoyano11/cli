import { PlopTypes } from '@turbo/gen'
import { componentGenerator } from './templates/component/main'
import { envGenerator } from './templates/env/main'
import { hookGenerator } from './templates/hook/main'
import { pageGenerator } from './templates/page/main'
import { serviceGenerator } from './templates/service/main'
import { utilGenerator } from './templates/util/main'

const generator = (plop: PlopTypes.NodePlopAPI): void => {
  componentGenerator(plop)
  pageGenerator(plop)
  hookGenerator(plop)
  serviceGenerator(plop)
  utilGenerator(plop)
  envGenerator(plop)
}

export default generator
