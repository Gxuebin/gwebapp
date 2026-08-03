import type { LanguageOption, RepoItem, SortOption } from './types'

const API_BASE = 'https://api.github.com/search/repositories'
export const PER_PAGE = 12

const languageToQuery = (language: LanguageOption) => {
  if (language === 'All') return 'stars:>50'
  return `stars:>50 language:${language}`
}

interface FetchTrendingParams {
  language: LanguageOption
  page: number
  search: string
  sort: SortOption
}

export async function fetchTrendingRepos({ language, page, search, sort }: FetchTrendingParams): Promise<RepoItem[]> {
  const parts = [languageToQuery(language)]

  if (search.trim()) {
    parts.push(search.trim())
  }

  const query = encodeURIComponent(parts.join(' '))
  const url = `${API_BASE}?q=${query}&sort=${sort}&order=desc&per_page=${PER_PAGE}&page=${page}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  const data = (await response.json()) as { items?: RepoItem[] }
  return data.items ?? []
}
