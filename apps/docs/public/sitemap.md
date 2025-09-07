
# Site Map (Frontend Pages)

```mermaid
flowchart TD
    L[Login / Sign Up] --> D[Student Dashboard]
    L --> ID[Instructor Dashboard]
    L --> AD[Admin Console]

    D --> C[Course Home]
    C --> A[Assignment List]
    A --> AP[Assignment Page]
    AP --> P[Problem View]
    P --> S[Submit]
    S --> R[Results]

    ID --> IC[Instructor Course Home]
    IC --> IA[Assignment Builder]
    IA --> IP[Problem Editor]
    IA --> IR[Rubric & Tests Config]
    IA --> IBR[Bake Run Template]

    ID --> G[Gradebook]
    G --> GR[Grade Review / Publish]

    AD --> U[User Management]
    AD --> SYS[System Settings]
    AD --> AUD[Audit Logs]
```
## Page List & Routes
- `/login`, `/signup`
- `/dashboard` (role-aware: Student/Instructor)
- `/courses/:courseId`
- `/courses/:courseId/assignments`
- `/assignments/:assignmentId`
- `/assignments/:assignmentId/problems/:problemId`
- `/assignments/:assignmentId/submit`
- `/submissions/:submissionId` (results)
- `/instructor/courses/:courseId` (owner view)
- `/instructor/assignments/new` and `/instructor/assignments/:assignmentId/edit`
- `/instructor/gradebook/:courseId`
- `/admin/users`, `/admin/settings`, `/admin/audit`
