import { LANGUAGES } from '../constants'
import type { LanguageOption } from '../types'

interface FilterBarProps {
  value: LanguageOption
  onChange: (language: LanguageOption) => void
  onRefresh: () => void
  loading: boolean
}

export function FilterBar({ value, onChange, onRefresh, loading }: FilterBarProps) {
  return (
    <div className="toolbar">
      <div className="tabs">
        {LANGUAGES.map((language) => (
          <button
            key={language}
            className={language === value ? 'tab active' : 'tab'}
            onClick={() => onChange(language)}
            disabled={loading}
          >
            {language}
          </button>
        ))}
      </div>
      <button className="refresh-btn" onClick={onRefresh} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  )
}
