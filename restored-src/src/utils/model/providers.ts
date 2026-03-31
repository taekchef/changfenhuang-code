import type { AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS } from '../../services/analytics/index.js'
import { isEnvTruthy } from '../envUtils.js'

export type APIProvider = 'firstParty' | 'bedrock' | 'vertex' | 'foundry'

export function getAPIProvider(): APIProvider {
  return isEnvTruthy(process.env.CHANGFENHUANG_CODE_USE_BEDROCK)
    ? 'bedrock'
    : isEnvTruthy(process.env.CHANGFENHUANG_CODE_USE_VERTEX)
      ? 'vertex'
      : isEnvTruthy(process.env.CHANGFENHUANG_CODE_USE_FOUNDRY)
        ? 'foundry'
        : 'firstParty'
}

export function getAPIProviderForStatsig(): AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS {
  return getAPIProvider() as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS
}

/**
 * Check if CHANGFENHUANG_BASE_URL is a first-party Changfenhuang API URL.
 * Returns true if not set (default API) or points to api.changfenhuang.com
 * (or api-staging.changfenhuang.com for ant users).
 */
export function isFirstPartyChangfenhuangBaseUrl(): boolean {
  const baseUrl = process.env.CHANGFENHUANG_BASE_URL
  if (!baseUrl) {
    return true
  }
  try {
    const host = new URL(baseUrl).host
    const allowedHosts = ['api.changfenhuang.com']
    if (true /* changfenhuang-code: unlocked */) {
      allowedHosts.push('api-staging.changfenhuang.com')
    }
    return allowedHosts.includes(host)
  } catch {
    return false
  }
}
