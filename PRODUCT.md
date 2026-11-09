# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Employers and recruiters evaluating Siraphop for software development roles.
- Prospective freelance clients evaluating Siraphop for project work.

The owner confirmed that both audiences have equal priority.

## Product Purpose

A personal portfolio for Siraphop Sangkrit. Visitors can review work, skills, and professional experience, then follow contact or professional profile links to discuss employment or freelance opportunities. Success means helping either audience assess suitability and make contact.

## Positioning

The owner's confirmed professional focus and preferred title are “Software Developer.” Use this title consistently in future work. Distinctive expertise beyond that focus remains open.

## Operating Context

- The public portfolio is a single page at `/`, with navigation to home, about, skills, projects, and contact sections.
- Visitors can follow project demo and source links, where provided, and email, GitHub, and LinkedIn links.
- `/admin` provides content management for portfolio copy, projects, skills, and experience. Its existence does not establish an authentication or access-control requirement.
- The development command is `npm run dev`. The existing application uses Next.js App Router, React, TypeScript, Tailwind CSS, and MongoDB through Mongoose.

## Capabilities and Constraints

The following capabilities are present in the repository; live database content and production operation were not verified during initialization:

- Editable hero, about, and contact content served by `/api/content`.
- Featured project entries with descriptions, technologies, optional imagery, demo links, and source links.
- Categorized skills and dated work experience, with ordering fields managed through the admin interface.
- MongoDB persistence for content, projects, skills, and experience. The connection reads `MONGODB_URI`, with a local development fallback.
- `/test-seed` and `/api/seed` provide sample-data tooling. Sample records are not evidence of the owner's actual work history.

Language priority is Thai first, with English as the secondary language. Future content and interface work should follow this priority. The current implementation uses English; the mechanism for presenting both languages remains open.

Open decisions: differentiating expertise, product-specific accessibility requirements, and any additional content or asset commitments.

## Brand Commitments

The existing portfolio identifies its owner as Siraphop Sangkrit. The owner confirmed “Software Developer” as the professional title and Thai as the primary language, followed by English. No additional binding voice, identity, or visual requirements were supplied during initialization.

## Evidence on Hand

- Existing portfolio implementation: `src/app/page.tsx` and `src/app/components/`.
- Content management interface: `src/app/admin/page.tsx`.
- Content structure: `src/lib/models/` and `src/app/api/`.
- Existing profile image asset: `public/96740d03-eb0b-415e-88fd-b8f2bc4f2091.jpg`.
- `src/app/api/seed/route.ts` contains sample projects, employers, achievements, biography statistics, and placeholder contact details. Component fallback copy includes similar unverified claims. Do not promote these into factual portfolio claims without owner confirmation.
- No verified client testimonials, performance results, project destinations, or employment history were established during initialization.

## Product Principles

- Give employment and freelance evaluation equal priority.
- Prioritize Thai content and support English as the secondary language.
- Help visitors assess relevant work and skills and reach the owner.
- Support the owner's existing workflow for maintaining portfolio content.
- Ground professional claims in owner-confirmed facts and real work; keep sample data distinct from evidence.
