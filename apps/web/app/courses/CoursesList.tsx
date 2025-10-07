"use client";

import { useEffect, useState } from "react";

export default function CoursesList() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching from:", process.env.NEXT_PUBLIC_API_URL + "/courses");
    async function fetchCourses() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
        setLoading(false);
    }
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

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