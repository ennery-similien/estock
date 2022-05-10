/*
  Warnings:

  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PRO_UPD_DATE` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `TEL_UPD_DATE` on the `telephones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_UPD_DATE` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `ADR_OWNER` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ORD_BUYER` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `TEL_OWNER` on table `telephones` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `USER_ADDRESSES_FK`;

-- DropForeignKey
ALTER TABLE `telephones` DROP FOREIGN KEY `USER_TELEPHONES_FK`;

-- AlterTable
ALTER TABLE `addresses` MODIFY `ADR_UPD_DATE` DATETIME NULL,
    MODIFY `ADR_OWNER` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `ORD_UPD_DATE` DATETIME NULL,
    MODIFY `ORD_BUYER` JSON NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `PRO_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `telephones` MODIFY `TEL_UPD_DATE` DATETIME NULL,
    MODIFY `TEL_OWNER` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `USR_INIT_DAY` DATETIME NULL,
    MODIFY `USR_UPD_DATE` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `USER_ADDRESSES_FK` FOREIGN KEY (`ADR_OWNER`) REFERENCES `users`(`USR_LOGIN`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `telephones` ADD CONSTRAINT `USER_TELEPHONES_FK` FOREIGN KEY (`TEL_OWNER`) REFERENCES `users`(`USR_LOGIN`) ON DELETE NO ACTION ON UPDATE CASCADE;
