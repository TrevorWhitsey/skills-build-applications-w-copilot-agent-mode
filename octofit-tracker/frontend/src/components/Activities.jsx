import { useApiCollection } from '../api.jsx'
import LoadingState from './LoadingState.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const { items: activities, error, loading } = useApiCollection(activitiesEndpoint)

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div><p className="eyebrow">Training log</p><h1>Activities</h1></div>
        <span className="record-count">{activities.length} logged</span>
      </header>
      <LoadingState error={error} loading={loading} />
      {!loading && !error && (
        <div className="activity-list">
          {activities.map((activity) => (
            <article className="activity-row" key={activity._id}>
              <div>
                <h2>{activity.type}</h2>
                <p>{activity.user?.name ?? 'Unknown athlete'} · {activity.team?.name ?? 'Independent'}</p>
              </div>
              <dl>
                <div><dt>Duration</dt><dd>{activity.durationMinutes} min</dd></div>
                <div><dt>Distance</dt><dd>{activity.distanceKm} km</dd></div>
                <div><dt>Energy</dt><dd>{activity.calories} cal</dd></div>
                <div><dt>When</dt><dd>{new Date(activity.performedAt).toLocaleDateString()}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities