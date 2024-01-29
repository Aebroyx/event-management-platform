/*
  Warnings:

  - You are about to drop the column `points` on the `Point` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Point` DROP COLUMN `points`,
    ADD COLUMN `balance` INTEGER NOT NULL DEFAULT 0;
