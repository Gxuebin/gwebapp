import { LANGUAGES, LANGUAGE_LABELS, LAYOUTS, SORTS, THEMES } from '../constants'
import type { LanguageOption, LayoutMode, SortOption, ThemeMode } from '../types'

interface StatsBarProps {
  count: number
  search: string
  lastUpdated: string | null
  language: LanguageOption
  sort: SortOption
  layout: LayoutMode
  theme: ThemeMode
  onLanguageChange: (language: LanguageOption) => void
  onSortChange: (sort: SortOption) => void
  onLayoutChange: (layout: LayoutMode) => void
  onThemeChange: (theme: ThemeMode) => void
  loading: boolean
  loadingMore: boolean
}

export function StatsBar({
  count,
  search,
  lastUpdated,
  language,
  sort,
  layout,
  theme,
  onLanguageChange,
  onSortChange,
  onLayoutChange,
  onThemeChange,
  loading,
  loadingMore: _loadingMore,
}: StatsBarProps) {
  const controlsDisabled = loading
  const searchLabel = search.trim() ? search : '未设置'
  const updatedLabel = lastUpdated ?? '尚未加载'

  return (
    <section className="stats-bar">
      <div className="stats-panel-header">
        <span className="stats-keyline">筛选器</span>
        <h2>浏览条件</h2>
        <p className="stats-panel-copy">把会触发请求的条件集中在这里，减少顶部工具栏的干扰。</p>
      </div>

      <div className="stats-summary-card">
        <div className="stats-summary">
          <strong>{count.toLocaleString()}</strong>
          <span>个仓库结果</span>
        </div>
        <span className="stats-helper">关键词：{searchLabel}</span>
        <div className="stats-summary-meta">
          <span>{LANGUAGE_LABELS[language]}</span>
          <span>{SORTS.find((option) => option.value === sort)?.label ?? sort}</span>
          <span>{LAYOUTS.find((option) => option.value === layout)?.label ?? layout}</span>
          <span>{THEMES.find((option) => option.value === theme)?.label ?? theme}</span>
        </div>
      </div>

      <div className="stats-panel-section">
        <div className="stats-section-heading">
          <div className="stats-section-title">结果筛选</div>
          <p className="stats-section-copy">这些条件会直接刷新右侧结果。</p>
        </div>
      </div>

      <div className="stats-panel-section stats-panel-section--compact">
        <div className="stats-section-title">语言</div>
        <div className="filter-chip-list">
          {LANGUAGES.map((item) => (
            <button
              key={item}
              type="button"
              className={item === language ? 'filter-chip active' : 'filter-chip'}
              aria-pressed={item === language}
              disabled={controlsDisabled}
              onClick={() => onLanguageChange(item)}
            >
              {LANGUAGE_LABELS[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-panel-section stats-panel-section--compact">
        <div className="stats-section-title">排序</div>
        <label className="control-group stats-control">
          <select
            className="inline-select"
            value={sort}
            disabled={controlsDisabled}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="stats-panel-section">
        <div className="stats-section-heading">
          <div className="stats-section-title">展示偏好</div>
          <p className="stats-section-copy">只改变浏览方式，不改变搜索结果本身。</p>
        </div>
      </div>

      <div className="stats-panel-section stats-panel-section--compact">
        <div className="stats-section-title">布局</div>
        <div className="layout-grid" role="group" aria-label="布局">
          {LAYOUTS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={option.value === layout ? 'layout-option active' : 'layout-option'}
              aria-pressed={option.value === layout}
              onClick={() => onLayoutChange(option.value as LayoutMode)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-panel-section stats-panel-section--compact">
        <div className="stats-section-title">主题</div>
        <div className="theme-toggle" role="group" aria-label="主题">
          {THEMES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={option.value === theme ? 'theme-option active' : 'theme-option'}
              aria-pressed={option.value === theme}
              onClick={() => onThemeChange(option.value as ThemeMode)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-panel-section stats-panel-section--status">
        <div className="stats-section-title">更新时间</div>
        <div className="stats-updated-card">
          <span className="stats-key">更新时间</span>
          <strong>{updatedLabel}</strong>
        </div>
      </div>
    </section>
  )
}
