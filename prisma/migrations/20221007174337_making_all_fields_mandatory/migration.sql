/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[doc_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `doc_country` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doc_number` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adress` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `doc_country` VARCHAR(35) NOT NULL,
    MODIFY `doc_number` VARCHAR(20) NOT NULL,
    MODIFY `adress` VARCHAR(95) NOT NULL,
    MODIFY `city` VARCHAR(35) NOT NULL,
    MODIFY `state` VARCHAR(35) NOT NULL,
    MODIFY `country` VARCHAR(35) NOT NULL,
    MODIFY `zip` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `users_doc_number_key` ON `users`(`doc_number`);
