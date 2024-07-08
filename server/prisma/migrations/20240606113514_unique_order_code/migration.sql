/*
  Warnings:

  - You are about to drop the column `delivery_Options` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delivery_Options",
ADD COLUMN     "delivery_options" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");
