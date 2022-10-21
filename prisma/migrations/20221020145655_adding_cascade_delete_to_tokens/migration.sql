-- DropForeignKey
ALTER TABLE `confirmation_tokens` DROP FOREIGN KEY `confirmation_tokens_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `confirmation_tokens` ADD CONSTRAINT `confirmation_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
