interface StatsBarProps {
  count: number
  language: string
  sortLabel: string
  search: string
  lastUpdated: string | null
}

export function StatsBar({ count, language, sortLabel, search, lastUpdated }: StatsBarProps) {
  return (
    <section className="stats-bar">
      <div>
        <strong>{count}</strong> repositories shown
      </div>
      <div>Language: {language}</div>
      <div>Sort: {sortLabel}</div>
      <div>Search: {search.trim() ? search : 'None'}</div>
      <div>{lastUpdated ? `Updated: ${lastUpdated}` : 'Not loaded yet'}</div>
    </section>
  )
}
