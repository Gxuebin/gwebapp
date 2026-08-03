import type { LanguageOption, SortOption } from './types'

export const LANGUAGES: LanguageOption[] = [
  'All',
  'TypeScript',
  'JavaScript',
  'Python',
  'Go',
  'Rust',
  'Java',
]

export const SORTS: { label: string; value: SortOption }[] = [
  { label: 'Most Stars', value: 'stars' },
  { label: 'Recently Updated', value: 'updated' },
]
