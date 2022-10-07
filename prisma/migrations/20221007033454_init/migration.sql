-- CreateTable
CREATE TABLE `organs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organ_type` INTEGER NOT NULL,
    `donor` INTEGER NOT NULL,
    `institution` INTEGER NOT NULL,

    INDEX `donor`(`donor`),
    INDEX `institution`(`institution`),
    INDEX `organ_type`(`organ_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_type` INTEGER NOT NULL,
    `user_name` VARCHAR(70) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(70) NOT NULL,
    `birth_date` DATE NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `doc_country` VARCHAR(35) NULL,
    `doc_number` VARCHAR(20) NULL,
    `adress` VARCHAR(95) NULL,
    `city` VARCHAR(35) NULL,
    `state` VARCHAR(35) NULL,
    `country` VARCHAR(35) NULL,
    `zip` VARCHAR(20) NULL,

    INDEX `user_type`(`user_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organ_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `organs` ADD CONSTRAINT `organs_ibfk_1` FOREIGN KEY (`organ_type`) REFERENCES `organ_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `organs` ADD CONSTRAINT `organs_ibfk_2` FOREIGN KEY (`donor`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `organs` ADD CONSTRAINT `organs_ibfk_3` FOREIGN KEY (`institution`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type`) REFERENCES `user_types`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
