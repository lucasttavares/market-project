/*
  Warnings:

  - You are about to drop the column `user` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `companies` table. All the data in the column will be lost.
  - Added the required column `cep` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "user",
ADD COLUMN     "cep" VARCHAR(255) NOT NULL,
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "coordinates" VARCHAR[],
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL,
ADD COLUMN     "telephone" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "user",
ADD COLUMN     "cep" VARCHAR(255) NOT NULL,
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "coordinates" VARCHAR[],
ADD COLUMN     "delivery" INTEGER NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "payment" VARCHAR[],
ADD COLUMN     "street" VARCHAR(255) NOT NULL,
ADD COLUMN     "telephone" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "bar_code" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "products" VARCHAR[],
    "userClientId" TEXT,
    "userCompanyId" TEXT,
    "destination" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "payment" VARCHAR(255) NOT NULL,
    "delivery_Options" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_bar_code_key" ON "products"("bar_code");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userCompanyId_fkey" FOREIGN KEY ("userCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
