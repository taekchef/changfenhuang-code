// In its own file to avoid circular dependencies
export const FILE_EDIT_TOOL_NAME = 'Edit'

// Permission pattern for granting session-level access to the project's .changfenhuang/ folder
export const CHANGFENHUANG_FOLDER_PERMISSION_PATTERN = '/.changfenhuang/**'

// Permission pattern for granting session-level access to the global ~/.changfenhuang/ folder
export const GLOBAL_CHANGFENHUANG_FOLDER_PERMISSION_PATTERN = '~/.changfenhuang/**'

export const FILE_UNEXPECTEDLY_MODIFIED_ERROR =
  'File has been unexpectedly modified. Read it again before attempting to write it.'
