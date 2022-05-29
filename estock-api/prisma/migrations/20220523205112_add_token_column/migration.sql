/*
  Warnings:

  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PRO_UPD_DATE` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `TEL_UPD_DATE` on the `telephones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_UPD_DATE` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[USR_TOKEN]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `ADR_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `ORD_UPD_DATE` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `PRO_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `telephones` MODIFY `TEL_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `USR_TOKEN` VARCHAR(200) NULL,
    MODIFY `USR_INIT_DAY` DATETIME NULL,
    MODIFY `USR_UPD_DATE` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `USR_TOKEN_UNIQUE_INDEX` ON `users`(`USR_TOKEN`);
