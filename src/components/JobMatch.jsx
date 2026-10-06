import './JobMatch.css'

function JobMatch({ job, onBack }) {
  return (
    <main className="job-match-page">
      <button
        type="button"
        className="back-button"
        onClick={onBack}
      >
        ← Back to results
      </button>

      <section className="job-match-card">
        <p className="job-match-eyebrow">
          Job Match
        </p>

        <h1>{job.title}</h1>

        <p className="job-company">
          {job.company} · {job.location}
        </p>

        <div className="requirements-section">
          <h2>Job requirements</h2>

          <ul>
            {job.requirements.map((requirement) => (
              <li key={requirement}>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default JobMatch