import { Suspense } from "react";
import CoursesList from "./CoursesList";

export default function CoursesPage() {
  return (
    <div>
      <h1>Courses</h1>
      <Suspense fallback={<p>Loading courses...</p>}>
        <CoursesList />
      </Suspense>
    </div>
  );
}