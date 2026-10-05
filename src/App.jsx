import { useState } from 'react'
import './App.css'
import CVSkills from './components/CVSkills'

const MAX_SITES = 5

function App() {
  const [query, setQuery] = useState('')
  const [jobSites, setJobSites] = useState([''])

  function handleSiteChange(index, value) {
    const updatedSites = [...jobSites]
    updatedSites[index] = value
    setJobSites(updatedSites)
  }

  function addJobSite() {
    if (jobSites.length < MAX_SITES) {
      setJobSites([...jobSites, ''])
    }
  }

  function removeJobSite(index) {
    if (jobSites.length === 1) {
      setJobSites([''])
      return
    }

    setJobSites(jobSites.filter((_, siteIndex) => siteIndex !== index))
  }

  function normalizeUrl(url) {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      return ''
    }

    if (
      trimmedUrl.startsWith('http://') ||
      trimmedUrl.startsWith('https://')
    ) {
      return trimmedUrl
    }

    return `https://${trimmedUrl}`
  }

  function searchJobSites() {
    const validSites = jobSites
      .map(normalizeUrl)
      .filter((site) => site !== '')

    validSites.forEach((site) => {
      window.open(site, '_blank', 'noopener,noreferrer')
    })
  }

  const addedSitesCount = jobSites.filter(
    (site) => site.trim() !== ''
  ).length

  return (
    <main className="job-page">
      <div className="page-columns">

        <div className="job-card">
          <p className="eyebrow">Latest job ads</p>

          <h1>Search jobs by site</h1>

          <p className="lead">
            Add a keyword and the job-search websites you want to use.
          </p>

          <label className="search-label" htmlFor="job-query">
            Keyword
          </label>

          <input
            id="job-query"
            className="search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. HR Operations, Process Lead"
          />

          <div className="sites-heading">
            <div>
              <h2>Job sites</h2>
              <p>
                Add up to 5 job-search website addresses.
              </p>
            </div>

            <span className="site-counter">
              {addedSitesCount} of 5 added
            </span>
          </div>

          <div className="site-input-list">
            {jobSites.map((site, index) => (
              <div className="site-input-row" key={index}>
                <input
                  type="text"
                  className="site-url-input"
                  value={site}
                  onChange={(event) =>
                    handleSiteChange(index, event.target.value)
                  }
                  placeholder="e.g. linkedin.com/jobs"
                />

                <button
                  type="button"
                  className="remove-site-button"
                  onClick={() => removeJobSite(index)}
                  aria-label={`Remove job site ${index + 1}`}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {jobSites.length < MAX_SITES && (
            <button
              type="button"
              className="add-site-button"
              onClick={addJobSite}
            >
              + Add another job site
            </button>
          )}

          <button
            type="button"
            className="search-sites-button"
            onClick={searchJobSites}
            disabled={addedSitesCount === 0}
          >
            Search job sites
          </button>
        </div>

        <CVSkills />

      </div>
    </main>
  )
}

export default App