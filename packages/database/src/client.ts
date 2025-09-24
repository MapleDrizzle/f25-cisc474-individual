import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
/*
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
*/
export * from "@prisma/client";
