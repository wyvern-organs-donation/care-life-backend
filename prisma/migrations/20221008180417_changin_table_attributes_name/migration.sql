/*
  Warnings:

  - You are about to drop the column `type_name` on the `organ_types` table. All the data in the column will be lost.
  - You are about to drop the column `organ_type` on the `organs` table. All the data in the column will be lost.
  - You are about to drop the column `type_name` on the `user_types` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `organ_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `organs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `organs` DROP FOREIGN KEY `organs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `organ_types` DROP COLUMN `type_name`,
    ADD COLUMN `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `organs` DROP COLUMN `organ_type`,
    ADD COLUMN `type` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_types` DROP COLUMN `type_name`,
    ADD COLUMN `name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_name`,
    DROP COLUMN `user_password`,
    DROP COLUMN `user_type`,
    ADD COLUMN `name` VARCHAR(70) NOT NULL,
    ADD COLUMN `password` VARCHAR(70) NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `type` ON `organs`(`type`);

-- CreateIndex
CREATE INDEX `type` ON `users`(`type`);

-- AddForeignKey
ALTER TABLE `organs` ADD CONSTRAINT `organs_ibfk_1` FOREIGN KEY (`type`) REFERENCES `organ_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `user_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
