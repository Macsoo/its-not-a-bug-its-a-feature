-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "public"."Dog" (
    "id" SERIAL NOT NULL,
    "chipId" CHAR(15) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "breed" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "primaryImgId" INTEGER NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DogImage" (
    "id" SERIAL NOT NULL,
    "dogId" INTEGER,
    "path" VARCHAR(510) NOT NULL,

    CONSTRAINT "DogImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdoptionRequest" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "dogId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "user_id" UUID NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_primaryImgId_key" ON "public"."Dog"("primaryImgId");

-- AddForeignKey
ALTER TABLE "public"."Dog" ADD CONSTRAINT "Dog_primaryImgId_fkey" FOREIGN KEY ("primaryImgId") REFERENCES "public"."DogImage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."DogImage" ADD CONSTRAINT "DogImage_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "public"."Dog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "public"."Dog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
