-- CreateTable
CREATE TABLE "public"."Statics" (
    "id" SERIAL NOT NULL,
    "department" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "totalLeave" TEXT NOT NULL,

    CONSTRAINT "Statics_pkey" PRIMARY KEY ("id")
);
