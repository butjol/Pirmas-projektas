import './JobResults.css'

const demoJobs = [
  {
    id: 1,
    title: 'HR Operations Manager',
    company: 'Example Company',
    location: 'Vilnius',
    source: 'CVMarket',
    url: '#',
  },
  {
    id: 2,
    title: 'People Operations Lead',
    company: 'Sample Organisation',
    location: 'Kaunas',
    source: 'CVMarket',
    url: '#',
  },
  {
    id: 3,
    title: 'HR Process Manager',
    company: 'Demo Group',
    location: 'Vilnius',
    source: 'CVMarket',
    url: '#',
  },
]

function JobResults() {
  return (
    <section className="job-results">
      <div className="results-heading">
        <div>
          <p className="results-eyebrow">Search results</p>
          <h2>Matching jobs</h2>
        </div>

        <span className="results-count">
          {demoJobs.length} jobs
        </span>
      </div>

      <p className="results-description">
        Demo results for the current frontend. Real vacancies will be
        connected later.
      </p>

      <div className="results-list">
        {demoJobs.map((job) => (
          <article className="result-card" key={job.id}>
            <div className="result-content">
              <h3>{job.title}</h3>

              <p className="result-company">
                {job.company}
              </p>

              <div className="result-meta">
                <span>{job.location}</span>
                <span>{job.source}</span>
              </div>
            </div>

            <a
              className="view-job-link"
              href={job.url}
              onClick={(event) => event.preventDefault()}
            >
              View job
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default JobResults