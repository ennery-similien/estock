/*
  Warnings:

  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `PRO_DISPONIBILITY` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `PRO_IMAGES_URLS` on the `products` table. All the data in the column will be lost.
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
ALTER TABLE `products` DROP COLUMN `PRO_DISPONIBILITY`,
    DROP COLUMN `PRO_IMAGES_URLS`,
    ADD COLUMN `PRO_AVAILABILITY` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `PRO_IMAGES` JSON NULL,
    MODIFY `PRO_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `telephones` MODIFY `TEL_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `USR_INIT_DAY` DATETIME NULL,
    MODIFY `USR_UPD_DATE` DATETIME NULL;
