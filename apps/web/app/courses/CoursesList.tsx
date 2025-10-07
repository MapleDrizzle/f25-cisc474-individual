"use client";

import { useEffect, useState } from "react";

export default function CoursesList() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCourses() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <strong>{course.title}</strong> — {course.description}
        </li>
      ))}
    </ul>
  );
}