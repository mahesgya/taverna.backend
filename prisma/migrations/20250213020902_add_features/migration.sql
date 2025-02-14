/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authentication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `authentication`;

-- CreateTable
CREATE TABLE `Admins` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authentications` (
    `id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Authentications_refresh_token_key`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonials` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `option` BOOLEAN NOT NULL DEFAULT false,
    `filepath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menus` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `filepath` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Menus_category_key`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promos` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `filepath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
