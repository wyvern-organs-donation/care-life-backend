/*
  Warnings:

  - You are about to drop the column `country` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `doc_country` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `doc_number` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_doc_number_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `country`,
    DROP COLUMN `doc_country`,
    DROP COLUMN `doc_number`,
    ADD COLUMN `cpf` VARCHAR(20) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `confirmation_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(50) NOT NULL,
    `expiration` DATE NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_cpf_key` ON `users`(`cpf`);

-- AddForeignKey
ALTER TABLE `confirmation_tokens` ADD CONSTRAINT `confirmation_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
