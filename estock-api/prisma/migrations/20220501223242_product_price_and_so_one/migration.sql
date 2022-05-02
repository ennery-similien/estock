/*
  Warnings:

  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PRO_CODE` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(13)`.
  - You are about to alter the column `TEL_UPD_DATE` on the `telephones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `ADR_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `ORD_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `PRO_PRICE` DOUBLE NOT NULL DEFAULT 1.00,
    MODIFY `PRO_CODE` VARCHAR(13) NOT NULL;

-- AlterTable
ALTER TABLE `telephones` MODIFY `TEL_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `USR_IS_ACTIVE` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `USR_INIT_DAY` DATETIME NULL;
