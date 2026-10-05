# Job Search App

A beginner-friendly React project for building a job-search application
that can search selected job websites and return relevant vacancies.

## Project Goal

The long-term goal is to let a user:

1.  Enter a job-title keyword.
2.  Enter up to 5 job-search website URLs.
3.  Search those sources for relevant vacancies.
4.  Display up to 10 matching jobs.
5.  Later use CV and skills information to improve job matching.

## Current MVP

**Job-title keyword + 1--5 freely entered job-site URLs → retrieve
matching vacancies → show maximum 10 results.**

For the first version, matching will be based only on the vacancy title.

CV and Skills remain visible in the interface, but they are not used in
the current search logic.

## Current Features

-   Job-title / keyword input
-   Free job-site URL entry
-   Up to 5 website URLs
-   Add/remove URL fields
-   Automatic `https://` normalization
-   Website counter
-   CV file selection
-   5 skill input fields
-   Responsive two-column interface

At the moment, the search button opens the entered websites in new
browser tabs.

**Real vacancy retrieval and filtering are not implemented yet.**

## Technology Stack

-   React 19
-   Vite 8
-   JavaScript / JSX
-   CSS
-   ESLint

The project currently contains only the frontend. A small Node/Express
backend is planned as the next architectural step.

## Project Structure

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
├── context.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Running the Project

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

Vite will show the local address, normally `http://localhost:5173/`. If
that port is occupied, Vite may use another one.

Build:

``` bash
npm run build
```

Run ESLint:

``` bash
npm run lint
```

## First Real Job Source

The first planned real integration is **CVMarket Lithuania
(`cvmarket.lt`)**.

The first real search should:

1.  Receive the keyword entered in the React interface.
2.  Retrieve relevant CVMarket vacancies.
3.  Match vacancies by job title.
4.  Return at most 10 results.
5.  Provide job title, company, location, source and original vacancy
    link.

## Planned Architecture

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

The user-facing URL fields should remain free-form rather than being
replaced with a fixed list of job portals.

## Development Roadmap

### Phase 1 --- Frontend

-   [x] Create React/Vite application
-   [x] Create job keyword field
-   [x] Add free URL entry
-   [x] Limit job-site fields to 5
-   [x] Add/remove URL fields
-   [x] Add CV upload UI
-   [x] Add Skills UI
-   [x] Add responsive styling

### Phase 2 --- First real search

-   [ ] Add a small backend
-   [ ] Connect React to the backend
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

-   [ ] Use Skills in vacancy matching
-   [ ] Parse CV information
-   [ ] Rank vacancies by relevance
-   [ ] Explore semantic/AI-assisted matching

## Development Principles

This is also a learning project, so development should remain
understandable and incremental.

-   Prefer small, testable changes.
-   Avoid unnecessary libraries.
-   Get one real job source working before supporting many sources.
-   Preserve free URL entry.
-   Preserve the existing CV & Skills section.
-   Avoid redesigning working UI unless requested.
-   Do not describe planned functionality as already implemented.

## Project Context

`context.md` is the living technical context for AI-assisted
development. It should be updated at the end of each development session
with the current implementation state, decisions, limitations and next
development step.

## Current Status

The frontend is working.

The next major milestone is:

> **Enter a job-title keyword and CVMarket URL → retrieve and display up
> to 10 real matching CVMarket vacancies.**
