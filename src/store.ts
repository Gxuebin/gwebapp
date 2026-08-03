import { create } from 'zustand'
import { fetchTrendingRepos, PER_PAGE } from './api'
import type { LanguageOption, LayoutMode, RepoItem, SortOption, ThemeMode } from './types'

let requestId = 0
const THEME_STORAGE_KEY = 'hot-github-theme'

interface TrendingState {
  language: LanguageOption
  searchInput: string
  search: string
  sort: SortOption
  layout: LayoutMode
  theme: ThemeMode
  repos: RepoItem[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  lastUpdated: string | null
  page: number
  hasMore: boolean
  setLanguage: (language: LanguageOption) => Promise<void>
  setSearchInput: (search: string) => void
  applySearch: () => Promise<void>
  setSort: (sort: SortOption) => Promise<void>
  setLayout: (layout: LayoutMode) => void
  setTheme: (theme: ThemeMode) => void
  refresh: () => Promise<void>
  loadMore: () => Promise<void>
}

type QueryState = Pick<TrendingState, 'language' | 'search' | 'sort' | 'repos'>

function getEffectiveSearch(state: Pick<TrendingState, 'searchInput'>) {
  return state.searchInput.trim()
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'light' ? 'light' : 'dark'
}

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
  searchInput: '',
  search: '',
  sort: 'stars',
  layout: 'list',
  theme: getInitialTheme(),
  repos: [],
  loading: false,
  loadingMore: false,
  error: null,
  lastUpdated: null,
  page: 1,
  hasMore: true,
  setLanguage: async (language) => {
    const state = get()
    if (state.language === language) return
    set({
      language,
      search: getEffectiveSearch(state),
      page: 1,
      repos: [],
      hasMore: true,
      loading: true,
      error: null,
    })
    await get().refresh()
  },
  setSearchInput: (searchInput) => set({ searchInput }),
  applySearch: async () => {
    set((state) => ({
      search: getEffectiveSearch(state),
      page: 1,
      repos: [],
      hasMore: true,
      loading: true,
      error: null,
    }))
    await get().refresh()
  },
  setSort: async (sort) => {
    const state = get()
    if (state.sort === sort) return
    set({
      sort,
      search: getEffectiveSearch(state),
      page: 1,
      repos: [],
      hasMore: true,
      loading: true,
      error: null,
    })
    await get().refresh()
  },
  setLayout: (layout) => set({ layout }),
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
    set({ theme })
  },
  refresh: async () => {
    const currentRequestId = ++requestId
    const state = get()
    const effectiveSearch = getEffectiveSearch(state)
    set({
      search: effectiveSearch,
      loading: true,
      loadingMore: false,
      error: null,
    })
    try {
      await loadPage(1, false, { ...state, search: effectiveSearch }, set, currentRequestId)
    } catch (error) {
      if (currentRequestId !== requestId) return
      set({
        loading: false,
        loadingMore: false,
        repos: [],
        page: 1,
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
