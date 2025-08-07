/*
  Warnings:

  - Added the required column `totalWorkingDays` to the `Statics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Statics" ADD COLUMN     "totalWorkingDays" INTEGER NOT NULL;
