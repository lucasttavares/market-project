/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" "Role" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");
