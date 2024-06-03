-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COMPANY', 'CLIENT');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" "Role" NOT NULL DEFAULT 'COMPANY',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" "Role" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_cnpj_key" ON "companies"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");
