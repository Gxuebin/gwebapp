interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onRefresh: () => void
  loading: boolean
  loadingMore: boolean
}

export function FilterBar({
  search,
  onSearchChange,
  onSearchSubmit,
  onRefresh,
  loading,
  loadingMore: _loadingMore,
}: FilterBarProps) {
  return (
    <div className="toolbar-shell">
      <div className="toolbar-primary">
        <div className="toolbar-search">
          <div className="toolbar-search-copy">
            <label className="toolbar-search-label" htmlFor="repo-search-input">
              搜索仓库
            </label>
            <span className="toolbar-search-hint">输入关键词后按 Enter 查询，筛选与展示偏好在左侧面板中调整。</span>
          </div>
          <div className="search-inline">
            <input
              id="repo-search-input"
              className="search-input"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                const nativeEvent = event.nativeEvent as KeyboardEvent
                if (event.key === 'Enter' && !nativeEvent.isComposing) {
                  onSearchSubmit()
                }
              }}
              placeholder="搜索仓库名称、描述或关键词"
            />
            <button className="primary-btn" onClick={onSearchSubmit} disabled={loading}>
              查询
            </button>
            <button className="ghost-btn ghost-btn--refresh" onClick={onRefresh} disabled={loading}>
              {loading ? '刷新中' : '刷新'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
