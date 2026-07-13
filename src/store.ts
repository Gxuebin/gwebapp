import { create } from 'zustand'
import { fetchTrendingRepos } from './api'
import type { LanguageOption, RepoItem } from './types'

interface TrendingState {
  language: LanguageOption
  repos: RepoItem[]
  loading: boolean
  error: string | null
  lastUpdated: string | null
  setLanguage: (language: LanguageOption) => Promise<void>
  refresh: () => Promise<void>
}

export const useTrendingStore = create<TrendingState>((set, get) => ({
  language: 'All',
  repos: [],
  loading: false,
  error: null,
  lastUpdated: null,
  setLanguage: async (language) => {
    set({ language })
    await get().refresh()
  },
  refresh: async () => {
    const { language } = get()
    set({ loading: true, error: null })
    try {
      const repos = await fetchTrendingRepos(language)
      set({
        repos,
        loading: false,
        error: null,
        lastUpdated: new Date().toLocaleString(),
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}))
