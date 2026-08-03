import type { RepoItem } from '../types'

interface RepoCardProps {
  repo: RepoItem
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="repo-card">
      <div className="repo-header">
        <img className="avatar" src={repo.owner.avatar_url} alt={repo.owner.login} />
        <div className="repo-heading">
          <a className="repo-name" href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.full_name}
          </a>
          <p className="repo-owner">by {repo.owner.login}</p>
        </div>
      </div>

      <p className="repo-description">{repo.description || 'No description provided.'}</p>

      <div className="repo-meta">
        <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
        <span>🍴 {repo.forks_count.toLocaleString()}</span>
        <span>🧠 {repo.language || 'Unknown'}</span>
        <span>🐞 {repo.open_issues_count.toLocaleString()}</span>
      </div>

      <div className="repo-footer">
        <span>Updated {formatDate(repo.updated_at)}</span>
        <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
          View owner
        </a>
      </div>
    </article>
  )
}
