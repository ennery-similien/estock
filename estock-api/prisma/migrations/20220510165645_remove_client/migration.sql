/*
  Warnings:

  - You are about to drop the column `ADR_CLI_NIU` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `ADR_USR_NIU` on the `addresses` table. All the data in the column will be lost.
  - You are about to alter the column `ADR_UPD_DATE` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `ORD_CLIENT` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `ORD_SHIP_ADDR` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `ORD_UPD_DATE` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `PRO_UPD_DATE` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `TEL_CLI_NIU` on the `telephones` table. All the data in the column will be lost.
  - You are about to drop the column `TEL_USR_NIU` on the `telephones` table. All the data in the column will be lost.
  - You are about to alter the column `TEL_UPD_DATE` on the `telephones` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `USR_UPD_DATE` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `CLIENT_ADDRESSES_FK`;

-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `USER_ADDRESSES_FK`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `CLIENT_ORDER_FK`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `ADDRESS_ORDER_FK`;

-- DropForeignKey
ALTER TABLE `telephones` DROP FOREIGN KEY `CLIENT_TELEPHONES_FK`;

-- DropForeignKey
ALTER TABLE `telephones` DROP FOREIGN KEY `USER_TELEPHONES_FK`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `ADR_CLI_NIU`,
    DROP COLUMN `ADR_USR_NIU`,
    ADD COLUMN `ADR_OWNER` VARCHAR(10) NULL,
    MODIFY `ADR_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `ORD_CLIENT`,
    DROP COLUMN `ORD_SHIP_ADDR`,
    ADD COLUMN `ORD_BUYER` JSON NULL,
    MODIFY `ORD_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `PRO_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `telephones` DROP COLUMN `TEL_CLI_NIU`,
    DROP COLUMN `TEL_USR_NIU`,
    ADD COLUMN `TEL_OWNER` VARCHAR(10) NULL,
    MODIFY `TEL_UPD_DATE` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `USR_BIRTHDAY` DATE NULL,
    MODIFY `USR_EMAIL` VARCHAR(100) NULL,
    MODIFY `USR_PASSWORD` VARCHAR(170) NULL,
    MODIFY `USR_ROLE` ENUM('SALESMAN', 'ADMIN') NULL DEFAULT 'SALESMAN',
    MODIFY `USR_INIT_DAY` DATETIME NULL,
    MODIFY `USR_UPD_DATE` DATETIME NULL;

-- DropTable
DROP TABLE `clients`;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `USER_ADDRESSES_FK` FOREIGN KEY (`ADR_OWNER`) REFERENCES `users`(`USR_LOGIN`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `telephones` ADD CONSTRAINT `USER_TELEPHONES_FK` FOREIGN KEY (`TEL_OWNER`) REFERENCES `users`(`USR_LOGIN`) ON DELETE NO ACTION ON UPDATE CASCADE;
