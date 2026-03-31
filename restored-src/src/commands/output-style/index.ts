import type { Command } from '../../commands.js'

const outputStyle = {
  type: 'local-jsx',
  name: 'output-style',
  description: 'Deprecated: use /config to change output style',
  isHidden: false /* changfenhuang-code: unhidden */,
  load: () => import('./output-style.js'),
} satisfies Command

export default outputStyle
