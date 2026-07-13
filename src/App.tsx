import { useEffect } from 'react'
import { FilterBar } from './components/FilterBar'
import { RepoCard } from './components/RepoCard'
import { useTrendingStore } from './store'

export default function App() {
  const { language, repos, loading, error, lastUpdated, setLanguage, refresh } = useTrendingStore()

  useEffect(() => {
    if (repos.length === 0) {
      void refresh()
    }
  }, [repos.length, refresh])

  return (
    <main className="page">
      <section className="hero">
        <h1>Hot GitHub</h1>
        <p>Browse popular GitHub repositories by language with a fast React + Zustand experience.</p>
        {lastUpdated ? <span className="updated">Last updated: {lastUpdated}</span> : null}
      </section>

      <FilterBar
        value={language}
        onChange={(next) => void setLanguage(next)}
        onRefresh={() => void refresh()}
        loading={loading}
      />

      {error ? <div className="state error">Failed to load: {error}</div> : null}
      {!loading && !error && repos.length === 0 ? <div className="state">No repositories found.</div> : null}
      {loading ? <div className="state">Loading repositories...</div> : null}

      <section className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </section>
    </main>
  )
}
