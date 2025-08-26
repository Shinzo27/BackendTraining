/*
  Warnings:

  - Changed the type of `totalLeave` on the `Statics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Statics" DROP COLUMN "totalLeave",
ADD COLUMN     "totalLeave" INTEGER NOT NULL;
