import { useApiCollection } from '../api.jsx'
import LoadingState from './LoadingState.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const { items: users, error, loading } = useApiCollection(usersEndpoint)

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>Athletes</h1>
        </div>
        <span className="record-count">{users.length} members</span>
      </header>
      <LoadingState error={error} loading={loading} />
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table align-middle resource-table">
            <thead>
              <tr><th>Athlete</th><th>Level</th><th>Weekly goal</th><th>Team</th><th>Points</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td><strong>{user.name}</strong><small>{user.email}</small></td>
                  <td><span className="level-pill">{user.level}</span></td>
                  <td>{user.weeklyGoal} sessions</td>
                  <td>{user.team?.name ?? 'Unassigned'}</td>
                  <td>{user.totalPoints ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users