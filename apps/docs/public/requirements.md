# Requirements Document

## Roles
- **Learner (Baker)**
- **Instructor (Head Baker)**
- **Administrator (Bakery Manager)**

---

## Requirements for Each Role
### Learner (Baker)
1. View enrolled courses and upcoming deadlines
2. View assignment details and grading rubrics
3. Submit solutions:
   - File upload (zip, code files)
   - **Interactive Bake Run** (container/sandbox URL or spec + logs/artifacts)
4. View grades and feedback

### Instructor (Head Baker)
1. Create/manage courses, enroll students
2. Create assignments
3. Grade submissions with rubric

### Administrator (Bakery Manager)
1. Manage users, roles, and permissions
2. Manage overall course settings

---

# Bakery-Themed LMS — Naming Legend
- **Course** → **Recipe Book**
- **Assignment** → **Recipe**
- **Problem/Exercise** → **Step**
- **Submission** → **Bake**
- **Test Run / Auto-grader** → **Customer**


---

## User Stories

### Learner
- As a Baker, I can see all my **Recipe Books** with upcoming **Recipes** so I can plan my week
- As a Baker, I can open a **Recipe** and view each **Step** to complete it.
- As a Baker, I can submit a **Bake** via code editor, file upload, or **Interactive Bake Run** so my work fits the task.
- As a Baker, I can view what the **Customer** says about the **Bake**.

### Instructor
- As a Head Baker, I can create a **Recipe** with a due date, rubric, and tests to assess student mastery.
- As a Head Baker, I can download all **Bakes** to review them.
- As a Head Baker, I can give student's submission to the **Customer** to have an automatic grade.

### Administrator
- As a Bakery Manager, I can set per-course runtime/storge quotas to control costs.
- As a Bakery Manager, I can impersonate a user for support with audit trail.
