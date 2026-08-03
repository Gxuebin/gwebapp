import { LANGUAGES, SORTS } from '../constants'
import type { LanguageOption, SortOption } from '../types'

interface FilterBarProps {
  language: LanguageOption
  search: string
  sort: SortOption
  onLanguageChange: (language: LanguageOption) => void
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onSortChange: (sort: SortOption) => void
  onRefresh: () => void
  loading: boolean
}

export function FilterBar({
  language,
  search,
  sort,
  onLanguageChange,
  onSearchChange,
  onSearchSubmit,
  onSortChange,
  onRefresh,
  loading,
}: FilterBarProps) {
  return (
    <div className="toolbar-shell">
      <div className="search-row">
        <input
          className="search-input"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSearchSubmit()
            }
          }}
          placeholder="Search repositories, topics, or keywords"
        />
        <select className="sort-select" value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)}>
          {SORTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="primary-btn" onClick={onSearchSubmit} disabled={loading}>
          Search
        </button>
        <button className="ghost-btn" onClick={onRefresh} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="tabs">
        {LANGUAGES.map((item) => (
          <button
            key={item}
            className={item === language ? 'tab active' : 'tab'}
            onClick={() => onLanguageChange(item)}
            disabled={loading}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
