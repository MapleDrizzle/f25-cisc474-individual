
# Requirements & User Stories

**Vision:** Create a flexible, user-friendly, and scalable Learning Management System for programming courses. It manages **courses (Kitchens)**, **assignments (Recipes)**, **problems (Steps)**, **submissions (Bakes)**, and **feedback (Tasting Notes)**, plus a unique submission type: the **Interactive Bake Run**.

---

## Roles
- **Learner (Baker)**
- **Instructor (Head Chef)**
- **Administrator (Bakery Manager)**
- **Auto-Grader (Taste Tester)** — system service

---

## High-Level Functional Requirements

### Common
1. Auth: sign up/in, password reset, SSO-ready.
2. Profile & notifications.
3. Accessibility (WCAG 2.1 AA) and responsive design.
4. Search (courses/assignments/problems).

### Learner (Baker)
1. View enrolled courses and upcoming deadlines.
2. View assignment details, problems, and rubrics.
3. Submit solutions:
   - File upload (zip, code files)
   - Text/code editor submission
   - **Interactive Bake Run** (container/sandbox URL or spec + logs/artifacts)
4. Run sample tests locally in the UI (Taste Test sandbox).
5. View grades, feedback, and rubric results.
6. Resubmit while before deadline; see version history (batches).
7. Discuss via per-assignment Q&A/comments.

### Instructor (Head Chef)
1. Create/manage courses, enroll students.
2. Create assignments (with due dates, late policy, rubric).
3. Create problems with specs, starter files, and public/hidden tests.
4. Configure the **Bake Run** template (image, command, timeout, artifact globs).
5. Grade submissions with rubric, inline code comments, and **log-anchored** Tasting Notes.
6. Re-run tests on any submission; release scores selectively.
7. Analytics: grade distribution, test pass rates, activity timelines.

### Administrator (Bakery Manager)
1. Manage users, roles, and permissions.
2. Manage global course settings and quotas (storage, runtime minutes).
3. Audit logs and system health.

### Auto-Grader (Taste Tester)
1. Execute tests (public/hidden) in isolated environment.
2. Capture logs/artifacts and attach to submission.
3. Compute rubric auto-points; leave machine Tasting Notes.

---

## Non-Functional Requirements
- **Scalability:** 1–5k concurrent students; background workers for grading.
- **Reliability:** At-least-once grading with idempotent runs; retry policies.
- **Security:** Role-based access, per-course scoping, signed-upload URLs, secret management.
- **Privacy:** FERPA-friendly, least-privilege data design, PII minimization.
- **Performance:** p95 page load < 2.5s, grading queue median < 2 min.
- **Observability:** Structured logs/metrics/traces across web + workers.
- **Accessibility:** Keyboard navigable, ARIA landmarks, proper contrast.

---

## User Stories (INVEST)

### Learner
- *As a Baker*, I can see all my **Kitchens** with upcoming **Recipes** so I can plan my week.
- *As a Baker*, I can open a **Recipe** and view each **Step** with examples and a rubric so I know how to succeed.
- *As a Baker*, I can submit a **Bake** via code editor, file upload, or **Interactive Bake Run** so my work fits the task.
- *As a Baker*, I can run sample **Taste Tests** before submitting to catch errors early.
- *As a Baker*, I can view **Tasting Notes** and a **Doneness Score** to understand my performance.
- *As a Baker*, I can resubmit until the deadline and compare attempts to learn.

**Acceptance (examples)**
- Given I open a Recipe, when I click **Run Sample Taste Test**, then I see pass/fail per test within 10 seconds.
- Given I submit a Bake Run with artifacts, when grading completes, then I can preview artifacts inline (images, HTML report).

### Instructor
- *As a Head Chef*, I can create a **Recipe** with a due date, rubric, and tests to assess student mastery.
- *As a Head Chef*, I can annotate logs in a **Bake Run** at timestamps to leave precise **Tasting Notes**.
- *As a Head Chef*, I can download all **Bakes** as a CSV/ZIP for offline review.
- *As a Head Chef*, I can re-run **Taste Tests** after updating hidden cases to curb hardcoding.

**Acceptance (examples)**
- Given I open the Gradebook, when I select a submission, then I can attach rubric scores and inline notes and publish them in one action.
- Given I edit a Recipe, when I change the deadline, then enrolled Bakers see an announcement automatically.

### Administrator
- *As a Bakery Manager*, I can set per-course runtime/storge quotas to control costs.
- *As a Bakery Manager*, I can impersonate a user for support with audit trail.

---

## Prioritized MVP Scope
- Course/assignment/problem browsing
- Code/file submissions + auto-grading
- Results page with feedback
- **Bake Run** (baseline: attach external sandbox URL + captured log)
- Basic gradebook
- ERD entities created (below), minimal analytics

---

## Risks & Mitigations
- Sandbox isolation costs → quotas + pooled runners
- Plagiarism → similarity checks, random test seeds
- Vendor lock-in → abstract runner interface; S3-compatible storage
- Accessibility drift → pre-release a11y audit checklist


# Bakery-Themed LMS — Naming Legend
- **Course** → **Kitchen**
- **Assignment** → **Recipe**
- **Problem/Exercise** → **Step**
- **Submission** → **Bake**
- **Test Run / Auto-grader** → **Taste Test**
- **Feedback** → **Tasting Notes**
- **Grade** → **Doneness Score**
- **Student** → **Baker**
- **Instructor** → **Head Chef**
- **Administrator** → **Bakery Manager**

> Note: In all docs we list the *real* system name first, and the **bakery** name in parentheses—for clarity.

