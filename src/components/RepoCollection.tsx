import type { LayoutMode, RepoItem } from '../types'
import { RepoCard } from './RepoCard'

interface RepoCollectionProps {
  repos: RepoItem[]
  layout: LayoutMode
}

function groupReposByLanguage(repos: RepoItem[]) {
  return Object.entries(
    repos.reduce<Record<string, RepoItem[]>>((groups, repo) => {
      const key = repo.language || 'Unknown'
      groups[key] ??= []
      groups[key].push(repo)
      return groups
    }, {}),
  ).sort((left, right) => right[1].length - left[1].length || left[0].localeCompare(right[0]))
}

export function RepoCollection({ repos, layout }: RepoCollectionProps) {
  if (layout === 'grouped') {
    const groups = groupReposByLanguage(repos)

    return (
      <section className="repo-groups">
        {groups.map(([language, items]) => (
          <section key={language} className="repo-group">
            <header className="repo-group-header">
              <div>
                <h2>{language}</h2>
                <p>{items.length} 个仓库</p>
              </div>
            </header>
            <div className="repo-grid repo-grid--grouped">
              {items.map((repo) => (
                <RepoCard key={repo.id} repo={repo} variant="card" />
              ))}
            </div>
          </section>
        ))}
      </section>
    )
  }

  if (layout === 'masonry') {
    return (
      <section className="repo-masonry">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} variant="masonry" position={index + 1} />
        ))}
      </section>
    )
  }

  if (layout === 'list') {
    return (
      <section className="repo-list">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} variant="list" position={index + 1} />
        ))}
      </section>
    )
  }

  if (layout === 'detail') {
    return (
      <section className="repo-detail-list">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} variant="detail" position={index + 1} />
        ))}
      </section>
    )
  }

  return (
    <section className="repo-grid">
      {repos.map((repo, index) => (
        <RepoCard key={repo.id} repo={repo} variant="card" position={index + 1} />
      ))}
    </section>
  )
}
