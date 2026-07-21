/*
  Warnings:

  - Made the column `excerpt` on table `articles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "excerpt" SET NOT NULL;
