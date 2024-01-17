/*
  Warnings:

  - Added the required column `price` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `price` DOUBLE NOT NULL;
