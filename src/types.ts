export type LanguageOption = 'All' | 'TypeScript' | 'JavaScript' | 'Python' | 'Go' | 'Rust' | 'Java'

export interface RepoItem {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}
