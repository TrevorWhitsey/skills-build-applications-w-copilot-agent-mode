import { useApiCollection } from '../api.jsx'
import LoadingState from './LoadingState.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const { items: teams, error, loading } = useApiCollection(teamsEndpoint)

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div><p className="eyebrow">Together is better</p><h1>Teams</h1></div>
        <span className="record-count">{teams.length} squads</span>
      </header>
      <LoadingState error={error} loading={loading} />
      {!loading && !error && (
        <div className="resource-grid">
          {teams.map((team) => (
            <article className="resource-card" key={team._id ?? team.name}>
              <p className="eyebrow">{team.city}</p>
              <h2>{team.name}</h2>
              <p className="motto">“{team.motto}”</p>
              <div className="card-stat"><strong>{team.totalPoints ?? 0}</strong><span>points</span></div>
              <p className="member-list">{team.members?.map((member) => member.name ?? member).join(', ') || 'No members yet'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams