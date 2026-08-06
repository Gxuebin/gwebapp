import type { RepoItem } from '../types'

interface RepoCardProps {
  repo: RepoItem
  variant?: 'card' | 'list' | 'masonry' | 'detail'
  position?: number
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

function getLanguageColor(language: string | null) {
  if (!language) return '#8b949e'
  return LANGUAGE_COLORS[language] ?? '#8b949e'
}

export function RepoCard({ repo, variant = 'card', position }: RepoCardProps) {
  const homepage = repo.homepage?.trim()
  const isDetail = variant === 'detail'
  const isList = variant === 'list'
  const language = repo.language || 'Unknown'
  const hasHomepage = Boolean(homepage)
  const updatedAt = formatDate(repo.updated_at)

  return (
    <article className={`repo-card repo-card--${variant}`}>
      <div className="repo-card-main">
        <div className="repo-header-row">
          {typeof position === 'number' ? <span className="repo-rank">#{position}</span> : null}
          <div className="repo-header">
            <img className="avatar" src={repo.owner.avatar_url} alt={`${repo.owner.login} avatar`} />
            <div className="repo-heading">
              <a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.full_name}
              </a>
              <p className="repo-owner">{repo.owner.login}</p>
            </div>
          </div>
        </div>

        <p className="repo-description">{repo.description || '暂无仓库描述。'}</p>

        <div className="repo-meta">
          <span className="repo-meta-item repo-meta-item--language">
            <span className="repo-language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            {language}
          </span>
          <span className="repo-meta-item">星标 {repo.stargazers_count.toLocaleString()}</span>
          <span className="repo-meta-item">派生 {repo.forks_count.toLocaleString()}</span>
          <span className="repo-meta-item">问题 {repo.open_issues_count.toLocaleString()}</span>
          {!isList ? <span className="repo-meta-item">更新于 {updatedAt}</span> : null}
        </div>
      </div>

      <div className="repo-card-side">
        {isDetail ? (
          <div className="repo-detail-grid">
            <div className="detail-item">
              <span>关注者</span>
              <strong>{repo.watchers_count.toLocaleString()}</strong>
            </div>
            <div className="detail-item">
              <span>问题</span>
              <strong>{repo.open_issues_count.toLocaleString()}</strong>
            </div>
            <div className="detail-item">
              <span>更新时间</span>
              <strong>{updatedAt}</strong>
            </div>
            <div className="detail-item">
              <span>主页</span>
              <strong>{hasHomepage ? '可访问' : '无'}</strong>
            </div>
          </div>
        ) : null}

        {isList ? (
          <div className="repo-side-stack">
            <div className="repo-side-meta">
              <span className="repo-side-label">最后更新</span>
              <strong>{updatedAt}</strong>
            </div>
            <div className="repo-links repo-links--list">
              {hasHomepage ? (
                <a href={homepage} target="_blank" rel="noreferrer">
                  主页
                </a>
              ) : null}
              <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
                作者主页
              </a>
            </div>
          </div>
        ) : (
          <div className="repo-footer">
            <span>{`更新于 ${updatedAt}`}</span>
            <div className="repo-links">
              {hasHomepage ? (
                <a href={homepage} target="_blank" rel="noreferrer">
                  主页
                </a>
              ) : null}
              <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
                作者主页
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
