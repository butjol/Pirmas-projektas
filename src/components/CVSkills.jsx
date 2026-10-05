import { useState } from 'react'
import './CVSkills.css'

function CVSkills() {
  const [cvFile, setCvFile] = useState(null)
  const [skills, setSkills] = useState(['', '', '', '', ''])

  function handleFileChange(event) {
    const file = event.target.files[0]

    if (file) {
      setCvFile(file)
    }
  }

  function handleSkillChange(index, value) {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    setSkills(updatedSkills)
  }

  return (
    <section className="cv-skills-section">
      <h2>Your CV & Skills</h2>

      <p className="cv-skills-description">
        Add your CV and up to 5 skills you want to use in your job search.
      </p>

      <div className="cv-upload-area">
        <label className="cv-upload-label" htmlFor="cv-upload">
          Upload CV
        </label>

        <input
          id="cv-upload"
          className="cv-file-input"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {cvFile && (
          <p className="cv-file-name">
            Selected file: <strong>{cvFile.name}</strong>
          </p>
        )}
      </div>

      <div className="skills-area">
        <p className="skills-label">Skills</p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <input
              key={index}
              className="skill-input"
              type="text"
              value={skill}
              onChange={(event) =>
                handleSkillChange(index, event.target.value)
              }
              placeholder={`Skill ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CVSkills