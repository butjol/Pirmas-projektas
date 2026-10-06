Project Context --- Job Search App
Last updated: 2026-10-06
Purpose
This is the living development context for the Job Search App. Keep it
current rather than chronological. Update it when implementation, scope,
architecture, limitations, or the next step changes.
Project goal
Beginner-friendly React job-search application.
Long-term flow: 1. Enter a job-title keyword. 2. Enter up to 5
job-search website URLs. 3. Search those sources for relevant vacancies.
4. Display up to 10 matching jobs. 5. Later use CV and skills
information for improved matching.
Current MVP
Job-title keyword + 1--5 freely entered job-site URLs → retrieve
matching vacancies → show maximum 10 results.
Current scope: - Matching is based only on vacancy title. - URL entry
remains free-form; do not replace it with a hard-coded portal list. -
Maximum 5 job-site URLs. - Maximum 10 results. - CV and Skills remain
visible but are not used for matching yet. - First real integration:
CVMarket Lithuania (cvmarket.lt).
Implemented functionality
The frontend is working and currently includes: - job-title / keyword
input; - free job-site URL entry; - up to 5 website URLs; - add/remove
URL fields; - automatic https:// normalization; - website counter; -
CV file selection; - 5 skill input fields; - responsive two-column
interface.
Current search behavior: - the search button opens entered websites in
new browser tabs; - it does not yet retrieve real vacancies; - the
keyword does not yet filter real jobs.
Technology stack
- React 19
- Vite 8
- JavaScript / JSX
- plain CSS
- ESLint
Current application is frontend-only.
A small Node/Express backend is planned for real vacancy retrieval. Do
not add a database, authentication, AI matching, or CV parsing before it
is needed.
Project structure
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
Update this section if the structure changes.
Important product decisions
1. Preserve free URL entry. Users should not be restricted to a
   predefined portal list.
2. Maximum 5 URLs.
3. Maximum 10 vacancy results.
4. Initial matching is by job title only. CV and Skills matching
   belongs to a later phase.
5. Keep the CV & Skills section visible.
6. CVMarket is the first real integration. Make one source work
   end-to-end before adding others.
7. Keep development beginner-friendly and incremental.
Planned architecture
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
The backend is planned but not implemented yet.
Vacancy result model
A normalized vacancy should eventually contain at least:
{
  title: '',
  company: '',
  location: '',
  source: '',
  url: ''
}
The original vacancy URL must be preserved so the user can open the
source advertisement.
Search behavior
For the current MVP: - use the entered job-title keyword; - retrieve
jobs from the entered source; - filter/match by vacancy title; - return
no more than 10 results; - do not use CV contents, Skills, or
semantic/AI matching yet.
Lithuanian titles can have grammatical/gender variants. For example,
Vadovas and Vadovė. A broader stem such as vadov may later be
useful, but complex language processing is not required for the first
implementation.
Design direction
Preserve the existing visual direction unless a redesign is requested: -
warm sunset background; - dark translucent/glass-style interface; -
light/cream text; - warm orange primary actions; - rounded corners; -
responsive layout; - two-column layout on larger screens.
Do not remove or redesign the CV & Skills area without a specific
request.
Not implemented yet
- Node/Express backend;
- real vacancy retrieval;
- CVMarket integration;
- real keyword filtering;
- live results list;
- max-10 enforcement on retrieved vacancies;
- extraction of real company/location/source/link data;
- multiple real job-source integrations;
- duplicate handling;
- unsupported-site handling;
- Skills-based matching;
- CV parsing;
- AI/semantic matching;
- database;
- authentication.
Do not describe these as working features.
Roadmap
Phase 1 --- Frontend
- [x] React/Vite application
- [x] Job keyword field
- [x] Free URL entry
- [x] Maximum 5 URL fields
- [x] Add/remove URL fields
- [x] CV upload UI
- [x] Skills UI
- [x] Responsive styling
Phase 2 --- First real search
- [ ] Add small backend
- [ ] Connect React to backend
- [ ] Integrate CVMarket
- [ ] Search using job-title keyword
- [ ] Return real vacancies
- [ ] Limit results to 10
- [ ] Display title, company, location, source and link
Phase 3 --- Multiple sources
- [ ] Add another job website
- [ ] Support multiple entered URLs
- [ ] Combine results
- [ ] Remove duplicate vacancies
- [ ] Handle unsupported URLs
Phase 4 --- Smarter matching
- [ ] Use Skills in matching
- [ ] Parse CV information
- [ ] Rank vacancies by relevance
- [ ] Explore semantic/AI-assisted matching
Development principles
- Prefer small, testable changes.
- Keep explanations beginner-friendly.
- Avoid unnecessary dependencies.
- Avoid unrelated refactoring.
- Preserve existing working functionality.
- Get one real source working before supporting many.
- Preserve free URL entry.
- Preserve CV & Skills.
- Do not redesign working UI unless requested.
- Clearly distinguish implemented functionality from planned
  functionality.
Immediate next milestone
Enter a job-title keyword and CVMarket URL → retrieve and display up
to 10 real matching CVMarket vacancies.

Recommended sequence: 1. Determine a reliable method for retrieving
CVMarket vacancies. 2. Add the smallest backend required. 3. Connect
React to the backend. 4. Send the entered keyword. 5. Retrieve CVMarket
vacancies. 6. Match/filter vacancy titles. 7. Normalize results. 8.
Return no more than 10 jobs. 9. Display them in the existing interface.
Do not expand to several portals until this flow works end-to-end.
Context maintenance
At the end of a development session, update: - implemented
functionality; - architecture; - important decisions; - limitations; -
roadmap status; - immediate next milestone.
Remove or rewrite obsolete information. Do not turn this file into a
chronological conversation transcript.