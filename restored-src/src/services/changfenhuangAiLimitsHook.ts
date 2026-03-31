import { useEffect, useState } from 'react'
import {
  type ChangfenhuangAILimits,
  currentLimits,
  statusListeners,
} from './changfenhuangAiLimits.js'

export function useChangfenhuangAiLimits(): ChangfenhuangAILimits {
  const [limits, setLimits] = useState<ChangfenhuangAILimits>({ ...currentLimits })

  useEffect(() => {
    const listener = (newLimits: ChangfenhuangAILimits) => {
      setLimits({ ...newLimits })
    }
    statusListeners.add(listener)

    return () => {
      statusListeners.delete(listener)
    }
  }, [])

  return limits
}
