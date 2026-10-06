# Project Context --- Job Search App

*Last updated: 2026-10-06*

## Purpose

This is the living development context for the Job Search App. Keep it
current rather than chronological. Update it when implementation, scope,
architecture, limitations, or the next step changes.

## Project goal

Beginner-friendly React job-search application.

Long-term flow: 1. Enter a job-title keyword. 2. Enter up to 5
job-search website URLs. 3. Search those sources for relevant vacancies.
4. Display up to 10 matching jobs. 5. Later use CV and skills
information for improved matching.

## Current MVP

**Job-title keyword + 1--5 freely entered job-site URLs → retrieve
matching vacancies → show maximum 10 results.**

Current scope: - Matching is based only on vacancy title. - URL entry
remains free-form; do not replace it with a hard-coded portal list. -
Maximum 5 job-site URLs. - Maximum 10 results. - CV and Skills remain
visible but are not used for matching yet. - First real integration:
**CVMarket Lithuania (`cvmarket.lt`)**.

## Implemented functionality

The frontend is working and currently includes: - job-title / keyword
input; - free job-site URL entry; - up to 5 website URLs; - add/remove
URL fields; - automatic `https://` normalization; - website counter; -
CV file selection; - 5 skill input fields; - responsive two-column
interface.

Current search behavior: - the search button opens entered websites in
new browser tabs; - it does **not** yet retrieve real vacancies; - the
keyword does **not** yet filter real jobs.

## Technology stack

-   React 19
-   Vite 8
-   JavaScript / JSX
-   plain CSS
-   ESLint

Current application is frontend-only.

A small Node/Express backend is planned for real vacancy retrieval. Do
not add a database, authentication, AI matching, or CV parsing before it
is needed.

## Project structure

``` text
PIRMAS-PROJEKTAS/
├── public/
├── src/
│   ├── assets/
│   │   └── sunset-beach.jpg
│   ├── components/
│   │   ├── CVSkills.jsx
│   │   └── CVSkills.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── Context.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

Update this section if the structure changes.

## Important product decisions

1.  **Preserve free URL entry.** Users should not be restricted to a
    predefined portal list.

2.  **Maximum 5 URLs.**

3.  **Maximum 10 vacancy results.**

4.  **Initial matching is by job title only.** CV and Skills matching
    belongs to a later phase.

5.  **Keep the CV & Skills section visible.**

6.  **CVMarket is the first real integration.** Make one source work
    end-to-end before adding others.

7.  **Keep development beginner-friendly and incremental.**

## Planned architecture

``` text
React frontend
      ↓
Backend API
      ↓
Job-site-specific retrieval logic
      ↓
CVMarket first
      ↓
Normalized vacancy data
      ↓
Maximum 10 results displayed in React
```

The backend is planned but **not implemented yet**.

## Vacancy result model

A normalized vacancy should eventually contain at least:

``` js
{
  title: '',
  company: '',
  location: '',
  source: '',
  url: ''
}
```

The original vacancy URL must be preserved so the user can open the
source advertisement.

## Search behavior

For the current MVP: - use the entered job-title keyword; - retrieve
jobs from the entered source; - filter/match by vacancy title; - return
no more than 10 results; - do not use CV contents, Skills, or
semantic/AI matching yet.

Lithuanian titles can have grammatical/gender variants. For example,
`Vadovas` and `Vadovė`. A broader stem such as `vadov` may later be
useful, but complex language processing is not required for the first
implementation.

## Design direction

Preserve the existing visual direction unless a redesign is requested: -
warm sunset background; - dark translucent/glass-style interface; -
light/cream text; - warm orange primary actions; - rounded corners; -
responsive layout; - two-column layout on larger screens.

Do not remove or redesign the CV & Skills area without a specific
request.

## Not implemented yet

-   Node/Express backend;
-   real vacancy retrieval;
-   CVMarket integration;
-   real keyword filtering;
-   live results list;
-   max-10 enforcement on retrieved vacancies;
-   extraction of real company/location/source/link data;
-   multiple real job-source integrations;
-   duplicate handling;
-   unsupported-site handling;
-   Skills-based matching;
-   CV parsing;
-   AI/semantic matching;
-   database;
-   authentication.

Do not describe these as working features.

## Roadmap

### Phase 1 --- Frontend

-   [x] React/Vite application
-   [x] Job keyword field
-   [x] Free URL entry
-   [x] Maximum 5 URL fields
-   [x] Add/remove URL fields
-   [x] CV upload UI
-   [x] Skills UI
-   [x] Responsive styling

### Phase 2 --- First real search

-   [ ] Add small backend
-   [ ] Connect React to backend
-   [ ] Integrate CVMarket
-   [ ] Search using job-title keyword
-   [ ] Return real vacancies
-   [ ] Limit results to 10
-   [ ] Display title, company, location, source and link

### Phase 3 --- Multiple sources

-   [ ] Add another job website
-   [ ] Support multiple entered URLs
-   [ ] Combine results
-   [ ] Remove duplicate vacancies
-   [ ] Handle unsupported URLs

### Phase 4 --- Smarter matching

-   [ ] Use Skills in matching
-   [ ] Parse CV information
-   [ ] Rank vacancies by relevance
-   [ ] Explore semantic/AI-assisted matching

## Development principles

-   Prefer small, testable changes.
-   Keep explanations beginner-friendly.
-   Avoid unnecessary dependencies.
-   Avoid unrelated refactoring.
-   Preserve existing working functionality.
-   Get one real source working before supporting many.
-   Preserve free URL entry.
-   Preserve CV & Skills.
-   Do not redesign working UI unless requested.
-   Clearly distinguish implemented functionality from planned
    functionality.

## Immediate next milestone

> **Enter a job-title keyword and CVMarket URL → retrieve and display up
> to 10 real matching CVMarket vacancies.**

Recommended sequence: 1. Determine a reliable method for retrieving
CVMarket vacancies. 2. Add the smallest backend required. 3. Connect
React to the backend. 4. Send the entered keyword. 5. Retrieve CVMarket
vacancies. 6. Match/filter vacancy titles. 7. Normalize results. 8.
Return no more than 10 jobs. 9. Display them in the existing interface.

Do not expand to several portals until this flow works end-to-end.

## Context maintenance

At the end of a development session, update: - implemented
functionality; - architecture; - important decisions; - limitations; -
roadmap status; - immediate next milestone.

Remove or rewrite obsolete information. Do not turn this file into a
chronological conversation transcript.

## Latest UI update — Search Results

A new frontend-only `Search Results` area has been introduced/planned as the next visible extension of the existing search page.

Expected component files:
- `src/components/JobResults.jsx`
- `src/components/JobResults.css`

`JobResults` is rendered below the two existing top sections (`Job Search` and `CV & Skills`). The current Search Results implementation uses demo vacancies only. It does not yet retrieve real vacancies, perform keyword filtering, or connect to CVMarket.

The demo result model contains:
- job title;
- company;
- location;
- source;
- vacancy URL.

The `View job` action is intended to become the entry point to the Job Match page.

Important integration note: when `<JobResults />` is used in `App.jsx`, `App.jsx` must also import it:

```jsx
import JobResults from './components/JobResults'
```

Existing search controls must remain intact: remove URL (`×`), `+ Add another job site`, `Search job sites`, CV upload, and Skills fields.

## Current design direction

The visual direction has changed from the earlier warm sunset/dark-orange theme to a light pastel blue/turquoise theme.

Current intended styling:
- pastel countryside/road background leading toward the horizon;
- light semi-transparent frosted-glass cards;
- dark teal headings and text;
- turquoise primary actions;
- rounded corners;
- responsive layout;
- two-column layout for Job Search and CV & Skills on larger screens;
- Search Results displayed below them across the available width.

Do not revert to the old dark/orange design unless explicitly requested.

## Next product extension — Job Match MVP

After Search Results, the agreed next page is **Job Match**.

Purpose: allow the user to select one vacancy from Search Results and compare their 5 entered skills with 5 requirements for that job.

The Job Match MVP is limited to 5 steps:

1. **Select Job** — user clicks `View job` in Search Results; the system opens Job Match with the selected vacancy.
2. **Review Job** — show Job Title, Company, Location and 5 Job Requirements.
3. **Review My Skills** — carry over up to 5 skills from the first page and allow the user to edit them.
4. **Compare** — user clicks `Compare my skills`; the system performs simple text matching, ignoring letter case and unnecessary surrounding spaces.
5. **Match Result** — show `X of 5 skills match`, plus separate Matched and Missing lists, with `Back to results` and `Open job ad` actions.

### Job Match acceptance criteria

| # | MVP step | User action | System behavior | Acceptance criteria |
|---|---|---|---|---|
| 1 | Select Job | Clicks `View job` in Search Results. | Opens Job Match and passes the selected vacancy. | Every result has `View job`; the Job Match page shows the selected job, not a different one. |
| 2 | Review Job | Reviews the selected vacancy. | Shows Job Title, Company, Location and 5 Job Requirements. | All three job details and exactly 5 requirements are visible for the selected demo job. |
| 3 | Review My Skills | Reviews and optionally edits skills. | Carries over up to 5 skills from the first page. | Previously entered skills remain available and each skill field is editable. |
| 4 | Compare | Clicks `Compare my skills`. | Compares My Skills with the 5 Job Requirements using simple text comparison. | Comparison works; case and surrounding whitespace are ignored; empty skill fields are not matches. |
| 5 | Match Result | Reviews result and chooses the next action. | Shows `X of 5 skills match`, Matched, Missing, Back and Open-job actions. | Result cannot exceed 5/5; Matched and Missing are correct; Back returns to results; Open job ad opens the original vacancy URL in a new tab. |

End-to-end MVP flow:

`Search Results → View job → Job Match → Review Skills → Compare my skills → Match Result → Back to results / Open job ad`

### Job Match out of scope

Do not add these to the first Job Match MVP:
- AI analysis;
- CV parsing;
- semantic matching;
- synonym recognition;
- percentage-based match scoring;
- database;
- authentication.

The first comparison should remain deliberately simple and understandable.

## Updated immediate next steps

1. Stabilize the Search Results UI and verify all existing buttons/controls still render and work.
2. Keep Search Results demo-only until its frontend flow is stable.
3. Build the new Job Match page according to the 5-step MVP and acceptance criteria above.
4. Keep the previously planned real CVMarket integration as a later backend milestone; do not describe it as implemented.
