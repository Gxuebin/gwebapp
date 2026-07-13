import type { LanguageOption, RepoItem } from './types'

const API_BASE = 'https://api.github.com/search/repositories'

const languageToQuery = (language: LanguageOption) => {
  if (language === 'All') return 'stars:>1'
  return `stars:>1 language:${language}`
}

export async function fetchTrendingRepos(language: LanguageOption): Promise<RepoItem[]> {
  const query = encodeURIComponent(languageToQuery(language))
  const url = `${API_BASE}?q=${query}&sort=stars&order=desc&per_page=20`

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
