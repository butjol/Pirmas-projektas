import { useState } from 'react'
import './JobMatch.css'

function JobMatch({
  job,
  skills,
  onSkillsChange,
  onBack,
}) {
  const [comparisonResult, setComparisonResult] = useState(null)

  function handleSkillChange(index, value) {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    onSkillsChange(updatedSkills)

    // Previous comparison is no longer valid
    // after the user changes a skill.
    setComparisonResult(null)
  }

  function normalizeText(text) {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
  }

  function compareSkills() {
    const normalizedSkills = skills
      .map(normalizeText)
      .filter((skill) => skill !== '')

    const matched = []
    const missing = []

    job.requirements.forEach((requirement) => {
      const normalizedRequirement =
        normalizeText(requirement)

      if (
        normalizedSkills.includes(
          normalizedRequirement
        )
      ) {
        matched.push(requirement)
      } else {
        missing.push(requirement)
      }
    })

    setComparisonResult({
      matched,
      missing,
    })
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

          <button
            type="button"
            className="compare-skills-button"
            onClick={compareSkills}
          >
            Compare my skills
          </button>
        </div>

        {comparisonResult && (
          <section className="match-result">
            <p className="match-result-eyebrow">
              Your match
            </p>

            <div className="match-score">
              <strong>
                {comparisonResult.matched.length}
              </strong>

              <span>
                of {job.requirements.length} skills match
              </span>
            </div>

            <div className="match-columns">
              <div className="matched-skills">
                <h3>Matched</h3>

                {comparisonResult.matched.length > 0 ? (
                  <ul>
                    {comparisonResult.matched.map(
                      (skill) => (
                        <li key={skill}>
                          ✓ {skill}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No exact matches found.</p>
                )}
              </div>

              <div className="missing-skills">
                <h3>Missing</h3>

                {comparisonResult.missing.length > 0 ? (
                  <ul>
                    {comparisonResult.missing.map(
                      (skill) => (
                        <li key={skill}>
                          ○ {skill}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No missing skills.</p>
                )}
              </div>
            </div>

            <div className="match-actions">
              <button
                type="button"
                className="results-button"
                onClick={onBack}
              >
                Back to results
              </button>

              <a
                className="open-job-button"
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open job ad
              </a>
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default JobMatch