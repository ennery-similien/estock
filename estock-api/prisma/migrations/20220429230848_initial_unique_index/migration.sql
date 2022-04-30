/*
  Warnings:

  - You are about to alter the column `USR_INIT_DAY` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `USR_INIT_DAY` DATETIME NULL;

-- RenameIndex
ALTER TABLE `clients` RENAME INDEX `clients_CLI_EMAIL_key` TO `CLI_EMAIL_UNIQUE_INDEX`;

-- RenameIndex
ALTER TABLE `clients` RENAME INDEX `clients_CLI_NIU_key` TO `CLI_NIU_UNIQUE_INDEX`;

-- RenameIndex
ALTER TABLE `orders` RENAME INDEX `orders_ORD_CODE_key` TO `ORD_CODE_UNIQUE_INDEX`;

-- RenameIndex
ALTER TABLE `products` RENAME INDEX `products_PRO_CODE_key` TO `PRO_BARCODE_UNIQUE_INDEX`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_USR_EMAIL_key` TO `USR_EMAIL_UNIQUE_INDEX`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_USR_LOGIN_key` TO `USR_NIU_UNIQUE_INDEX`;
