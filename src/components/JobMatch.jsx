import { useCallback, useEffect, useState } from 'react'
import { getSupabaseErrorMessage, isSupabaseConfigured, supabase, supabaseConfigMessage } from '../lib/supabaseClient'
import './JobMatch.css'

function JobMatch({ job, skills, onSkillsChange, onBack }) {
  const [comparisonResult, setComparisonResult] = useState(null)
  const [savedMatches, setSavedMatches] = useState([])
  const [loadingMatches, setLoadingMatches] = useState(false)
  const [savingMatch, setSavingMatch] = useState(false)
  const [matchError, setMatchError] = useState('')
  const [matchMessage, setMatchMessage] = useState('')

  const loadMatches = useCallback(async (setLoadingState = true) => {
    if (!isSupabaseConfigured) {
      setMatchError(supabaseConfigMessage)
      return
    }
    if (setLoadingState) setLoadingMatches(true)
    const { data, error } = await supabase
      .from('job_matches')
      .select('id, job_title, job_url, match_score, created_at')
      .order('created_at', { ascending: false })
    if (error) setMatchError(getSupabaseErrorMessage(error))
    else {
      setSavedMatches(data || [])
      setMatchError('')
    }
    if (setLoadingState) setLoadingMatches(false)
  }, [])

  useEffect(() => { void Promise.resolve().then(() => loadMatches()) }, [loadMatches])

  function handleSkillChange(index, value) {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    onSkillsChange(updatedSkills)
    setComparisonResult(null)
  }

  function normalizeText(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  function compareSkills() {
    const normalizedSkills = skills.map(normalizeText).filter((skill) => skill !== '')
    const matched = []
    const missing = []
    job.requirements.forEach((requirement) => {
      const normalizedRequirement = normalizeText(requirement)
      if (normalizedSkills.includes(normalizedRequirement)) matched.push(requirement)
      else missing.push(requirement)
    })
    setComparisonResult({ matched, missing })
    setMatchError('')
    setMatchMessage('')
  }

  function currentScore() {
    const totalRequirements = job.requirements.length
    if (!totalRequirements || !comparisonResult) return null
    return Math.round((comparisonResult.matched.length / totalRequirements) * 100)
  }

  async function saveMatch(existingId = null) {
    const jobTitle = job.title?.trim()
    const matchScore = currentScore()
    if (!jobTitle) {
      setMatchError('A job title is required before saving a match.')
      return
    }
    if (!comparisonResult) {
      setMatchError('Compare your skills before saving this result.')
      return
    }
    if (matchScore === null) {
      setMatchError('This job has no requirements, so a match percentage cannot be calculated.')
      return
    }
    if (!Number.isInteger(matchScore) || matchScore < 0 || matchScore > 100) {
      setMatchError('Match score must be a whole number from 0 to 100.')
      return
    }
    if (!isSupabaseConfigured) {
      setMatchError(supabaseConfigMessage)
      return
    }
    setSavingMatch(true)
    setMatchError('')
    setMatchMessage('')
    const values = { job_title: jobTitle, job_url: job.url || null, match_score: matchScore }
    const query = existingId
      ? supabase.from('job_matches').update(values).eq('id', existingId)
      : supabase.from('job_matches').insert(values)
    const { data, error } = await query.select('id, job_title, job_url, match_score, created_at').single()
    if (error) setMatchError(getSupabaseErrorMessage(error))
    else {
      setSavedMatches((matches) => existingId
        ? matches.map((match) => match.id === existingId ? data : match)
        : [data, ...matches])
      setMatchMessage(existingId ? 'Saved match updated.' : 'Match saved.')
    }
    setSavingMatch(false)
  }

  async function deleteMatch(match) {
    if (!window.confirm(`Delete the saved match for “${match.job_title}”?`)) return
    setSavingMatch(true)
    setMatchError('')
    setMatchMessage('')
    const { error } = await supabase.from('job_matches').delete().eq('id', match.id)
    if (error) setMatchError(getSupabaseErrorMessage(error))
    else {
      setSavedMatches((matches) => matches.filter((item) => item.id !== match.id))
      setMatchMessage('Saved match deleted.')
    }
    setSavingMatch(false)
  }

  return (
    <main className="job-match-page">
      <button type="button" className="back-button" onClick={onBack}>← Back to results</button>
      <section className="job-match-card">
        <p className="job-match-eyebrow">Job Match</p>
        <h1>{job.title}</h1>
        <p className="job-company">{job.company} · {job.location}</p>

        <div className="requirements-section">
          <h2>Job requirements</h2>
          {job.requirements.length ? <ul>{job.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul> : <p>This job has no listed requirements. A match score cannot be calculated.</p>}
        </div>

        <div className="my-skills-section">
          <h2>My skills</h2>
          <p className="my-skills-description">Review your skills before comparing them with the job requirements.</p>
          <div className="job-match-skills">
            {skills.map((skill, index) => <input key={index} className="job-match-skill-input" type="text" value={skill} onChange={(event) => handleSkillChange(index, event.target.value)} placeholder={`Skill ${index + 1}`} />)}
          </div>
          <button type="button" className="compare-skills-button" onClick={compareSkills}>Compare my skills</button>
        </div>

        {comparisonResult && (
          <section className="match-result">
            <p className="match-result-eyebrow">Your match</p>
            <div className="match-score"><strong>{comparisonResult.matched.length}</strong><span>of {job.requirements.length} skills match</span></div>
            {!job.requirements.length && <p className="supabase-notice">No requirements are available, so a percentage cannot be calculated.</p>}
            <div className="match-columns">
              <div className="matched-skills"><h3>Matched</h3>{comparisonResult.matched.length ? <ul>{comparisonResult.matched.map((skill) => <li key={skill}>✓ {skill}</li>)}</ul> : <p>No exact matches found.</p>}</div>
              <div className="missing-skills"><h3>Missing</h3>{comparisonResult.missing.length ? <ul>{comparisonResult.missing.map((skill) => <li key={skill}>○ {skill}</li>)}</ul> : <p>No missing skills.</p>}</div>
            </div>
            <div className="save-match-actions">
              <button type="button" disabled={savingMatch || !job.requirements.length} onClick={() => saveMatch()}>Save match</button>
              {savedMatches.filter((match) => match.job_title === job.title).map((match) => <button type="button" key={match.id} disabled={savingMatch || !job.requirements.length} onClick={() => saveMatch(match.id)}>Update saved result ({match.match_score}%)</button>)}
            </div>
            <div className="match-actions">
              <button type="button" className="results-button" onClick={onBack}>Back to results</button>
              <a className="open-job-button" href={job.url} target="_blank" rel="noopener noreferrer">Open job ad</a>
            </div>
          </section>
        )}

        <section className="saved-matches-section">
          <h2>Saved Job Matches</h2>
          {!isSupabaseConfigured && <p className="supabase-notice">{supabaseConfigMessage}</p>}
          {matchError && <p className="supabase-error" role="alert">{matchError}</p>}
          {matchMessage && <p className="supabase-success" role="status">{matchMessage}</p>}
          {loadingMatches ? <p>Loading saved matches…</p> : savedMatches.length ? (
            <ul className="saved-matches-list">
              {savedMatches.map((match) => <li key={match.id}>
                <div><strong>{match.job_title}</strong><span>{match.match_score}% match</span>{match.job_url && <a href={match.job_url} target="_blank" rel="noopener noreferrer">Open saved job ad</a>}</div>
                <button type="button" disabled={savingMatch} onClick={() => deleteMatch(match)}>Delete</button>
              </li>)}
            </ul>
          ) : <p>No saved matches yet.</p>}
        </section>

        <div className="match-actions">
          <button type="button" className="results-button" onClick={onBack}>Back to results</button>
          <a className="open-job-button" href={job.url} target="_blank" rel="noopener noreferrer">Open job ad</a>
        </div>
      </section>
    </main>
  )
}

export default JobMatch
