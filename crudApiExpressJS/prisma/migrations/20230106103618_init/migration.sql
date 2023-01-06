/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "age",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Books" (
    "bookId" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "bookAuthor" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("bookId")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
