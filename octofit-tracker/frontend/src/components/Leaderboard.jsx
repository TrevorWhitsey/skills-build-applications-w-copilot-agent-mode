import { useApiCollection } from '../api.jsx'
import LoadingState from './LoadingState.jsx'

function Leaderboard() {
  const { items: leaderboards, error, loading } = useApiCollection('/api/leaderboard/')
  const currentBoard = leaderboards[0]

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1></div>
        {currentBoard?.weekOf && <span className="record-count">Week of {new Date(currentBoard.weekOf).toLocaleDateString()}</span>}
      </header>
      <LoadingState error={error} loading={loading} />
      {!loading && !error && (
        <ol className="ranking-list">
          {(currentBoard?.rankings ?? []).map((entry) => (
            <li key={entry._id ?? entry.team?._id ?? entry.rank}>
              <span className="rank">{entry.rank}</span>
              <div><strong>{entry.team?.name ?? entry.team}</strong><small>{entry.team?.city}</small></div>
              <span className="points">{entry.points} pts</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default Leaderboard