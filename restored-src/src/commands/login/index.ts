import type { Command } from '../../commands.js'
import { hasChangfenhuangApiKeyAuth } from '../../utils/auth.js'
import { isEnvTruthy } from '../../utils/envUtils.js'

export default () =>
  ({
    type: 'local-jsx',
    name: 'login',
    description: hasChangfenhuangApiKeyAuth()
      ? 'Switch Changfenhuang accounts'
      : 'Sign in with your Changfenhuang account',
    isEnabled: () => !isEnvTruthy(process.env.DISABLE_LOGIN_COMMAND),
    load: () => import('./login.js'),
  }) satisfies Command
