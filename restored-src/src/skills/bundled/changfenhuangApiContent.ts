// Content for the changfenhuang-api bundled skill.
// Each .md file is inlined as a string at build time via Bun's text loader.

import csharpChangfenhuangApi from './changfenhuang-api/csharp/changfenhuang-api.md'
import curlExamples from './changfenhuang-api/curl/examples.md'
import goChangfenhuangApi from './changfenhuang-api/go/changfenhuang-api.md'
import javaChangfenhuangApi from './changfenhuang-api/java/changfenhuang-api.md'
import phpChangfenhuangApi from './changfenhuang-api/php/changfenhuang-api.md'
import pythonAgentSdkPatterns from './changfenhuang-api/python/agent-sdk/patterns.md'
import pythonAgentSdkReadme from './changfenhuang-api/python/agent-sdk/README.md'
import pythonChangfenhuangApiBatches from './changfenhuang-api/python/changfenhuang-api/batches.md'
import pythonChangfenhuangApiFilesApi from './changfenhuang-api/python/changfenhuang-api/files-api.md'
import pythonChangfenhuangApiReadme from './changfenhuang-api/python/changfenhuang-api/README.md'
import pythonChangfenhuangApiStreaming from './changfenhuang-api/python/changfenhuang-api/streaming.md'
import pythonChangfenhuangApiToolUse from './changfenhuang-api/python/changfenhuang-api/tool-use.md'
import rubyChangfenhuangApi from './changfenhuang-api/ruby/changfenhuang-api.md'
import skillPrompt from './changfenhuang-api/SKILL.md'
import sharedErrorCodes from './changfenhuang-api/shared/error-codes.md'
import sharedLiveSources from './changfenhuang-api/shared/live-sources.md'
import sharedModels from './changfenhuang-api/shared/models.md'
import sharedPromptCaching from './changfenhuang-api/shared/prompt-caching.md'
import sharedToolUseConcepts from './changfenhuang-api/shared/tool-use-concepts.md'
import typescriptAgentSdkPatterns from './changfenhuang-api/typescript/agent-sdk/patterns.md'
import typescriptAgentSdkReadme from './changfenhuang-api/typescript/agent-sdk/README.md'
import typescriptChangfenhuangApiBatches from './changfenhuang-api/typescript/changfenhuang-api/batches.md'
import typescriptChangfenhuangApiFilesApi from './changfenhuang-api/typescript/changfenhuang-api/files-api.md'
import typescriptChangfenhuangApiReadme from './changfenhuang-api/typescript/changfenhuang-api/README.md'
import typescriptChangfenhuangApiStreaming from './changfenhuang-api/typescript/changfenhuang-api/streaming.md'
import typescriptChangfenhuangApiToolUse from './changfenhuang-api/typescript/changfenhuang-api/tool-use.md'

// @[MODEL LAUNCH]: Update the model IDs/names below. These are substituted into {{VAR}}
// placeholders in the .md files at runtime before the skill prompt is sent.
// After updating these constants, manually update the two files that still hardcode models:
//   - changfenhuang-api/SKILL.md (Current Models pricing table)
//   - changfenhuang-api/shared/models.md (full model catalog with legacy versions and alias mappings)
export const SKILL_MODEL_VARS = {
  OPUS_ID: 'changfenhuang-opus-4-6',
  OPUS_NAME: 'Changfenhuang Opus 4.6',
  SONNET_ID: 'changfenhuang-sonnet-4-6',
  SONNET_NAME: 'Changfenhuang Sonnet 4.6',
  HAIKU_ID: 'changfenhuang-haiku-4-5',
  HAIKU_NAME: 'Changfenhuang Haiku 4.5',
  // Previous Sonnet ID — used in "do not append date suffixes" example in SKILL.md.
  PREV_SONNET_ID: 'changfenhuang-sonnet-4-5',
} satisfies Record<string, string>

export const SKILL_PROMPT: string = skillPrompt

export const SKILL_FILES: Record<string, string> = {
  'csharp/changfenhuang-api.md': csharpChangfenhuangApi,
  'curl/examples.md': curlExamples,
  'go/changfenhuang-api.md': goChangfenhuangApi,
  'java/changfenhuang-api.md': javaChangfenhuangApi,
  'php/changfenhuang-api.md': phpChangfenhuangApi,
  'python/agent-sdk/README.md': pythonAgentSdkReadme,
  'python/agent-sdk/patterns.md': pythonAgentSdkPatterns,
  'python/changfenhuang-api/README.md': pythonChangfenhuangApiReadme,
  'python/changfenhuang-api/batches.md': pythonChangfenhuangApiBatches,
  'python/changfenhuang-api/files-api.md': pythonChangfenhuangApiFilesApi,
  'python/changfenhuang-api/streaming.md': pythonChangfenhuangApiStreaming,
  'python/changfenhuang-api/tool-use.md': pythonChangfenhuangApiToolUse,
  'ruby/changfenhuang-api.md': rubyChangfenhuangApi,
  'shared/error-codes.md': sharedErrorCodes,
  'shared/live-sources.md': sharedLiveSources,
  'shared/models.md': sharedModels,
  'shared/prompt-caching.md': sharedPromptCaching,
  'shared/tool-use-concepts.md': sharedToolUseConcepts,
  'typescript/agent-sdk/README.md': typescriptAgentSdkReadme,
  'typescript/agent-sdk/patterns.md': typescriptAgentSdkPatterns,
  'typescript/changfenhuang-api/README.md': typescriptChangfenhuangApiReadme,
  'typescript/changfenhuang-api/batches.md': typescriptChangfenhuangApiBatches,
  'typescript/changfenhuang-api/files-api.md': typescriptChangfenhuangApiFilesApi,
  'typescript/changfenhuang-api/streaming.md': typescriptChangfenhuangApiStreaming,
  'typescript/changfenhuang-api/tool-use.md': typescriptChangfenhuangApiToolUse,
}
