/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `Authentications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Authentications_refresh_token_key` ON `authentications`;

-- AlterTable
ALTER TABLE `authentications` MODIFY `refresh_token` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Authentications_refresh_token_key` ON `Authentications`(`refresh_token`(512));
