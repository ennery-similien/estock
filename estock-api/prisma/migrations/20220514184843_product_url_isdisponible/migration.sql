/*
  Warnings:

  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PRO_UPD_DATE` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `TEL_UPD_DATE` on the `telephones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_UPD_DATE` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `ADR_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `ORD_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `PRO_DISPONIBILITY` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `PRO_IMAGES_URLS` JSON NULL,
    MODIFY `PRO_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `telephones` MODIFY `TEL_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `USR_INIT_DAY` DATETIME NULL,
    MODIFY `USR_UPD_DATE` DATETIME NULL;
