
# Basic Data Model (ER Diagram)

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : has
    COURSE ||--o{ ENROLLMENT : includes
    COURSE ||--o{ ASSIGNMENT : contains
    ASSIGNMENT ||--o{ PROBLEM : has
    PROBLEM ||--o{ TESTCASE : includes
    ASSIGNMENT ||--o{ SUBMISSION : receives
    USER ||--o{ SUBMISSION : makes
    SUBMISSION ||--o{ FEEDBACK : gets
    SUBMISSION ||--o{ ARTIFACT : produces
    SUBMISSION ||--o{ COMMENT : has
    ASSIGNMENT ||--o{ RUBRICITEM : scoredBy
    SUBMISSION ||--o{ RUBRICSCORE : resultsIn
    SUBMISSION ||--o{ BAKERUN : mayHave

    USER {
      uuid id PK
      string name
      string email UNIQ
      enum role  "student|instructor|admin"
    }
    COURSE {
      uuid id PK
      string title
      string code
      uuid ownerId FK
      json  settings
    }
    ENROLLMENT {
      uuid id PK
      uuid userId FK
      uuid courseId FK
      enum role "student|ta|instructor"
    }
    ASSIGNMENT {
      uuid id PK
      uuid courseId FK
      string title
      text description
      datetime dueAt
      json latePolicy
    }
    PROBLEM {
      uuid id PK
      uuid assignmentId FK
      string title
      text prompt
      json starterFiles
      json constraints
    }
    TESTCASE {
      uuid id PK
      uuid problemId FK
      string name
      boolean hidden
      text input
      text expectedOutput
      json points
    }
    SUBMISSION {
      uuid id PK
      uuid assignmentId FK
      uuid userId FK
      enum type "code|file|bakerun"
      datetime createdAt
      float totalScore
      json   meta
      string status "pending|passed|failed|needs_review"
    }
    BAKERUN {
      uuid id PK
      uuid submissionId FK
      string mode "container|sandbox_url"
      string imageOrUrl
      string command
      int    exitCode
      json   env
      json   timeline  "timestamped events"
    }
    ARTIFACT {
      uuid id PK
      uuid submissionId FK
      string name
      string path
      string mime
      int    sizeBytes
    }
    FEEDBACK {
      uuid id PK
      uuid submissionId FK
      uuid authorId FK
      text body
      json anchors "file:line or log:timestamp"
      float pointsDelta
      datetime createdAt
    }
    RUBRICITEM {
      uuid id PK
      uuid assignmentId FK
      string criterion
      float maxPoints
      json  levels
    }
    RUBRICSCORE {
      uuid id PK
      uuid submissionId FK
      uuid rubricItemId FK
      float points
      text note
    }
    COMMENT {
      uuid id PK
      uuid submissionId FK
      uuid authorId FK
      text body
      json anchors
      datetime createdAt
    }
```

## Notes
- **Submission.type** supports the unique **bakerun** path.
- **Feedback.anchors** allow inline comments in code files **or** timestamps in logs.
- Files stored in object storage; `ARTIFACT.path` is a key, not a filesystem path.
