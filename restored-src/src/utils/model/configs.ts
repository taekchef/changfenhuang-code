import type { ModelName } from './model.js'
import type { APIProvider } from './providers.js'

export type ModelConfig = Record<APIProvider, ModelName>

// @[MODEL LAUNCH]: Add a new CHANGFENHUANG_*_CONFIG constant here. Double check the correct model strings
// here since the pattern may change.

export const CHANGFENHUANG_3_7_SONNET_CONFIG = {
  firstParty: 'changfenhuang-3-7-sonnet-20250219',
  bedrock: 'us.changfenhuang.changfenhuang-3-7-sonnet-20250219-v1:0',
  vertex: 'changfenhuang-3-7-sonnet@20250219',
  foundry: 'changfenhuang-3-7-sonnet',
} as const satisfies ModelConfig

export const CHANGFENHUANG_3_5_V2_SONNET_CONFIG = {
  firstParty: 'changfenhuang-3-5-sonnet-20241022',
  bedrock: 'changfenhuang.changfenhuang-3-5-sonnet-20241022-v2:0',
  vertex: 'changfenhuang-3-5-sonnet-v2@20241022',
  foundry: 'changfenhuang-3-5-sonnet',
} as const satisfies ModelConfig

export const CHANGFENHUANG_3_5_HAIKU_CONFIG = {
  firstParty: 'changfenhuang-3-5-haiku-20241022',
  bedrock: 'us.changfenhuang.changfenhuang-3-5-haiku-20241022-v1:0',
  vertex: 'changfenhuang-3-5-haiku@20241022',
  foundry: 'changfenhuang-3-5-haiku',
} as const satisfies ModelConfig

export const CHANGFENHUANG_HAIKU_4_5_CONFIG = {
  firstParty: 'changfenhuang-haiku-4-5-20251001',
  bedrock: 'us.changfenhuang.changfenhuang-haiku-4-5-20251001-v1:0',
  vertex: 'changfenhuang-haiku-4-5@20251001',
  foundry: 'changfenhuang-haiku-4-5',
} as const satisfies ModelConfig

export const CHANGFENHUANG_SONNET_4_CONFIG = {
  firstParty: 'changfenhuang-sonnet-4-20250514',
  bedrock: 'us.changfenhuang.changfenhuang-sonnet-4-20250514-v1:0',
  vertex: 'changfenhuang-sonnet-4@20250514',
  foundry: 'changfenhuang-sonnet-4',
} as const satisfies ModelConfig

export const CHANGFENHUANG_SONNET_4_5_CONFIG = {
  firstParty: 'changfenhuang-sonnet-4-5-20250929',
  bedrock: 'us.changfenhuang.changfenhuang-sonnet-4-5-20250929-v1:0',
  vertex: 'changfenhuang-sonnet-4-5@20250929',
  foundry: 'changfenhuang-sonnet-4-5',
} as const satisfies ModelConfig

export const CHANGFENHUANG_OPUS_4_CONFIG = {
  firstParty: 'changfenhuang-opus-4-20250514',
  bedrock: 'us.changfenhuang.changfenhuang-opus-4-20250514-v1:0',
  vertex: 'changfenhuang-opus-4@20250514',
  foundry: 'changfenhuang-opus-4',
} as const satisfies ModelConfig

export const CHANGFENHUANG_OPUS_4_1_CONFIG = {
  firstParty: 'changfenhuang-opus-4-1-20250805',
  bedrock: 'us.changfenhuang.changfenhuang-opus-4-1-20250805-v1:0',
  vertex: 'changfenhuang-opus-4-1@20250805',
  foundry: 'changfenhuang-opus-4-1',
} as const satisfies ModelConfig

export const CHANGFENHUANG_OPUS_4_5_CONFIG = {
  firstParty: 'changfenhuang-opus-4-5-20251101',
  bedrock: 'us.changfenhuang.changfenhuang-opus-4-5-20251101-v1:0',
  vertex: 'changfenhuang-opus-4-5@20251101',
  foundry: 'changfenhuang-opus-4-5',
} as const satisfies ModelConfig

export const CHANGFENHUANG_OPUS_4_6_CONFIG = {
  firstParty: 'changfenhuang-opus-4-6',
  bedrock: 'us.changfenhuang.changfenhuang-opus-4-6-v1',
  vertex: 'changfenhuang-opus-4-6',
  foundry: 'changfenhuang-opus-4-6',
} as const satisfies ModelConfig

export const CHANGFENHUANG_SONNET_4_6_CONFIG = {
  firstParty: 'changfenhuang-sonnet-4-6',
  bedrock: 'us.changfenhuang.changfenhuang-sonnet-4-6',
  vertex: 'changfenhuang-sonnet-4-6',
  foundry: 'changfenhuang-sonnet-4-6',
} as const satisfies ModelConfig

// @[MODEL LAUNCH]: Register the new config here.
export const ALL_MODEL_CONFIGS = {
  haiku35: CHANGFENHUANG_3_5_HAIKU_CONFIG,
  haiku45: CHANGFENHUANG_HAIKU_4_5_CONFIG,
  sonnet35: CHANGFENHUANG_3_5_V2_SONNET_CONFIG,
  sonnet37: CHANGFENHUANG_3_7_SONNET_CONFIG,
  sonnet40: CHANGFENHUANG_SONNET_4_CONFIG,
  sonnet45: CHANGFENHUANG_SONNET_4_5_CONFIG,
  sonnet46: CHANGFENHUANG_SONNET_4_6_CONFIG,
  opus40: CHANGFENHUANG_OPUS_4_CONFIG,
  opus41: CHANGFENHUANG_OPUS_4_1_CONFIG,
  opus45: CHANGFENHUANG_OPUS_4_5_CONFIG,
  opus46: CHANGFENHUANG_OPUS_4_6_CONFIG,
} as const satisfies Record<string, ModelConfig>

export type ModelKey = keyof typeof ALL_MODEL_CONFIGS

/** Union of all canonical first-party model IDs, e.g. 'changfenhuang-opus-4-6' | 'changfenhuang-sonnet-4-5-20250929' | … */
export type CanonicalModelId =
  (typeof ALL_MODEL_CONFIGS)[ModelKey]['firstParty']

/** Runtime list of canonical model IDs — used by comprehensiveness tests. */
export const CANONICAL_MODEL_IDS = Object.values(ALL_MODEL_CONFIGS).map(
  c => c.firstParty,
) as [CanonicalModelId, ...CanonicalModelId[]]

/** Map canonical ID → internal short key. Used to apply settings-based modelOverrides. */
export const CANONICAL_ID_TO_KEY: Record<CanonicalModelId, ModelKey> =
  Object.fromEntries(
    (Object.entries(ALL_MODEL_CONFIGS) as [ModelKey, ModelConfig][]).map(
      ([key, cfg]) => [cfg.firstParty, key],
    ),
  ) as Record<CanonicalModelId, ModelKey>
