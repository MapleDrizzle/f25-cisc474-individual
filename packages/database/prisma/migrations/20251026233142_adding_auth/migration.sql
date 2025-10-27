/*
  Warnings:

  - You are about to drop the column `auth0Id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_auth0Id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth0Id";

-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
