-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(20),
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "chipId" CHAR(15) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "breed" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "adopted" BOOLEAN NOT NULL DEFAULT false,
    "primaryImgId" INTEGER NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogImage" (
    "id" SERIAL NOT NULL,
    "dogId" INTEGER,
    "path" VARCHAR(510) NOT NULL,

    CONSTRAINT "DogImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_primaryImgId_key" ON "Dog"("primaryImgId");

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_primaryImgId_fkey" FOREIGN KEY ("primaryImgId") REFERENCES "DogImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DogImage" ADD CONSTRAINT "DogImage_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
