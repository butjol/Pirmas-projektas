# Job Search App - AI Agent Instructions

These instructions apply to AI agents working on this job-search
application.



## Project goal

The application is being built step by step as a beginner-friendly
job-search project.

Current MVP direction:

**Job-title keyword + 1--5 freely entered job-site URLs → retrieve real
vacancies → match by job title → show a maximum of 10 results.**

Important current decisions: - Keep free URL entry. Do not replace it
with a hard-coded list of job portals. - Allow a maximum of 5 entered
job-site URLs. - Return a maximum of 10 job results. - For the current
MVP, match jobs by title/keyword only. - Keep the CV & Skills section
visible, but do not use it for matching yet. - CVMarket (`cvmarket.lt`)
is the first real job source to integrate. - Get one real source working
before generalizing to multiple sources.

## Technology

-   Use React + Vite.
-   Use JavaScript and JSX.
-   Do not convert the project to TypeScript unless explicitly
    requested.
-   Use plain CSS.
-   Do not add Tailwind CSS, CSS Modules, or a UI framework unless
    explicitly requested.
-   Keep component styles in separate `.css` files where practical.
-   Use functional React components and React hooks.
-   The current project is frontend-only.
-   A small Node/Express backend may be added when required for real
    vacancy retrieval.
-   Do not add a database, authentication, AI matching, CV parsing, or
    other major architecture before it is needed.

## Current structure

The project currently follows approximately this structure:

``` text
PIRMAS-PROJEKTAS/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CVSkills.jsx
│   │   └── CVSkills.css
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AGENTS.md
├── context.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

Do not reorganize the project unless there is a clear technical reason
or the user explicitly asks for it.

## Code changes

Before modifying code: - inspect the current version of every file that will be changed; - check `context.md` for decisions that must be preserved; - do not assume that code from an older conversation is still current.

When making changes: - preserve existing functionality unless explicitly asked to change it;
do not invent APIs or functionality that do not exist;
avoid unrelated refactors;
avoid unnecessary dependencies;
prefer the simplest working solution;
make small, testable changes;
clearly separate implemented functionality from planned functionality.

Because this is also a learning project, prefer readable code over clever or highly abstract code.

## Job-site integrations

The user can enter job-site URLs freely.

However, do not assume that an arbitrary URL can automatically be searched or scraped.

For each real job source:
verify how vacancy data can reliably and appropriately be retrieved;
account for browser/CORS limitations;
use a backend when browser-side React cannot reliably retrieve the
data;
keep site-specific retrieval logic separate enough that another
source can be added later;
normalize retrieved vacancies into a common structure.

A useful normalized result shape is:

``` js
{
  title: '',
  company: '',
  location: '',
  source: '',
  url: ''
}
```

The first integration target is CVMarket.

Do not implement several portals at once before the CVMarket end-to-end flow works.

## Search behavior

For the current MVP: - search/match by job title; - do not use CV
contents for matching yet; - do not use Skills fields for matching
yet; - return no more than 10 vacancies; - keep the original vacancy URL
so the user can open the source job advertisement.

Lithuanian job titles can have different grammatical/gender forms. A
search such as `Vadovas` may later need broader matching such as
`vadov`, but avoid adding complex language processing unless it solves a
demonstrated problem.

## Design

Preserve the existing visual direction: - warm sunset background; - dark
translucent/glass-style cards; - cream/light primary text; - warm orange
primary action color; - subtle borders; - rounded corners; - responsive
layout; - two-column layout on larger screens where appropriate.

Do not redesign the overall background or the CV & Skills section unless
explicitly requested.

Keep new UI consistent with the existing design rather than introducing
a new visual system.

## UI language

The current UI contains English text.

Preserve the existing UI language and terminology unless the user
explicitly asks to translate or change it.

Do not automatically translate the application into Lithuanian merely
because development discussions are in Lithuanian.

## Beginner-friendly development

Assume the user is learning React and application development.

When proposing implementation steps: - explain briefly what is being
changed and why; - avoid introducing several new concepts at once; -
prefer one clear next step; - provide exact file paths; - when manual
replacement is needed, provide the complete updated file; - explain any
terminal command before asking the user to run it; - include a simple
way to test whether the change worked.

Do not overcomplicate a task when a simpler solution is sufficient for
the current MVP.

## Before finishing a coding change

Check that: 1. The code matches the existing project structure. 2.
Imports and file paths are correct. 3. Existing functionality that
should remain has not been removed. 4. No unnecessary dependency was
added. 5. The UI remains responsive. 6. The free URL entry still works
unless the current task intentionally changes it. 7. The maximum of 5
URL fields is preserved. 8. Planned features are not presented as
already implemented. 9. The change is consistent with `context.md`.

When possible, also run or recommend: - `npm run build` - `npm run lint`

Do not claim these checks passed unless they were actually run
successfully.

## Presenting changes

When delivering code changes: - briefly explain what changed; - identify
every changed or new file by exact path; - clearly say whether each file
should be created, edited, or replaced; - when code is intended for
manual pasting, provide the complete updated file; - provide a short
test procedure; - mention any known limitation that remains relevant.

## Project documentation maintenance

`context.md` is a living project document.

At the end of a development session, update it to reflect: - what was
actually implemented; - new product or technical decisions; - changed
limitations; - current project state; - the next development step.

Do not turn `context.md` into a chronological transcript. Keep it
concise and current.

Update `README.md` only when the project description, setup
instructions, architecture, or roadmap changes enough that user-facing
project documentation should also be updated.

## Current next milestone

The current next milestone is:

> Enter a job-title keyword and a CVMarket URL, retrieve real CVMarket
> vacancies through an appropriate backend/retrieval method, and display
> up to 10 matching jobs.

Do not expand the scope beyond this milestone unless the user asks to do
so or the current implementation requires a small supporting change.
