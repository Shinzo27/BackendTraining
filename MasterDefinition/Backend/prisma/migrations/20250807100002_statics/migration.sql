/*
  Warnings:

  - You are about to drop the column `attendacePercentage` on the `UserLeave` table. All the data in the column will be lost.
  - Added the required column `attendancePercentage` to the `UserLeave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserLeave" DROP COLUMN "attendacePercentage",
ADD COLUMN     "attendancePercentage" INTEGER NOT NULL;
