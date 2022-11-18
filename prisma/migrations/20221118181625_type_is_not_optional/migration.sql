/*
  Warnings:

  - Made the column `type` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `users` MODIFY `type` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `user_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
