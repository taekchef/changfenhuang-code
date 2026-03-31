import type { Command } from '../../commands.js'
import { isChangfenhuangAISubscriber } from '../../utils/auth.js'

const rateLimitOptions = {
  type: 'local-jsx',
  name: 'rate-limit-options',
  description: 'Show options when rate limit is reached',
  isEnabled: () => {
    if (!isChangfenhuangAISubscriber()) {
      return false
    }

    return true
  },
  isHidden: false /* changfenhuang-code: unhidden */, // Hidden from help - only used internally
  load: () => import('./rate-limit-options.js'),
} satisfies Command

export default rateLimitOptions
