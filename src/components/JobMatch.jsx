import './JobMatch.css'

function JobMatch({
  job,
  skills,
  onSkillsChange,
  onBack,
}) {
  function handleSkillChange(index, value) {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    onSkillsChange(updatedSkills)
  }

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
            {job.requirements.map(
              (requirement) => (
                <li key={requirement}>
                  {requirement}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="my-skills-section">
          <h2>My skills</h2>

          <p className="my-skills-description">
            Review your skills before comparing
            them with the job requirements.
          </p>

          <div className="job-match-skills">
            {skills.map((skill, index) => (
              <input
                key={index}
                className="job-match-skill-input"
                type="text"
                value={skill}
                onChange={(event) =>
                  handleSkillChange(
                    index,
                    event.target.value
                  )
                }
                placeholder={`Skill ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default JobMatch