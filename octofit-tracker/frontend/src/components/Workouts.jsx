import { useApiCollection } from '../api.jsx'
import LoadingState from './LoadingState.jsx'

function Workouts() {
  const { items: workouts, error, loading } = useApiCollection('workouts')

  return (
    <section className="resource-view">
      <header className="view-heading">
        <div><p className="eyebrow">For your next session</p><h1>Workouts</h1></div>
        <span className="record-count">{workouts.length} suggestions</span>
      </header>
      <LoadingState error={error} loading={loading} />
      {!loading && !error && (
        <div className="resource-grid">
          {workouts.map((workout) => (
            <article className="resource-card workout-card" key={workout._id ?? workout.title}>
              <div className="workout-title"><h2>{workout.title}</h2><span className="level-pill">{workout.difficulty}</span></div>
              <p>{workout.focus}</p>
              <div className="card-stat"><strong>{workout.durationMinutes}</strong><span>minutes</span></div>
              <p className="tag-list">{workout.tags?.map((tag) => <span key={tag}>{tag}</span>)}</p>
              <small>Equipment: {workout.equipment?.join(', ') || 'None'}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts