import { useEffect } from 'react'
import { FilterBar } from './components/FilterBar'
import { RepoCard } from './components/RepoCard'
import { StatsBar } from './components/StatsBar'
import { useTrendingStore } from './store'

export default function App() {
  const {
    language,
    search,
    sort,
    repos,
    loading,
    loadingMore,
    error,
    lastUpdated,
    hasMore,
    setLanguage,
    setSearch,
    applySearch,
    setSort,
    refresh,
    loadMore,
  } = useTrendingStore()

  useEffect(() => {
    if (repos.length === 0) {
      void refresh()
    }
  }, [repos.length, refresh])

  return (
    <main className="page">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-badge">Discover</span>
          <h1>Hot GitHub</h1>
          <p>
            Explore high-signal repositories with language filters, search, sort options, and a responsive
            trending-inspired interface.
          </p>
        </div>
      </section>

      <FilterBar
        language={language}
        search={search}
        sort={sort}
        onLanguageChange={(next) => void setLanguage(next)}
        onSearchChange={setSearch}
        onSearchSubmit={() => void applySearch()}
        onSortChange={(next) => void setSort(next)}
        onRefresh={() => void refresh()}
        loading={loading}
      />

      <StatsBar
        count={repos.length}
        language={language}
        sortLabel={sort === 'stars' ? 'Most Stars' : 'Recently Updated'}
        search={search}
        lastUpdated={lastUpdated}
      />

      {error ? <div className="state error">Failed to load: {error}</div> : null}
      {!loading && !error && repos.length === 0 ? <div className="state">No repositories found.</div> : null}
      {loading ? <div className="state shimmer">Loading repositories...</div> : null}

      <section className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </section>

      {!loading && repos.length > 0 ? (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={() => void loadMore()} disabled={loadingMore || !hasMore}>
            {loadingMore ? 'Loading more...' : hasMore ? 'Load more' : 'No more results'}
          </button>
        </div>
      ) : null}
    </main>
  )
}
