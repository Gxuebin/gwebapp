import { create } from 'zustand'
import { fetchTrendingRepos, PER_PAGE } from './api'
import type { LanguageOption, RepoItem, SortOption } from './types'

let requestId = 0

interface TrendingState {
  language: LanguageOption
  search: string
  sort: SortOption
  repos: RepoItem[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  lastUpdated: string | null
  page: number
  hasMore: boolean
  setLanguage: (language: LanguageOption) => Promise<void>
  setSearch: (search: string) => void
  applySearch: () => Promise<void>
  setSort: (sort: SortOption) => Promise<void>
  refresh: () => Promise<void>
  loadMore: () => Promise<void>
}

type QueryState = Pick<TrendingState, 'language' | 'search' | 'sort' | 'repos'>

async function loadPage(
  page: number,
  append: boolean,
  state: QueryState,
  set: (partial: Partial<TrendingState>) => void,
  currentRequestId: number,
) {
  const repos = await fetchTrendingRepos({
    language: state.language,
    page,
    search: state.search,
    sort: state.sort,
  })

  if (currentRequestId !== requestId) return

  set({
    repos: append ? [...state.repos, ...repos] : repos,
    page,
    hasMore: repos.length >= PER_PAGE,
    loading: false,
    loadingMore: false,
    error: null,
    lastUpdated: new Date().toLocaleString(),
  })
}

export const useTrendingStore = create<TrendingState>((set, get) => ({
  language: 'All',
  search: '',
  sort: 'stars',
  repos: [],
  loading: false,
  loadingMore: false,
  error: null,
  lastUpdated: null,
  page: 1,
  hasMore: true,
  setLanguage: async (language) => {
    set({ language, page: 1, repos: [], hasMore: true })
    await get().refresh()
  },
  setSearch: (search) => set({ search }),
  applySearch: async () => {
    set({ page: 1, repos: [], hasMore: true })
    await get().refresh()
  },
  setSort: async (sort) => {
    set({ sort, page: 1, repos: [], hasMore: true })
    await get().refresh()
  },
  refresh: async () => {
    const currentRequestId = ++requestId
    const state = get()
    set({ loading: true, loadingMore: false, error: null })
    try {
      await loadPage(1, false, state, set, currentRequestId)
    } catch (error) {
      if (currentRequestId !== requestId) return
      set({
        loading: false,
        loadingMore: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
  loadMore: async () => {
    const state = get()
    if (state.loading || state.loadingMore || !state.hasMore) return
    const currentRequestId = ++requestId
    set({ loadingMore: true, error: null })
    try {
      await loadPage(state.page + 1, true, state, set, currentRequestId)
    } catch (error) {
      if (currentRequestId !== requestId) return
      set({
        loadingMore: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}))
