/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Point` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `Point` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `points` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);
