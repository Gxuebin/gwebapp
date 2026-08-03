export type LanguageOption = 'All' | 'TypeScript' | 'JavaScript' | 'Python' | 'Go' | 'Rust' | 'Java'
export type SortOption = 'stars' | 'updated'
export type LayoutMode = 'card' | 'list' | 'masonry' | 'grouped' | 'detail'
export type ThemeMode = 'dark' | 'light'

export interface RepoItem {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  open_issues_count: number
  watchers_count: number
  homepage: string | null
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}
