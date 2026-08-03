import { useEffect, useRef } from 'react'
import { FilterBar } from './components/FilterBar'
import { RepoCollection } from './components/RepoCollection'
import { StatsBar } from './components/StatsBar'
import { LANGUAGE_LABELS, LAYOUTS, SORTS, THEMES } from './constants'
import { useTrendingStore } from './store'

export default function App() {
  const didInit = useRef(false)
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null)
  const toolbarRef = useRef<HTMLDivElement | null>(null)
  const {
    language,
    searchInput,
    search,
    sort,
    layout,
    theme,
    repos,
    loading,
    loadingMore,
    error,
    lastUpdated,
    hasMore,
    setLanguage,
    setSearchInput,
    applySearch,
    setSort,
    setLayout,
    setTheme,
    refresh,
    loadMore,
  } = useTrendingStore()
  const searchLabel = search.trim() || '全部仓库'
  const languageLabel = LANGUAGE_LABELS[language]
  const sortLabel = SORTS.find((item) => item.value === sort)?.label ?? sort
  const layoutLabel = LAYOUTS.find((item) => item.value === layout)?.label ?? layout
  const themeLabel = THEMES.find((item) => item.value === theme)?.label ?? theme
  const syncLabel = loading ? '正在刷新结果' : loadingMore ? '正在加载更多结果' : lastUpdated ? '已同步' : '等待首次加载'
  const modeTitle = `${layoutLabel}视图 · ${languageLabel}`
  const modeDescription = loading
    ? '正在刷新当前结果。'
    : loadingMore
      ? '正在补充更多结果，当前筛选仍可继续调整。'
      : hasMore
        ? `按${sortLabel}排序，接近底部时自动续载。`
        : `按${sortLabel}排序，当前结果已全部加载。`

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    void refresh()
  }, [refresh])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const target = toolbarRef.current
    if (!target) return

    const updateToolbarHeight = () => {
      document.documentElement.style.setProperty('--sticky-toolbar-height', `${target.offsetHeight}px`)
    }

    updateToolbarHeight()

    const observer = new ResizeObserver(() => {
      updateToolbarHeight()
    })

    observer.observe(target)
    window.addEventListener('resize', updateToolbarHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateToolbarHeight)
    }
  }, [])

  useEffect(() => {
    const target = loadMoreTriggerRef.current
    if (!target || loading || loadingMore || !hasMore || repos.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore()
        }
      },
      {
        root: null,
        rootMargin: '320px 0px',
        threshold: 0,
      },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [hasMore, loadMore, loading, loadingMore, repos.length])

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="app-header-copy">
          <span className="app-eyebrow">仓库发现</span>
          <h1>Hot GitHub</h1>
          <p>把搜索、筛选与浏览压回同一条清晰路径，减少噪音，保留真正影响判断的信息。</p>
        </div>
        <div className="app-header-note">
          <span className="app-header-note-label">当前模式</span>
          <strong>{modeTitle}</strong>
          <span>{modeDescription}</span>
        </div>
      </header>

      <section className="workspace-shell">
        <div className="sticky-toolbar" ref={toolbarRef}>
          <FilterBar
            search={searchInput}
            onSearchChange={setSearchInput}
            onSearchSubmit={() => void applySearch()}
            onRefresh={() => void refresh()}
            loading={loading}
            loadingMore={loadingMore}
          />
        </div>

        <div className="content-layout">
          <aside className="sidebar-column">
            <StatsBar
              count={repos.length}
              search={search}
              lastUpdated={lastUpdated}
              language={language}
              sort={sort}
              layout={layout}
              theme={theme}
              onLanguageChange={(next) => void setLanguage(next)}
              onSortChange={(next) => void setSort(next)}
              onLayoutChange={setLayout}
              onThemeChange={setTheme}
              loading={loading}
              loadingMore={loadingMore}
            />
          </aside>

          <div className="workspace-content">
            <section className="results-panel">
              <div className="results-panel-header">
                <div className="results-panel-heading">
                  <span className="results-panel-eyebrow">结果</span>
                  <h2>仓库列表</h2>
                  <p className="results-panel-summary">
                    当前展示 <strong>{repos.length.toLocaleString()}</strong> 个结果，关键词为“{searchLabel}”。
                  </p>
                </div>
                <div className="results-panel-side">
                  <div className="results-panel-meta" aria-label="当前条件摘要">
                    <span className="context-chip">语言 {languageLabel}</span>
                    <span className="context-chip">排序 {sortLabel}</span>
                    <span className="context-chip">布局 {layoutLabel}</span>
                    <span className="context-chip">主题 {themeLabel}</span>
                  </div>
                  <div className="results-panel-sync" aria-live="polite">
                    <span className={loading || loadingMore ? 'status-indicator busy' : 'status-indicator'} />
                    <span>{syncLabel}</span>
                  </div>
                </div>
              </div>

              {error ? <div className="state error">加载失败：{error}</div> : null}
              {!loading && !error && repos.length === 0 ? <div className="state">未找到匹配的仓库。</div> : null}
              {loading ? <div className="state shimmer">正在加载仓库数据...</div> : null}

              {repos.length > 0 ? <RepoCollection repos={repos} layout={layout} /> : null}

              {!loading && repos.length > 0 ? (
                <div className="load-more-wrap" ref={loadMoreTriggerRef}>
                  {loadingMore ? (
                    <div className="load-more-state shimmer">正在加载更多仓库...</div>
                  ) : hasMore ? (
                    <div className="load-more-hint">继续向下滚动，将自动加载更多结果</div>
                  ) : (
                    <div className="load-more-hint">已加载全部结果</div>
                  )}
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
