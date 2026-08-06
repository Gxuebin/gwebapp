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

function sanitizeSearch(value: string) {
  const tokens = value
    .trim()
    .split(/\s+/)
    .map((token) => token.replace(/"/g, ''))
    .filter(Boolean)

  if (tokens.length === 0) return ''
  return tokens.map((token) => `"${token}"`).join(' ')
}

export async function fetchTrendingRepos({ language, page, search, sort }: FetchTrendingParams): Promise<RepoItem[]> {
  const parts = [languageToQuery(language)]

  const safeSearch = sanitizeSearch(search)
  if (safeSearch) {
    parts.push(safeSearch)
  }

  const query = encodeURIComponent(parts.join(' '))
  const url = `${API_BASE}?q=${query}&sort=${sort}&order=desc&per_page=${PER_PAGE}&page=${page}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!response.ok) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    const reset = response.headers.get('x-ratelimit-reset')
    const retryAfter = response.headers.get('retry-after')
    const contentType = response.headers.get('content-type') ?? ''
    let apiMessage = ''

    try {
      if (contentType.includes('application/json')) {
        const body = (await response.json()) as { message?: unknown }
        apiMessage = typeof body?.message === 'string' ? body.message : ''
      } else {
        apiMessage = (await response.text()).trim()
      }
    } catch {
      apiMessage = ''
    }

    if ((response.status === 403 || response.status === 429) && (remaining === '0' || retryAfter || reset)) {
      const resetTime = reset ? new Date(Number(reset) * 1000).toLocaleString() : null
      const retrySeconds = retryAfter ? Number(retryAfter) : null
      const pieces = ['GitHub API rate limit exceeded.']
      if (retrySeconds && Number.isFinite(retrySeconds)) {
        pieces.push(`Retry after ${retrySeconds}s.`)
      }
      if (resetTime) {
        pieces.push(`Reset at ${resetTime}.`)
      }
      throw new Error(pieces.join(' '))
    }

    throw new Error(`GitHub API error: ${response.status}${apiMessage ? ` - ${apiMessage}` : ''}`)
  }

  const data = (await response.json()) as { items?: RepoItem[] }
  return data.items ?? []
}
