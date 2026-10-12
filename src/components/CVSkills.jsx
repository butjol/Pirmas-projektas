import { useCallback, useEffect, useState } from 'react'
import { getSupabaseErrorMessage, isSupabaseConfigured, supabase, supabaseConfigMessage } from '../lib/supabaseClient'
import './CVSkills.css'

function CVSkills({ skills, onSkillsChange }) {
  const [cvFile, setCvFile] = useState(null)
  const [savedSkills, setSavedSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingSkillName, setEditingSkillName] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadSkills = useCallback(async (setLoadingState = true) => {
    if (!isSupabaseConfigured) {
      setError(supabaseConfigMessage)
      return
    }

    if (setLoadingState) setLoading(true)
    const { data, error: requestError } = await supabase
      .from('skills')
      .select('id, name, created_at')
      .order('created_at', { ascending: true })

    if (requestError) {
      setError(getSupabaseErrorMessage(requestError))
    } else {
      setSavedSkills(data || [])
      setError('')
    }

    if (setLoadingState) setLoading(false)
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => loadSkills())
  }, [loadSkills])

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) setCvFile(file)
  }

  function handleSkillChange(index, value) {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    onSkillsChange(updatedSkills)
  }

  function applySkillsToMatch(skillRows) {
    const names = skillRows.map((skill) => skill.name)
    onSkillsChange([...names.slice(0, 5), ...Array(Math.max(0, 5 - names.length)).fill('')])
  }

  async function addSkill(event) {
    event.preventDefault()
    const name = newSkill.trim()
    if (!name) {
      setError('Enter a skill name before saving.')
      return
    }
    if (!isSupabaseConfigured) {
      setError(supabaseConfigMessage)
      return
    }
    setSaving(true)
    setError('')
    setMessage('')
    const { data, error: requestError } = await supabase
      .from('skills')
      .insert({ name })
      .select('id, name, created_at')
      .single()
    if (requestError) {
      setError(/duplicate|unique/i.test(requestError.message)
        ? 'That skill already exists. Skill names cannot be duplicated.'
        : getSupabaseErrorMessage(requestError))
    } else {
      const updated = [...savedSkills, data]
      setSavedSkills(updated)
      applySkillsToMatch(updated)
      setNewSkill('')
      setMessage('Skill saved.')
    }
    setSaving(false)
  }

  async function updateSkill(id) {
    const name = editingSkillName.trim()
    if (!name) {
      setError('Skill names cannot be empty.')
      return
    }
    setSaving(true)
    setError('')
    setMessage('')
    const { data, error: requestError } = await supabase
      .from('skills')
      .update({ name })
      .eq('id', id)
      .select('id, name, created_at')
      .single()
    if (requestError) {
      setError(/duplicate|unique/i.test(requestError.message)
        ? 'That skill already exists. Skill names cannot be duplicated.'
        : getSupabaseErrorMessage(requestError))
    } else {
      const updated = savedSkills.map((skill) => skill.id === id ? data : skill)
      setSavedSkills(updated)
      applySkillsToMatch(updated)
      setEditingSkillId(null)
      setMessage('Skill updated.')
    }
    setSaving(false)
  }

  async function deleteSkill(skill) {
    setSaving(true)
    setError('')
    setMessage('')
    const { error: requestError } = await supabase
      .from('skills')
      .delete()
      .eq('id', skill.id)
    if (requestError) {
      setError(getSupabaseErrorMessage(requestError))
    } else {
      const updated = savedSkills.filter((item) => item.id !== skill.id)
      setSavedSkills(updated)
      applySkillsToMatch(updated)
      setMessage('Skill deleted.')
    }
    setSaving(false)
  }

  return (
    <section className="cv-skills-section">
      <h2>Your CV &amp; Skills</h2>
      <p className="cv-skills-description">
        Add your CV and skills you want to use in your job search.
      </p>

      <div className="cv-upload-area">
        <label className="cv-upload-label" htmlFor="cv-upload">Upload CV</label>
        <input id="cv-upload" className="cv-file-input" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        {cvFile && <p className="cv-file-name">Selected file: <strong>{cvFile.name}</strong></p>}
      </div>

      <div className="skills-area">
        <p className="skills-label">Skills for Job Match</p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <input key={index} className="skill-input" type="text" value={skill} onChange={(event) => handleSkillChange(index, event.target.value)} placeholder={`Skill ${index + 1}`} />
          ))}
        </div>
        <p className="cv-skills-description">These five fields are used in the existing job comparison.</p>
      </div>

      <div className="saved-skills-area">
        <h3>Saved skills</h3>
        {!isSupabaseConfigured ? <p className="supabase-notice">{supabaseConfigMessage}</p> : null}
        {error && <p className="supabase-error" role="alert">{error}</p>}
        {message && <p className="supabase-success" role="status">{message}</p>}
        {loading ? <p>Loading saved skills…</p> : (
          <ul className="saved-skills-list">
            {savedSkills.map((skill) => (
              <li key={skill.id}>
                {editingSkillId === skill.id ? (
                  <>
                    <input aria-label="Edit skill name" value={editingSkillName} onChange={(event) => setEditingSkillName(event.target.value)} />
                    <button type="button" disabled={saving} onClick={() => updateSkill(skill.id)}>Save</button>
                    <button type="button" disabled={saving} onClick={() => setEditingSkillId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{skill.name}</span>
                    <button type="button" disabled={saving} onClick={() => { setEditingSkillId(skill.id); setEditingSkillName(skill.name); setError(''); setMessage('') }}>Edit</button>
                    <button type="button" disabled={saving} onClick={() => deleteSkill(skill)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        <form className="add-skill-form" onSubmit={addSkill}>
          <input aria-label="New skill name" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="Add a saved skill" />
          <button type="submit" disabled={saving}>Add skill</button>
        </form>
      </div>
    </section>
  )
}

export default CVSkills
