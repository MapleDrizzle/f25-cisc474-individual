import { prisma, Prisma } from "./client";

//import type { User } from "../generated/client";

const DEFAULT_USERS: Prisma.UserCreateInput[] = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
    role: "STUDENT",
  },
  {
    name: "Martina Pear",
    email: "martina@pear.com",
    role: "INSTRUCTOR",
  },
  {
    name: "John Banana",
    email: "john@banana.com",
    role: "ADMIN",
  }
]; //as Array<Partial<User>>;

(async () => {
  try {
    // --- USERS ---
    const users = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: { email: user.email! },
          update: user,
          create: user,
        })
      )
    );

    const tim = users[0]!;
    const martina = users[1]!;

    // --- COURSES ---
    const algorithms = await prisma.course.upsert({
      where: { code: "CISC320" },
      update: {},
      create: {
        code: "CISC320",
        title: "Introduction to Algorithms",
        description: "Learn about fundamental algorithms and data structures.",
      },
    });

    const webTech = await prisma.course.upsert({
      where: { code: "CISC474" },
      update: {},
      create: {
        code: "CISC474",
        title: "Advanced Web Technologies",
        description: "Explore modern web frameworks and full-stack development.",
      },
    });

    // --- ENROLLMENTS ---
    await prisma.enrolledCourse.createMany({
      data: [
        { userId: tim.id, courseId: algorithms.id, role: "STUDENT" },
        { userId: tim.id, courseId: webTech.id, role: "STUDENT" },
        { userId: martina.id, courseId: algorithms.id, role: "INSTRUCTOR" },
        { userId: martina.id, courseId: webTech.id, role: "INSTRUCTOR" },
      ],
      skipDuplicates: true,
    });

    // --- ASSIGNMENTS ---
    const assignment1 = await prisma.assignment.upsert({
      where: { id: "algorithms-assignment-1" },
      update: {},
      create: {
        id: "algorithms-assignment-1",
        title: "Sorting Algorithms",
        description: "Implement and analyze sorting algorithms.",
        dueDate: new Date("2025-10-01"),
        courseId: algorithms.id,
      },
    });

    const assignment2 = await prisma.assignment.upsert({
      where: { id: "webtech-assignment-1" },
      update: {},
      create: {
        id: "webtech-assignment-1",
        title: "React Components",
        description: "Build a reusable React component library.",
        dueDate: new Date("2025-10-10"),
        courseId: webTech.id,
      },
    });

    // --- SUBMISSIONS ---
    const submission1 = await prisma.submission.create({
      data: {
        assignmentId: assignment1.id,
        userId: tim.id,
        problems: "Implemented merge sort and quicksort in Python.",
        submitDate: new Date("2025-09-15T10:00:00Z"),
      },
    });

    const submission2 = await prisma.submission.create({
      data: {
        assignmentId: assignment2.id,
        userId: tim.id,
        problems: "Created button, card, and modal components in React.",
        submitDate: new Date("2025-09-16T12:00:00Z"),
      },
    });

    // --- GRADES ---
    await prisma.grade.createMany({
      data: [
        {
          submissionId: submission1.id,
          userId: martina.id,
          feedback: "Great job on merge sort, but quicksort needs optimization.",
          score: 85,
          gradePosted: new Date("2025-09-17T14:00:00Z"),
        },
        {
          submissionId: submission2.id,
          userId: martina.id,
          feedback: "Excellent component structure and styling.",
          score: 95,
          gradePosted: new Date("2025-09-18T15:30:00Z"),
        },
      ],
      skipDuplicates: true,
    });

    // --- BAKE SUBMISSIONS ---
    await prisma.bakeSubmission.createMany({
      data: [
        {
          submissionId: submission1.id,
          bakeDuration: 120,
          bakeEnd: new Date("2025-09-15T10:02:00Z"),
          bakedGood: "COOKIE",
        },
        {
          submissionId: submission2.id,
          bakeDuration: 300,
          bakeEnd: new Date("2025-09-16T12:05:00Z"),
          bakedGood: "CAKE",
        },
      ],
      skipDuplicates: true,
    });

    console.log("✅ Database seeded successfully!");
    /*
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
    */
  } catch (error) {
    console.error("ERROR SEEDING DATABASE", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
