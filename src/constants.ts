import type { LanguageOption, LayoutMode, SortOption, ThemeMode } from './types'

export const LANGUAGES: LanguageOption[] = [
  'All',
  'TypeScript',
  'JavaScript',
  'Python',
  'Go',
  'Rust',
  'Java',
]

export const LANGUAGE_LABELS: Record<LanguageOption, string> = {
  All: '全部',
  TypeScript: 'TypeScript',
  JavaScript: 'JavaScript',
  Python: 'Python',
  Go: 'Go',
  Rust: 'Rust',
  Java: 'Java',
}

export const SORTS: { label: string; value: SortOption }[] = [
  { label: '星标优先', value: 'stars' },
  { label: '最近更新', value: 'updated' },
]

export const LAYOUTS: { label: string; value: LayoutMode }[] = [
  { label: '卡片', value: 'card' },
  { label: '列表', value: 'list' },
  { label: '瀑布流', value: 'masonry' },
  { label: '分组', value: 'grouped' },
  { label: '详情', value: 'detail' },
]

export const THEMES: { label: string; value: ThemeMode }[] = [
  { label: '深色', value: 'dark' },
  { label: '浅色', value: 'light' },
]
