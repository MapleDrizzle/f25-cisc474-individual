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
    name: "Sarah Strawberry",
    email: "sarah@strawberry.com",
    role: "STUDENT",
  },
  {
    name: "Laura Lemon",
    email: "laura@lemon.com",
    role: "STUDENT",
  },
  {
    name: "Jared Pineapple",
    email: "jared@pineapple.com",
    role: "STUDENT",
  },
  {
    name: "Melody Melon",
    email: "melody@melon.com",
    role: "STUDENT",
  },
  {
    name: "Anthony Avocado",
    email: "anthony@avocado.com",
    role: "STUDENT",
  },
  {
    name: "Charlie Coconut",
    email: "charlie@coconut.com",
    role: "STUDENT",
  },
  {
    name: "Mira Mango",
    email: "mira@mango.com",
    role: "STUDENT",
  },
  {
    name: "David Dragonfruit",
    email: "david@dragonfruit.com",
    role: "STUDENT",
  },
  {
    name: "Martina Pear",
    email: "martina@pear.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Gary Grape",
    email: "gary@grape.com",
    role: "INSTRUCTOR",
  },
  {
    name: "Ruby Raspberry",
    email: "ruby@raspberry.com",
    role: "INSTRUCTOR",
  },
  {
    name: "John Banana",
    email: "john@banana.com",
    role: "ADMIN",
  },
  {
    name: "Wayhem Watermelon",
    email: "wayhem@watermelon.com",
    role: "ADMIN",
  },
  {
    name: "Emily Blueberry",
    email: "emily@blueberry.com",
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
    const sarah = users[1]!;
    const laura = users[2]!;
    const jared = users[3]!;
    const martina = users[9]!;
    const gary = users[10]!;

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

    const operatingSystems = await prisma.course.upsert({
      where: { code: "CISC361" },
      update: {},
      create: {
        code: "CISC361",
        title: "Operating Systems",
        description: "Learn about the principles and design of operating systems.",
      },
    });

    // --- ENROLLMENTS ---
    await prisma.enrolledCourse.createMany({
      data: [
        { userId: tim.id, courseId: algorithms.id, role: "STUDENT" },
        { userId: tim.id, courseId: webTech.id, role: "STUDENT" },        
        { userId: sarah.id, courseId: algorithms.id, role: "STUDENT" },
        { userId: laura.id, courseId: webTech.id, role: "STUDENT" },
        { userId: laura.id, courseId: operatingSystems.id, role: "STUDENT" },
        { userId: jared.id, courseId: webTech.id, role: "STUDENT" },
        { userId: martina.id, courseId: algorithms.id, role: "INSTRUCTOR" },
        { userId: martina.id, courseId: webTech.id, role: "INSTRUCTOR" },
        { userId: gary.id, courseId: operatingSystems.id, role: "INSTRUCTOR" },
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
    const assignment1a = await prisma.assignment.upsert({
      where: { id: "algorithms-assignment-1a" },
      update: {},
      create: {
        id: "algorithms-assignment-1a",
        title: "Master Theorem Practice",
        description: "Implement the master theorem in these problems.",
        dueDate: new Date("2025-10-05"),
        courseId: algorithms.id,
      },
    });
    const assignment1b = await prisma.assignment.upsert({
      where: { id: "algorithms-assignment-1b" },
      update: {},
      create: {
        id: "algorithms-assignment-1b",
        title: "Graph Algorithms",
        description: "Implement BFS and DFS.",
        dueDate: new Date("2025-11-01"),
        courseId: algorithms.id,
      },
    });

    const assignment2 = await prisma.assignment.upsert({
      where: { id: "webtech-assignment-2" },
      update: {},
      create: {
        id: "webtech-assignment-2",
        title: "React Components",
        description: "Build a reusable React component library.",
        dueDate: new Date("2025-10-10"),
        courseId: webTech.id,
      },
    });
    const assignment2a = await prisma.assignment.upsert({
      where: { id: "webtech-assignment-2a"},
      update: {},
      create: {
        id: "webtech-assignment-2a",
        title: "Database Creation",
        description: "Build a database for your LMS.",
        dueDate: new Date("2025-10-11"),
        courseId: webTech.id,
      },
    })
    // OPERATING SYSTEMS WILL HAVE NO ASSIGNMENTS

    // --- SUBMISSIONS ---
    const submission1 = await prisma.submission.create({
      data: {
        assignmentId: assignment1.id,
        userId: tim.id,
        problems: "Implemented merge sort and quicksort in Python.",
        submitDate: new Date("2025-09-15T10:00:00Z"),
      },
    });

    const submission1a = await prisma.submission.create({
      data: {
        assignmentId: assignment1a.id,
        userId: tim.id,
        problems: "Implement the master theorem in these problems.",
        submitDate: new Date("2025-10-06T10:00:00Z"),
      },
    });

    const submission1b = await prisma.submission.create({
      data: {
        assignmentId: assignment1b.id,
        userId: sarah.id,
        problems: "Implement BFS and DFS",
        submitDate: new Date("2025-11-00T10:00:00Z"),
      }
    });

    const submission2 = await prisma.submission.create({
      data: {
        assignmentId: assignment2.id,
        userId: laura.id,
        problems: "Created button, card, and modal components in React.",
        submitDate: new Date("2025-09-16T12:00:00Z"),
      },
    });

    // Jared has no submissions!

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
          submissionId: submission1a.id,
          userId: martina.id,
          feedback: "Really great work!",
          score: 95,
          gradePosted: new Date("2025-09-17T14:00:00Z"),
        },
        {
          submissionId: submission1b.id,
          userId: gary.id,
          feedback: "Looks good!",
          score: 90,
          gradePosted: new Date("2025-09-17T14:00:00Z"),
        },
        {
          submissionId: submission2.id,
          userId: gary.id,
          feedback: "Great component structure and styling.",
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
          submissionId: submission1a.id,
          bakeDuration: 180,
          bakeEnd: new Date("2025-09-16T12:05:00Z"),
          bakedGood: "BROWNIE",
        },
        {
          submissionId: submission1b.id,
          bakeDuration: 300,
          bakeEnd: new Date("2025-09-16T12:05:00Z"),
          bakedGood: "CAKE",
        },
        {
          submissionId: submission2.id,
          bakeDuration: 400,
          bakeEnd: new Date("2025-09-16T12:05:00Z"),
          bakedGood: "PIE",
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
